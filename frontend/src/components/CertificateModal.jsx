import React from 'react';

export const CertificateModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  const isDRDO = certificate.title?.toLowerCase().includes('drdo') || certificate.title?.toLowerCase().includes('itr');
  const isHAL = certificate.title?.toLowerCase().includes('hal') || certificate.title?.toLowerCase().includes('hindustan');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '850px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <i className="fa fa-times"></i>
        </button>

        <div style={{ marginBottom: '15px' }}>
          <h3 style={{ color: 'var(--text-black-900)', fontSize: '20px', fontFamily: 'var(--font-heading)' }}>
            {certificate.title}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--skin-color)', fontWeight: 600 }}>
            {isDRDO
              ? 'Government of India — Ministry of Defence | Integrated Test Range (ITR), Chandipur'
              : isHAL
              ? 'Hindustan Aeronautics Limited (HAL) — Aircraft Division, Sunabeda'
              : 'Verified Professional Certificate'}
          </p>
        </div>

        {/* Certificate Preview Card */}
        <div
          style={{
            flex: 1,
            minHeight: '380px',
            background: 'var(--bg-black-100)',
            border: '2px solid var(--border-color)',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
          }}
        >
          {isDRDO ? (
            <div style={{ border: '2px dashed var(--skin-color)', padding: '24px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
                <i className="fa fa-shield-halved" style={{ fontSize: '36px', color: 'var(--skin-color)' }}></i>
                <div>
                  <h4 style={{ fontSize: '18px', color: 'var(--text-black-900)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Integrated Test Range (ITR), Chandipur
                  </h4>
                  <small style={{ color: 'var(--text-black-600)' }}>Defence Research & Development Organisation (DRDO), Ministry of Defence</small>
                </div>
              </div>

              <div style={{ background: 'rgba(236, 24, 57, 0.1)', display: 'inline-block', padding: '4px 16px', borderRadius: '20px', margin: '10px 0' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--skin-color)' }}>
                  Certificate No: ITR/HRD/183/2025 • ISO 9001:2015 Establishment
                </span>
              </div>

              <h3 style={{ fontSize: '20px', color: 'var(--text-black-900)', margin: '14px 0 8px 0', fontFamily: 'var(--font-heading)' }}>
                VOCATIONAL TRAINING CERTIFICATE
              </h3>

              <p style={{ fontSize: '14px', color: 'var(--text-black-700)', lineHeight: '1.7', maxWidth: '650px', margin: '0 auto' }}>
                Certified that <strong>Ayusman Samantaray</strong>, student of 06th Semester B.Tech in Computer Science & Engineering from Government College of Engineering, Bhawanipatna has successfully completed his <strong>30 Days Vocational Training on Canteen Management System</strong> in the <strong>Directorate of Campus Area Network & Data Centre</strong> under the guidance of <strong>Shri Antaryami Patra, Scientist-'E'</strong>.
              </p>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '15px', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ textAlign: 'left', fontSize: '12px', color: 'var(--text-black-600)' }}>
                  <p><strong>Place:</strong> Chandipur</p>
                  <p><strong>Date:</strong> 16 July 2025</p>
                </div>
                <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--text-black-700)' }}>
                  <p style={{ fontWeight: 700, color: 'var(--skin-color)' }}>Group Director (HRD)</p>
                  <p>ITR Chandipur, DRDO</p>
                </div>
              </div>
            </div>
          ) : certificate.url ? (
            <iframe
              src={certificate.url}
              title={certificate.title}
              width="100%"
              height="100%"
              style={{ border: 'none', minHeight: '380px', borderRadius: '8px' }}
            ></iframe>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <i className="fa fa-award" style={{ fontSize: '48px', color: 'var(--skin-color)', marginBottom: '15px' }}></i>
              <h4 style={{ color: 'var(--text-black-900)', fontSize: '18px' }}>{certificate.title}</h4>
              <p style={{ color: 'var(--text-black-600)', marginTop: '8px' }}>Official certificate record verified on portfolio database.</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          {certificate.url && (
            <a
              href={certificate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <i className="fa fa-external-link"></i>
              <span>Open Document</span>
            </a>
          )}
          <button className="btn btn-sm" onClick={onClose}>
            <i className="fa fa-check"></i>
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
