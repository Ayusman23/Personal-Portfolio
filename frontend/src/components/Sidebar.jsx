import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (window.innerWidth < 1200) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Nav Toggler */}
      <div className={`nav-toggler ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        <span></span>
      </div>

      {/* Main Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="logo">
          <Link to="/" onClick={closeSidebar}>
            <span>A</span>yusman
          </Link>
          <p>MERN Portfolio</p>
        </div>

        <ul className="nav">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={closeSidebar}
            >
              <i className="fa fa-home"></i>
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={closeSidebar}
            >
              <i className="fa fa-user"></i>
              <span>About</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={closeSidebar}
            >
              <i className="fa fa-list-check"></i>
              <span>Services</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={closeSidebar}
            >
              <i className="fa fa-briefcase"></i>
              <span>Projects</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={closeSidebar}
            >
              <i className="fa fa-comments"></i>
              <span>Contact</span>
            </NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={closeSidebar}
                style={{ color: 'var(--skin-color)' }}
              >
                <i className="fa fa-gauge-high"></i>
                <span>Admin CMS</span>
              </NavLink>
            </li>
          )}
        </ul>

        <div className="sidebar-footer">
          <div className="sidebar-socials">
            <a
              href="https://github.com/Ayusman23"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/ayusman-samantaray"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a
              href="mailto:ayusmansamantaray23@gmail.com"
              title="Email"
            >
              <i className="fa fa-envelope"></i>
            </a>
          </div>

          <Link
            to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
            className="admin-link-btn"
            onClick={closeSidebar}
          >
            <i className="fa fa-lock"></i>
            <span>{isAuthenticated ? 'CMS Dashboard' : 'Admin Login'}</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
