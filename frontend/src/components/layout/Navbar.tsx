import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { 
  Anchor, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut,
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

  const navLinks: { label: string; page: PageRoute }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Engineering', page: 'engineering' },
    { label: 'Technology', page: 'technology' },
    { label: 'CAD & 3D', page: 'cad-design' },
    { label: 'Missions', page: 'missions' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Sponsorship', page: 'sponsorship' },
    { label: 'Contact', page: 'contact' }
  ];

  const subLinks: { label: string; page: PageRoute; desc: string }[] = [
    { label: 'Engineering Architecture', page: 'engineering', desc: '8-Thrusters, 6-DOF, Power, Hull' },
    { label: 'Control & Autonomy', page: 'control', desc: 'Pixhawk 2.4.8, Jetson Orin, MAVLink' },
    { label: 'Sensors & Perception', page: 'sensors', desc: 'IMU, Bar30, RM3100, Hydrophones' },
    { label: 'AI & YOLOv11 Vision', page: 'vision-ai', desc: 'CLAHE, White Balance & Neural Vision' }
  ];

  const handleNav = (p: PageRoute) => {
    onNavigate(p);
    setMobileMenuOpen(false);
    setTechDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F5F8F8]/90 backdrop-blur-lg border-b border-[#B9C7CC]/50 shadow-sm">
      {/* Subtle Top Brand Strip */}
      <div className="bg-[#172832] text-[#F5F8F8] px-4 py-1.5 text-[11px] flex justify-between items-center tracking-wider">
        <div className="max-w-[1440px] mx-auto w-full flex justify-between items-center">
          <div className="flex items-center space-x-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#66D4CF] animate-pulse"></span>
            <span className="font-heading font-bold text-[#66D4CF] tracking-widest">TEAM TRITON</span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-[#E8F1F3]/80 font-mono text-[10px] uppercase">
              BUILT FOR THE OCEAN. ENGINEERED FOR IMPACT.
            </span>
          </div>
          <div className="flex items-center space-x-4 font-mono">
            <span className="hidden md:inline text-[#B9C7CC] text-[10px]">AUTONOMOUS UNDERWATER VEHICLE</span>
            <a href="tel:+919884469962" className="text-[#66D4CF] hover:text-white text-[11px] font-semibold transition-colors">
              ASHOK: +91 98844 69962
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center space-x-3 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#087F83] to-[#14A9A0] flex items-center justify-center text-white shadow-md shadow-[#087F83]/20 group-hover:scale-105 transition-transform">
              <Anchor className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-heading font-bold text-xl tracking-wider text-[#172832] group-hover:text-[#087F83] transition-colors">
                  TRITON
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#E8F1F3] border border-[#087F83]/30 text-[#087F83] rounded">
                  AUV
                </span>
              </div>
              <p className="text-[9px] font-mono font-semibold tracking-widest text-[#163C4B]/70 uppercase">
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
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-heading font-semibold uppercase tracking-wide transition-all duration-200 ${
                    active 
                      ? 'bg-[#087F83] text-white shadow-sm' 
                      : 'text-[#172832]/80 hover:text-[#087F83] hover:bg-[#E8F1F3]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Subsystems Dropdown */}
            <div className="relative">
              <button
                onClick={() => setTechDropdownOpen(!techDropdownOpen)}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-[11px] font-heading font-semibold uppercase tracking-wide text-[#172832]/80 hover:text-[#087F83] hover:bg-[#E8F1F3]"
              >
                <span>Subsystems</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {techDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl p-2 border border-[#B9C7CC]/60 z-50"
                  onMouseLeave={() => setTechDropdownOpen(false)}
                >
                  {subLinks.map((sub) => (
                    <button
                      key={sub.page}
                      onClick={() => handleNav(sub.page)}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-[#E8F1F3] transition-colors group"
                    >
                      <div className="text-xs font-heading font-bold text-[#172832] group-hover:text-[#087F83]">
                        {sub.label}
                      </div>
                      <div className="text-[11px] text-[#163C4B]/70">
                        {sub.desc}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Auth Action Buttons */}
          <div className="hidden lg:flex items-center space-x-2 shrink-0">
            {authenticated && user ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleNav('dashboard')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    currentPage === 'dashboard'
                      ? 'bg-[#087F83] text-white border-[#087F83] font-bold'
                      : 'bg-white border-[#B9C7CC] text-[#172832] hover:border-[#087F83]'
                  }`}
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span className="max-w-[120px] truncate">{user.name}</span>
                </button>
                <button
                  onClick={logout}
                  title="Log out"
                  className="p-1.5 rounded-lg bg-white hover:bg-red-50 text-[#172832]/60 hover:text-red-600 border border-[#B9C7CC] transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleNav('login')}
                  className="px-3 py-1.5 text-xs font-heading font-semibold uppercase tracking-wider text-[#172832] hover:text-[#087F83] transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="px-3.5 py-1.5 text-xs font-heading font-semibold uppercase tracking-wider bg-[#087F83] text-white rounded-lg shadow-sm hover:bg-[#163C4B] transition-all"
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
                className="px-2.5 py-1 text-xs bg-[#E8F1F3] border border-[#087F83]/30 text-[#087F83] font-bold rounded"
              >
                {user.name.split(' ')[0]}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#172832] hover:bg-[#E8F1F3] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#F5F8F8] border-b border-[#B9C7CC] px-4 pt-2 pb-6 space-y-1 shadow-lg">
          {navLinks.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNav(item.page)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-heading font-semibold tracking-wider ${
                currentPage === item.page 
                  ? 'bg-[#087F83] text-white' 
                  : 'text-[#172832] hover:bg-[#E8F1F3]'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-2 border-t border-[#B9C7CC]/50">
            <div className="text-[11px] font-mono font-bold text-[#087F83] px-3 py-1 uppercase tracking-wider">
              Technical Modules
            </div>
            {subLinks.map((sub) => (
              <button
                key={sub.page}
                onClick={() => handleNav(sub.page)}
                className="w-full text-left px-4 py-2 text-xs text-[#163C4B] hover:text-[#087F83]"
              >
                • {sub.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#B9C7CC]/50 flex flex-col space-y-2">
            {authenticated && user ? (
              <>
                <button
                  onClick={() => handleNav('dashboard')}
                  className="w-full py-2.5 text-center text-sm font-bold bg-[#087F83] text-white rounded-lg"
                >
                  Open Dashboard ({user.name})
                </button>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full py-2 text-center text-xs text-red-600 bg-red-50 rounded-lg border border-red-200"
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNav('login')}
                  className="py-2 text-center text-xs font-bold uppercase tracking-wider border border-[#172832] text-[#172832] rounded-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="py-2 text-center text-xs font-bold uppercase tracking-wider bg-[#087F83] text-white rounded-lg"
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
