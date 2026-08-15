import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getContactMessages,
  updateContactMessageStatus,
  deleteContactMessage,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getSkills,
  createSkill,
  deleteSkill,
  getExperiences,
  createExperience,
  deleteExperience,
  getEducation,
  createEducation,
  deleteEducation,
  getCertifications,
  createCertification,
  deleteCertification,
  getProfile,
  updateProfile,
  resetDatabase,
} from '../services/api';
import { Toast } from '../components/Toast';
import '../styles/admin.css';

export const AdminDashboard = () => {
  const { adminUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('messages');
  const [toasts, setToasts] = useState([]);

  // Data states
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  // Modals & Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: 'Full Stack',
    image: '/assets/portfolio.6.png',
    gitLink: '',
    liveLink: '',
    tags: '',
  });
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const [skillForm, setSkillForm] = useState({
    name: '',
    percentage: 80,
    category: 'Backend',
    icon: 'fa-code',
  });

  const [certForm, setCertForm] = useState({
    title: '',
    issuer: 'SAP',
    category: 'SAP',
    issueDate: '2026',
    credentialUrl: '',
    icon: 'fa-certificate',
  });

  const [expForm, setExpForm] = useState({
    title: '',
    company: '',
    period: '',
    description: '',
    certificateUrl: '',
    offerLetterUrl: '',
  });

  const [eduForm, setEduForm] = useState({
    degree: '',
    institution: '',
    period: '',
    score: '',
    description: '',
  });

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [msgRes, projRes, skillRes, expRes, eduRes, certRes, profRes] = await Promise.all([
        getContactMessages(),
        getProjects(),
        getSkills(),
        getExperiences(),
        getEducation(),
        getCertifications(),
        getProfile(),
      ]);

      if (msgRes.data.success) setMessages(msgRes.data.data);
      if (projRes.data.success) setProjects(projRes.data.data);
      if (skillRes.data.success) setSkills(skillRes.data.data);
      if (expRes.data.success) setExperiences(expRes.data.data);
      if (eduRes.data.success) setEducation(eduRes.data.data);
      if (certRes.data.success) setCertifications(certRes.data.data);
      if (profRes.data.success) setProfile(profRes.data.data);
    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
      addToast('Error loading dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Message Actions
  const handleToggleRead = async (id, currentStatus) => {
    try {
      const res = await updateContactMessageStatus(id, { isRead: !currentStatus });
      if (res.data.success) {
        setMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, isRead: !currentStatus } : m))
        );
        addToast(`Message marked as ${!currentStatus ? 'read' : 'unread'}`);
      }
    } catch (err) {
      addToast('Failed to update message status', 'error');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await deleteContactMessage(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      addToast('Message deleted successfully');
    } catch (err) {
      addToast('Failed to delete message', 'error');
    }
  };

  // Project Actions
  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...projectForm,
        tags: typeof projectForm.tags === 'string'
          ? projectForm.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : projectForm.tags,
      };

      if (editingProjectId) {
        const res = await updateProject(editingProjectId, payload);
        if (res.data.success) {
          setProjects((prev) => prev.map((p) => (p._id === editingProjectId ? res.data.data : p)));
          addToast('Project updated successfully');
        }
      } else {
        const res = await createProject(payload);
        if (res.data.success) {
          setProjects((prev) => [res.data.data, ...prev]);
          addToast('Project created successfully');
        }
      }
      setShowProjectModal(false);
      setEditingProjectId(null);
      setProjectForm({
        title: '',
        description: '',
        category: 'Full Stack',
        image: '/assets/portfolio.6.png',
        gitLink: '',
        liveLink: '',
        tags: '',
      });
    } catch (err) {
      addToast('Failed to save project', 'error');
    }
  };

  const handleEditProject = (proj) => {
    setEditingProjectId(proj._id);
    setProjectForm({
      title: proj.title,
      description: proj.description,
      category: proj.category,
      image: proj.image,
      gitLink: proj.gitLink,
      liveLink: proj.liveLink || '',
      tags: Array.isArray(proj.tags) ? proj.tags.join(', ') : proj.tags,
    });
    setShowProjectModal(true);
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      addToast('Project deleted successfully');
    } catch (err) {
      addToast('Failed to delete project', 'error');
    }
  };

  // Skill Actions
  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      const res = await createSkill(skillForm);
      if (res.data.success) {
        setSkills((prev) => [...prev, res.data.data]);
        setSkillForm({ name: '', percentage: 80, category: 'Backend', icon: 'fa-code' });
        addToast('Skill added successfully');
      }
    } catch (err) {
      addToast('Failed to add skill', 'error');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await deleteSkill(id);
      setSkills((prev) => prev.filter((s) => s._id !== id));
      addToast('Skill deleted');
    } catch (err) {
      addToast('Failed to delete skill', 'error');
    }
  };

  // Certification Actions
  const handleAddCert = async (e) => {
    e.preventDefault();
    try {
      const res = await createCertification(certForm);
      if (res.data.success) {
        setCertifications((prev) => [...prev, res.data.data]);
        setCertForm({ title: '', issuer: 'SAP', category: 'SAP', issueDate: '2026', icon: 'fa-certificate' });
        addToast('Certification added');
      }
    } catch (err) {
      addToast('Failed to add certification', 'error');
    }
  };

  const handleDeleteCert = async (id) => {
    if (!window.confirm('Delete this certification?')) return;
    try {
      await deleteCertification(id);
      setCertifications((prev) => prev.filter((c) => c._id !== id));
      addToast('Certification deleted');
    } catch (err) {
      addToast('Failed to delete certification', 'error');
    }
  };

  // Experience Actions
  const handleAddExperience = async (e) => {
    e.preventDefault();
    try {
      const res = await createExperience(expForm);
      if (res.data.success) {
        setExperiences((prev) => [res.data.data, ...prev]);
        setExpForm({
          title: '',
          company: '',
          period: '',
          description: '',
          certificateUrl: '',
          offerLetterUrl: '',
        });
        addToast('Experience item added');
      }
    } catch (err) {
      addToast('Failed to add experience', 'error');
    }
  };

  const handleDeleteExperience = async (id) => {
    if (!window.confirm('Delete this experience item?')) return;
    try {
      await deleteExperience(id);
      setExperiences((prev) => prev.filter((e) => e._id !== id));
      addToast('Experience deleted');
    } catch (err) {
      addToast('Failed to delete experience', 'error');
    }
  };

  // Education Actions
  const handleAddEducation = async (e) => {
    e.preventDefault();
    try {
      const res = await createEducation(eduForm);
      if (res.data.success) {
        setEducation((prev) => [res.data.data, ...prev]);
        setEduForm({ degree: '', institution: '', period: '', score: '', description: '' });
        addToast('Education item added');
      }
    } catch (err) {
      addToast('Failed to add education', 'error');
    }
  };

  const handleDeleteEducation = async (id) => {
    if (!window.confirm('Delete this education entry?')) return;
    try {
      await deleteEducation(id);
      setEducation((prev) => prev.filter((e) => e._id !== id));
      addToast('Education entry deleted');
    } catch (err) {
      addToast('Failed to delete education', 'error');
    }
  };

  // Profile Save
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile(profile);
      if (res.data.success) {
        setProfile(res.data.data);
        addToast('Profile updated successfully');
      }
    } catch (err) {
      addToast('Failed to update profile', 'error');
    }
  };

  // Reset / Reseed DB
  const handleResetDatabase = async () => {
    if (!window.confirm('Reset database with updated SAP, DRDO, HAL portfolio data?')) return;
    try {
      await resetDatabase();
      await loadAllData();
      addToast('Database reset and re-seeded with updated portfolio data!');
    } catch (err) {
      addToast('Failed to reset database', 'error');
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <section className="section">
      <div className="container">
        {/* Dashboard Top Header */}
        <div className="dashboard-header">
          <div>
            <h2 style={{ fontSize: '28px', color: 'var(--text-black-900)', fontFamily: 'var(--font-heading)' }}>
              Welcome, {adminUser?.username || 'Ayusman'} 👋
            </h2>
            <p style={{ color: 'var(--text-black-600)', fontSize: '14px' }}>
              SAP & Full-Stack Portfolio Management Dashboard
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary btn-sm" onClick={handleResetDatabase} title="Reset to updated seed">
              <i className="fa fa-rotate"></i>
              <span>Re-seed DB</span>
            </button>
            <button className="btn btn-sm" onClick={logout} style={{ background: '#ff4757', borderColor: '#ff4757' }}>
              <i className="fa fa-arrow-right-from-bracket"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="dashboard-stats-grid">
          <div className="stat-card glass-card">
            <div className="stat-icon">
              <i className="fa fa-envelope-open-text"></i>
            </div>
            <div className="stat-info">
              <h3>{unreadCount} / {messages.length}</h3>
              <p>Unread / Total Messages</p>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon">
              <i className="fa fa-briefcase"></i>
            </div>
            <div className="stat-info">
              <h3>{projects.length}</h3>
              <p>Active Projects</p>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon">
              <i className="fa fa-certificate"></i>
            </div>
            <div className="stat-info">
              <h3>{certifications.length}</h3>
              <p>Certifications</p>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon">
              <i className="fa fa-code"></i>
            </div>
            <div className="stat-info">
              <h3>{skills.length}</h3>
              <p>Listed Skills</p>
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <i className="fa fa-inbox"></i>
            <span>Inquiries Inbox</span>
            {unreadCount > 0 && <span className="badge-count">{unreadCount}</span>}
          </button>

          <button
            className={`admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <i className="fa fa-layer-group"></i>
            <span>Manage Projects</span>
          </button>

          <button
            className={`admin-tab-btn ${activeTab === 'certifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('certifications')}
          >
            <i className="fa fa-certificate"></i>
            <span>Certifications</span>
          </button>

          <button
            className={`admin-tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <i className="fa fa-screwdriver-wrench"></i>
            <span>Manage Skills</span>
          </button>

          <button
            className={`admin-tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            <i className="fa fa-timeline"></i>
            <span>Experience & Education</span>
          </button>

          <button
            className={`admin-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <i className="fa fa-id-card"></i>
            <span>Profile & Bio</span>
          </button>
        </div>

        {/* Tab 1: Messages Inbox */}
        {activeTab === 'messages' && (
          <div className="glass-card" style={{ padding: '25px' }}>
            <h3 style={{ color: 'var(--text-black-900)', marginBottom: '20px', fontSize: '20px' }}>
              Visitor Inquiries ({messages.length})
            </h3>
            {messages.length === 0 ? (
              <p style={{ color: 'var(--text-black-600)', textAlign: 'center', padding: '30px' }}>
                No messages received yet.
              </p>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Sender</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg) => (
                      <tr key={msg._id}>
                        <td>
                          <span className={msg.isRead ? 'badge-read' : 'badge-unread'}>
                            {msg.isRead ? 'Read' : 'New'}
                          </span>
                        </td>
                        <td>
                          <strong>{msg.name}</strong>
                          <br />
                          <small style={{ color: 'var(--text-black-600)' }}>{msg.email}</small>
                        </td>
                        <td>{msg.subject}</td>
                        <td style={{ maxWidth: '300px', fontSize: '13px' }}>{msg.message}</td>
                        <td style={{ fontSize: '12px', color: 'var(--text-black-600)' }}>
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="table-actions">
                            <button
                              className="action-btn"
                              title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                              onClick={() => handleToggleRead(msg._id, msg.isRead)}
                            >
                              <i className={`fa ${msg.isRead ? 'fa-envelope' : 'fa-envelope-open'}`}></i>
                            </button>
                            <button
                              className="action-btn delete"
                              title="Delete Message"
                              onClick={() => handleDeleteMessage(msg._id)}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Manage Projects */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: 'var(--text-black-900)', fontSize: '20px' }}>
                Projects ({projects.length})
              </h3>
              <button
                className="btn btn-sm"
                onClick={() => {
                  setEditingProjectId(null);
                  setProjectForm({
                    title: '',
                    description: '',
                    category: 'Full Stack',
                    image: '/assets/portfolio.6.png',
                    gitLink: '',
                    liveLink: '',
                    tags: '',
                  });
                  setShowProjectModal(true);
                }}
              >
                <i className="fa fa-plus"></i>
                <span>Add New Project</span>
              </button>
            </div>

            <div className="admin-card-grid">
              {projects.map((proj) => (
                <div key={proj._id} className="admin-item-card glass-card">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '10px', marginBottom: '12px' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop';
                    }}
                  />
                  <div className="admin-item-header">
                    <div>
                      <span className="project-category-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '6px' }}>
                        {proj.category}
                      </span>
                      <h4>{proj.title}</h4>
                    </div>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-black-600)', marginBottom: '14px', flex: 1 }}>
                    {proj.description}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => handleEditProject(proj)} style={{ flex: 1 }}>
                      <i className="fa fa-edit"></i>
                      <span>Edit</span>
                    </button>
                    <button className="action-btn delete" onClick={() => handleDeleteProject(proj._id)} title="Delete">
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Manage Certifications */}
        {activeTab === 'certifications' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px' }}>
            <div className="glass-card" style={{ padding: '25px' }}>
              <h3 style={{ color: 'var(--text-black-900)', fontSize: '18px', marginBottom: '15px' }}>
                Add New Certification
              </h3>
              <form onSubmit={handleAddCert}>
                <div className="form-group">
                  <label>Certificate Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. SAP Certified - SAP BTP Solution Architect"
                    value={certForm.title}
                    onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Issuer</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. SAP, Google Cloud, AWS"
                    value={certForm.issuer}
                    onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    className="form-control"
                    value={certForm.category}
                    onChange={(e) => setCertForm({ ...certForm, category: e.target.value })}
                  >
                    <option value="SAP">SAP</option>
                    <option value="Cloud & AI">Cloud & AI</option>
                    <option value="Security">Security</option>
                    <option value="Development">Development</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Year / Date</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="2026"
                    value={certForm.issueDate}
                    onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Verification / Credential URL (Google Drive / Link)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="https://drive.google.com/... or validation link"
                    value={certForm.credentialUrl}
                    onChange={(e) => setCertForm({ ...certForm, credentialUrl: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                  <i className="fa fa-plus"></i>
                  <span>Add Certification</span>
                </button>
              </form>
            </div>

            <div className="glass-card" style={{ padding: '25px' }}>
              <h3 style={{ color: 'var(--text-black-900)', fontSize: '18px', marginBottom: '15px' }}>
                Existing Certifications ({certifications.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {certifications.map((c) => (
                  <div
                    key={c._id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: 'var(--bg-black-50)',
                      borderRadius: '8px',
                    }}
                  >
                    <div>
                      <strong style={{ color: 'var(--text-black-900)', fontSize: '14px' }}>{c.title}</strong>
                      <br />
                      <small style={{ color: 'var(--skin-color)' }}>{c.issuer} ({c.category}) • {c.issueDate}</small>
                      {c.credentialUrl && (
                        <div style={{ marginTop: '3px' }}>
                          <a
                            href={c.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: '11px', color: '#37b182', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <i className="fa fa-arrow-up-right-from-square"></i> Validation Link Active
                          </a>
                        </div>
                      )}
                    </div>
                    <button className="action-btn delete" onClick={() => handleDeleteCert(c._id)}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Manage Skills */}
        {activeTab === 'skills' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px' }}>
            <div className="glass-card" style={{ padding: '25px' }}>
              <h3 style={{ color: 'var(--text-black-900)', fontSize: '18px', marginBottom: '15px' }}>
                Add New Skill
              </h3>
              <form onSubmit={handleAddSkill}>
                <div className="form-group">
                  <label>Skill Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. SAP RAP, Docker, Python"
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Proficiency: {skillForm.percentage}%</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    className="form-control"
                    value={skillForm.percentage}
                    onChange={(e) => setSkillForm({ ...skillForm, percentage: parseInt(e.target.value) })}
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    className="form-control"
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="Tools & Others">Tools & Others</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                  <i className="fa fa-plus"></i>
                  <span>Add Skill</span>
                </button>
              </form>
            </div>

            <div className="glass-card" style={{ padding: '25px' }}>
              <h3 style={{ color: 'var(--text-black-900)', fontSize: '18px', marginBottom: '15px' }}>
                Existing Skills ({skills.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {skills.map((s) => (
                  <div
                    key={s._id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: 'var(--bg-black-50)',
                      borderRadius: '8px',
                    }}
                  >
                    <div>
                      <strong style={{ color: 'var(--text-black-900)' }}>{s.name}</strong>
                      <span style={{ fontSize: '12px', color: 'var(--skin-color)', marginLeft: '10px' }}>
                        {s.percentage}% ({s.category})
                      </span>
                    </div>
                    <button className="action-btn delete" onClick={() => handleDeleteSkill(s._id)}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Experience & Education */}
        {activeTab === 'timeline' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {/* Experience */}
            <div className="glass-card" style={{ padding: '25px' }}>
              <h3 style={{ color: 'var(--text-black-900)', fontSize: '18px', marginBottom: '15px' }}>
                Add Internship / Work Experience
              </h3>
              <form onSubmit={handleAddExperience} style={{ marginBottom: '25px' }}>
                <div className="form-group">
                  <label>Role / Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Web Development Intern"
                    value={expForm.title}
                    onChange={(e) => setExpForm({ ...expForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Company / Organization</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. DRDO ITR / HAL"
                    value={expForm.company}
                    onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Period</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. June 2025 – July 2025"
                    value={expForm.period}
                    onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={expForm.description}
                    onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                  <i className="fa fa-plus"></i>
                  <span>Add Experience</span>
                </button>
              </form>

              <h4 style={{ color: 'var(--text-black-900)', fontSize: '16px', marginBottom: '10px' }}>
                Current Experiences ({experiences.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {experiences.map((exp) => (
                  <div key={exp._id} style={{ padding: '10px', background: 'var(--bg-black-50)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>{exp.title} - {exp.company}</strong>
                      <button className="action-btn delete" onClick={() => handleDeleteExperience(exp._id)}>
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                    <small style={{ color: 'var(--skin-color)' }}>{exp.period}</small>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="glass-card" style={{ padding: '25px' }}>
              <h3 style={{ color: 'var(--text-black-900)', fontSize: '18px', marginBottom: '15px' }}>
                Add Education Entry
              </h3>
              <form onSubmit={handleAddEducation} style={{ marginBottom: '25px' }}>
                <div className="form-group">
                  <label>Degree / Qualification</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. B.Tech in Computer Science and Engineering"
                    value={eduForm.degree}
                    onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Institution / College</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Government College of Engineering, Kalahandi"
                    value={eduForm.institution}
                    onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Period & Score</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 2022 – 2026 (CGPA: 7.7/10)"
                    value={eduForm.period}
                    onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={eduForm.description}
                    onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                  <i className="fa fa-plus"></i>
                  <span>Add Education</span>
                </button>
              </form>

              <h4 style={{ color: 'var(--text-black-900)', fontSize: '16px', marginBottom: '10px' }}>
                Current Education ({education.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {education.map((edu) => (
                  <div key={edu._id} style={{ padding: '10px', background: 'var(--bg-black-50)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>{edu.degree} - {edu.institution}</strong>
                      <button className="action-btn delete" onClick={() => handleDeleteEducation(edu._id)}>
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                    <small style={{ color: 'var(--skin-color)' }}>{edu.period}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Profile Editor */}
        {activeTab === 'profile' && (
          <div className="glass-card" style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
            <h3 style={{ color: 'var(--text-black-900)', fontSize: '20px', marginBottom: '20px' }}>
              Edit Profile & Bio Details
            </h3>
            <form onSubmit={handleSaveProfile}>
              <div className="form-row">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.name || ''}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Hero Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.title || ''}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row" style={{ marginTop: '15px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={profile.email || ''}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.phone || ''}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row" style={{ marginTop: '15px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>City & State</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.city || ''}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Degree</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.degree || ''}
                    onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '15px' }}>
                <label>Hero Bio Text</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={profile.bio || ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                ></textarea>
              </div>

              <div className="form-group">
                <label>About Me Bio Text</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={profile.aboutBio || ''}
                  onChange={(e) => setProfile({ ...profile, aboutBio: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn" style={{ marginTop: '10px' }}>
                <i className="fa fa-save"></i>
                <span>Save Profile Changes</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Project Create/Edit Modal */}
      {showProjectModal && (
        <div className="modal-overlay" onClick={() => setShowProjectModal(false)}>
          <div className="modal-card glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowProjectModal(false)}>
              <i className="fa fa-times"></i>
            </button>
            <h3 style={{ color: 'var(--text-black-900)', fontSize: '20px', marginBottom: '20px' }}>
              {editingProjectId ? 'Edit Project' : 'Create New Project'}
            </h3>
            <form onSubmit={handleSaveProject}>
              <div className="form-group">
                <label>Project Title *</label>
                <input
                  type="text"
                  className="form-control"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Category</label>
                  <select
                    className="form-control"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Event Management">Event Management</option>
                    <option value="Utility Apps">Utility Apps</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Image URL / Path</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="/assets/portfolio.6.png"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '15px' }}>
                <label>Description *</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>GitHub Repo URL *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="https://github.com/..."
                    value={projectForm.gitLink}
                    onChange={(e) => setProjectForm({ ...projectForm, gitLink: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Live Demo URL (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="https://..."
                    value={projectForm.liveLink}
                    onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '15px' }}>
                <label>Tech Tags (Comma separated)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ABAP Cloud, SAP RAP, CDS Views, SAP Fiori"
                  value={projectForm.tags}
                  onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                />
              </div>

              <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center' }}>
                <i className="fa fa-check"></i>
                <span>{editingProjectId ? 'Update Project' : 'Create Project'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      <Toast toasts={toasts} />
    </section>
  );
};
