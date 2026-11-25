import React, { useEffect, useState } from 'react';
import { PageRoute } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Building, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  LogOut, 
  Box, 
  Cpu, 
  Eye, 
  Award, 
  FileText,
  Activity,
  CheckCircle2
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { user, authenticated, loading, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    if (!loading && !authenticated) {
      onNavigate('login');
      return;
    }

    // Fetch dashboard stats from backend
    fetch('/api/dashboard/overview', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDashboardData(data.stats);
        }
      })
      .catch(() => {});
  }, [authenticated, loading]);

  if (loading || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-ocean-blue border-t-ocean-cyan rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xs text-[#163C4B]/75">Loading authenticated session data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* User Welcome Banner */}
      <div className="card-glass rounded-3xl p-6 sm:p-8 border border-[#087F83]/40 bg-gradient-to-r from-[#172832] via-[#163C4B] to-[#0E2833] shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ocean-cyan to-ocean-blue flex items-center justify-center text-ocean-deep font-heading font-black text-2xl shadow-lg">
            {user.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#172832]">
                {user.name}
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-ocean-cyan text-ocean-deep">
                VERIFIED PARTNER
              </span>
            </div>
            <p className="text-xs text-[#087F83] flex items-center space-x-1.5">
              <Building className="w-3.5 h-3.5" />
              <span>{user.companyName}</span>
              <span className="text-[#163C4B]/45">·</span>
              <Mail className="w-3.5 h-3.5" />
              <span>{user.email}</span>
            </p>
            <p className="text-[11px] text-[#163C4B]/65 flex items-center space-x-1 pt-1">
              <Calendar className="w-3.5 h-3.5 text-[#D98B73]" />
              <span>Registered on: {new Date(user.createdAt).toLocaleDateString()} at {new Date(user.createdAt).toLocaleTimeString()}</span>
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-colors self-end md:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Account & Technical Access Ledger */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-glass p-5 rounded-2xl border border-[#B9C7CC]/70 space-y-1">
          <span className="text-[10px] text-[#087F83] uppercase font-bold tracking-wider">Account Role</span>
          <div className="text-xl font-heading font-bold text-[#172832] capitalize">{user.role} Partner</div>
          <p className="text-[11px] text-[#163C4B]/65">Full access to technical assets &amp; CAD</p>
        </div>

        <div className="card-glass p-5 rounded-2xl border border-[#B9C7CC]/70 space-y-1">
          <span className="text-[10px] text-[#D98B73] uppercase font-bold tracking-wider">Database Persistence</span>
          <div className="text-xl font-heading font-bold text-[#172832]">Local users.csv</div>
          <p className="text-[11px] text-[#163C4B]/65">Bcrypt hashed &amp; injection protected</p>
        </div>

        <div className="card-glass p-5 rounded-2xl border border-[#B9C7CC]/70 space-y-1">
          <span className="text-[10px] text-[#087F83] uppercase font-bold tracking-wider">Organization</span>
          <div className="text-xl font-heading font-bold text-[#172832]">Team Triton</div>
          <p className="text-[11px] text-[#163C4B]/65">Autonomous Robotics Operations</p>
        </div>

        <div className="card-glass p-5 rounded-2xl border border-[#B9C7CC]/70 space-y-1">
          <span className="text-[10px] text-green-400 uppercase font-bold tracking-wider">Session Security</span>
          <div className="text-xl font-heading font-bold text-[#172832]">HTTP-Only Cookie</div>
          <p className="text-[11px] text-[#163C4B]/65">7-Day persistent local session</p>
        </div>
      </div>

      {/* Quick Access to Technical Modules */}
      <div className="space-y-4">
        <h3 className="text-xl font-heading font-bold text-[#172832]">
          Technical Documentation &amp; CAD Vault Access
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            onClick={() => onNavigate('cad-design')}
            className="card-glass p-6 rounded-2xl border border-[#B9C7CC]/80 hover:border-ocean-cyan cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center space-x-2 text-[#087F83] font-bold text-sm">
              <Box className="w-5 h-5 text-[#087F83] group-hover:scale-110 transition-transform" />
              <span>3D CAD &amp; Engineering PDF</span>
            </div>
            <p className="text-xs text-[#163C4B]/85">
              Interactive 360° vehicle model with component isolation and downloadable 2D blueprint.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('vision-ai')}
            className="card-glass p-6 rounded-2xl border border-[#B9C7CC]/80 hover:border-ocean-cyan cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center space-x-2 text-[#087F83] font-bold text-sm">
              <Eye className="w-5 h-5 text-[#087F83] group-hover:scale-110 transition-transform" />
              <span>YOLOv11 Vision Benchmark</span>
            </div>
            <p className="text-xs text-[#163C4B]/85">
              Interactive gate detection demo, CLAHE filter simulation, and Jetson Orin Nano pipeline.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('sponsorship')}
            className="card-glass p-6 rounded-2xl border border-ocean-gold/40 hover:border-ocean-gold cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center space-x-2 text-[#D98B73] font-bold text-sm">
              <Award className="w-5 h-5 text-[#D98B73] group-hover:scale-110 transition-transform" />
              <span>Sponsorship Engagement</span>
            </div>
            <p className="text-xs text-[#163C4B]/85">
              Direct pathways for hardware, fabrication, and research collaboration with Team Triton.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};