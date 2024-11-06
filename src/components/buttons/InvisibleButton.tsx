import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  onClick: (e: React.MouseEvent) => void;
}

export const InvisibleButton = ({onClick}: Props) => {
  return (
    <IconButton
      aria-label="invisible"
      onClick={onClick}
    >
      <VisibilityOffIcon style = {{fontSize: 30, color: "black"}}/>
    </IconButton>
  );
};
