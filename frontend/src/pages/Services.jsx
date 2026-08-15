import React, { useState, useEffect } from 'react';
import { getServices } from '../services/api';

export const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getServices();
        if (res.data.success) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <i className="fa fa-spinner fa-spin" style={{ fontSize: '32px', color: 'var(--skin-color)' }}></i>
      </div>
    );
  }

  return (
    <section className="section services-section">
      <div className="container">
        <div className="section-title">
          <h2>Services</h2>
          <p className="section-subtitle">High quality web solutions, UI/UX engineering, and full stack architectures</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service._id} className="service-card glass-card">
              <div className="icon-box">
                <i className={`fa ${service.icon || 'fa-laptop-code'}`}></i>
              </div>
              <h4>{service.title}</h4>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
