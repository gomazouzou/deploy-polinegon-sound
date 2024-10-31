import { IconButton } from "@mui/material";
import React from "react";
import stopButton from '../../images/stop_button.png';

type Props = {
  onClick: () => void;
  disabled: boolean;
}

export const StopButton = ({onClick, disabled}: Props) => {
  return (
    <IconButton
      aria-label="stop"
      onClick={onClick}
      disabled={disabled}
    >
      <img src={stopButton} alt="start" width={58} height={58} />
    </IconButton>
  );
};
