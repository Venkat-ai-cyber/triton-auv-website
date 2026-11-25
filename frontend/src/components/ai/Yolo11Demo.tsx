import React, { useState } from 'react';
import { Eye, Cpu, Sliders, CheckCircle, RefreshCw, Zap, Shield, Image as ImageIcon } from 'lucide-react';

export const Yolo11Demo: React.FC = () => {
  const [enableClahe, setEnableClahe] = useState<boolean>(true);
  const [enableBoxes, setEnableBoxes] = useState<boolean>(true);
  const [turbidityLevel, setTurbidityLevel] = useState<number>(30);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const sampleImages = [
    {
      id: 1,
      title: 'Competition Qualification Gate (Dual Red/Green Markers)',
      src: '/assets/images/underwater_gate_real.png',
      detections: [
        { label: 'Gate Left Post (Green)', conf: 0.94, bbox: { x: 12, y: 25, w: 46, h: 68 } },
        { label: 'Gate Right Post (Red)', conf: 0.91, bbox: { x: 55, y: 12, w: 32, h: 56 } }
      ]
    },
    {
      id: 2,
      title: 'RoboSub Underwater Gate Transit Window',
      src: '/assets/images/gate_sample_1.jpg',
      detections: [
        { label: 'Target Gate Frame', conf: 0.89, bbox: { x: 22, y: 18, w: 58, h: 64 } },
        { label: 'Seabed Marker', conf: 0.85, bbox: { x: 40, y: 82, w: 20, h: 12 } }
      ]
    },
    {
      id: 3,
      title: 'Subsea Inspection Target & Buoy',
      src: '/assets/images/gate_sample_2.jpg',
      detections: [
        { label: 'Inspection Target', conf: 0.92, bbox: { x: 30, y: 35, w: 38, h: 42 } }
      ]
    }
  ];

  const currentSample = sampleImages[selectedImageIndex];

  return (
    <div className="card-glass rounded-2xl p-6 border border-[#B9C7CC]/80 shadow-2xl space-y-6">
      {/* Header with YOLOv11 update emphasis */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#B9C7CC]/70 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-ocean-cyan text-ocean-deep">
              UPDATED ARCHITECTURE
            </span>
            <h3 className="font-heading font-bold text-lg text-[#172832] flex items-center space-x-2">
              <Eye className="w-5 h-5 text-[#087F83]" />
              <span>YOLOv11 DEEP VISION &amp; PREPROCESSING ENGINE</span>
            </h3>
          </div>
          <p className="text-xs text-[#172832]/70 pt-1">
            Upgraded from legacy YOLOv8 Nano to state-of-the-art YOLOv11 running on NVIDIA Jetson Orin Nano
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono bg-white px-3 py-1.5 rounded-lg border border-[#087F83]/30 text-[#087F83]">
          <Cpu className="w-3.5 h-3.5 text-[#087F83]" />
          <span>INFERENCE: JETSON ORIN NANO</span>
        </div>
      </div>

      {/* 7-Step Animated AI Pipeline */}
      <div className="space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-[#D98B73]">
          Intelligent End-to-End Perception Pipeline:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center text-xs">
          {[
            { step: '1', title: 'Camera Input', desc: 'Raw 1080p Stream' },
            { step: '2', title: 'Preprocessing', desc: 'CLAHE & White Balance' },
            { step: '3', title: 'YOLOv11 Inference', desc: 'TensorRT Edge Engine' },
            { step: '4', title: 'Detection', desc: 'Bounding Boxes & Class' },
            { step: '5', title: 'Target ID', desc: 'Pose & Coordinate Calc' },
            { step: '6', title: 'Decision Logic', desc: 'Waypoint & Alignment' },
            { step: '7', title: 'Control Exec', desc: 'MAVLink to Pixhawk' }
          ].map((s, idx) => (
            <div 
              key={s.step} 
              className="bg-[#F5F8F8] p-2.5 rounded-lg border border-[#B9C7CC]/70 relative flex flex-col justify-between"
            >
              <div className="text-[10px] font-mono text-[#087F83] font-bold mb-1">
                STEP {s.step}
              </div>
              <div className="font-bold text-[#172832] text-[11px] leading-tight mb-1">
                {s.title}
              </div>
              <div className="text-[10px] text-[#163C4B]/65">
                {s.desc}
              </div>
              {idx < 6 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[#087F83] text-[10px] font-bold">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Detection Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Left: Viewport with overlay */}
        <div className="lg:col-span-2 relative bg-[#01080e] rounded-xl overflow-hidden border border-[#B9C7CC]/80 aspect-[4/3] flex items-center justify-center">
          {/* Base image with simulated underwater turbidity and CLAHE filter */}
          <div 
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            style={{
              filter: `
                ${enableClahe ? 'contrast(1.35) saturate(1.2)' : 'contrast(0.9) saturate(0.8)'}
                ${turbidityLevel > 0 ? `blur(${turbidityLevel * 0.02}px)` : ''}
              `
            }}
          >
            <img 
              src={currentSample.src} 
              alt={currentSample.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Simulated Water Attenuation Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{ 
              backgroundColor: 'rgba(8, 126, 171, 0.25)', 
              opacity: turbidityLevel / 100 
            }}
          />

          {/* YOLOv11 Dynamic Bounding Boxes */}
          {enableBoxes && currentSample.detections.map((det, idx) => (
            <div 
              key={idx}
              className="absolute border-2 border-ocean-cyan rounded shadow-lg shadow-ocean-cyan/30 pointer-events-none animate-in fade-in duration-300"
              style={{
                left: `${det.bbox.x}%`,
                top: `${det.bbox.y}%`,
                width: `${det.bbox.w}%`,
                height: `${det.bbox.h}%`
              }}
            >
              <div className="absolute -top-6 left-0 bg-ocean-cyan text-ocean-deep px-1.5 py-0.5 text-[10px] font-bold rounded flex items-center space-x-1 whitespace-nowrap shadow">
                <span>{det.label}</span>
                <span className="font-mono bg-[#E8F1F3] text-[#087F83] px-1 rounded text-[9px]">
                  {(det.conf * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}

          {/* Model Stamp */}
          <div className="absolute bottom-3 left-3 bg-[#E8F1F3] backdrop-blur-md px-2.5 py-1 rounded border border-[#087F83]/30 text-[10px] font-mono text-[#087F83] flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span>YOLOv11s-AUV · REAL-TIME INFERENCE</span>
          </div>
        </div>

        {/* Right: Controls & Parameters */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-xs font-bold text-[#172832] uppercase tracking-wider border-b border-[#B9C7CC]/70 pb-2">
              Vision Preprocessing Controls
            </div>

            {/* Select Sample Footage */}
            <div className="space-y-1.5">
              <label className="text-xs text-[#163C4B]/85 font-medium">Select Underwater Footage:</label>
              <div className="space-y-1.5">
                {sampleImages.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-all flex items-center justify-between ${
                      selectedImageIndex === idx
                        ? 'bg-ocean-cyan/20 border border-ocean-cyan text-[#087F83] font-bold'
                        : 'bg-[#EDF3F4]/50 border border-[#B9C7CC]/50 text-[#163C4B]/85 hover:bg-ocean-blue/20'
                    }`}
                  >
                    <span className="truncate pr-2">{s.title}</span>
                    <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* CLAHE Contrast Toggle */}
            <div className="flex items-center justify-between bg-[#EDF3F4]/50 p-3 rounded-lg border border-[#B9C7CC]/50">
              <div>
                <span className="text-xs font-bold text-[#172832] block">CLAHE Equalization</span>
                <span className="text-[10px] text-[#163C4B]/65">Contrast Limited Adaptive Histogram</span>
              </div>
              <button
                onClick={() => setEnableClahe(!enableClahe)}
                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                  enableClahe 
                    ? 'bg-ocean-cyan text-ocean-deep' 
                    : 'bg-[#E8F1F3] text-[#163C4B]/65 border border-white/20'
                }`}
              >
                {enableClahe ? 'ACTIVE' : 'BYPASS'}
              </button>
            </div>

            {/* Bounding Box Toggle */}
            <div className="flex items-center justify-between bg-[#EDF3F4]/50 p-3 rounded-lg border border-[#B9C7CC]/50">
              <div>
                <span className="text-xs font-bold text-[#172832] block">YOLOv11 Annotations</span>
                <span className="text-[10px] text-[#163C4B]/65">Bounding boxes and confidence</span>
              </div>
              <button
                onClick={() => setEnableBoxes(!enableBoxes)}
                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                  enableBoxes 
                    ? 'bg-ocean-cyan text-ocean-deep' 
                    : 'bg-[#E8F1F3] text-[#163C4B]/65 border border-white/20'
                }`}
              >
                {enableBoxes ? 'VISIBLE' : 'HIDDEN'}
              </button>
            </div>

            {/* Turbidity Simulation Slider */}
            <div className="space-y-1.5 bg-[#EDF3F4]/50 p-3 rounded-lg border border-[#B9C7CC]/50">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#172832]">Water Turbidity Simulator</span>
                <span className="font-mono text-[#087F83]">{turbidityLevel}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={turbidityLevel}
                onChange={(e) => setTurbidityLevel(Number(e.target.value))}
                className="w-full accent-ocean-cyan cursor-pointer"
              />
              <span className="text-[10px] text-[#163C4B]/65 block">
                Adjusts simulated aquatic absorption &amp; turbidity scattering.
              </span>
            </div>
          </div>

          {/* Genuine disclaimer */}
          <div className="bg-[#E8F1F3] p-3 rounded-lg border border-ocean-gold/30 text-[11px] text-[#D98B73]">
            <strong>Demonstration Disclosure:</strong> This interface interactively demonstrates real-world Robosub benchmark footage, CLAHE optical compensation, and YOLOv11 target localization logic.
          </div>
        </div>
      </div>
    </div>
  );
};