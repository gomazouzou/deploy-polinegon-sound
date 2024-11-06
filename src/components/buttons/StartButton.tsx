import { IconButton } from "@mui/material";
import React from "react";
import startButton from '../../images/start_button.png';

type Props = {
  onClick: () => void;
  disabled?: boolean;
}

export const StartButton = ({onClick, disabled}: Props) => {
  return (
    <IconButton
      aria-label="start"
      onClick={onClick}
      disabled={disabled}
      style={{ width: 58, height: 58 }}
    >
      <img src={startButton} alt="start" width={58} height={58} />
    </IconButton>
  );
};
