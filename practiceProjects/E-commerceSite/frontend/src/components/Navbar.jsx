import React from 'react';
import { ShoppingBag, PlusCircle, LogIn, LogOut, User as UserIcon, ShieldCheck } from 'lucide-react';

const Navbar = ({ user, onOpenAuth, onOpenProductModal, onOpenSecurity, onLogout }) => {
  return (
    <header className="navbar">
      <div className="brand-logo">
        <ShoppingBag className="w-8 h-8 text-indigo-500" size={28} />
        <div>
          <span>NexShop</span>
        </div>
      </div>

      <div className="nav-actions">
        <button
          onClick={onOpenSecurity}
          className="btn btn-secondary btn-sm"
          title="Security Checklist & JWT Flow Specs"
        >
          <ShieldCheck size={16} className="text-emerald-400" />
          <span>Security Specs</span>
        </button>

        {user ? (
          <>
            <button onClick={() => onOpenProductModal(null)} className="btn btn-primary btn-sm">
              <PlusCircle size={16} />
              <span>Add Product</span>
            </button>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-sm">
              <UserIcon size={16} className="text-indigo-400" />
              <span className="font-semibold text-slate-200">{user.name}</span>
            </div>

            <button onClick={onLogout} className="btn btn-danger btn-sm" title="Logout">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <button onClick={() => onOpenAuth('login')} className="btn btn-primary btn-sm">
            <LogIn size={16} />
            <span>Login / Register</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
