import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import React from "react";

type Props = {
  width: number;
}

export const LineButton = ({width}: Props) => {
  return (
      <MultilineChartIcon style={{fontSize: width, color:"black"}} />
  );
};
