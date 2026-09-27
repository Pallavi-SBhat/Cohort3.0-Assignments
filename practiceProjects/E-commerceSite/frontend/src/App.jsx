import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import AuthModal from './components/AuthModal';
import ProductModal from './components/ProductModal';
import ProductDetailModal from './components/ProductDetailModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import SecurityChecklistModal from './components/SecurityChecklistModal';
import Toast from './components/Toast';
import api, { getAccessToken, setAccessToken } from './services/api';
import { Search, Filter, RefreshCw, Package, Lock, Layers } from 'lucide-react';

const categories = ['All', 'Electronics', 'Furniture', 'Lifestyle', 'Accessories', 'General'];

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [detailProduct, setDetailProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);

  // Toast notification
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Fetch logged in user profile (/api/auth/me)
  const fetchUser = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await api.get('/auth/me');
      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (err) {
      console.log('Failed to fetch user profile:', err);
      setUser(null);
      setAccessToken(null);
    }
  }, []);

  // Fetch products list (/api/products)
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 8,
      });

      if (search) queryParams.append('search', search);
      if (selectedCategory && selectedCategory !== 'All') {
        queryParams.append('category', selectedCategory);
      }

      const res = await api.get(`/products?${queryParams.toString()}`);
      if (res.data.success) {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages || 1);
        setTotalProducts(res.data.totalProducts || 0);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      showToast('Failed to load products from server.', 'error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, selectedCategory]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle global auth logout event from interceptor
  useEffect(() => {
    const handleLogoutEvent = () => {
      setUser(null);
      showToast('Session expired. Please log in again.', 'error');
    };
    window.addEventListener('auth:logout', handleLogoutEvent);
    return () => window.removeEventListener('auth:logout', handleLogoutEvent);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      setAccessToken(null);
      setUser(null);
      showToast('Logged out successfully', 'info');
    } catch (err) {
      setAccessToken(null);
      setUser(null);
    }
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleOpenProductModal = (productToEdit = null) => {
    if (!user) {
      showToast('Please log in to manage products.', 'error');
      handleOpenAuth('login');
      return;
    }
    setEditingProduct(productToEdit);
    setIsProductModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        user={user}
        onOpenAuth={handleOpenAuth}
        onOpenProductModal={() => handleOpenProductModal(null)}
        onOpenSecurity={() => setIsSecurityOpen(true)}
        onLogout={handleLogout}
      />

      <main style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '2rem 1.5rem', flex: 1 }}>
        {/* Hero Section */}
        <section style={{ marginBottom: '2.5rem', textAlign: 'center', position: 'relative' }}>
          <div className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>
            <Layers size={14} /> REST API & React Frontend Assignment
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '0.75rem' }}>
            Authentication & Product <span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CRUD Platform</span>
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Build with JWT Access + Refresh Tokens, Express Validator input sanitization, MongoDB server-side revocation, and field-level error handling.
          </p>
        </section>

        {/* Filter & Search Bar */}
        <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1 1 300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search products by title or description..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="form-input"
              style={{ paddingLeft: '2.75rem' }}
            />
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Listing Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Package size={20} className="text-indigo-400" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff' }}>Products Catalog</h2>
            <span className="badge badge-emerald">{totalProducts} Items</span>
          </div>

          <button onClick={fetchProducts} className="btn btn-secondary btn-sm" title="Refresh Product List">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#94a3b8' }}>
            <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
            <p>Loading products from backend API...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem', marginTop: '1rem' }}>
            <Package size={48} style={{ color: '#64748b', margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>No Products Found</h3>
            <p style={{ color: '#94a3b8', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
              {search || selectedCategory !== 'All'
                ? 'No items match your active search or category filter criteria.'
                : 'No products exist in the database yet. Click below to add the first product!'}
            </p>
            {user ? (
              <button onClick={() => handleOpenProductModal(null)} className="btn btn-primary">
                Add Product Now
              </button>
            ) : (
              <button onClick={() => handleOpenAuth('login')} className="btn btn-primary">
                Login to Add Products
              </button>
            )}
          </div>
        ) : (
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                user={user}
                onEdit={(prod) => handleOpenProductModal(prod)}
                onDelete={(prod) => setDeletingProduct(prod)}
                onViewDetails={(prod) => setDetailProduct(prod)}
              />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem' }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="btn btn-secondary btn-sm"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`btn btn-sm ${currentPage === pg ? 'btn-primary' : 'btn-secondary'}`}
              >
                {pg}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="btn btn-secondary btn-sm"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem 2rem', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
        Sheryians Coding School Assignment — Authentication & Product CRUD APIs
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onAuthSuccess={(userData) => {
          setUser(userData);
          fetchProducts();
        }}
        showToast={showToast}
      />

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        onSaveSuccess={fetchProducts}
        showToast={showToast}
      />

      <ProductDetailModal
        isOpen={!!detailProduct}
        onClose={() => setDetailProduct(null)}
        product={detailProduct}
      />

      <DeleteConfirmModal
        isOpen={!!deletingProduct}
        onClose={() => setDeletingProduct(null)}
        product={deletingProduct}
        onDeleteSuccess={fetchProducts}
        showToast={showToast}
      />

      <SecurityChecklistModal
        isOpen={isSecurityOpen}
        onClose={() => setIsSecurityOpen(false)}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'info' })}
      />
    </div>
  );
}

export default App;
