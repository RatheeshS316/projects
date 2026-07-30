import React from 'react';
import './Timeline.css';

const Timeline = ({ dates }) => {
  return (
    <div className="timeline">
      {dates.map((item, index) => (
        <div key={index} className="timeline-item transform-on-scroll">
          <div className="timeline-dot"></div>
          <div className="timeline-date">{item.date}</div>
          <div className="timeline-content">
            <h3 className="timeline-title">{item.title}</h3>
            {item.description && <p className="timeline-desc">{item.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
