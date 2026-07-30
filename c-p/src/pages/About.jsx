import React from 'react';
import SectionTitle from '../components/SectionTitle';

const About = () => {
  return (
    <div className="page" style={{ paddingTop: 'var(--nav-height)' }}>
      <section className="about-hero" style={{ background: 'var(--gradient-section)', padding: 'var(--space-4xl) 0' }}>
        <div className="container">
          <SectionTitle 
            title="About ICCNCT 2026" 
            subtitle="The 10th International Conference on Computing, Networking and Communication Technology" 
          />
        </div>
      </section>

      <section className="about-content">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h3>Introduction</h3>
          <p style={{ margin: '1rem 0 2rem', color: 'var(--gray-600)' }}>
            The International Conference on Computing, Networking and Communication Technology (ICCNCT) 
            has been a lighthouse for researchers across the globe for the past decade. It aims to 
            provide a premier platform for researchers, industrial professionals, and academics to 
            discuss and swap ideas, results, and experiences.
          </p>

          <h3>Conference Scope</h3>
          <p style={{ margin: '1rem 0 2rem', color: 'var(--gray-600)' }}>
            ICCNCT covers a wide range of topics from fundamental theoretical advances to innovative 
            practical applications. The conference will feature keynote speeches, technical sessions, 
            workshops, and tutorials led by experts in their respective fields.
          </p>

          <h3>Past Success</h3>
          <p style={{ margin: '1rem 0 2rem', color: 'var(--gray-600)' }}>
            Last year, ICCNCT saw over 400 attendees from 30+ countries, with 120 papers published 
            in indexed proceedings. We continue to strive for higher academic standards and 
            impactful networking opportunities.
          </p>

          <div className="about-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '3rem', textAlign: 'center' }}>
            <div>
              <h4 style={{ fontSize: '2.5rem', color: 'var(--primary-600)' }}>10+</h4>
              <p>Years</p>
            </div>
            <div>
              <h4 style={{ fontSize: '2.5rem', color: 'var(--primary-600)' }}>500+</h4>
              <p>Participants</p>
            </div>
            <div>
              <h4 style={{ fontSize: '2.5rem', color: 'var(--primary-600)' }}>150+</h4>
              <p>Presentations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
