import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, LogOut, Zap } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  const isActive = (path) => {
    return location.pathname.includes(path) ? 'text-volt font-semibold' : 'text-white/60 hover:text-white';
  };

  return (
    <header className="bg-[#0d0d0d] border-b border-white/5 sticky top-0 z-50">
      <div className="w-full max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-volt rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
            <Zap size={16} className="text-ink fill-ink" />
          </div>
          <span className="font-heading text-xl font-bold text-white tracking-tight">SkyMart</span>
        </Link>
        
        {/* Navigation */}
        <nav className="hidden md:flex gap-8">
          <Link to="/home" className={`${isActive('/home')} text-sm transition-colors`}>Home</Link>
          <Link to="/products" className={`${isActive('/products')} text-sm transition-colors`}>Shop</Link>
          <Link to="/about" className={`${isActive('/about')} text-sm transition-colors`}>About</Link>
        </nav>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full pl-1 pr-3 py-1 mr-2 hidden sm:flex">
            <div className="w-7 h-7 bg-volt text-ink rounded-full flex items-center justify-center font-bold text-xs">
              {initial}
            </div>
            <span className="font-medium text-white text-sm">{user.name}</span>
          </div>
          
          <button 
            className="relative flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-volt text-ink text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          
          <button 
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            onClick={handleLogout} 
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
