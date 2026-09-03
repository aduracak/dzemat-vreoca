import React from 'react';
import { Users, Heart, BookOpen, ShieldCheck, Star, Award, Compass, Sparkles } from 'lucide-react';
import { IslamskaZajednicaLogo } from './IslamskaZajednicaLogo';

export const AboutSection: React.FC<{ onOpenDonation: () => void }> = ({ onOpenDonation }) => {
  const stats = [
    { number: '600+', label: 'Džematskih porodica', sub: 'Aktivni članovi džemata' },
    { number: '85+', label: 'Polaznika mekteba', sub: 'Dječaci i djevojčice u mektebu' },
    { number: '5', label: 'Dnevnih namaza', sub: 'Otvorena džamija za svaki vakat' },
    { number: '100%', label: 'Vakufsko povjerenje', sub: 'Transparentan rad i odgovornost' },
  ];

  return (
    <section id="o-nama" className="py-20 sm:py-28 bg-[#fafaf9] border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Historijat i zajednica</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-serif leading-tight">
            Mjesto gdje se vjera, komšiluk i dobročinstvo susreću
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
            Džemat Vreoca je dinamična zajednica vjernika smještena podno planine Igman u općini Ilidža. 
            Naša džamija je dom zajedničke molitve, učenja, međusobnog pomaganja i očuvanja bošnjačkog identiteta i islamskih vrijednosti.
          </p>
        </div>

        {/* Bento Grid Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Misija */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-5">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 font-serif mb-2.5">
                Ibadet i solidarnost
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Pored redovnih molitvi, naš džemat njeguje humanitarni fond koji kontinuirano pruža podršku socijalno ugroženim porodicama, bolesnima i starima na području Vreoca.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500 font-medium">
              Aktivno humanitarno djelovanje
            </div>
          </div>

          {/* Card 2: Mekteb i omladina */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-5">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 font-serif mb-2.5">
                Odgoj i obrazovanje
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Mektebska nastava u Vreocima pruža mladima snažne moralne temelje, učenje kur'anskog pisma (sufare), osnova islama i vrlina lijepog ahlaka i bontona.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500 font-medium">
              Svake subote i nedjelje
            </div>
          </div>

          {/* Card 3: Pod okriljem Islamske zajednice */}
          <div className="bg-[#1e4734] text-white rounded-3xl p-7 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="mb-4">
                <IslamskaZajednicaLogo size={32} />
              </div>
              <h3 className="text-xl font-bold text-white font-serif mb-2.5">
                Institucionalna stabilnost
              </h3>
              <p className="text-sm text-emerald-100/90 leading-relaxed">
                Džemat Vreoca djeluje u sastavu Medžlisa Islamske zajednice Sarajevo, u punoj pravnoj i duhovnoj usklađenosti sa Rijasetom IZ u Bosni i Hercegovini.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-800/80 text-xs text-emerald-200">
              Medžlis IZ Sarajevo • RIZ u BiH
            </div>
          </div>
        </div>

        {/* Numbers / Stats Grid */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/80 shadow-xs grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="p-3">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1e4734] font-mono tracking-tight">
                {stat.number}
              </div>
              <div className="text-sm font-bold text-stone-900 mt-1">{stat.label}</div>
              <div className="text-xs text-stone-500 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
