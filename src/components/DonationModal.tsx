import React from 'react';
import { X, Heart, Clock, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { IslamskaZajednicaLogo } from './IslamskaZajednicaLogo';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPurpose?: string;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <IslamskaZajednicaLogo size={28} />
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Podrška Džematu Vreoca
              </h3>
              <p className="text-[11px] text-stone-500">
                Islamska zajednica u BiH • Medžlis Sarajevo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            title="Zatvori"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body - U Pripremi */}
        <div className="py-8 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center mx-auto mb-4 text-amber-700">
            <Clock className="w-8 h-8 animate-pulse" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>Sistem donacija u pripremi</span>
          </div>

          <h4 className="text-xl font-bold text-stone-900 font-serif mb-3">
            Online i žiro uplate su u fazi usklađivanja
          </h4>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto mb-6">
            U toku je administrativno usklađivanje zvaničnih bankovnih računa i sistema za online donacije džemata Vreoca u koordinaciji sa Medžlisom Islamske zajednice Sarajevo. Čim proces bude kompletiran, na ovoj stranici biće dostupni svi načini uplate.
          </p>

          {/* Direct In-Person Contact Box */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 text-left text-xs space-y-2.5 text-stone-700">
            <div className="font-bold text-[#1b3d2f] flex items-center gap-1.5 text-xs mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Lične uplate i članarina u džematu:</span>
            </div>
            <p className="text-stone-500 text-[11px] leading-relaxed mb-3">
              Do aktivacije digitalnih uplata, vaše priloge za džamiju, članarinu i mekteb možete predati lično blagajniku ili imamu u prostorijama džamije Vreoca prije i poslije namaza.
            </p>

            <div className="pt-2 border-t border-stone-200/70 space-y-1.5 text-[11px] text-stone-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Vreoca 52, 71210 Ilidža</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Imam: +387 (0)64 45 58 002</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>vreoca@medzlis-sarajevo.ba</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-stone-100 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#1b3d2f] hover:bg-[#142e23] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Razumijem, zatvori
          </button>
        </div>
      </div>
    </div>
  );
};
