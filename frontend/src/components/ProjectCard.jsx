import React from 'react';

export const ProjectCard = ({ project, onOpenModal }) => {
  return (
    <div className="project-card glass-card">
      <div className="project-img-container">
        <span className="project-category-badge">{project.category}</span>
        <img
          src={project.image}
          alt={project.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop';
          }}
        />
      </div>

      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        {project.tags && project.tags.length > 0 && (
          <div className="project-tags">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="project-actions">
          {project.gitLink && (
            <a
              href={project.gitLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <i className="fa-brands fa-github"></i>
              <span>Code</span>
            </a>
          )}
          <button
            className="btn btn-sm"
            onClick={() => onOpenModal(project)}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <i className="fa fa-eye"></i>
            <span>Preview</span>
          </button>
        </div>
      </div>
    </div>
  );
};
