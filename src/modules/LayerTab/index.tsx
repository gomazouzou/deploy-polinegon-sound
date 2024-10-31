import { createTheme } from "@mui/material";
import { makeStyles } from '@mui/styles';
import React from "react";
import { AddButton } from "../../components/buttons/AddButton.tsx";
import { useDisclosure } from "../../hooks/useDiscloser.tsx";

import { Layer, Type } from "../../types/layer.tsx";
import { LoopInfo } from "../../types/loop.tsx";
import { AddLayerDialog } from "./AddLayerDialog/index.tsx";
import { LayerCard } from "./LayerCard/index.tsx";

type Props = {
  canvasColor: string;
  layers: Layer[];
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>
  currentLayerId: number;
  setCurrentLayerId: React.Dispatch<React.SetStateAction<number>>;
  totalLayer: number;
  setTotalLayer: React.Dispatch<React.SetStateAction<number>>;
  setLoops: React.Dispatch<React.SetStateAction<LoopInfo[]>>;
  clickFigureDrawing: boolean;
}
const useStyles = makeStyles({
  customText: {
    color: '#FFF',
    fontFamily: 'NicoMoji+v2',
    fontSize: '28px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
  },
});

const theme = createTheme({
  typography: {
    fontFamily: 'NicoMoji+v2',
  },
});


export const LayerTab = ({canvasColor, layers, setLayers, currentLayerId, setCurrentLayerId, totalLayer, setTotalLayer, setLoops, clickFigureDrawing}: Props) => {

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
      return newLayers;
    });
  };

  const deleteLayer = (layerId: number, setLoops: React.Dispatch<React.SetStateAction<LoopInfo[]>>) => {
    if (layers.length < 2){
      return;
    }
    
    const currentIndex = layers.findIndex(layer => layer.id === currentLayerId);
    const newLayers = layers.filter(layer => layer.id !== layerId);
    setLayers(newLayers);
    
    const newCurrentIndex = currentIndex - 1 > 0 ? newLayers[currentIndex - 1].id : newLayers[0].id
    setCurrentLayerId(newCurrentIndex);

    //ループ情報の更新
    setLoops(prevLoops => prevLoops.filter(loop => loop.layer_id !== layerId));
  };
  
  const currentIndex = layers.findIndex(layer => layer.id === currentLayerId);

  const classes = useStyles();

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
              id={index}
              setCurrentLayerId={setCurrentLayerId}
              isHilighted={currentIndex === index} 
              disabled={clickFigureDrawing}
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
