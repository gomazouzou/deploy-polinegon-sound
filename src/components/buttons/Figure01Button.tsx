import { IconButton } from "@mui/material";
import { default as React } from "react";
import Figure01 from '../../images/figure_templete_01.png';

type Props = {
  onClick: () => void;
  style: React.CSSProperties;
  disabled: boolean;
}

export const Figure01Button = ({onClick, style, disabled}: Props) => {
  return (
    <IconButton
      aria-label="add"
      onClick={onClick}
      disabled={disabled}
      style={{ width: 67, height: 67, ...style }}
    >
      <img src={Figure01} alt="add" width={67} height={67} />
    </IconButton>
  );
};
