import React, { useState } from 'react';
import { QuantizeDownButton } from '../../../components/buttons/QuantizeDownButton.tsx';
import { QuantizeUpButton } from '../../../components/buttons/QuantizeUpButton.tsx';

export const QuantizeSelector = ({ quantizeRef ,disabled}) => {
  const [, forceUpdate] = useState({});

  return (
    <div className='intervalsetting'>
        <div className='intervalexplain'>
          <span>音の鳴る間隔</span>
        </div>
        <div className='quantize-selector'>
          <span>{quantizeRef.current}</span>
          <div className='button-container'>
            <QuantizeUpButton onClick={() => {quantizeRef.current = Math.max(quantizeRef.current / 2, 2); forceUpdate({})}} disabled={disabled}/>
            <QuantizeDownButton onClick={() => {quantizeRef.current = Math.min(quantizeRef.current * 2, 16); forceUpdate({})}} disabled={disabled}/>
          </div>
        </div>
    </div>
  );
};
