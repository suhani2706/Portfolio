// src/components/Projects.jsx
import React from 'react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "HealthSync",
      category: "Health & Fitness App",
      desc: "An AI-powered clinical dashboard platform designed to streamline medical workflows, automate doctor prescriptions, and coordinate patient history records.",
      caseStudyLink: "https://app.notion.com/p/HealthSync-Case-Study-38f7a7a1bfaa807a93bedac9df521685?source=copy_link",
      prototypeLink: "https://www.figma.com/proto/17GDkq96pXfM0JRlKwO1Uz/HealthSync---Project?page-id=0%3A1&node-id=191-42&starting-point-node-id=191%3A42",
      theme: "dark",
      logo: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="project-card-logo">
          <path d="M12 5V19M5 12H19" />
        </svg>
      )
    },
    {
      id: 2,
      title: "KKosh",
      category: "E-Commerce Platform",
      desc: "An ethnicwear e-commerce portal and brand experience. Designed high-fidelity prototypes, user checkout filters, and custom product catalogs.",
     
      websiteLink: "https://kkosh.in/",
      theme: "light",
      logo: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="project-card-logo">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8V16M8 12H16" />
        </svg>
      )
    },
    {
      id: 3,
      title: "NSPL",
      category: "Sports Website",
      desc: "A tournament tracking web app detailing live scores, match brackets, and player statistics. Constructed dashboard designs and administration log panels.",
      caseStudyLink: "https://app.notion.com/p/Celebal-Technologies-Internship-Projects-38f7a7a1bfaa807a82cde13e8ee2c97b?source=copy_link",
      prototypeLink: "https://www.figma.com/proto/3JVhVyjB77Rbdjt5sj6Oih",
      theme: "dark",
      logo: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="project-card-logo">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" />
          <path d="M2 17L12 22L22 17" />
          <path d="M2 12L12 17L22 12" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Celebal Technologies",
      category: "Internship Projects",
      desc: "Designed corporate landing pages, user flows, and brand libraries. Standardized layout systems to drive B2B user conversions and credibility.",
      caseStudyLink: "https://app.notion.com/p/Celebal-Technologies-Internship-Projects-38f7a7a1bfaa807a82cde13e8ee2c97b?source=copy_link",
      theme: "light",
      logo: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="project-card-logo">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      )
    }
  ];

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="projects-editorial" id="projects">
      <div className="container">
        {/* Section Header */}
        <div className="projects-header-editorial">
          <div className="section-header-editorial-small">
            <span className="editorial-section-number">03</span>
            <h2 className="editorial-section-title">Selected work.</h2>
          </div>
          
          <a
            href="https://www.figma.com"
            target="_blank"
            rel="noopener noreferrer"
            className="view-all-projects-link"
          >
            View all projects
            <span className="arrow-icon">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 10.5L10.5 1.5M10.5 1.5H3.5M10.5 1.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </div>

        {/* 2x2 Project Grid (Pure Typographic Cards with nested CTA buttons) */}
        <div className="projects-grid-editorial">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`project-card-editorial theme-${project.theme} typographic-project-card`}
            >
              {/* Project info top */}
              <div className="project-card-top-group">
                <div className="project-meta-top">
                  {project.logo}
                  <h3 className="project-title-label">{project.title}</h3>
                </div>
                <p className="project-desc-label">{project.desc}</p>
              </div>

              {/* Project footer info & buttons */}
              <div className="project-meta-bottom">
                <span className="project-category-label">{project.category}</span>
                
                {/* CTA Links */}
                <div className="project-card-ctas">

                  {project.caseStudyLink && (
                    <a
                      href={project.caseStudyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-cta-btn secondary"
                    >
                      View Case Study
                    </a>
                  )}

                  {(project.prototypeLink || project.websiteLink) && (
                    <a
                      href={project.prototypeLink || project.websiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-cta-btn primary"
                    >
                      {project.websiteLink ? "Visit Website" : "Visit Prototype"}
                    </a>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fifth Card: Wide CTA Card */}
        <a 
          href="#contact" 
          onClick={handleScrollToContact}
          className="project-cta-card-editorial"
        >
          <h3 className="project-cta-title">Tell me what to make next.</h3>
          <span className="project-cta-arrow">
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
              <path d="M0 8H30M30 8L23 1M30 8L23 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
};

export default Projects;