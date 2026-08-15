import React from 'react';

export const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <i className="fa fa-times"></i>
        </button>

        <div style={{ maxHeight: '350px', overflow: 'hidden', borderRadius: '12px', marginBottom: '20px' }}>
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop';
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span className="project-category-badge" style={{ position: 'static' }}>
            {project.category}
          </span>
          {project.featured && (
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#fa5b0f',
                background: 'rgba(250, 91, 15, 0.1)',
                padding: '4px 10px',
                borderRadius: '12px',
              }}
            >
              ★ Featured Project
            </span>
          )}
        </div>

        <h2 style={{ fontSize: '24px', color: 'var(--text-black-900)', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>
          {project.title}
        </h2>

        <p style={{ color: 'var(--text-black-600)', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
          {project.description}
        </p>

        {project.tags && project.tags.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ fontSize: '14px', color: 'var(--text-black-900)', marginBottom: '8px' }}>
              Technologies Used:
            </h4>
            <div className="project-tags">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="project-tag" style={{ fontSize: '13px', padding: '4px 12px' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {project.gitLink && (
            <a
              href={project.gitLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <i className="fa-brands fa-github"></i>
              <span>View Source Code</span>
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <i className="fa fa-arrow-up-right-from-square"></i>
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
