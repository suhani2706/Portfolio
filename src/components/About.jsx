import React from 'react';
import profileImage from '../assets/suhani.png';

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-content">
          <h2 className="section-title">About Me</h2>
          <p className="about-description">
            I'm a UI/UX and graphic designer passionate about creating meaningful digital experiences 
            that connect with users on an emotional level. With a background in both design and development, 
            I bring a unique perspective to every project, ensuring solutions that are both beautiful and functional.
          </p>
          <a href="#work" className="btn btn-secondary">Learn More About Me</a>
        </div>
        <div className="about-photo">
          <div className="profile-photo-placeholder">
            <div className="photo-frame">
              <img 
                src={profileImage} 
                alt="Suhani Mathur - UI/UX Designer" 
                className="profile-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
