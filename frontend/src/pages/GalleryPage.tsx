import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Image as ImageIcon, ZoomIn, X, Download, Filter, Eye } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageRoute) => void;
}

type GalleryCategory = 'all' | 'cad' | 'drawings' | 'renders' | 'hardware' | 'testing' | 'poster';

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  const galleryItems = [
    {
      id: 'poster_official',
      title: 'TRITON Official Project Poster',
      category: 'poster',
      src: '/assets/images/poster/triton_project_poster.png',
      caption: 'Full technical presentation poster from Team Triton detailing vehicle identity, specifications, and propulsion.',
      tag: 'Official Project Poster'
    },
    {
      id: 'drawing_2d',
      title: '2D Orthographic CAD Blueprint',
      category: 'drawings',
      src: '/assets/images/triton_engineering_drawing.png',
      caption: 'Verified multi-view CAD engineering blueprint containing 482.60 mm, 331.02 mm, 262.52 mm, and 582.70 mm envelope dimensions.',
      tag: 'Engineering Drawing'
    },
    {
      id: 'gate_real',
      title: 'Underwater Competition Gate (Red & Green)',
      category: 'testing',
      src: '/assets/images/underwater_gate_real.png',
      caption: 'Underwater pool qualification gate with optical white-balance enhancement for neural target transit benchmarking.',
      tag: 'Testing & Vision'
    },
    {
      id: 'gate_sample_1',
      title: 'RoboSub Autonomous Gate Approach',
      category: 'testing',
      src: '/assets/images/gate_sample_1.jpg',
      caption: 'Real underwater dataset footage showing subsea qualification frame and turbidity gradients.',
      tag: 'Testing & Vision'
    },
    {
      id: 'gate_sample_2',
      title: 'Subsea Inspection Marker Target',
      category: 'testing',
      src: '/assets/images/gate_sample_2.jpg',
      caption: 'RoboSub benchmark image used for YOLOv11 edge inference validation.',
      tag: 'Testing & Vision'
    },
    {
      id: 'cad_mesh_preview',
      title: 'Original CAD Reconstruction (Isometric View)',
      category: 'cad',
      src: '/assets/images/triton_engineering_drawing.png',
      caption: 'Isometric perspective of the chassis, cylindrical pressure hull, top dual buoyancy pods, and 8 thrusters.',
      tag: 'CAD Design'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Assets' },
    { id: 'poster', label: 'Project Poster' },
    { id: 'drawings', label: 'Engineering Drawings' },
    { id: 'cad', label: 'CAD Designs' },
    { id: 'testing', label: 'Testing & Vision' }
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-ocean-gold uppercase tracking-widest">
          PROJECT VISUAL REPOSITORY
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-white">
          ASSET &amp; CAD GALLERY
        </h1>
        <p className="text-sm text-ocean-ice/80">
          Official Project Poster, Multi-View Engineering Drawings, CAD Assembly Renders, and Subsea Test Imagery
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id as GalleryCategory)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === c.id
                  ? 'bg-ocean-cyan text-ocean-deep shadow-md shadow-ocean-cyan/20 scale-105'
                  : 'bg-ocean-midnight/70 text-white/70 hover:text-white border border-ocean-blue/30'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="card-glass rounded-2xl overflow-hidden border border-ocean-blue/30 hover:border-ocean-cyan/60 transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] bg-[#020b12] overflow-hidden flex items-center justify-center p-2">
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-ocean-deep/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2.5 rounded-full bg-ocean-cyan/90 text-ocean-deep font-bold shadow-lg">
                  <ZoomIn className="w-5 h-5" />
                </span>
              </div>
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-ocean-midnight/90 text-ocean-cyan border border-ocean-cyan/30">
                {item.tag}
              </span>
            </div>

            <div className="p-4 space-y-1">
              <h3 className="text-sm font-heading font-bold text-white group-hover:text-ocean-cyan transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-white/60 line-clamp-2">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center animate-in fade-in">
          <div className="w-full max-w-5xl flex justify-between items-center text-white mb-4">
            <div>
              <h3 className="font-heading font-bold text-lg text-white">{selectedImage.title}</h3>
              <p className="text-xs text-ocean-aqua">{selectedImage.tag}</p>
            </div>
            <div className="flex items-center space-x-3">
              <a 
                href={selectedImage.src} 
                download 
                className="p-2 rounded-lg bg-ocean-midnight text-ocean-cyan hover:bg-ocean-blue/30 transition-colors"
                title="Download Image"
              >
                <Download className="w-5 h-5" />
              </a>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 rounded-lg bg-ocean-midnight text-white hover:bg-red-500/20 hover:text-red-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="max-w-5xl max-h-[75vh] overflow-hidden rounded-xl border border-ocean-cyan/30 bg-ocean-deep/80 p-2 flex items-center justify-center">
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title} 
              className="max-h-[70vh] w-auto object-contain rounded"
            />
          </div>

          <p className="text-xs text-white/70 max-w-2xl text-center mt-3">
            {selectedImage.caption}
          </p>
        </div>
      )}
    </div>
  );
};
