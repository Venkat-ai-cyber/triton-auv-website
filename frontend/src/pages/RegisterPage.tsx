import React, { useState } from 'react';
import { PageRoute } from '../types';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Building, Mail, Lock, CheckCircle, ShieldCheck, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegisterPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    const res = await register(formData);
    setLoading(false);

    if (res.success) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
      onNavigate('dashboard');
    } else {
      setError(res.message || 'Registration failed.');
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="card-glass rounded-3xl p-8 border border-ocean-cyan/40 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-ocean-cyan/20 border border-ocean-cyan/40 flex items-center justify-center text-ocean-cyan mx-auto">
            <UserPlus className="w-6 h-6 text-ocean-cyan" />
          </div>
          <h1 className="text-2xl font-heading font-black text-white">
            Open Partner Registration
          </h1>
          <p className="text-xs text-ocean-ice/70">
            Open access for potential investors, marine engineers, and academic researchers. Records are securely stored in the local CSV database.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-white/80 block mb-1">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr. K. Ashok Kumar"
                className="w-full bg-ocean-deep/80 border border-ocean-blue/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-ocean-cyan focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-white/80 block mb-1">Company / Organisation Name *</label>
            <div className="relative">
              <Building className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="National Institute of Ocean Technology / Marine Co."
                className="w-full bg-ocean-deep/80 border border-ocean-blue/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-ocean-cyan focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-white/80 block mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ashok@marine-research.org"
                className="w-full bg-ocean-deep/80 border border-ocean-blue/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-ocean-cyan focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-white/80 block mb-1">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Min 8 characters"
                  className="w-full bg-ocean-deep/80 border border-ocean-blue/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-ocean-cyan focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/80 block mb-1">Confirm Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Repeat password"
                  className="w-full bg-ocean-deep/80 border border-ocean-blue/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-ocean-cyan focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="text-[11px] text-white/50 space-y-1 bg-ocean-deep/60 p-3 rounded-xl border border-white/5">
            <span className="font-bold text-ocean-cyan block">Password Requirements:</span>
            <span>• At least 8 characters in length</span><br />
            <span>• Must contain both letters and numbers</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-ocean-cyan to-ocean-aqua text-ocean-deep font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-ocean-cyan/20 hover:brightness-110 transition-all flex items-center justify-center space-x-2 mt-2"
          >
            <span>{loading ? 'RECORDING REGISTRATION...' : 'REGISTER & CREATE ACCOUNT'}</span>
          </button>
        </form>

        <div className="pt-4 border-t border-white/10 text-center space-y-2">
          <p className="text-xs text-white/60">
            Already registered?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-ocean-cyan font-bold hover:underline"
            >
              Sign In
            </button>
          </p>
          <div className="text-[10px] text-white/40 flex items-center justify-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-ocean-gold" />
            <span>CSV Formula Injection Protected · Standard User Role Assigned</span>
          </div>
        </div>
      </div>
    </div>
  );
};
