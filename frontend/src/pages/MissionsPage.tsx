import React from 'react';
import { PageRoute } from '../types';
import { Target, Compass, Anchor, ShieldCheck, CheckCircle2, Sliders, Box, ArrowRight } from 'lucide-react';
import tritonConfig from '../config/tritonConfig';

interface MissionsPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const MissionsPage: React.FC<MissionsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-[#D98B73] uppercase tracking-widest">
          OPERATIONAL PROFILES &amp; MISSION OBJECTIVES
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-[#172832]">
          MISSION CAPABILITIES
        </h1>
        <p className="text-sm text-[#163C4B]">
          5 Core Project Objectives, 3 Dedicated Operating Modes, and Autonomous Navigation Execution
        </p>
      </div>

      {/* 3 Operating Modes */}
      <section className="space-y-6">
        <div className="border-b border-[#B9C7CC]/70 pb-3">
          <span className="text-xs font-bold text-[#087F83] uppercase tracking-wider">
            OPERATIONAL MODES
          </span>
          <h2 className="text-2xl font-heading font-bold text-[#172832] mt-0.5">
            3 Dedicated Operating Modes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tritonConfig.missions.operatingModes.map((m: any, idx: number) => (
            <div 
              key={idx}
              className="card-glass rounded-2xl p-6 border border-[#087F83]/30 hover:border-ocean-cyan space-y-4 shadow-xl transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-ocean-cyan/20 text-[#087F83]">
                  {m.mode}
                </span>
                <span className="text-xs text-[#D98B73] font-bold">AUTONOMOUS</span>
              </div>

              <h3 className="text-xl font-heading font-bold text-[#172832]">
                {m.title}
              </h3>

              <p className="text-xs text-[#163C4B]/85 leading-relaxed">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 Core Mission Objectives from Poster */}
      <section className="space-y-6">
        <div className="border-b border-[#B9C7CC]/70 pb-3">
          <span className="text-xs font-bold text-[#D98B73] uppercase tracking-wider">
            PRIMARY DIRECTIVES
          </span>
          <h2 className="text-2xl font-heading font-bold text-[#172832] mt-0.5">
            5 Core Underwater Mission Objectives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tritonConfig.missions.objectives.map((obj: any, idx: number) => (
            <div 
              key={obj.id}
              className="card-glass rounded-2xl p-6 border border-[#B9C7CC]/70 space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-ocean-cyan/20 border border-[#087F83]/30 flex items-center justify-center text-[#087F83] font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-heading font-bold text-[#172832]">
                  {obj.title}
                </h3>
              </div>

              <ul className="space-y-2 text-xs text-[#163C4B] pt-2 border-t border-[#B9C7CC]/50">
                {obj.points.map((pt: string, pIdx: number) => (
                  <li key={pIdx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#087F83] shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 6 Autonomous Capabilities with Demonstrated vs Planned Status */}
      <section className="space-y-6">
        <div className="border-b border-[#B9C7CC]/70 pb-3">
          <span className="text-xs font-bold text-[#087F83] uppercase tracking-wider">
            AUTONOMOUS FLIGHT CAPABILITIES
          </span>
          <h2 className="text-2xl font-heading font-bold text-[#172832] mt-0.5">
            Autonomous Subsea Execution
          </h2>
          <p className="text-xs text-[#163C4B]/65 pt-1">
            Clearly distinguishing demonstrated testing benchmarks from planned research capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tritonConfig.missions.capabilities.map((cap: any, idx: number) => (
            <div 
              key={idx}
              className="bg-[#F5F8F8] p-5 rounded-xl border border-[#B9C7CC]/50 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-[#087F83] uppercase">{cap.category}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-ocean-blue/30 text-[#087F83]">
                    {cap.status}
                  </span>
                </div>
                <h4 className="text-base font-heading font-bold text-[#172832]">
                  {cap.name}
                </h4>
                <p className="text-xs text-[#163C4B]/85 pt-1 leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};