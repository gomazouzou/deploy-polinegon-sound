import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  onClick: (e: React.MouseEvent) => void;
}

export const VisibleButton = ({onClick}: Props) => {
  return (
    <IconButton
      aria-label="visible"
      onClick={onClick}
    >
      <VisibilityIcon style = {{fontSize: 30, color: "black"}}/>
    </IconButton>
  );
};
