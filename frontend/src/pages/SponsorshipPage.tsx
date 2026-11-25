import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Award, CheckCircle2, ArrowRight, Phone, MessageSquare, Send } from 'lucide-react';
import tritonConfig from '../config/tritonConfig';

interface SponsorshipPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const SponsorshipPage: React.FC<SponsorshipPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    category: 'Hardware and Component Sponsorship',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg(null);
    try {
      const res = await fetch('/api/contact/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: 'success', text: data.message });
        setFormData({
          name: '',
          email: '',
          organisation: '',
          category: 'Hardware and Component Sponsorship',
          message: ''
        });
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Submission failed.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Network error connecting to local server.' });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-[#D98B73] uppercase tracking-widest">
          CORPORATE &amp; INSTITUTIONAL PARTNERSHIP
        </span>
        <h1 className="text-4xl sm:text-6xl font-heading font-black text-[#172832]">
          {tritonConfig.sponsorship.heading}
        </h1>
        <p className="text-sm sm:text-base text-[#163C4B] leading-relaxed">
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
            className="px-6 py-3 rounded-xl bg-[#EDF3F4] border border-ocean-blue/50 text-[#172832] font-heading font-bold text-xs uppercase tracking-wider hover:bg-ocean-blue/30 transition-all"
          >
            EXPLORE OUR TECHNOLOGY
          </button>
        </div>
      </div>

      {/* Why Partner with Team Triton? */}
      <section className="space-y-6">
        <div className="border-b border-[#B9C7CC]/70 pb-3 text-center sm:text-left">
          <span className="text-xs font-bold text-[#087F83] uppercase tracking-wider">
            VALUE PROPOSITION
          </span>
          <h2 className="text-2xl font-heading font-bold text-[#172832] mt-0.5">
            Why Partner with Team Triton?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tritonConfig.sponsorship.whyPartner.map((reason: string, idx: number) => (
            <div 
              key={idx}
              className="card-glass p-5 rounded-xl border border-[#B9C7CC]/70 flex items-start space-x-3"
            >
              <div className="w-7 h-7 rounded-lg bg-ocean-cyan/20 border border-[#087F83]/30 flex items-center justify-center text-[#087F83] shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-[#087F83]" />
              </div>
              <span className="text-xs text-[#172832]/90 leading-relaxed font-medium">
                {reason}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5 Sponsorship Categories */}
      <section className="space-y-6">
        <div className="border-b border-[#B9C7CC]/70 pb-3 text-center sm:text-left">
          <span className="text-xs font-bold text-[#D98B73] uppercase tracking-wider">
            ENGAGEMENT TIERS
          </span>
          <h2 className="text-2xl font-heading font-bold text-[#172832] mt-0.5">
            Sponsorship &amp; Collaboration Categories
          </h2>
          <p className="text-xs text-[#163C4B]/75 pt-1">
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
                <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-ocean-gold/20 text-[#D98B73]">
                  CATEGORY 0{idx + 1}
                </span>
                <h3 className="text-lg font-heading font-bold text-[#172832]">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#163C4B]/85 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider bg-[#EDF3F4] hover:bg-ocean-gold hover:text-ocean-deep text-[#D98B73] border border-ocean-gold/40 rounded-xl transition-all"
              >
                Inquire for Category 0{idx + 1}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Sponsorship CSV Submission Form */}
      <section className="card-glass p-6 sm:p-10 rounded-3xl border border-[#B9C7CC] space-y-6 shadow-xl">
        <div className="border-b border-[#B9C7CC]/70 pb-4">
          <span className="text-xs font-mono font-bold text-[#087F83] uppercase tracking-wider">
            SPONSORSHIP SUBMISSION (STORED IN SPONSORSHIPS.CSV)
          </span>
          <h2 className="text-2xl font-heading font-bold text-[#172832] mt-1">
            Submit Sponsorship Details
          </h2>
          <p className="text-xs text-[#163C4B]/80 pt-1">
            All sponsorship and collaboration records are securely logged to <code className="font-mono text-[#087F83]">backend/data/sponsorships.csv</code>.
          </p>
        </div>

        {statusMsg && (
          <div className={`p-3.5 rounded-xl border text-xs font-medium ${
            statusMsg.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-red-50 border-red-300 text-red-700'
          }`}>
            {statusMsg.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#163C4B] block mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Full Name"
                className="w-full bg-[#E8F1F3] border border-[#B9C7CC] rounded-xl px-4 py-2.5 text-xs text-[#172832] placeholder-[#163C4B]/55 focus:border-[#087F83] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#163C4B] block mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="sponsor@organisation.com"
                className="w-full bg-[#E8F1F3] border border-[#B9C7CC] rounded-xl px-4 py-2.5 text-xs text-[#172832] placeholder-[#163C4B]/55 focus:border-[#087F83] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#163C4B] block mb-1">Organisation / Company</label>
              <input
                type="text"
                value={formData.organisation}
                onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                placeholder="Marine Robotics Corp"
                className="w-full bg-[#E8F1F3] border border-[#B9C7CC] rounded-xl px-4 py-2.5 text-xs text-[#172832] placeholder-[#163C4B]/55 focus:border-[#087F83] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#163C4B] block mb-1">Sponsorship Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-[#E8F1F3] border border-[#B9C7CC] rounded-xl px-4 py-2.5 text-xs text-[#172832] focus:border-[#087F83] focus:outline-none"
            >
              <option value="Hardware and Component Sponsorship">Hardware and Component Sponsorship</option>
              <option value="Financial Sponsorship">Financial Sponsorship</option>
              <option value="Technology and Computing Support">Technology and Computing Support</option>
              <option value="Manufacturing and Fabrication">Manufacturing and Fabrication</option>
              <option value="Research and Technical Collaboration">Research and Technical Collaboration</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#163C4B] block mb-1">Sponsorship / Collaboration Details *</label>
            <textarea
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe hardware, financial, manufacturing, or technical support details..."
              className="w-full bg-[#E8F1F3] border border-[#B9C7CC] rounded-xl px-4 py-2.5 text-xs text-[#172832] placeholder-[#163C4B]/55 focus:border-[#087F83] focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-7 py-3 rounded-xl bg-[#087F83] hover:bg-[#163C4B] text-white font-heading font-bold text-xs uppercase tracking-wider shadow transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{submitting ? 'Saving to CSV...' : 'Submit Sponsorship Details'}</span>
          </button>
        </form>
      </section>

      {/* Main Closing Call to Action */}
      <div className="p-8 sm:p-12 rounded-3xl border border-[#087F83]/30 bg-[#E8F1F3] text-center space-y-6 shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-heading font-black text-[#172832]">
          {tritonConfig.sponsorship.mainCta}
        </h2>
        <p className="text-xs sm:text-sm text-[#163C4B] max-w-2xl mx-auto leading-relaxed">
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