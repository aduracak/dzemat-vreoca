import React, { useState, useEffect } from 'react';
import { VreocaMosqueVisual } from './VreocaMosqueVisual';
import { Calendar, ArrowRight, Clock, Sparkles, ChevronRight, Share2, Check } from 'lucide-react';
import { DAILY_VERSES } from '../data/vaktijaData';
import { fetchTodayVaktija, PrayerItem, PRAYER_NAMES, FALLBACK_VAKTIJA } from '../services/vaktijaService';

interface HeroSectionProps {
  onOpenDonation: () => void;
  onExploreAbout: () => void;
  onOpenVaktija: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenDonation,
  onExploreAbout,
  onOpenVaktija,
}) => {
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [copiedVerse, setCopiedVerse] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prayers, setPrayers] = useState<PrayerItem[]>(() =>
    PRAYER_NAMES.map((p, i) => ({ ...p, time: FALLBACK_VAKTIJA[i] }))
  );
  const [apiDateStr, setApiDateStr] = useState<string>('');
  const [isLiveApi, setIsLiveApi] = useState<boolean>(false);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch live prayer times from vaktija.ba API for Sarajevo/Ilidža (ID 77)
  useEffect(() => {
    let mounted = true;
    fetchTodayVaktija().then((data) => {
      if (mounted) {
        setPrayers(data.times);
        setApiDateStr(data.dateStr);
        setIsLiveApi(data.isLive);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Determine next prayer based on current time and live vaktija.ba times
  const getNextPrayer = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const currentMinutes = hours * 60 + minutes;

    for (const prayer of prayers) {
      const [pHours, pMinutes] = prayer.time.split(':').map(Number);
      const prayerMinutes = pHours * 60 + pMinutes;

      if (prayerMinutes > currentMinutes) {
        const diffMinutes = prayerMinutes - currentMinutes;
        const h = Math.floor(diffMinutes / 60);
        const m = diffMinutes % 60;
        const s = 60 - currentTime.getSeconds();
        return {
          name: prayer.name,
          arabic: prayer.arabic,
          time: prayer.time,
          countdown: `${h > 0 ? `${h}h ` : ''}${m}m ${s < 60 ? `${s}s` : ''}`,
          key: prayer.key,
        };
      }
    }

    // After Jacija, next is tomorrow's Zora
    return {
      name: 'Zora (sutra)',
      arabic: 'الفجر',
      time: prayers[0]?.time || '04:30',
      countdown: 'do zore',
      key: 'zora',
    };
  };

  const nextPrayer = getNextPrayer();
  const currentVerse = DAILY_VERSES[currentVerseIndex];

  const handleCopyVerse = () => {
    navigator.clipboard.writeText(`"${currentVerse.translation}" (${currentVerse.surah}, ${currentVerse.ayah}) - Džemat Vreoca`);
    setCopiedVerse(true);
    setTimeout(() => setCopiedVerse(false), 2000);
  };


  return (
    <section id="pocetna" className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-[#fafaf9]">
      {/* Full Hero Panoramic Background with authentic Vreoca Mosque & Misty Fade */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <VreocaMosqueVisual />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Hero Content Area matching reference mockup screenshot */}
        <div className="min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] flex flex-col justify-center pt-8 sm:pt-12 pb-10 sm:pb-12 max-w-xl lg:max-w-2xl">
          {/* Main Title: "Džemat Vreoca" in signature deep emerald serif */}
          <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-serif text-[#1b3d2f] font-normal tracking-tight leading-[1.08] mb-4">
            Džemat Vreoca
          </h1>

          {/* Subtitle matching reference screenshot */}
          <p className="text-xl sm:text-2xl text-stone-900 font-semibold tracking-tight mb-3">
            Mjesto ibadeta. Znanja. Zajedništva.
          </p>

          {/* Description matching reference screenshot */}
          <p className="text-sm sm:text-base text-stone-600 max-w-md leading-relaxed mb-8">
            Zajedno gradimo snažnu vjeru, prenosimo znanje i jačamo zajedništvo u našem džematu.
          </p>

          {/* CTA Buttons matching reference screenshot */}
          <div className="flex flex-wrap items-center gap-3.5">
            {/* Primary button: "Upoznaj džemat" */}
            <button
              id="hero-explore-btn"
              onClick={onExploreAbout}
              className="bg-[#1b3d2f] hover:bg-[#142e23] text-white px-6 sm:px-7 py-3 rounded-xl text-sm sm:text-base font-medium shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Upoznaj džemat
            </button>

            {/* Secondary button: "Današnja vaktija" with clock icon */}
            <button
              id="hero-vaktija-btn"
              onClick={onOpenVaktija}
              className="bg-white/95 hover:bg-white text-stone-800 hover:text-stone-950 border border-stone-200/90 px-5 sm:px-6 py-3 rounded-xl text-sm sm:text-base font-medium shadow-2xs hover:shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-2 backdrop-blur-xs"
            >
              <Clock className="w-4 h-4 text-[#1b3d2f]" />
              <span>Današnja vaktija</span>
            </button>
          </div>
        </div>



        {/* ============================================================ */}
        {/* Floating Cards Bottom Row (Recreated faithfully from Image 3) */}
        {/* ============================================================ */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          {/* Card 1: VAKTIJA - SARAJEVO (Wide clean card) */}
          <div className="lg:col-span-6 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#1b3d2f]" />
                <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  Vaktija – Sarajevo & Ilidža
                </span>
                {isLiveApi && (
                  <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-1.5 py-0.2 rounded-md font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Uživo (vaktija.ba)
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium text-stone-500 capitalize">
                {apiDateStr || currentTime.toLocaleDateString('bs-BA', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>

            {/* 6 Prayer Times Horizontal Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 py-4">
              {prayers.map((p) => {
                const isCurrent = nextPrayer.key === p.key;
                return (
                  <div
                    key={p.key}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl transition-all ${
                      isCurrent
                        ? 'bg-emerald-50 border border-emerald-300/80 text-emerald-950 font-semibold shadow-2xs'
                        : 'bg-stone-50/80 hover:bg-stone-100/70 border border-stone-100 text-stone-700'
                    }`}
                  >
                    <span className="text-[11px] font-medium text-stone-500 uppercase tracking-tight">
                      {p.name}
                    </span>
                    <span className="text-base sm:text-lg font-bold tracking-tight mt-0.5 text-stone-900 font-mono">
                      {p.time}
                    </span>
                    <span className="text-[10px] text-stone-400 font-arabic">
                      {p.arabic}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2 text-xs text-stone-500">
              <span>Zvanični podaci: Rijaset IZ u BiH / vaktija.ba</span>
              <button
                onClick={onOpenVaktija}
                className="text-[#1b3d2f] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                Pregledaj mjesečni takvim
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: SLJEDEĆI NAMAZ (High-contrast emerald card from Image 3) */}
          <div className="lg:col-span-3 bg-[#1e4734] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
            {/* Soft decorative background pattern */}
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-emerald-600/20 blur-xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200/90">
                  Sljedeći namaz
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-800/80 text-emerald-100 px-2 py-0.5 rounded-full border border-emerald-700/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Uskoro
                </span>
              </div>

              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif text-white">
                    {nextPrayer.name}
                  </h3>
                  <span className="text-base text-emerald-300/80 font-arabic">
                    {nextPrayer.arabic}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-emerald-100">
                  {nextPrayer.time}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-800/80 flex items-center justify-between text-xs text-emerald-200/90">
              <span>Preostalo vremena:</span>
              <span className="font-mono font-bold text-white bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-700/40">
                {nextPrayer.countdown}
              </span>
            </div>
          </div>

          {/* Card 3: KUR'ANSKI AJET (Daily spiritual inspiration from Image 3) */}
          <div className="lg:col-span-3 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#a07e43]" />
                  Kur'anski ajet dana
                </span>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {currentVerse.surah}, {currentVerse.ayah}
                </span>
              </div>

              {/* Arabic Calligraphy */}
              <p className="font-arabic text-right text-lg sm:text-xl text-stone-900 leading-loose mt-3 dir-rtl select-none">
                {currentVerse.arabic}
              </p>

              {/* Bosnian Translation */}
              <p className="text-xs sm:text-sm text-stone-600 italic mt-2 leading-relaxed line-clamp-3">
                "{currentVerse.translation}"
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <button
                onClick={handleCopyVerse}
                className="text-stone-500 hover:text-stone-900 inline-flex items-center gap-1 transition-colors cursor-pointer"
                title="Kopiraj ajet"
              >
                {copiedVerse ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-medium">Kopirano</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Podijeli</span>
                  </>
                )}
              </button>

              <button
                onClick={() =>
                  setCurrentVerseIndex((prev) => (prev + 1) % DAILY_VERSES.length)
                }
                className="text-emerald-800 font-semibold hover:text-emerald-950 inline-flex items-center gap-1 cursor-pointer"
              >
                Sljedeći ajet
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
