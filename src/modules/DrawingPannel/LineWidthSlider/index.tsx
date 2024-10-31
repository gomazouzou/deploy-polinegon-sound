import React, { useEffect, useRef, useState } from "react";
import { ColorButton } from "../../../components/buttons/ColorButton.tsx";
import { MAX_LINE_WIDTH, MIN_LINE_WIDTH } from "../../../config/constants.tsx";
import Pencil from "../../../images/pencil.png";
import { Layer } from "../../../types/layer.tsx";

type Props = {
  layers: Layer[];
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>;
  currentLayerId: number;
  redrawLayer: (layer: Layer) => void;
};

export const LineWidthSlider = ({layers, setLayers, currentLayerId, redrawLayer}:Props) => {
  const targetLayer = layers.find(layer => layer.id === currentLayerId);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current || !targetLayer) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    // ボタンの半分の幅を考慮して調整
    const position = Math.max(0, Math.min(e.clientX - sliderRect.left, sliderRect.width));
    const percentage = position / sliderRect.width;

    const newWidth = Math.round(MIN_LINE_WIDTH + percentage * (MAX_LINE_WIDTH - MIN_LINE_WIDTH));

    const updatedLayer = { ...targetLayer, lineWidth: newWidth };
  
    setLayers(prevLayers =>
      prevLayers.map(layer =>
        layer.id === currentLayerId
          ? updatedLayer
          : layer
      )
    );
    redrawLayer(updatedLayer);
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

  if (!targetLayer) return null;

  const SLIDER_WIDTH = 200; 
  const BUTTON_WIDTH = 28; 
  const calculateButtonPosition = () => {
    const percentage = (targetLayer.lineWidth - MIN_LINE_WIDTH) / (MAX_LINE_WIDTH - MIN_LINE_WIDTH);
    // スライダーの実効可動域を計算
    const effectiveSliderWidth = SLIDER_WIDTH - BUTTON_WIDTH;
    return percentage * effectiveSliderWidth;
  };

  return (
    <div className='width-setting'>
      <div className='width-explain'>
        <span>ふとさ</span>
      </div>
      <div className='width-slider'>
        <img src={Pencil} alt='pencil' width={28} height={28} />
        <div className='slider' ref={sliderRef} style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              left: `${calculateButtonPosition() - 14}px`,
              cursor: 'pointer',
            }}
            onMouseDown={handleMouseDown}
          >
            <ColorButton color={targetLayer?.color} width={28} />
          </div>
        </div>
        <div className='width-value'>
          <span>{targetLayer?.lineWidth}</span>
        </div>
      </div>
    </div>
  );
};
