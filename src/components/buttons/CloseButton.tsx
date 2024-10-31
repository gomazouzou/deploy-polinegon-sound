import { IconButton } from "@mui/material";
import React from "react";
import closeButton from '../../images/close_button.png';

type Props = {
  onClick: () => void;
}

export const CloseButton = ({onClick}: Props) => {
  return (
    <IconButton
      aria-label="close"
      onClick={onClick}
      style={{ width: 40, height: 40 }}
    >
      <img src={closeButton} alt="add" width={40} height={40} />
    </IconButton>
  );
};
