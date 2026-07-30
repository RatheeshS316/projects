import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';

const Contact = () => {
  const [msg, setMsg] = useState({ name: '', email: '', subject: '', content: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="page" style={{ paddingTop: 'var(--nav-height)' }}>
      <section className="contact-header" style={{ background: 'var(--gradient-section)', padding: 'var(--space-4xl) 0' }}>
        <div className="container">
          <SectionTitle 
            title="Contact Us" 
            subtitle="Get in touch with the conference secretariat for any queries" 
          />
        </div>
      </section>

      <section className="contact-content" style={{ padding: 'var(--space-4xl) 0' }}>
        <div className="container">
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div className="contact-info">
              <h3>General Secretariat</h3>
              <p style={{ margin: '1rem 0', color: 'var(--gray-600)' }}>
                Email: secreteriat@iccnct.com<br/>
                Phone: +1 234 567 8901<br/>
                Office Hours: 09:00 - 18:00 (Mon-Fri)
              </p>

              <h3 style={{ marginTop: '2rem' }}>Registration Support</h3>
              <p style={{ margin: '1rem 0', color: 'var(--gray-600)' }}>
                Email: registration@iccnct.com<br/>
                Phone: +1 234 567 8902<br/>
              </p>
              
              <h3 style={{ marginTop: '2rem' }}>Venue Details</h3>
              <p style={{ margin: '1rem 0', color: 'var(--gray-600)' }}>
                Hall A, Tech City University<br/>
                123 University Ave, Tech City, TC 98765<br/>
                The campus is accessible via major city transit lines.
              </p>
            </div>

            <div className="contact-form-box">
              <form className="glass-form" onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)' }}>
                {sent ? (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                    <h4 style={{ color: 'var(--success)' }}>Message Sent Successfully!</h4>
                    <p>We'll get back to you within 24-48 hours.</p>
                  </div>
                ) : (
                  <>
                    <h3 style={{ marginBottom: '1.5rem' }}>Send a Message</h3>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Full Name</label>
                      <input type="text" placeholder="Your Name" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-300)' }} required />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Email Address</label>
                      <input type="email" placeholder="Email" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-300)' }} required />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Message</label>
                      <textarea placeholder="How can we help you?" rows="4" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-300)' }} required></textarea>
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Message</button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
