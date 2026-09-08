import React, { useState, useEffect } from 'react';
import { HelpCircle, MessageSquare, Send, CheckCircle2, Search, Filter, Shield, Clock, ChevronDown, ChevronUp, User } from 'lucide-react';
import { getPublishedQuestions, submitQuestionToImam, PitanjeImamu } from '../services/supabaseService';

export const PitanjaOdgovoriSection: React.FC = () => {
  const [questions, setQuestions] = useState<PitanjeImamu[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('Sve');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | number | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_contact: '',
    question: '',
    category: 'Opće',
  });

  const categories = ['Sve', 'Namazi', 'Mekteb', 'Post', 'Porodica', 'Ahlak', 'Opće'];

  const loadQuestions = async () => {
    setLoading(true);
    const data = await getPublishedQuestions();
    setQuestions(data);
    setLoading(false);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim()) {
      setFormError('Molimo unesite tekst vašeg pitanja.');
      return;
    }
    if (!formData.sender_contact.trim()) {
      setFormError('Molimo unesite kontakt (telefon ili email) kako bi vam imam mogao odgovoriti.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    const res = await submitQuestionToImam({
      sender_name: formData.sender_name.trim() || 'Džematlija',
      sender_contact: formData.sender_contact.trim(),
      question: formData.question.trim(),
      category: formData.category,
    });

    setIsSubmitting(false);

    if (res.success) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsModalOpen(false);
        setFormData({
          sender_name: '',
          sender_contact: '',
          question: '',
          category: 'Opće',
        });
      }, 3000);
    } else {
      setFormError(res.error || 'Došlo je do greške prilikom slanja.');
    }
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesCategory = selectedCategory === 'Sve' || q.category === selectedCategory;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.answer && q.answer.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="pitanja-odgovori" className="py-20 sm:py-28 bg-[#fafaf9] border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#1b3d2f] text-xs font-semibold mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Vjerska pitanja i savjeti</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-serif">
              Pitanja i odgovori Imama
            </h2>
            <p className="mt-3 text-base sm:text-lg text-stone-600 leading-relaxed">
              Pronađite odgovore na česta šerijatska i praktična pitanja ili direktno postavite pitanje imamu džemata Vreoca.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2.5 bg-[#1b3d2f] hover:bg-[#142e23] text-white px-6 sm:px-7 py-3.5 rounded-xl text-sm font-semibold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Postavi pitanje Imamu</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1b3d2f] text-white shadow-2xs'
                    : 'bg-stone-100/70 text-stone-600 hover:bg-stone-200/60 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pretraži pitanja i odgovore..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#1b3d2f]/20"
            />
          </div>
        </div>

        {/* Questions Grid / List */}
        {loading ? (
          <div className="py-16 text-center text-stone-500 text-sm">
            Učitavanje odgovora imama...
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 max-w-xl mx-auto shadow-xs">
            <HelpCircle className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-800 font-serif mb-1">Nema pronađenih pitanja</h3>
            <p className="text-xs text-stone-500 mb-6">
              Budite prvi koji će postaviti pitanje imamu iz ove kategorije.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#1b3d2f] text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#142e23] transition-colors cursor-pointer"
            >
              Postavi pitanje sada
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredQuestions.map((q) => {
              const isExpanded = expandedQuestionId === q.id;
              return (
                <div
                  key={q.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Category & Sender */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold text-[#1b3d2f] uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                        {q.category || 'Opće'}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-stone-400">
                        <Clock className="w-3 h-3" />
                        <span>Odgovoreno</span>
                      </div>
                    </div>

                    {/* Question */}
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif leading-snug mb-3">
                      „{q.question}“
                    </h3>

                    {/* Imam's Answer */}
                    <div className="bg-stone-50/90 rounded-2xl p-4 border border-stone-100 text-stone-700 text-xs sm:text-sm leading-relaxed">
                      <div className="flex items-center gap-1.5 font-bold text-[#1b3d2f] text-xs mb-1.5">
                        <Shield className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Odgovor Imama:</span>
                      </div>
                      <p className={isExpanded ? '' : 'line-clamp-4'}>
                        {q.answer || 'Odgovor u pripremi.'}
                      </p>
                      {q.answer && q.answer.length > 200 && (
                        <button
                          onClick={() => setExpandedQuestionId(isExpanded ? null : (q.id || null))}
                          className="mt-2 text-xs font-semibold text-[#1b3d2f] hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          {isExpanded ? (
                            <>
                              Prikaži manje <ChevronUp className="w-3 h-3" />
                            </>
                          ) : (
                            <>
                              Pročitaj cijeli odgovor <ChevronDown className="w-3 h-3" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Footer note */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>Postavio: {q.sender_name || 'Džematlija'}</span>
                    </span>
                    <span className="font-medium text-emerald-800">Džemat Vreoca</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* MODAL: Postavi pitanje Imamu */}
      {/* ============================================================ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 relative">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif mb-1">
              Postavite pitanje Imamu
            </h3>
            <p className="text-xs text-stone-500 mb-6 leading-relaxed">
              Vaše pitanje stiže direktno imamu džemata Vreoca na službeni email (<strong className="text-stone-700">vreoca@medzlis-sarajevo.ba</strong>). Odgovor ćete dobiti na vaš kontakt, a korisna opća pitanja imam može uz vašu diskreciju objaviti na sajtu.
            </p>

            {isSubmitted ? (
              <div className="py-8 text-center animate-in zoom-in-95 duration-200">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-stone-900 font-serif">
                  Pitanje je uspješno poslano!
                </h4>
                <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
                  Hvala vam. Imam džemata Vreoca će pregledati vaše pitanje i odgovoriti vam u najkraćem mogućem roku.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                {formError && (
                  <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Vaše ime (opciono)
                    </label>
                    <input
                      type="text"
                      placeholder="npr. Anonimno ili Vaše ime"
                      value={formData.sender_name}
                      onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#1b3d2f]/20"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Kategorija pitanja
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#1b3d2f]/20"
                    >
                      <option value="Opće">Opće vjersko pitanje</option>
                      <option value="Namazi">Namazi i vaktovi</option>
                      <option value="Mekteb">Mekteb i djeca</option>
                      <option value="Post">Post i Ramazan</option>
                      <option value="Porodica">Porodica i brak</option>
                      <option value="Ahlak">Ahlak i ponašanje</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Vaš kontakt (Email ili Telefon) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="email@adresa.com ili +387 61 000 000"
                    value={formData.sender_contact}
                    onChange={(e) => setFormData({ ...formData, sender_contact: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#1b3d2f]/20"
                  />
                  <span className="text-[10px] text-stone-400 mt-0.5 block">
                    Vaš kontakt je povjerljiv i služi isključivo imamu da vam dostavi odgovor.
                  </span>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Vaše pitanje za Imama <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Napišite vaše pitanje, dilemu ili traženje savjeta..."
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#1b3d2f]/20"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-stone-600 hover:text-stone-900 cursor-pointer font-medium"
                  >
                    Odustani
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 bg-[#1b3d2f] hover:bg-[#142e23] disabled:opacity-50 text-white rounded-xl font-semibold cursor-pointer shadow-xs"
                  >
                    {isSubmitting ? 'Slanje...' : 'Pošalji pitanje'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
