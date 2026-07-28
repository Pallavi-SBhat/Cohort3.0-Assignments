import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, Zap, Star } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { register, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const result = register(name, email, password);
    if (result.success) {
      navigate('/home');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex">
      
      {/* Left Pane - Branding */}
      <div className="hidden lg:flex flex-col w-1/2 p-12 relative overflow-hidden justify-between border-r border-white/5">
        
        {/* Branding Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-volt rounded-full flex items-center justify-center">
            <Zap size={16} className="text-ink fill-ink" />
          </div>
          <h1 className="font-heading font-bold text-xl text-white">SkyMart</h1>
        </div>
        
        {/* Value Proposition */}
        <div className="z-10 max-w-lg mt-20">
          <div className="text-volt text-xs font-bold tracking-widest uppercase mb-4">
            JOIN US
          </div>
          <h2 className="font-heading font-extrabold text-5xl md:text-6xl text-white mb-2 leading-tight">
            Start your journey.
          </h2>
          <h2 className="font-heading font-extrabold text-5xl md:text-6xl text-volt mb-6 leading-tight">
            Today.
          </h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-md">
            Create an account to track your orders, save your favorite items, and checkout faster.
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex gap-4 mt-auto pt-10">
          <div className="flex-1 bg-transparent border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center">
            <h3 className="text-volt font-heading font-bold text-xl mb-1">20K+</h3>
            <p className="text-xs text-white/50">Products</p>
          </div>
          <div className="flex-1 bg-transparent border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center">
            <h3 className="text-volt font-heading font-bold text-xl mb-1">50K+</h3>
            <p className="text-xs text-white/50">Users</p>
          </div>
          <div className="flex-1 bg-transparent border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center">
            <h3 className="text-volt font-heading font-bold text-xl mb-1 flex items-center gap-1">
              4.9 <Star size={16} className="fill-volt" />
            </h3>
            <p className="text-xs text-white/50">Rating</p>
          </div>
        </div>
      </div>

      {/* Right Pane - Register Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#0a0a0a]">
        <div className="w-full max-w-md animate-scale-in auth-card p-10 bg-[#111]">
          
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <div className="w-8 h-8 bg-volt rounded-full flex items-center justify-center">
                <Zap size={16} className="text-ink fill-ink" />
              </div>
              <h1 className="font-heading font-bold text-xl text-white">SkyMart</h1>
            </div>
            <h2 className="font-heading font-bold text-3xl text-white mb-2">Create Account</h2>
            <p className="text-white/50 text-sm">Sign up to start shopping</p>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6 font-body text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative flex items-center">
              <User size={16} className="absolute left-4 text-white/40" />
              <input 
                type="text" 
                className="field pl-11" 
                placeholder="Full Name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="relative flex items-center">
              <Mail size={16} className="absolute left-4 text-white/40" />
              <input 
                type="email" 
                className="field pl-11" 
                placeholder="Email address"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-4 text-white/40" />
              <input 
                type={showPassword ? "text" : "password"} 
                className="field pl-11 pr-12" 
                placeholder="Password (min 6 chars)"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="absolute right-4 bg-transparent text-white/40 flex items-center justify-center hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-4 text-white/40" />
              <input 
                type="password" 
                className="field pl-11" 
                placeholder="Confirm Password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            
            <button type="submit" className="btn-volt w-full flex items-center justify-center gap-2 py-3.5 mt-4 text-base font-heading font-bold">
              Create Account <span className="ml-1">→</span>
            </button>
          </form>
          
          <div className="text-center text-white/50 text-sm pt-8 mt-8 border-t border-white/10">
            <p>Already have an account? <Link to="/login" className="text-volt font-medium hover:underline transition-all">Sign in</Link></p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;
