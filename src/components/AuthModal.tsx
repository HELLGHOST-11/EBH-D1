import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User } from '../types';
import { X, UserCheck, Shield, KeyRound, Mail, UserPlus, Sparkles, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  // Login Form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAge, setRegAge] = useState('');
  const [regBloodType, setRegBloodType] = useState('A+');
  const [regGender, setRegGender] = useState('Female');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleQuickDemo = (role: 'patient' | 'admin') => {
    if (role === 'patient') {
      setLoginEmail('patient@eximbankhospital.com');
      setLoginPassword('patient123');
    } else {
      setLoginEmail('admin@eximbankhospital.com');
      setLoginPassword('admin123');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed.');

      onLoginSuccess(data.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regPassword,
          phone: regPhone,
          age: regAge,
          gender: regGender,
          bloodType: regBloodType
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed.');

      onLoginSuccess(data.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Could not create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#263238]/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-md w-full border border-[#087443]/20 shadow-2xl p-6 sm:p-8 relative overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#263238]/60 hover:text-[#263238] bg-[#F5FAF8] rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tabs */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 bg-[#087443]/10 text-[#087443] rounded-2xl mx-auto flex items-center justify-center">
            {mode === 'login' ? <UserCheck className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
          </div>
          <h3 className="text-xl font-bold text-[#263238]">
            {mode === 'login' ? 'Patient Portal Login' : 'Create Patient Account'}
          </h3>
          <p className="text-xs text-[#263238]/70">
            {mode === 'login'
              ? 'Access electronic medical records, lab reports & prescriptions'
              : 'Register for instant EHR digital medical records access'}
          </p>

          <div className="flex bg-[#F5FAF8] p-1 rounded-xl border border-[#087443]/10 mt-3">
            <button
              onClick={() => { setMode('login'); setError(null); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'login' ? 'bg-[#087443] text-white shadow-sm' : 'text-[#263238]/70'
              }`}
            >
              Patient Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setError(null); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'register' ? 'bg-[#087443] text-white shadow-sm' : 'text-[#263238]/70'
              }`}
            >
              New Registration
            </button>
          </div>
        </div>

        {/* Quick Demo Pre-fill Bar */}
        {mode === 'login' && (
          <div className="mb-4 p-3 bg-[#F5FAF8] rounded-2xl border border-[#087443]/15 space-y-2">
            <p className="text-[10px] font-bold text-[#087443] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#21A366]" />
              Quick Demo Accounts
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('patient')}
                className="px-2.5 py-1.5 text-[11px] font-semibold bg-white border border-[#087443]/20 hover:border-[#087443] text-[#263238] rounded-xl text-left"
              >
                <span className="block font-bold text-[#087443]">Demo Patient</span>
                <span className="text-[9px] text-[#263238]/60">Sarah Jenkins (Records)</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="px-2.5 py-1.5 text-[11px] font-semibold bg-white border border-[#087443]/20 hover:border-[#087443] text-[#263238] rounded-xl text-left"
              >
                <span className="block font-bold text-[#263238]">Demo Admin</span>
                <span className="text-[9px] text-[#263238]/60">Dr. Arthur Vance</span>
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#263238] mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#087443] absolute left-3 top-3" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="patient@eximbankhospital.com"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-[#F5FAF8] border border-[#087443]/20 rounded-xl focus:outline-none focus:border-[#087443]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#263238] mb-1">Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#087443] absolute left-3 top-3" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-[#F5FAF8] border border-[#087443]/20 rounded-xl focus:outline-none focus:border-[#087443]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#087443] hover:bg-[#065b34] rounded-xl shadow-md shadow-[#087443]/20 transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Signing In...' : 'Sign In To Patient Portal'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#263238] mb-1">Full Legal Name</label>
              <input
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                required
                className="w-full px-3.5 py-2 text-xs bg-[#F5FAF8] border border-[#087443]/20 rounded-xl focus:outline-none focus:border-[#087443]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#263238] mb-1">Email</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="sarah@example.com"
                  required
                  className="w-full px-3.5 py-2 text-xs bg-[#F5FAF8] border border-[#087443]/20 rounded-xl focus:outline-none focus:border-[#087443]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#263238] mb-1">Password</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 py-2 text-xs bg-[#F5FAF8] border border-[#087443]/20 rounded-xl focus:outline-none focus:border-[#087443]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-[#263238] mb-1">Phone</label>
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+1 555..."
                  className="w-full px-2.5 py-2 text-xs bg-[#F5FAF8] border border-[#087443]/20 rounded-xl focus:outline-none focus:border-[#087443]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#263238] mb-1">Age</label>
                <input
                  type="number"
                  value={regAge}
                  onChange={(e) => setRegAge(e.target.value)}
                  placeholder="34"
                  className="w-full px-2.5 py-2 text-xs bg-[#F5FAF8] border border-[#087443]/20 rounded-xl focus:outline-none focus:border-[#087443]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#263238] mb-1">Blood Type</label>
                <select
                  value={regBloodType}
                  onChange={(e) => setRegBloodType(e.target.value)}
                  className="w-full px-2 py-2 text-xs bg-[#F5FAF8] border border-[#087443]/20 rounded-xl focus:outline-none focus:border-[#087443]"
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#087443] hover:bg-[#065b34] rounded-xl shadow-md shadow-[#087443]/20 transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Creating Account...' : 'Complete Patient Registration'}
            </button>
          </form>
        )}

      </motion.div>
    </div>
  );
};
