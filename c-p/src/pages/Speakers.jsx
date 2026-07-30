import React from 'react';
import SectionTitle from '../components/SectionTitle';
import SpeakerCard from '../components/SpeakerCard';

const Speakers = () => {
  const speakers = [
    { name: "Dr. Sarah Johnson", role: "Keynote Speaker", university: "Stanford University, USA" },
    { name: "Prof. Michael Chen", role: "Special Guest", university: "Tsinghua University, China" },
    { name: "Dr. Elena Rodriguez", role: "Keynote Speaker", university: "ETH Zurich, Switzerland" },
    { name: "Prof. James Wilson", role: "Industry Expert", university: "Google Research Labs" },
    { name: "Dr. Anna Muller", role: "General Chair", university: "Technical University of Munich, Germany" },
    { name: "Prof. Rajesh Kumar", role: "Program Chair", university: "Indian Institute of Science, India" },
    { name: "Dr. Emily Brown", role: "Speaker", university: "Oxford University, UK" },
    { name: "Prof. David Lee", role: "Speaker", university: "MIT, USA" }
  ];

  return (
    <div className="page" style={{ paddingTop: 'var(--nav-height)' }}>
      <section className="speakers-header" style={{ background: 'var(--gradient-section)', padding: 'var(--space-4xl) 0' }}>
        <div className="container">
          <SectionTitle 
            title="Speakers & Committee" 
            subtitle="Explore our keynote speakers and the program committee members" 
          />
        </div>
      </section>

      <section className="speakers-content" style={{ padding: 'var(--space-4xl) 0' }}>
        <div className="container">
          <h2 style={{ marginBottom: '2rem' }}>Keynote Speakers</h2>
          <div className="speakers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2rem' }}>
            {speakers.slice(0, 4).map((speaker, i) => (
              <SpeakerCard key={i} {...speaker} />
            ))}
          </div>

          <h2 style={{ marginTop: '5rem', marginBottom: '2rem' }}>Program Committee Chairs</h2>
          <div className="speakers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2rem' }}>
            {speakers.slice(4).map((speaker, i) => (
              <SpeakerCard key={i} {...speaker} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Speakers;
