import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Maximize2, 
  Minimize2, 
  RotateCw, 
  RefreshCcw, 
  HelpCircle,
  AlertTriangle,
  Layers
} from 'lucide-react';

export type ComponentFilter = 'all' | 'propulsion' | 'hull' | 'frame' | 'buoyancy';

interface ComponentInfo {
  id: ComponentFilter;
  label: string;
  desc: string;
  camPos: [number, number, number];
}

const COMPONENT_DETAILS: ComponentInfo[] = [
  {
    id: 'all',
    label: 'Complete Vehicle',
    desc: 'Full 153-solid ER.STEP assembly (504 × 267 × 584 mm) with 8 T28 thrusters and central acrylic pressure hull.',
    camPos: [0.85, 0.42, 0.85]
  },
  {
    id: 'propulsion',
    label: 'Propulsion Assembly',
    desc: '4 horizontal 45°-vectored T28 thrusters on angled fixtures + 4 vertical fixed T28 thrusters for 6-DOF control.',
    camPos: [0.72, 0.35, 0.58]
  },
  {
    id: 'frame',
    label: 'Structural Frame',
    desc: 'CNC-profiled side truss plates (482.6 × 266.5 mm) joined by lateral tie rods and precision hull cradles.',
    camPos: [0.78, 0.24, 0.25]
  },
  {
    id: 'hull',
    label: 'Pressure Hull',
    desc: 'Central cylindrical Ø114.3 mm acrylic pressure vessel housing the internal electronics tray and endcap seals.',
    camPos: [0.35, 0.38, 0.62]
  },
  {
    id: 'buoyancy',
    label: 'Buoyancy Pods',
    desc: 'Dual upper longitudinal syntactic buoyancy pods providing passive pitch/roll stability and positive trim.',
    camPos: [0.55, 0.55, 0.55]
  }
];

interface ModelProps {
  filter: ComponentFilter;
  autoRotate: boolean;
  cursorParallax?: boolean;
}

function TritonModel({ filter, autoRotate, cursorParallax = false }: ModelProps) {
  const { scene } = useGLTF('/assets/models/triton.glb');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const groupRef = useRef<THREE.Group>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!cursorParallax) return;
    const onMove = (e: MouseEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [cursorParallax]);

  useEffect(() => {
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const name = (child.name || child.parent?.name || '').toLowerCase();
        const isThruster = name.includes('thruster');
        const isFixture = name.includes('fixture');
        const isPropulsion = isThruster || isFixture;
        const isHull = name.includes('hull');
        const isTray = name.includes('electronics');
        const isFrame = name.includes('frame');
        const isBuoyancy = name.includes('buoyancy');

        let dimOpacity = 1.0;
        let isHighlighted = true;

        if (filter !== 'all') {
          if (filter === 'propulsion') isHighlighted = isPropulsion;
          else if (filter === 'hull') isHighlighted = isHull || isTray;
          else if (filter === 'frame') isHighlighted = isFrame;
          else if (filter === 'buoyancy') isHighlighted = isBuoyancy;
          dimOpacity = isHighlighted ? 1.0 : 0.16;
        }

        if (isThruster) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(isHighlighted ? '#087F83' : '#4A6572'),
            metalness: 0.78,
            roughness: 0.25,
            emissive: new THREE.Color('#14A9A0'),
            emissiveIntensity: filter === 'propulsion' ? 0.35 : 0.08,
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
            opacity: isHighlighted ? 0.62 : 0.15
          });
        } else if (isTray) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#172832'),
            metalness: 0.6,
            roughness: 0.4,
            emissive: new THREE.Color('#14A9A0'),
            emissiveIntensity: filter === 'hull' ? 0.25 : 0.05,
            transparent: dimOpacity < 1.0,
            opacity: dimOpacity
          });
        } else if (isBuoyancy) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(isHighlighted ? '#14A9A0' : '#6A838D'),
            metalness: 0.35,
            roughness: 0.38,
            emissive: new THREE.Color('#087F83'),
            emissiveIntensity: filter === 'buoyancy' ? 0.25 : 0.04,
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
        } else {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#163C4B'),
            metalness: 0.75,
            roughness: 0.3,
            transparent: dimOpacity < 1.0,
            opacity: dimOpacity
          });
        }
      }
    });
  }, [clonedScene, filter]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (autoRotate) {
      groupRef.current.rotation.y += delta * 0.22;
    } else if (cursorParallax) {
      const targetRotY = -0.35 + pointerRef.current.x * 0.18;
      const targetRotX = 0.08 + pointerRef.current.y * 0.1;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    }
  });

  return (
    <group ref={groupRef} scale={[1, 1, 1]} position={[0, 0, 0]} rotation={[0.08, -0.45, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

function CameraFocusController({ targetPos }: { targetPos: [number, number, number] }) {
  const { camera } = useThree();
  const desired = useRef(new THREE.Vector3(...targetPos));
  const animating = useRef(false);

  useEffect(() => {
    desired.current.set(...targetPos);
    animating.current = true;
    const t = setTimeout(() => { animating.current = false; }, 900);
    return () => clearTimeout(t);
  }, [targetPos]);

  useFrame(() => {
    if (animating.current) {
      camera.position.lerp(desired.current, 0.08);
      camera.lookAt(0, 0, 0);
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
          LOADING ER.STEP CAD ASSEMBLY
        </div>
      </div>
    </Html>
  );
}

interface TritonViewerProps {
  className?: string;
  showControlsBar?: boolean;
  darkBackdrop?: boolean;
  cursorParallax?: boolean;
}

export const TritonViewer: React.FC<TritonViewerProps> = ({ 
  className = "h-[520px] w-full",
  showControlsBar = true,
  darkBackdrop = true,
  cursorParallax = false
}) => {
  const [filter, setFilter] = useState<ComponentFilter>('all');
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [webglError, setWebglError] = useState<boolean>(false);
  const [camTrigger, setCamTrigger] = useState<[number, number, number]>([0.85, 0.42, 0.85]);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeInfo = COMPONENT_DETAILS.find((c) => c.id === filter) || COMPONENT_DETAILS[0];

  const handleSelectComponent = (id: ComponentFilter) => {
    setFilter(id);
    const info = COMPONENT_DETAILS.find((c) => c.id === id);
    if (info) setCamTrigger([...info.camPos]);
  };

  const handleResetView = () => {
    setFilter('all');
    setAutoRotate(false);
    setCamTrigger([0.85, 0.42, 0.85]);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const bgHex = darkBackdrop ? '#132630' : '#E8F1F3';

  return (
    <div 
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden border border-[#B9C7CC]/60 shadow-xl ${
        darkBackdrop ? 'bg-[#132630]' : 'bg-[#E8F1F3]'
      } ${className} ${isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen w-screen' : ''}`}
    >
      {/* Top Badge */}
      <div className="absolute top-3.5 left-3.5 z-10 flex items-center space-x-2 bg-[#172832]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#66D4CF]/30 text-[11px]">
        <span className="w-2 h-2 rounded-full bg-[#66D4CF] animate-pulse"></span>
        <span className="font-heading font-bold text-white tracking-wider">
          TRITON · ER.STEP CAD
        </span>
      </div>

      {/* Top-Right Tools */}
      <div className="absolute top-3.5 right-3.5 z-10 flex items-center space-x-1.5">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2 rounded-lg backdrop-blur-md border transition-all ${
            autoRotate 
              ? 'bg-[#087F83] border-[#66D4CF] text-white' 
              : 'bg-[#172832]/80 border-white/15 text-white/80 hover:text-white'
          }`}
          title={autoRotate ? "Pause rotation" : "Enable gentle rotation"}
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleResetView}
          className="p-2 rounded-lg bg-[#172832]/80 border border-white/15 text-white/80 hover:text-white backdrop-blur-md transition-colors"
          title="Reset Camera & Full Vehicle"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-lg bg-[#172832]/80 border border-white/15 text-white/80 hover:text-white backdrop-blur-md transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen 3D Viewer"}
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* WebGL Canvas or Static Fallback */}
      {webglError ? (
        <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[#E8F1F3] text-[#172832]">
          <AlertTriangle className="w-10 h-10 text-[#D98B73]" />
          <h3 className="text-base font-heading font-bold">WebGL Hardware Rendering Unavailable</h3>
          <p className="text-xs text-[#163C4B] max-w-md">
            Displaying the supplied CAD Engineering Drawing fallback.
          </p>
          <img 
            src="/assets/images/triton_engineering_drawing.png" 
            alt="TRITON 2D CAD Blueprint" 
            className="max-h-60 rounded-lg border border-[#B9C7CC] shadow"
          />
        </div>
      ) : (
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0.85, 0.42, 0.85], fov: 38, near: 0.05, far: 50 }}
          onCreated={() => setWebglError(false)}
          onError={() => setWebglError(true)}
          shadows
          className="cursor-grab active:cursor-grabbing"
        >
          <color attach="background" args={[bgHex]} />
          <ambientLight intensity={1.1} />
          <directionalLight position={[4, 6, 4]} intensity={2.2} color="#FFFFFF" castShadow />
          <directionalLight position={[-4, -3, -4]} intensity={0.9} color="#66D4CF" />
          <pointLight position={[0, 2.5, 0]} intensity={1.2} color="#14A9A0" />

          <Suspense fallback={<CanvasLoader />}>
            <Float speed={1.1} rotationIntensity={0.04} floatIntensity={0.08}>
              <TritonModel filter={filter} autoRotate={autoRotate} cursorParallax={cursorParallax} />
            </Float>
          </Suspense>

          <CameraFocusController targetPos={camTrigger} />

          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={0.45}
            maxDistance={2.8}
            dampingFactor={0.06}
          />
        </Canvas>
      )}

      {/* Bottom Component Isolation & Description Bar */}
      {showControlsBar && (
        <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-col space-y-2 pointer-events-auto">
          {filter !== 'all' && (
            <div className="bg-[#172832]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#66D4CF]/30 flex items-center justify-between text-xs text-white">
              <div className="pr-3">
                <span className="font-heading font-bold text-[#66D4CF] uppercase tracking-wider text-[11px] block">
                  {activeInfo.label}
                </span>
                <span className="text-[11px] text-[#E8F1F3]/85">{activeInfo.desc}</span>
              </div>
              <button
                onClick={handleResetView}
                className="px-2.5 py-1 rounded-md bg-[#087F83] hover:bg-[#14A9A0] text-white text-[10px] font-bold shrink-0"
              >
                Reset Full Vehicle
              </button>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-1.5 bg-[#172832]/90 backdrop-blur-md p-1.5 rounded-xl border border-white/15">
            <div className="flex flex-wrap items-center gap-1">
              {COMPONENT_DETAILS.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => handleSelectComponent(btn.id)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-heading font-semibold whitespace-nowrap transition-all ${
                    filter === btn.id
                      ? 'bg-[#14A9A0] text-white shadow-sm'
                      : 'text-white/75 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
            <span className="hidden xl:flex items-center space-x-1 text-[10px] font-mono text-[#B9C7CC] pr-1.5 shrink-0">
              <HelpCircle className="w-3 h-3 text-[#66D4CF]" />
              <span>Drag · Scroll</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
