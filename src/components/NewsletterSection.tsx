import React, { useState } from 'react';
import { Mail, Bell, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { subscribeNewsletter } from '../services/supabaseService';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    const res = await subscribeNewsletter(email, name);

    if (res.success) {
      setStatus('success');
      setFeedbackMessage(res.message || 'Uspješno ste se prijavili na obavijesti džemata Vreoca!');
      setEmail('');
      setName('');
      setTimeout(() => {
        setStatus('idle');
        setFeedbackMessage('');
      }, 5000);
    } else {
      setStatus('error');
      setFeedbackMessage(res.message || 'Došlo je do greške. Molimo pokušajte ponovo.');
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#1b3d2f] text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#142e23] border border-emerald-800/60 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left info */}
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/80 border border-emerald-700/60 text-emerald-200 text-xs font-semibold mb-4">
              <Bell className="w-3.5 h-3.5 text-emerald-400" />
              <span>Džematski bilten i obavijesti</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif tracking-tight text-white mb-3">
              Budite u toku sa svim novostima iz džemata
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed mb-4">
              Prijavite se na našu email listu i automatski primajte nove tekstove hutbi, obavijesti o mektebu, najave tribina i akcija džemata Vreoca.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-emerald-200/90 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Bez neželjene pošte (Anti-spam)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Odjava u bilo kojem trenutku</span>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="w-full lg:max-w-md bg-white rounded-2xl p-6 sm:p-7 text-stone-900 shadow-lg">
            {status === 'success' ? (
              <div className="py-6 text-center animate-in zoom-in-95 duration-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-base font-bold text-stone-900 font-serif mb-1">
                  Hvala vam na prijavi!
                </h4>
                <p className="text-xs text-stone-600">
                  {feedbackMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <h4 className="text-sm font-bold text-stone-900 font-serif mb-1">
                  Prijavite se za primanje novosti
                </h4>

                {status === 'error' && (
                  <div className="p-2.5 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs">
                    {feedbackMessage}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Vaše ime (opciono)
                  </label>
                  <input
                    type="text"
                    placeholder="npr. Adnan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#1b3d2f]/20"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Email adresa <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="vas.email@primjer.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#1b3d2f]/20"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 bg-[#1b3d2f] hover:bg-[#142e23] disabled:opacity-50 text-white py-2.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer mt-2"
                >
                  {status === 'loading' ? (
                    <span>Prijavljivanje...</span>
                  ) : (
                    <>
                      <span>Prijavi se na obavijesti</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
