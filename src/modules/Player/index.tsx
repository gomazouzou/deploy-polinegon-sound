import React, { useEffect, useRef, useState } from "react";

import * as Tone from 'tone';
import { MinusButton } from "../../components/buttons/MinusButton.tsx";
import { PlusButton } from "../../components/buttons/PlusButton.tsx";
import { StartButton } from "../../components/buttons/StartButton.tsx";
import { StopButton } from "../../components/buttons/StopButton.tsx";
import { CANVAS_HEIGHT, CANVAS_WIDTH, DEFAULT_LINE_WIDTH, PROCESS_SPAN } from "../../config/constants.tsx";
import { ChangeFreePlayerToLoop, ChangeInstrumentIdToPlayer, ChangePlayerToLoop, ChangeSamplerToLoop } from "../../hooks/useInstrumentIdToPlayer.tsx";
import { Layer } from "../../types/layer.tsx";
import { LoopInfo, Type } from "../../types/loop.tsx";
import { BeatDisplay } from "./BeatDisplay/index.tsx";

type Props = {
  isPlaying: boolean;
  loops: LoopInfo[];
  UpdateBeatCount: (beatCount: number) => void;
  metronomeAudioBuffer: AudioBuffer | undefined;
  accentAudioBuffer: AudioBuffer | undefined;
  figureAudioBuffers: AudioBuffer[];
  lineAudioSamplers: Tone.Sampler[] | null;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  clickFigureDrawing: boolean;
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>;
  setTotalLayer: React.Dispatch<React.SetStateAction<number>>;
  setLoops: React.Dispatch<React.SetStateAction<LoopInfo[]>>;
  setTotalLoop: React.Dispatch<React.SetStateAction<number>>;
  setCurrentLayerId: React.Dispatch<React.SetStateAction<number>>;
  setCurrentFigure: React.Dispatch<React.SetStateAction<number>>;
  setDrawCount: React.Dispatch<React.SetStateAction<number>>;
  layers: Layer[];
}

export const Player = ({
    isPlaying, 
    loops, 
    UpdateBeatCount, 
    metronomeAudioBuffer, 
    accentAudioBuffer,
    figureAudioBuffers, 
    lineAudioSamplers, 
    setIsPlaying, 
    clickFigureDrawing,
    setLayers,
    setTotalLayer,
    setLoops,
    setTotalLoop,
    setCurrentLayerId,
    setCurrentFigure,
    setDrawCount,
    layers,
  }: Props) => {
  const [bpm, setBpm] = useState(120);
  const [beat, setBeat] = useState(7);

  const [playPart, setPlayPart] = useState <Tone.Part[] | null>(null);
  const [metronome, setMetronome] = useState<Tone.Part | null>(null); 

  const beatCountRef = useRef(0);

  const onLongPressPlusButton = () => {
    setBpm(prevBpm => prevBpm + 2);
  }
  const onLongPressMinusButton = () => {
    setBpm(prevBpm => prevBpm - 2);
  }

  const createMetronome = () => {
    if (metronomeAudioBuffer) { 
      const normalPlayer = new Tone.Player(metronomeAudioBuffer).toDestination();
      const accentPlayer = new Tone.Player(accentAudioBuffer).toDestination();
      const newPart = new Tone.Part((time, value) => {
        if (value.accent) {
          accentPlayer.start(time);
        }
        else {
          normalPlayer.start(time);
        }
        setBeat((prevBeat) => (prevBeat + 1) % 8);
      }, [
        { time: "0:0:0", accent: true },  
        { time: "0:1:0", accent: false },  
        { time: "0:2:0", accent: false }, 
        { time: "0:3:0", accent: false },
        { time: "0:4:0", accent: false },
        { time: "0:5:0", accent: false },
        { time: "0:6:0", accent: false },
        { time: "0:7:0", accent: false },
      ]);
      newPart.loop = true;
      newPart.loopEnd = "2m";
      return newPart;
    }
    else{
      return null;
    }
  };

  const initializeLoops = (loops: LoopInfo[]) => {
    Tone.Destination.volume.value = -6; 
    const newPlayParts: Tone.Part[] = [];
    loops.forEach(loop => {
      if (loop.type === Type.Poligone) {
        const player = ChangeInstrumentIdToPlayer(loop.instrument, figureAudioBuffers, loop.volume);
        if (!player) return;
        const newPart = ChangePlayerToLoop(player, loop.figure_id);
        newPlayParts.push(newPart);
      }
      if (loop.type === Type.Free) {
        const player = ChangeInstrumentIdToPlayer(loop.instrument, figureAudioBuffers, loop.volume);
        if (!player) return;
        const newPart = ChangeFreePlayerToLoop(player, loop.midi);
        newPlayParts.push(newPart);
      }
      if (loop.type === Type.Line) {
        if (!lineAudioSamplers) return;
        const newPart = ChangeSamplerToLoop(lineAudioSamplers[loop.instrument], loop.midi, loop.volume);
        newPlayParts.push(newPart);
      }
    });
    return newPlayParts;
  };

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm, playPart]);

  useEffect(() => {
    if (playPart) {
      playPart.forEach(loop => loop.stop());
    }
    const newPlayParts = initializeLoops(loops);
    setPlayPart(newPlayParts);
    newPlayParts.forEach(loop => loop.start(0));
  }, [loops]);

  const [eventId, setEventId] = useState<number | null>(null);

  const startMusic = () => {
    if (!metronome) {
      const newMetronome = createMetronome();
      setMetronome(newMetronome);
      const currentBeat = Tone.Transport.position; 
      newMetronome?.start(`@${currentBeat}`);
    }
    if (!playPart) {
      const newPlayParts = initializeLoops(loops);
      setPlayPart(newPlayParts);
      newPlayParts?.forEach(loop => {
        const currentBeat = Tone.Transport.position; 
        loop.start(`@${currentBeat}`);
      });
    }
    const newEventId = Tone.Transport.scheduleRepeat(() =>
      {
        UpdateBeatCount(beatCountRef.current);
        beatCountRef.current = (beatCountRef.current + 1) % (PROCESS_SPAN * 2);

      }, `${PROCESS_SPAN}n`);

    setEventId(newEventId);
    Tone.Transport.start();
    setIsPlaying(true);
  };

  const stopMusic = () => {
    playPart?.forEach(loop => loop.stop());
    metronome?.stop();
    Tone.Transport.pause();

    if (eventId !== null) {
      Tone.Transport.clear(eventId);
      setEventId(null);
    }

    setMetronome(null);
    setPlayPart(null);
    setIsPlaying(false);
  };

  const onClickResetButton = () => {
    layers.forEach(layer => {
      if (!layer.ref.current) return;
      const ctx = layer.ref.current.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    });
    setLayers([{id: 0, ref: React.createRef(), color:"black", lineWidth: DEFAULT_LINE_WIDTH, drawings: [], figures: [], type: Type.Line, edge:[], isVisible: true}]);
    setTotalLayer(0);
    setCurrentLayerId(0);
    setCurrentFigure(0);
    setLoops([]);
    setTotalLoop(0);
    setDrawCount(0);
  }
  
  return (
    <>
    <div className = "playerlayer">
        <div className = "bpmexplain">
          <span>はやさ</span>
          <div className = "bpmframe">
            <MinusButton onLongPress={onLongPressMinusButton} />
            <span>{bpm} bpm</span>
            <PlusButton onLongPress={onLongPressPlusButton} />
          </div>
        </div>
        <BeatDisplay beat={beat}/>
    </div>
    <div className = "start-stop-frame">
      <div className = "reset-button" onClick={!clickFigureDrawing ? onClickResetButton: undefined}>
        <span>リセット</span>
      </div>

      <div className="play-button-container">
        {
          isPlaying ? 
          <StopButton onClick={stopMusic} /> :
          <StartButton onClick={startMusic} />
        }
      </div>
    </div>
    
    </>
  );
};
