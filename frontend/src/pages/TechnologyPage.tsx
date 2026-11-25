import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Cpu, Eye, Compass, Shield, Wrench, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import tritonConfig from '../config/tritonConfig';

interface TechnologyPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const TechnologyPage: React.FC<TechnologyPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    {
      id: 'embedded',
      title: 'Embedded and Control',
      icon: Cpu,
      color: 'border-ocean-cyan text-[#087F83]',
      description: 'Deterministic real-time flight stabilization, sensor fusion, and thruster motor allocation.',
      techs: [
        { name: 'Pixhawk 2.4.8 Autopilot', detail: '32-bit ARM Cortex M4 running ArduSub subsea firmware at 400 Hz' },
        { name: 'ArduSub Firmware', detail: 'Open-source underwater vehicle stabilization with depth-hold and heading-lock' },
        { name: 'MAVLink Telemetry Protocol', detail: 'Micro Air Vehicle Link message packets between flight controller and companion computer' },
        { name: '8 × 30A ESCs', detail: 'Individual high-speed PWM motor drives powering brushless underwater thrusters' }
      ]
    },
    {
      id: 'edge',
      title: 'Edge Computing',
      icon: Zap,
      color: 'border-purple-400 text-purple-300',
      description: 'High-throughput companion processing for deep neural network inference and mission decision logic.',
      techs: [
        { name: 'NVIDIA Jetson Orin Nano', detail: 'Ampere architecture GPU with 40 TOPS AI compute running Ubuntu Linux and ROS' },
        { name: 'TensorRT Acceleration', detail: 'Quantized INT8/FP16 execution graphs delivering low-latency subsea edge inferencing' },
        { name: 'UART & Ethernet Bridge', detail: 'Direct telemetry and high-bandwidth video feed communication pipeline' }
      ]
    },
    {
      id: 'vision',
      title: 'Computer Vision & AI',
      icon: Eye,
      color: 'border-ocean-aqua text-[#087F83]',
      description: 'Updated state-of-the-art YOLOv11 target detection enhanced by subsea optical preprocessing.',
      techs: [
        { name: 'YOLOv11 Object Detection', detail: 'Updated from legacy YOLOv8 Nano; optimized for qualification gate transit and seabed obstacles' },
        { name: 'OpenCV Preprocessing', detail: 'Real-time color-space transforms, noise attenuation, and edge contour detection' },
        { name: 'CLAHE Enhancement', detail: 'Contrast Limited Adaptive Histogram Equalization combating aquatic light scatter' },
        { name: 'Dynamic White Balance', detail: 'Active chromatic compensation recovering severely attenuated red-spectrum wavelengths' }
      ]
    },
    {
      id: 'sensors',
      title: 'Sensors & Perception',
      icon: Compass,
      color: 'border-ocean-gold text-[#D98B73]',
      description: 'Multi-modal sensory perception ensuring navigation in GPS-denied underwater environments.',
      techs: [
        { name: 'ICM-20948 9-Axis IMU', detail: 'Low-noise accelerometer, gyroscope, and compass feeding EKF attitude filters' },
        { name: 'Bar30 Depth Sensor', detail: '0.2 mm resolution piezoresistive pressure telemetry for sub-centimeter depth keeping' },
        { name: 'RM3100 Magnetometer', detail: 'Geomagnetic field sensor immune to magnetic drift and internal electromagnetic noise' },
        { name: 'Dual Inspection Cameras', detail: 'Forward target identification camera + 39.23° downward pipeline surveying camera' },
        { name: '3-Hydrophone Array (40 kHz)', detail: 'Time Difference of Arrival (TDoA) acoustic localization for submerged pingers' }
      ]
    },
    {
      id: 'mechanical',
      title: 'Mechanical & Structural',
      icon: Wrench,
      color: 'border-blue-400 text-blue-300',
      description: 'Robust naval structural design, hydrodynamics, and hermetic sealing.',
      techs: [
        { name: 'Chassis Frame (482.6 × 331 mm)', detail: 'CNC machined 6.0 mm marine-grade aluminum side plates with truss weight reduction' },
        { name: 'Optical Pressure Hull (Ø114.3 mm)', detail: 'Cast acrylic cylinder (443.22 mm) sealed with Buna-N O-rings in CNC end cap flanges' },
        { name: 'Dual Buoyancy Pods (400 mm)', detail: 'Top-mounted streamlined fairings providing static positive buoyancy for passive ascent' },
        { name: 'Diagonal 45° Thruster Mounts', detail: 'Engineered brackets giving 582.70 mm outer span for maximum yaw torque authority' }
      ]
    }
  ];

  const filteredCategories = activeCategory === 'all' 
    ? categories 
    : categories.filter(c => c.id === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-[#D98B73] uppercase tracking-widest">
          INTERCONNECTED SYSTEM ARCHITECTURE
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-[#172832]">
          TECHNOLOGY MATRIX
        </h1>
        <p className="text-sm text-[#163C4B]">
          Integrated Embedded Control, Edge AI Computing, Optical Preprocessing, Sensors, and Mechanical Design
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCategory === 'all'
                ? 'bg-ocean-cyan text-ocean-deep shadow-md'
                : 'bg-[#EDF3F4]/70 text-[#163C4B]/85 hover:text-[#172832]'
            }`}
          >
            All Pillars (5)
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === c.id
                  ? 'bg-ocean-cyan text-ocean-deep shadow-md'
                  : 'bg-[#EDF3F4]/70 text-[#163C4B]/85 hover:text-[#172832]'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="space-y-8">
        {filteredCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div 
              key={cat.id}
              className="card-glass rounded-2xl p-6 sm:p-8 border border-[#B9C7CC]/80 shadow-2xl space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#B9C7CC]/70 pb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-xl bg-[#EDF3F4] border ${cat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-[#172832]">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[#163C4B]/75">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Subsystems within this category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.techs.map((t, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#F5F8F8] p-4 rounded-xl border border-[#B9C7CC]/50 hover:border-[#087F83]/40 transition-colors"
                  >
                    <div className="flex items-center space-x-2 text-[#172832] font-bold text-sm mb-1">
                      <CheckCircle2 className="w-4 h-4 text-[#087F83] shrink-0" />
                      <span>{t.name}</span>
                    </div>
                    <p className="text-xs text-[#163C4B]/85 pl-6 leading-relaxed">
                      {t.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Technical CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={() => onNavigate('control')}
          className="card-glass p-6 rounded-xl border border-[#B9C7CC]/80 hover:border-ocean-cyan cursor-pointer transition-all flex items-center justify-between group"
        >
          <div>
            <h4 className="font-heading font-bold text-[#172832] group-hover:text-[#087F83] transition-colors">
              Vehicle Control &amp; Autonomy Workflows
            </h4>
            <p className="text-xs text-[#163C4B]/75 mt-1">
              Explore Pixhawk 2.4.8 flight loop &amp; Jetson Orin Nano MAVLink communication architecture.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-[#087F83] shrink-0 ml-4 group-hover:translate-x-1 transition-transform" />
        </div>

        <div 
          onClick={() => onNavigate('vision-ai')}
          className="card-glass p-6 rounded-xl border border-[#B9C7CC]/80 hover:border-ocean-cyan cursor-pointer transition-all flex items-center justify-between group"
        >
          <div>
            <h4 className="font-heading font-bold text-[#172832] group-hover:text-[#087F83] transition-colors">
              YOLOv11 Vision &amp; Deep Learning Demo
            </h4>
            <p className="text-xs text-[#163C4B]/75 mt-1">
              Test real underwater gate detection, CLAHE optical filters, and edge classification.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-[#087F83] shrink-0 ml-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};