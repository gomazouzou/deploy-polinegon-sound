import { IconButton } from "@mui/material";
import React from "react";
import addButton from '../../images/add_button.png';

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
      <img src={addButton} alt="add" width={26} height={26} />
    </IconButton>
  );
};
