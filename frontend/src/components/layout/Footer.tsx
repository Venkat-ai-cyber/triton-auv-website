import React from 'react';
import { PageRoute } from '../../types';
import { Anchor, Phone, MessageSquare, Shield, ExternalLink, Cpu, Compass } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#030e17] border-t border-ocean-blue/30 text-white pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Identity Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ocean-cyan to-ocean-blue flex items-center justify-center text-ocean-deep font-bold text-xl">
                <Anchor className="w-6 h-6 text-ocean-deep" />
              </div>
              <div>
                <span className="font-heading font-black text-2xl tracking-wider text-white">
                  TRITON
                </span>
                <p className="text-[10px] font-semibold text-ocean-cyan tracking-widest uppercase">
                  Autonomous Underwater Vehicle
                </p>
              </div>
            </div>
            
            <p className="text-xs text-ocean-ice/70 leading-relaxed">
              BUILT FOR THE OCEAN. ENGINEERED FOR IMPACT.
            </p>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Developed by Team Triton. Integrating 6-DOF holonomic propulsion, embedded control, and edge-AI vision.
            </p>

            <div className="pt-2 text-[11px] text-ocean-gold font-mono flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-ocean-gold" />
              <span>OFFLINE-FIRST ARCHITECTURE · LOCAL DATABASE</span>
            </div>
          </div>

          {/* Quick Technical Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-ocean-cyan border-b border-ocean-blue/30 pb-2">
              Engineering Architecture
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button onClick={() => onNavigate('engineering')} className="hover:text-ocean-cyan transition-colors">
                  • 8-Thruster 6-DOF Propulsion
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('control')} className="hover:text-ocean-cyan transition-colors">
                  • Pixhawk 2.4.8 &amp; ArduSub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sensors')} className="hover:text-ocean-cyan transition-colors">
                  • 9-DOF IMU, Bar30 &amp; Hydrophones
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('vision-ai')} className="hover:text-ocean-cyan transition-colors">
                  • YOLOv11 Edge Vision Pipeline
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cad-design')} className="hover:text-ocean-cyan transition-colors">
                  • Interactive 3D CAD &amp; Engineering 2D PDF
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('missions')} className="hover:text-ocean-cyan transition-colors">
                  • 5 Mission Profiles &amp; Operating Modes
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate & Sponsorship */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-ocean-gold border-b border-ocean-blue/30 pb-2">
              Partnership &amp; Access
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button onClick={() => onNavigate('sponsorship')} className="hover:text-ocean-gold transition-colors font-medium">
                  • Sponsorship Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-ocean-cyan transition-colors">
                  • About Team Triton
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-ocean-cyan transition-colors">
                  • High-Res Image &amp; CAD Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('register')} className="hover:text-ocean-cyan transition-colors">
                  • Partner Registration (CSV Auth)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('login')} className="hover:text-ocean-cyan transition-colors">
                  • Technical Portal Login
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-ocean-cyan transition-colors">
                  • Partner Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Primary Contact Person */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-ocean-aqua border-b border-ocean-blue/30 pb-2">
              Direct Contact
            </h4>
            <div className="card-glass p-3.5 rounded-lg border border-ocean-cyan/30 space-y-2.5">
              <div className="text-xs font-bold text-white tracking-wider">
                POINT OF CONTACT: <span className="text-ocean-cyan font-black">ASHOK</span>
              </div>
              <div className="text-xs text-white/70">
                Team Triton · Autonomous Underwater Vehicle Project
              </div>
              
              <div className="pt-1 flex flex-col space-y-2">
                <a 
                  href="tel:+919884469962" 
                  className="flex items-center space-x-2 text-xs font-bold text-ocean-cyan hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-ocean-cyan" />
                  <span>+91 98844 69962</span>
                </a>
                
                <a 
                  href="https://wa.me/919884469962" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-xs font-bold text-green-400 hover:text-green-300 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
            <p className="text-[11px] text-white/40">
              Team Triton Robotics Laboratory, Chennai, Tamil Nadu, India
            </p>
          </div>
        </div>

        {/* Mandatory Footer Requirement Text */}
        <div className="pt-8 border-t border-ocean-blue/20 text-center space-y-1.5">
          <p className="text-xs font-bold text-white tracking-widest">
            TRITON – AUTONOMOUS UNDERWATER VEHICLE
          </p>
          <p className="text-xs font-medium text-ocean-aqua tracking-wider">
            TEAM TRITON · TEAM TRITON
          </p>
          <p className="text-xs text-ocean-gold tracking-widest font-semibold">
            BUILT FOR THE OCEAN. ENGINEERED FOR IMPACT.
          </p>
          <p className="text-xs font-mono text-ocean-cyan pt-1">
            ASHOK – +91 98844 69962
          </p>
          <p className="text-[10px] text-white/30 pt-3">
            © {new Date().getFullYear()} Team Triton. All engineering rights and CAD specifications reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
