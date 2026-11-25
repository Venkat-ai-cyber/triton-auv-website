import React, { useState } from 'react';
import { PageRoute } from '../types';
import { TritonViewer } from '../components/3d/TritonViewer';
import { DrawingViewer } from '../components/cad/DrawingViewer';
import { Box, FileText, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import tritonConfig from '../config/tritonConfig';

interface CadDesignPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const CadDesignPage: React.FC<CadDesignPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'3d' | 'drawing'>('3d');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-[#D98B73] uppercase tracking-widest">
          INTERACTIVE 3D CAD &amp; ENGINEERING BLUEPRINTS
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-[#172832]">
          CAD &amp; MECHANICAL DESIGN
        </h1>
        <p className="text-sm text-[#163C4B]">
          Interactive STEP-Derived 3D Model, Subsystem Isolation, 2D Orthographic Blueprints, and Dimensional Verification
        </p>

        {/* Tab Toggle */}
        <div className="flex justify-center space-x-3 pt-4">
          <button
            onClick={() => setActiveTab('3d')}
            className={`px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 ${
              activeTab === '3d'
                ? 'bg-ocean-cyan text-ocean-deep shadow-lg shadow-ocean-cyan/20 scale-105'
                : 'bg-white text-[#163C4B]/85 hover:text-[#172832] border border-[#B9C7CC]/80'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>Interactive 3D CAD Model</span>
          </button>

          <button
            onClick={() => setActiveTab('drawing')}
            className={`px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 ${
              activeTab === 'drawing'
                ? 'bg-ocean-cyan text-ocean-deep shadow-lg shadow-ocean-cyan/20 scale-105'
                : 'bg-white text-[#163C4B]/85 hover:text-[#172832] border border-[#B9C7CC]/80'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>2D Engineering Drawing (PDF)</span>
          </button>
        </div>
      </div>

      {/* Main Display Area */}
      {activeTab === '3d' ? (
        <section className="space-y-6">
          <TritonViewer className="h-[550px] sm:h-[650px] w-full" />
          
          {/* 3D Features & Verification Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card-glass p-4 rounded-xl border border-[#B9C7CC]/70 text-xs">
              <span className="font-bold text-[#087F83] block mb-1">Rotatable 360°</span>
              Full orbit, zoom, and pan controls with automatic camera recentering and idle rotation.
            </div>
            <div className="card-glass p-4 rounded-xl border border-[#B9C7CC]/70 text-xs">
              <span className="font-bold text-[#087F83] block mb-1">Subsystem Isolation</span>
              Highlight or isolate Complete Vehicle, 8 Thrusters, Pressure Hull, Structural Frame, or Sensors.
            </div>
            <div className="card-glass p-4 rounded-xl border border-[#B9C7CC]/70 text-xs">
              <span className="font-bold text-[#D98B73] block mb-1">CAD Fidelity Switch</span>
              Toggle between the full component-identified assembly and the raw reconstructed CAD mesh.
            </div>
            <div className="card-glass p-4 rounded-xl border border-[#B9C7CC]/70 text-xs">
              <span className="font-bold text-[#087F83] block mb-1">Physical Materials</span>
              PBR metallic aluminum frame, optical transparent acrylic cylinder, and marine cyan highlights.
            </div>
          </div>
        </section>
      ) : (
        <section className="space-y-6">
          <DrawingViewer />
        </section>
      )}

      {/* Physical Dimensions Summary */}
      <div className="card-glass rounded-2xl p-6 sm:p-8 border border-[#B9C7CC]/80 shadow-2xl space-y-4">
        <h3 className="text-xl font-heading font-bold text-[#172832]">
          CAD Geometry &amp; Verified Dimension Ledger
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="bg-[#F5F8F8] p-3 rounded-lg border border-[#B9C7CC]/40">
            <span className="text-[#163C4B]/65 block text-[10px]">Frame Length</span>
            <span className="font-bold text-[#087F83] text-sm">482.60 mm</span>
          </div>
          <div className="bg-[#F5F8F8] p-3 rounded-lg border border-[#B9C7CC]/40">
            <span className="text-[#163C4B]/65 block text-[10px]">Frame Width</span>
            <span className="font-bold text-[#087F83] text-sm">331.02 mm</span>
          </div>
          <div className="bg-[#F5F8F8] p-3 rounded-lg border border-[#B9C7CC]/40">
            <span className="text-[#163C4B]/65 block text-[10px]">Overall Height</span>
            <span className="font-bold text-[#087F83] text-sm">262.52 mm</span>
          </div>
          <div className="bg-[#F5F8F8] p-3 rounded-lg border border-[#B9C7CC]/40">
            <span className="text-[#163C4B]/65 block text-[10px]">Thruster Diagonal</span>
            <span className="font-bold text-[#D98B73] text-sm">582.70 mm</span>
          </div>
          <div className="bg-[#F5F8F8] p-3 rounded-lg border border-[#B9C7CC]/40">
            <span className="text-[#163C4B]/65 block text-[10px]">Hull Diameter</span>
            <span className="font-bold text-[#087F83] text-sm">114.30 mm</span>
          </div>
          <div className="bg-[#F5F8F8] p-3 rounded-lg border border-[#B9C7CC]/40">
            <span className="text-[#163C4B]/65 block text-[10px]">Hull Length</span>
            <span className="font-bold text-[#087F83] text-sm">443.22 mm</span>
          </div>
        </div>
      </div>
    </div>
  );
};