import React from 'react';

export const Toast = ({ toasts, removeToast }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type || 'success'}`}>
          <i
            className={`fa ${
              toast.type === 'error'
                ? 'fa-exclamation-circle'
                : 'fa-check-circle'
            }`}
            style={{
              color: toast.type === 'error' ? '#ec1839' : '#37b182',
              fontSize: '18px',
            }}
          ></i>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
