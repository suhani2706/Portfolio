// src/components/Header.jsx
import React from 'react';
import blackPinImg from '../assets/black_pin.png';

const Header = () => {
  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header-editorial">
      <div className="header-container-editorial">
        {/* Brand Bounding Box Logo */}
        <a href="#hero" className="brand-logo-link" aria-label="Suhani Mathur Home">
          <div className="brand-bounding-box-container">
            {/* Minimal Figma-style Cursor icon */}
            <div className="brand-cursor">
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0V14.5L4.5 10L8.5 14L10.5 12L6.5 8L12.5 7.5L0 0Z" fill="black" />
              </svg>
            </div>
            
            {/* Bounding box with selection handles */}
            <div className="brand-bounding-box">
              <div className="brand-corner brand-corner-tl"></div>
              <div className="brand-corner brand-corner-tr"></div>
              <div className="brand-corner brand-corner-bl"></div>
              <div className="brand-corner brand-corner-br"></div>
              <div className="brand-text-row">suhani</div>
              <div className="brand-text-row">mathur</div>
            </div>
          </div>
        </a>

        {/* Pinned Action Buttons */}
        <div className="header-actions-editorial">
          {/* Resume button with push pin icon */}
          <a
            href="/resumeSuhani.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pinned btn-pinned-resume hanging-button"
          >
            <img src={blackPinImg} alt="" className="button-pin-image" />
            Resume
          </a>

          {/* Let's Talk button */}
          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="btn-pinned btn-pinned-talk hanging-button"
          >
            <img src={blackPinImg} alt="" className="button-pin-image" />
            Let's Talk
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;