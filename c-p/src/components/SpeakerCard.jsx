import React from 'react';
import './Card.css';

const SpeakerCard = ({ name, role, university, image }) => {
  return (
    <div className="speaker-card">
      <div className="speaker-img-container">
        {image ? (
          <img src={image} alt={name} className="speaker-img" />
        ) : (
          <div className="speaker-img-placeholder">👨‍🏫</div>
        )}
      </div>
      <div className="speaker-info">
        <h3 className="speaker-name">{name}</h3>
        <p className="speaker-role">{role}</p>
        <p className="speaker-univ">{university}</p>
      </div>
    </div>
  );
};

export default SpeakerCard;
