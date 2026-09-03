import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Volume2, Compass, Download, Bell, BellOff, CheckCircle2, ChevronRight, RefreshCw } from 'lucide-react';
import { generateMonthVaktija } from '../data/vaktijaData';
import { fetchTodayVaktija, fetchMonthlyTakvim, PrayerItem, PRAYER_NAMES, FALLBACK_VAKTIJA } from '../services/vaktijaService';

export const VaktijaSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'danas' | 'mjesec'>('danas');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isPlayingEzan, setIsPlayingEzan] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prayers, setPrayers] = useState<PrayerItem[]>(() =>
    PRAYER_NAMES.map((p, i) => ({ ...p, time: FALLBACK_VAKTIJA[i] }))
  );
  const [apiDateStr, setApiDateStr] = useState<string>('');
  const [isLiveApi, setIsLiveApi] = useState<boolean>(false);
  const [monthlyRows, setMonthlyRows] = useState<any[]>(() => generateMonthVaktija());
  const [isLoadingMonth, setIsLoadingMonth] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch live daily vaktija for Sarajevo/Ilidža from vaktija.ba
  useEffect(() => {
    let mounted = true;
    fetchTodayVaktija().then((data) => {
      if (mounted) {
        setPrayers(data.times);
        setApiDateStr(data.dateStr);
        setIsLiveApi(data.isLive);
      }
    });

    // Fetch live monthly takvim
    setIsLoadingMonth(true);
    fetchMonthlyTakvim().then((rows) => {
      if (mounted && rows && rows.length > 0) {
        setMonthlyRows(rows);
      }
      if (mounted) setIsLoadingMonth(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  // Determine active/next prayer index
  const getActivePrayerIndex = () => {
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    for (let i = 0; i < prayers.length; i++) {
      const [h, m] = prayers[i].time.split(':').map(Number);
      if (h * 60 + m > currentMinutes) {
        return i;
      }
    }
    return 0; // after jacija, next is zora
  };

  const nextPrayerIndex = getActivePrayerIndex();


  // Simple clean Web Audio synth / soothing chime if audio file is not available
  const togglePlayEzanSound = () => {
    if (isPlayingEzan) {
      setIsPlayingEzan(false);
      return;
    }

    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      // Harmonic meditative chime frequencies
      osc.frequency.setValueAtTime(432, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(648, audioCtx.currentTime + 1.2);
      osc.frequency.exponentialRampToValueAtTime(324, audioCtx.currentTime + 2.5);

      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      setIsPlayingEzan(true);
      osc.stop(audioCtx.currentTime + 3.6);
      setTimeout(() => setIsPlayingEzan(false), 3600);
    } catch (e) {
      setIsPlayingEzan(false);
    }
  };

  const handleDownloadTakvim = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Dan,Datum,Dan u sedmici,Zora,Izlazak,Podne,Ikindija,Aksam,Jacija\n' +
      monthlyRows
        .map((r) => `${r.day},${r.dateStr},${r.dayName},${r.zora},${r.izlazak},${r.podne},${r.ikindija},${r.aksam},${r.jacija}`)
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Vaktija_Vreoca_Ilidza_Septembar_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <section id="vaktija" className="py-20 sm:py-28 bg-white border-t border-stone-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold mb-3">
              <Clock className="w-3.5 h-3.5" />
              <span>Zvanična vaktija Rijaseta IZ u BiH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-serif">
              Vremena namaza za Vreoca & Ilidžu
            </h2>
            <p className="mt-3 text-base sm:text-lg text-stone-600">
              Precizna proračunska vaktija usklađena sa koordinatama naše džamije u Vreocima (43.8328° N, 18.2865° E).
            </p>
          </div>

          {/* Controls: Tab switch & Audio alert */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-stone-100/80 p-1 rounded-xl flex items-center border border-stone-200/80">
              <button
                onClick={() => setActiveTab('danas')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'danas'
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Današnja vaktija
              </button>
              <button
                onClick={() => setActiveTab('mjesec')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'mjesec'
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Mjesečni takvim
              </button>
            </div>

            {/* Sound chime button */}
            <button
              onClick={togglePlayEzanSound}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isPlayingEzan
                  ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-50 border-stone-200'
              }`}
              title={isPlayingEzan ? 'Zaustavi zvuk' : 'Testiraj zvučni podsjetnik'}
            >
              {isPlayingEzan ? <Volume2 className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Notifications button */}
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                notificationsEnabled
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-stone-600 hover:bg-stone-50 border-stone-200'
              }`}
            >
              {notificationsEnabled ? (
                <>
                  <Bell className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Podsjetnik uključen</span>
                </>
              ) : (
                <>
                  <BellOff className="w-3.5 h-3.5" />
                  <span>Uključi podsjetnik</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ============================================================ */}
        {/* Tab 1: Today's Modern Luxury Cards (Apple Style Grid) */}
        {/* ============================================================ */}
        {activeTab === 'danas' && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
              {prayers.map((prayer, idx) => {
                const isCurrent = nextPrayerIndex === idx;
                const isJummah = prayer.key === 'podne'; // Friday highlight

                return (
                  <div
                    key={prayer.key}
                    className={`group relative rounded-2xl sm:rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between border ${
                      isCurrent
                        ? 'bg-gradient-to-b from-[#1b3d2f] to-[#142e23] text-white border-[#142e23] shadow-md -translate-y-1'
                        : 'bg-stone-50/70 hover:bg-white text-stone-900 border-stone-200/80 hover:border-stone-300 hover:shadow-xs'
                    }`}
                  >
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${
                          isCurrent ? 'text-emerald-200' : 'text-stone-500'
                        }`}
                      >
                        {prayer.name}
                      </span>
                      <span
                        className={`text-sm font-arabic font-bold ${
                          isCurrent ? 'text-emerald-200' : 'text-stone-400'
                        }`}
                      >
                        {prayer.arabic}
                      </span>
                    </div>

                    {/* Middle: Big bold Apple-style time */}
                    <div className="my-6">
                      <div
                        className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-mono ${
                          isCurrent ? 'text-white' : 'text-stone-900'
                        }`}
                      >
                        {prayer.time}
                      </div>
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-100 border border-emerald-700/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          Sljedeći nastupa
                        </span>
                      )}
                      {!isCurrent && isJummah && (
                        <span className="inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Petkom: Džuma namaz
                        </span>
                      )}
                    </div>

                    {/* Bottom: Context description */}
                    <p
                      className={`text-[11px] leading-relaxed line-clamp-2 ${
                        isCurrent ? 'text-emerald-100/80' : 'text-stone-500'
                      }`}
                    >
                      {prayer.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Sub-bar: Qibla compass & Astronomical context */}
            <div className="mt-8 bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-600">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-[#1b3d2f] shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-stone-900">Smjer Kible iz Vreoca:</span>{' '}
                  137° Jugoistok (SE) • Udaljenost od Kabe: 3.184 km
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Lokacija: Sarajevo & Ilidža (vaktija.ba)</span>
                </div>
                <button
                  onClick={handleDownloadTakvim}
                  className="text-[#1b3d2f] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Preuzmi CSV vaktiju
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* Tab 2: Monthly Takvim Table */}
        {/* ============================================================ */}
        {activeTab === 'mjesec' && (
          <div className="bg-stone-50 rounded-2xl sm:rounded-3xl border border-stone-200 overflow-hidden shadow-2xs">
            <div className="p-4 sm:p-6 bg-white border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-stone-900 font-serif">
                    Mjesečni takvim za Sarajevo i Ilidžu
                  </h3>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200/70 px-2 py-0.5 rounded-full font-medium">
                    vaktija.ba API
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Zvanični proračun Rijaseta Islamske zajednice u Bosni i Hercegovini.
                </p>
              </div>
              <button
                onClick={handleDownloadTakvim}
                className="inline-flex items-center justify-center gap-2 bg-[#1b3d2f] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#142e23] transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Preuzmi takvim (CSV)
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-stone-100 text-stone-600 font-semibold border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4">Dan</th>
                    <th className="py-3 px-4">Datum</th>
                    <th className="py-3 px-4">Dan</th>
                    <th className="py-3 px-4 text-[#1b3d2f]">Zora</th>
                    <th className="py-3 px-4">Izlazak</th>
                    <th className="py-3 px-4 text-[#1b3d2f] font-bold">Podne</th>
                    <th className="py-3 px-4 text-[#1b3d2f]">Ikindija</th>
                    <th className="py-3 px-4 text-[#1b3d2f]">Akšam</th>
                    <th className="py-3 px-4 text-[#1b3d2f]">Jacija</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200/70 bg-white">
                  {monthlyRows.map((row) => (
                    <tr
                      key={row.day}
                      className={`hover:bg-stone-50 transition-colors ${
                        row.isFriday ? 'bg-emerald-50/40 font-medium' : ''
                      } ${row.day === currentTime.getDate() ? 'bg-amber-50/60 font-semibold' : ''}`}
                    >
                      <td className="py-2.5 px-4 font-mono font-medium text-stone-500">
                        {row.day}
                      </td>
                      <td className="py-2.5 px-4 font-medium text-stone-800">
                        {row.dateStr}
                        {row.day === currentTime.getDate() && (
                          <span className="ml-2 text-[10px] bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                            Danas
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-stone-600">
                        {row.dayName}
                        {row.isFriday && (
                          <span className="ml-1 text-[10px] text-[#1b3d2f] font-semibold">
                            (Džuma)
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 font-mono">{row.zora}</td>
                      <td className="py-2.5 px-4 font-mono text-stone-500">{row.izlazak}</td>
                      <td className="py-2.5 px-4 font-mono font-semibold text-stone-900">
                        {row.podne}
                      </td>
                      <td className="py-2.5 px-4 font-mono">{row.ikindija}</td>
                      <td className="py-2.5 px-4 font-mono">{row.aksam}</td>
                      <td className="py-2.5 px-4 font-mono">{row.jacija}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
