import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { CANVAS_HEIGHT, CANVAS_WIDTH, DEFAULT_LINE_WIDTH, DEFAULT_VOLUME, MAX_LINE_WIDTH, MAX_VOLUME, PROCESS_SPAN } from './config/constants.tsx';
import { setFigureAnimation, setFreeAnimation } from './functions/Animation.tsx';
import { ChangeColorToInstrumentId } from './hooks/useColorToInstrumentId.tsx';
import { ChangeColorToTrueColor } from './hooks/useColorToTrueColor.tsx';
import { drawFigure00, drawFigure01, drawFigure02, drawFigure03, drawFrame, RedrawFreeFigure } from './hooks/useDrawFigure.tsx';
import { noteMapping } from './hooks/useInstrumentIdToPlayer.tsx';
import { ChangeMousePosToNoteId } from './hooks/useMousePosToNoteId.tsx';
import { DrawingPannel } from './modules/DrawingPannel/index.tsx';
import { LayerTab } from './modules/LayerTab/index.tsx';
import { Player } from './modules/Player/index.tsx';
import { Animation } from './types/animation.tsx';
import { Direction } from './types/direction.tsx';
import { Layer, Type } from "./types/layer.tsx";
import { LoopInfo, Position } from './types/loop.tsx';

function App() {
  const isDrawing= useRef(false);

  //キャンバスに反映されるすべてのレイヤー
  const [layers, setLayers] = useState<Layer[]>([{id: 0, ref: React.createRef(), color:"black", lineWidth: DEFAULT_LINE_WIDTH, drawings: [], figures: [], type: Type.Line, edge:[], isVisible: true}]); 
  //削除したものも含めたレイヤーの通し番号
  const [totalLayer, setTotalLayer] = useState(0); 
  //現在描画を行うレイヤーの番号
  const [currentLayerId, setCurrentLayerId] = useState(0); 
  const currentLayerRef = useRef<Layer>(layers[0]);
  //現在描画してるレイヤーの分かれたブロックの数
  const [drawCount, setDrawCount] = useState(0);
  //現在描画する図形の番号 
  const [currentFigure, setCurrentFigure] = useState(0);
  //現在鳴るループ再生の情報
  const [loops, setLoops] = useState<LoopInfo[]>([]);
  const [totalLoop, setTotalLoop] = useState(0);
  //マウスのX,Y座座標
  const mousePositionRef = useRef({ x: 0, y: 0 });
  //音階の配列
  const noteArrayRef2 = useRef<number[]>(Array(4).fill(0));
  const noteArrayRef4 = useRef<number[]>(Array(8).fill(0));
  const noteArrayRef8 = useRef<number[]>(Array(16).fill(0));
  const noteArrayRef16 = useRef<number[]>(Array(32).fill(0));
  //クオンタイズの設定
  const quantizeRef = useRef<number>(16);

  //自由図形描画を使うかどうか
  const [isAddFreeDrawing, setIsAddFreeDrawing] = useState(false);

  const [clickFigureDrawing, setClickFigureDrawing] = useState(false);
  const waitFigureDrawing = useRef<boolean>(false)
  const startFigureDrawing = useRef<boolean>(false);

  
  const downCountRef = useRef<number>(0);
  const upCountRef = useRef<number>(0);
  const leftCountRef = useRef<number>(0);
  const rightCountRef = useRef<number>(0);
  const isEdgeRef = useRef<number[]>(Array(32).fill(0));

  const currentDirectionRef = useRef<Direction>(Direction.Down);
  const directionRef = useRef<(Direction | null)[]>(Array(32).fill(null));
  
  const positionRef = useRef<Position>({ x: 0, y: 0 });

  //再生中かどうか
  const [isPlaying, setIsPlaying] = useState(false);

  const currentColorRef = useRef<string>("black");

  //クリックの状態管理
  const isClicking = useRef(false);

  //アニメーション
  const [totalAnimation, setTotalAnimation] = useState(0);
  const animationsRef = useRef<Animation[]>([]);
  const animationXRef = useRef<number[]>(Array(PROCESS_SPAN * 2).fill(-1));
  const animationYRef = useRef<number[]>(Array(PROCESS_SPAN * 2).fill(-1));

  const [metronomeAudioBuffer, setMetronomeAudioBuffer] = useState <AudioBuffer>();
  const [accentAudioBuffer, setAccentAudioBuffer] = useState <AudioBuffer>();
  const [figureAudioBuffers, setFigureAudioBuffers] = useState <AudioBuffer[]>([]);
  const [lineAudioSamplers, setLineAudioSamplers] = useState <Tone.Sampler[] | null>(null);
  const [figureAudioSamplers, setFigureAudioSamplers] = useState <Tone.Sampler[] | null>(null);

  useEffect(() => {
    const disableScroll = (event) => {
      // 特定の要素（キャンバス）内でのみスクロール無効化
      if (event.target.closest('canvas')) {
        event.preventDefault();
      }
    };
  
    window.addEventListener('touchmove', disableScroll, { passive: false });
  
    return () => {
      window.removeEventListener('touchmove', disableScroll);
    };
  }, []);
  
  

  useEffect(() => {
    const loadAudio = async () => {
      const response = await fetch('/audio/metronome.wav');
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await Tone.context.decodeAudioData(arrayBuffer);
      setMetronomeAudioBuffer(buffer);

      const _response = await fetch('/audio/metronome_accent.wav');
      const _arrayBuffer = await _response.arrayBuffer();
      const _buffer = await Tone.context.decodeAudioData(_arrayBuffer);
      setAccentAudioBuffer(_buffer);

      const figureBuffers: AudioBuffer[] = [];
      for (let i = 1; i <= 8; i++) {
        const response = await fetch(`/audio/figure_${i}.wav`);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = await Tone.context.decodeAudioData(arrayBuffer);
        figureBuffers.push(buffer);
      }
      setFigureAudioBuffers(figureBuffers);

      const lineBuffers: Tone.Sampler[] = [];
      for (let i = 1; i <= 8; i++) {
        const lineAudioSampler = new Tone.Sampler({
          urls: {
            C4: `line_${i}.wav`,
          },
          baseUrl: "/audio/"
        }).toDestination();
        await lineAudioSampler.loaded;
        lineBuffers.push(lineAudioSampler);
      }
      setLineAudioSamplers(lineBuffers);

      const figureBuffers_2: Tone.Sampler[] = [];
      for (let i = 1; i <= 8; i++) {
        const figureAudioSampler = new Tone.Sampler({
          urls: {
            C4: `figure_${i}.wav`,
          },
          baseUrl: "/audio/"
        }).toDestination();
        await figureAudioSampler.loaded;
        figureBuffers_2.push(figureAudioSampler);
        setFigureAudioSamplers(figureBuffers_2);
      }
    };

    loadAudio();
  }, []);

  useEffect(() => {
    const layer = layers.find(layer => layer.id === currentLayerId);
    if (!layer) return;
    currentLayerRef.current = layer;
    currentColorRef.current = layer?.color || "black";

    if (layer.type === Type.Free && isAddFreeDrawing) {
      setClickFigureDrawing(true);
      const position: Position = drawFrame(layer);
      positionRef.current = position;
      setIsAddFreeDrawing(false);
    }
  }, [layers, currentLayerId, isAddFreeDrawing]);

  useEffect(() => {
    waitFigureDrawing.current = clickFigureDrawing;
    isEdgeRef.current = Array(32).fill(0);
    currentDirectionRef.current = Direction.Down;
    directionRef.current = Array(32).fill(null);
    leftCountRef.current = 0;
    rightCountRef.current = 0;
    downCountRef.current = 0;
    upCountRef.current = 0;
  },[clickFigureDrawing]);


  const UpdateBeatCount = (beatCount: number) => {
    const canvas = currentLayerRef.current.ref.current;

    //線の時の処理
    if (isDrawing.current && canvas && lineAudioSamplers) {
      if (beatCount % (PROCESS_SPAN / quantizeRef.current) === 0) {
        const index = beatCount / (PROCESS_SPAN / quantizeRef.current);
        const noteId = ChangeMousePosToNoteId(mousePositionRef.current.y); 
        const note = noteMapping[noteId];

        //描画中の音符を鳴らす
        const sampler = lineAudioSamplers[ChangeColorToInstrumentId(currentColorRef.current)];
        if (note){
          sampler.triggerAttackRelease(note, `${quantizeRef.current}n`);
        }

        //ループ音階の設定
        switch (quantizeRef.current) {
          case 2:
            noteArrayRef2.current[index] = noteId;
            break;
          case 4:
            noteArrayRef4.current[index] = noteId;
            break;
          case 8:
            noteArrayRef8.current[index] = noteId;
            break;
          case 16:
            noteArrayRef16.current[index] = noteId;
            break;
        }
      }
      animationXRef.current[beatCount] = mousePositionRef.current.x;
      animationYRef.current[beatCount] = mousePositionRef.current.y;
    }
    
    //自由描画の時の処理

    //自由描画開始・終了の判定
    if(waitFigureDrawing.current && beatCount === 0){
      if(!startFigureDrawing.current){
        startFigureDrawing.current = true;
      }
      else{
        setLayers(prevLayers => prevLayers.map(layer => {
          if (layer === currentLayerRef.current) {
            return {
              ...layer,
              figures: [...layer.figures, { id: currentFigure, x_pos: positionRef.current.x, y_pos: positionRef.current.y }],
              edge: directionRef.current
            };
          }
          else{
            return layer;
          }
        }));

        setLoops(prevLoop => {
          const newLoop = [...prevLoop, 
            { 
              id: totalLoop,
              type: Type.Free, 
              layer_id: currentLayerRef.current.id,
              color: currentLayerRef.current.color,
              lineWidth: currentLayerRef.current.lineWidth,
              instrument: ChangeColorToInstrumentId(currentLayerRef.current.color), 
              figure_id: currentFigure, 
              volume:  DEFAULT_VOLUME + MAX_VOLUME / (MAX_LINE_WIDTH - DEFAULT_LINE_WIDTH)* (currentLayerRef.current.lineWidth - DEFAULT_LINE_WIDTH),
              midi: isEdgeRef.current,
              ref: React.createRef<HTMLCanvasElement>(),
            }
          ];
          return newLoop;
        });

        const canvas = currentLayerRef.current.ref.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        RedrawFreeFigure(context, directionRef.current, currentLayerRef.current, positionRef.current.x, positionRef.current.y, true);

        waitFigureDrawing.current = false;
        startFigureDrawing.current = false;
        setClickFigureDrawing(false);
        setTotalLoop(totalLoop + 1);

        const { x: xAnimation, y: yAnimation } = setFreeAnimation(isEdgeRef.current, positionRef.current.x, positionRef.current.y);
        animationsRef.current = [
          ...animationsRef.current, 
          {
            id: totalAnimation,
            layerId: currentLayerRef.current.id,
            ref: React.createRef<HTMLCanvasElement>(),
            color: currentLayerRef.current.color,
            lineWidth: currentLayerRef.current.lineWidth,
            x: xAnimation,
            y: yAnimation,
            isVisible: currentLayerRef.current.isVisible,
          }
        ];
        setTotalAnimation(totalAnimation + 1);
      } 
    }

    //自由描画中の処理
    if(startFigureDrawing.current && beatCount % (PROCESS_SPAN / 16) === 0 && figureAudioSamplers){
      const index = beatCount / (PROCESS_SPAN / 16);
      //二つの角の場合（左上、右下）
      if(index === 0){
        currentDirectionRef.current = Direction.Down;
        directionRef.current[0] = Direction.Down;
        isEdgeRef.current[index] = 3;
        
      }
      else if(index === PROCESS_SPAN / 16 * 4){
        if(currentDirectionRef.current === Direction.Down){
          currentDirectionRef.current = Direction.Left;
          directionRef.current[PROCESS_SPAN / 16 * 4] = Direction.Left;
        }
        else if(currentDirectionRef.current === Direction.Right){
          currentDirectionRef.current = Direction.Up;
          directionRef.current[PROCESS_SPAN / 16 * 4] = Direction.Up;
        }        
        isEdgeRef.current[index] = 3;
      }
      //外枠にぶつかった場合
      else if(index < PROCESS_SPAN / 16 * 4 && rightCountRef.current === (PROCESS_SPAN / 16 ) * 2){
        if(currentDirectionRef.current === Direction.Right){
          isEdgeRef.current[index] = 3;
        }
        directionRef.current[index] = Direction.Down;
        currentDirectionRef.current = Direction.Down;

      }
      else if(index < PROCESS_SPAN / 16 * 4 && downCountRef.current === (PROCESS_SPAN / 16) * 2){
        if(currentDirectionRef.current === Direction.Down){
          isEdgeRef.current[index] = 3;
        }
        directionRef.current[index] = Direction.Right;
        currentDirectionRef.current = Direction.Right;
      }
      else if(index > PROCESS_SPAN / 16 * 4 && leftCountRef.current === (PROCESS_SPAN / 16)*2){
        if(currentDirectionRef.current === Direction.Left){
          isEdgeRef.current[index] = 3;
        }
        directionRef.current[index] = Direction.Up;
        currentDirectionRef.current = Direction.Up;
      }
      else if(index > PROCESS_SPAN / 16 * 4 && upCountRef.current === (PROCESS_SPAN / 16)*2){
        if(currentDirectionRef.current === Direction.Up){
          isEdgeRef.current[index] = 3;
        }
        directionRef.current[index] = Direction.Left;
        currentDirectionRef.current = Direction.Left;
      }
      else{
        //方向転換
        if(isClicking.current){
          switch (currentDirectionRef.current) {
            case Direction.Down:
              directionRef.current[index] = Direction.Right;
              currentDirectionRef.current = Direction.Right;
              break;
            case Direction.Right:
              directionRef.current[index] = Direction.Down;
              currentDirectionRef.current = Direction.Down;
              break;
            case Direction.Up:
              directionRef.current[index] = Direction.Left;
              currentDirectionRef.current = Direction.Left;
              break;
            case Direction.Left:
              directionRef.current[index] = Direction.Up;
              currentDirectionRef.current = Direction.Up;
              break;
          }
          isEdgeRef.current[index] = 3;
        }
        //直進
        else{
          directionRef.current[index] = currentDirectionRef.current;
        }
      }

      //音を鳴らす
      if(isEdgeRef.current[index] === 3){
        const sampler = figureAudioSamplers[ChangeColorToInstrumentId(currentColorRef.current)];
        sampler.triggerAttackRelease("C4", `${quantizeRef.current}n`);
      }

      //方角カウントの更新
      switch (currentDirectionRef.current) {
        case Direction.Down:
          downCountRef.current += 1;
          break;
        case Direction.Up:
          upCountRef.current += 1;
          break;
        case Direction.Left:
          leftCountRef.current += 1;
          break;
        case Direction.Right:
          rightCountRef.current += 1;
          break;
      }
      const canvas = currentLayerRef.current.ref.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      RedrawFreeFigure(context, directionRef.current, currentLayerRef.current, positionRef.current.x, positionRef.current.y, false);
      
      isClicking.current = false;
    }

    //アニメーションの更新
    animationsRef.current.forEach(animation => {
      if (!animation.ref.current) return;
      const context = animation.ref.current.getContext('2d');
      if (!context) return;

      context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      if (animation.x[beatCount] === -1 || animation.y[beatCount] === -1) return;
      if (!animation.isVisible) return; 
      context.strokeStyle = ChangeColorToTrueColor(animation.color);
      context.lineWidth = animation.lineWidth;

      context.beginPath();
      context.arc(animation.x[beatCount], animation.y[beatCount], animation.lineWidth * 1.25, 0, Math.PI * 2);
      context.fillStyle = ChangeColorToTrueColor(animation.color);
      context.fill();
    });
  }

  useEffect(() => {
    if (layers.length === 0) return;
    const layer = layers.find(layer => layer.id === currentLayerId);
    if(layer && isPlaying){

      //線レイヤーの場合の描画処理
      if(layer.type === Type.Line && !clickFigureDrawing){
        const canvas =layer.ref.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');

        let prevX: number | null = null;
        let prevY: number | null = null;

        const draw = (event: PointerEvent) => {
          if (!isDrawing.current || !context || !layer) return;

          // ペンのスタイルを設定
          context.lineWidth = layer.lineWidth; 
          context.lineCap = 'round'; 
          context.strokeStyle = ChangeColorToTrueColor(layer.color);

          const currentX: number = event.offsetX;
          const currentY: number = event.offsetY;

          mousePositionRef.current = { x: currentX, y: currentY };
          
          // マウスの位置に線を描画
          context.lineTo(currentX, currentY);
          context.stroke();
          context.beginPath();
          context.moveTo(currentX, currentY);

          // 描画内容を保存
          setLayers(prevLayers => prevLayers.map(layer => {
            if (layer.id === currentLayerId && prevX && prevY) {
              return {
                ...layer,
                drawings: [...layer.drawings, { startX: prevX, startY: prevY, endX: currentX, endY: currentY, count: drawCount }]
              };
            }
            else{
              return layer;
            }
          }));
          
          prevX = currentX;
          prevY = currentY;
        }

        const startDrawing = (event : PointerEvent) => {
          isDrawing.current = true;
          prevX = event.offsetX;
          prevY = event.offsetY;
          draw(event);
        }

        const  stopDrawing = () => {
          if (!context) return;
          context.beginPath();
          prevX = null;
          prevY = null;
          setDrawCount(drawCount + 1); 

          let currentNoteArray: number[] = [];
          
          switch (quantizeRef.current) {
            case 2:
              currentNoteArray = [...noteArrayRef2.current];
              break;
            case 4:
              currentNoteArray = [...noteArrayRef4.current];
              break;
            case 8:
              currentNoteArray = [...noteArrayRef8.current];
              break;
            case 16:
              currentNoteArray = [...noteArrayRef16.current];
              break;
          }

          setLoops(prevLoop => {
            const newLoop = [...prevLoop, 
              { 
                id: totalLoop,
                type: Type.Line, 
                layer_id: currentLayerId, 
                color: layer.color,
                lineWidth: layer.lineWidth,
                instrument: ChangeColorToInstrumentId(layer.color), 
                figure_id: 0, 
                volume:  DEFAULT_VOLUME + MAX_VOLUME / (MAX_LINE_WIDTH - DEFAULT_LINE_WIDTH)* (layer.lineWidth - DEFAULT_LINE_WIDTH),
                midi: currentNoteArray,
                ref: React.createRef<HTMLCanvasElement>(),
              }
            ];
            return newLoop;
          });
          setTotalLoop(totalLoop + 1);

          noteArrayRef2.current = Array(4).fill(0);
          noteArrayRef4.current = Array(8).fill(0);
          noteArrayRef8.current = Array(16).fill(0);
          noteArrayRef16.current = Array(32).fill(0);

          // アニメーションの設定
          if (isDrawing.current) {
            animationsRef.current = [
              ...animationsRef.current, 
              {
                id: totalAnimation,
                layerId: currentLayerId,
                ref: React.createRef<HTMLCanvasElement>(),
                color: layer.color,
                lineWidth: layer.lineWidth,
                x: animationXRef.current,
                y: animationYRef.current,
                isVisible: layer.isVisible,
              }
            ];
            setTotalAnimation(totalAnimation + 1);
            animationXRef.current = Array(PROCESS_SPAN * 2).fill(-1);
            animationYRef.current = Array(PROCESS_SPAN * 2).fill(-1);
          }

          isDrawing.current = false;
        }

        canvas.addEventListener('pointerdown', startDrawing);
        canvas.addEventListener('pointermove', draw);
        canvas.addEventListener('pointerup', stopDrawing);
        canvas.addEventListener('pointerout', stopDrawing);

        return () => {
          canvas.removeEventListener('pointerdown', startDrawing);
          canvas.removeEventListener('pointermove', draw);
          canvas.removeEventListener('pointerup', stopDrawing);
          canvas.removeEventListener('pointerout', stopDrawing);
        };
      };

      //図形レイヤーの場合の描画処理
      if(layer.type === Type.Poligone && !clickFigureDrawing){
        const canvas = layer.ref.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');

        const drawFigure = (event: PointerEvent) => {
          const centerX = event.offsetX;
          const centerY = event.offsetY;

          switch (currentFigure) {
            case 0:
              drawFigure00(context, layer, centerX, centerY);
              break;
            case 1:
              drawFigure01(context, layer, centerX, centerY);
              break;
            case 2:
              drawFigure02(context, layer, centerX, centerY);
              break;
            case 3:
              drawFigure03(context, layer, centerX, centerY);
              break;
            default:
              break;
          }
          
          // 描画内容を保存
          setLayers(prevLayers => prevLayers.map(layer => {
            if (layer.id === currentLayerId) {
              return {
                ...layer,
                figures: [...layer.figures, { id: currentFigure, x_pos: centerX, y_pos: centerY }]
              };
            }
            else{
              return layer;
            }
          }));

          //ループ情報の設定
          setLoops(prevLoop => {
            const newLoop = [...prevLoop, 
              { 
                id: totalLoop,
                type: Type.Poligone, 
                layer_id: currentLayerId, 
                color: layer.color,
                lineWidth: layer.lineWidth,
                instrument: ChangeColorToInstrumentId(layer.color), 
                figure_id: currentFigure, 
                volume:  DEFAULT_VOLUME + MAX_VOLUME / (MAX_LINE_WIDTH - DEFAULT_LINE_WIDTH)* (layer.lineWidth - DEFAULT_LINE_WIDTH),
                midi: [],
                ref: React.createRef<HTMLCanvasElement>(),
              }
            ];
            setTotalLoop(totalLoop + 1);
            return newLoop;
          });

          // アニメーションの設定
          const { xAnimation, yAnimation } = setFigureAnimation(currentFigure, centerX, centerY);
          animationsRef.current = [
            ...animationsRef.current, 
            {
              id: totalAnimation,
              layerId: currentLayerId,
              ref: React.createRef<HTMLCanvasElement>(),
              color: layer.color,
              lineWidth: layer.lineWidth,
              x: xAnimation,
              y: yAnimation,
              isVisible: layer.isVisible,
            }];
          setTotalAnimation(totalAnimation + 1);
        }
        
        canvas.addEventListener('pointerdown', drawFigure);

        return () => {
          canvas.removeEventListener('pointerdown', drawFigure);
        };
      };

      //自由図形レイヤーの場合の描画処理
      if(layer.type === Type.Free && clickFigureDrawing){
        const canvas = layer.ref.current;
        if (!canvas) return;

        const handlePointerDown = () => {
          isClicking.current = true;
        };
      
        canvas.addEventListener('pointerdown', handlePointerDown);
      
        return () => {
          canvas.removeEventListener('pointerdown', handlePointerDown);
        };

      }
    };  
  }, [isDrawing, currentLayerId, layers, drawCount, currentFigure, clickFigureDrawing, isPlaying, totalLoop, isClicking, totalAnimation]);

  return (
    <div className="container">
      <div className ="canvas">
      {
          layers.map((layer, index) => (
              <canvas
                key={`layer-${layer.id}-${index}`}
                ref={layer.ref}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                style={{
                  border: '1px solid black',
                  backgroundColor: "transparent",
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  pointerEvents: layer.id === currentLayerId ? 'auto' : 'none',
                }}
              />
          )) 
        }
        {
          animationsRef.current.map((animation, index) => (
            animation.isVisible &&
            <canvas
              key={`animation-${animation.layerId}-${index}`}
              ref={animation.ref}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              style={{
                border: '1px solid black',
                backgroundColor: "transparent",
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none',
              }}
            />
          ))
        }
      </div> 
      
      <Player 
          isPlaying={isPlaying}
          loops={loops}
          UpdateBeatCount={UpdateBeatCount}
          metronomeAudioBuffer={metronomeAudioBuffer}
          accentAudioBuffer={accentAudioBuffer}
          figureAudioBuffers={figureAudioBuffers}
          lineAudioSamplers={lineAudioSamplers}
          setIsPlaying={setIsPlaying}
          clickFigureDrawing={clickFigureDrawing}
          setLayers={setLayers}
          setTotalLayer={setTotalLayer}
          setLoops={setLoops}
          setTotalLoop={setTotalLoop}
          setCurrentLayerId={setCurrentLayerId}
          setCurrentFigure={setCurrentFigure}  
          setDrawCount={setDrawCount}        
          layers={layers}
          animationsRef={animationsRef}
        />
      

      <DrawingPannel
          setCurrentFigure={setCurrentFigure}
          currentFigure={currentFigure}
          layers={layers}
          setLayers={setLayers}
          currentLayerId={currentLayerId}
          setLoops={setLoops}
          quantizeRef={quantizeRef}
          clickFigureDrawing={clickFigureDrawing}
          setClickFigureDrawing={setClickFigureDrawing}
          isPlaying={isPlaying}
          positionRef={positionRef}
          animationsRef={animationsRef}
        />
      <LayerTab
          layers={layers}
          setLayers={setLayers}
          currentLayerId={currentLayerId}
          setCurrentLayerId={setCurrentLayerId}
          totalLayer={totalLayer}
          setTotalLayer={setTotalLayer}
          setLoops={setLoops}
          clickFigureDrawing={clickFigureDrawing}
          setIsAddFreeLayer={setIsAddFreeDrawing}
          animationsRef={animationsRef}
        />
    </div>
  );
}

export default App;
