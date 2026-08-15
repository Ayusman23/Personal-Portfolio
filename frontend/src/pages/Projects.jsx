import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/api';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Full Stack',
    'Event Management',
    'Utility Apps',
  ];

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await getProjects({
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        search: searchQuery || undefined,
      });
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory, searchQuery]);

  return (
    <section className="section projects-section">
      <div className="container">
        <div className="section-title">
          <h2>Enterprise & Full-Stack Projects</h2>
          <p className="section-subtitle">
            Enterprise solutions, SAP workflows, AI pipelines, and full-stack MERN platforms built by me
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="projects-filter-bar">
          <div className="filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="search-box">
            <i className="fa fa-search"></i>
            <input
              type="text"
              placeholder="Search by SAP, DRDO, Python, React..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fa fa-spinner fa-spin" style={{ fontSize: '32px', color: 'var(--skin-color)' }}></i>
          </div>
        ) : projects.length > 0 ? (
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onOpenModal={(proj) => setSelectedProject(proj)}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <i className="fa fa-folder-open" style={{ fontSize: '48px', color: 'var(--text-black-600)', marginBottom: '15px' }}></i>
            <h4 style={{ color: 'var(--text-black-900)', fontSize: '20px' }}>No projects found</h4>
            <p style={{ color: 'var(--text-black-600)' }}>Try choosing another category or clearing your search.</p>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
