import React, { useState } from 'react';
import { PageRoute } from '../types';
import { ScrollTritonTour } from '../components/3d/ScrollTritonTour';
import { TritonViewer } from '../components/3d/TritonViewer';
import { 
  Anchor, 
  ArrowRight, 
  Cpu, 
  Eye, 
  Award, 
  Compass, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  ChevronDown,
  Layers,
  Zap,
  CheckCircle2,
  Sliders,
  ExternalLink,
  Target,
  Maximize2,
  Box,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'propulsion' | 'perception'>('overview');

  const scrollToTour = () => {
    const el = document.getElementById('tour-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-0 text-slate-800 selection:bg-ocean-cyan selection:text-ocean-deep font-sans">
      
      {/* =========================================================================
          HERO SECTION — GILLIAN JACK INSPIRED COPY-CENTRIC EDITORIAL HERO
          Split-screen layout: High-contrast typography hierarchy on left,
          authentic interactive 3D CAD model on right.
          ========================================================================= */}
      <section className="relative min-h-[92vh] flex items-center px-4 sm:px-6 lg:px-12 py-12 bg-gradient-to-b from-[#061B2B] via-[#082338] to-[#061B2B] text-white overflow-hidden border-b border-ocean-blue/20">
        {/* Subtle Marine Ambient Radial */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(circle_at_70%_30%,rgba(0,212,255,0.14),transparent_65%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Copy-Centric Brand Identity (Gillian Jack Signature Hierarchy) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Category / Discipline Pill */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-ocean-midnight/90 border border-ocean-cyan/40 text-xs font-mono text-ocean-aqua shadow-sm">
              <span className="w-2 h-2 rounded-full bg-ocean-cyan animate-pulse"></span>
              <span className="font-heading font-black tracking-widest text-white uppercase">TRITON AUV</span>
              <span className="text-white/40">|</span>
              <span className="text-ocean-gold font-bold">TEAM TRITON</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-black tracking-tight text-white leading-none">
                TRITON
              </h1>
              <p className="text-base sm:text-xl font-heading font-bold tracking-[0.25em] text-ocean-cyan uppercase pt-1">
                AUTONOMOUS UNDERWATER VEHICLE
              </p>
            </div>

            {/* Tagline */}
            <p className="text-sm sm:text-base font-heading font-bold tracking-wider text-ocean-gold uppercase">
              BUILT FOR THE OCEAN. ENGINEERED FOR IMPACT.
            </p>

            {/* Editorial Body Statement */}
            <p className="text-sm sm:text-base text-ocean-ice/85 leading-relaxed font-sans max-w-xl font-light">
              Explore the unseen. An advanced underwater robotic platform engineered to navigate, inspect, and discover beneath the surface through precision 6-DOF propulsion, embedded dual-brain control, and real-time edge neural perception.
            </p>

            {/* Qualification / Feature Badges Strip (Editorial Style) */}
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono text-white/80">
              <span className="px-2.5 py-1 rounded bg-ocean-midnight/80 border border-ocean-blue/40">
                8-THRUSTER ARRAY
              </span>
              <span className="px-2.5 py-1 rounded bg-ocean-midnight/80 border border-ocean-blue/40">
                6-DOF HOLONOMIC
              </span>
              <span className="px-2.5 py-1 rounded bg-ocean-midnight/80 border border-ocean-blue/40">
                YOLOV11 EDGE AI
              </span>
              <span className="px-2.5 py-1 rounded bg-ocean-midnight/80 border border-ocean-blue/40">
                SUBSEA TELEMETRY
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                onClick={scrollToTour}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-ocean-cyan to-ocean-aqua text-ocean-deep font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-ocean-cyan/25 hover:brightness-110 hover:scale-[1.02] transition-all flex items-center space-x-2"
              >
                <span>EXPLORE THE VEHICLE</span>
                <ArrowRight className="w-4 h-4 text-ocean-deep" />
              </button>

              <button
                onClick={() => onNavigate('engineering')}
                className="px-6 py-3.5 rounded-xl bg-ocean-midnight/90 border border-ocean-blue/50 text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-ocean-blue/30 hover:border-ocean-cyan/50 transition-all flex items-center space-x-2 shadow-lg"
              >
                <span>DISCOVER OUR ENGINEERING</span>
                <Cpu className="w-4 h-4 text-ocean-cyan" />
              </button>

              <button
                onClick={() => onNavigate('sponsorship')}
                className="px-6 py-3.5 rounded-xl bg-ocean-gold/20 border border-ocean-gold/50 text-ocean-gold font-heading font-bold text-xs uppercase tracking-wider hover:bg-ocean-gold hover:text-ocean-deep transition-all flex items-center space-x-2"
              >
                <span>PARTNER WITH US</span>
                <Award className="w-4 h-4" />
              </button>
            </div>

            {/* Scroll Indicator Prompt */}
            <div 
              onClick={scrollToTour}
              className="pt-4 inline-flex items-center space-x-2 text-xs font-mono text-ocean-aqua cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
            >
              <span>SCROLL TO EXPLORE 3D PRODUCT TOUR</span>
              <ChevronDown className="w-4 h-4 animate-bounce text-ocean-cyan" />
            </div>

          </div>

          {/* Right Column: Hero 3D Vehicle Interactive Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-ocean-cyan/30 shadow-2xl bg-gradient-to-b from-[#092C46]/80 to-[#041421] p-1 sm:p-2">
              <TritonViewer className="h-[460px] sm:h-[520px] w-full" showControlsBar={true} />
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 1 — RESEARCH & MISSION PHILOSOPHY (CLEAN ICE BLUE / WHITE)
          Gillian Jack Style: Generous whitespace, elegant typography, high contrast
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-12 bg-[#EFF8FC] text-slate-800 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block px-3 py-1 rounded bg-ocean-blue/10 border border-ocean-blue/20 text-xs font-mono font-bold text-ocean-blue uppercase tracking-widest">
                RESEARCH PHILOSOPHY &amp; AUTONOMY
              </div>

              <h2 className="text-3xl sm:text-5xl font-heading font-black text-[#061B2B] tracking-tight leading-tight">
                EXPLORING BEYOND <br />
                <span className="text-ocean-blue">THE VISIBLE.</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed font-sans">
                The subsea domain presents unique operational constraints: complete loss of GPS positioning, severe light attenuation beyond shallow depths, and turbulent marine currents. Developing an autonomous vehicle capable of conducting meaningful scientific research and subsea inspection requires an uncompromising integration of structural mechanics, deterministic flight controls, and embedded edge intelligence.
              </p>

              <p className="text-base text-slate-600 leading-relaxed font-sans">
                TRITON was engineered by Team Triton to meet these challenges directly. Combining an eight-thruster holonomic configuration with an onboard neural vision system and multi-sensor telemetry, the platform executes stable station-keeping, precision waypoint navigation, and autonomous subsea interventions.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3 rounded-xl bg-[#061B2B] text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-ocean-midnight transition-colors flex items-center space-x-2 shadow"
                >
                  <span>ABOUT TEAM TRITON</span>
                  <ArrowRight className="w-4 h-4 text-ocean-cyan" />
                </button>

                <button
                  onClick={() => onNavigate('engineering')}
                  className="px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-heading font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors flex items-center space-x-2 shadow-sm"
                >
                  <span>ENGINEERING ARCHITECTURE</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Right Visual Column (Clean Technical Poster Graphic) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white p-3 shadow-xl">
                <img 
                  src="/assets/images/poster/triton_project_poster.png" 
                  alt="TRITON Autonomous Robotic Platform Architecture" 
                  className="w-full h-auto rounded-xl object-contain max-h-[460px] mx-auto hover:scale-105 transition-transform duration-500"
                />
                <div className="pt-3 px-2 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="font-heading font-bold text-slate-800 uppercase">SUBSEA ROBOTIC ARCHITECTURE</span>
                  <span className="text-slate-500 font-mono text-[11px]">TRITON AUV · TEAM TRITON</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 2 — BUILT FOR EXPLORATION (3 CORE PILLARS IN CLEAN WHITE)
          Gillian Jack Style: Clean 3-card minimalist grid, clear typography
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-12 bg-white text-slate-800 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-ocean-blue uppercase tracking-widest">
              MISSION DOMAINS
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-[#061B2B]">
              BUILT FOR EXPLORATION
            </h2>
            <p className="text-base text-slate-500">
              Purpose-built capabilities designed for shallow, coastal, and offshore marine environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Underwater Inspection */}
            <div 
              onClick={() => onNavigate('missions')}
              className="rounded-2xl p-8 border border-slate-200 bg-[#F8FAFC] hover:border-ocean-blue hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-ocean-blue/10 border border-ocean-blue/20 flex items-center justify-center text-ocean-blue group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-ocean-blue" />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900 group-hover:text-ocean-blue transition-colors">
                  Underwater Inspection
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Autonomous non-destructive inspection of harbor berths, offshore oil &amp; gas foundations, subsea pipelines, and vessel hulls with real-time distance station-keeping.
                </p>
              </div>

              <div className="pt-8 flex items-center space-x-2 text-xs font-heading font-bold text-ocean-blue group-hover:translate-x-1 transition-transform">
                <span>VIEW INSPECTION MISSIONS</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 2: Intelligent Exploration */}
            <div 
              onClick={() => onNavigate('control')}
              className="rounded-2xl p-8 border border-slate-200 bg-[#F8FAFC] hover:border-ocean-blue hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-ocean-blue/10 border border-ocean-blue/20 flex items-center justify-center text-ocean-blue group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6 text-ocean-blue" />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900 group-hover:text-ocean-blue transition-colors">
                  Intelligent Exploration
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Dead-reckoning navigation fused with acoustic hydrophone localization, Bar30 depth telemetry, and dynamic obstacle clearance across complex coastal bathymetry.
                </p>
              </div>

              <div className="pt-8 flex items-center space-x-2 text-xs font-heading font-bold text-ocean-blue group-hover:translate-x-1 transition-transform">
                <span>DISCOVER AUTONOMY SUITE</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 3: Object Identification and Retrieval */}
            <div 
              onClick={() => onNavigate('vision-ai')}
              className="rounded-2xl p-8 border border-slate-200 bg-[#F8FAFC] hover:border-ocean-gold hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Object Identification &amp; Retrieval
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Subsea object recognition and targeted payload manipulation powered by onboard YOLOv11 neural inference, optical contrast filtering, and robotic gripper mounting.
                </p>
              </div>

              <div className="pt-8 flex items-center space-x-2 text-xs font-heading font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
                <span>EXPLORE VISION &amp; AI</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 3 — 3D SCROLL-DRIVEN PRODUCT TOUR & INTERACTIVE INSPECTION
          7-Scene Coordinated Narrative Presentation
          ========================================================================= */}
      <section id="tour-section" className="relative w-full bg-[#061B2B]">
        <ScrollTritonTour onNavigate={onNavigate} />
      </section>


      {/* =========================================================================
          SECTION 4 — ENGINEERING IN MOTION (STORYTELLING ARCHITECTURE)
          Editorial 4-column presentation without numerical spec cards
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-12 bg-[#EFF8FC] text-slate-800 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-ocean-blue uppercase tracking-widest">
              SYSTEMS ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-[#061B2B]">
              ENGINEERING IN MOTION
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Every subsystem has been engineered to deliver hydrodynamic stability, responsive actuation, and uninterrupted mission autonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Subsystem 1: Propulsion */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-ocean-blue/10 border border-ocean-blue/20 flex items-center justify-center text-ocean-blue">
                <Zap className="w-5 h-5 text-ocean-blue" />
              </div>
              <h4 className="text-lg font-heading font-bold text-slate-900">
                6-DOF Propulsion
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                4 vectored horizontal thrusters deliver agile planar surge, sway, and yaw, coupled with 4 vertical thrusters for true hover, pitch, and heave depth control.
              </p>
            </div>

            {/* Subsystem 2: Embedded Compute */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-ocean-blue/10 border border-ocean-blue/20 flex items-center justify-center text-ocean-blue">
                <Cpu className="w-5 h-5 text-ocean-blue" />
              </div>
              <h4 className="text-lg font-heading font-bold text-slate-900">
                Dual-Tier Avionics
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pixhawk 2.4.8 executes hard real-time motor PID loops and stabilization, while an NVIDIA Jetson Orin Nano manages mission autonomy and neural perception.
              </p>
            </div>

            {/* Subsystem 3: Marine Sensing */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600">
                <Compass className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="text-lg font-heading font-bold text-slate-900">
                Subsea Telemetry
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Attitude and depth tracking via Bar30 subsea pressure transducers, 9-DOF IMU sensor fusion, and acoustic hydrophone array beacon triangulation.
              </p>
            </div>

            {/* Subsystem 4: Skeletal Enclosure */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600">
                <Layers className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="text-lg font-heading font-bold text-slate-900">
                Skeletal Chassis
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Anodized marine aluminum truss framing securely protects the central optical pressure vessel while enabling modular scientific payload mounting.
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('engineering')}
              className="px-8 py-3.5 rounded-xl bg-[#061B2B] hover:bg-ocean-midnight text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center space-x-2 shadow-lg"
            >
              <span>EXPLORE COMPLETE ENGINEERING PORTFOLIO</span>
              <ArrowRight className="w-4 h-4 text-ocean-cyan" />
            </button>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 5 — NEURAL VISION UNDERWATER (YOLOV11 EDGE PIPELINE)
          Technical visual showcase with live telemetry mockup
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-12 bg-white text-slate-800 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left AI Description */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block px-3 py-1 rounded bg-ocean-blue/10 border border-ocean-blue/20 text-xs font-mono font-bold text-ocean-blue uppercase tracking-widest">
                EDGE COMPUTER VISION
              </div>

              <h2 className="text-3xl sm:text-5xl font-heading font-black text-[#061B2B] tracking-tight leading-tight">
                NEURAL VISION <br />
                <span className="text-ocean-blue">UNDERWATER.</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed font-sans">
                Subsea optical detection encounters severe environmental degradation: turbidity, particle backscatter, non-uniform ambient light, and wavelength-dependent chromatic absorption. TRITON incorporates an edge-optimized deep learning pipeline powered by YOLOv11 and accelerated on NVIDIA Jetson Orin Nano hardware.
              </p>

              {/* 3-Step Horizontal / Stacked Pipeline */}
              <div className="space-y-3 pt-1">
                <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <span className="w-7 h-7 rounded-lg bg-ocean-blue text-white flex items-center justify-center text-xs font-bold shrink-0">1</span>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">Subsea Optical Intake</h5>
                    <p className="text-xs text-slate-500">Low-latency video stream captured via forward-mounted optical aperture.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <span className="w-7 h-7 rounded-lg bg-ocean-blue text-white flex items-center justify-center text-xs font-bold shrink-0">2</span>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">CLAHE Contrast Enhancement</h5>
                    <p className="text-xs text-slate-500">Adaptive histogram equalization to cut through turbidity and restore underwater contrast.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <span className="w-7 h-7 rounded-lg bg-ocean-blue text-white flex items-center justify-center text-xs font-bold shrink-0">3</span>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">YOLOv11 TensorRT Edge Inference</h5>
                    <p className="text-xs text-slate-500">Real-time object classification and bounding vector calculation at 30+ frames per second.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('vision-ai')}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-ocean-cyan to-ocean-aqua text-ocean-deep font-heading font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all inline-flex items-center space-x-2"
                >
                  <span>TEST AI DETECTION BENCHMARK</span>
                  <ArrowRight className="w-4 h-4 text-ocean-deep" />
                </button>
              </div>
            </div>

            {/* Right Telemetry Terminal Preview */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-800 bg-[#061B2B] p-5 shadow-2xl text-white space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-xs font-mono text-ocean-aqua font-bold ml-2">TRITON_JETSON_ORIN_AI</span>
                  </div>
                  <span className="text-[10px] font-mono text-green-400 font-bold">FP16 · 32 FPS</span>
                </div>

                {/* Subsea HUD Mockup */}
                <div className="relative rounded-xl overflow-hidden bg-ocean-deep aspect-video flex items-center justify-center border border-ocean-blue/30">
                  <img 
                    src="/assets/images/triton_engineering_drawing.png" 
                    alt="Vision Intake Feed" 
                    className="absolute inset-0 w-full h-full object-cover opacity-25 filter brightness-75"
                  />

                  <div className="relative z-10 border-2 border-ocean-cyan bg-ocean-cyan/20 rounded-lg p-3 w-3/4 max-w-xs shadow-lg shadow-ocean-cyan/20 animate-pulse">
                    <div className="flex items-center justify-between text-xs font-mono text-white font-bold">
                      <span className="text-ocean-cyan">TARGET: DOCKING_RING</span>
                      <span className="text-green-400">94.8%</span>
                    </div>
                    <div className="text-[10px] font-mono text-ocean-ice/80 pt-1 space-y-0.5">
                      <div>BEARING: +12.4° AZIMUTH</div>
                      <div>EST. DISTANCE: 3.12 METERS</div>
                      <div>FILTER: CLAHE ADAPTIVE</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-white/70 pt-1">
                  <div className="p-2 rounded bg-ocean-midnight/80 border border-white/5">
                    <span className="block text-white/50">ENGINE</span>
                    <span className="text-white font-bold">TensorRT 10.x</span>
                  </div>
                  <div className="p-2 rounded bg-ocean-midnight/80 border border-white/5">
                    <span className="block text-white/50">LATENCY</span>
                    <span className="text-ocean-cyan font-bold">18.4 ms</span>
                  </div>
                  <div className="p-2 rounded bg-ocean-midnight/80 border border-white/5">
                    <span className="block text-white/50">TRACKING</span>
                    <span className="text-green-400 font-bold">AUTONOMOUS</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 6 — MISSION CAPABILITIES (CLEAN GRID)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-12 bg-[#F8FAFC] text-slate-800 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-ocean-blue uppercase tracking-widest">
              OPERATIONAL PROFILES
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-[#061B2B]">
              MISSION CAPABILITIES
            </h2>
            <p className="text-base text-slate-600">
              Engineered for demanding underwater operations across scientific research, marine safety, and civil infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Harbor & Port Security',
                desc: 'Autonomous patrol of harbor walls, pier foundations, and submerged berthing infrastructure.',
                tag: 'SURVEYING'
              },
              {
                title: 'Marine Ecological Surveys',
                desc: 'Non-invasive coral reef imaging, benthic ecosystem mapping, and environmental water telemetry.',
                tag: 'CONSERVATION'
              },
              {
                title: 'Pipeline & Cable Tracking',
                desc: 'Subsea umbilical and conduit tracking with automatic anomaly detection and optical logging.',
                tag: 'INFRASTRUCTURE'
              },
              {
                title: 'Subsea Object Retrieval',
                desc: 'Acoustic homing onto submerged flight recorders, transponders, and targeted payload recovery.',
                tag: 'RECOVERY'
              }
            ].map((m, idx) => (
              <div 
                key={idx}
                onClick={() => onNavigate('missions')}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-ocean-blue hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold text-ocean-blue bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {m.tag}
                  </span>
                  <h4 className="text-lg font-heading font-bold text-slate-900 group-hover:text-ocean-blue transition-colors">
                    {m.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-6 flex items-center space-x-1.5 text-xs font-heading font-bold text-ocean-blue group-hover:translate-x-1 transition-transform">
                  <span>View Mission Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 7 — STRATEGIC COLLABORATION & SPONSORSHIP
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-12 bg-white text-slate-800 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="rounded-3xl bg-gradient-to-r from-[#061B2B] via-[#092C46] to-[#04121E] text-white p-8 sm:p-14 shadow-2xl border border-ocean-blue/30">
            <div className="max-w-3xl space-y-6">
              <span className="text-xs font-mono font-bold text-ocean-gold uppercase tracking-widest inline-block">
                STRATEGIC COLLABORATION
              </span>

              <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight leading-tight">
                BE PART OF THE NEXT WAVE OF UNDERWATER INNOVATION.
              </h2>

              <p className="text-base text-ocean-ice/80 leading-relaxed font-sans">
                Join Team Triton in advancing intelligent underwater robotics through engineering collaboration, technical support, and sponsorship.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('sponsorship')}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-ocean-gold to-yellow-500 text-ocean-deep font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-ocean-gold/25 hover:brightness-110 transition-all flex items-center space-x-2"
                >
                  <span>PARTNER WITH TRITON</span>
                  <Award className="w-4 h-4 text-ocean-deep" />
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-3.5 rounded-xl bg-ocean-midnight/80 border border-white/20 text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-ocean-blue/30 transition-all flex items-center space-x-2"
                >
                  <span>CONTACT TEAM DIRECTLY</span>
                  <ArrowRight className="w-4 h-4 text-ocean-cyan" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 8 — CONTACT & DIRECT LEADERSHIP
          Gillian Jack Style: Clean, direct contact card with phone and WhatsApp
          ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-[#EFF8FC] text-slate-800">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-md">
            
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-ocean-blue uppercase tracking-widest">
                GET IN TOUCH
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#061B2B]">
                CONNECT WITH TEAM TRITON
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-md">
                We welcome dialogue with marine technology organizations, corporate partners, and research collaborators.
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-6 rounded-xl border border-slate-200 space-y-4">
              <div>
                <span className="text-[11px] font-bold text-amber-600 tracking-widest uppercase">
                  PRIMARY POINT OF CONTACT
                </span>
                <div className="text-2xl font-heading font-black text-slate-900 mt-1">
                  ASHOK
                </div>
                <p className="text-xs text-slate-500">
                  Team Triton · Autonomous Underwater Vehicle Project
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="tel:+919884469962"
                  className="px-5 py-2.5 rounded-xl bg-[#061B2B] text-white font-heading font-bold text-xs uppercase tracking-wider shadow hover:bg-ocean-midnight transition-colors flex items-center space-x-2"
                >
                  <Phone className="w-4 h-4 text-ocean-cyan" />
                  <span>+91 98844 69962</span>
                </a>

                <a
                  href="https://wa.me/919884469962?text=Hello%20Team%20Triton%20AUV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-green-600 text-white font-heading font-bold text-xs uppercase tracking-wider shadow hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>WHATSAPP CHAT</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
