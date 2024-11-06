import React from "react";

import { ColorButton } from '../../../components/buttons/ColorButton.tsx';
import { DeleteButton } from "../../../components/buttons/DeleteButton.tsx";
import { FreeDrawingButton } from "../../../components/buttons/FreeDrawingButton.tsx";
import { LineButton } from "../../../components/buttons/LineButton.tsx";
import { PoligoneButton } from "../../../components/buttons/PoligoneButton.tsx";
import { ChangeColorToInstrumentName } from "../../../hooks/useColorToInstrumentId.tsx";
import { ChangeColorToBackColor, ChangeColorToTrueColor } from "../../../hooks/useColorToTrueColor.tsx";
import { Layer, Type } from "../../../types/layer.tsx";
import { LoopInfo } from "../../../types/loop.tsx";


type Props = {
  layer: Layer;
  setCurrentLayerId: React.Dispatch<React.SetStateAction<number>>;
  isHilighted: boolean;
  disabled: boolean;
  setLoops: React.Dispatch<React.SetStateAction<LoopInfo[]>>;
  clickFigureDrawing: boolean;
  deleteLayer: (layerId: number, setLoops: React.Dispatch<React.SetStateAction<LoopInfo[]>>) => void;
}

export const LayerCard = ({layer, setCurrentLayerId, isHilighted, disabled, setLoops, clickFigureDrawing, deleteLayer}: Props) => {
  const getTypeButton = (type: Type) => {
    switch (type) {
      case Type.Line:
        return <LineButton width={36}/>;
      case Type.Poligone:
        return <PoligoneButton width={36}/>;
      case Type.Free:
        return <FreeDrawingButton width={36}/>;
    }
  }
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // イベントの伝播を停止
    deleteLayer(layer.id, setLoops);
  };

  return (
      <div 
        className='layercard' 
        onClick = {() => {
          if (disabled) return;
          setCurrentLayerId(layer.id);
        }}
        style={{ border: isHilighted ? '3px solid' + ChangeColorToTrueColor(layer.color) : '3px solid transparent',backgroundColor : ChangeColorToBackColor(layer.color)}}
      >
        <div className="layercolorframe" >
          <ColorButton color={layer.color} width={30}/>
          <span>{ChangeColorToInstrumentName(layer.color, layer.type)}</span>
        </div>
        <div className="layericon">
          {getTypeButton(layer.type)}
          <DeleteButton onClick={handleDeleteClick} disabled={clickFigureDrawing}/>
        </div>
      </div>
  )
}
