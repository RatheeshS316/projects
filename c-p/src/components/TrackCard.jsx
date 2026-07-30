import React from 'react';
import './Card.css';

const TrackCard = ({ icon, title, topics }) => {
  return (
    <div className="track-card">
      <div className="track-icon">{icon}</div>
      <h3 className="track-title">{title}</h3>
      <ul className="track-topics">
        {topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
    </div>
  );
};

export default TrackCard;
