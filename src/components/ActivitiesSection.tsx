import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { getActivities, Aktivnost } from '../services/supabaseService';

export const ActivitiesSection: React.FC<{ onOpenDonation: () => void }> = ({ onOpenDonation }) => {
  const [activitiesList, setActivitiesList] = useState<Aktivnost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivities().then((data) => {
      setActivitiesList(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="aktivnosti" className="py-20 sm:py-28 bg-[#fafaf9] border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#1b3d2f] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Džematski život</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-serif">
              Aktivnosti i aktuelnosti
            </h2>
            <p className="mt-3 text-base sm:text-lg text-stone-600">
              Budite u toku sa dešavanjima, tribinama, humanitarnim akcijama i druženjima u našem džematu Vreoca.
            </p>
          </div>

          <button
            onClick={onOpenDonation}
            className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#1b3d2f] hover:text-[#142e23] bg-emerald-100/70 hover:bg-emerald-100 px-5 py-3 rounded-full transition-colors cursor-pointer"
          >
            <span>Podrži džematske projekte</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-stone-500">Učitavanje aktivnosti...</div>
        ) : activitiesList.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-md mx-auto">
            <Calendar className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800 font-serif">Trenutno nema najavljenih aktivnosti</h3>
            <p className="text-xs text-stone-500 mt-1">Uskoro očekujte nove najave i događaje džemata.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activitiesList.map((ev) => (
              <div
                key={ev.id}
                className="bg-white rounded-3xl p-7 border border-stone-200/80 hover:border-stone-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-[#1b3d2f] uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                      {ev.category}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">Događaj #{ev.id}</span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 font-serif mb-3 leading-snug">
                    {ev.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                    {ev.summary || ev.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#1b3d2f] shrink-0" />
                    <span>{ev.date_str}</span>
                  </div>
                  {ev.time_str && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#1b3d2f] shrink-0" />
                      <span>{ev.time_str}</span>
                    </div>
                  )}
                  {ev.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#1b3d2f] shrink-0" />
                      <span>{ev.location}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
