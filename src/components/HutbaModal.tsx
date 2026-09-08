import React, { useState } from 'react';
import { X, Copy, Check, Printer, BookOpen, Clock, Calendar, User, Share2 } from 'lucide-react';
import { IslamskaZajednicaLogo } from './IslamskaZajednicaLogo';
import { TextHutba } from '../services/supabaseService';

interface HutbaModalProps {
  hutba: TextHutba | null;
  onClose: () => void;
}

export const HutbaModal: React.FC<HutbaModalProps> = ({ hutba, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  if (!hutba) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${hutba.title}\n${hutba.author || 'Imam džemata Vreoca'} - ${hutba.date_str}\n\n${hutba.content}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <IslamskaZajednicaLogo size={26} />
            <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
              Džemat Vreoca • Tekstualna arhiva hutbi
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Font size toggles */}
            <div className="flex items-center bg-white border border-stone-200 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded font-serif cursor-pointer ${
                  fontSize === 'normal' ? 'bg-stone-100 font-bold text-stone-900' : 'text-stone-500'
                }`}
                title="Standardni font"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded font-serif text-sm cursor-pointer ${
                  fontSize === 'large' ? 'bg-stone-100 font-bold text-stone-900' : 'text-stone-500'
                }`}
                title="Veći font"
              >
                A+
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              title="Kopiraj tekst hutbe"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={handlePrint}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              title="Printaj hutbu"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors cursor-pointer ml-1"
              title="Zatvori"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content - Pure Text Reader Style */}
        <div className="p-6 sm:p-10 max-h-[75vh] overflow-y-auto">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-4">
            <span className="bg-emerald-50 text-[#1b3d2f] font-semibold px-2.5 py-1 rounded-full border border-emerald-200/60">
              {hutba.category}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{hutba.date_str}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Tekstualna hutba</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif tracking-tight mb-4">
            {hutba.title}
          </h2>

          <div className="flex items-center gap-2 pb-6 mb-6 border-b border-stone-100 text-sm text-stone-600">
            <User className="w-4 h-4 text-[#1b3d2f]" />
            <span>Khatib: <strong className="text-stone-900 font-medium">{hutba.author || 'Imam džemata Vreoca'}</strong></span>
          </div>

          {/* Text Body */}
          <div
            className={`font-serif text-stone-800 leading-relaxed whitespace-pre-line space-y-4 ${
              fontSize === 'large' ? 'text-lg sm:text-xl leading-loose' : 'text-base sm:text-lg'
            }`}
          >
            {hutba.content}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Džamija Vreoca • Džuma namaz
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1b3d2f] text-white hover:bg-[#142e23] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Zatvori pregled
          </button>
        </div>
      </div>
    </div>
  );
};
