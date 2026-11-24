import React from 'react';
import { PageRoute } from '../types';
import { Award, CheckCircle2, ArrowRight, Phone, MessageSquare, Shield, Cpu, Wrench } from 'lucide-react';
import tritonConfig from '../config/tritonConfig';

interface SponsorshipPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const SponsorshipPage: React.FC<SponsorshipPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-ocean-gold uppercase tracking-widest">
          CORPORATE &amp; INSTITUTIONAL PARTNERSHIP
        </span>
        <h1 className="text-4xl sm:text-6xl font-heading font-black text-white">
          {tritonConfig.sponsorship.heading}
        </h1>
        <p className="text-sm sm:text-base text-ocean-ice/80 leading-relaxed">
          "{tritonConfig.sponsorship.supportingMessage}"
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-ocean-gold to-yellow-500 text-ocean-deep font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-ocean-gold/20 hover:brightness-110 transition-all"
          >
            CONTACT TEAM TRITON
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-xl bg-ocean-cyan text-ocean-deep font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-ocean-cyan/20 hover:brightness-110 transition-all"
          >
            DISCUSS SPONSORSHIP
          </button>
          <button
            onClick={() => onNavigate('technology')}
            className="px-6 py-3 rounded-xl bg-ocean-midnight border border-ocean-blue/50 text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-ocean-blue/30 transition-all"
          >
            EXPLORE OUR TECHNOLOGY
          </button>
        </div>
      </div>

      {/* Why Partner with Team Triton? */}
      <section className="space-y-6">
        <div className="border-b border-ocean-blue/30 pb-3 text-center sm:text-left">
          <span className="text-xs font-bold text-ocean-cyan uppercase tracking-wider">
            VALUE PROPOSITION
          </span>
          <h2 className="text-2xl font-heading font-bold text-white mt-0.5">
            Why Partner with Team Triton?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tritonConfig.sponsorship.whyPartner.map((reason: string, idx: number) => (
            <div 
              key={idx}
              className="card-glass p-5 rounded-xl border border-ocean-blue/30 flex items-start space-x-3"
            >
              <div className="w-7 h-7 rounded-lg bg-ocean-cyan/20 border border-ocean-cyan/30 flex items-center justify-center text-ocean-cyan shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-ocean-cyan" />
              </div>
              <span className="text-xs text-white/90 leading-relaxed font-medium">
                {reason}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5 Sponsorship Categories */}
      <section className="space-y-6">
        <div className="border-b border-ocean-blue/30 pb-3 text-center sm:text-left">
          <span className="text-xs font-bold text-ocean-gold uppercase tracking-wider">
            ENGAGEMENT TIERS
          </span>
          <h2 className="text-2xl font-heading font-bold text-white mt-0.5">
            Sponsorship &amp; Collaboration Categories
          </h2>
          <p className="text-xs text-white/60 pt-1">
            Clearly structured areas of hardware, software, financial, and manufacturing support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tritonConfig.sponsorship.categories.map((cat: any, idx: number) => (
            <div 
              key={cat.id}
              className="card-glass rounded-2xl p-6 border border-ocean-gold/40 hover:border-ocean-gold shadow-xl space-y-4 flex flex-col justify-between transition-all"
            >
              <div className="space-y-3">
                <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-ocean-gold/20 text-ocean-gold">
                  CATEGORY 0{idx + 1}
                </span>
                <h3 className="text-lg font-heading font-bold text-white">
                  {cat.title}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider bg-ocean-midnight hover:bg-ocean-gold hover:text-ocean-deep text-ocean-gold border border-ocean-gold/40 rounded-xl transition-all"
              >
                Inquire for Category 0{idx + 1}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Main Closing Call to Action */}
      <div className="card-glass p-8 sm:p-12 rounded-3xl border border-ocean-cyan/40 bg-gradient-to-br from-ocean-midnight via-[#07253D] to-ocean-deep text-center space-y-6 shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
          {tritonConfig.sponsorship.mainCta}
        </h2>
        <p className="text-xs sm:text-sm text-white/80 max-w-2xl mx-auto leading-relaxed">
          Whether you represent an aerospace manufacturer, marine survey organization, naval defense lab, or academic institution, our team welcomes your collaboration.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:+919884469962"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-ocean-cyan text-ocean-deep font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2"
          >
            <Phone className="w-4 h-4" />
            <span>CALL ASHOK: +91 98844 69962</span>
          </a>

          <a
            href="https://wa.me/919884469962"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-green-500 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WHATSAPP SPONSORSHIP DESK</span>
          </a>
        </div>
      </div>
    </div>
  );
};
