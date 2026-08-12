import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Eye, EyeOff, Mail, Lock, Zap, Star, Moon, Sun } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { login, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
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
    <div className="min-h-screen flex transition-colors duration-300 relative">
      
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme} 
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-bg-card border border-border-subtle shadow-md hover:scale-105 transition-transform"
        aria-label="Toggle Theme"
      >
        {isDark ? <Sun size={20} className="text-volt" /> : <Moon size={20} className="text-volt" />}
      </button>

      {/* Left Pane - Branding */}
      <div className="hidden lg:flex flex-col w-1/2 p-12 relative overflow-hidden justify-between border-r border-border-subtle bg-bg-main">
        
        {/* Dynamic Background Element */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-volt/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-volt/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* Branding Logo */}
        <div className="flex items-center gap-2 z-10">
          <div className="w-10 h-10 bg-volt rounded-full flex items-center justify-center shadow-lg shadow-volt/20">
            <Zap size={20} className="text-ink fill-ink" />
          </div>
          <h1 className="font-heading font-bold text-2xl text-text-main">SkyMart</h1>
        </div>
        
        {/* Value Proposition */}
        <div className="z-10 max-w-lg mt-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-bg-card border border-border-subtle text-volt text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            Welcome Back
          </div>
          <h2 className="font-heading font-extrabold text-5xl md:text-7xl text-text-main mb-2 leading-[1.1]">
            Shop the future.
          </h2>
          <h2 className="font-heading font-extrabold text-5xl md:text-7xl text-volt mb-6 leading-[1.1] drop-shadow-sm">
            Today.
          </h2>
          <p className="text-text-muted text-lg leading-relaxed max-w-md font-medium">
            Thousands of products, lightning-fast delivery, and prices that make your wallet happy.
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex gap-4 mt-auto pt-10 z-10">
          <div className="flex-1 bg-bg-card/50 backdrop-blur-md border border-border-subtle rounded-2xl p-5 flex flex-col items-center justify-center hover:bg-bg-card transition-colors duration-300">
            <h3 className="text-text-main font-heading font-bold text-2xl mb-1">20K+</h3>
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Products</p>
          </div>
          <div className="flex-1 bg-bg-card/50 backdrop-blur-md border border-border-subtle rounded-2xl p-5 flex flex-col items-center justify-center hover:bg-bg-card transition-colors duration-300">
            <h3 className="text-text-main font-heading font-bold text-2xl mb-1">50K+</h3>
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Users</p>
          </div>
          <div className="flex-1 bg-bg-card/50 backdrop-blur-md border border-border-subtle rounded-2xl p-5 flex flex-col items-center justify-center hover:bg-bg-card transition-colors duration-300">
            <h3 className="text-text-main font-heading font-bold text-2xl mb-1 flex items-center gap-1">
              4.9 <Star size={20} className="fill-volt text-volt" />
            </h3>
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Rating</p>
          </div>
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-bg-panel relative overflow-hidden">
        
        {/* Subtle decorative blob for the right pane */}
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-volt/5 rounded-full blur-[100px] pointer-events-none lg:hidden"></div>

        <div className="w-full max-w-md animate-scale-in auth-card relative z-10">
          
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-8 lg:hidden">
              <div className="w-10 h-10 bg-volt rounded-full flex items-center justify-center shadow-lg shadow-volt/20">
                <Zap size={20} className="text-ink fill-ink" />
              </div>
              <h1 className="font-heading font-bold text-2xl text-text-main">SkyMart</h1>
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-text-main mb-2">Sign in</h2>
            <p className="text-text-muted text-sm md:text-base">Enter your credentials to continue</p>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 text-sm px-4 py-3 rounded-xl mb-6 font-body text-center shadow-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative flex items-center">
              <Mail size={18} className="absolute left-4 text-text-muted" />
              <input 
                type="email" 
                className="field pl-12 h-14" 
                placeholder="Email address"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="relative flex items-center">
              <Lock size={18} className="absolute left-4 text-text-muted" />
              <input 
                type={showPassword ? "text" : "password"} 
                className="field pl-12 pr-12 h-14" 
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="absolute right-4 bg-transparent text-text-muted flex items-center justify-center hover:text-text-main transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex justify-end mt-[-8px]">
              <a href="#" className="text-xs text-text-muted hover:text-text-main transition-colors hover:underline">Forgot password?</a>
            </div>
            
            <button type="submit" className="btn-volt w-full flex items-center justify-center gap-2 py-4 mt-2 text-base font-heading font-bold shadow-lg shadow-volt/20 hover:shadow-volt/40">
              Sign in <span className="ml-1 text-lg">→</span>
            </button>
          </form>
          
          <div className="text-center text-text-muted text-sm pt-8 mt-8 border-t border-border-subtle">
            <p>Don't have an account? <Link to="/register" className="text-text-main font-bold hover:text-volt transition-colors">Create one</Link></p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
