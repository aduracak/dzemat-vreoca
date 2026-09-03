import React, { useState } from 'react';
import { HUTBE_ARCHIVE } from '../data/hutbeData';
import { Hutba } from '../types';
import { BookOpen, Search, Filter, Volume2, Calendar, Clock, ChevronRight, Play, Pause, Sparkles } from 'lucide-react';
import { HutbaModal } from './HutbaModal';

export const HutbeSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Sve');
  const [activeReadingHutba, setActiveReadingHutba] = useState<Hutba | null>(null);
  const [playingHutbaId, setPlayingHutbaId] = useState<string | null>(null);

  const categories = ['Sve', 'Ahlak', 'Porodica', 'Zajednica', 'Znanje'];

  const filteredHutbe = HUTBE_ARCHIVE.filter((hutba) => {
    const matchesCategory = selectedCategory === 'Sve' || hutba.category === selectedCategory;
    const matchesSearch =
      hutba.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hutba.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hutba.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleToggleAudio = (hutbaId: string) => {
    if (playingHutbaId === hutbaId) {
      setPlayingHutbaId(null);
    } else {
      setPlayingHutbaId(hutbaId);
    }
  };

  return (
    <section id="hutbe" className="py-20 sm:py-28 bg-[#fafaf9] border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Duhovna riznica džemata</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-serif">
              Arhiva petkovnih hutbi
            </h2>
            <p className="mt-3 text-base sm:text-lg text-stone-600">
              Inspirativne poruke, predavanja i savjeti iz minbera džamije u Vreocima. Dostupno za čitanje i slušanje.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pretraži hutbe po temi ili riječi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1e4734] text-white shadow-2xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hutbe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHutbe.map((hutba) => {
            const isPlaying = playingHutbaId === hutba.id;

            return (
              <div
                key={hutba.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 hover:border-stone-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header: Category & Date */}
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                      {hutba.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{hutba.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-stone-900 font-serif leading-snug group-hover:text-emerald-900 transition-colors mb-3">
                    {hutba.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-stone-600 leading-relaxed line-clamp-3 mb-5">
                    {hutba.summary}
                  </p>
                </div>

                {/* Footer Controls */}
                <div>
                  {/* Audio Mini Player Banner if playing */}
                  {isPlaying && (
                    <div className="mb-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-900 animate-in fade-in duration-150">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                        <span className="font-semibold">Reprodukcija hutbe u toku</span>
                      </div>
                      <span className="font-mono text-[11px]">14:20 min</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                    {/* Listen Audio Button */}
                    <button
                      onClick={() => handleToggleAudio(hutba.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isPlaying
                          ? 'bg-emerald-800 text-white shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700'
                      }`}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlaying ? 'Pauziraj' : 'Poslušaj'}</span>
                    </button>

                    {/* Read Full Button */}
                    <button
                      onClick={() => setActiveReadingHutba(hutba)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-900 hover:text-emerald-950 px-3 py-2 rounded-xl hover:bg-emerald-50 transition-colors cursor-pointer"
                    >
                      <span>Pročitaj tekst</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredHutbe.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-stone-300">
            <BookOpen className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <p className="text-stone-600 font-medium">Nema pronađenih hutbi za odabrani pojam.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Sve');
              }}
              className="mt-3 text-xs font-semibold text-emerald-800 hover:underline"
            >
              Poništi filtere
            </button>
          </div>
        )}
      </div>

      {/* Reader Modal */}
      {activeReadingHutba && (
        <HutbaModal
          hutba={activeReadingHutba}
          onClose={() => setActiveReadingHutba(null)}
        />
      )}
    </section>
  );
};
