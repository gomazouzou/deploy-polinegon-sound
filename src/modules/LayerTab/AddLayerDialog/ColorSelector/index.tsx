import React from "react";

import { ColorButton } from "../../../../components/buttons/ColorButton.tsx";

type Props = {
  setPenColor: React.Dispatch<React.SetStateAction<string>>;
  color: string;
};


export const ColorSelector = ({setPenColor, color}: Props) => {
  return (
    <>
     {['black', 'red', 'blue', 'yellow', 'green', 'orange', 'lightblue', 'purple'].map((buttonColor) => (
        <div
          key={buttonColor}
          style={{
            padding: '6px',
            borderRadius: '50%',
            backgroundColor: color === buttonColor ? '#E0E0E0' : 'transparent',
          }}
        >
          <ColorButton
            color={buttonColor}
            setPenColor={setPenColor}
            width={42}
          />
        </div>
      ))}
    </>
  );
};
