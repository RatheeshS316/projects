import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import './Form.css';

const Registration = () => {
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    affiliation: '',
    category: 'Full Registration (International)',
    paymentMethod: 'Credit Card'
  });

  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!regData.name || !regData.email || !regData.affiliation) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(regData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setRegistered(true);
    
    // Simulate navigation to payment gateway or success state
    setTimeout(() => {
      setRegistered(false);
      setRegData({
        name: '',
        email: '',
        affiliation: '',
        category: 'Full Registration (International)',
        paymentMethod: 'Credit Card'
      });
    }, 6000);
  };

  if (registered) {
    return (
      <div className="form-page registration-page">
        <div className="container success-container">
          <div className="success-card">
            <div className="success-icon">💳</div>
            <h2>Registration Initialized!</h2>
            <p>Thank you for registering for ICCNCT 2026, <strong>{regData.name}</strong>.</p>
            <p>You have selected: <strong>{regData.category}</strong></p>
            <p>An invoice with payment instructions has been sent to <strong>{regData.email}</strong>.</p>
            <div className="payment-placeholder">
              <p>Redirecting to Secure Payment Gateway...</p>
              <div className="loading-bar">
                <div className="loading-progress"></div>
              </div>
            </div>
            <button className="btn-secondary" onClick={() => setRegistered(false)}>Return to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-page registration-page">
      <div className="page-header">
        <div className="container">
          <SectionTitle 
            title="Conference Registration" 
            subtitle="Secure your spot at the 10th ICCNCT. Choose your registration category below." 
          />
        </div>
      </div>

      <div className="container">
        <div className="registration-grid">
          <div className="form-container">
            <form className="glass-form" onSubmit={handleRegister}>
              <h3 className="form-title">Personal Details</h3>
              <div className="form-group full-width">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Enter your full name" 
                  value={regData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email address"
                  value={regData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>University / Affiliation *</label>
                <input 
                  type="text" 
                  name="affiliation" 
                  placeholder="Enter your institution name"
                  value={regData.affiliation}
                  onChange={handleChange}
                  required
                />
              </div>

              <h3 className="form-title" style={{ marginTop: '2rem' }}>Registration Category</h3>
              <div className="form-group full-width">
                <label>Category *</label>
                <select name="category" value={regData.category} onChange={handleChange}>
                  <option>Full Registration (International) - $600</option>
                  <option>Full Registration (Domestic) - $400</option>
                  <option>Student Registration (International) - $300</option>
                  <option>Student Registration (Domestic) - $200</option>
                  <option>Attendee (Non-Author) - $150</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Payment Method *</label>
                <select name="paymentMethod" value={regData.paymentMethod} onChange={handleChange}>
                  <option>Credit/Debit Card</option>
                  <option>Bank Transfer (Wire)</option>
                  <option>PayPal</option>
                </select>
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="form-footer">
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>Proceed to Payment</button>
              </div>
            </form>
          </div>

          <div className="registration-info">
            <div className="info-card">
              <h4>What's Included?</h4>
              <ul>
                <li>Access to all technical sessions</li>
                <li>Conference kit and proceedings</li>
                <li>Gala dinner and lunches</li>
                <li>Coffee breaks and networking</li>
                <li>Digital certificate of participation</li>
              </ul>
            </div>
            
            <div className="info-card warning">
              <h4>Important Note</h4>
              <p>One registration covers only one paper. If you are an author of multiple papers, separate registrations are required for each.</p>
              <p>Students must provide a valid ID at the venue.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
