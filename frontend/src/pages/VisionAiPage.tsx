import React from 'react';
import { PageRoute } from '../types';
import { Yolo11Demo } from '../components/ai/Yolo11Demo';
import { Eye, Cpu, Zap, Sliders, CheckCircle2, ArrowRight, ShieldAlert, Layers } from 'lucide-react';
import tritonConfig from '../config/tritonConfig';

interface VisionAiPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const VisionAiPage: React.FC<VisionAiPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-ocean-cyan/20 border border-ocean-cyan/40 text-xs font-bold text-ocean-cyan">
          <Zap className="w-3.5 h-3.5 text-ocean-cyan" />
          <span>PROJECT UPDATE: UPGRADED TO YOLOv11</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-white">
          VISION &amp; ARTIFICIAL INTELLIGENCE
        </h1>
        <p className="text-sm text-ocean-ice/80">
          Edge Object Detection, OpenCV Preprocessing, Subsea Optical Equalization, and Autonomous Decision Logic
        </p>
      </div>

      {/* Critical Architecture Upgrade Card */}
      <div className="card-glass p-6 sm:p-8 rounded-2xl border border-ocean-cyan/50 bg-gradient-to-r from-ocean-midnight to-[#041d30] shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-ocean-gold uppercase tracking-widest">
              IMPORTANT ARCHITECTURE EVOLUTION
            </span>
            <h2 className="text-2xl font-heading font-bold text-white">
              Migration from YOLOv8 Nano to YOLOv11
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
              While early project presentations explored YOLOv8 Nano, TRITON has officially upgraded its production neural pipeline to <strong className="text-ocean-cyan">YOLOv11</strong>. This provides improved multi-scale feature extraction, reduced parameter overhead on the NVIDIA Jetson Orin Nano, and superior recall under turbid aquatic optical distortion.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-ocean-deep/80 border border-ocean-cyan/40 shrink-0 text-center min-w-[200px]">
            <div className="text-xs font-bold text-white/60">ACTIVE MODEL</div>
            <div className="text-3xl font-heading font-black text-ocean-cyan my-1">YOLOv11</div>
            <div className="text-[11px] text-green-400 font-semibold font-mono">TensorRT INT8 Optimized</div>
          </div>
        </div>
      </div>

      {/* Interactive YOLOv11 Playground Demo */}
      <section className="space-y-4">
        <div className="border-b border-ocean-blue/30 pb-2">
          <h3 className="text-xl font-heading font-bold text-white">
            Interactive Underwater Vision Demo
          </h3>
          <p className="text-xs text-white/60">
            Simulate real gate detection, CLAHE optical contrast enhancements, and turbidity attenuation
          </p>
        </div>

        <Yolo11Demo />
      </section>

      {/* Optical Preprocessing Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-glass p-6 rounded-xl border border-ocean-blue/30 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-ocean-cyan/20 border border-ocean-cyan/40 flex items-center justify-center text-ocean-cyan">
            <Sliders className="w-5 h-5 text-ocean-cyan" />
          </div>
          <h4 className="text-base font-heading font-bold text-white">
            CLAHE Contrast Enhancement
          </h4>
          <p className="text-xs text-white/70 leading-relaxed">
            Contrast Limited Adaptive Histogram Equalization operates on local image tiles to prevent over-amplification of backscatter noise, restoring edge definition across dim and murky water.
          </p>
        </div>

        <div className="card-glass p-6 rounded-xl border border-ocean-blue/30 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-ocean-cyan/20 border border-ocean-cyan/40 flex items-center justify-center text-ocean-cyan">
            <Eye className="w-5 h-5 text-ocean-cyan" />
          </div>
          <h4 className="text-base font-heading font-bold text-white">
            Dynamic White Balance
          </h4>
          <p className="text-xs text-white/70 leading-relaxed">
            Water selectively absorbs red wavelengths within meters of depth. Real-time Gray World and chromatic equalization algorithms mathematically reconstruct true target colors.
          </p>
        </div>

        <div className="card-glass p-6 rounded-xl border border-ocean-blue/30 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-ocean-cyan/20 border border-ocean-cyan/40 flex items-center justify-center text-ocean-cyan">
            <Cpu className="w-5 h-5 text-ocean-cyan" />
          </div>
          <h4 className="text-base font-heading font-bold text-white">
            Jetson Orin Nano Edge Inference
          </h4>
          <p className="text-xs text-white/70 leading-relaxed">
            40 TOPS of hardware AI performance allows the pipeline to ingest high-definition camera feeds, execute neural inference, and transmit spatial bounding box coordinates via MAVLink without cloud dependency.
          </p>
        </div>
      </div>
    </div>
  );
};
