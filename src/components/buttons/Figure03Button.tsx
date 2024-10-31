import { IconButton } from "@mui/material";
import React from "react";
import Figure03 from '../../images/figure_templete_03.png';

type Props = {
  onClick: () => void;
  style: React.CSSProperties;
  disabled: boolean;
}

export const Figure03Button = ({onClick, style, disabled}: Props) => {
  return (
    <IconButton
      aria-label="add"
      onClick={onClick}
      disabled={disabled}
      style={{ width: 72, height: 72, ...style }}
    >
      <img src={Figure03} alt="add" width={72} height={72} />
    </IconButton>
  );
};
