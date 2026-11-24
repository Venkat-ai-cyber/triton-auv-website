import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Compass, 
  RotateCw, 
  Maximize2, 
  Minimize2, 
  Layers, 
  Eye, 
  ArrowRight, 
  ChevronDown, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Award,
  Sparkles,
  HelpCircle,
  Crosshair,
  Sliders,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { PageRoute } from '../../types';

interface ScrollTritonTourProps {
  onNavigate: (page: PageRoute) => void;
}

export type ComponentHighlight = 'all' | 'propulsion' | 'hull' | 'frame' | 'buoyancy';

interface SceneConfig {
  id: number;
  badge: string;
  title: string;
  description: string;
  camPos: [number, number, number];
  targetPos: [number, number, number];
  highlight: ComponentHighlight;
  callouts?: { title: string; desc: string; pos: string }[];
}

const SCENES: SceneConfig[] = [
  {
    id: 0,
    badge: 'PHASE 01 · SYSTEM INTRODUCTION',
    title: 'MEET TRITON.',
    description: 'An underwater robotic platform designed to explore and operate beneath the surface with precision propulsion, intelligent perception, and robust subsea endurance.',
    camPos: [0.72, 0.35, 0.72],
    targetPos: [0, 0, 0],
    highlight: 'all',
    callouts: [
      { title: 'Full Assembly', desc: '458 × 363 × 231 mm physical envelope', pos: 'top-right' }
    ]
  },
  {
    id: 1,
    badge: 'PHASE 02 · HYDRODYNAMIC ARCHITECTURE',
    title: 'ENGINEERED FOR UNDERWATER OPERATIONS.',
    description: 'Precision hydrodynamic geometry balancing neutral buoyancy, center-of-gravity stabilization, and high payload clearance for complex subsea surveys.',
    camPos: [0.82, 0.18, 0.22],
    targetPos: [0, 0, 0],
    highlight: 'frame',
    callouts: [
      { title: 'Skeletal Chassis', desc: 'Anodized corrosion-resistant truss plates', pos: 'bottom-left' },
      { title: 'Buoyancy Balancing', desc: 'Dual upper pods ensuring upright trim', pos: 'top-right' }
    ]
  },
  {
    id: 2,
    badge: 'PHASE 03 · PROPULSION & 6-DOF DYNAMICS',
    title: 'PRECISION PROPULSION. CONTROLLED MOVEMENT.',
    description: '4 horizontal vectored thrusters delivering surge, sway, and yaw agility, matched with 4 vertical thrusters for pitch, roll, and heave depth control across 6 degrees of freedom.',
    camPos: [0.65, 0.32, 0.45],
    targetPos: [0, 0, 0],
    highlight: 'propulsion',
    callouts: [
      { title: 'Horizontal Vectored Quad', desc: '4 corner-mounted high-thrust brushless pods', pos: 'bottom-right' },
      { title: 'Vertical Quad', desc: '4 dedicated vertical thrusters for pitch & heave', pos: 'top-left' }
    ]
  },
  {
    id: 3,
    badge: 'PHASE 04 · ENCLOSURE & STRUCTURAL INTEGRITY',
    title: 'BUILT AROUND ENGINEERING PRECISION.',
    description: 'Centerline cylindrical acrylic pressure vessel protecting core avionics, flight compute, and high-discharge LiPo battery modules within an impact-absorbent structure.',
    camPos: [0.22, 0.52, 0.55],
    targetPos: [0, 0, 0],
    highlight: 'hull',
    callouts: [
      { title: 'Acrylic Pressure Vessel', desc: 'Optically clear underwater instrumentation hull', pos: 'center-right' },
      { title: 'Sealing Interfaces', desc: 'Dual O-ring modular endcap penetration ports', pos: 'bottom-center' }
    ]
  },
  {
    id: 4,
    badge: 'PHASE 05 · MULTI-MODAL TELEMETRY',
    title: 'SEE. SENSE. UNDERSTAND.',
    description: 'Integrated forward optical intake dome, Bar30 subsea pressure transducer, 9-DOF IMU, and acoustic telemetry providing high-accuracy spatial localization.',
    camPos: [0.65, 0.18, 0.15],
    targetPos: [0, 0, 0],
    highlight: 'all',
    callouts: [
      { title: 'Forward Vision Port', desc: 'Ultra-low distortion subsea camera aperture', pos: 'top-left' },
      { title: 'Depth & IMU Array', desc: 'Bar30 depth resolution & 9-axis sensor fusion', pos: 'bottom-right' }
    ]
  },
  {
    id: 5,
    badge: 'PHASE 06 · EDGE NEURAL COMPUTING',
    title: 'INTELLIGENCE BENEATH THE SURFACE.',
    description: 'Onboard NVIDIA Jetson Orin Nano running real-time YOLOv11 subsea target detection with CLAHE optical contrast filtering for turbid and low-visibility waters.',
    camPos: [0.68, 0.28, 0.32],
    targetPos: [0, 0, 0],
    highlight: 'all'
  },
  {
    id: 6,
    badge: 'PHASE 07 · OPERATIONAL READINESS',
    title: 'ENGINEERED TO EXPLORE WHAT LIES BENEATH.',
    description: 'A complete underwater robotic platform engineered for infrastructure inspection, environmental surveys, subsea object retrieval, and advanced marine research.',
    camPos: [0.78, 0.42, 0.78],
    targetPos: [0, 0, 0],
    highlight: 'all'
  }
];

// Inner 3D Model with PBR Shaders
interface ModelInnerProps {
  highlight: ComponentHighlight;
  interactiveMode: boolean;
  pulsePropulsion: boolean;
}

function AuthenticTritonModel({ highlight, interactiveMode, pulsePropulsion }: ModelInnerProps) {
  const { scene } = useGLTF('/assets/models/triton.glb');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const groupRef = useRef<THREE.Group>(null);
  const thrustersRef = useRef<THREE.Object3D[]>([]);

  useEffect(() => {
    thrustersRef.current = [];

    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const name = (child.name || child.parent?.name || '').toLowerCase();

        const isHorizontal = name.includes('horizontal');
        const isVertical = name.includes('vertical');
        const isThruster = isHorizontal || isVertical || name.includes('thruster');
        const isHull = name.includes('hull');
        const isBuoyancy = name.includes('buoyancy');
        const isFrame = name.includes('frame') || name.includes('structural');

        if (isThruster) {
          thrustersRef.current.push(child);
        }

        // Determine visibility or highlighting
        let isHighlighted = true;
        let dimFactor = 1.0;

        if (highlight === 'propulsion' && !isThruster) dimFactor = 0.22;
        if (highlight === 'hull' && !isHull) dimFactor = 0.22;
        if (highlight === 'frame' && !isFrame) dimFactor = 0.22;
        if (highlight === 'buoyancy' && !isBuoyancy) dimFactor = 0.22;

        if (isThruster) {
          const isTargetHighlight = highlight === 'propulsion' || highlight === 'all';
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(isTargetHighlight ? '#00D4FF' : '#0F344D'),
            metalness: 0.85,
            roughness: 0.25,
            emissive: new THREE.Color('#00D4FF'),
            emissiveIntensity: isTargetHighlight ? 0.35 : 0.05,
            transparent: dimFactor < 1.0,
            opacity: dimFactor
          });
        } else if (isHull) {
          const isTargetHighlight = highlight === 'hull' || highlight === 'all';
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(isTargetHighlight ? '#D4F0FC' : '#1C3A50'),
            metalness: 0.15,
            roughness: 0.1,
            transparent: true,
            opacity: isTargetHighlight ? 0.78 : 0.25
          });
        } else if (isFrame) {
          const isTargetHighlight = highlight === 'frame' || highlight === 'all';
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(isTargetHighlight ? '#D7A747' : '#1A2F40'),
            metalness: 0.9,
            roughness: 0.3,
            transparent: dimFactor < 1.0,
            opacity: dimFactor
          });
        } else if (isBuoyancy) {
          const isTargetHighlight = highlight === 'buoyancy' || highlight === 'all';
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(isTargetHighlight ? '#26E6D1' : '#0B2C3D'),
            metalness: 0.4,
            roughness: 0.4,
            transparent: dimFactor < 1.0,
            opacity: dimFactor
          });
        } else {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#087EAB'),
            metalness: 0.7,
            roughness: 0.35,
            transparent: dimFactor < 1.0,
            opacity: dimFactor
          });
        }
      }
    });
  }, [clonedScene, highlight]);

  // Subtle natural buoyancy heave and thruster pulse
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!interactiveMode && groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.012;
      groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.015;
    }

    if (pulsePropulsion) {
      thrustersRef.current.forEach((mesh: any) => {
        if (mesh.material && mesh.material.emissiveIntensity !== undefined) {
          mesh.material.emissiveIntensity = 0.3 + Math.sin(t * 5.0) * 0.25;
        }
      });
    }
  });

  return (
    <group ref={groupRef} scale={[1, 1, 1]} position={[0, 0, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

// Marine Ambient Particles
function MarineAtmosphere() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 90;

  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 4;
      pos[i + 1] = (Math.random() - 0.5) * 3;
      pos[i + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  });

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      const arr = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < count * 3; i += 3) {
        arr[i] += delta * 0.05;
        if (arr[i] > 1.8) arr[i] = -1.8;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#26E6D1"
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Camera Controller that lerps based on scene configuration
interface CameraRigProps {
  currentScene: SceneConfig;
  interactiveMode: boolean;
}

function CameraRig({ currentScene, interactiveMode }: CameraRigProps) {
  const targetCam = useRef(new THREE.Vector3(...currentScene.camPos));
  const targetLook = useRef(new THREE.Vector3(...currentScene.targetPos));

  useEffect(() => {
    targetCam.current.set(...currentScene.camPos);
    targetLook.current.set(...currentScene.targetPos);
  }, [currentScene]);

  useFrame(({ camera }) => {
    if (!interactiveMode) {
      camera.position.lerp(targetCam.current, 0.065);
      camera.lookAt(targetLook.current);
    }
  });

  return null;
}

// Canvas Fallback
function CanvasLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center space-y-3 bg-ocean-midnight/90 backdrop-blur-md px-6 py-4 rounded-xl border border-ocean-cyan/30 text-center">
        <div className="w-10 h-10 border-4 border-ocean-blue border-t-ocean-cyan rounded-full animate-spin"></div>
        <div className="text-xs font-bold text-white tracking-wider">
          LOADING AUTHENTIC CAD GEOMETRY
        </div>
        <div className="text-[10px] text-ocean-aqua">
          174 precision components · 8 thrusters · 6-DOF
        </div>
      </div>
    </Html>
  );
}

export const ScrollTritonTour: React.FC<ScrollTritonTourProps> = ({ onNavigate }) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [interactiveMode, setInteractiveMode] = useState(false);
  const [inspectHighlight, setInspectHighlight] = useState<ComponentHighlight>('all');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeScene = SCENES[activeSceneIndex];
  const currentHighlight = interactiveMode ? inspectHighlight : activeScene.highlight;

  // Handle scroll progress across scenes
  useEffect(() => {
    if (interactiveMode) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
      
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      const sceneIdx = Math.min(SCENES.length - 1, Math.floor(progress * SCENES.length));
      
      if (sceneIdx !== activeSceneIndex) {
        setActiveSceneIndex(sceneIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSceneIndex, interactiveMode]);

  // Jump to specific scene
  const jumpToScene = (idx: number) => {
    setActiveSceneIndex(idx);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
    const targetOffset = (idx / (SCENES.length - 1)) * totalScrollable;
    const topOfContainer = rect.top + scrollTop;
    
    window.scrollTo({
      top: topOfContainer + targetOffset + 5,
      behavior: 'smooth'
    });
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const componentButtons: { id: ComponentHighlight; label: string; desc: string }[] = [
    { id: 'all', label: 'Complete Vehicle', desc: 'Holonomic 6-DOF Autonomous Platform' },
    { id: 'propulsion', label: '8-Thruster System', desc: '4 Vectored Horizontal + 4 Vertical Fixed' },
    { id: 'hull', label: 'Pressure Hull', desc: 'Acrylic Hull Enclosure for Flight Electronics' },
    { id: 'frame', label: 'Structural Frame', desc: 'CNC Anodized Aluminum Skeletal Chassis' },
    { id: 'buoyancy', label: 'Buoyancy Pods', desc: 'Dual Longitudinal Trim Balancing Tubes' }
  ];

  return (
    <div 
      ref={containerRef} 
      id="explore"
      className="relative w-full"
      style={{ height: interactiveMode ? '100vh' : '450vh' }}
    >
      {/* Sticky Fullscreen 3D Viewport */}
      <div className={`sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-[#061B2B] via-[#041624] to-[#020B12] ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen' : ''
      }`}>
        
        {/* Top Control Header */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
          {/* Brand & Mode Tag */}
          <div className="flex items-center space-x-2 bg-ocean-midnight/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-ocean-blue/40 shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-ocean-cyan animate-pulse"></span>
            <span className="font-heading font-black text-sm tracking-wider text-white">
              TRITON
            </span>
            <span className="text-white/40">|</span>
            <span className="text-xs font-semibold text-ocean-gold">
              {interactiveMode ? '360° INSPECTION MODE' : `SCENE 0${activeScene.id + 1} OF 07`}
            </span>
          </div>

          {/* Mode Switcher & Tools */}
          <div className="flex items-center space-x-2">
            {/* Mode Switcher Button */}
            <button
              onClick={() => {
                setInteractiveMode(!interactiveMode);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider backdrop-blur-md border transition-all flex items-center space-x-2 shadow-lg ${
                interactiveMode 
                  ? 'bg-ocean-cyan text-ocean-deep border-ocean-cyan shadow-ocean-cyan/30' 
                  : 'bg-ocean-midnight/90 text-white/90 border-ocean-blue/50 hover:border-ocean-cyan/60 hover:text-white'
              }`}
            >
              {interactiveMode ? (
                <>
                  <Compass className="w-3.5 h-3.5 text-ocean-deep" />
                  <span>Resume Guided Tour</span>
                </>
              ) : (
                <>
                  <RotateCw className="w-3.5 h-3.5 text-ocean-cyan" />
                  <span>360° Interactive Inspection</span>
                </>
              )}
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-ocean-midnight/90 border border-ocean-blue/50 text-white/80 hover:text-white backdrop-blur-md shadow-lg transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 3D WebGL Canvas */}
        <Canvas
          camera={{ position: [0.72, 0.35, 0.72], fov: 38 }}
          shadows
          className={interactiveMode ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"}
        >
          <color attach="background" args={['#041421']} />
          <ambientLight intensity={1.1} />
          <directionalLight 
            position={[4, 6, 4]} 
            intensity={2.4} 
            color="#EFF8FC" 
            castShadow 
          />
          <directionalLight 
            position={[-4, -3, -4]} 
            intensity={0.9} 
            color="#087EAB" 
          />
          <pointLight position={[0, 2, 0]} intensity={1.4} color="#00D4FF" />
          <pointLight position={[0, -1.5, 0]} intensity={0.8} color="#26E6D1" />

          <Suspense fallback={<CanvasLoader />}>
            <Float 
              speed={interactiveMode ? 0 : 1.1} 
              rotationIntensity={interactiveMode ? 0 : 0.08} 
              floatIntensity={interactiveMode ? 0 : 0.15}
            >
              <AuthenticTritonModel 
                highlight={currentHighlight} 
                interactiveMode={interactiveMode}
                pulsePropulsion={activeScene.id === 2 || inspectHighlight === 'propulsion'}
              />
            </Float>
            <MarineAtmosphere />
          </Suspense>

          <CameraRig currentScene={activeScene} interactiveMode={interactiveMode} />

          {interactiveMode && (
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={0.5}
              maxDistance={3.2}
              dampingFactor={0.06}
            />
          )}
        </Canvas>

        {/* GUIDED TOUR: Narrative Text Card Overlay */}
        {!interactiveMode && (
          <div className="absolute bottom-6 left-4 right-4 sm:left-8 sm:bottom-10 max-w-xl pointer-events-auto z-20">
            <div className="card-glass p-5 sm:p-7 rounded-2xl border border-ocean-blue/40 shadow-2xl backdrop-blur-xl space-y-3.5 bg-ocean-midnight/90 transition-all duration-300">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-ocean-blue/30 border border-ocean-cyan/30 text-[11px] font-mono text-ocean-cyan font-bold tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-cyan animate-pulse"></span>
                <span>{activeScene.badge}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight leading-tight">
                {activeScene.title}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-ocean-ice/80 leading-relaxed font-sans">
                {activeScene.description}
              </p>

              {/* Scene 6: YOLOv11 Edge Vision HUD Overlay */}
              {activeScene.id === 5 && (
                <div className="mt-3 p-3.5 rounded-xl bg-ocean-deep/90 border border-ocean-cyan/40 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-ocean-aqua">
                    <span className="flex items-center space-x-1.5">
                      <Crosshair className="w-3.5 h-3.5 text-ocean-cyan animate-spin" />
                      <span>YOLOv11s-TENSORRT ENGINE</span>
                    </span>
                    <span className="text-green-400 font-bold">ONLINE · 30 FPS</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-white/70 pt-1 border-t border-white/10">
                    <div>CLASSIFIER: <span className="text-white font-bold">SUBSEA GATE</span></div>
                    <div>CONFIDENCE: <span className="text-ocean-cyan font-bold">94.8%</span></div>
                    <div>FILTER: <span className="text-ocean-gold font-bold">CLAHE ACTIVE</span></div>
                    <div>RANGE ESTIMATE: <span className="text-white font-bold">3.2 METERS</span></div>
                  </div>
                </div>
              )}

              {/* Scene 7: Final Reveal Call-to-Action Buttons */}
              {activeScene.id === 6 && (
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => onNavigate('engineering')}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-ocean-cyan to-ocean-aqua text-ocean-deep font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-ocean-cyan/25 hover:brightness-110 transition-all flex items-center space-x-1.5"
                  >
                    <span>EXPLORE THE ENGINEERING</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onNavigate('sponsorship')}
                    className="px-5 py-2.5 rounded-xl bg-ocean-gold/20 border border-ocean-gold/60 text-ocean-gold font-heading font-bold text-xs uppercase tracking-wider hover:bg-ocean-gold hover:text-ocean-deep transition-all flex items-center space-x-1.5"
                  >
                    <span>DISCUSS SPONSORSHIP</span>
                    <Award className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* GUIDED TOUR: Scene Progress Timeline Dots */}
        {!interactiveMode && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col space-y-3 pointer-events-auto">
            {SCENES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => jumpToScene(idx)}
                className="group flex items-center justify-end space-x-2 text-right"
                title={s.title}
              >
                <span className={`text-[10px] font-mono font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity bg-ocean-midnight/90 px-2 py-0.5 rounded border border-ocean-blue/40 text-white ${
                  activeSceneIndex === idx ? 'opacity-100 text-ocean-cyan' : ''
                }`}>
                  {`0${idx + 1}`}
                </span>
                <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeSceneIndex === idx 
                    ? 'w-3 h-3 bg-ocean-cyan ring-4 ring-ocean-cyan/30 scale-125' 
                    : 'bg-white/30 hover:bg-white/70'
                }`} />
              </button>
            ))}
          </div>
        )}

        {/* GUIDED TOUR: Bottom Scroll Prompt */}
        {!interactiveMode && activeScene.id < 6 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none opacity-70">
            <span className="text-[10px] font-heading font-bold tracking-widest text-ocean-aqua uppercase mb-1">
              SCROLL TO EXPLORE
            </span>
            <ChevronDown className="w-4 h-4 text-ocean-cyan animate-bounce" />
          </div>
        )}

        {/* INTERACTIVE MODE: Component Selector and Inspection Drawer */}
        {interactiveMode && (
          <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-auto max-w-4xl mx-auto">
            <div className="card-glass p-3 rounded-2xl border border-ocean-cyan/40 bg-ocean-midnight/95 backdrop-blur-xl shadow-2xl space-y-2.5">
              <div className="flex items-center justify-between px-2">
                <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-ocean-aqua flex items-center space-x-1.5">
                  <Sliders className="w-3.5 h-3.5 text-ocean-cyan" />
                  <span>SELECT COMPONENT TO ISOLATE &amp; INSPECT</span>
                </span>
                <span className="text-[10px] text-white/50 hidden sm:inline">
                  Drag to rotate · Scroll to zoom · Right-click to pan
                </span>
              </div>

              {/* Component Buttons */}
              <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1">
                {componentButtons.map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setInspectHighlight(btn.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      inspectHighlight === btn.id
                        ? 'bg-ocean-cyan text-ocean-deep shadow-md shadow-ocean-cyan/30 scale-105'
                        : 'bg-ocean-blue/20 text-white/80 hover:text-white hover:bg-ocean-blue/40 border border-white/10'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Active Component Explanation */}
              <div className="bg-ocean-deep/80 p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-ocean-gold uppercase tracking-wider text-[11px] block">
                    {componentButtons.find(b => b.id === inspectHighlight)?.label}
                  </span>
                  <p className="text-white/80 text-[11px] mt-0.5">
                    {componentButtons.find(b => b.id === inspectHighlight)?.desc}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const keys: ComponentHighlight[] = ['all', 'propulsion', 'hull', 'frame', 'buoyancy'];
                    const currentIdx = keys.indexOf(inspectHighlight);
                    const nextKey = keys[(currentIdx + 1) % keys.length];
                    setInspectHighlight(nextKey);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-ocean-blue/40 text-ocean-cyan hover:bg-ocean-blue/60 text-[11px] font-bold border border-ocean-cyan/30 flex items-center space-x-1"
                >
                  <span>Next Component</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
