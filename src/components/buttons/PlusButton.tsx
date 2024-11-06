import { IconButton } from "@mui/material";
import React, { useRef } from "react";
import plusButton from '../../images/plus_button.png';

type Props = {
  onLongPress: () => void;
  disabled?: boolean;
}

export const PlusButton = ({onLongPress, disabled}: Props) => {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(onLongPress, 100);
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleMouseDown = () => {
    startTimer();
  };

  const handleMouseUp = () => {
    clearTimer();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    startTimer();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    clearTimer();
  };

  return (
    <IconButton
      aria-label="plus"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      disabled={disabled}
    >
      <img src={plusButton} alt="plus" width={12} height={24} />
    </IconButton>
  );
};
