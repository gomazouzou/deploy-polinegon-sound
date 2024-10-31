import React, { useState } from 'react';

import { CloseButton } from '../../../components/buttons/CloseButton.tsx';
import { FreeDrawingButton } from '../../../components/buttons/FreeDrawingButton.tsx';
import { LineButton } from '../../../components/buttons/LineButton.tsx';
import { PoligoneButton } from '../../../components/buttons/PoligoneButton.tsx';
import { DEFAULT_LINE_WIDTH } from '../../../config/constants.tsx';
import { Type } from '../../../types/layer.tsx';
import { ColorSelector } from './ColorSelector/index.tsx';
import { LineWidthSelector } from './LineWidthSelector/index.tsx';

type Props = {
  open: boolean;
  onClose: () => void;
  addLayer: (color: string, lineWidth: number,type: Type) => void;
};

export const AddLayerDialog = ({open, onClose, addLayer}: Props) =>  {
  const [type, setType] = useState<Type>(Type.Line);
  const [color, setColor] = useState<string>("black");
  const [lineWidth, setLineWidth] = useState<number>(DEFAULT_LINE_WIDTH);

  const isSelected = (color_i: Type) => type === color_i;
  const buttonStyle = (type: Type) => ({
    backgroundColor: isSelected(type) ?  "#E0E0E0" : "transparent",
    width: "120px",
    height: "140px",
    borderRadius: "16px",
  });

  const [showLineTooltip, setShowLineTooltip] = useState(false);
  const [showPoligoneTooltip, setShowPoligoneTooltip] = useState(false);
  const [showFreeTooltip, setShowFreeTooltip] = useState(false);
  
  if (!open) return null;
  return (
    <>
    <div className="dialog-overlay">
      <div className='dialog-wrapper'>
        <div className="dialog-header">
          <div className='dialog-header-frame'>
            <span>新しい楽器を追加</span>
            <CloseButton onClick={onClose}/>
          </div>
        </div>
        <div className="type-decide-frame">
          <span>タイプを選択</span>
        </div>
        <div className="melody-select-frame" 
          style={buttonStyle(Type.Line)} 
          onClick={() => setType(Type.Line)} 
          onMouseEnter={() => setShowLineTooltip(true)}
          onMouseLeave={() => setShowLineTooltip(false)}
        >
          <LineButton width={85} />
          <span>メロディ</span>
        </div>
        <div className="rhythm-select-frame" 
          style={buttonStyle(Type.Poligone)} 
          onClick={() => setType(Type.Poligone)}
          onMouseEnter={() => setShowPoligoneTooltip(true)}
          onMouseLeave={() => setShowPoligoneTooltip(false)}
        >
          <PoligoneButton width={85}  />
          <span>リズム</span>
        </div>
        <div className="free-select-frame" 
          style={buttonStyle(Type.Free)} 
          onClick={() => setType(Type.Free)}
          onMouseEnter={() => setShowFreeTooltip(true)}
          onMouseLeave={() => setShowFreeTooltip(false)}
        >
          <FreeDrawingButton width={85}  />
          <span>リズム<br/>(カスタム)</span>
        </div>
        {showLineTooltip && (
          <div className="tooltip-line">
            <span>線を自由に引いてメロディを作ろう</span>
          </div>
        )}
        {showPoligoneTooltip && (
          <div className="tooltip-poligone">
            <span>図形をおいてリズムを追加しよう</span>
          </div>
        )}
        {showFreeTooltip && (
          <div className="tooltip-free">
            <span>オリジナルのリズムを作成できるよ</span>
          </div>
        )}
        <div className="color-decide-frame">
          <span>色を選択</span>
        </div>
        <div className="color-palette">
          <ColorSelector setPenColor={setColor} color={color}/>
        </div>
        <div className="width-decide-frame">
          <span>太さを選択</span>
        </div>

        <LineWidthSelector color={color} setLineWidth={setLineWidth} lineWidth={lineWidth}/>

        <div className="decide-frame" onClick={() => {addLayer(color, lineWidth, type); onClose();}}>
          <span>決定</span>
        </div>
      </div>
    </div>
    </>
      
  );
}
