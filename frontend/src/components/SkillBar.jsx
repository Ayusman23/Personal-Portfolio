import React from 'react';

export const SkillBar = ({ skill }) => {
  return (
    <div className="skill-item">
      <div className="skill-header">
        <span>
          <i className={`fa-brands ${skill.icon || 'fa-code'}`} style={{ marginRight: '8px', color: 'var(--skin-color)' }}></i>
          {skill.name}
        </span>
        <span>{skill.percentage}%</span>
      </div>
      <div className="skill-progress-bar">
        <div
          className="skill-progress-fill"
          style={{ width: `${skill.percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
