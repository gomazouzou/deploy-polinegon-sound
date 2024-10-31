import PolylineIcon from '@mui/icons-material/Polyline';
import React from "react";

type Props = {
  width: number;
}

export const FreeDrawingButton = ({width}: Props) => {
  return (
      <PolylineIcon style={{ fontSize: width, color:"black"}}/>
  );
};
