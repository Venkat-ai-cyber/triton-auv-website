import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import QRCode from 'qrcode';
import { X, Download, Copy, Check, QrCode, Smartphone, Globe } from 'lucide-react';

interface QrAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrAccessModal: React.FC<QrAccessModalProps> = ({ isOpen, onClose }) => {
  const [targetUrl, setTargetUrl] = useState<string>(
    typeof window !== 'undefined' ? window.location.origin + '/' : 'http://localhost:5173/'
  );
  const [lanUrl, setLanUrl] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [qrSvg, setQrSvg] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/network-info')
      .then((r) => r.json())
      .then((data) => {
        if (data?.suggestedUrl) {
          setLanUrl(data.suggestedUrl);
        }
      })
      .catch(() => {});
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !targetUrl.trim()) return;
    const cleanUrl = targetUrl.trim();

    QRCode.toDataURL(cleanUrl, {
      width: 512,
      margin: 2,
      color: {
        dark: '#172832',
        light: '#F5F8F8'
      }
    })
      .then((url) => setQrDataUrl(url))
      .catch(() => {});

    QRCode.toString(cleanUrl, {
      type: 'svg',
      margin: 2,
      color: {
        dark: '#172832',
        light: '#F5F8F8'
      }
    })
      .then((svg) => setQrSvg(svg))
      .catch(() => {});
  }, [isOpen, targetUrl]);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleDownloadPng = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = 'triton-auv-qr-code.png';
    a.click();
  };

  const handleDownloadSvg = () => {
    if (!qrSvg) return;
    const blob = new Blob([qrSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'triton-auv-qr-code.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(targetUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return createPortal(
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#172832]/75 backdrop-blur-sm p-4"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F5F8F8] border border-[#B9C7CC] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5 relative text-[#172832]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-white border border-[#B9C7CC] text-[#172832] hover:bg-[#E8F1F3]"
          aria-label="Close QR Modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#087F83] uppercase tracking-wider">
            <QrCode className="w-4 h-4" />
            <span>SCAN TO VIEW TRITON AUV</span>
          </div>
          <h3 className="text-xl font-heading font-bold text-[#172832]">
            QR Access &amp; Mobile Share
          </h3>
          <p className="text-xs text-[#163C4B]/80">
            Scan with any phone camera or QR scanner to open and explore the TRITON website.
          </p>
        </div>

        {/* QR Code Preview */}
        <div className="bg-white rounded-2xl p-4 border border-[#B9C7CC]/70 flex flex-col items-center justify-center shadow-inner">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="TRITON AUV Website QR Code"
              className="w-52 h-52 rounded-lg border border-[#E8F1F3]"
            />
          ) : (
            <div className="w-52 h-52 flex items-center justify-center text-xs font-mono text-[#163C4B]">
              Generating QR...
            </div>
          )}
          <span className="mt-2.5 text-[11px] font-mono text-[#087F83] font-semibold break-all text-center">
            {targetUrl}
          </span>
        </div>

        {/* Quick Target Switcher */}
        <div className="space-y-2">
          <label className="text-[11px] font-mono font-bold text-[#163C4B] uppercase block">
            Target Website URL
          </label>
          <div className="flex flex-wrap gap-1.5">
            {lanUrl && (
              <button
                onClick={() => setTargetUrl(lanUrl)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold border flex items-center space-x-1 transition-colors ${
                  targetUrl === lanUrl
                    ? 'bg-[#087F83] text-white border-[#087F83]'
                    : 'bg-white text-[#172832] border-[#B9C7CC] hover:border-[#087F83]'
                }`}
              >
                <Smartphone className="w-3 h-3" />
                <span>Same Wi-Fi (Mobile)</span>
              </button>
            )}
            <button
              onClick={() => setTargetUrl(window.location.origin + '/')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold border flex items-center space-x-1 transition-colors ${
                targetUrl === window.location.origin + '/'
                  ? 'bg-[#087F83] text-white border-[#087F83]'
                  : 'bg-white text-[#172832] border-[#B9C7CC] hover:border-[#087F83]'
              }`}
            >
              <Globe className="w-3 h-3" />
              <span>Current Origin</span>
            </button>
          </div>

          <div className="flex space-x-2">
            <input
              type="url"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://your-live-domain.com"
              className="flex-1 bg-white border border-[#B9C7CC] rounded-xl px-3 py-2 text-xs font-mono text-[#172832] placeholder-[#163C4B]/50 focus:border-[#087F83] focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-2 rounded-xl bg-white border border-[#B9C7CC] hover:border-[#087F83] text-xs font-mono font-bold flex items-center space-x-1"
              title="Copy URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#087F83]" />}
            </button>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={handleDownloadPng}
            className="py-2.5 rounded-xl bg-[#087F83] hover:bg-[#163C4B] text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PNG</span>
          </button>
          <button
            onClick={handleDownloadSvg}
            className="py-2.5 rounded-xl bg-white border border-[#B9C7CC] hover:border-[#087F83] text-[#172832] font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#087F83]" />
            <span>Download SVG</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
