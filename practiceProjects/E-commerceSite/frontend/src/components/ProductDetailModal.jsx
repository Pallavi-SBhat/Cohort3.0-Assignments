import React from 'react';
import { X, Calendar, User, Tag, ShieldAlert } from 'lucide-react';

const ProductDetailModal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '650px' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ height: '250px', borderRadius: '14px', overflow: 'hidden', background: '#0f172a' }}>
            <img
              src={product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>{product.category}</span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', margin: '0.4rem 0' }}>{product.name}</h2>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#38bdf8', margin: '0.5rem 0' }}>
                ${parseFloat(product.price).toFixed(2)}
              </div>
            </div>

            <div style={{ background: 'rgba(15,23,42,0.6)', padding: '0.85rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                <span>Stock Status:</span>
                <span style={{ fontWeight: '700', color: product.stock > 0 ? '#34d399' : '#f87171' }}>
                  {product.stock > 0 ? `${product.stock} units available` : 'Out of Stock'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#94a3b8' }}>
                <span>Product ID:</span>
                <span style={{ fontFamily: 'monospace', color: '#cbd5e1' }}>{product._id}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#e2e8f0', marginBottom: '0.5rem' }}>Description</h4>
          <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' }}>{product.description}</p>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn btn-primary btn-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
