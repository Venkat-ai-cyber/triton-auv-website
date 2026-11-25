import React, { useState } from 'react';
import { PageRoute } from '../types';
import { ScrollTritonTour } from '../components/3d/ScrollTritonTour';
import { TritonViewer } from '../components/3d/TritonViewer';
import { 
  ArrowRight, 
  Cpu, 
  Award, 
  Compass, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  ChevronDown,
  Layers,
  Zap,
  Target,
  Copy,
  Check,
  Eye
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const scrollToTour = () => {
    const el = document.getElementById('tour-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+91 98844 69962').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <div className="space-y-0 text-[#172832] selection:bg-[#14A9A0] selection:text-white font-sans">
      
      {/* =========================================================================
          SECTION 1: HERO – MEET TRITON (PEARL WHITE / GLACIER BLUE)
          ========================================================================= */}
      <section className="relative min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-12 py-12 bg-gradient-to-br from-[#F5F8F8] via-[#E8F1F3] to-[#EDF3F4] ocean-grid-bg border-b border-[#B9C7CC]/50 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          
          {/* Left Column: Editorial Brand & Product Presentation */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#087F83]/25 text-xs font-mono text-[#087F83] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#14A9A0] animate-pulse"></span>
              <span className="font-heading font-bold tracking-widest text-[#172832] uppercase">TRITON</span>
              <span className="text-[#B9C7CC]">|</span>
              <span className="font-semibold text-[#087F83]">TEAM TRITON</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-bold tracking-tight text-[#172832] leading-[0.95]">
                MEET TRITON.
              </h1>
              <p className="text-sm sm:text-base font-mono font-bold tracking-[0.22em] text-[#087F83] uppercase pt-1">
                AUTONOMOUS UNDERWATER VEHICLE
              </p>
            </div>

            <p className="text-base sm:text-lg text-[#163C4B] leading-relaxed font-normal max-w-xl">
              Engineered to explore, inspect, and operate beneath the surface.
            </p>

            <p className="text-sm text-[#163C4B]/80 leading-relaxed max-w-xl">
              Built around an authentic multi-thruster hydro-mechanical frame, dual-tier embedded autonomy, and edge neural perception—crafted by Team Triton for subsea inspection, surveying, and object retrieval.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={scrollToTour}
                className="px-7 py-3.5 rounded-xl bg-[#087F83] hover:bg-[#163C4B] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#087F83]/20 transition-all flex items-center space-x-2"
              >
                <span>EXPLORE THE VEHICLE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('engineering')}
                className="px-6 py-3.5 rounded-xl bg-white border border-[#B9C7CC] text-[#172832] font-heading font-bold text-xs uppercase tracking-wider hover:border-[#087F83] hover:text-[#087F83] transition-all flex items-center space-x-2 shadow-sm"
              >
                <span>DISCOVER ENGINEERING</span>
                <Cpu className="w-4 h-4 text-[#087F83]" />
              </button>
            </div>

            <div 
              onClick={scrollToTour}
              className="pt-4 inline-flex items-center space-x-2 text-xs font-mono text-[#087F83] cursor-pointer hover:text-[#163C4B] transition-colors"
            >
              <span>SCROLL FOR GUIDED 3D PRODUCT TOUR</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </div>
          </div>

          {/* Right Column: Authentic ER.STEP 3D CAD Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden border border-[#B9C7CC]/70 shadow-2xl bg-[#132630] p-1.5">
              <TritonViewer 
                className="h-[440px] sm:h-[520px] w-full" 
                showControlsBar={true} 
                darkBackdrop={true}
                cursorParallax={true}
              />
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 2: EXPLORE THE VEHICLE (GUIDED 3D PRODUCT JOURNEY)
          ========================================================================= */}
      <section id="tour-section" className="relative w-full bg-[#172832]">
        <ScrollTritonTour onNavigate={onNavigate} />
      </section>


      {/* =========================================================================
          SECTION 3: DESIGNED FOR EXPLORATION (3 VISUAL CATEGORIES)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-12 bg-[#F5F8F8] border-b border-[#B9C7CC]/50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14 space-y-3">
            <span className="text-xs font-mono font-bold text-[#087F83] uppercase tracking-widest">
              OPERATIONAL PURPOSE
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#172832]">
              DESIGNED FOR EXPLORATION
            </h2>
            <p className="text-base text-[#163C4B]/80">
              Built for real-world underwater missions where precision maneuvering, sensing, and visual intelligence converge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              onClick={() => onNavigate('missions')}
              className="rounded-2xl p-8 border border-[#B9C7CC]/60 bg-white hover:border-[#087F83] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#E8F1F3] border border-[#087F83]/20 flex items-center justify-center text-[#087F83] group-hover:bg-[#087F83] group-hover:text-white transition-colors">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-bold text-[#172832]">
                  Underwater Inspection
                </h3>
                <p className="text-sm text-[#163C4B]/80 leading-relaxed">
                  Stabilized subsea inspection of hulls, port infrastructure, submerged conduits, and marine structures with controlled station-keeping.
                </p>
              </div>
              <div className="pt-8 flex items-center space-x-2 text-xs font-mono font-bold text-[#087F83] group-hover:translate-x-1 transition-transform">
                <span>EXPLORE INSPECTION</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div 
              onClick={() => onNavigate('control')}
              className="rounded-2xl p-8 border border-[#B9C7CC]/60 bg-white hover:border-[#14A9A0] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#E8F1F3] border border-[#14A9A0]/25 flex items-center justify-center text-[#14A9A0] group-hover:bg-[#14A9A0] group-hover:text-white transition-colors">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-bold text-[#172832]">
                  Intelligent Exploration
                </h3>
                <p className="text-sm text-[#163C4B]/80 leading-relaxed">
                  Autonomous navigation and depth-hold stabilization combining inertial, pressure, magnetic, and acoustic hydrophone telemetry.
                </p>
              </div>
              <div className="pt-8 flex items-center space-x-2 text-xs font-mono font-bold text-[#087F83] group-hover:translate-x-1 transition-transform">
                <span>EXPLORE AUTONOMY</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div 
              onClick={() => onNavigate('vision-ai')}
              className="rounded-2xl p-8 border border-[#B9C7CC]/60 bg-white hover:border-[#D98B73] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#D98B73]/15 border border-[#D98B73]/30 flex items-center justify-center text-[#D98B73] group-hover:bg-[#D98B73] group-hover:text-white transition-colors">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-bold text-[#172832]">
                  Object Identification &amp; Retrieval
                </h3>
                <p className="text-sm text-[#163C4B]/80 leading-relaxed">
                  Real-time subsea object detection, visual alignment, and targeted payload recovery guided by onboard edge AI inference.
                </p>
              </div>
              <div className="pt-8 flex items-center space-x-2 text-xs font-mono font-bold text-[#D98B73] group-hover:translate-x-1 transition-transform">
                <span>EXPLORE VISION &amp; AI</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 4: ENGINEERING EXCELLENCE (GLACIER BLUE)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-12 bg-[#E8F1F3] border-b border-[#B9C7CC]/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono font-bold text-[#087F83] uppercase tracking-widest">
                SYSTEMS ARCHITECTURE
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#172832]">
                ENGINEERING EXCELLENCE
              </h2>
              <p className="text-base text-[#163C4B]/85 leading-relaxed">
                Every subsystem of TRITON is engineered as an integrated marine platform—balancing hydrodynamic agility, watertight structural protection, deterministic flight control, and multi-modal subsea perception.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-5 rounded-xl border border-[#B9C7CC]/60 space-y-2">
                  <Zap className="w-5 h-5 text-[#087F83]" />
                  <h4 className="font-heading font-bold text-[#172832]">Propulsion Architecture</h4>
                  <p className="text-xs text-[#163C4B]/80 leading-relaxed">
                    Vectored horizontal thrusters paired with dedicated vertical thrusters for full-attitude underwater maneuvering.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-[#B9C7CC]/60 space-y-2">
                  <Layers className="w-5 h-5 text-[#087F83]" />
                  <h4 className="font-heading font-bold text-[#172832]">Structural Design</h4>
                  <p className="text-xs text-[#163C4B]/80 leading-relaxed">
                    CNC-profiled side truss frame protecting the central acrylic pressure vessel and upper syntactic buoyancy pods.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-[#14A9A0] space-y-2">
                  <Cpu className="w-5 h-5 text-[#14A9A0]" />
                  <h4 className="font-heading font-bold text-[#172832]">Control Systems</h4>
                  <p className="text-xs text-[#163C4B]/80 leading-relaxed">
                    Pixhawk 2.4.8 running ArduSub for real-time stabilization coupled with an NVIDIA Jetson Orin Nano companion computer.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-[#D98B73]/50 space-y-2">
                  <Compass className="w-5 h-5 text-[#D98B73]" />
                  <h4 className="font-heading font-bold text-[#172832]">Sensing Architecture</h4>
                  <p className="text-xs text-[#163C4B]/80 leading-relaxed">
                    ICM-20948 IMU, Bar30 depth transducer, RM3100 magnetometer, leak/temperature monitoring, and three-hydrophone array.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('engineering')}
                  className="px-7 py-3.5 rounded-xl bg-[#172832] hover:bg-[#087F83] text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center space-x-2 shadow"
                >
                  <span>VIEW FULL TECHNICAL SPECIFICATIONS</span>
                  <ArrowRight className="w-4 h-4 text-[#66D4CF]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#B9C7CC] bg-white p-3 shadow-xl">
                <img 
                  src="/assets/images/poster/triton_project_poster.png" 
                  alt="TRITON Autonomous Underwater Vehicle Technical Overview" 
                  className="w-full h-auto rounded-xl object-contain max-h-[460px] mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 5: INTELLIGENT VISION (YOLOV11 + OPENCV PIPELINE)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-12 bg-[#F5F8F8] border-b border-[#B9C7CC]/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-mono font-bold text-[#087F83] uppercase tracking-widest">
              INTELLIGENT VISION
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#172832]">
              PERCEPTION BENEATH THE SURFACE
            </h2>
            <p className="text-base text-[#163C4B]/85 leading-relaxed">
              Underwater environments distort colour, contrast, and visibility. TRITON combines OpenCV optical pre-processing with YOLOv11 neural inference to identify targets and inform autonomous mission decisions.
            </p>

            <div className="space-y-2.5 pt-1">
              {[
                { step: '01', title: 'Camera Input', desc: 'Forward optical stream captured in real time.' },
                { step: '02', title: 'Image Processing (OpenCV)', desc: 'CLAHE adaptive contrast enhancement & White Balance Correction.' },
                { step: '03', title: 'YOLOv11 Inference', desc: 'Edge object detection accelerated on NVIDIA Jetson Orin Nano.' },
                { step: '04', title: 'Mission Decisions', desc: 'Target alignment and trajectory commands sent to ArduSub.' }
              ].map((item) => (
                <div key={item.step} className="flex items-start space-x-3 p-3.5 rounded-xl bg-white border border-[#B9C7CC]/60">
                  <span className="px-2 py-1 rounded bg-[#087F83] text-white font-mono text-xs font-bold shrink-0">{item.step}</span>
                  <div>
                    <h5 className="text-sm font-heading font-bold text-[#172832]">{item.title}</h5>
                    <p className="text-xs text-[#163C4B]/75">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('vision-ai')}
                className="px-7 py-3.5 rounded-xl bg-[#087F83] hover:bg-[#163C4B] text-white font-heading font-bold text-xs uppercase tracking-wider shadow transition-all inline-flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>EXPLORE AI &amp; YOLOV11 PIPELINE</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-[#172832]/20 bg-[#172832] p-5 shadow-2xl text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-[#66D4CF] font-bold">
                  YOLOv11 PERCEPTION SEQUENCE
                </span>
                <span className="px-2 py-0.5 rounded bg-[#D98B73]/20 border border-[#D98B73]/50 text-[10px] font-mono text-[#D98B73] font-bold">
                  DEMONSTRATION OVERLAY
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden bg-[#132630] aspect-video flex items-center justify-center border border-[#66D4CF]/25">
                <img 
                  src="/assets/images/underwater_gate_real.png" 
                  alt="Underwater Vision Pipeline Demonstration" 
                  className="absolute inset-0 w-full h-full object-cover opacity-65"
                />
                <div className="relative z-10 border-2 border-[#66D4CF] bg-[#172832]/75 backdrop-blur-sm rounded-lg p-3 w-64">
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#66D4CF]">
                    <span>ILLUSTRATIVE TARGET</span>
                    <span>DEMO</span>
                  </div>
                  <div className="text-[10px] font-mono text-[#E8F1F3] pt-1">
                    Pipeline: CLAHE + White Balance → YOLOv11
                  </div>
                </div>
              </div>

              <p className="text-[11px] font-mono text-[#B9C7CC]">
                Note: Illustrative detection overlay shown for architecture demonstration; live model outputs are displayed only when connected to onboard inference hardware.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 6: MISSION CAPABILITIES (SOFT MIST)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-12 bg-[#EDF3F4] border-b border-[#B9C7CC]/50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14 space-y-3">
            <span className="text-xs font-mono font-bold text-[#087F83] uppercase tracking-widest">
              FIELD APPLICATIONS
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#172832]">
              MISSION CAPABILITIES
            </h2>
            <p className="text-base text-[#163C4B]/80">
              Inspection, autonomous surveying, and targeted object retrieval across coastal and offshore environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tag: 'INSPECTION',
                title: 'Subsea Infrastructure & Hull Inspection',
                desc: 'Close-range visual diagnostics of harbor walls, submerged pipelines, and offshore structures.'
              },
              {
                tag: 'SURVEYING',
                title: 'Autonomous Acoustic & Visual Surveying',
                desc: 'Waypoint-guided underwater transects with synchronized depth, IMU, and optical logging.'
              },
              {
                tag: 'RETRIEVAL',
                title: 'Object Identification & Retrieval',
                desc: 'Acoustic pinger homing and YOLOv11 visual target tracking for autonomous recovery operations.'
              }
            ].map((m) => (
              <div 
                key={m.tag}
                onClick={() => onNavigate('missions')}
                className="bg-white p-7 rounded-2xl border border-[#B9C7CC]/60 hover:border-[#087F83] hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold text-[#087F83] bg-[#E8F1F3] px-2.5 py-1 rounded">
                    {m.tag}
                  </span>
                  <h4 className="text-lg font-heading font-bold text-[#172832] group-hover:text-[#087F83] transition-colors">
                    {m.title}
                  </h4>
                  <p className="text-sm text-[#163C4B]/80 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
                <div className="pt-6 flex items-center space-x-1.5 text-xs font-mono font-bold text-[#087F83]">
                  <span>VIEW MISSION PROFILE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 7: PARTNER WITH TRITON
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-12 bg-[#F5F8F8] border-b border-[#B9C7CC]/50">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-r from-[#172832] via-[#163C4B] to-[#0E2833] text-white p-8 sm:p-14 shadow-2xl border border-[#087F83]/40">
            <div className="max-w-3xl space-y-6">
              <span className="text-xs font-mono font-bold text-[#66D4CF] uppercase tracking-widest inline-block">
                SPONSORSHIP &amp; COLLABORATION
              </span>

              <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight leading-tight">
                ENGINEER THE FUTURE BENEATH THE SURFACE.
              </h2>

              <p className="text-base text-[#E8F1F3]/85 leading-relaxed">
                Join Team Triton in advancing underwater robotics through technical collaboration, hardware support, research, and engineering innovation.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('sponsorship')}
                  className="px-8 py-3.5 rounded-xl bg-[#14A9A0] hover:bg-[#087F83] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center space-x-2"
                >
                  <span>DISCUSS A PARTNERSHIP</span>
                  <Award className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-3.5 rounded-xl bg-white/10 border border-white/25 text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-all flex items-center space-x-2"
                >
                  <span>CONTACT TEAM TRITON</span>
                  <ArrowRight className="w-4 h-4 text-[#66D4CF]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 8: CONTACT (ASHOK – +91 98844 69962)
          ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-[#E8F1F3]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl border border-[#B9C7CC]/70 p-8 sm:p-12 shadow-md">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-[#087F83] uppercase tracking-widest">
                DIRECT CONTACT
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#172832]">
                CONNECT WITH TEAM TRITON
              </h3>
              <p className="text-sm text-[#163C4B]/80 leading-relaxed max-w-md">
                Reach out directly for technical collaboration, sponsorship inquiries, or engineering demonstrations.
              </p>
            </div>

            <div className="bg-[#F5F8F8] p-6 rounded-xl border border-[#B9C7CC]/60 space-y-4">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#D98B73] tracking-widest uppercase">
                  POINT OF CONTACT
                </span>
                <div className="text-2xl font-heading font-bold text-[#172832] mt-1">
                  ASHOK
                </div>
                <p className="text-xs font-mono text-[#163C4B]/80 pt-0.5">
                  +91 98844 69962 · Team Triton
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-1">
                <a
                  href="tel:+919884469962"
                  className="px-4 py-2.5 rounded-xl bg-[#087F83] hover:bg-[#163C4B] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-sm transition-colors flex items-center space-x-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call +91 98844 69962</span>
                </a>

                <a
                  href="https://wa.me/919884469962"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-sm transition-colors flex items-center space-x-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={handleCopyPhone}
                  className="px-4 py-2.5 rounded-xl bg-white border border-[#B9C7CC] hover:border-[#087F83] text-[#172832] font-mono font-bold text-xs transition-colors flex items-center space-x-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#087F83]" />}
                  <span>{copied ? 'Copied' : 'Copy Number'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
