import React, { useState } from 'react';
import { IslamskaZajednicaLogo } from './IslamskaZajednicaLogo';
import { MapPin, Phone, Mail, Clock, Heart, ArrowUp, Send, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onOpenDonation: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDonation, onNavigate }) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="kontakt" className="bg-[#152a1f] text-stone-300 pt-20 pb-12 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Banner & Quick Inquiry Grid */}
        <div className="bg-[#1e3a2b] rounded-3xl p-8 sm:p-12 mb-16 border border-emerald-800/60 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 block mb-2">
              Stupite u kontakt sa imamom i odborom
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif mb-3">
              Imate pitanje, trebate dovu ili savjet?
            </h3>
            <p className="text-sm text-emerald-100/80 leading-relaxed mb-6">
              Ured džemata Vreoca stoji na raspolaganju svim džematlijama za vjerske usluge, šerijatska vjenčanja, akike, posjete bolesnima i razgovore.
            </p>

            <div className="space-y-3 text-xs text-emerald-100">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Vreoca bb, 71210 Ilidža, Bosna i Hercegovina</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+387 (0)33 762 100 • Imam: +387 (0)61 234 567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>dzemat.vreoca@medzlis-sarajevo.ba</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Radno vrijeme imama: svakodnevno prije i poslije namaza</span>
              </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-7 text-stone-900 shadow-lg">
            {contactSubmitted ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold font-serif text-stone-900">
                  Poruka je uspješno poslata!
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Hvala vam na javljanju. Odgovorićemo vam u najkraćem roku.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3.5 text-xs">
                <h4 className="text-sm font-bold text-stone-900 font-serif mb-2">
                  Pošaljite brzi upit džematu
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Vaše ime i prezime
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="npr. Emir Delić"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Telefon ili Email
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="telefon ili email"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Vaša poruka ili pitanje
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Napišite vaše pitanje, dovu ili prijedlog..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#1e4734] hover:bg-[#163627] text-white py-2.5 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Pošalji poruku</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Links & Official Affiliation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-emerald-900/60">
          {/* Col 1: Brand & Logo */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl w-fit border border-white/10">
              <IslamskaZajednicaLogo size={36} />
              <div>
                <div className="text-base font-bold text-white font-serif">
                  Džemat Vreoca
                </div>
                <div className="text-[11px] text-emerald-200/90 font-medium">
                  Medžlis Islamske zajednice Sarajevo
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Zvanična web stranica džemata Vreoca. Posvećeni očuvanju islamske tradicije Bošnjaka, podršci porodici, obrazovanju omladine i međusobnoj solidarnosti pod okriljem Rijaseta IZ u BiH.
            </p>

            <button
              onClick={onOpenDonation}
              className="inline-flex items-center gap-2 bg-emerald-700/60 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-xs font-semibold border border-emerald-600/40 transition-colors cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-emerald-300" />
              <span>Podrži džemat donacijom</span>
            </button>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-4">
              Brze poveznice
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('pocetna')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Početna stranica
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('o-nama')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  O našem džematu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('vaktija')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Dnevna i mjesečna vaktija
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hutbe')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Arhiva petkovnih hutbi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('mekteb')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Mektebska nastava
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lokacija')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Lokacija i dolazak
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Službeni linkovi */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-4">
              Islamska zajednica
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a
                  href="https://www.islamskazajednica.ba"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Rijaset IZ u BiH
                </a>
              </li>
              <li>
                <a
                  href="https://www.medzlis-sarajevo.ba"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Medžlis IZ Sarajevo
                </a>
              </li>
              <li>
                <a
                  href="https://preporod.info"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Islamske informativne novine Preporod
                </a>
              </li>
              <li>
                <a
                  href="https://www.bir.ba"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Radio BIR
                </a>
              </li>
              <li>
                <a
                  href="https://www.vakuf.ba"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Vakufska direkcija Sarajevo
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Džemat Vreoca. Sva prava zadržana. Islamska zajednica u Bosni i Hercegovini.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-emerald-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Vrati se na vrh</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
