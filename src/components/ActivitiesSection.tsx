import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';

export const ActivitiesSection: React.FC<{ onOpenDonation: () => void }> = ({ onOpenDonation }) => {
  const events = [
    {
      id: 1,
      title: 'Omladinska tribina: Znanje i karakter mladog čovjeka',
      date: 'Nedjelja, 13. Septembar 2026.',
      time: 'Nakon akšam-namaza (19:45)',
      location: 'Džamijska musafirhana Vreoca',
      category: 'Tribina',
      desc: 'Gostujuće predavanje i druženje za mlade sa diskusijom o izazovima savremenog doba i očuvanju vjere.',
    },
    {
      id: 2,
      title: 'Zajednička akcija uređenja dvorišta i harema džamije',
      date: 'Subota, 19. Septembar 2026.',
      time: '09:00 – 13:00',
      location: 'Harem džamije Vreoca',
      category: 'Aktivizam',
      desc: 'Poziv svim džematlijama za jesenje uređenje zelenih površina, cvjetnjaka i pristupnih staza džamije.',
    },
    {
      id: 3,
      title: 'Humanitarna akcija: Pomoć socijalno ugroženim porodicama',
      date: 'U toku tokom cijelog mjeseca',
      time: 'Svaki dan',
      location: 'Ured džemata Vreoca',
      category: 'Humanitarno',
      desc: 'Prikupljanje osnovnih prehrambenih i higijenskih paketa za pet starijih i bolesnih porodica u Vreocima.',
    },
  ];

  return (
    <section id="aktivnosti" className="py-20 sm:py-28 bg-[#fafaf9] border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Džematski život</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-serif">
              Aktivnosti i aktuelnosti
            </h2>
            <p className="mt-3 text-base sm:text-lg text-stone-600">
              Budite u toku sa dešavanjima, tribinama, humanitarnim akcijama i druženjima u našem džematu.
            </p>
          </div>

          <button
            onClick={onOpenDonation}
            className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-emerald-900 hover:text-emerald-950 bg-emerald-100/60 hover:bg-emerald-100 px-5 py-3 rounded-full transition-colors cursor-pointer"
          >
            <span>Podrži humanitarne projekte</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-3xl p-7 border border-stone-200/80 hover:border-stone-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full">
                    {ev.category}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">Događaj #{ev.id}</span>
                </div>

                <h3 className="text-lg font-bold text-stone-900 font-serif mb-3 leading-snug">
                  {ev.title}
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed mb-6">
                  {ev.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 space-y-1.5 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-emerald-800" />
                  <span className="font-medium text-stone-800">{ev.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-800" />
                  <span>{ev.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-800" />
                  <span>{ev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
