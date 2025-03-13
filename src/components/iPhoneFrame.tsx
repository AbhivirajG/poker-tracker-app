import React from 'react';
import PokerTracker from './PokerTracker';
import './iPhoneFrame.css';

const iPhoneFrame: React.FC = () => {
  return (
    <div className="iphone-frame">
      <div className="screen">
        <PokerTracker />
      </div>
    </div>
  );
};

export default iPhoneFrame;