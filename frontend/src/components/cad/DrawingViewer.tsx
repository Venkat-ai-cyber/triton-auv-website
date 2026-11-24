import React, { useState } from 'react';
import { 
  FileText, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Download, 
  Layers, 
  AlertTriangle, 
  CheckCircle,
  Eye
} from 'lucide-react';

export const DrawingViewer: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewPreset, setViewPreset] = useState<'all' | 'top' | 'front' | 'side' | 'isometric'>('all');
  const [activeTab, setActiveTab] = useState<'drawing' | 'pdf'>('drawing');

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.min(220, Math.max(70, prev + delta)));
  };

  return (
    <div className="card-glass rounded-2xl p-6 border border-ocean-blue/40 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-ocean-blue/30 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-ocean-cyan animate-pulse"></span>
            <h3 className="font-heading font-bold text-lg text-white flex items-center space-x-2">
              <FileText className="w-5 h-5 text-ocean-cyan" />
              <span>ORIGINAL ENGINEERING DRAWING &amp; DIMENSION VALIDATION</span>
            </h3>
          </div>
          <p className="text-xs text-ocean-ice/70 pt-1">
            Official multi-view blueprint: Top View, Front View, Side View, and Isometric Projection (All dimensions in mm)
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('drawing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'drawing'
                ? 'bg-ocean-cyan text-ocean-deep shadow-md shadow-ocean-cyan/20'
                : 'bg-ocean-midnight/80 text-white/70 hover:text-white'
            }`}
          >
            2D Orthographic Render
          </button>
          <button
            onClick={() => setActiveTab('pdf')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'pdf'
                ? 'bg-ocean-cyan text-ocean-deep shadow-md shadow-ocean-cyan/20'
                : 'bg-ocean-midnight/80 text-white/70 hover:text-white'
            }`}
          >
            Original PDF Document
          </button>
        </div>
      </div>

      {/* Main Drawing Canvas / Viewer */}
      <div className="relative bg-[#020b12] rounded-xl border border-ocean-blue/40 p-4 overflow-hidden min-h-[460px] flex items-center justify-center">
        {/* Floating Zoom & Preset Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center space-x-1.5 bg-ocean-midnight/90 backdrop-blur-md p-1.5 rounded-lg border border-ocean-blue/30 text-xs">
          <button
            onClick={() => handleZoom(-20)}
            className="p-1.5 rounded hover:bg-ocean-blue/30 text-white/80 hover:text-white"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="px-2 font-mono text-[11px] text-ocean-cyan font-bold">{zoomLevel}%</span>
          <button
            onClick={() => handleZoom(20)}
            className="p-1.5 rounded hover:bg-ocean-blue/30 text-white/80 hover:text-white"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="h-4 w-px bg-white/20 mx-1"></div>
          <button
            onClick={() => setZoomLevel(100)}
            className="px-2 py-1 rounded hover:bg-ocean-blue/30 text-white/80 text-[11px] font-semibold"
          >
            Reset
          </button>
          <a
            href="/assets/docs/triton_engineering_drawing.pdf"
            download="triton_engineering_drawing.pdf"
            className="p-1.5 rounded hover:bg-ocean-blue/30 text-ocean-cyan"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>

        {/* Orthographic Image Display or PDF Embed */}
        {activeTab === 'drawing' ? (
          <div className="w-full h-full overflow-auto max-h-[600px] flex items-center justify-center p-2">
            <img 
              src="/assets/images/triton_engineering_drawing.png" 
              alt="TRITON 2D Engineering Drawing" 
              style={{ width: `${zoomLevel}%`, maxWidth: 'none', transition: 'width 0.2s ease-out' }}
              className="rounded-lg shadow-2xl border border-white/10"
            />
          </div>
        ) : (
          <div className="w-full h-[600px] rounded-lg overflow-hidden border border-white/10">
            <iframe 
              src="/assets/docs/triton_engineering_drawing.pdf#toolbar=1" 
              title="TRITON Engineering PDF"
              className="w-full h-full"
            />
          </div>
        )}
      </div>

      {/* Engineering Dimension Discrepancy Analysis Box */}
      <div className="bg-ocean-midnight/70 p-5 rounded-xl border border-ocean-gold/40 space-y-3">
        <div className="flex items-center space-x-2 text-ocean-gold font-heading font-bold text-sm tracking-wider">
          <AlertTriangle className="w-5 h-5 text-ocean-gold" />
          <span>ENGINEERING VALIDATION: 482.6 mm vs 582.70 mm DIMENSION CLARIFICATION</span>
        </div>

        <div className="text-xs text-white/80 leading-relaxed space-y-2">
          <p>
            The project poster identifies the vehicle dimensions as <strong className="text-white">482.6 × 331 × 262 mm (L × W × H)</strong>. 
            Simultaneously, the verified CAD engineering blueprint identifies a major dimension of <strong className="text-ocean-cyan">582.70 mm</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="bg-ocean-deep/60 p-3 rounded-lg border border-white/10">
              <span className="font-bold text-ocean-cyan block mb-1">482.60 mm Chassis Frame Length</span>
              Defines the structural side plate length from fore to aft chassis fasteners. Excludes protruding corner thruster ducts.
            </div>
            <div className="bg-ocean-deep/60 p-3 rounded-lg border border-white/10">
              <span className="font-bold text-ocean-gold block mb-1">582.70 mm Outer Thruster Envelope</span>
              Defines the total diagonal operational envelope spanning across the outermost edges of the 45° angled corner thruster cowlings.
            </div>
          </div>
          <p className="text-[11px] text-ocean-ice/60 pt-1">
            ✓ Both dimensions are verified from primary engineering files and represent distinct physical boundaries rather than conflicting measurements.
          </p>
        </div>
      </div>
    </div>
  );
};
