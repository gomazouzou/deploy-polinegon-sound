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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    // ボタンの半分の幅を考慮して調整
    const position = Math.max(0, Math.min(e.clientX - sliderRect.left, sliderRect.width));
    const percentage = position / sliderRect.width;

    const newWidth = Math.round(MIN_LINE_WIDTH + percentage * (MAX_LINE_WIDTH - MIN_LINE_WIDTH));

    setLineWidth(newWidth);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  useEffect(() => {
    const handleMouseMoveEffect = (e: MouseEvent) => {
      if (isDragging) {
        handleMouseMove(e);
      }
    };

    const handleMouseUpEffect = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    window.addEventListener('mousemove', handleMouseMoveEffect);
    window.addEventListener('mouseup', handleMouseUpEffect);

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveEffect);
      window.removeEventListener('mouseup', handleMouseUpEffect);
    };
  }, [isDragging]);

  const SLIDER_WIDTH = 240; 
  const calculateButtonPosition = () => {
    const percentage = (lineWidth - MIN_LINE_WIDTH) / (MAX_LINE_WIDTH - MIN_LINE_WIDTH);
    // スライダーの実効可動域を計算
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
