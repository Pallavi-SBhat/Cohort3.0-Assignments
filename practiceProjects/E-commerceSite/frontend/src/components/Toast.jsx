import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-emerald-400" size={20} />;
      case 'error':
        return <AlertCircle className="text-rose-400" size={20} />;
      default:
        return <Info className="text-indigo-400" size={20} />;
    }
  };

  return (
    <div className="toast-alert">
      {getIcon()}
      <span style={{ fontSize: '0.9rem', color: '#f1f5f9', fontWeight: '500' }}>{message}</span>
      <button
        onClick={onClose}
        style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', marginLeft: '0.5rem' }}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
