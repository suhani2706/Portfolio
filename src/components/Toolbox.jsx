// src/components/Toolbox.jsx
import React from 'react';

const Toolbox = () => {
  const tools = [
    { num: '01', name: 'Figma' },
    { num: '02', name: 'Photoshop' },
    { num: '03', name: 'Illustrator' },
    { num: '04', name: 'Adobe Express' },
    { num: '05', name: 'Zeplin' },
    { num: '06', name: 'Adobe XD' },
    { num: '07', name: 'FigJam' }
  ];

  return (
    <section className="toolbox-editorial" id="toolbox">
      <div className="container">
        <div className="section-header-editorial-small" style={{ marginBottom: '3rem' }}>
          <span className="editorial-section-number">03</span>
          <h2 className="editorial-section-title">Toolbox.</h2>
        </div>

        <div className="toolbox-grid-editorial">
          {tools.map((tool, index) => (
            <div key={index} className="toolbox-item-editorial">
              <span className="toolbox-item-num">{tool.num}</span>
              <h4 className="toolbox-item-name">{tool.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Toolbox;
