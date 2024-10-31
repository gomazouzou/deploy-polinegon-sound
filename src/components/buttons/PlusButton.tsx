import { IconButton } from "@mui/material";
import React, { useRef } from "react";
import plusButton from '../../images/plus_button.png';

type Props = {
  onLongPress: () => void;
  disabled: boolean;
}

export const PlusButton = ({onLongPress, disabled}: Props) => {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleMouseDown = () => {
    timerRef.current = setInterval(onLongPress, 100);
  };

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  return (
    <IconButton
      aria-label="plus"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      disabled={disabled}
    >
      <img src={plusButton} alt="plus" width={12} height={24} />
    </IconButton>
  );
};
