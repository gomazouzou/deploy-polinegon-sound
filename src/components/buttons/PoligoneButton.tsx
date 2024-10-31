import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import React from "react";

type Props = {
  width: number;
}

export const PoligoneButton = ({width}: Props) => {
  return (
      <ChangeHistoryIcon style={{fontSize: width, color:"black"}} />
  );
};
