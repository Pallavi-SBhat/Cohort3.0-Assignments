import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearAuthError } from '../redux/authSlice';
import { LogIn, Mail, Lock, Layout, AlertCircle, ArrowRight } from 'lucide-react';

const Login = ({ onSwitchToRegister }) => {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    dispatch(loginUser({ email: email.trim(), password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slateDark relative overflow-hidden transition-colors duration-300">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="glass-card w-full max-w-md rounded-3xl border border-slateBorder p-8 shadow-2xl relative z-10 animate-slide-up">
        
        {/* Top Decorative Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brandIndigo via-brandPurple to-indigo-400" />

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brandIndigo to-brandPurple flex items-center justify-center shadow-lg shadow-indigo-500/25 text-white mx-auto mb-4">
            <Layout className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-textMain tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs text-textMuted mt-1">
            Sign in to access your DevTrack study and task workspace
          </p>
        </div>

        {/* Error Message */}
        {authError && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs p-3.5 rounded-xl mb-6 flex items-start gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500 mt-0.5" />
            <span>{authError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-500" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-inputBg border border-slateBorder rounded-xl px-4 py-2.5 text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-indigo-500" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-inputBg border border-slateBorder rounded-xl px-4 py-2.5 text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brandIndigo to-brandPurple hover:from-indigo-600 hover:to-purple-600 text-white font-bold text-sm py-3 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 active:scale-[0.99] transition-all mt-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Workspace</span>
          </button>

        </form>

        {/* Switch to Register */}
        <div className="mt-8 pt-5 border-t border-slateBorder/60 text-center">
          <p className="text-xs text-textMuted">
            Don't have an account yet?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-indigo-500 hover:text-indigo-400 font-bold hover:underline inline-flex items-center gap-1 ml-1"
            >
              <span>Create Account</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
