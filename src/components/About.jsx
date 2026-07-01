// src/components/About.jsx
import React from 'react';

const About = () => {
  const interests = [
    {
      num: '(01)',
      title: 'Books',
      desc: 'Fuel for curiosity and perspective'
    },
    {
      num: '(02)',
      title: 'Painting',
      desc: 'Where ideas become expression'
    },
    {
      num: '(03)',
      title: 'Writing',
      desc: 'Organizing thoughts into meaning'
    },
    {
      num: '(04)',
      title: 'Movies',
      desc: 'Stories that inspire the way I see the world'
    }
  ];

  return (
    <section className="about-editorial" id="about">
      <div className="container about-container-grid">
        {/* Left Side: Statement and Description */}
        <div className="about-left-editorial">
          <div className="section-header-editorial-small">
            <span className="editorial-section-number">01</span>
            <h2 className="editorial-section-title">About me.</h2>
          </div>
          
          <div className="about-philosophy-container">
            <h3 className="about-large-statement">
              I design because I love understanding people.
            </h3>
            <p className="about-supporting-paragraph">
              The more I observe how people think, behave, struggle and succeed, 
              the more I enjoy creating experiences that feel effortless.
            </p>
          </div>
        </div>

        {/* Right Side: Editorial Interests List */}
        <div className="about-right-editorial">
          <ul className="interests-list-editorial">
            {interests.map((interest, index) => (
              <li key={index} className="interest-item-editorial">
                <div className="interest-header">
                  <span className="interest-num">{interest.num}</span>
                  <h4 className="interest-title">{interest.title}</h4>
                </div>
                <p className="interest-desc">{interest.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;