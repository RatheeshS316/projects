import React from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import TrackCard from '../components/TrackCard';
import SpeakerCard from '../components/SpeakerCard';
import Timeline from '../components/Timeline';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const tracks = [
    {
      icon: "💻",
      title: "Advanced Computing",
      topics: ["Quantum Computing", "Cloud Computing", "Distributed Systems", "Parallel Processing"]
    },
    {
      icon: "🌐",
      title: "Networking & Security",
      topics: ["5G/6G Networks", "Cybersecurity", "IoT Protocols", "Network Virtualization"]
    },
    {
      icon: "🤖",
      title: "AI & Data Science",
      topics: ["Machine Learning", "Big Data Analytics", "Natural Language Processing", "Computer Vision"]
    },
    {
      icon: "📱",
      title: "Communication Tech",
      topics: ["Wireless Communication", "Optical Networking", "Signal Processing", "Mobile App Development"]
    }
  ];

  const dates = [
    { date: "Oct 15, 2025", title: "Paper Submission Opens", description: "Start submitting your research papers through the portal." },
    { date: "Jan 30, 2026", title: "Submission Deadline", description: "All research papers must be submitted by midnight UTC." },
    { date: "Mar 15, 2026", title: "Acceptance Notification", description: "Authors will be notified of their paper status." },
    { date: "Apr 20, 2026", title: "Registration Deadline", description: "Early bird registration ends on this date." }
  ];

  const speakers = [
    { name: "Dr. Sarah Johnson", role: "Keynote Speaker", university: "Stanford University, USA" },
    { name: "Prof. Michael Chen", role: "Special Guest", university: "Tsinghua University, China" },
    { name: "Dr. Elena Rodriguez", role: "Keynote Speaker", university: "ETH Zurich, Switzerland" },
    { name: "Prof. James Wilson", role: "Industry Expert", university: "Google Research Labs" }
  ];

  return (
    <div className="home-page">
      <Hero />
      
      {/* About Preview */}
      <section className="about-preview">
        <div className="container about-grid">
          <div className="about-image-container">
            <div className="about-img-box">
              <div className="img-overlay"></div>
              <span>Conference Hall</span>
            </div>
            <div className="experience-badge">
              <strong>10+</strong>
              <span>Years of Research Excellence</span>
            </div>
          </div>
          <div className="about-text">
            <h2 className="section-title">About the <span>Conference</span></h2>
            <div className="section-divider"></div>
            <p>
              ICCNCT 2026 is the premier forum for the presentation of new advances and research results 
              in the fields of theoretical, experimental, and applied Computing, Networking and 
              Communication Technology. 
            </p>
            <p>
              The conference will bring together leading researchers, engineers and scientists in the 
              domain of interest from around the world. We look forward to seeing you at Tech City.
            </p>
            <Link to="/about" className="btn-secondary">Learn More About Us</Link>
          </div>
        </div>
      </section>

      {/* Conference Tracks */}
      <section className="tracks-section">
        <div className="container">
          <SectionTitle 
            title="Conference Tracks" 
            subtitle="We invite original research papers in the following technical areas" 
          />
          <div className="tracks-grid">
            {tracks.map((track, i) => (
              <TrackCard key={i} {...track} />
            ))}
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="dates-section">
        <div className="container">
          <SectionTitle 
            title="Important Dates" 
            subtitle="Keep track of these key deadlines for your submission" 
          />
          <Timeline dates={dates} />
        </div>
      </section>

      {/* Keynote Speakers */}
      <section className="speakers-section">
        <div className="container">
          <SectionTitle 
            title="Keynote Speakers" 
            subtitle="Learn from the best minds in the industry and academia" 
          />
          <div className="speakers-grid">
            {speakers.map((speaker, i) => (
              <SpeakerCard key={i} {...speaker} />
            ))}
          </div>
          <div className="view-all-container">
            <Link to="/speakers" className="btn-primary">View All Speakers</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container cta-box">
          <h2>Ready to Share Your Research?</h2>
          <p>Join 500+ researchers and submit your original work today.</p>
          <div className="cta-btns">
            <Link to="/submission" className="btn-white">Submit Paper</Link>
            <Link to="/registration" className="btn-outline-white">Register Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
