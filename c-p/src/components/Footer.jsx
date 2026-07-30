import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span>IC</span>CNCT
          </Link>
          <p className="footer-description">
            10th International Conference on Computing, Networking and Communication Technology.
            Empowering innovation through global collaboration.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon"><span>Fb</span></a>
            <a href="#" className="social-icon"><span>Tw</span></a>
            <a href="#" className="social-icon"><span>Li</span></a>
            <a href="#" className="social-icon"><span>Ig</span></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/cfp">Call for Papers</Link></li>
            <li><Link to="/dates">Important Dates</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Information</h4>
          <ul>
            <li><Link to="/submission">Submission</Link></li>
            <li><Link to="/registration">Registration</Link></li>
            <li><Link to="/speakers">Committee</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: contact@iccnct.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 University Ave, Tech City, TC 98765</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-content">
          <p>&copy; {currentYear} ICCNCT. All rights reserved.</p>
          <div className="bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
