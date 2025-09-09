import React from 'react';
import { MdEmail } from 'react-icons/md';
import { FaLinkedin, FaBehance, FaDribbble } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <section className="cta-section" id="contact">
        <div className="cta-container">
          <h2 className="section-title">Ready to Work Together?</h2>
          <p className="cta-description">
            Let's create something amazing that solves real problems and delights users.
          </p>
          <a 
            href="mailto:suhanim2705@gmail.com?subject=Contact%20Request&body=Hello%2C%20I%20would%20like%20to%20get%20in%20touch."
            className="btn btn-primary"
          >
            Get in Touch
          </a>

        </div>
      </section>
      
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <h3>Suhani Mathur</h3>
            <p>UI/UX & Graphic Designer</p>
          </div>
          <div className="footer-center">
            <p>© 2025 Suhani Mathur. All rights reserved.</p>
          </div>
          <div className="footer-right">
            <div className="social-icons">
              <a href="mailto:suhanim2705@gmail.com" className="social-icon" aria-label="Email">
                <MdEmail size={24} />
              </a>
              <a href="www.linkedin.com/in/suhani-mathur-828340258" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <FaLinkedin size={24} />
              </a>
              <a href="https://www.behance.net/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Behance">
                <FaBehance size={24} />
              </a>
              <a href="https://dribbble.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Dribbble">
                <FaDribbble size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
