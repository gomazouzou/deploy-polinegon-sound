import React, { useEffect } from "react";
import { AddButton } from "../../components/buttons/AddButton.tsx";
import { useDisclosure } from "../../hooks/useDiscloser.tsx";

import { drawFrame } from "../../hooks/useDrawFigure.tsx";
import { Layer, Type } from "../../types/layer.tsx";
import { LoopInfo, Position } from "../../types/loop.tsx";
import { AddLayerDialog } from "./AddLayerDialog/index.tsx";
import { LayerCard } from "./LayerCard/index.tsx";

type Props = {
  setClickFigureDrawing: React.Dispatch<React.SetStateAction<boolean>>;
  layers: Layer[];
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>
  currentLayerId: number;
  setCurrentLayerId: React.Dispatch<React.SetStateAction<number>>;
  totalLayer: number;
  setTotalLayer: React.Dispatch<React.SetStateAction<number>>;
  setLoops: React.Dispatch<React.SetStateAction<LoopInfo[]>>;
  clickFigureDrawing: boolean;
  positionRef: React.MutableRefObject<Position>;
}

export const LayerTab = ({setClickFigureDrawing, layers, setLayers, currentLayerId, setCurrentLayerId, totalLayer, setTotalLayer, setLoops, clickFigureDrawing, positionRef}: Props) => {

  const {
    isOpen: isCOpenAddLayerDialog,
    open: openAddLayerDialog,
    close: closeAddLayerDialog,
  } = useDisclosure({});

  const addLayer = (color: string, lineWidth: number, type: Type) => {
    setLayers(prevLayers => {
      const newLayers = [
        ...prevLayers,
        {
          id: totalLayer + 1,
          ref: React.createRef<HTMLCanvasElement>(),
          color: color,
          lineWidth: lineWidth,
          drawings: [],
          figures: [],
          edge: [],
          type: type,
        }
      ]
      setTotalLayer(totalLayer + 1);
      setCurrentLayerId(totalLayer + 1);

      const currentLayer = layers.find(layer => layer.id === currentLayerId);
      if (type === Type.Free){
        setClickFigureDrawing(!clickFigureDrawing);
        const position: Position = drawFrame(currentLayer);
        positionRef.current = position;
      }
      return newLayers;
    });
  };

  const deleteLayer = (layerId: number, setLoops: React.Dispatch<React.SetStateAction<LoopInfo[]>>) => {
    if (layers.length < 2){
      return;
    }
  
    const newLayers = layers.filter(layer => layer.id !== layerId);
    setLayers(newLayers);
     
    if (currentLayerId === layerId){
      const currentIndex = layers.findIndex(layer => layer.id === currentLayerId); 
      const newCurrentIndex = newLayers[currentIndex - 1].id;
      setCurrentLayerId(newCurrentIndex);
    }

    //ループ情報の更新
    setLoops(prevLoops => prevLoops.filter(loop => loop.layer_id !== layerId));
  };
  useEffect(() => {
    console.log(layers);
    console.log(currentLayerId);
  }
  ,[layers, currentLayerId]);

  return(
    <>
    <div className='layerpannel'>
      <div className='layerheader'>
        <span style={{
              color: '#FFF',
              fontFamily: 'NicoMoji+v2',
              fontSize: '28px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal'
        }}>
            楽器
        </span>
        <AddButton onClick={openAddLayerDialog} disabled={clickFigureDrawing}/>
      </div>
      <div className='layerregion'>
      {layers.map((layer, index) => (
            <LayerCard
              layer={layer}
              setCurrentLayerId={setCurrentLayerId}
              isHilighted={layer.id === currentLayerId} 
              disabled={clickFigureDrawing}
              clickFigureDrawing={clickFigureDrawing}
              deleteLayer={deleteLayer}
              setLoops={setLoops}
            />
          ))}
      </div>

    <AddLayerDialog
      open={isCOpenAddLayerDialog}
      onClose={closeAddLayerDialog}
      addLayer={addLayer}
    />
    </div>
    </>
  );
};
