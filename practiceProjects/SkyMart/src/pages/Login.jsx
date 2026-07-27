import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, ShoppingBag } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    const result = login(email, password);
    if (result.success) {
      navigate('/home');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex">
      
      {/* Left Pane - Branding (hidden on mobile, flex on lg) */}
      <div className="hidden lg:flex flex-col w-1/2 bg-[#111] border-r border-white/8 p-12 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-volt/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-volt/5 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Branding Logo */}
        <div className="flex items-center gap-3 mb-auto">
          <div className="w-10 h-10 bg-volt rounded-2xl flex items-center justify-center">
            <ShoppingBag size={20} className="text-ink" />
          </div>
          <h1 className="font-heading font-bold text-2xl text-white">Sky Mart</h1>
        </div>
        
        {/* Value Proposition */}
        <div className="mt-auto z-10">
          <div className="bg-white/4 border border-white/8 rounded-3xl p-8 backdrop-blur-sm max-w-md">
            <h2 className="font-heading font-bold text-3xl text-white mb-4">Discover the best products online</h2>
            <p className="text-white/60 leading-relaxed">
              Shop from thousands of items across multiple categories with guaranteed fast delivery and secure payments.
            </p>
          </div>
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-scale-in auth-card">
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-volt rounded-xl flex items-center justify-center mx-auto mb-6 lg:hidden">
              <ShoppingBag size={24} className="text-ink" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-white mb-2">Sign in</h2>
            <p className="text-white/50 text-sm">Enter your credentials to continue</p>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6 font-body text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <input 
                type="email" 
                className="field" 
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="relative flex items-center">
              <input 
                type={showPassword ? "text" : "password"} 
                className="field pr-12" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="absolute right-4 bg-transparent text-white/40 flex items-center justify-center hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <button type="submit" className="btn-volt w-full flex items-center justify-center gap-2 py-3.5 mt-2 text-base font-heading font-bold">
              Sign in
            </button>
          </form>
          
          <div className="text-center text-white/50 text-sm pt-8 mt-8 border-t border-white/10">
            <p>Don't have an account? <Link to="/register" className="text-volt font-medium hover:underline transition-all">Create one</Link></p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
