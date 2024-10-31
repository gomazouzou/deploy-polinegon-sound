import { IconButton } from "@mui/material";
import React from "react";
import BlackButton from '../../images/black_button.png';
import BlueButton from '../../images/blue_button.png';
import GreenButton from '../../images/green_button.png';
import LightBlueButton from '../../images/lightblue_button.png';
import OrangeButton from '../../images/orange_button.png';
import PurpleButton from '../../images/purple_button.png';
import RedButton from '../../images/red_button.png';
import YellowButton from '../../images/yellow_button.png';


type Props = {
  color: string;
  setPenColor?: (color:string) => void;
  style?: React.CSSProperties;
  width: number;
}

export const ColorButton = ({color, setPenColor, style, width}: Props) => {
  const onClick = () => {
    if (!setPenColor) return;
    setPenColor(color);
  }
  const getButtonImage = (color: string) => {
    switch (color) {
      case 'black':
        return BlackButton;
      case 'red':
        return RedButton;
      case 'blue':
        return BlueButton;
      case 'green':
        return GreenButton;
      case 'yellow':
        return YellowButton;
      case 'purple':
        return PurpleButton;
      case 'orange':
        return OrangeButton;
      case 'lightblue':
        return LightBlueButton;
    }
  };
  return (
    <IconButton
      aria-label="color"
      onClick={onClick}
      style={{...style, width: width, height: width}}
    >
      <img src={getButtonImage(color)} alt="add" width={width} height={width} />
    </IconButton>
  );
};
