import React from "react";

const Resume = () => {
  return (
    <section className="resume-section" id="resume">
      <div className="resume-container">
        <h2 className="section-title">Resume</h2>
        <p className="section-subtitle">Get to know my journey</p>

        <div className="resume-buttons">
          {/* open in new tab */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            View Resume
          </a>

          {/* force download */}
          <a
            href="/resume.pdf"
            download="Suhani_Mathur_Resume.pdf"
            className="btn btn-secondary"
          >
            Download Resume
          </a>
        </div>

        {/* embedded preview */}
        <div className="resume-preview">
          <iframe
            src="/resume.pdf"
            title="Suhani Mathur Resume"
            className="resume-iframe"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Resume;
