import React, { useState } from 'react';
import { PageRoute } from '../types';
import { useAuth } from '../context/AuthContext';
import { LogIn, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      onNavigate('dashboard');
    } else {
      setError(res.message || 'Login failed. Please verify your credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="card-glass rounded-3xl p-8 border border-ocean-cyan/40 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-ocean-cyan/20 border border-ocean-cyan/40 flex items-center justify-center text-ocean-cyan mx-auto">
            <LogIn className="w-6 h-6 text-ocean-cyan" />
          </div>
          <h1 className="text-2xl font-heading font-black text-white">
            Partner &amp; Sponsor Login
          </h1>
          <p className="text-xs text-ocean-ice/70">
            Access protected technical documentation, session telemetry, and the TRITON CAD repository.
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
            <label className="text-xs font-semibold text-white/80 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="partner@organisation.com"
                className="w-full bg-ocean-deep/80 border border-ocean-blue/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-ocean-cyan focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-white/80 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-ocean-deep/80 border border-ocean-blue/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-ocean-cyan focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-ocean-cyan to-ocean-aqua text-ocean-deep font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-ocean-cyan/20 hover:brightness-110 transition-all flex items-center justify-center space-x-2 mt-2"
          >
            <span>{loading ? 'AUTHENTICATING...' : 'SIGN IN TO DASHBOARD'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-white/10 text-center space-y-3">
          <p className="text-xs text-white/60">
            Don't have an account yet?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="text-ocean-cyan font-bold hover:underline"
            >
              Register here
            </button>
          </p>
          <div className="text-[10px] text-white/40 flex items-center justify-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-ocean-gold" />
            <span>Encrypted with bcrypt &amp; HTTP-only Session Cookies</span>
          </div>
        </div>
      </div>
    </div>
  );
};
