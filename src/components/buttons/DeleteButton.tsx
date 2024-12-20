import { IconButton } from "@mui/material";
import React from "react";
import deleteButton from '../../images/delete_button.png';

type Props = {
  onClick: (e: React.MouseEvent) => void;
  disabled: boolean;
}

export const DeleteButton = ({onClick, disabled}: Props) => {
  return (
    <IconButton
      aria-label="delete"
      onClick={onClick}
      disabled={disabled}
    >
      <img src={deleteButton} alt="delete" width={28} height={28} />
    </IconButton>
  );
};
