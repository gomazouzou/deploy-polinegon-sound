import { IconButton } from "@mui/material";
import React from "react";
import plusButton from '../../images/plus_button.png';

type Props = {
  onClick: () => void;
  disabled: boolean;
}

export const AddButton = ({onClick, disabled}: Props) => {
  return (
    <IconButton
      aria-label="add"
      onClick={onClick}
      disabled={disabled}
      style={{ width: 26, height: 26 }}
    >
      <img src={plusButton} alt="add" width={26} height={26} />
    </IconButton>
  );
};
