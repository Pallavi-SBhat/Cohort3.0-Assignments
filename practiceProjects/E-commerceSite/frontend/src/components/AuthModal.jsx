import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, AlertCircle, CheckCircle2 } from 'lucide-react';
import api, { setAccessToken } from '../services/api';

const AuthModal = ({ isOpen, onClose, initialMode = 'login', onAuthSuccess, showToast }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error on input change
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: null });
    }
    setGeneralError('');
  };

  const handleTabSwitch = (newMode) => {
    setMode(newMode);
    setFieldErrors({});
    setGeneralError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});
    setGeneralError('');
    setSuccessMessage('');

    try {
      if (mode === 'register') {
        // POST /api/auth/register
        const res = await api.post('/auth/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });

        if (res.data.success) {
          setSuccessMessage('Registration successful! You can now log in.');
          showToast('Registered successfully! Please log in.', 'success');
          // Per requirements: Do not return tokens on register. Switch to login mode.
          setTimeout(() => {
            handleTabSwitch('login');
          }, 1500);
        }
      } else {
        // POST /api/auth/login
        const res = await api.post('/auth/login', {
          email: formData.email,
          password: formData.password,
        });

        if (res.data.success) {
          setAccessToken(res.data.accessToken);
          onAuthSuccess(res.data.user);
          showToast(`Welcome back, ${res.data.user.name}!`, 'success');
          onClose();
        }
      }
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;

        // Express-validator 400 Field-level errors
        if (status === 400 && data.errors && Array.isArray(data.errors)) {
          const errorsObj = {};
          data.errors.forEach((errItem) => {
            errorsObj[errItem.field] = errItem.message;
          });
          setFieldErrors(errorsObj);
          setGeneralError(data.message || 'Please fix the errors below.');
        } else if (status === 409) {
          // Duplicate email
          setFieldErrors({ email: data.message });
        } else if (status === 401) {
          // Password mismatch or invalid credentials (generic message)
          setGeneralError(data.message || 'Invalid email or password');
        } else {
          setGeneralError(data.message || 'An unexpected error occurred.');
        }
      } else {
        setGeneralError('Network error. Is the server running?');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {/* Tab Headers */}
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem', paddingBottom: '0.75rem' }}>
          <button
            onClick={() => handleTabSwitch('login')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              color: mode === 'login' ? '#6366f1' : '#94a3b8',
              borderBottom: mode === 'login' ? '2px solid #6366f1' : 'none',
              paddingBottom: '0.4rem',
            }}
          >
            Login
          </button>
          <button
            onClick={() => handleTabSwitch('register')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              color: mode === 'register' ? '#6366f1' : '#94a3b8',
              borderBottom: mode === 'register' ? '2px solid #6366f1' : 'none',
              paddingBottom: '0.4rem',
            }}
          >
            Register
          </button>
        </div>

        {generalError && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#f87171', padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1.25rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} />
            <span>{generalError}</span>
          </div>
        )}

        {successMessage && (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399', padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1.25rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className={`form-input ${fieldErrors.name ? 'is-invalid' : ''}`}
                  autoComplete="name"
                  required
                />
              </div>
              {fieldErrors.name && (
                <div className="error-feedback">
                  <AlertCircle size={14} />
                  <span>{fieldErrors.name}</span>
                </div>
              )}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. user@example.com"
              className={`form-input ${fieldErrors.email ? 'is-invalid' : ''}`}
              autoComplete="email"
              required
            />
            {fieldErrors.email && (
              <div className="error-feedback">
                <AlertCircle size={14} />
                <span>{fieldErrors.email}</span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min. 6 characters"
              className={`form-input ${fieldErrors.password ? 'is-invalid' : ''}`}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              required
            />
            {fieldErrors.password && (
              <div className="error-feedback">
                <AlertCircle size={14} />
                <span>{fieldErrors.password}</span>
              </div>
            )}
          </div>

          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className={`form-input ${fieldErrors.confirmPassword ? 'is-invalid' : ''}`}
                autoComplete="new-password"
                required
              />
              {fieldErrors.confirmPassword && (
                <div className="error-feedback">
                  <AlertCircle size={14} />
                  <span>{fieldErrors.confirmPassword}</span>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }}
            disabled={loading}
          >
            {loading ? 'Processing...' : mode === 'register' ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: '#94a3b8' }}>
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <span
                onClick={() => handleTabSwitch('register')}
                style={{ color: '#6366f1', cursor: 'pointer', fontWeight: '600' }}
              >
                Register here
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                onClick={() => handleTabSwitch('login')}
                style={{ color: '#6366f1', cursor: 'pointer', fontWeight: '600' }}
              >
                Login here
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
