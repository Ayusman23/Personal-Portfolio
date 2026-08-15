import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProfile, getSkills, getEducation, getExperiences, getCertifications } from '../services/api';
import { SkillBar } from '../components/SkillBar';
import { TimelineItem } from '../components/TimelineItem';
import { CertificateModal } from '../components/CertificateModal';

export const About = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profRes, skillRes, eduRes, expRes, certRes] = await Promise.all([
          getProfile(),
          getSkills(),
          getEducation(),
          getExperiences(),
          getCertifications(),
        ]);

        if (profRes.data.success) setProfile(profRes.data.data);
        if (skillRes.data.success) setSkills(skillRes.data.data);
        if (eduRes.data.success) setEducation(eduRes.data.data);
        if (expRes.data.success) setExperiences(expRes.data.data);
        if (certRes.data.success) setCertifications(certRes.data.data);
      } catch (err) {
        console.error('Error fetching about data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <i className="fa fa-spinner fa-spin" style={{ fontSize: '32px', color: 'var(--skin-color)' }}></i>
      </div>
    );
  }

  const sapCerts = certifications.filter((c) => c.category === 'SAP');
  const otherCerts = certifications.filter((c) => c.category !== 'SAP');

  return (
    <section className="section about-section">
      <div className="container">
        <div className="section-title">
          <h2>About Me</h2>
          <p className="section-subtitle">
            SAP Certified Full-Stack Developer • Enterprise Architect • B.Tech Computer Science & Engineering
          </p>
        </div>

        {/* About Intro Text */}
        <div className="about-intro">
          <h3>
            I'm Ayusman Samantaray, <span>SAP Certified Full-Stack Developer</span>
          </h3>
          <p>
            {profile?.aboutBio ||
              'Passionate software engineer with hands-on production experience in SAP BTP, ABAP Cloud, SAP Fiori, Node.js, React.js, and AWS across government-sector and enterprise internships. Proven ability to automate workflows, reduce manual effort by up to 60%, and deliver scalable, secure enterprise solutions.'}
          </p>
        </div>

        {/* Personal Info & Skills Grid */}
        <div className="about-grid">
          {/* Personal Info Card */}
          <div className="personal-info-card glass-card">
            <h4>
              <i className="fa fa-user-circle"></i>
              <span>Personal Details</span>
            </h4>
            <div className="info-list">
              <div className="info-item">
                <p>Location: <span>{profile?.city || 'Bhubaneswar / Koraput, Odisha'}</span></p>
              </div>
              <div className="info-item">
                <p>Degree: <span>B.Tech CSE (CGPA: 7.7/10)</span></p>
              </div>
              <div className="info-item">
                <p>Phone: <span>{profile?.phone || '+91 8328943690'}</span></p>
              </div>
              <div className="info-item">
                <p>Email: <span style={{ wordBreak: 'break-all' }}>{profile?.email || 'ayusman2348@gmail.com'}</span></p>
              </div>
              <div className="info-item">
                <p>Languages: <span>English, Hindi, Odia</span></p>
              </div>
              <div className="info-item">
                <p>Status: <span style={{ color: '#37b182' }}>Open for Opportunities</span></p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
              <a
                href={profile?.resumeUrl || '/assets/Ayusman_Samantaray_Resume.pdf'}
                download="Ayusman_Samantaray_Resume.pdf"
                className="btn btn-sm"
              >
                <i className="fa fa-file-pdf"></i>
                <span>Download SAP Resume</span>
              </a>
              <Link to="/contact" className="btn btn-secondary btn-sm">
                <i className="fa fa-handshake"></i>
                <span>Hire Me</span>
              </Link>
            </div>
          </div>

          {/* Skills Card */}
          <div className="skills-card glass-card">
            <h4>
              <i className="fa fa-code"></i>
              <span>Technical Skills</span>
            </h4>
            <div className="skills-list">
              {skills.map((skill) => (
                <SkillBar key={skill._id} skill={skill} />
              ))}
            </div>
          </div>
        </div>

        {/* SAP & Professional Certifications Section */}
        <div style={{ marginBottom: '45px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <h3 style={{ fontSize: '24px', color: 'var(--text-black-900)', fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fa fa-certificate" style={{ color: 'var(--skin-color)' }}></i>
              <span>SAP & Professional Certifications</span>
            </h3>
            <a
              href="https://drive.google.com/drive/folders/1W_p-7lCT-Yum6X0JiToYrypBppu7IcO3?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <i className="fa-brands fa-google-drive"></i>
              <span>View Supporting Certificates</span>
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {sapCerts.map((cert) => (
              <div
                key={cert._id}
                className="glass-card"
                style={{
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  borderLeft: '4px solid var(--skin-color)',
                }}
              >
                <div
                  style={{
                    height: '46px',
                    width: '46px',
                    borderRadius: '10px',
                    background: 'rgba(236, 24, 57, 0.1)',
                    color: 'var(--skin-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0,
                  }}
                >
                  <i className={`fa ${cert.icon || 'fa-certificate'}`}></i>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--skin-color)', textTransform: 'uppercase' }}>
                    {cert.issuer} • {cert.issueDate}
                  </span>
                  <h4 style={{ fontSize: '15px', color: 'var(--text-black-900)', marginTop: '4px', lineHeight: '1.4' }}>
                    {cert.title}
                  </h4>
                </div>
              </div>
            ))}

            {otherCerts.map((cert) => (
              <div
                key={cert._id}
                className="glass-card"
                style={{
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  borderLeft: '4px solid #37b182',
                }}
              >
                <div
                  style={{
                    height: '46px',
                    width: '46px',
                    borderRadius: '10px',
                    background: 'rgba(55, 177, 130, 0.1)',
                    color: '#37b182',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0,
                  }}
                >
                  <i className={`fa ${cert.icon || 'fa-award'}`}></i>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#37b182', textTransform: 'uppercase' }}>
                    {cert.issuer} • {cert.issueDate}
                  </span>
                  <h4 style={{ fontSize: '15px', color: 'var(--text-black-900)', marginTop: '4px', lineHeight: '1.4' }}>
                    {cert.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Experience Timeline */}
        <div className="timeline-section-grid">
          {/* Experience Timeline */}
          <div className="timeline-column">
            <h3>
              <i className="fa fa-briefcase"></i>
              <span>Professional Experience & Internships</span>
            </h3>
            <div className="timeline-container">
              {experiences.map((exp) => (
                <TimelineItem
                  key={exp._id}
                  item={exp}
                  type="experience"
                  onOpenCertificate={(cert) => setSelectedCertificate(cert)}
                />
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div className="timeline-column">
            <h3>
              <i className="fa fa-graduation-cap"></i>
              <span>Education</span>
            </h3>
            <div className="timeline-container">
              {education.map((edu) => (
                <TimelineItem key={edu._id} item={edu} type="education" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certificate / Document Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  );
};
