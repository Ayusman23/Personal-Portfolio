import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { submitContactMessage, getProfile } from '../services/api';
import { Toast } from '../components/Toast';

export const Contact = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        if (res.data.success) {
          setProfile(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching contact details:', err);
      }
    };
    fetchProfile();
  }, []);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      addToast('Please fill out all required fields.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const res = await submitContactMessage(formData);
      if (res.data.success) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ec1839', '#fa5b0f', '#37b182', '#1854b4', '#f021b2'],
        });

        addToast(res.data.message || 'Thank you! Your message has been sent successfully. Ayusman will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to send message. Please try again.';
      addToast(errMsg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section contact-section">
      <div className="container">
        <div className="section-title">
          <h2>Contact Me</h2>
          <p className="section-subtitle">Have a project opportunity, SAP consulting inquiry, or technical question? Let's connect!</p>
        </div>

        <div className="contact-grid">
          {/* Contact Info Cards */}
          <div className="contact-info-cards">
            <div className="contact-info-card glass-card">
              <div className="icon-box">
                <i className="fa fa-phone"></i>
              </div>
              <div>
                <h4>Phone / WhatsApp</h4>
                <p>{profile?.phone || '+91 8328943690'}</p>
              </div>
            </div>

            <div className="contact-info-card glass-card">
              <div className="icon-box">
                <i className="fa fa-map-marker-alt"></i>
              </div>
              <div>
                <h4>Location</h4>
                <p>{profile?.city || 'Bhubaneswar / Koraput, Odisha, India'}</p>
              </div>
            </div>

            <div className="contact-info-card glass-card">
              <div className="icon-box">
                <i className="fa fa-envelope"></i>
              </div>
              <div>
                <h4>Email</h4>
                <p style={{ wordBreak: 'break-all' }}>{profile?.email || 'ayusman2348@gmail.com'}</p>
              </div>
            </div>

            <div className="contact-info-card glass-card">
              <div className="icon-box">
                <i className="fa fa-briefcase"></i>
              </div>
              <div>
                <h4>Availability</h4>
                <p>{profile?.freelanceStatus || 'Open for SAP Developer, Fiori, BTP & Full-Stack Roles'}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-card glass-card">
            <h3>Send Me a Message</h3>
            <p>I am very responsive and will get back to you promptly.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="email">Your Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-control"
                  placeholder="e.g. SAP Consulting / Full-Stack Developer Opportunity"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  placeholder="Write your message here..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn"
                disabled={submitting}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {submitting ? (
                  <>
                    <i className="fa fa-spinner fa-spin"></i>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <i className="fa fa-paper-plane"></i>
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Toast toasts={toasts} />
    </section>
  );
};
