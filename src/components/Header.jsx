// src/components/Header.jsx
import React from 'react';
import blackPinImg from '../assets/black_pin.png';

const Header = ({ openContactModal }) => {
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
            <span className="resume-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2h8l6 6v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="9" x2="12" y2="9" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="15" y2="17" />
              </svg>
            </span>
            <span className="btn-text">Resume</span>
          </a>

          {/* Let's Talk button */}
          <button
            type="button"
            onClick={openContactModal}
            className="btn-pinned btn-pinned-talk hanging-button"
          >
            <img src={blackPinImg} alt="" className="button-pin-image" />
            <span className="talk-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15a2 2 0 0 1-2 2H9l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <span className="btn-text">Let's Talk</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;