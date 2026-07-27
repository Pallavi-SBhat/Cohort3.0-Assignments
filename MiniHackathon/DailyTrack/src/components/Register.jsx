import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearAuthError } from '../redux/authSlice';
import { UserPlus, Mail, Lock, User, Layout, AlertCircle, ArrowLeft } from 'lucide-react';

const Register = ({ onSwitchToLogin }) => {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setLocalError('Please fill out all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match!');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }

    dispatch(registerUser({ name: name.trim(), email: email.trim(), password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slateDark relative overflow-hidden transition-colors duration-300">
      
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="glass-card w-full max-w-md rounded-3xl border border-slateBorder p-8 shadow-2xl relative z-10 animate-slide-up">
        
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brandIndigo via-brandPurple to-indigo-400" />

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brandIndigo to-brandPurple flex items-center justify-center shadow-lg shadow-indigo-500/25 text-white mx-auto mb-4">
            <Layout className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-textMain tracking-tight">
            Create Account
          </h2>
          <p className="text-xs text-textMuted mt-1">
            Join DevTrack to save your learning goals and tasks locally
          </p>
        </div>

        {(localError || authError) && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs p-3.5 rounded-xl mb-5 flex items-start gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500 mt-0.5" />
            <span>{localError || authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-500" />
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setLocalError(''); }}
              placeholder="Pallavi Bhat"
              className="w-full bg-inputBg border border-slateBorder rounded-xl px-4 py-2 text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-textMain uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-500" />
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setLocalError(''); }}
              placeholder="name@example.com"
              className="w-full bg-inputBg border border-slateBorder rounded-xl px-4 py-2 text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-textMain uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-500" />
                Password <span className="text-rose-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setLocalError(''); }}
                placeholder="••••••••"
                className="w-full bg-inputBg border border-slateBorder rounded-xl px-4 py-2 text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-textMain uppercase tracking-wider mb-1">
                Confirm Pass <span className="text-rose-500">*</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setLocalError(''); }}
                placeholder="••••••••"
                className="w-full bg-inputBg border border-slateBorder rounded-xl px-4 py-2 text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brandIndigo to-brandPurple hover:from-indigo-600 hover:to-purple-600 text-white font-bold text-sm py-3 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 active:scale-[0.99] transition-all mt-3"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Account & Sign In</span>
          </button>

        </form>

        <div className="mt-6 pt-5 border-t border-slateBorder/60 text-center">
          <p className="text-xs text-textMuted">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-indigo-500 hover:text-indigo-400 font-bold hover:underline inline-flex items-center gap-1 ml-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Sign In</span>
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
