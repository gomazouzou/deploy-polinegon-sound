import React, { useEffect, useRef, useState } from "react";
import { ColorButton } from "../../../../components/buttons/ColorButton.tsx";
import { MAX_LINE_WIDTH, MIN_LINE_WIDTH } from "../../../../config/constants.tsx";
import Pencil from "../../../../images/pencil.png";

type Props = {
  color: string;
  lineWidth: number;
  setLineWidth: React.Dispatch<React.SetStateAction<number>>;
};

export const LineWidthSelector = ({color, lineWidth, setLineWidth}:Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const position = Math.max(0, Math.min(clientX - sliderRect.left, sliderRect.width));
    const percentage = position / sliderRect.width;

    const newWidth = Math.round(MIN_LINE_WIDTH + percentage * (MAX_LINE_WIDTH - MIN_LINE_WIDTH));
    setLineWidth(newWidth);
  };

  const handleEnd = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  // マウスイベントハンドラー
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  // タッチイベントハンドラー
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseMoveEffect = (e: MouseEvent) => handleMouseMove(e);
    const handleTouchMoveEffect = (e: TouchEvent) => handleTouchMove(e);
    const handleEndEffect = () => handleEnd();

    // マウスイベント
    window.addEventListener('mousemove', handleMouseMoveEffect);
    window.addEventListener('mouseup', handleEndEffect);

    // タッチイベント
    window.addEventListener('touchmove', handleTouchMoveEffect, { passive: false });
    window.addEventListener('touchend', handleEndEffect);
    window.addEventListener('touchcancel', handleEndEffect);

    return () => {
      // マウスイベントのクリーンアップ
      window.removeEventListener('mousemove', handleMouseMoveEffect);
      window.removeEventListener('mouseup', handleEndEffect);

      // タッチイベントのクリーンアップ
      window.removeEventListener('touchmove', handleTouchMoveEffect);
      window.removeEventListener('touchend', handleEndEffect);
      window.removeEventListener('touchcancel', handleEndEffect);
    };
  }, [isDragging]);

  const SLIDER_WIDTH = 240;
  const calculateButtonPosition = () => {
    const percentage = (lineWidth - MIN_LINE_WIDTH) / (MAX_LINE_WIDTH - MIN_LINE_WIDTH);
    const effectiveSliderWidth = SLIDER_WIDTH;
    return percentage * effectiveSliderWidth;
  };

  return (
    <div className='width-slider-dialog'>
      <img src={Pencil} alt='pencil' width={42} height={42} />
      <div className='slider-dialog' ref={sliderRef} style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: `${calculateButtonPosition()-16}px`,
            cursor: 'pointer',
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <ColorButton color={color} width={28} />
        </div>
      </div>
      <div className='width-value-dialog'>
        <span>{lineWidth}</span>
      </div>
    </div>
  );
};
