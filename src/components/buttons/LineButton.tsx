import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  onClick?: () => void;
  style?: React.CSSProperties;
  width: number;
}

export const LineButton = ({onClick, style, width}: Props) => {
  return (
    <IconButton
      aria-label="line"
      onClick={onClick}
      style={{ ...style, borderRadius: "0", width: width, height: width, color: "black"}}
    >
      <MultilineChartIcon style={{fontSize: width, color:"black"}} />
    </IconButton>
  );
};
