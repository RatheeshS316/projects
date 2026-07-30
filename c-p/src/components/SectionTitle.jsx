import React from 'react';
import './SectionTitle.css';

const SectionTitle = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`section-header ${centered ? 'centered' : ''}`}>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="section-divider"></div>
    </div>
  );
};

export default SectionTitle;
