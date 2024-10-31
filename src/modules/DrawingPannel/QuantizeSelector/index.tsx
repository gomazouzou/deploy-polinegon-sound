import React, { useState } from 'react';
import { QuantizeDownButton } from '../../../components/buttons/QuantizeDownButton.tsx';
import { QuantizeUpButton } from '../../../components/buttons/QuantizeUpButton.tsx';

export const QuantizeSelector = ({ quantizeRef }) => {
  const [, forceUpdate] = useState({});

  return (
    <div className='intervalsetting'>
        <div className='intervalexplain'>
          <span>音の鳴る間隔</span>
        </div>
        <div className='quantize-selector'>
          <span>{quantizeRef.current}</span>
          <div className='button-container'>
            <QuantizeUpButton onClick={() => {quantizeRef.current = Math.max(quantizeRef.current / 2, 2); forceUpdate({})}} />
            <QuantizeDownButton onClick={() => {quantizeRef.current = Math.min(quantizeRef.current * 2, 16); forceUpdate({})}} />
          </div>
        </div>
    </div>
  );
};
