// src/components/Process.jsx
import React from 'react';

const Process = () => {
  const steps = [
    {
      num: "01",
      name: "Research",
      desc: "Immersing in the domain. Understanding users, analyzing competitors, and uncovering friction points through interviews and behavioral data."
    },
    {
      num: "02",
      name: "Define",
      desc: "Synthesizing research into actionable personas, defining core problem statements, mapping user journeys, and setting product goals."
    },
    {
      num: "03",
      name: "Ideate",
      desc: "Exploring solutions rapidly. Mapping user flows, sketching rough wireframes, and validating logical architectures before styling."
    },
    {
      num: "04",
      name: "Design",
      desc: "Building a cohesive visual language. Establishing design systems, component libraries, typography guides, and pixel-perfect high-fidelity mockups."
    },
    {
      num: "05",
      name: "Test",
      desc: "Developing interactive prototypes, conducting usability testing, gathering real feedback, and iterating to refine user friction."
    }
  ];

  return (
    <section className="process" id="process">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-editorial">
          <span className="section-label">Methodology</span>
          <h2 className="section-title-large">
            Design <span className="italic">Process</span>
          </h2>
          <p className="section-subtitle">
            A structured, user-validated framework engineered to deliver scalable and delightful solutions.
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="process-timeline-horizontal">
          {steps.map((step, index) => (
            <div key={index} className="process-step-node">
              <div className="process-indicator-dot"></div>
              <span className="process-step-number">{step.num}</span>
              <h3 className="process-step-title">{step.name}</h3>
              <p className="process-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;