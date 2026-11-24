import React from 'react';
import { Battery, Zap, ShieldAlert, Cpu, Power, Activity } from 'lucide-react';

export const PowerArchitecture: React.FC = () => {
  return (
    <div className="card-glass rounded-2xl p-6 border border-ocean-blue/40 shadow-2xl space-y-6">
      <div className="border-b border-ocean-blue/30 pb-4">
        <h3 className="font-heading font-bold text-lg text-white flex items-center space-x-2">
          <Zap className="w-5 h-5 text-ocean-gold" />
          <span>POWER SYSTEM ARCHITECTURE &amp; REGULATION</span>
        </h3>
        <p className="text-xs text-ocean-ice/70 pt-1">
          High-current energy storage, regulated multi-rail distribution, and redundant safety cutoffs
        </p>
      </div>

      {/* Visual Power Bus Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {/* Stage 1: Energy Storage */}
        <div className="bg-[#051827] p-4 rounded-xl border border-ocean-cyan/40 relative space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-ocean-cyan/20 text-ocean-cyan">
              SOURCE
            </span>
            <Battery className="w-5 h-5 text-ocean-cyan" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">3S LiPo Battery</h4>
            <p className="text-xl font-heading font-black text-ocean-cyan mt-1">22,000 mAh</p>
            <p className="text-[11px] text-white/60">11.1V Nominal (12.6V Peak)</p>
          </div>
          <div className="text-[10px] text-ocean-ice/70 border-t border-white/10 pt-2">
            Mission endurance: &gt; 20 minutes under sustained 6-DOF load.
          </div>
        </div>

        {/* Stage 2: Distribution & Isolation */}
        <div className="bg-[#051827] p-4 rounded-xl border border-ocean-gold/40 relative space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-ocean-gold/20 text-ocean-gold">
              SAFETY BUS
            </span>
            <Power className="w-5 h-5 text-ocean-gold" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">PDB &amp; Kill Switch</h4>
            <p className="text-xl font-heading font-black text-ocean-gold mt-1">200A Busbar</p>
            <p className="text-[11px] text-white/60">Hardware Magnetic Kill Switch</p>
          </div>
          <div className="text-[10px] text-ocean-ice/70 border-t border-white/10 pt-2">
            Fused main line with instantaneous manual external isolation.
          </div>
        </div>

        {/* Stage 3: High-Power Propulsion Rail */}
        <div className="bg-[#051827] p-4 rounded-xl border border-ocean-blue/40 relative space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-ocean-blue/30 text-ocean-aqua">
              PROPULSION
            </span>
            <Activity className="w-5 h-5 text-ocean-aqua" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">8 × 30A ESCs</h4>
            <p className="text-xl font-heading font-black text-ocean-aqua mt-1">240A Total</p>
            <p className="text-[11px] text-white/60">Direct 11.1V Battery Rail</p>
          </div>
          <div className="text-[10px] text-ocean-ice/70 border-t border-white/10 pt-2">
            Independently addressable PWM lines from Pixhawk autopilot.
          </div>
        </div>

        {/* Stage 4: Regulated Logic Rail */}
        <div className="bg-[#051827] p-4 rounded-xl border border-purple-500/40 relative space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">
              LOGIC &amp; AI
            </span>
            <Cpu className="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">UBEC / DC-DC</h4>
            <p className="text-xl font-heading font-black text-purple-300 mt-1">5V &amp; 12V Rails</p>
            <p className="text-[11px] text-white/60">Jetson Orin + Pixhawk + Sensors</p>
          </div>
          <div className="text-[10px] text-ocean-ice/70 border-t border-white/10 pt-2">
            Low-ripple filtered power for edge AI vision and depth telemetry.
          </div>
        </div>
      </div>

      {/* Safety & Reliability Grid */}
      <div className="bg-ocean-midnight/50 p-5 rounded-xl border border-ocean-blue/30 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-ocean-gold flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-ocean-gold" />
          <span>FAILSAFE &amp; RELIABILITY PROTOCOLS</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-white/80">
          <div className="bg-ocean-deep/60 p-3 rounded-lg border border-white/5">
            <span className="font-bold text-ocean-cyan block mb-1">Hardware Kill Switch</span>
            External magnetic key disconnects main battery rail in milliseconds for diver and bench safety.
          </div>

          <div className="bg-ocean-deep/60 p-3 rounded-lg border border-white/5">
            <span className="font-bold text-ocean-cyan block mb-1">Leak-Triggered Failsafe</span>
            Conductivity probe triggers emergency motor shutdown and positive buoyancy ascent upon water detection.
          </div>

          <div className="bg-ocean-deep/60 p-3 rounded-lg border border-white/5">
            <span className="font-bold text-ocean-cyan block mb-1">Low Battery Voltage Cutoff</span>
            Dual-stage voltage alarms trigger automated return-to-surface at 10.5V cell depletion threshold.
          </div>

          <div className="bg-ocean-deep/60 p-3 rounded-lg border border-white/5">
            <span className="font-bold text-ocean-gold block mb-1">EKF Failure Protection</span>
            Divergent state estimation defaults immediately to attitude hold and thruster de-allocation.
          </div>

          <div className="bg-ocean-deep/60 p-3 rounded-lg border border-white/5">
            <span className="font-bold text-ocean-gold block mb-1">Positive Buoyancy</span>
            Inherent slight positive buoyancy guarantees passive surface floating if complete power loss occurs.
          </div>

          <div className="bg-ocean-deep/60 p-3 rounded-lg border border-white/5">
            <span className="font-bold text-ocean-gold block mb-1">Hydrodynamic Guards</span>
            Integrated rotor cowlings prevent tether entanglement and protect propellers from debris.
          </div>
        </div>
      </div>
    </div>
  );
};
