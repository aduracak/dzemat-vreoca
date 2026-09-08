import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Calendar, ChevronRight, FileText } from 'lucide-react';
import { HutbaModal } from './HutbaModal';
import { getHutbe, TextHutba } from '../services/supabaseService';

export const HutbeSection: React.FC = () => {
  const [hutbeList, setHutbeList] = useState<TextHutba[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Sve');
  const [activeReadingHutba, setActiveReadingHutba] = useState<TextHutba | null>(null);

  const categories = ['Sve', 'Zajedništvo', 'Porodica i odgoj', 'Duhovnost', 'Ahlak'];

  useEffect(() => {
    getHutbe().then((data) => {
      setHutbeList(data);
      setLoading(false);
    });
  }, []);

  const filteredHutbe = hutbeList.filter((hutba) => {
    const matchesCategory = selectedCategory === 'Sve' || hutba.category === selectedCategory;
    const matchesSearch =
      hutba.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hutba.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hutba.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="hutbe" className="py-20 sm:py-28 bg-[#fafaf9] border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#1b3d2f] text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Duhovna riznica džemata</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-serif">
              Tekstualna arhiva petkovnih hutbi
            </h2>
            <p className="mt-3 text-base sm:text-lg text-stone-600">
              Inspirativne poruke, predavanja i savjeti sa minbera džamije u Vreocima.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pretraži tekstove hutbi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1b3d2f]/20 focus:border-[#1b3d2f] transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1b3d2f] text-white shadow-2xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hutbe Cards Grid */}
        {loading ? (
          <div className="py-16 text-center text-stone-500 text-sm">
            Učitavanje hutbi...
          </div>
        ) : filteredHutbe.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-md mx-auto">
            <FileText className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-800 font-serif">Nema pronađenih hutbi</h3>
            <p className="text-xs text-stone-500 mt-1">Pokušajte odabrati drugu kategoriju ili promijeniti pretragu.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHutbe.map((hutba) => (
              <div
                key={hutba.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 hover:border-stone-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header: Category & Date */}
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                    <span className="font-semibold text-[#1b3d2f] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                      {hutba.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{hutba.date_str}</span>
                    </div>
                  </div>

                  {/* Hutba Title */}
                  <h3 className="text-xl font-bold text-stone-900 font-serif tracking-tight mb-2.5 group-hover:text-[#1b3d2f] transition-colors">
                    {hutba.title}
                  </h3>

                  {/* Hutba Summary */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3 mb-6">
                    {hutba.summary}
                  </p>
                </div>

                {/* Card Footer: Read Action */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-stone-400">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Tekstualna hutba</span>
                  </div>

                  <button
                    onClick={() => setActiveReadingHutba(hutba)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1b3d2f] group-hover:translate-x-0.5 transition-transform cursor-pointer"
                  >
                    <span>Pročitaj cijelu hutbu</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reader Modal */}
      <HutbaModal
        hutba={activeReadingHutba}
        onClose={() => setActiveReadingHutba(null)}
      />
    </section>
  );
};
