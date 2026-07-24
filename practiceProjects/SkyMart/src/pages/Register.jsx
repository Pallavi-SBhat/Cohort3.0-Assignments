import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center p-8 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.1)_0%,transparent_40%)] animate-fade-in">
      <div className="card w-full max-w-[420px] p-10">
        <div className="text-center mb-8">
          <h1 className="text-primary-accent font-heading font-extrabold text-3xl mb-6 inline-block">Sky Mart</h1>
          <h2 className="text-2xl font-bold mb-2">Create Account</h2>
          <p className="text-text-muted">Sign up to start shopping</p>
        </div>
        
        {error && (
          <div className="bg-danger/10 text-danger p-4 rounded-lg border border-danger/20 mb-6 text-sm text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="input-group">
            <label className="input-label" htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              className="input-field" 
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="email">Email address</label>
            <input 
              type="email" 
              id="email" 
              className="input-field" 
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label className="input-label" htmlFor="password">Password</label>
            <div className="relative flex items-center">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                className="input-field pr-12" 
                placeholder="Password (min 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="absolute right-4 bg-transparent text-text-muted flex items-center justify-center hover:text-text-main"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              className="input-field" 
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="btn-primary w-full mt-4">
            Create Account
          </button>
        </form>
        
        <div className="text-center text-text-muted text-sm pt-6 border-t border-border-color">
          <p>Already have an account? <Link to="/login" className="text-primary-accent font-semibold hover:underline">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
