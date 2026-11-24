import React from 'react';
import { PageRoute } from '../types';
import { ThrusterSimulator } from '../components/engineering/ThrusterSimulator';
import { PowerArchitecture } from '../components/engineering/PowerArchitecture';
import { Zap, ShieldCheck, Activity, Layers, Disc, ArrowRight } from 'lucide-react';
import tritonConfig from '../config/tritonConfig';

interface EngineeringPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const EngineeringPage: React.FC<EngineeringPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-ocean-gold uppercase tracking-widest">
          PHYSICAL &amp; PROPULSION ARCHITECTURE
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-white">
          ENGINEERING ARCHITECTURE
        </h1>
        <p className="text-sm text-ocean-ice/80">
          8 Thrusters, 6 Degrees of Freedom, High-Current Power Bus, and Precision Pressure Hull Design
        </p>
      </div>

      {/* Section A: Propulsion System with Interactive Top-View Simulator */}
      <section className="space-y-6">
        <div className="border-b border-ocean-blue/30 pb-3">
          <span className="text-xs font-bold text-ocean-cyan uppercase tracking-wider">
            SECTION A
          </span>
          <h2 className="text-2xl font-heading font-bold text-white mt-0.5">
            Propulsion System (8 Thrusters · 6-DOF)
          </h2>
        </div>

        <ThrusterSimulator />

        {/* Degrees of Freedom Detailed Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="card-glass p-5 rounded-xl border border-ocean-cyan/30 space-y-3">
            <h4 className="text-sm font-bold text-ocean-cyan flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-ocean-cyan"></span>
              <span>Horizontal 3-DOF Control (4 Vectored Thrusters at 45°)</span>
            </h4>
            <div className="space-y-2 text-xs text-white/80">
              {tritonConfig.propulsion.dofBreakdown.horizontal.map((item: any, idx: number) => (
                <div key={idx} className="bg-ocean-deep/60 p-3 rounded-lg border border-white/5">
                  <span className="font-bold text-white block mb-0.5">{item.name}</span>
                  <p className="text-white/60 mb-1">{item.motion}</p>
                  <span className="text-[11px] font-mono text-ocean-cyan">Allocation: {item.thrusters}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-glass p-5 rounded-xl border border-ocean-gold/30 space-y-3">
            <h4 className="text-sm font-bold text-ocean-gold flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-ocean-gold"></span>
              <span>Vertical 3-DOF Control (4 Fixed Vertical Thrusters)</span>
            </h4>
            <div className="space-y-2 text-xs text-white/80">
              {tritonConfig.propulsion.dofBreakdown.vertical.map((item: any, idx: number) => (
                <div key={idx} className="bg-ocean-deep/60 p-3 rounded-lg border border-white/5">
                  <span className="font-bold text-white block mb-0.5">{item.name}</span>
                  <p className="text-white/60 mb-1">{item.motion}</p>
                  <span className="text-[11px] font-mono text-ocean-gold">Allocation: {item.thrusters}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section B: Power System Architecture */}
      <section className="space-y-6">
        <div className="border-b border-ocean-blue/30 pb-3">
          <span className="text-xs font-bold text-ocean-gold uppercase tracking-wider">
            SECTION B &amp; C
          </span>
          <h2 className="text-2xl font-heading font-bold text-white mt-0.5">
            Power System &amp; Safety Failsafes
          </h2>
        </div>

        <PowerArchitecture />
      </section>

      {/* Section D: Hull & Sealing */}
      <section className="space-y-6">
        <div className="border-b border-ocean-blue/30 pb-3">
          <span className="text-xs font-bold text-ocean-aqua uppercase tracking-wider">
            SECTION D
          </span>
          <h2 className="text-2xl font-heading font-bold text-white mt-0.5">
            Hull &amp; Sealing Mechanics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-glass p-5 rounded-xl border border-ocean-blue/30 space-y-2">
            <span className="text-xs font-bold text-ocean-cyan block uppercase">
              Transparent Pressure Hull
            </span>
            <div className="text-lg font-heading font-bold text-white">
              Optical Acrylic Cylinder
            </div>
            <p className="text-xs text-white/70">
              Outer Diameter: 114.30 mm (R57.15 mm), Length: 443.22 mm. Provides full internal visibility and optical camera clarity.
            </p>
          </div>

          <div className="card-glass p-5 rounded-xl border border-ocean-blue/30 space-y-2">
            <span className="text-xs font-bold text-ocean-gold block uppercase">
              O-Ring Sealing
            </span>
            <div className="text-lg font-heading font-bold text-white">
              Dual Radial &amp; Face Seals
            </div>
            <p className="text-xs text-white/70">
              Precision machined Buna-N / Nitrile O-rings seated in CNC aluminum flange grooves preventing any water ingress.
            </p>
          </div>

          <div className="card-glass p-5 rounded-xl border border-ocean-blue/30 space-y-2">
            <span className="text-xs font-bold text-ocean-aqua block uppercase">
              Marine Penetrators
            </span>
            <div className="text-lg font-heading font-bold text-white">
              Epoxy Potted Marine Cable
            </div>
            <p className="text-xs text-white/70">
              Individual waterproof penetrators routed through rear end cap for thruster power, ESC signals, and external sensors.
            </p>
          </div>

          <div className="card-glass p-5 rounded-xl border border-ocean-blue/30 space-y-2">
            <span className="text-xs font-bold text-purple-400 block uppercase">
              Removable End Cap
            </span>
            <div className="text-lg font-heading font-bold text-white">
              Circular Bolt Pattern
            </div>
            <p className="text-xs text-white/70">
              Rapid access end cap allows fast battery replacement, telemetry diagnostics, and internal bench servicing.
            </p>
          </div>
        </div>

        {/* Link to CAD viewer */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => onNavigate('cad-design')}
            className="px-6 py-3 rounded-xl bg-ocean-cyan text-ocean-deep font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all flex items-center space-x-2"
          >
            <span>View 3D CAD Hull &amp; Frame Assembly</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
