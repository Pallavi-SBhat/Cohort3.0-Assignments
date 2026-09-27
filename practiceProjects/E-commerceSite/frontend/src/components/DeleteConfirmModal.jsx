import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import api from '../services/api';

const DeleteConfirmModal = ({ isOpen, onClose, product, onDeleteSuccess, showToast }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !product) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError('');

    try {
      // DELETE /api/products/:id (Authenticated)
      await api.delete(`/products/${product._id}`);
      showToast(`Product "${product.name}" deleted successfully!`, 'success');
      onDeleteSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '450px' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(244,63,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>Delete Product?</h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>This action cannot be undone.</p>
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#f87171', padding: '0.65rem 0.85rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', margin: '1rem 0' }}>
          Are you sure you want to delete <strong style={{ color: '#fff' }}>"{product.name}"</strong>? It will be permanently removed from the database.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
          <button onClick={onClose} className="btn btn-secondary btn-sm" disabled={loading}>
            Cancel
          </button>
          <button onClick={handleDelete} className="btn btn-danger btn-sm" disabled={loading}>
            {loading ? 'Deleting...' : 'Confirm Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
