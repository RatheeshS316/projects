import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import CountdownTimer from '../hooks/CountdownTimer';

const Hero = () => {
  // Target date for the conference: July 15, 2026
  const targetDate = '2026-07-15T09:00:00';

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="hero-badge">10th International Conference</div>
        <h1 className="hero-title">
          10th International Conference on <span>Computing</span>, 
          Networking and <span>Communication</span> Technology
        </h1>
        <p className="hero-subtitle">
          Join leading experts, researchers, and practitioners from around the globe to explore 
          the future of computing and networking technologies in an immersive academic environment.
        </p>
        
        <div className="hero-info">
          <div className="info-item">
            <span className="info-icon">📅</span>
            <span className="info-text">July 15-17, 2026</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📍</span>
            <span className="info-text">Tech City University, Venue Hall A</span>
          </div>
        </div>

        <CountdownTimer targetDate={targetDate} />

        <div className="hero-btns">
          <Link to="/registration" className="btn-primary hero-btn">Register for Conference</Link>
          <Link to="/submission" className="btn-secondary hero-btn hero-btn-alt">Submit Your Paper</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
