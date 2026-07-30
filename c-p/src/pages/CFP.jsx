import React from 'react';
import SectionTitle from '../components/SectionTitle';
import TrackCard from '../components/TrackCard';

const CFP = () => {
  const tracks = [
    {
      icon: "💻",
      title: "Track 1: Advanced Computing",
      topics: ["Quantum Computing", "Cloud & Fog Computing", "Distributed Systems", "Parallel Processing", "Edge Computing", "Real-time Systems"]
    },
    {
      icon: "🌐",
      title: "Track 2: Networking & Security",
      topics: ["5G/6G Networks", "Cybersecurity", "IoT Protocols", "Network Virtualization", "Software Defined Networks (SDN)", "Blockchain Security"]
    },
    {
      icon: "🤖",
      title: "Track 3: AI & Data Science",
      topics: ["Deep Learning", "Big Data Analytics", "Natural Language Processing", "Computer Vision", "Reinforcement Learning", "Predictive Analytics"]
    },
    {
      icon: "📱",
      title: "Track 4: Communication Tech",
      topics: ["Wireless Communication", "Optical Networking", "Signal Processing", "Satellite Communication", "Mobile App Development", "Human-Computer Interaction"]
    }
  ];

  return (
    <div className="page" style={{ paddingTop: 'var(--nav-height)' }}>
      <section className="cfp-header" style={{ background: 'var(--gradient-section)', padding: 'var(--space-4xl) 0' }}>
        <div className="container">
          <SectionTitle 
            title="Call for Papers" 
            subtitle="Invitation for original research papers for presentation and publication" 
          />
        </div>
      </section>

      <section className="cfp-content" style={{ padding: 'var(--space-4xl) 0' }}>
        <div className="container">
          <div className="cfp-intro" style={{ maxWidth: '800px', margin: '0 auto 3rem', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--gray-600)' }}>
              ICCNCT invites authors to submit their original technical papers reporting on latest 
              research and development in the following tracks.
            </p>
          </div>

          <div className="tracks-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {tracks.map((track, i) => (
              <TrackCard key={i} {...track} />
            ))}
          </div>

          <div className="submission-guidelines" style={{ backgroundColor: 'white', padding: '3rem', borderRadius: 'var(--radius-xl)', marginTop: '4rem', boxShadow: 'var(--shadow-lg)' }}>
            <h3>Submission Guidelines</h3>
            <ul style={{ marginTop: '1.5rem', color: 'var(--gray-600)', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '1rem' }}>Papers must be written in English.</li>
              <li style={{ marginBottom: '1rem' }}>Maximum length of the paper is 6 pages including figures and tables.</li>
              <li style={{ marginBottom: '1rem' }}>All papers must be original and not simultaneously submitted to another journal or conference.</li>
              <li style={{ marginBottom: '1rem' }}>Format your paper according to the ICCNCT template (templates available for Word and LaTeX).</li>
            </ul>
            <div style={{ marginTop: '2rem' }}>
              <button className="btn-primary">Download Template</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CFP;
