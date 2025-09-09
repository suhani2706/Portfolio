import React from 'react';
import { FaFigma, FaReact, FaHtml5, FaCss3Alt, FaJsSquare } from "react-icons/fa";
import { SiAdobephotoshop, SiAdobeillustrator, SiPostgresql } from "react-icons/si";

const Toolbox = () => {
  const skills = [
    { name: 'Figma', icon: <FaFigma /> },
    { name: 'Photoshop', icon: <SiAdobephotoshop /> },
    { name: 'Illustrator', icon: <SiAdobeillustrator /> },
    { name: 'ReactJS', icon: <FaReact /> },
    { name: 'HTML', icon: <FaHtml5 /> },
    { name: 'CSS', icon: <FaCss3Alt /> },
    { name: 'Javascript', icon: <FaJsSquare /> },
    { name: 'PostgreSQL', icon: <SiPostgresql /> },
  ];

  return (
    <section className="toolbox" id="toolbox">
      <div className="toolbox-container">
        <h2 className="section-title">My ToolBox</h2>
        <p className="section-subtitle">Things I'm good at</p>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-pill">
              <span className="skill-icon">{skill.icon}</span>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Toolbox;
