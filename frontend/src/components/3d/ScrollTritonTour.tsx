import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Compass, 
  RotateCw, 
  Maximize2, 
  Minimize2, 
  ArrowRight, 
  ChevronDown, 
  Award,
  Sliders,
  Crosshair,
  RefreshCcw
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
  exploded?: boolean;
  showPropulsionVectors?: boolean;
  sensorsList?: string[];
}

const SCENES: SceneConfig[] = [
  {
    id: 0,
    badge: 'SCENE 01 · HERO PRODUCT REVEAL',
    title: 'MEET TRITON.',
    description: 'Engineered to explore, inspect, and operate beneath the surface. Built from the authoritative 153-solid ER.STEP engineering assembly.',
    camPos: [0.85, 0.38, 0.85],
    targetPos: [0, 0, 0],
    highlight: 'all'
  },
  {
    id: 1,
    badge: 'SCENE 02 · FULL VEHICLE EXPLORATION',
    title: 'HYDRODYNAMIC EXTERIOR PROFILE.',
    description: 'Gradual orbital inspection revealing the front optical corridor, side truss geometry, rear propulsion envelope, and top buoyancy pods.',
    camPos: [0.92, 0.22, -0.25],
    targetPos: [0, 0, 0],
    highlight: 'frame'
  },
  {
    id: 2,
    badge: 'SCENE 03 · PROPULSION REVEAL',
    title: 'EIGHT-THRUSTER 6-DOF PROPULSION.',
    description: 'Four 45°-vectored horizontal T28 thrusters mounted on angled fixtures paired with four vertical T28 thrusters for full six-degree-of-freedom control.',
    camPos: [0.72, 0.34, 0.56],
    targetPos: [0, 0, 0],
    highlight: 'propulsion',
    showPropulsionVectors: true
  },
  {
    id: 3,
    badge: 'SCENE 04 · STRUCTURAL ASSEMBLY (EXPLODED VIEW)',
    title: 'CONTROLLED STRUCTURAL SEPARATION.',
    description: 'Components translate along their true CAD assembly axes—lifting the upper buoyancy pods and separating angled propulsion fixtures to reveal the Ø114.3 mm pressure hull and internal electronics tray.',
    camPos: [0.68, 0.44, 0.72],
    targetPos: [0, 0.02, 0],
    highlight: 'hull',
    exploded: true
  },
  {
    id: 4,
    badge: 'SCENE 05 · SENSOR & PERCEPTION SUITE',
    title: 'SEE. SENSE. UNDERSTAND.',
    description: 'Integrated multi-modal sensing for underwater localization, depth-hold, heading stabilization, and acoustic beacon tracking.',
    camPos: [0.65, 0.2, 0.45],
    targetPos: [0, 0, 0],
    highlight: 'all',
    sensorsList: [
      'ICM-20948 9-DOF IMU',
      'Bar30 Depth Sensor',
      'RM3100 Magnetometer',
      'Subsea Cameras',
      'Leak Sensor',
      'Temperature Sensor',
      'Three-Hydrophone Array'
    ]
  },
  {
    id: 5,
    badge: 'SCENE 06 · AI & INTELLIGENCE',
    title: 'INTELLIGENCE BENEATH THE SURFACE.',
    description: 'Edge perception pipeline running on NVIDIA Jetson Orin Nano: Camera Input → OpenCV (CLAHE + White Balance Correction) → YOLOv11 → Object Detection → Mission Decisions.',
    camPos: [0.74, 0.28, 0.48],
    targetPos: [0, 0, 0],
    highlight: 'all'
  },
  {
    id: 6,
    badge: 'SCENE 07 · COMPLETE VEHICLE REVEAL',
    title: 'ENGINEERED TO EXPLORE WHAT LIES BENEATH.',
    description: 'A unified autonomous underwater robotics platform ready for subsea inspection, surveying, and object-retrieval operations.',
    camPos: [0.88, 0.42, 0.88],
    targetPos: [0, 0, 0],
    highlight: 'all'
  }
];

interface ModelInnerProps {
  highlight: ComponentHighlight;
  interactiveMode: boolean;
  exploded: boolean;
  showVectors: boolean;
}

function AuthenticStepModel({ highlight, interactiveMode, exploded, showVectors }: ModelInnerProps) {
  const { scene } = useGLTF('/assets/models/triton.glb');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<Record<string, THREE.Object3D>>({});

  useEffect(() => {
    nodesRef.current = {};
    clonedScene.traverse((child: any) => {
      const n = child.name || '';
      if (['Horizontal_Thrusters', 'Vertical_Thrusters', 'Propulsion_Fixtures', 'Pressure_Hull', 'Buoyancy_Pods', 'Structural_Frame', 'Electronics_Tray'].includes(n)) {
        nodesRef.current[n] = child;
      }

      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const name = (child.name || child.parent?.name || '').toLowerCase();
        const isThruster = name.includes('thruster');
        const isFixture = name.includes('fixture');
        const isPropulsion = isThruster || isFixture;
        const isHull = name.includes('hull');
        const isTray = name.includes('electronics');
        const isBuoyancy = name.includes('buoyancy');
        const isFrame = name.includes('frame');

        let dimOpacity = 1.0;
        let isHighlighted = true;

        if (highlight === 'propulsion') isHighlighted = isPropulsion;
        else if (highlight === 'hull') isHighlighted = isHull || isTray;
        else if (highlight === 'frame') isHighlighted = isFrame;
        else if (highlight === 'buoyancy') isHighlighted = isBuoyancy;

        if (highlight !== 'all' && !isHighlighted) {
          dimOpacity = 0.2;
        }

        if (isThruster) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(isHighlighted ? '#087F83' : '#4A6572'),
            metalness: 0.78,
            roughness: 0.25,
            emissive: new THREE.Color('#14A9A0'),
            emissiveIntensity: highlight === 'propulsion' ? 0.45 : 0.1,
            transparent: dimOpacity < 1.0,
            opacity: dimOpacity
          });
        } else if (isFixture) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#163C4B'),
            metalness: 0.8,
            roughness: 0.3,
            transparent: dimOpacity < 1.0,
            opacity: dimOpacity
          });
        } else if (isHull) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#CBEAF0'),
            metalness: 0.15,
            roughness: 0.1,
            transparent: true,
            opacity: isHighlighted ? 0.62 : 0.18
          });
        } else if (isTray) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#172832'),
            metalness: 0.6,
            roughness: 0.4,
            emissive: new THREE.Color('#14A9A0'),
            emissiveIntensity: highlight === 'hull' ? 0.3 : 0.05,
            transparent: dimOpacity < 1.0,
            opacity: dimOpacity
          });
        } else if (isBuoyancy) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(isHighlighted ? '#14A9A0' : '#6A838D'),
            metalness: 0.35,
            roughness: 0.38,
            transparent: dimOpacity < 1.0,
            opacity: dimOpacity
          });
        } else if (isFrame) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(isHighlighted ? '#2C424F' : '#8A9CA4'),
            metalness: 0.85,
            roughness: 0.28,
            transparent: dimOpacity < 1.0,
            opacity: dimOpacity
          });
        }
      }
    });
  }, [clonedScene, highlight]);

  // Controlled assembly-axis exploded view & gentle underwater float
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!interactiveMode && groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.1) * 0.008;
      groupRef.current.rotation.z = Math.sin(t * 0.7) * 0.012;
    }

    const buoy = nodesRef.current['Buoyancy_Pods'];
    const vThr = nodesRef.current['Vertical_Thrusters'];
    const hThr = nodesRef.current['Horizontal_Thrusters'];
    const fix = nodesRef.current['Propulsion_Fixtures'];

    const targetBuoyY = exploded ? 0.095 : 0;
    const targetVThrY = exploded ? -0.075 : 0;
    const targetHThrY = exploded ? 0.055 : 0;
    const targetFixY = exploded ? 0.045 : 0;

    if (buoy) buoy.position.y = THREE.MathUtils.lerp(buoy.position.y, targetBuoyY, 0.07);
    if (vThr) vThr.position.y = THREE.MathUtils.lerp(vThr.position.y, targetVThrY, 0.07);
    if (hThr) hThr.position.y = THREE.MathUtils.lerp(hThr.position.y, targetHThrY, 0.07);
    if (fix) fix.position.y = THREE.MathUtils.lerp(fix.position.y, targetFixY, 0.07);
  });

  return (
    <group ref={groupRef} scale={[1, 1, 1]} position={[0, 0, 0]}>
      <primitive object={clonedScene} />

      {/* Explanatory Flow-Line Visualisations for Scene 3 (NOT CFD) */}
      {showVectors && (
        <group>
          {/* Vertical Thrust Indicators */}
          <Line points={[[-0.20, -0.04, 0.09], [-0.20, 0.14, 0.09]]} color="#66D4CF" lineWidth={2} />
          <Line points={[[0.20, -0.04, 0.09], [0.20, 0.14, 0.09]]} color="#66D4CF" lineWidth={2} />
          <Line points={[[-0.20, -0.04, -0.09], [-0.20, 0.14, -0.09]]} color="#66D4CF" lineWidth={2} />
          <Line points={[[0.20, -0.04, -0.09], [0.20, 0.14, -0.09]]} color="#66D4CF" lineWidth={2} />

          {/* Horizontal Vectored Thrust Indicators */}
          <Line points={[[0.22, 0.02, 0.25], [0.34, 0.02, 0.37]]} color="#D98B73" lineWidth={2} />
          <Line points={[[-0.22, 0.02, 0.25], [-0.34, 0.02, 0.37]]} color="#D98B73" lineWidth={2} />
          <Line points={[[0.22, 0.02, -0.25], [0.34, 0.02, -0.37]]} color="#D98B73" lineWidth={2} />
          <Line points={[[-0.22, 0.02, -0.25], [-0.34, 0.02, -0.37]]} color="#D98B73" lineWidth={2} />
        </group>
      )}
    </group>
  );
}

function CameraRig({ currentScene, interactiveMode }: { currentScene: SceneConfig; interactiveMode: boolean }) {
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

function CanvasLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center space-y-2.5 bg-[#172832]/90 backdrop-blur-md px-5 py-4 rounded-xl border border-[#66D4CF]/30 text-center">
        <div className="w-8 h-8 border-3 border-[#087F83] border-t-[#66D4CF] rounded-full animate-spin"></div>
        <div className="text-[11px] font-mono font-bold text-white tracking-wider">
          LOADING ER.STEP CAD MODEL
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

  const jumpToScene = (idx: number) => {
    setActiveSceneIndex(idx);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
    const targetOffset = (idx / (SCENES.length - 1)) * totalScrollable;
    const topOfContainer = rect.top + scrollTop;

    window.scrollTo({
      top: topOfContainer + targetOffset + 4,
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
    { id: 'all', label: 'Complete Vehicle', desc: 'Full ER.STEP assembly (504 × 267 × 584 mm)' },
    { id: 'propulsion', label: 'Propulsion Assembly', desc: '4 Horizontal Vectored + 4 Vertical T28 Thrusters on Angled Fixtures' },
    { id: 'frame', label: 'Structural Frame', desc: 'CNC Side Truss Plates, Tie Rods & Mounting Cradles' },
    { id: 'hull', label: 'Pressure Hull', desc: 'Ø114.3 mm Acrylic Pressure Hull & Internal Electronics Tray' },
    { id: 'buoyancy', label: 'Buoyancy Pods', desc: 'Upper Longitudinal Syntactic Buoyancy Tubes' }
  ];

  return (
    <div 
      ref={containerRef} 
      id="explore"
      className="relative w-full"
      style={{ height: interactiveMode ? '100vh' : '420vh' }}
    >
      <div className={`sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-[#172832] via-[#163C4B] to-[#0F2733] ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen' : ''
      }`}>
        
        {/* Top Control Bar (positioned below sticky Navbar unless fullscreen) */}
        <div className={`absolute ${isFullscreen ? 'top-4' : 'top-24 sm:top-28'} left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto`}>
          <div className="flex items-center space-x-2.5 bg-[#172832]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#66D4CF]/30 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-[#66D4CF] animate-pulse"></span>
            <span className="font-heading font-bold text-sm tracking-wider text-white">
              TRITON · ER.STEP
            </span>
            <span className="text-white/30">|</span>
            <span className="text-xs font-mono font-semibold text-[#66D4CF]">
              {interactiveMode ? '360° INSPECTION MODE' : `SCENE 0${activeScene.id + 1} / 07`}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setInteractiveMode(!interactiveMode)}
              className={`px-3.5 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider backdrop-blur-md border transition-all flex items-center space-x-2 shadow-lg ${
                interactiveMode 
                  ? 'bg-[#14A9A0] text-white border-[#66D4CF]' 
                  : 'bg-[#172832]/90 text-white border-[#66D4CF]/40 hover:border-[#66D4CF]'
              }`}
            >
              {interactiveMode ? (
                <>
                  <Compass className="w-3.5 h-3.5" />
                  <span>Resume Guided Tour</span>
                </>
              ) : (
                <>
                  <RotateCw className="w-3.5 h-3.5 text-[#66D4CF]" />
                  <span>360° Manual Inspection</span>
                </>
              )}
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-[#172832]/90 border border-white/20 text-white/80 hover:text-white backdrop-blur-md shadow-lg transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 3D WebGL Canvas */}
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0.85, 0.38, 0.85], fov: 38, near: 0.05, far: 50 }}
          shadows
          className={interactiveMode ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"}
        >
          <color attach="background" args={['#142934']} />
          <ambientLight intensity={1.1} />
          <directionalLight position={[4, 6, 4]} intensity={2.3} color="#FFFFFF" castShadow />
          <directionalLight position={[-4, -3, -4]} intensity={0.95} color="#66D4CF" />
          <pointLight position={[0, 2.5, 0]} intensity={1.3} color="#14A9A0" />

          <Suspense fallback={<CanvasLoader />}>
            <Float 
              speed={interactiveMode ? 0 : 1.0} 
              rotationIntensity={interactiveMode ? 0 : 0.05} 
              floatIntensity={interactiveMode ? 0 : 0.1}
            >
              <AuthenticStepModel 
                highlight={currentHighlight} 
                interactiveMode={interactiveMode}
                exploded={!interactiveMode && Boolean(activeScene.exploded)}
                showVectors={!interactiveMode && Boolean(activeScene.showPropulsionVectors)}
              />
            </Float>
          </Suspense>

          <CameraRig currentScene={activeScene} interactiveMode={interactiveMode} />

          {interactiveMode && (
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={0.45}
              maxDistance={2.8}
              dampingFactor={0.06}
            />
          )}
        </Canvas>

        {/* GUIDED TOUR: Narrative Overlay Card */}
        {!interactiveMode && (
          <div className="absolute bottom-6 left-4 right-4 sm:left-8 sm:bottom-10 max-w-xl pointer-events-auto z-20">
            <div className="p-5 sm:p-7 rounded-2xl border border-[#66D4CF]/30 shadow-2xl backdrop-blur-xl space-y-3 bg-[#172832]/92">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-[#087F83]/30 border border-[#66D4CF]/30 text-[11px] font-mono text-[#66D4CF] font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#66D4CF] animate-pulse"></span>
                <span>{activeScene.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight leading-tight">
                {activeScene.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#E8F1F3]/85 leading-relaxed font-sans">
                {activeScene.description}
              </p>

              {/* Scene 3 Disclaimer */}
              {activeScene.showPropulsionVectors && (
                <div className="text-[10px] font-mono text-[#D98B73] bg-[#D98B73]/10 border border-[#D98B73]/30 px-2.5 py-1.5 rounded-lg">
                  Explanatory Propulsion Vector Visualisation (Coral: 45° Horizontal Vectored · Aqua: Vertical Fixed) — Not a CFD Simulation.
                </div>
              )}

              {/* Scene 5 Sensor Pills */}
              {activeScene.sensorsList && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeScene.sensorsList.map((s) => (
                    <span key={s} className="px-2 py-1 rounded bg-[#163C4B] border border-[#66D4CF]/30 text-[10px] font-mono text-[#66D4CF]">
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {/* Scene 6: YOLOv11 Demonstration Pipeline Overlay */}
              {activeScene.id === 5 && (
                <div className="mt-2 p-3.5 rounded-xl bg-[#0F222B] border border-[#66D4CF]/35 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-[#66D4CF]">
                    <span className="flex items-center space-x-1.5">
                      <Crosshair className="w-3.5 h-3.5" />
                      <span>DEMONSTRATION OVERLAY — ILLUSTRATIVE OUTPUT</span>
                    </span>
                    <span className="text-[#D98B73] font-bold">PIPELINE DEMO</span>
                  </div>
                  <div className="text-[10px] text-[#E8F1F3]/80 pt-1 border-t border-white/10">
                    Camera Input → OpenCV (CLAHE + White Balance Correction) → YOLOv11 → Object Detection → Mission Decisions
                  </div>
                </div>
              )}

              {/* Scene 7: Final CTAs */}
              {activeScene.id === 6 && (
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => onNavigate('engineering')}
                    className="px-5 py-2.5 rounded-xl bg-[#14A9A0] hover:bg-[#087F83] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center space-x-1.5"
                  >
                    <span>EXPLORE ENGINEERING</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onNavigate('sponsorship')}
                    className="px-5 py-2.5 rounded-xl bg-[#D98B73]/20 border border-[#D98B73]/60 text-[#D98B73] hover:bg-[#D98B73] hover:text-[#172832] font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-1.5"
                  >
                    <span>PARTNER WITH TRITON</span>
                    <Award className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* GUIDED TOUR: Timeline Dots */}
        {!interactiveMode && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col space-y-3 pointer-events-auto">
            {SCENES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => jumpToScene(idx)}
                className="group flex items-center justify-end space-x-2 text-right"
                title={s.title}
              >
                <span className={`text-[10px] font-mono font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity bg-[#172832]/90 px-2 py-0.5 rounded border border-[#66D4CF]/30 text-white ${
                  activeSceneIndex === idx ? 'opacity-100 text-[#66D4CF]' : ''
                }`}>
                  {`0${idx + 1}`}
                </span>
                <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeSceneIndex === idx 
                    ? 'w-3 h-3 bg-[#66D4CF] ring-4 ring-[#66D4CF]/30 scale-125' 
                    : 'bg-white/30 hover:bg-white/70'
                }`} />
              </button>
            ))}
          </div>
        )}

        {/* Bottom Scroll Prompt (placed bottom-right to never overlap left scene card) */}
        {!interactiveMode && activeScene.id < 6 && (
          <div className="absolute bottom-6 right-8 z-20 hidden lg:flex flex-col items-center pointer-events-none opacity-80">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#66D4CF] uppercase mb-1">
              SCROLL TO EXPLORE
            </span>
            <ChevronDown className="w-4 h-4 text-[#66D4CF] animate-bounce" />
          </div>
        )}

        {/* INTERACTIVE INSPECTION DRAWER */}
        {interactiveMode && (
          <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-auto max-w-4xl mx-auto">
            <div className="p-3.5 rounded-2xl border border-[#66D4CF]/35 bg-[#172832]/95 backdrop-blur-xl shadow-2xl space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#66D4CF] flex items-center space-x-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>ISOLATE &amp; INSPECT COMPONENT</span>
                </span>
                <button
                  onClick={() => setInspectHighlight('all')}
                  className="text-[10px] font-mono text-[#B9C7CC] hover:text-white flex items-center space-x-1"
                >
                  <RefreshCcw className="w-3 h-3" />
                  <span>Reset Full Vehicle</span>
                </button>
              </div>

              <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1">
                {componentButtons.map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setInspectHighlight(btn.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-heading font-semibold whitespace-nowrap transition-all ${
                      inspectHighlight === btn.id
                        ? 'bg-[#14A9A0] text-white shadow-md'
                        : 'bg-white/10 text-white/80 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              <div className="bg-[#0F222B] p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="font-heading font-bold text-[#66D4CF] uppercase tracking-wider text-[11px] block">
                    {componentButtons.find(b => b.id === inspectHighlight)?.label}
                  </span>
                  <p className="text-[#E8F1F3]/80 text-[11px] mt-0.5">
                    {componentButtons.find(b => b.id === inspectHighlight)?.desc}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const keys: ComponentHighlight[] = ['all', 'propulsion', 'frame', 'hull', 'buoyancy'];
                    const nextKey = keys[(keys.indexOf(inspectHighlight) + 1) % keys.length];
                    setInspectHighlight(nextKey);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#087F83] text-white hover:bg-[#14A9A0] text-[11px] font-bold flex items-center space-x-1 shrink-0 ml-3"
                >
                  <span>Next</span>
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
