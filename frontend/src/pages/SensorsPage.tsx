import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Compass, Gauge, Radio, Droplets, Thermometer, Camera, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import tritonConfig from '../config/tritonConfig';

interface SensorsPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const SensorsPage: React.FC<SensorsPageProps> = ({ onNavigate }) => {
  const [selectedSensor, setSelectedSensor] = useState<string>('imu');

  const sensors = [
    {
      id: 'imu',
      name: 'IMU (Inertial Measurement Unit)',
      model: 'ICM-20948',
      type: '9-DOF Motion Tracking',
      bus: 'SPI / I2C',
      location: 'Internal Avionics Bay (Center of Gravity)',
      function: 'Low-noise 3-axis gyroscope, 3-axis accelerometer, and 3-axis compass enabling high-frequency attitude and angular rate estimation for the EKF3 navigation filter.',
      status: 'Active · Primary Flight Sensor'
    },
    {
      id: 'depth',
      name: 'Depth & Pressure Sensor',
      model: 'Bar30',
      type: 'High-Resolution Piezoresistive',
      bus: 'I2C via Marine Penetrator',
      location: 'Rear End Cap Water Interface',
      function: 'Measures subsea hydrostatic pressure up to 30 bar with 0.2 mm resolution, providing millimeter-level depth holding, ascent rate calculation, and water temperature.',
      status: 'Active · Precision Depth Hold'
    },
    {
      id: 'magnetometer',
      name: 'Compass & Magnetometer',
      model: 'RM3100',
      type: 'Geomagnetic Sensor',
      bus: 'SPI Interface',
      location: 'Isolated Forward Mount',
      function: 'High-precision magnetic induction compass immune to magnetic drift, delivering high heading stability and heading hold across GPS-denied submerged routes.',
      status: 'Active · Magnetic Heading'
    },
    {
      id: 'leak',
      name: 'Internal Leak Sensor',
      model: 'Conductivity Probe',
      type: 'Hermetic Integrity Failsafe',
      bus: 'Digital GPIO Interrupt',
      location: 'Lowest Internal Point of Hull',
      function: 'Continuously monitors for moisture ingress. Instantaneously triggers Pixhawk emergency motor kill and surfaces vehicle via passive buoyancy in water breach.',
      status: 'Active · Safety Failsafe'
    },
    {
      id: 'temp',
      name: 'Thermal Sensor',
      model: 'Internal Digital Probe',
      type: 'Thermal Monitoring',
      bus: 'Internal Telemetry Bus',
      location: 'Avionics Compute Enclosure',
      function: 'Monitors ambient thermal buildup inside the sealed acrylic hull to prevent throttling of the NVIDIA Jetson Orin Nano compute board and 30A ESCs.',
      status: 'Active · Thermal Telemetry'
    },
    {
      id: 'front_cam',
      name: 'Forward Inspection Camera',
      model: 'Low-Light HD Camera',
      type: 'Optical Vision (1080p)',
      bus: 'USB 3.0 to Jetson Orin Nano',
      location: 'Center Front Acrylic Dome',
      function: 'Primary vision input feeding the YOLOv11 neural network for gate qualification, obstacle detection, and long-range inspection targets.',
      status: 'Active · YOLOv11 Vision Input'
    },
    {
      id: 'down_cam',
      name: 'Downward Surveying Camera',
      model: 'Wide-Angle HD Camera (39.23°)',
      type: 'Bottom Bathymetry & Pipeline',
      bus: 'USB 3.0 to Jetson Orin Nano',
      location: 'Lower Angled Camera Mount',
      function: 'Angled forward-downward at 39.23° (verified in CAD blueprint) for seafloor tracking, submerged pipeline and cable inspection, and seabed target mapping.',
      status: 'Active · Seafloor Tracking'
    },
    {
      id: 'hydrophones',
      name: 'Three-Hydrophone Array',
      model: '40 kHz Acoustic Array',
      type: 'Acoustic Pinger Localisation',
      bus: 'ADC / Hardware Sampling',
      location: 'Triangular Base Array on Lower Chassis',
      function: 'Triangulates underwater acoustic transmitters (pingers) by calculating Time Difference of Arrival (TDoA) between 3 hydrophone receiver nodes.',
      status: 'Architecture Verified · 40 kHz'
    }
  ];

  const current = sensors.find(s => s.id === selectedSensor) || sensors[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-ocean-gold uppercase tracking-widest">
          SENSORY SUITE &amp; MULTI-MODAL PERCEPTION
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-white">
          SENSORS &amp; PERCEPTION
        </h1>
        <p className="text-sm text-ocean-ice/80">
          Inertial Navigation, Pressure Telemetry, Optical Inspection, and Acoustic Localisation
        </p>
      </div>

      {/* Interactive Sensor Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sensor List Selector */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-ocean-gold uppercase tracking-wider mb-2">
            Select Marine Sensor:
          </div>
          <div className="space-y-1.5">
            {sensors.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSensor(s.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                  selectedSensor === s.id
                    ? 'bg-ocean-cyan text-ocean-deep border-ocean-cyan font-bold shadow-lg shadow-ocean-cyan/20 scale-[1.02]'
                    : 'bg-ocean-midnight/60 border-ocean-blue/30 text-white/80 hover:bg-ocean-blue/20'
                }`}
              >
                <div>
                  <div className="font-heading font-bold">{s.name}</div>
                  <div className={`text-[10px] ${selectedSensor === s.id ? 'text-ocean-deep/80' : 'text-ocean-aqua'}`}>
                    {s.model}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Selected Sensor Deep-Dive Card */}
        <div className="lg:col-span-2 card-glass rounded-2xl p-6 sm:p-8 border border-ocean-cyan/40 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-ocean-blue/30 pb-4">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-ocean-cyan/20 text-ocean-cyan">
                {current.type}
              </span>
              <h3 className="text-2xl font-heading font-bold text-white mt-1">
                {current.name}
              </h3>
              <p className="text-sm font-mono text-ocean-gold font-semibold">
                Model: {current.model}
              </p>
            </div>
            <div className="px-3 py-1 rounded-full bg-green-950/40 border border-green-500/40 text-[11px] font-semibold text-green-400">
              {current.status}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-1">
                Primary Function &amp; Telemetry
              </span>
              <p className="text-sm text-white/80 leading-relaxed bg-ocean-deep/60 p-4 rounded-xl border border-white/5">
                {current.function}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-ocean-midnight/50 p-4 rounded-xl border border-ocean-blue/20 space-y-1">
                <span className="text-[10px] text-ocean-ice/60 uppercase tracking-wider block">Hardware Bus Interface</span>
                <span className="text-sm font-bold text-white font-mono">{current.bus}</span>
              </div>
              <div className="bg-ocean-midnight/50 p-4 rounded-xl border border-ocean-blue/20 space-y-1">
                <span className="text-[10px] text-ocean-ice/60 uppercase tracking-wider block">Physical Hull Mount Location</span>
                <span className="text-sm font-bold text-ocean-aqua">{current.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sensor Placement Spatial Architecture */}
      <div className="card-glass rounded-2xl p-6 sm:p-8 border border-ocean-blue/40 shadow-2xl space-y-4">
        <h3 className="text-xl font-heading font-bold text-white">
          Spatial Sensor Mapping &amp; Layout
        </h3>
        <p className="text-xs text-white/70 leading-relaxed">
          Sensors are spatially separated to avoid electromagnetic interference: the high-precision RM3100 magnetometer is mounted forward, away from high-current 30A ESC busbars, while the Bar30 pressure transducer is routed through the rear end cap with direct exposure to ambient hydrostatic pressure.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {sensors.map((s, idx) => (
            <div key={idx} className="bg-ocean-deep/60 p-3 rounded-lg border border-white/5 text-xs">
              <span className="font-bold text-ocean-cyan block">{s.model}</span>
              <span className="text-[11px] text-white/60">{s.name.split('(')[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
