import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import api from '../services/api';

const ProductModal = ({ isOpen, onClose, product, onSaveSuccess, showToast }) => {
  const isEditing = !!product;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Electronics',
    imageUrl: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price !== undefined ? product.price : '',
        stock: product.stock !== undefined ? product.stock : '',
        category: product.category || 'Electronics',
        imageUrl: product.imageUrl || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '10',
        category: 'Electronics',
        imageUrl: '',
      });
    }
    setFieldErrors({});
    setGeneralError('');
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: null });
    }
    setGeneralError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});
    setGeneralError('');

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category,
        imageUrl: formData.imageUrl || undefined,
      };

      if (isEditing) {
        // PUT /api/products/:id (Authenticated)
        await api.put(`/products/${product._id}`, payload);
        showToast('Product updated successfully!', 'success');
      } else {
        // POST /api/products (Authenticated)
        await api.post('/products', payload);
        showToast('New product created successfully!', 'success');
      }

      onSaveSuccess();
      onClose();
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        // Express validator 400 Field-level errors
        if (status === 400 && data.errors && Array.isArray(data.errors)) {
          const errorsObj = {};
          data.errors.forEach((errItem) => {
            errorsObj[errItem.field] = errItem.message;
          });
          setFieldErrors(errorsObj);
          setGeneralError(data.message || 'Validation failed. Please fix inputs.');
        } else {
          setGeneralError(data.message || 'Failed to save product');
        }
      } else {
        setGeneralError('Network error. Failed to reach API.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '1.25rem', color: '#fff' }}>
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h2>

        {generalError && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#f87171', padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1.25rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} />
            <span>{generalError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Wireless Ergonomic Headphones"
              className={`form-input ${fieldErrors.name ? 'is-invalid' : ''}`}
              required
            />
            {fieldErrors.name && (
              <div className="error-feedback">
                <AlertCircle size={14} />
                <span>{fieldErrors.name}</span>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Price ($)</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="29.99"
                className={`form-input ${fieldErrors.price ? 'is-invalid' : ''}`}
                required
              />
              {fieldErrors.price && (
                <div className="error-feedback">
                  <AlertCircle size={14} />
                  <span>{fieldErrors.price}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="10"
                className={`form-input ${fieldErrors.stock ? 'is-invalid' : ''}`}
                required
              />
              {fieldErrors.stock && (
                <div className="error-feedback">
                  <AlertCircle size={14} />
                  <span>{fieldErrors.stock}</span>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`form-select ${fieldErrors.category ? 'is-invalid' : ''}`}
            >
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Accessories">Accessories</option>
              <option value="General">General</option>
            </select>
            {fieldErrors.category && (
              <div className="error-feedback">
                <AlertCircle size={14} />
                <span>{fieldErrors.category}</span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Product Image URL (Optional)</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className={`form-input ${fieldErrors.imageUrl ? 'is-invalid' : ''}`}
            />
            {fieldErrors.imageUrl && (
              <div className="error-feedback">
                <AlertCircle size={14} />
                <span>{fieldErrors.imageUrl}</span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a clear description of the product features..."
              className={`form-textarea ${fieldErrors.description ? 'is-invalid' : ''}`}
              required
            />
            {fieldErrors.description && (
              <div className="error-feedback">
                <AlertCircle size={14} />
                <span>{fieldErrors.description}</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
