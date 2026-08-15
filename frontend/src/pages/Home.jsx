import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProfile } from '../services/api';

export const Home = () => {
  const [profile, setProfile] = useState({
    name: 'Ayusman Samantaray',
    title: 'SAP Certified Full-Stack Developer | SAP Fiori | SAP BTP | ABAP Cloud | SAP S/4HANA',
    typingTitles: [
      'SAP Certified Full-Stack Developer',
      'SAP Fiori & SAPUI5 Specialist',
      'SAP BTP & ABAP Cloud Developer',
      'Full Stack MERN Engineer',
      'Enterprise Solutions Architect',
    ],
    bio: 'SAP-certified Software Engineer and B.Tech graduate in Computer Science and Engineering (2026), with certifications in SAP Fiori, SAP BTP Solution Architecture, ABAP Cloud, SAP S/4HANA, and SAP Generative AI. Hands-on experience developing enterprise applications using SAP technologies, React.js, Node.js, TypeScript, JavaScript, SQL, and AWS through government-sector internships.',
    avatarUrl: '/assets/My.jpg',
    resumeUrl: '/assets/Ayusman_Samantaray_Resume.pdf',
    freelanceStatus: 'Open for Opportunities',
  });

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        if (res.data.success && res.data.data) {
          setProfile(res.data.data);
        }
      } catch (err) {
        console.error('Error loading profile info:', err);
      }
    };
    fetchProfile();
  }, []);

  // Typewriter effect
  useEffect(() => {
    const titles = profile.typingTitles && profile.typingTitles.length > 0
      ? profile.typingTitles
      : ['SAP Certified Full-Stack Developer', 'SAP Fiori Specialist', 'MERN Stack Engineer'];

    const fullTitle = titles[currentTitleIndex % titles.length];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullTitle.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullTitle) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setCurrentText(fullTitle.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => prev + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTitleIndex, profile.typingTitles, typingSpeed]);

  return (
    <section className="section home-section">
      <div className="container">
        <div className="hero-grid">
          <div className="home-info">
            <div className="hero-badge">
              <span className="pulse-dot"></span>
              <span>{profile.freelanceStatus || 'Open for Opportunities'}</span>
            </div>

            <h3 className="hello">
              Hello, my name is <span className="name">{profile.name}</span>
            </h3>

            <h3 className="my-profession">
              I'm a <span className="typing">{currentText}</span>
            </h3>

            <p className="hero-desc">
              {profile.bio}
            </p>

            <div className="hero-buttons">
              <a
                href={profile.resumeUrl || '/assets/Ayusman_Samantaray_Resume.pdf'}
                download="Ayusman_Samantaray_SAP_Resume.pdf"
                className="btn"
              >
                <i className="fa fa-file-pdf"></i>
                <span>Download SAP Resume</span>
              </a>
              <Link to="/contact" className="btn btn-secondary">
                <i className="fa fa-paper-plane"></i>
                <span>Hire Me</span>
              </Link>
              <Link to="/projects" className="btn btn-secondary">
                <i className="fa fa-layer-group"></i>
                <span>View Enterprise Projects</span>
              </Link>
            </div>
          </div>

          <div className="home-img-wrapper">
            <div className="home-img-inner">
              <img
                src={profile.avatarUrl || '/assets/My.jpg'}
                alt={profile.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/My.jpg';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
