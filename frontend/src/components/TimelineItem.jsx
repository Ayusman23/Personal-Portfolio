import React from 'react';

export const TimelineItem = ({ item, type, onOpenCertificate }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-dot"></div>
      <div className="timeline-content">
        <div className="timeline-date">
          <i className="fa fa-calendar"></i>
          <span>{item.period}</span>
        </div>
        <h4 className="timeline-title">{type === 'experience' ? item.title : item.degree}</h4>
        <h5 className="timeline-subtitle">
          <i className={type === 'experience' ? 'fa fa-building' : 'fa fa-graduation-cap'} style={{ marginRight: '6px', color: 'var(--skin-color)' }}></i>
          {type === 'experience' ? item.company : item.institution}
          {item.score && <span style={{ marginLeft: '10px', color: 'var(--skin-color)', fontWeight: 700 }}>• {item.score}</span>}
        </h5>
        <p className="timeline-text">{item.description}</p>

        {/* Certificate / Offerletter links */}
        {type === 'experience' && (item.certificateUrl || item.offerLetterUrl) && (
          <div className="timeline-links">
            {item.certificateUrl && (
              <button
                className="timeline-link-btn"
                onClick={() => onOpenCertificate({ title: `${item.title} Certificate`, url: item.certificateUrl })}
              >
                <i className="fa fa-certificate"></i>
                <span>View Certificate</span>
              </button>
            )}
            {item.offerLetterUrl && (
              <button
                className="timeline-link-btn"
                onClick={() => onOpenCertificate({ title: `${item.title} Offer Letter`, url: item.offerLetterUrl })}
              >
                <i className="fa fa-file-invoice"></i>
                <span>View Offer Letter</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
