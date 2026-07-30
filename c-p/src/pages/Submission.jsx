import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import './Form.css';

const Submission = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    paperTitle: '',
    abstract: '',
    category: 'Advanced Computing',
    file: null
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.paperTitle || !formData.file) {
      setError('Please fill in all required fields and upload your paper.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Mock API call
    console.log('Form Data:', formData);
    setSubmitted(true);
    
    // Reset form after 5 seconds to show success state
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        paperTitle: '',
        abstract: '',
        category: 'Advanced Computing',
        file: null
      });
    }, 5000);
  };

  if (submitted) {
    return (
      <div className="form-page contact-page">
        <div className="container success-container">
          <div className="success-card">
            <div className="success-icon">✅</div>
            <h2>Submission Successful!</h2>
            <p>Your paper <strong>"{formData.paperTitle}"</strong> has been received successfully.</p>
            <p>Our reviewers will contact you via <strong>{formData.email}</strong> after the initial screening.</p>
            <button className="btn-primary" onClick={() => setSubmitted(false)}>Submit Another Paper</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-page submission-page">
      <div className="page-header">
        <div className="container">
          <SectionTitle 
            title="Paper Submission" 
            subtitle="Submit your original research for review. Please follow the ICCNCT format guidelines." 
          />
        </div>
      </div>

      <div className="container">
        <div className="form-container">
          <form className="glass-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Enter your full name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Paper Title *</label>
                <input 
                  type="text" 
                  name="paperTitle" 
                  placeholder="Enter the title of your research paper"
                  value={formData.paperTitle}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Abstract (Brief Summary) *</label>
                <textarea 
                  name="abstract" 
                  placeholder="Provide a 200-300 word summary of your research"
                  rows="5"
                  value={formData.abstract}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Paper Track *</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option>Advanced Computing</option>
                  <option>Networking & Security</option>
                  <option>AI & Data Science</option>
                  <option>Communication Tech</option>
                </select>
              </div>

              <div className="form-group">
                <label>Upload Paper (PDF) *</label>
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={handleFileChange}
                  className="file-input"
                  required
                />
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-footer">
              <p className="form-hint">* Required fields</p>
              <button type="submit" className="btn-primary submit-btn">Submit Paper</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Submission;
