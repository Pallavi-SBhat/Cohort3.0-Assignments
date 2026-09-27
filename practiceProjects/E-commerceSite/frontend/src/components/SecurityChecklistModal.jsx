import React from 'react';
import { ShieldCheck, Check, Key, Lock, Database, FileText, X } from 'lucide-react';

const SecurityChecklistModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const checklistItems = [
    {
      title: 'Bcrypt Password Hashing',
      desc: 'Passwords hashed with bcrypt (min 10 salt rounds) before DB save. Never logged or returned in responses.',
      icon: <Lock className="text-emerald-400" size={18} />,
    },
    {
      title: 'JWT Secrets in .env Environment',
      desc: 'ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET stored securely in environment config.',
      icon: <Key className="text-indigo-400" size={18} />,
    },
    {
      title: 'httpOnly Refresh Token Cookies',
      desc: 'Refresh tokens stored in httpOnly, sameSite cookies to protect against XSS attacks.',
      icon: <ShieldCheck className="text-purple-400" size={18} />,
    },
    {
      title: 'Server-Side Token Revocation & DB Storage',
      desc: 'Active refresh tokens persisted in User document in MongoDB for explicit invalidation on logout.',
      icon: <Database className="text-amber-400" size={18} />,
    },
    {
      title: 'express-validator Input Validation',
      desc: 'All body, params, and query inputs validated. Rejects bad requests with field-level 400 JSON errors.',
      icon: <FileText className="text-cyan-400" size={18} />,
    },
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <ShieldCheck size={26} className="text-emerald-400" />
          <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#fff' }}>Security & Architecture Checklist</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {checklistItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '1rem',
                borderRadius: '12px',
                display: 'flex',
                gap: '0.85rem',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ marginTop: '2px' }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#f1f5f9' }}>{item.title}</h4>
                  <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>Verified</span>
                </div>
                <p style={{ fontSize: '0.825rem', color: '#94a3b8', marginTop: '0.25rem' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn btn-primary btn-sm">
            Close Specs
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityChecklistModal;
