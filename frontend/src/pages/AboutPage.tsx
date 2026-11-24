import React from 'react';
import { PageRoute } from '../types';
import { Anchor, ShieldCheck, Target, Award, Compass, Eye, ChevronRight, FileText } from 'lucide-react';
import tritonConfig from '../config/tritonConfig';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-ocean-gold uppercase tracking-widest">
          ORGANISATIONAL &amp; TECHNICAL IDENTITY
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-white">
          ABOUT TRITON AUV
        </h1>
        <p className="text-sm font-bold text-ocean-cyan uppercase tracking-wider">
          {tritonConfig.identity.tagline}
        </p>
      </div>

      {/* Vision Statement Banner */}
      <div className="card-glass p-8 rounded-2xl border border-ocean-cyan/40 bg-gradient-to-r from-ocean-midnight to-ocean-deep shadow-2xl relative">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold text-ocean-gold tracking-widest uppercase">
            PROJECT VISION STATEMENT
          </span>
          <p className="text-lg sm:text-2xl font-heading font-semibold text-white italic leading-relaxed">
            "{tritonConfig.identity.visionStatement}"
          </p>
          <div className="text-xs text-ocean-aqua pt-1 font-mono">
            TEAM TRITON · UNDERWATER ROBOTICS
          </div>
        </div>
      </div>

      {/* Two Column Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-5 text-sm text-white/80 leading-relaxed">
          <h2 className="text-2xl font-heading font-bold text-white">
            Engineering Philosophy &amp; Mission Focus
          </h2>
          <p>
            TRITON is an Autonomous Underwater Vehicle (AUV) engineered from the ground up by student researchers and engineers of <strong className="text-ocean-cyan">Team Triton</strong>.
          </p>
          <p>
            Designed to bridge theoretical robotics and subsea operational realities, TRITON combines an <strong className="text-ocean-gold">8-thruster holonomic propulsion array</strong> providing 6 full degrees of freedom with dual-tier compute avionics: a deterministic Pixhawk 2.4.8 flight controller running ArduSub for attitude stabilization, paired with an NVIDIA Jetson Orin Nano companion computer for real-time <strong className="text-ocean-cyan">YOLOv11 edge vision</strong>.
          </p>
          <p>
            Our core mission encompasses underwater hull inspection, submerged pipeline and cable diagnostics, large-area bathymetric survey mapping, and autonomous target grasping and debris retrieval.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-3">
            <div className="bg-ocean-midnight/60 p-3.5 rounded-xl border border-ocean-blue/30">
              <span className="font-bold text-ocean-cyan text-xs block mb-1">Organization</span>
              <span className="text-xs text-white">Team Triton</span>
            </div>
            <div className="bg-ocean-midnight/60 p-3.5 rounded-xl border border-ocean-blue/30">
              <span className="font-bold text-ocean-gold text-xs block mb-1">Audience</span>
              <span className="text-xs text-white">Investors, Marine Labs &amp; Industry</span>
            </div>
          </div>
        </div>

        {/* Project Poster Preview */}
        <div className="card-glass p-4 rounded-2xl border border-ocean-blue/40 shadow-2xl flex flex-col items-center">
          <img 
            src="/assets/images/poster/triton_project_poster.png" 
            alt="TRITON Project Poster" 
            className="w-full max-h-[500px] object-contain rounded-lg border border-white/10"
          />
          <div className="pt-3 w-full flex justify-between items-center text-xs">
            <span className="text-white/60">Official Project Poster</span>
            <button
              onClick={() => onNavigate('gallery')}
              className="text-ocean-cyan font-bold hover:underline"
            >
              Open Full Resolution Poster →
            </button>
          </div>
        </div>
      </div>

      {/* Target Audiences Grid */}
      <div className="space-y-6">
        <h3 className="text-xl font-heading font-bold text-white text-center">
          Primary Audiences &amp; Stakeholders
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tritonConfig.identity.audience.map((aud: string, idx: number) => (
            <div 
              key={idx}
              className="card-glass p-4 rounded-xl border border-ocean-blue/30 flex items-center space-x-3"
            >
              <div className="w-8 h-8 rounded-lg bg-ocean-cyan/20 border border-ocean-cyan/30 flex items-center justify-center text-ocean-cyan shrink-0">
                <ShieldCheck className="w-4 h-4 text-ocean-cyan" />
              </div>
              <span className="text-xs font-semibold text-white">{aud}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
