import React from 'react';
import heroImage from '../assets/image 4.png';

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hello, I'm <span className="accent">Suhani Mathur</span>
          </h1>
          <p className="hero-description">
            Creating intuitive digital experiences through thoughtful design and clean development. 
            Passionate about blending aesthetics with functionality to craft engaging user interfaces.
          </p>
          <div className="hero-buttons">
              <a href="#work" className="btn btn-primary">
                View My Work
              </a>
              <a href="#contact" className="btn btn-secondary">Get in Touch</a>
            </div>
        </div>
        <div className="hero-illustration">
          <div className="illustration-placeholder">
            <img 
              src={heroImage} 
              alt="Suhani Mathur - UI/UX Designer Illustration" 
              className="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
