import { Stack } from "@mui/material";
import React from "react";

import { ColorButton } from "../../../../components/buttons/ColorButton.tsx";

type Props = {
  setPenColor: React.Dispatch<React.SetStateAction<string>>;
  color: string;
};


export const ColorSelector = ({setPenColor, color}: Props) => {
  const buttonStyle = (color: string) => ({
    borderRadius: "50%",
    backgroundColor: isSelected(color) ?  "#E0E0E0" : "transparent",
    width: "40px",
    height: "40px",
    margin: "5px"
  });
  
  const isSelected = (color_i: string) => color === color_i;

  return (
    <Stack alignItems="center" justifyContent="center" style={{ height: '100%' }}>
      <Stack direction="row">
        <ColorButton color="black" setPenColor={setPenColor} style={buttonStyle("black")} width={42}/>
        <ColorButton color="red" setPenColor={setPenColor} style={buttonStyle("red")} width={42}/>
        <ColorButton color="blue" setPenColor={setPenColor} style={buttonStyle("blue")} width={42}/>
        <ColorButton color="yellow" setPenColor={setPenColor} style={buttonStyle("yellow")} width={42}/>
        <ColorButton color="green" setPenColor={setPenColor} style={buttonStyle("green")} width={42}/>
        <ColorButton color="orange" setPenColor={setPenColor} style={buttonStyle("orange")} width={42}/>
        <ColorButton color="lightblue" setPenColor={setPenColor} style={buttonStyle("lightblue")} width={42}/>
        <ColorButton color="purple" setPenColor={setPenColor} style={buttonStyle("purple")} width={42}/>
      </Stack>
    </Stack>
  );
};
