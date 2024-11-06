import React from "react";
import { AddButton } from "../../components/buttons/AddButton.tsx";
import { useDisclosure } from "../../hooks/useDiscloser.tsx";

import { Animation } from "../../types/animation.tsx";
import { Layer, Type } from "../../types/layer.tsx";
import { LoopInfo } from "../../types/loop.tsx";
import { AddLayerDialog } from "./AddLayerDialog/index.tsx";
import { LayerCard } from "./LayerCard/index.tsx";

type Props = {
  layers: Layer[];
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>
  currentLayerId: number;
  setCurrentLayerId: React.Dispatch<React.SetStateAction<number>>;
  totalLayer: number;
  setTotalLayer: React.Dispatch<React.SetStateAction<number>>;
  setLoops: React.Dispatch<React.SetStateAction<LoopInfo[]>>;
  clickFigureDrawing: boolean;
  setIsAddFreeLayer: React.Dispatch<React.SetStateAction<boolean>>;
  animationsRef: React.MutableRefObject<Animation[]>;
}

export const LayerTab = ({layers, setLayers, currentLayerId, setCurrentLayerId, totalLayer, setTotalLayer, setLoops, clickFigureDrawing, setIsAddFreeLayer, animationsRef}: Props) => {

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
          isVisible: true,
        }
      ]
      return newLayers;
    });
    setTotalLayer(totalLayer + 1);
    setCurrentLayerId(totalLayer + 1);
    if (type === Type.Free){
      setIsAddFreeLayer(true);
    }
  };

  const deleteLayer = (layerId: number, setLoops: React.Dispatch<React.SetStateAction<LoopInfo[]>>) => {
    if (layers.length < 2){
      return;
    }
  
    const newLayers = layers.filter(layer => layer.id !== layerId);
     
    if (currentLayerId === layerId){
      const currentIndex = layers.findIndex(layer => layer.id === currentLayerId); 
      const newCurrentLayerId = currentIndex -1 >= 0 ? layers[currentIndex - 1].id: layers[currentIndex + 1].id;
      setCurrentLayerId(newCurrentLayerId);
    }
    setLayers(newLayers);

    // ループ情報の更新
    setLoops(prevLoops => prevLoops.filter(loop => loop.layer_id !== layerId));
    // アニメーション情報の更新
    animationsRef.current = animationsRef.current.filter(animation => animation.layerId !== layerId);
  };

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
              setLayers={setLayers}
              animationsRef={animationsRef}
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
