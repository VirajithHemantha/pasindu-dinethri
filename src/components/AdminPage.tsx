import React, { useState, useEffect } from 'react';
import { Copy, Link as LinkIcon, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const AdminPage: React.FC = () => {
  const [prefix, setPrefix] = useState('Mr. & Mrs.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const prefixes = [
    'Mr. & Mrs.',
    'Mr.',
    'Mrs.',
    'Ms.',
    'Dr.',
    'Prof.',
    'Rev.'
  ];

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    const url = new URL(window.location.origin);
    url.searchParams.set('prefix', prefix);
    url.searchParams.set('name', guestName.trim());
    setGeneratedLink(url.toString());
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-brand-ivory flex items-center justify-center p-6 font-sans">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl max-h-3xl bg-brand-beige/20 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg glass p-8 sm:p-12 rounded-[2.5rem] border border-white/60 shadow-[0_30px_60px_rgba(176,137,104,0.1)] relative overflow-hidden bg-white/70 backdrop-blur-3xl z-10"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-beige to-transparent opacity-50" />

        <div className="text-center mb-10">
          <LinkIcon className="w-8 h-8 text-brand-beige-deep mx-auto mb-4" />
          <h2 className="text-3xl font-display text-stone-800 tracking-tight">
            Link <span className="italic font-light text-brand-beige-deep">Generator</span>
          </h2>
          <p className="text-stone-500 font-serif italic mt-2">Generate personalized invitation links</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-3 ml-2">Prefix</label>
            <select
              className="w-full bg-white/80 px-6 py-4 rounded-full border border-stone-200/60 focus:ring-2 focus:ring-brand-beige/30 focus:border-brand-beige-deep/40 outline-none transition-all duration-300 appearance-none font-serif text-lg shadow-inner text-stone-700 cursor-pointer"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
            >
              {prefixes.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-3 ml-2">Guest Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              className="w-full bg-white/80 px-6 py-4 rounded-full border border-stone-200/60 focus:ring-2 focus:ring-brand-beige/30 focus:border-brand-beige-deep/40 outline-none transition-all duration-300 font-serif text-lg shadow-inner placeholder:text-stone-300 text-stone-700"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!guestName.trim()}
            className="w-full bg-stone-800 text-brand-champagne py-5 rounded-full font-sans tracking-[0.2em] font-bold text-[11px] uppercase hover:bg-stone-900 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            Generate Link
          </button>

          {generatedLink && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-6 bg-white/90 rounded-[2rem] border border-brand-beige/30 shadow-inner"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-3 text-center">Generated Link</p>
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 break-all text-sm font-mono text-stone-600 mb-4 selection:bg-brand-beige/20 text-center">
                {generatedLink}
              </div>
              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 bg-brand-champagne/50 text-brand-beige-deep py-4 rounded-full font-sans tracking-[0.1em] font-bold text-[11px] uppercase hover:bg-brand-champagne transition-all duration-300 border border-brand-beige/30"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </>
                )}
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
