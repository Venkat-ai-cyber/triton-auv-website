import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { 
  Anchor, 
  Menu, 
  X, 
  Cpu, 
  Compass, 
  Eye, 
  Box, 
  Image, 
  Award, 
  Phone, 
  User as UserIcon, 
  LogOut,
  Sliders,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { user, authenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [techDropdownOpen, setTechDropdownOpen] = useState(false);

  const navLinks: { label: string; page: PageRoute; icon?: any }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Engineering', page: 'engineering' },
    { label: 'Technology', page: 'technology' },
    { label: 'CAD & 3D', page: 'cad-design', icon: Box },
    { label: 'Vision AI', page: 'vision-ai', icon: Eye },
    { label: 'Missions', page: 'missions', icon: Compass },
    { label: 'Gallery', page: 'gallery', icon: Image },
    { label: 'Sponsorship', page: 'sponsorship', icon: Award },
    { label: 'Contact', page: 'contact', icon: Phone }
  ];

  const subLinks: { label: string; page: PageRoute; desc: string }[] = [
    { label: 'Engineering Architecture', page: 'engineering', desc: '8-Thrusters, 6-DOF, Power, Hull' },
    { label: 'Control & Autonomy', page: 'control', desc: 'Pixhawk 2.4.8, Jetson Orin, MAVLink' },
    { label: 'Sensors & Perception', page: 'sensors', desc: 'IMU, Bar30, RM3100, Hydrophones' },
    { label: 'Vision & YOLOv11', page: 'vision-ai', desc: 'Deep learning gate & target detection' }
  ];

  const handleNav = (p: PageRoute) => {
    onNavigate(p);
    setMobileMenuOpen(false);
    setTechDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-ocean-deep/90 backdrop-blur-md border-b border-ocean-blue/30">
      {/* Top institution bar */}
      <div className="bg-ocean-midnight/80 px-4 py-1 border-b border-ocean-blue/20 text-xs text-ocean-aqua flex justify-between items-center tracking-wider">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-ocean-cyan animate-pulse"></span>
          <span className="font-semibold text-ocean-gold">TEAM TRITON</span>
          <span className="text-white/40 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-ocean-ice">UNDERWATER ROBOTICS PLATFORM</span>
        </div>
        <div className="flex items-center space-x-3 text-white/70">
          <span className="hidden md:inline text-ocean-cyan font-mono text-[11px]">AUTONOMOUS UNDERWATER VEHICLE</span>
          <span className="text-ocean-gold text-[11px] font-semibold">ASHOK: +91 98844 69962</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center space-x-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-ocean-cyan to-ocean-blue flex items-center justify-center text-ocean-deep font-bold text-xl shadow-lg shadow-ocean-cyan/20 group-hover:scale-105 transition-transform">
              <Anchor className="w-5 h-5 text-ocean-deep" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-heading font-black text-xl tracking-wider text-white group-hover:text-ocean-cyan transition-colors">
                  TRITON
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-ocean-blue/40 border border-ocean-cyan/30 text-ocean-cyan rounded">
                  AUV
                </span>
              </div>
              <p className="text-[9px] font-medium tracking-widest text-ocean-aqua uppercase">
                Autonomous Underwater Vehicle
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-0.5">
            {navLinks.map((item) => {
              const active = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNav(item.page)}
                  className={`px-2.5 py-1.5 rounded-md text-[11px] font-semibold uppercase tracking-wide transition-all duration-200 ${
                    active 
                      ? 'bg-ocean-blue/30 text-ocean-cyan border border-ocean-cyan/40 shadow-sm shadow-ocean-cyan/20' 
                      : 'text-ocean-ice/80 hover:text-white hover:bg-ocean-midnight/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Technical Sub-Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setTechDropdownOpen(!techDropdownOpen)}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-md text-[11px] font-semibold uppercase tracking-wide text-ocean-ice/80 hover:text-white hover:bg-ocean-midnight/50"
              >
                <span>Subsystems</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {techDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 card-glass rounded-lg shadow-2xl p-2 border border-ocean-cyan/30 z-50 animate-in fade-in"
                  onMouseLeave={() => setTechDropdownOpen(false)}
                >
                  {subLinks.map((sub) => (
                    <button
                      key={sub.page}
                      onClick={() => handleNav(sub.page)}
                      className="w-full text-left p-2.5 rounded-md hover:bg-ocean-blue/30 transition-colors group"
                    >
                      <div className="text-xs font-bold text-white group-hover:text-ocean-cyan">
                        {sub.label}
                      </div>
                      <div className="text-[11px] text-white/50">
                        {sub.desc}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Auth Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {authenticated && user ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleNav('dashboard')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    currentPage === 'dashboard'
                      ? 'bg-ocean-cyan text-ocean-deep border-ocean-cyan font-bold'
                      : 'bg-ocean-midnight/80 border-ocean-cyan/40 text-ocean-cyan hover:bg-ocean-blue/20'
                  }`}
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span className="max-w-[120px] truncate">{user.name}</span>
                </button>
                <button
                  onClick={logout}
                  title="Log out"
                  className="p-1.5 rounded-lg bg-ocean-midnight/80 hover:bg-red-500/20 text-white/60 hover:text-red-400 border border-white/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleNav('login')}
                  className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-ocean-ice hover:text-white transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-ocean-cyan to-ocean-aqua text-ocean-deep rounded-md shadow-md shadow-ocean-cyan/20 hover:brightness-110 transition-all"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center space-x-2">
            {authenticated && user && (
              <button
                onClick={() => handleNav('dashboard')}
                className="px-2.5 py-1 text-xs bg-ocean-blue/40 border border-ocean-cyan/40 text-ocean-cyan rounded"
              >
                {user.name.split(' ')[0]}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-ocean-ice hover:text-white hover:bg-ocean-midnight/60 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-ocean-deep/98 border-b border-ocean-blue/30 px-4 pt-2 pb-6 space-y-1 animate-in slide-in-from-top-2">
          {navLinks.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNav(item.page)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold tracking-wider ${
                currentPage === item.page 
                  ? 'bg-ocean-blue/40 text-ocean-cyan border-l-4 border-ocean-cyan' 
                  : 'text-white/80 hover:bg-ocean-midnight/50'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-2 border-t border-ocean-blue/20">
            <div className="text-[11px] font-bold text-ocean-gold px-3 py-1 uppercase tracking-wider">
              Technical Modules
            </div>
            {subLinks.map((sub) => (
              <button
                key={sub.page}
                onClick={() => handleNav(sub.page)}
                className="w-full text-left px-4 py-2 text-xs text-white/70 hover:text-ocean-cyan"
              >
                • {sub.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-ocean-blue/20 flex flex-col space-y-2">
            {authenticated && user ? (
              <>
                <button
                  onClick={() => handleNav('dashboard')}
                  className="w-full py-2.5 text-center text-sm font-bold bg-ocean-cyan text-ocean-deep rounded-md"
                >
                  Open Dashboard ({user.name})
                </button>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full py-2 text-center text-xs text-red-400 bg-red-950/30 rounded-md border border-red-500/20"
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNav('login')}
                  className="py-2 text-center text-xs font-bold uppercase tracking-wider border border-ocean-blue text-white rounded-md"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="py-2 text-center text-xs font-bold uppercase tracking-wider bg-ocean-cyan text-ocean-deep rounded-md"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
