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
      redrawLayer(newLayers[targetLayerIndex]);
      return newLayers;
    });
  };

  const buttonStyle = (color: string) => ({
    borderRadius: "200%",
    backgroundColor: isSelected(color) ?  "#E0E0E0" : "transparent",
  });
  const targetLayer = layers.find(layer => layer.id === currentLayerId);
  const isSelected = (color: string) => targetLayer?.color === color;

  return (
    <div className="colorframe">
      <div className="colorframe1">
        <ColorButton color="yellow" setPenColor={changeLayerColor} style={buttonStyle("yellow")} width={30}/>
        <ColorButton color="red" setPenColor={changeLayerColor} style={buttonStyle("red")} width={30}/>
        <ColorButton color="blue" setPenColor={changeLayerColor} style={buttonStyle("blue")} width={30}/>
        <ColorButton color="purple" setPenColor={changeLayerColor} style={buttonStyle("purple")} width={30}/>
      </div>
      <div className="colorframe2">
        <ColorButton color="green" setPenColor={changeLayerColor} style={buttonStyle("green")} width={30}/>
        <ColorButton color="lightblue" setPenColor={changeLayerColor} style={buttonStyle("lightblue")} width={30}/>
        <ColorButton color="orange" setPenColor={changeLayerColor} style={buttonStyle("orange")} width={30}/>
        <ColorButton color="black" setPenColor={changeLayerColor} style={buttonStyle("black")} width={30}/>
      </div>
    </div>
  );
};
