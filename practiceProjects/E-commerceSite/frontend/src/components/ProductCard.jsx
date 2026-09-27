import React from 'react';
import { Edit2, Trash2, Package, Tag, User } from 'lucide-react';

const ProductCard = ({ product, user, onEdit, onDelete, onViewDetails }) => {
  const isOwnerOrAdmin = !!user; // Authenticated users can perform write ops per prompt

  const getStockBadge = (stock) => {
    if (stock > 10) {
      return <span className="badge badge-emerald">In Stock ({stock})</span>;
    } else if (stock > 0) {
      return <span className="badge badge-amber">Low Stock ({stock})</span>;
    } else {
      return <span className="badge badge-rose">Out of Stock</span>;
    }
  };

  return (
    <div className="glass-panel product-card">
      <div className="product-img-wrapper" onClick={() => onViewDetails(product)} style={{ cursor: 'pointer' }}>
        <img
          src={product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'}
          alt={product.name}
          className="product-img"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';
          }}
        />
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.5rem' }}>
          <span className="badge badge-purple">{product.category}</span>
        </div>
        <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
          {getStockBadge(product.stock)}
        </div>
      </div>

      <div className="product-body">
        <h3
          onClick={() => onViewDetails(product)}
          style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.4rem', cursor: 'pointer', color: '#fff' }}
        >
          {product.name}
        </h3>

        <p
          style={{
            fontSize: '0.875rem',
            color: '#94a3b8',
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.description}
        </p>

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Price</span>
            <span className="product-price">${parseFloat(product.price).toFixed(2)}</span>
          </div>

          {isOwnerOrAdmin ? (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => onEdit(product)}
                className="btn btn-secondary btn-sm"
                title="Edit Product"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={() => onDelete(product)}
                className="btn btn-danger btn-sm"
                title="Delete Product"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ) : (
            <button onClick={() => onViewDetails(product)} className="btn btn-secondary btn-sm">
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
