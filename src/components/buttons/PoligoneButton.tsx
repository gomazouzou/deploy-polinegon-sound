import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  onClick?: () => void;
  style?: React.CSSProperties
  width: number;
}

export const PoligoneButton = ({onClick, style, width}: Props) => {
  return (
    <IconButton
      aria-label="poligone"
      onClick={onClick}
      style={{ ...style, borderRadius: "0", width: width, height: width, color: "black"}}
    >
      <ChangeHistoryIcon style={{fontSize: width, color:"black"}} />
    </IconButton>
  );
};
