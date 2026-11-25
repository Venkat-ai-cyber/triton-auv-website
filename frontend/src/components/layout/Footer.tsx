import React from 'react';
import { PageRoute } from '../../types';
import { Anchor, Phone, MessageSquare, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#172832] border-t border-[#087F83]/30 text-[#F5F8F8] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Identity Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#087F83] to-[#14A9A0] flex items-center justify-center text-white shadow-md">
                <Anchor className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-heading font-bold text-2xl tracking-wider text-white">
                  TRITON
                </span>
                <p className="text-[10px] font-mono font-semibold text-[#66D4CF] tracking-widest uppercase">
                  Autonomous Underwater Vehicle
                </p>
              </div>
            </div>
            
            <p className="text-xs font-heading font-semibold text-[#EDF3F4] leading-relaxed">
              BUILT FOR THE OCEAN. ENGINEERED FOR IMPACT.
            </p>
            <p className="text-xs text-[#B9C7CC] leading-relaxed">
              Developed by Team Triton. Integrating 6-DOF holonomic propulsion, embedded dual-tier control, and edge-AI subsea vision.
            </p>

            <div className="pt-2 text-[11px] text-[#D98B73] font-mono flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-[#D98B73]" />
              <span>OFFLINE-FIRST ARCHITECTURE · LOCAL CSV DATABASE</span>
            </div>
          </div>

          {/* Engineering Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#66D4CF] border-b border-white/10 pb-2">
              Engineering Architecture
            </h4>
            <ul className="space-y-2 text-xs text-[#B9C7CC]">
              <li>
                <button onClick={() => onNavigate('engineering')} className="hover:text-[#66D4CF] transition-colors">
                  • 8-Thruster 6-DOF Propulsion
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('control')} className="hover:text-[#66D4CF] transition-colors">
                  • Pixhawk 2.4.8 &amp; ArduSub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sensors')} className="hover:text-[#66D4CF] transition-colors">
                  • ICM-20948, Bar30 &amp; RM3100
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('vision-ai')} className="hover:text-[#66D4CF] transition-colors">
                  • YOLOv11 Edge Vision Pipeline
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cad-design')} className="hover:text-[#66D4CF] transition-colors">
                  • Authentic ER.STEP 3D CAD &amp; 2D PDF
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('missions')} className="hover:text-[#66D4CF] transition-colors">
                  • Subsea Mission Capabilities
                </button>
              </li>
            </ul>
          </div>

          {/* Partnership & Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D98B73] border-b border-white/10 pb-2">
              Partnership &amp; Portal
            </h4>
            <ul className="space-y-2 text-xs text-[#B9C7CC]">
              <li>
                <button onClick={() => onNavigate('sponsorship')} className="hover:text-[#D98B73] transition-colors font-medium">
                  • Sponsorship Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#66D4CF] transition-colors">
                  • About Team Triton
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-[#66D4CF] transition-colors">
                  • High-Res CAD &amp; Asset Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('register')} className="hover:text-[#66D4CF] transition-colors">
                  • Partner Registration
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('login')} className="hover:text-[#66D4CF] transition-colors">
                  • Partner Portal Login
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-[#66D4CF] transition-colors">
                  • Partner Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#14A9A0] border-b border-white/10 pb-2">
              Direct Contact
            </h4>
            <div className="bg-[#163C4B]/70 p-4 rounded-xl border border-[#66D4CF]/25 space-y-2.5">
              <div className="text-xs font-heading font-bold text-white tracking-wider">
                CONTACT: <span className="text-[#66D4CF]">ASHOK</span>
              </div>
              <div className="text-xs text-[#B9C7CC]">
                Team Triton · Autonomous Underwater Vehicle
              </div>
              
              <div className="pt-1 flex flex-col space-y-2">
                <a 
                  href="tel:+919884469962" 
                  className="flex items-center space-x-2 text-xs font-mono font-bold text-[#66D4CF] hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 98844 69962</span>
                </a>
                
                <a 
                  href="https://wa.me/919884469962" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Brand Bar */}
        <div className="pt-8 border-t border-white/10 text-center space-y-1.5">
          <p className="text-xs font-heading font-bold text-white tracking-widest">
            TRITON – AUTONOMOUS UNDERWATER VEHICLE
          </p>
          <p className="text-xs font-mono font-medium text-[#66D4CF] tracking-wider">
            TEAM TRITON
          </p>
          <p className="text-xs text-[#D98B73] tracking-widest font-semibold">
            BUILT FOR THE OCEAN. ENGINEERED FOR IMPACT.
          </p>
          <p className="text-xs font-mono text-[#B9C7CC] pt-1">
            ASHOK – +91 98844 69962
          </p>
          <p className="text-[10px] text-white/40 pt-3">
            © {new Date().getFullYear()} Team Triton. All engineering rights and CAD specifications reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
