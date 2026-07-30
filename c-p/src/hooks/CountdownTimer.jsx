import React from 'react';
import { useCountdown } from './useCountdown';
import './CountdownTimer.css';

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <div className="countdown-container">
      {units.map((unit) => (
        <div key={unit.label} className="countdown-box">
          <div className="countdown-value">{unit.value.toString().padStart(2, '0')}</div>
          <div className="countdown-label">{unit.label}</div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
