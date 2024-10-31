import PolylineIcon from '@mui/icons-material/Polyline';
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  onClick?: () => void;
  style?: React.CSSProperties;
  width: number;
}

export const FreeDrawingButton = ({onClick, style, width}: Props) => {
  return (
    <IconButton
      aria-label="free-drawing"
      onClick={onClick}
      style={{ ...style, borderRadius: "0", width: width, height: width, color: "black" }}
    >
      <PolylineIcon style={{ fontSize: width, color:"black"}}/>
    </IconButton>
  );
};
