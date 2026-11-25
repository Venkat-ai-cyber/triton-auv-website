import React, { useState } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCw, RotateCcw, Sliders, Info } from 'lucide-react';

type DOFMode = 'idle' | 'surge_fwd' | 'surge_rev' | 'sway_port' | 'sway_stbd' | 'yaw_cw' | 'yaw_ccw' | 'heave_up' | 'heave_down' | 'roll_left' | 'roll_right' | 'pitch_up' | 'pitch_down';

export const ThrusterSimulator: React.FC = () => {
  const [dof, setDof] = useState<DOFMode>('surge_fwd');

  // Thruster states based on selected DOF
  // 8 Thrusters:
  // H1: Front-Left (45 deg)
  // H2: Front-Right (-45 deg)
  // H3: Rear-Left (135 deg)
  // H4: Rear-Right (-135 deg)
  // V1: Front-Left Vertical
  // V2: Front-Right Vertical
  // V3: Rear-Left Vertical
  // V4: Rear-Right Vertical

  const getThrusterActivity = (id: string) => {
    switch (dof) {
      case 'surge_fwd':
        return {
          H1: { active: true, dir: 'thrusting fwd-right', power: 85 },
          H2: { active: true, dir: 'thrusting fwd-left', power: 85 },
          H3: { active: true, dir: 'thrusting fwd-right', power: 85 },
          H4: { active: true, dir: 'thrusting fwd-left', power: 85 },
          V1: { active: false, power: 0 }, V2: { active: false, power: 0 },
          V3: { active: false, power: 0 }, V4: { active: false, power: 0 }
        }[id] || { active: false, power: 0 };

      case 'sway_stbd':
        return {
          H1: { active: true, dir: 'vectoring right', power: 80 },
          H2: { active: true, dir: 'vectoring right', power: -80 },
          H3: { active: true, dir: 'vectoring right', power: -80 },
          H4: { active: true, dir: 'vectoring right', power: 80 },
          V1: { active: false, power: 0 }, V2: { active: false, power: 0 },
          V3: { active: false, power: 0 }, V4: { active: false, power: 0 }
        }[id] || { active: false, power: 0 };

      case 'yaw_cw':
        return {
          H1: { active: true, dir: 'rotation torque CW', power: 90 },
          H2: { active: true, dir: 'rotation torque CW', power: -90 },
          H3: { active: true, dir: 'rotation torque CW', power: 90 },
          H4: { active: true, dir: 'rotation torque CW', power: -90 },
          V1: { active: false, power: 0 }, V2: { active: false, power: 0 },
          V3: { active: false, power: 0 }, V4: { active: false, power: 0 }
        }[id] || { active: false, power: 0 };

      case 'heave_down':
        return {
          H1: { active: false, power: 0 }, H2: { active: false, power: 0 },
          H3: { active: false, power: 0 }, H4: { active: false, power: 0 },
          V1: { active: true, dir: 'downward thrust', power: 85 },
          V2: { active: true, dir: 'downward thrust', power: 85 },
          V3: { active: true, dir: 'downward thrust', power: 85 },
          V4: { active: true, dir: 'downward thrust', power: 85 }
        }[id] || { active: false, power: 0 };

      case 'roll_left':
        return {
          H1: { active: false, power: 0 }, H2: { active: false, power: 0 },
          H3: { active: false, power: 0 }, H4: { active: false, power: 0 },
          V1: { active: true, dir: 'down thrust', power: 75 },
          V2: { active: true, dir: 'up thrust', power: -75 },
          V3: { active: true, dir: 'down thrust', power: 75 },
          V4: { active: true, dir: 'up thrust', power: -75 }
        }[id] || { active: false, power: 0 };

      case 'pitch_up':
        return {
          H1: { active: false, power: 0 }, H2: { active: false, power: 0 },
          H3: { active: false, power: 0 }, H4: { active: false, power: 0 },
          V1: { active: true, dir: 'upward trim', power: -70 },
          V2: { active: true, dir: 'upward trim', power: -70 },
          V3: { active: true, dir: 'downward trim', power: 70 },
          V4: { active: true, dir: 'downward trim', power: 70 }
        }[id] || { active: false, power: 0 };

      default:
        return { active: false, power: 0 };
    }
  };

  const getDofDescription = () => {
    switch (dof) {
      case 'surge_fwd':
        return 'SURGE (Forward Translation): All 4 horizontal corner vectored thrusters fire in forward coordination. Vector resolution yields pure longitudinal motion along X axis.';
      case 'sway_stbd':
        return 'SWAY (Starboard Lateral Translation): Front-left and rear-right push right while front-right and rear-left pull right, producing pure sideways lateral motion along Y axis.';
      case 'yaw_cw':
        return 'YAW (Clockwise Heading Rotation): Port thrusters thrust forward and Starboard thrusters thrust reverse, creating a pure torque couple around the vertical Z axis.';
      case 'heave_down':
        return 'HEAVE (Vertical Submersion): All 4 vertical fixed thrusters run at equal power to overcome positive buoyancy and precisely hold target mission depth.';
      case 'roll_left':
        return 'ROLL (Port Tilt Stabilization): Left vertical thrusters push down while right vertical thrusters push up, restoring horizontal stability in currents.';
      case 'pitch_up':
        return 'PITCH (Bow Up / Trim Incline): Front vertical thrusters pull upwards while rear vertical thrusters push downwards, enabling angled inspection of pipelines.';
      default:
        return 'Select a Degree of Freedom (DOF) control below to simulate thruster allocations.';
    }
  };

  return (
    <div className="card-glass rounded-2xl p-6 border border-[#B9C7CC]/80 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#B9C7CC]/70 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-ocean-cyan animate-pulse"></span>
            <h3 className="font-heading font-bold text-lg text-[#172832]">
              6-DOF PROPULSION &amp; THRUSTER ALLOCATION MATRIX
            </h3>
          </div>
          <p className="text-xs text-[#172832]/70 pt-1">
            Top-view schematic: 4 horizontal vectored thrusters (Electric Cyan) + 4 vertical fixed thrusters (Marine Gold)
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-4 text-xs font-semibold">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-ocean-cyan"></span>
            <span className="text-[#087F83]">Horizontal (45° Vectored)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-ocean-gold"></span>
            <span className="text-[#D98B73]">Vertical (Fixed Heave)</span>
          </div>
        </div>
      </div>

      {/* SVG Top-View Visualizer */}
      <div className="relative bg-[#04121E] rounded-xl border border-[#B9C7CC]/70 p-4 flex items-center justify-center min-h-[380px]">
        <svg viewBox="0 0 600 420" className="w-full max-w-[560px] h-auto drop-shadow-2xl">
          {/* Hull Outline (482.6 x 331 mm proportional) */}
          <rect x="130" y="70" width="340" height="280" rx="20" fill="#061B2B" stroke="#087EAB" stroke-width="2" />
          
          {/* Center Cylindrical Pressure Hull (Length 443mm, OD 114mm) */}
          <rect x="90" y="160" width="420" height="100" rx="50" fill="#092C46" fill-opacity="0.8" stroke="#00D4FF" stroke-opacity="0.5" stroke-width="2" />
          <text x="300" y="215" text-anchor="middle" fill="#EFF8FC" font-size="12" font-family="sans-serif" font-weight="bold" letter-spacing="2">
            PRESSURE HULL (Ø114.3 mm)
          </text>

          {/* Dual Top Buoyancy Pods (Y = +/- 100mm) */}
          <rect x="120" y="85" width="360" height="45" rx="15" fill="#087EAB" fill-opacity="0.3" stroke="#26E6D1" stroke-width="1.5" />
          <text x="300" y="112" text-anchor="middle" fill="#26E6D1" font-size="10" font-family="sans-serif">
            PORT BUOYANCY TUBE
          </text>

          <rect x="120" y="290" width="360" height="45" rx="15" fill="#087EAB" fill-opacity="0.3" stroke="#26E6D1" stroke-width="1.5" />
          <text x="300" y="317" text-anchor="middle" fill="#26E6D1" font-size="10" font-family="sans-serif">
            STARBOARD BUOYANCY TUBE
          </text>

          {/* Forward direction arrow */}
          <g transform="translate(540, 210)">
            <path d="M 0 0 L 25 -10 L 25 10 Z" fill="#00D4FF" />
            <text x="15" y="-18" text-anchor="middle" fill="#00D4FF" font-size="10" font-weight="bold">BOW (FWD)</text>
          </g>

          {/* --- 4 HORIZONTAL CORNER THRUSTERS (45° Vectored) --- */}
          {/* H1: Front Left (x=460, y=70, angle 45 deg) */}
          <g transform="translate(460, 65) rotate(45)">
            <rect x="-24" y="-14" width="48" height="28" rx="6" 
              fill={getThrusterActivity('H1').active ? "#00D4FF" : "#07324D"} 
              stroke="#00D4FF" stroke-width="2" 
              className="transition-colors duration-300"
            />
            {getThrusterActivity('H1').active && (
              <line x1="28" y1="0" x2="52" y2="0" stroke="#00D4FF" stroke-width="4" stroke-linecap="round" stroke-dasharray="4" className="animate-pulse" />
            )}
            <text x="0" y="4" text-anchor="middle" fill={getThrusterActivity('H1').active ? "#061B2B" : "#00D4FF"} font-size="10" font-weight="bold">H1</text>
          </g>

          {/* H2: Front Right (x=460, y=355, angle -45 deg) */}
          <g transform="translate(460, 355) rotate(-45)">
            <rect x="-24" y="-14" width="48" height="28" rx="6" 
              fill={getThrusterActivity('H2').active ? "#00D4FF" : "#07324D"} 
              stroke="#00D4FF" stroke-width="2" 
              className="transition-colors duration-300"
            />
            {getThrusterActivity('H2').active && (
              <line x1="28" y1="0" x2="52" y2="0" stroke="#00D4FF" stroke-width="4" stroke-linecap="round" stroke-dasharray="4" className="animate-pulse" />
            )}
            <text x="0" y="4" text-anchor="middle" fill={getThrusterActivity('H2').active ? "#061B2B" : "#00D4FF"} font-size="10" font-weight="bold">H2</text>
          </g>

          {/* H3: Rear Left (x=140, y=65, angle 135 deg) */}
          <g transform="translate(140, 65) rotate(135)">
            <rect x="-24" y="-14" width="48" height="28" rx="6" 
              fill={getThrusterActivity('H3').active ? "#00D4FF" : "#07324D"} 
              stroke="#00D4FF" stroke-width="2" 
              className="transition-colors duration-300"
            />
            {getThrusterActivity('H3').active && (
              <line x1="28" y1="0" x2="52" y2="0" stroke="#00D4FF" stroke-width="4" stroke-linecap="round" stroke-dasharray="4" className="animate-pulse" />
            )}
            <text x="0" y="4" text-anchor="middle" fill={getThrusterActivity('H3').active ? "#061B2B" : "#00D4FF"} font-size="10" font-weight="bold">H3</text>
          </g>

          {/* H4: Rear Right (x=140, y=355, angle -135 deg) */}
          <g transform="translate(140, 355) rotate(-135)">
            <rect x="-24" y="-14" width="48" height="28" rx="6" 
              fill={getThrusterActivity('H4').active ? "#00D4FF" : "#07324D"} 
              stroke="#00D4FF" stroke-width="2" 
              className="transition-colors duration-300"
            />
            {getThrusterActivity('H4').active && (
              <line x1="28" y1="0" x2="52" y2="0" stroke="#00D4FF" stroke-width="4" stroke-linecap="round" stroke-dasharray="4" className="animate-pulse" />
            )}
            <text x="0" y="4" text-anchor="middle" fill={getThrusterActivity('H4').active ? "#061B2B" : "#00D4FF"} font-size="10" font-weight="bold">H4</text>
          </g>

          {/* --- 4 VERTICAL FIXED THRUSTERS (Spaced 182.60 mm) --- */}
          {/* V1: Front Left Vertical */}
          <g transform="translate(370, 140)">
            <circle cx="0" cy="0" r="18" 
              fill={getThrusterActivity('V1').active ? "#D7A747" : "#07324D"} 
              stroke="#D7A747" stroke-width="2" 
              className="transition-colors duration-300"
            />
            <text x="0" y="4" text-anchor="middle" fill={getThrusterActivity('V1').active ? "#061B2B" : "#D7A747"} font-size="10" font-weight="bold">V1</text>
          </g>

          {/* V2: Front Right Vertical */}
          <g transform="translate(370, 280)">
            <circle cx="0" cy="0" r="18" 
              fill={getThrusterActivity('V2').active ? "#D7A747" : "#07324D"} 
              stroke="#D7A747" stroke-width="2" 
              className="transition-colors duration-300"
            />
            <text x="0" y="4" text-anchor="middle" fill={getThrusterActivity('V2').active ? "#061B2B" : "#D7A747"} font-size="10" font-weight="bold">V2</text>
          </g>

          {/* V3: Rear Left Vertical (Spacing = 182.6mm ~ 140px in SVG scale) */}
          <g transform="translate(230, 140)">
            <circle cx="0" cy="0" r="18" 
              fill={getThrusterActivity('V3').active ? "#D7A747" : "#07324D"} 
              stroke="#D7A747" stroke-width="2" 
              className="transition-colors duration-300"
            />
            <text x="0" y="4" text-anchor="middle" fill={getThrusterActivity('V3').active ? "#061B2B" : "#D7A747"} font-size="10" font-weight="bold">V3</text>
          </g>

          {/* V4: Rear Right Vertical */}
          <g transform="translate(230, 280)">
            <circle cx="0" cy="0" r="18" 
              fill={getThrusterActivity('V4').active ? "#D7A747" : "#07324D"} 
              stroke="#D7A747" stroke-width="2" 
              className="transition-colors duration-300"
            />
            <text x="0" y="4" text-anchor="middle" fill={getThrusterActivity('V4').active ? "#061B2B" : "#D7A747"} font-size="10" font-weight="bold">V4</text>
          </g>

          {/* Dimensions Overlay */}
          <g stroke="#8BB9D4" stroke-dasharray="2" stroke-width="1" opacity="0.6">
            <line x1="140" y1="395" x2="460" y2="395" />
            <line x1="140" y1="390" x2="140" y2="400" />
            <line x1="460" y1="390" x2="460" y2="400" />
          </g>
          <text x="300" y="412" text-anchor="middle" fill="#8BB9D4" font-size="10">
            Diagonal Thruster Span: 582.70 mm | Frame Length: 482.60 mm
          </text>
        </svg>
      </div>

      {/* Description Box */}
      <div className="bg-[#EDF3F4]/70 p-4 rounded-xl border border-[#B9C7CC]/70 text-xs text-[#172832]/90 flex items-start space-x-3">
        <Info className="w-5 h-5 text-[#087F83] shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-[#087F83] uppercase tracking-wider mb-1">
            Active Mode Physics Explanation
          </div>
          <p className="leading-relaxed">
            {getDofDescription()}
          </p>
        </div>
      </div>

      {/* 6-DOF Interactive Buttons Grid */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-[#D98B73] uppercase tracking-wider">
          Simulate Degrees of Freedom (DOF):
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {/* Horizontal DOFs */}
          <button
            onClick={() => setDof('surge_fwd')}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all ${
              dof === 'surge_fwd'
                ? 'bg-ocean-cyan text-ocean-deep border-ocean-cyan shadow-lg shadow-ocean-cyan/20 scale-105'
                : 'bg-[#F5F8F8] border-[#B9C7CC]/70 text-[#163C4B] hover:bg-ocean-blue/20'
            }`}
          >
            <ArrowUp className="w-4 h-4 mb-1" />
            <span>SURGE</span>
            <span className="text-[10px] font-normal opacity-70">Forward</span>
          </button>

          <button
            onClick={() => setDof('sway_stbd')}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all ${
              dof === 'sway_stbd'
                ? 'bg-ocean-cyan text-ocean-deep border-ocean-cyan shadow-lg shadow-ocean-cyan/20 scale-105'
                : 'bg-[#F5F8F8] border-[#B9C7CC]/70 text-[#163C4B] hover:bg-ocean-blue/20'
            }`}
          >
            <ArrowRight className="w-4 h-4 mb-1" />
            <span>SWAY</span>
            <span className="text-[10px] font-normal opacity-70">Starboard</span>
          </button>

          <button
            onClick={() => setDof('yaw_cw')}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all ${
              dof === 'yaw_cw'
                ? 'bg-ocean-cyan text-ocean-deep border-ocean-cyan shadow-lg shadow-ocean-cyan/20 scale-105'
                : 'bg-[#F5F8F8] border-[#B9C7CC]/70 text-[#163C4B] hover:bg-ocean-blue/20'
            }`}
          >
            <RotateCw className="w-4 h-4 mb-1" />
            <span>YAW</span>
            <span className="text-[10px] font-normal opacity-70">Clockwise</span>
          </button>

          {/* Vertical DOFs */}
          <button
            onClick={() => setDof('heave_down')}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all ${
              dof === 'heave_down'
                ? 'bg-ocean-gold text-ocean-deep border-ocean-gold shadow-lg shadow-ocean-gold/20 scale-105'
                : 'bg-[#F5F8F8] border-[#B9C7CC]/70 text-[#163C4B] hover:bg-ocean-blue/20'
            }`}
          >
            <ArrowDown className="w-4 h-4 mb-1" />
            <span>HEAVE</span>
            <span className="text-[10px] font-normal opacity-70">Submerge</span>
          </button>

          <button
            onClick={() => setDof('roll_left')}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all ${
              dof === 'roll_left'
                ? 'bg-ocean-gold text-ocean-deep border-ocean-gold shadow-lg shadow-ocean-gold/20 scale-105'
                : 'bg-[#F5F8F8] border-[#B9C7CC]/70 text-[#163C4B] hover:bg-ocean-blue/20'
            }`}
          >
            <RotateCcw className="w-4 h-4 mb-1" />
            <span>ROLL</span>
            <span className="text-[10px] font-normal opacity-70">Port Tilt</span>
          </button>

          <button
            onClick={() => setDof('pitch_up')}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all ${
              dof === 'pitch_up'
                ? 'bg-ocean-gold text-ocean-deep border-ocean-gold shadow-lg shadow-ocean-gold/20 scale-105'
                : 'bg-[#F5F8F8] border-[#B9C7CC]/70 text-[#163C4B] hover:bg-ocean-blue/20'
            }`}
          >
            <Sliders className="w-4 h-4 mb-1" />
            <span>PITCH</span>
            <span className="text-[10px] font-normal opacity-70">Bow Up</span>
          </button>
        </div>
      </div>
    </div>
  );
};