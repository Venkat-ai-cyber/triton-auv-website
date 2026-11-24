import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Maximize2, 
  Minimize2, 
  RotateCw, 
  Layers, 
  Eye, 
  Sparkles, 
  RefreshCcw, 
  HelpCircle,
  AlertTriangle
} from 'lucide-react';

type ComponentFilter = 'all' | 'thrusters' | 'hull' | 'frame' | 'buoyancy' | 'sensors';
type ModelSource = 'assembly' | 'raw_cad';

interface ModelProps {
  filter: ComponentFilter;
  source: ModelSource;
  autoRotate: boolean;
}

function TritonModel({ filter, source, autoRotate }: ModelProps) {
  const modelUrl = source === 'assembly' 
    ? '/assets/models/triton.glb' 
    : '/assets/models/triton_cad_raw.glb';
  
  const { scene } = useGLTF(modelUrl);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const groupRef = useRef<THREE.Group>(null);

  // Apply materials and filtering on the cloned scene
  useEffect(() => {
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const name = child.name || child.parent?.name || '';
        const nameLower = name.toLowerCase();

        // Check component classification
        const isThruster = nameLower.includes('thruster');
        const isHull = nameLower.includes('hull');
        const isFrame = nameLower.includes('frame') || nameLower.includes('plate') || nameLower.includes('structural');
        const isBuoyancy = nameLower.includes('buoyancy');
        const isSensor = nameLower.includes('sensor') || nameLower.includes('cam') || nameLower.includes('payload');

        // Determine visibility based on filter
        let visible = true;
        let opacity = 1.0;
        if (filter === 'thrusters') visible = isThruster;
        else if (filter === 'hull') visible = isHull;
        else if (filter === 'frame') visible = isFrame;
        else if (filter === 'buoyancy') visible = isBuoyancy;
        else if (filter === 'sensors') visible = isSensor;

        child.visible = visible;

        // Custom marine PBR materials
        if (isThruster) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#00D4FF'),
            metalness: 0.85,
            roughness: 0.25,
            emissive: new THREE.Color('#0088CC'),
            emissiveIntensity: 0.35
          });
        } else if (isHull) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#D2EBF8'),
            metalness: 0.2,
            roughness: 0.1,
            transparent: true,
            opacity: 0.72
          });
        } else if (isFrame) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#D7A747'),
            metalness: 0.9,
            roughness: 0.3
          });
        } else if (isBuoyancy) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#26E6D1'),
            metalness: 0.45,
            roughness: 0.35
          });
        } else if (isSensor) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#FFFFFF'),
            metalness: 0.95,
            roughness: 0.15,
            emissive: new THREE.Color('#00D4FF'),
            emissiveIntensity: 0.3
          });
        } else {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#087EAB'),
            metalness: 0.8,
            roughness: 0.3
          });
        }
      }
    });
  }, [clonedScene, filter, source]);

  // Slow idle rotation
  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  const scaleFactor = source === 'assembly' ? 1.0 : 0.001;

  return (
    <group ref={groupRef} scale={[scaleFactor, scaleFactor, scaleFactor]} position={[0, 0, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

// Subtle underwater marine particles
function MarineParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 120;
  
  const [positions] = useState(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 8;
      pos[i + 1] = (Math.random() - 0.5) * 6;
      pos[i + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  });

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += delta * 0.1;
        if (positions[i] > 3) positions[i] = -3;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#26E6D1"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Fallback Loader
function CanvasLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center space-y-3 bg-ocean-midnight/90 backdrop-blur-md px-6 py-4 rounded-xl border border-ocean-cyan/30 text-center">
        <div className="w-10 h-10 border-4 border-ocean-blue border-t-ocean-cyan rounded-full animate-spin"></div>
        <div className="text-xs font-bold text-white tracking-wider">
          LOADING TRITON CAD ASSET
        </div>
        <div className="text-[10px] text-ocean-aqua">
          Verifying 8 thrusters &amp; cylindrical hull...
        </div>
      </div>
    </Html>
  );
}

interface TritonViewerProps {
  className?: string;
  showControlsBar?: boolean;
}

export const TritonViewer: React.FC<TritonViewerProps> = ({ 
  className = "h-[500px] w-full",
  showControlsBar = true 
}) => {
  const [filter, setFilter] = useState<ComponentFilter>('all');
  const [source, setSource] = useState<ModelSource>('assembly');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [webglError, setWebglError] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const componentButtons: { id: ComponentFilter; label: string; color: string }[] = [
    { id: 'all', label: 'Complete Vehicle', color: 'bg-ocean-cyan text-ocean-deep' },
    { id: 'thrusters', label: '8-Thruster System', color: 'bg-cyan-500 text-white' },
    { id: 'hull', label: 'Pressure Hull', color: 'bg-blue-400 text-ocean-deep' },
    { id: 'frame', label: 'Structural Frame', color: 'bg-yellow-500 text-ocean-deep' },
    { id: 'buoyancy', label: 'Buoyancy Tubes', color: 'bg-emerald-400 text-ocean-deep' },
    { id: 'sensors', label: 'Sensors & Payload', color: 'bg-purple-400 text-ocean-deep' }
  ];

  return (
    <div 
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden border border-ocean-blue/40 bg-gradient-to-b from-[#092C46]/60 via-[#061B2B] to-[#04121E] shadow-2xl ${className} ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen w-screen' : ''
      }`}
    >
      {/* Top Header Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-ocean-midnight/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-ocean-blue/30 text-xs">
        <span className="w-2.5 h-2.5 rounded-full bg-ocean-cyan animate-pulse"></span>
        <span className="font-heading font-bold text-white tracking-wider">
          TRITON AUV · 3D CAD VIEWER
        </span>
        <span className="text-white/40">|</span>
        <span className="text-[11px] text-ocean-aqua font-mono">
          {source === 'assembly' ? 'PARAMETRIC GLB (6-DOF)' : 'RAW CAD RECONSTRUCTION'}
        </span>
      </div>

      {/* Top-Right Control Buttons */}
      <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2 rounded-lg backdrop-blur-md border transition-all ${
            autoRotate 
              ? 'bg-ocean-cyan/20 border-ocean-cyan text-ocean-cyan shadow-sm shadow-ocean-cyan/30' 
              : 'bg-ocean-midnight/80 border-ocean-blue/40 text-white/70 hover:text-white'
          }`}
          title={autoRotate ? "Pause slow rotation" : "Enable slow rotation"}
        >
          <RotateCw className="w-4 h-4" />
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-lg bg-ocean-midnight/80 border border-ocean-blue/40 text-white/70 hover:text-white backdrop-blur-md transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen 3D Viewer"}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* WebGL Canvas or Fallback */}
      {webglError ? (
        <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-ocean-gold" />
          <h3 className="text-lg font-bold text-white">WebGL Rendering Unavailable</h3>
          <p className="text-xs text-white/70 max-w-md">
            Your current browser or display driver is not providing hardware WebGL acceleration. You can view the supplied high-resolution CAD Engineering Drawing PDF below.
          </p>
          <img 
            src="/assets/images/triton_engineering_drawing.png" 
            alt="TRITON 2D CAD" 
            className="max-h-64 rounded-lg border border-ocean-blue/40 shadow-lg"
          />
        </div>
      ) : (
        <Canvas
          camera={{ position: [0.75, 0.35, 0.75], fov: 40 }}
          onCreated={() => setWebglError(false)}
          onError={() => setWebglError(true)}
          shadows
          className="cursor-grab active:cursor-grabbing"
        >
          <color attach="background" args={['#061B2B']} />
          <ambientLight intensity={1.2} />
          <directionalLight 
            position={[5, 8, 5]} 
            intensity={2.2} 
            color="#EFF8FC" 
            castShadow 
          />
          <directionalLight 
            position={[-5, -4, -5]} 
            intensity={0.8} 
            color="#087EAB" 
          />
          <pointLight position={[0, 3, 0]} intensity={1.5} color="#00D4FF" />
          <pointLight position={[0, -2, 0]} intensity={0.6} color="#26E6D1" />

          <Suspense fallback={<CanvasLoader />}>
            <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
              <TritonModel 
                filter={filter} 
                source={source} 
                autoRotate={autoRotate} 
              />
            </Float>
            <MarineParticles />
          </Suspense>

          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={0.8}
            maxDistance={5.5}
            dampingFactor={0.05}
          />
        </Canvas>
      )}

      {/* Floating Instructions Pill */}
      <div className="absolute bottom-16 sm:bottom-4 left-4 z-10 hidden sm:flex items-center space-x-2 bg-ocean-midnight/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] text-white/60">
        <HelpCircle className="w-3.5 h-3.5 text-ocean-cyan" />
        <span>Rotate: Left Click · Pan: Right Click · Zoom: Scroll</span>
      </div>

      {/* Bottom Subsystem Filtering Controls */}
      {showControlsBar && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-10 w-[95%] sm:w-auto max-w-full overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-1.5 bg-ocean-midnight/90 backdrop-blur-lg p-1.5 rounded-xl border border-ocean-blue/40 shadow-xl">
            {componentButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  filter === btn.id
                    ? `${btn.color} shadow-sm font-bold scale-105`
                    : 'text-white/70 hover:text-white hover:bg-ocean-blue/20'
                }`}
              >
                {btn.label}
              </button>
            ))}

            <div className="h-4 w-px bg-white/20 mx-1"></div>

            <button
              onClick={() => setSource(source === 'assembly' ? 'raw_cad' : 'assembly')}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap bg-ocean-blue/30 text-ocean-cyan hover:bg-ocean-blue/50 border border-ocean-cyan/30"
              title="Toggle between Parametric Assembly and Raw CAD Reconstruction"
            >
              {source === 'assembly' ? 'Show Raw CAD STL' : 'Show Parametric Assembly'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
