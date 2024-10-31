import React from "react";

import { Figure00Button } from "../../components/buttons/Figure00Button.tsx";
import { Figure01Button } from "../../components/buttons/Figure01Button.tsx";
import { Figure02Button } from "../../components/buttons/Figure02Button.tsx";
import { Figure03Button } from "../../components/buttons/Figure03Button.tsx";
import { RedrawLayer } from "../../functions/Canvas.tsx";
import { Layer, Type } from "../../types/layer.tsx";
import { LoopInfo, Position } from "../../types/loop.tsx";
import { ChangeColorPalette } from "./ChangeColorPalette/index.tsx";
import { QuantizeSelector } from "./QuantizeSelector/index.tsx";


type Props = {
  setCurrentFigure: React.Dispatch<React.SetStateAction<number>>;
  currentFigure: number;
  layers: Layer[];
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>;
  currentLayerId: number;
  setLoops: React.Dispatch<React.SetStateAction<LoopInfo[]>>;
  quantizeRef: React.MutableRefObject<number>
  clickFigureDrawing: boolean;
  setClickFigureDrawing: React.Dispatch<React.SetStateAction<boolean>>;
  isPlaying: boolean;
  positionRef: React.MutableRefObject<Position>;
}

export const DrawingPannel = ({ setCurrentFigure, currentFigure, layers, setLayers, currentLayerId, setLoops, quantizeRef, clickFigureDrawing, setClickFigureDrawing, isPlaying, positionRef}: Props) => { 
  const buttonStyle = (num: number) => ({
    borderRadius: 0,
    backgroundColor: isSelected(num) ? "#E0E0E0" : "transparent", 
    width: "80px",
    height: "80px",
});

  const isSelected = (num: number) => currentFigure === num;
  const currentLayer = layers.find(layer => layer.id === currentLayerId);

  return(
    <div className='drawpannel'>
      <QuantizeSelector quantizeRef={quantizeRef} />
      <div className='widthsetting'>
        <div className='intervalexplain'>
          <span>ふとさ</span>
        </div>
      </div>

      <div className='colorsetting'>
        <div className='colorexplain'>
          <span>色</span>
        </div>
        <ChangeColorPalette 
                layers={layers}
                setLayers={setLayers}
                currentLayerId={currentLayerId}
                redrawLayer={(layer:Layer) => RedrawLayer(layer, setLoops)}
        />
      </div>
      
      <div className='rhythmsetting'>
        <div className='rhythmexplain'>
          <span>図形</span>
        </div>
        <div className='figureframe'>
          <Figure00Button onClick={() => setCurrentFigure(0)} style={buttonStyle(0)} disabled={currentLayer?.type !== Type.Poligone}/>
          <Figure01Button onClick={() => setCurrentFigure(1)} style={buttonStyle(1)} disabled={currentLayer?.type !== Type.Poligone}/>
          <Figure02Button onClick={() => setCurrentFigure(2)} style={buttonStyle(2)} disabled={currentLayer?.type !== Type.Poligone}/>
          <Figure03Button onClick={() => setCurrentFigure(3)} style={buttonStyle(3)} disabled={currentLayer?.type !== Type.Poligone}/>
        </div>
      </div>
    </div>
  );
};
