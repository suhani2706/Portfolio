import React from 'react';
import ubuy from "../assets/ubuypng.png";
import doctech from "../assets/doctech.jpg"; 
import kosh from "../assets/kosh.png";
import nspl from "../assets/nspl.png"
import celebal from "../assets/celebal.jpg"

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Graphic Posts for Ubuy Company",
      role: "Graphic Designer",
      description: "Created Instagram carousel posts, blog banners, and social media graphics consistent with brand identity.",
      logo: ubuy,
      logoColor: "#FFA500"
    },
    {
      id: 2,
      title: "Doc-Tech",
      role: "Website Designer",
      description: "AI-driven patient-doctor platform with speech-to-text, real-time consultation, and automated reports.",
      logo: doctech,
      logoColor: "#2563EB",
      link: "https://www.figma.com/proto/17GDkq96pXfM0JRlKwO1Uz/HealthSync---Project?page-id=0%3A1&node-id=191-42&starting-point-node-id=191%3A42&t=ciE89gw4Zef0oSKE-1"
    },
    {
      id: 3,
      title: "E-commerce Website",
      role: "Website Designer",
      description: "Designing full UI including research, icon, wireframes, design system.",
      logo: kosh,
      logoColor: "#10B981",
      link: "https://www.figma.com/proto/tAaxB2B2AwnLUHk5Ze5ERy/Kosh?page-id=0%3A1&node-id=93-3&t=ahyUMWFt6wqnjvrJ-1"
    },
    {
      id: 4,
      title: "React Projects",
      role: "Web Designer & Developer",
      description: "Designed the full dashboard UI, conducted research, created logo, wireframes.",
      logo: celebal,
      logoColor: "#61DAFB",
      github: "https://github.com/suhani2706/Celebal_Internship_Projects"
    },
    {
    id: 5,
    title: "NSPL Cricket App",
    role: "App Designer",
    description: "Designed the full app UI, conducted research, created logo, wireframes.",
    logo: nspl,
    logoColor: "#1E3A8A",
    link: "https://www.figma.com/proto/3JVhVyjB77Rbdjt5sj6Oih?node-id=0-1&t=jwGyh2egiM2pvEH3-6"
    }
  ];

  return (
    <section className="projects" id="work">
      <div className="projects-container">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">Selected works I've crafted with care</p>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-logo" style={{ backgroundColor: 'transparent'}}>
                <img src={project.logo} alt={project.title} className="logo-img" />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-role">{project.role}</p>
                <p className="project-description">{project.description}</p>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    View Prototype →
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    View Github Links →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
