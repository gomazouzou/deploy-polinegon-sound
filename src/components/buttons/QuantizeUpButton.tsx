import { IconButton } from "@mui/material";
import React from "react";
import TabButton from "../../images/tab_button.png";

type Props = {
  onClick: () => void;
  disabled: boolean;
}

export const QuantizeUpButton = ({onClick, disabled}: Props) => {
  return (
    <IconButton
      aria-label="add"
      onClick={onClick}
      disabled={disabled}
      style={{ width: 15, height: 7.5}}
    >
      <img src={TabButton} alt='tab_button'   
        style={{
          width: '15px',
          height: '7.5px',
          flexShrink: 0,
          strokeWidth: '3px',
          stroke: '#000',
          transform: 'rotate(180deg)' 
        }}
      />
    </IconButton>
  );
};
