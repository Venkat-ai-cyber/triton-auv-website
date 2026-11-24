import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Phone, MessageSquare, Copy, Check, Send, MapPin, Anchor, ShieldCheck } from 'lucide-react';
import { submitEnquiry } from '../services/api';
import tritonConfig from '../config/tritonConfig';

interface ContactPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    category: 'Sponsorship Enquiry',
    message: ''
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<{ success: boolean; text: string } | null>(null);

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText('9884469962');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg(null);

    const res = await submitEnquiry(formData);
    setSubmitting(false);
    if (res.success) {
      setStatusMsg({ success: true, text: res.message });
      setFormData({ name: '', email: '', organisation: '', category: 'Sponsorship Enquiry', message: '' });
    } else {
      setStatusMsg({ success: false, text: res.message });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-ocean-gold uppercase tracking-widest">
          DIRECT COMMUNICATIONS DESK
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-white">
          CONTACT TEAM TRITON
        </h1>
        <p className="text-sm text-ocean-ice/80">
          Reach Team Triton directly for technical collaboration, sponsorship discussions, or hardware evaluations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          {/* Primary Lead Card */}
          <div className="card-glass rounded-2xl p-6 sm:p-8 border border-ocean-cyan/40 shadow-2xl space-y-6">
            <div className="flex items-center space-x-3 border-b border-ocean-blue/30 pb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean-cyan to-ocean-blue flex items-center justify-center text-ocean-deep font-bold text-xl">
                <Anchor className="w-6 h-6 text-ocean-deep" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-ocean-gold uppercase tracking-wider">
                  PRIMARY POINT OF CONTACT
                </span>
                <h3 className="text-2xl font-heading font-black text-white">
                  {tritonConfig.contact.person}
                </h3>
                <p className="text-xs text-ocean-aqua">
                  Team Triton · Autonomous Underwater Vehicle Project
                </p>
              </div>
            </div>

            {/* Direct Action Channels */}
            <div className="space-y-3">
              {/* Phone Dial */}
              <div className="bg-ocean-deep/60 p-4 rounded-xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-ocean-cyan" />
                  <div>
                    <span className="text-[10px] text-white/50 block">Voice Call</span>
                    <a href={tritonConfig.contact.phoneUri} className="text-sm font-bold text-white hover:text-ocean-cyan font-mono">
                      {tritonConfig.contact.internationalFormat}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={copyPhoneNumber}
                    className="p-2 rounded-lg bg-ocean-midnight text-white/70 hover:text-white border border-white/10"
                    title="Copy phone number"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={tritonConfig.contact.phoneUri}
                    className="px-3 py-1.5 rounded-lg bg-ocean-cyan text-ocean-deep font-bold text-xs uppercase"
                  >
                    Call
                  </a>
                </div>
              </div>

              {/* WhatsApp Link */}
              <div className="bg-ocean-deep/60 p-4 rounded-xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-green-400" />
                  <div>
                    <span className="text-[10px] text-white/50 block">Instant Chat</span>
                    <span className="text-sm font-bold text-white font-mono">WhatsApp Connect</span>
                  </div>
                </div>

                <a
                  href={tritonConfig.contact.whatsappUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-green-500 text-white font-bold text-xs uppercase shadow hover:brightness-110"
                >
                  Message
                </a>
              </div>

              {/* Institution Address */}
              <div className="bg-ocean-deep/60 p-4 rounded-xl border border-white/10 flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-ocean-gold shrink-0 mt-0.5" />
                <div className="text-xs text-white/80 leading-relaxed">
                  <span className="font-bold text-white block mb-0.5">Team Triton Operations</span>
                  Team Triton Autonomous Robotics Facility, India
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sponsorship Enquiry Form */}
        <div className="card-glass rounded-2xl p-6 sm:p-8 border border-ocean-blue/40 shadow-2xl space-y-6">
          <div className="border-b border-ocean-blue/30 pb-3">
            <h3 className="text-xl font-heading font-bold text-white">
              Send Sponsorship or Technical Enquiry
            </h3>
            <p className="text-xs text-white/60 pt-1">
              Directly records your submission to local project database and contacts Ashok.
            </p>
          </div>

          {statusMsg && (
            <div className={`p-4 rounded-xl text-xs font-semibold ${
              statusMsg.success 
                ? 'bg-green-950/50 border border-green-500/40 text-green-300' 
                : 'bg-red-950/50 border border-red-500/40 text-red-300'
            }`}>
              {statusMsg.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-white/80 block mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr. S. Ramesh / Jane Doe"
                className="w-full bg-ocean-deep/80 border border-ocean-blue/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-ocean-cyan focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-white/80 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@marine.org"
                  className="w-full bg-ocean-deep/80 border border-ocean-blue/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-ocean-cyan focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/80 block mb-1">Company / Organisation</label>
                <input
                  type="text"
                  value={formData.organisation}
                  onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                  placeholder="Subsea Systems Inc."
                  className="w-full bg-ocean-deep/80 border border-ocean-blue/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-ocean-cyan focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/80 block mb-1">Enquiry Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-ocean-deep/80 border border-ocean-blue/40 rounded-xl px-4 py-2.5 text-xs text-white focus:border-ocean-cyan focus:outline-none"
              >
                <option value="Hardware Sponsorship">Hardware and Component Sponsorship</option>
                <option value="Financial Sponsorship">Financial Sponsorship</option>
                <option value="Technology Support">Technology and Computing Support</option>
                <option value="Fabrication Support">Manufacturing and Fabrication Support</option>
                <option value="Research Collaboration">Research and Technical Collaboration</option>
                <option value="General Enquiry">General Project Enquiry</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/80 block mb-1">Message *</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Details regarding your organization's sponsorship interest or technical collaboration goals..."
                className="w-full bg-ocean-deep/80 border border-ocean-blue/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-ocean-cyan focus:outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-ocean-cyan to-ocean-aqua text-ocean-deep font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-ocean-cyan/20 hover:brightness-110 transition-all flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'RECORDING ENQUIRY...' : 'SUBMIT ENQUIRY TO TEAM TRITON'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
