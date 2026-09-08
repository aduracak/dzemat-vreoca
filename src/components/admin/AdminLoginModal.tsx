import React, { useState } from 'react';
import { X, Lock, ShieldCheck, KeyRound, AlertCircle, Database } from 'lucide-react';
import { IslamskaZajednicaLogo } from '../IslamskaZajednicaLogo';
import { verifyAdminPassword, isSupabaseConfigured } from '../../services/supabaseService';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      const isValid = verifyAdminPassword(password);
      setIsSubmitting(false);

      if (isValid) {
        setPassword('');
        onSuccess();
        onClose();
      } else {
        setError('Neispravna lozinka. Molimo pokušajte ponovo.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <div className="flex items-center gap-2.5">
            <IslamskaZajednicaLogo size={28} />
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Imamov Portal
              </h3>
              <p className="text-[11px] text-stone-500">
                Džemat Vreoca • Upravljanje sadržajem
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center mx-auto text-[#1b3d2f] mb-2">
            <Lock className="w-6 h-6" />
          </div>

          <div className="text-center mb-4">
            <h4 className="text-lg font-bold text-stone-900 font-serif">
              Prijava za Imama džemata
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Unesite administratorsku lozinku za pristup panelu.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2 animate-in shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Lozinka pristupa
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                autoFocus
                placeholder="Unesite lozinku..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1b3d2f]/20 focus:border-[#1b3d2f]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-[#1b3d2f] hover:bg-[#142e23] disabled:opacity-50 text-white rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
            >
              {isSubmitting ? 'Provjera lozinke...' : 'Prijavi se u panel'}
            </button>
          </div>

          {/* Database Status Info */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
            <span className="flex items-center gap-1.5">
              <Database className="w-3 h-3" />
              <span>Supabase Cloud:</span>
            </span>
            <span className={isSupabaseConfigured ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-semibold'}>
              {isSupabaseConfigured ? 'Povezano' : 'Lokalni mod (aktivan)'}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
