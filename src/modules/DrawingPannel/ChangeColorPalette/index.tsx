import React from "react";

import { ColorButton } from "../../../components/buttons/ColorButton.tsx";
import { Layer } from "../../../types/layer.tsx";

type Props = {
  layers: Layer[];
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>;
  currentLayerId: number;
  redrawLayer: (layer: Layer) => void;
};

export const ChangeColorPalette = ({layers, setLayers, currentLayerId, redrawLayer}: Props) => {
  const changeLayerColor = (color: string) => {
    setLayers(prevLayers => {
      const newLayers = [...prevLayers];
      const targetLayerIndex =  newLayers.findIndex(layer => layer.id === currentLayerId);
      newLayers[targetLayerIndex] = { ...newLayers[targetLayerIndex], color:color };
      console.log(newLayers[targetLayerIndex]);
      redrawLayer(newLayers[targetLayerIndex]);
      return newLayers;
    });
  };

  const targetLayer = layers.find(layer => layer.id === currentLayerId);
  const isSelected = (color: string) => targetLayer?.color === color;

  return (
    <div className="colorframe">
      <div className="colorframe1">
        {['yellow', 'red', 'blue', 'purple'].map((buttonColor) => (
          <div
            key={buttonColor}
            style={{
              padding: '4px',
              borderRadius: '50%',
              backgroundColor: isSelected(buttonColor) ? '#E0E0E0' : 'transparent',
            }}
          >
            <ColorButton
              color={buttonColor}
              setPenColor={changeLayerColor}
              width={28}
            />
          </div>
        ))}
      </div>
      <div className="colorframe2">
      {['green', 'lightblue', 'orange', 'black'].map((buttonColor) => (
          <div
            key={buttonColor}
            style={{
              padding: '4px',
              borderRadius: '50%',
              backgroundColor: isSelected(buttonColor) ? '#E0E0E0' : 'transparent',
            }}
          >
            <ColorButton
              color={buttonColor}
              setPenColor={changeLayerColor}
              width={28}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
