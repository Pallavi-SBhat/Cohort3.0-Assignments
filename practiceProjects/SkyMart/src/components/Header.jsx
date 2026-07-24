import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, LogOut } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <header className="bg-bg-card border-b border-border-color sticky top-0 z-50">
      <div className="w-full max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/home" className="font-heading text-2xl font-extrabold text-text-main">
          SkyMart
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link to="/home" className="text-text-muted font-medium hover:text-primary-accent transition-colors">Home</Link>
          <Link to="/products" className="text-text-muted font-medium hover:text-primary-accent transition-colors">Shop</Link>
          <Link to="/about" className="text-text-muted font-medium hover:text-primary-accent transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-accent text-white rounded-full flex items-center justify-center font-bold text-sm">
              {initial}
            </div>
            <span className="font-medium hidden sm:block">{user.name}</span>
          </div>
          <button 
            className="relative flex items-center justify-center w-10 h-10 rounded-full text-text-main hover:bg-bg-card-hover transition-colors"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary-accent text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full translate-x-1 -translate-y-1">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className="flex items-center justify-center w-10 h-10 rounded-full text-text-muted hover:text-danger hover:bg-bg-card-hover transition-colors"
            onClick={handleLogout} 
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
