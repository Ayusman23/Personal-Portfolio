import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Toast } from '../components/Toast';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const { login } = useAuth();
  const navigate = useNavigate();

  const addToast = (message, type = 'error') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      addToast('Please enter your owner email and password.', 'error');
      return;
    }

    try {
      setLoading(true);
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Access denied. Only the portfolio owner can sign in.';
      addToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section admin-login-wrapper">
      <div className="admin-login-card glass-card">
        <div className="admin-login-header">
          <div className="admin-icon">
            <i className="fa fa-shield-halved"></i>
          </div>
          <h2>Owner Portal</h2>
          <p>Restricted Area — Authorized Portfolio Owner Only</p>
        </div>

        <form onSubmit={handleLogin} autoComplete="off">
          <div className="form-group">
            <label htmlFor="username">Owner Email / Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter owner email"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Security Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
          >
            {loading ? (
              <>
                <i className="fa fa-spinner fa-spin"></i>
                <span>Verifying Security Access...</span>
              </>
            ) : (
              <>
                <i className="fa fa-lock"></i>
                <span>Authenticate & Access CMS</span>
              </>
            )}
          </button>
        </form>
      </div>

      <Toast toasts={toasts} />
    </section>
  );
};
