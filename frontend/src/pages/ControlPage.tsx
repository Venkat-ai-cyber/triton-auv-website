import React from 'react';
import { PageRoute } from '../types';
import { Cpu, Zap, Activity, ArrowRight, ShieldCheck, RefreshCw, Send, Sliders } from 'lucide-react';
import tritonConfig from '../config/tritonConfig';

interface ControlPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const ControlPage: React.FC<ControlPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-ocean-gold uppercase tracking-widest">
          AUTOPILOT &amp; COMPANION COMPUTER WORKFLOWS
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-white">
          CONTROL &amp; AUTONOMY
        </h1>
        <p className="text-sm text-ocean-ice/80">
          Coordinated Flight Control, Real-Time Sensor Fusion, MAVLink Telemetry, and Companion Decision Logic
        </p>
      </div>

      {/* Architecture Diagram 1: Vehicle Control Loop */}
      <section className="card-glass rounded-2xl p-6 sm:p-8 border border-ocean-blue/40 shadow-2xl space-y-6">
        <div className="border-b border-ocean-blue/30 pb-4">
          <span className="text-xs font-bold text-ocean-cyan uppercase tracking-wider">
            WORKFLOW 1
          </span>
          <h2 className="text-xl font-heading font-bold text-white mt-1">
            Real-Time Vehicle Control Architecture
          </h2>
          <p className="text-xs text-white/60 pt-1">
            Deterministic low-level attitude stabilization and thruster allocation running on Pixhawk 2.4.8 / ArduSub
          </p>
        </div>

        {/* Linear Step Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="bg-ocean-midnight/70 p-4 rounded-xl border border-ocean-cyan/30 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-ocean-cyan font-bold">NODE 1</span>
            <div className="my-2">
              <h4 className="text-sm font-bold text-white">Sensory Inflow</h4>
              <p className="text-xs text-white/60">IMU, Bar30 Depth, RM3100 Compass, Leak Probe</p>
            </div>
            <div className="text-[11px] text-ocean-aqua font-mono">400 Hz Sampling</div>
          </div>

          <div className="bg-ocean-midnight/70 p-4 rounded-xl border border-ocean-cyan/30 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-ocean-cyan font-bold">NODE 2</span>
            <div className="my-2">
              <h4 className="text-sm font-bold text-white">Pixhawk / ArduSub</h4>
              <p className="text-xs text-white/60">Extended Kalman Filter (EKF3) &amp; PID Attitude Loops</p>
            </div>
            <div className="text-[11px] text-ocean-aqua font-mono">State Estimation</div>
          </div>

          <div className="bg-ocean-midnight/70 p-4 rounded-xl border border-ocean-cyan/30 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-ocean-cyan font-bold">NODE 3</span>
            <div className="my-2">
              <h4 className="text-sm font-bold text-white">Thruster Allocation</h4>
              <p className="text-xs text-white/60">6-DOF Matrix Translation into 8 PWM Channel Vectors</p>
            </div>
            <div className="text-[11px] text-ocean-aqua font-mono">Matrix Mapping</div>
          </div>

          <div className="bg-ocean-midnight/70 p-4 rounded-xl border border-ocean-cyan/30 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-ocean-cyan font-bold">NODE 4</span>
            <div className="my-2">
              <h4 className="text-sm font-bold text-white">8 × 30A ESCs</h4>
              <p className="text-xs text-white/60">High-speed brushless pulse-width modulation</p>
            </div>
            <div className="text-[11px] text-ocean-aqua font-mono">PWM Duty Cycle</div>
          </div>

          <div className="bg-ocean-midnight/70 p-4 rounded-xl border border-ocean-gold/40 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-ocean-gold font-bold">NODE 5</span>
            <div className="my-2">
              <h4 className="text-sm font-bold text-white">8 Thruster Array</h4>
              <p className="text-xs text-white/60">Dynamic fluid thrust resolving 6 physical DOFs</p>
            </div>
            <div className="text-[11px] text-ocean-gold font-mono">Holonomic Thrust</div>
          </div>
        </div>

        <div className="p-3.5 bg-ocean-deep/60 rounded-xl border border-white/5 text-xs text-white/70">
          <strong className="text-ocean-cyan">Control Pipeline Summary:</strong> Sensors → Pixhawk / ArduSub → Thruster Allocation Matrix → ESCs → 8 Thrusters.
        </div>
      </section>

      {/* Architecture Diagram 2: Companion Computer Workflow */}
      <section className="card-glass rounded-2xl p-6 sm:p-8 border border-ocean-blue/40 shadow-2xl space-y-6">
        <div className="border-b border-ocean-blue/30 pb-4">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
            WORKFLOW 2
          </span>
          <h2 className="text-xl font-heading font-bold text-white mt-1">
            Companion-Computer Autonomous Workflow
          </h2>
          <p className="text-xs text-white/60 pt-1">
            High-level visual perception, deep learning, and mission autonomy running on NVIDIA Jetson Orin Nano
          </p>
        </div>

        {/* Companion Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <div className="bg-ocean-midnight/70 p-4 rounded-xl border border-purple-500/30 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-purple-300 font-bold">STAGE 1</span>
            <div className="my-2">
              <h4 className="text-sm font-bold text-white">Cameras</h4>
              <p className="text-xs text-white/60">Forward &amp; 39.23° Downward Vision Sensors</p>
            </div>
            <div className="text-[11px] text-purple-300 font-mono">Dual HD Inflow</div>
          </div>

          <div className="bg-ocean-midnight/70 p-4 rounded-xl border border-purple-500/30 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-purple-300 font-bold">STAGE 2</span>
            <div className="my-2">
              <h4 className="text-sm font-bold text-white">Jetson Orin</h4>
              <p className="text-xs text-white/60">NVIDIA Ampere GPU Edge Compute Architecture</p>
            </div>
            <div className="text-[11px] text-purple-300 font-mono">40 TOPS AI</div>
          </div>

          <div className="bg-ocean-midnight/70 p-4 rounded-xl border border-purple-500/30 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-purple-300 font-bold">STAGE 3</span>
            <div className="my-2">
              <h4 className="text-sm font-bold text-white">OpenCV Preprocess</h4>
              <p className="text-xs text-white/60">CLAHE Contrast Equalization &amp; White Balance</p>
            </div>
            <div className="text-[11px] text-purple-300 font-mono">Optical Scrub</div>
          </div>

          <div className="bg-ocean-midnight/70 p-4 rounded-xl border border-ocean-cyan/40 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-ocean-cyan font-bold">STAGE 4</span>
            <div className="my-2">
              <h4 className="text-sm font-bold text-white">YOLOv11 Inference</h4>
              <p className="text-xs text-white/60">Target Gate, Obstacle &amp; Marker Classification</p>
            </div>
            <div className="text-[11px] text-ocean-cyan font-mono">TensorRT Quantized</div>
          </div>

          <div className="bg-ocean-midnight/70 p-4 rounded-xl border border-purple-500/30 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-purple-300 font-bold">STAGE 5</span>
            <div className="my-2">
              <h4 className="text-sm font-bold text-white">Mission Logic</h4>
              <p className="text-xs text-white/60">State Machine, Gate Trajectory &amp; Offset Alignment</p>
            </div>
            <div className="text-[11px] text-purple-300 font-mono">Autonomous Planner</div>
          </div>

          <div className="bg-ocean-midnight/70 p-4 rounded-xl border border-ocean-gold/40 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-ocean-gold font-bold">STAGE 6</span>
            <div className="my-2">
              <h4 className="text-sm font-bold text-white">MAVLink to Pixhawk</h4>
              <p className="text-xs text-white/60">Target Velocity &amp; Attitude Vector Commands</p>
            </div>
            <div className="text-[11px] text-ocean-gold font-mono">UART Serial Bus</div>
          </div>
        </div>

        <div className="p-3.5 bg-ocean-deep/60 rounded-xl border border-white/5 text-xs text-white/70">
          <strong className="text-purple-300">Companion Workflow Summary:</strong> Cameras → Jetson Orin Nano → Computer Vision (OpenCV + CLAHE) → YOLOv11 Target Detection → Mission Decision Logic → MAVLink Commands → Pixhawk Flight Controller.
        </div>
      </section>

      {/* Clear Separation of Responsibilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-glass p-6 rounded-xl border border-ocean-cyan/30 space-y-3">
          <h3 className="text-lg font-heading font-bold text-ocean-cyan flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-ocean-cyan" />
            <span>Flight Controller Responsibilities (Pixhawk 2.4.8)</span>
          </h3>
          <ul className="space-y-2 text-xs text-white/80 list-disc list-inside">
            <li>Hard real-time deterministic sensor fusion (EKF at 400 Hz)</li>
            <li>Closed-loop PID attitude, roll, pitch, and yaw stabilization</li>
            <li>Precise depth holding via Bar30 piezoresistive pressure feedback</li>
            <li>Thruster allocation matrix execution converting commands to 8 individual PWM signals</li>
            <li>Direct monitoring of hardware leak sensor and battery failsafe cutoffs</li>
          </ul>
        </div>

        <div className="card-glass p-6 rounded-xl border border-purple-400/30 space-y-3">
          <h3 className="text-lg font-heading font-bold text-purple-300 flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-purple-300" />
            <span>Companion Computer Responsibilities (Jetson Orin Nano)</span>
          </h3>
          <ul className="space-y-2 text-xs text-white/80 list-disc list-inside">
            <li>Acquiring high-resolution video streams from forward and downward cameras</li>
            <li>Executing CLAHE and white-balance optical enhancement in OpenCV</li>
            <li>Running deep convolutional inference using YOLOv11 for subsea objects</li>
            <li>Mission decision logic state machine determining navigation offsets</li>
            <li>Packaging spatial guidance vectors into MAVLink packets transmitted to Pixhawk</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
