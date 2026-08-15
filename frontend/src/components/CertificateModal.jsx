import React from 'react';

export const CertificateModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  const targetUrl =
    certificate.credentialUrl ||
    certificate.certificateUrl ||
    certificate.url ||
    'https://drive.google.com/drive/folders/1W_p-7lCT-Yum6X0JiToYrypBppu7IcO3?usp=sharing';

  const isDRDO =
    certificate.title?.toLowerCase().includes('drdo') ||
    certificate.title?.toLowerCase().includes('itr') ||
    certificate.company?.toLowerCase().includes('drdo');

  const isHAL =
    certificate.title?.toLowerCase().includes('hal') ||
    certificate.title?.toLowerCase().includes('hindustan') ||
    certificate.company?.toLowerCase().includes('hal');

  const isSAP =
    certificate.category === 'SAP' ||
    certificate.issuer?.toLowerCase().includes('sap') ||
    certificate.title?.toLowerCase().includes('sap');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '820px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <i className="fa fa-times"></i>
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                padding: '3px 10px',
                borderRadius: '12px',
                background: isSAP
                  ? 'rgba(236, 24, 57, 0.12)'
                  : isDRDO
                  ? 'rgba(255, 153, 51, 0.15)'
                  : 'rgba(55, 177, 130, 0.12)',
                color: isSAP ? 'var(--skin-color)' : isDRDO ? '#ff9933' : '#37b182',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <i className="fa fa-circle-check"></i>
              {isSAP
                ? 'SAP Certified Credential'
                : isDRDO
                ? 'Ministry of Defence • DRDO'
                : isHAL
                ? 'Hindustan Aeronautics Limited'
                : `${certificate.issuer || 'Official'} Credential`}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-black-600)' }}>
              • {certificate.issueDate || 'Verified'}
            </span>
          </div>
          <h3 style={{ color: 'var(--text-black-900)', fontSize: '20px', fontFamily: 'var(--font-heading)', margin: 0 }}>
            {certificate.title}
          </h3>
        </div>

        {/* Certificate Display Area */}
        <div
          style={{
            flex: 1,
            minHeight: '340px',
            background: 'var(--bg-black-100)',
            border: '2px solid var(--border-color)',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
          }}
        >
          {isDRDO ? (
            <div style={{ border: '2px dashed #ff9933', padding: '24px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
                <i className="fa fa-shield-halved" style={{ fontSize: '36px', color: '#ff9933' }}></i>
                <div>
                  <h4 style={{ fontSize: '18px', color: 'var(--text-black-900)', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                    Integrated Test Range (ITR), Chandipur
                  </h4>
                  <small style={{ color: 'var(--text-black-600)' }}>Defence Research & Development Organisation (DRDO), Ministry of Defence</small>
                </div>
              </div>

              <div style={{ background: 'rgba(255, 153, 51, 0.12)', display: 'inline-block', padding: '4px 16px', borderRadius: '20px', margin: '10px 0' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#ff9933' }}>
                  Certificate No: ITR/HRD/183/2025 • ISO 9001:2015 Establishment
                </span>
              </div>

              <h3 style={{ fontSize: '19px', color: 'var(--text-black-900)', margin: '14px 0 8px 0', fontFamily: 'var(--font-heading)' }}>
                VOCATIONAL TRAINING CERTIFICATE
              </h3>

              <p style={{ fontSize: '14px', color: 'var(--text-black-700)', lineHeight: '1.7', maxWidth: '650px', margin: '0 auto' }}>
                Certified that <strong>Ayusman Samantaray</strong>, student of 06th Semester B.Tech in Computer Science & Engineering from Government College of Engineering, Bhawanipatna has successfully completed his <strong>30 Days Vocational Training on Canteen Management System</strong> in the <strong>Directorate of Campus Area Network & Data Centre</strong> under the guidance of <strong>Shri Antaryami Patra, Scientist-'E'</strong>.
              </p>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '15px', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ textAlign: 'left', fontSize: '12px', color: 'var(--text-black-600)' }}>
                  <p style={{ margin: '2px 0' }}><strong>Place:</strong> Chandipur</p>
                  <p style={{ margin: '2px 0' }}><strong>Date:</strong> 16 July 2025</p>
                </div>
                <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--text-black-700)' }}>
                  <p style={{ fontWeight: 700, color: '#ff9933', margin: '2px 0' }}>Group Director (HRD)</p>
                  <p style={{ margin: '2px 0' }}>ITR Chandipur, DRDO</p>
                </div>
              </div>
            </div>
          ) : isSAP ? (
            <div style={{ border: '2px solid var(--skin-color)', background: 'rgba(236, 24, 57, 0.03)', padding: '28px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(236, 24, 57, 0.12)', color: 'var(--skin-color)', fontSize: '28px', marginBottom: '12px' }}>
                <i className={`fa ${certificate.icon || 'fa-cubes'}`}></i>
              </div>
              <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--skin-color)', fontWeight: 800, margin: '4px 0' }}>
                SAP Certified Professional Credential
              </h4>
              <h3 style={{ fontSize: '21px', color: 'var(--text-black-900)', fontFamily: 'var(--font-heading)', margin: '10px 0 6px 0' }}>
                {certificate.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-black-600)', margin: '0 0 16px 0' }}>
                Issued to <strong>Ayusman Samantaray</strong> • Validated Candidate
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', margin: '16px 0' }}>
                <div style={{ padding: '8px 18px', background: 'var(--bg-black-50)', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'left' }}>
                  <small style={{ display: 'block', fontSize: '11px', color: 'var(--text-black-600)' }}>Issuer</small>
                  <strong style={{ fontSize: '13px', color: 'var(--text-black-900)' }}>SAP SE</strong>
                </div>
                <div style={{ padding: '8px 18px', background: 'var(--bg-black-50)', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'left' }}>
                  <small style={{ display: 'block', fontSize: '11px', color: 'var(--text-black-600)' }}>Year</small>
                  <strong style={{ fontSize: '13px', color: 'var(--text-black-900)' }}>{certificate.issueDate || '2026'}</strong>
                </div>
                <div style={{ padding: '8px 18px', background: 'rgba(55, 177, 130, 0.1)', borderRadius: '8px', border: '1px solid rgba(55, 177, 130, 0.3)', textAlign: 'left' }}>
                  <small style={{ display: 'block', fontSize: '11px', color: '#37b182' }}>Verification Status</small>
                  <strong style={{ fontSize: '13px', color: '#37b182' }}>
                    <i className="fa fa-check-circle"></i> Active & Verified
                  </strong>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-black-600)', maxWidth: '580px', margin: '12px auto 0 auto', lineHeight: '1.6' }}>
                Official verification document is available in the verified supporting credentials drive repository.
              </p>
            </div>
          ) : (
            <div style={{ border: '2px solid #37b182', background: 'rgba(55, 177, 130, 0.03)', padding: '28px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(55, 177, 130, 0.12)', color: '#37b182', fontSize: '28px', marginBottom: '12px' }}>
                <i className={`fa ${certificate.icon || 'fa-award'}`}></i>
              </div>
              <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', color: '#37b182', fontWeight: 800, margin: '4px 0' }}>
                {certificate.issuer || 'Verified Credential'}
              </h4>
              <h3 style={{ fontSize: '21px', color: 'var(--text-black-900)', fontFamily: 'var(--font-heading)', margin: '10px 0 6px 0' }}>
                {certificate.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-black-600)', margin: '0 0 16px 0' }}>
                Awarded to <strong>Ayusman Samantaray</strong> ({certificate.issueDate || '2024 - 2026'})
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', background: 'rgba(55, 177, 130, 0.1)', color: '#37b182', fontWeight: 600, fontSize: '13px' }}>
                <i className="fa fa-circle-check"></i> Verified Technical Credential
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <i className="fa-brands fa-google-drive"></i>
            <span>Open & Validate Supporting Certificate</span>
            <i className="fa fa-arrow-up-right-from-square" style={{ fontSize: '11px' }}></i>
          </a>

          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            <i className="fa fa-check"></i>
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
