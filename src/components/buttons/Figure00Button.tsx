import { IconButton } from "@mui/material";
import React from "react";
import Figure00 from '../../images/figure_templete_00.png';

type Props = {
  onClick: () => void;
  style: React.CSSProperties;
  disabled: boolean;
}

export const Figure00Button = ({onClick, style, disabled}: Props) => {
  return (
    <IconButton
      aria-label="add"
      onClick={onClick}
      disabled={disabled}
      style={{ width: 67, height: 67, ...style }}
    >
      <img src={Figure00} alt="add" width={67} height={67} />
    </IconButton>
  );
};
