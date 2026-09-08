import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  MessageSquare,
  BookOpen,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Archive,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Phone,
  Mail,
  Send,
  Save,
  Check,
  Filter,
  User,
  Shield,
  FileText,
} from 'lucide-react';
import { IslamskaZajednicaLogo } from '../IslamskaZajednicaLogo';
import {
  getAllMektebPrijave,
  updateMektebStatus,
  getAllQuestionsForAdmin,
  answerQuestion,
  getHutbe,
  createHutba,
  deleteHutba,
  adminLogout,
  MektebPrijava,
  PitanjeImamu,
  TextHutba,
} from '../../services/supabaseService';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'mekteb' | 'pitanja' | 'hutbe'>('mekteb');

  // Mekteb state
  const [mektebPrijave, setMektebPrijave] = useState<MektebPrijava[]>([]);
  const [mektebFilter, setMektebFilter] = useState<string>('sve');
  const [loadingMekteb, setLoadingMekteb] = useState(false);

  // Pitanja state
  const [pitanja, setPitanja] = useState<PitanjeImamu[]>([]);
  const [loadingPitanja, setLoadingPitanja] = useState(false);
  const [selectedPitanje, setSelectedPitanje] = useState<PitanjeImamu | null>(null);
  const [odgovorText, setOdgovorText] = useState('');
  const [isObjavljeno, setIsObjavljeno] = useState(false);
  const [odgovorCategory, setOdgovorCategory] = useState('Opće');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Hutbe state
  const [hutbe, setHutbe] = useState<TextHutba[]>([]);
  const [loadingHutbe, setLoadingHutbe] = useState(false);
  const [isAddingHutba, setIsAddingHutba] = useState(false);
  const [newHutba, setNewHutba] = useState({
    title: '',
    date_str: new Date().toLocaleDateString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    category: 'Ahlak',
    summary: '',
    content: '',
    author: 'Imam džemata Vreoca',
  });

  // Load functions
  const loadMekteb = async () => {
    setLoadingMekteb(true);
    const data = await getAllMektebPrijave();
    setMektebPrijave(data);
    setLoadingMekteb(false);
  };

  const loadPitanja = async () => {
    setLoadingPitanja(true);
    const data = await getAllQuestionsForAdmin();
    setPitanja(data);
    setLoadingPitanja(false);
  };

  const loadHutbe = async () => {
    setLoadingHutbe(true);
    const data = await getHutbe();
    setHutbe(data);
    setLoadingHutbe(false);
  };

  useEffect(() => {
    loadMekteb();
    loadPitanja();
    loadHutbe();
  }, []);

  // Mekteb actions
  const handleStatusChange = async (
    id: number | string | undefined,
    newStatus: 'na_cekanju' | 'upisano' | 'arhivirano'
  ) => {
    if (!id) return;
    await updateMektebStatus(id, newStatus);
    loadMekteb();
  };

  // Pitanja actions
  const handleSelectPitanje = (p: PitanjeImamu) => {
    setSelectedPitanje(p);
    setOdgovorText(p.answer || '');
    setIsObjavljeno(Boolean(p.is_published));
    setOdgovorCategory(p.category || 'Opće');
    setSaveSuccess(false);
  };

  const handleSaveOdgovor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPitanje?.id) return;

    const res = await answerQuestion(
      selectedPitanje.id,
      odgovorText,
      isObjavljeno,
      odgovorCategory
    );

    if (res.success) {
      setSaveSuccess(true);
      loadPitanja();
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  // Hutbe actions
  const handleCreateHutba = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHutba.title || !newHutba.content) return;

    await createHutba(newHutba);
    setIsAddingHutba(false);
    setNewHutba({
      title: '',
      date_str: new Date().toLocaleDateString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      category: 'Ahlak',
      summary: '',
      content: '',
      author: 'Imam džemata Vreoca',
    });
    loadHutbe();
  };

  const handleDeleteHutba = async (id: number | string | undefined) => {
    if (!id) return;
    if (confirm('Da li ste sigurni da želite obrisati ovu hutbu?')) {
      await deleteHutba(id);
      loadHutbe();
    }
  };

  const handleLogout = () => {
    adminLogout();
    onClose();
  };

  // Filtered mekteb
  const filteredMekteb = mektebPrijave.filter((p) => {
    if (mektebFilter === 'sve') return true;
    return p.status === mektebFilter;
  });

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 pb-20">
      {/* Top Navbar */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
              title="Povratak na web stranicu"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5">
              <IslamskaZajednicaLogo size={32} />
              <div>
                <h1 className="text-sm sm:text-base font-bold text-stone-900 font-serif">
                  Imamov Panel • Džemat Vreoca
                </h1>
                <p className="text-[10px] text-stone-500">
                  Upravljanje mektebom, pitanjima džematlija i hutbama
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>Pregled sajta</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Odjavi se</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('mekteb')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'mekteb'
                ? 'border-[#1b3d2f] text-[#1b3d2f]'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Prijave za mekteb</span>
            {mektebPrijave.filter((p) => p.status === 'na_cekanju').length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px]">
                {mektebPrijave.filter((p) => p.status === 'na_cekanju').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('pitanja')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'pitanja'
                ? 'border-[#1b3d2f] text-[#1b3d2f]'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Pitanja za Imama</span>
            {pitanja.filter((p) => !p.answer).length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-600 text-white text-[10px]">
                {pitanja.filter((p) => !p.answer).length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('hutbe')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'hutbe'
                ? 'border-[#1b3d2f] text-[#1b3d2f]'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Upravljanje hutbama ({hutbe.length})</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ============================================================ */}
        {/* TAB 1: MEKTEB PRIJAVE */}
        {/* ============================================================ */}
        {activeTab === 'mekteb' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div>
                <h2 className="text-lg font-bold text-stone-900 font-serif">
                  Evidencija online prijava za mekteb
                </h2>
                <p className="text-xs text-stone-500">
                  Pregled prijavljene djece i kontakt roditelja za mektebsku 2026/2027. godinu.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 text-xs">
                <Filter className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-stone-500 font-medium">Filter:</span>
                <select
                  value={mektebFilter}
                  onChange={(e) => setMektebFilter(e.target.value)}
                  className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none"
                >
                  <option value="sve">Sve prijave ({mektebPrijave.length})</option>
                  <option value="na_cekanju">Na čekanju</option>
                  <option value="upisano">Upisano</option>
                  <option value="arhivirano">Arhivirano</option>
                </select>
              </div>
            </div>

            {loadingMekteb ? (
              <div className="py-12 text-center text-stone-500 text-xs">Učitavanje prijava...</div>
            ) : filteredMekteb.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
                <GraduationCap className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-stone-800 font-serif">Nema prijava u ovoj kategoriji</h3>
                <p className="text-xs text-stone-500 mt-1">Kada roditelji pošalju prijavu, ona će se pojaviti ovdje.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
                      <tr>
                        <th className="py-3.5 px-4">Ime djeteta</th>
                        <th className="py-3.5 px-4">Godište</th>
                        <th className="py-3.5 px-4">Grupa / Nivo</th>
                        <th className="py-3.5 px-4">Roditelj</th>
                        <th className="py-3.5 px-4">Kontakt telefon</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Akcija</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredMekteb.map((p) => (
                        <tr key={p.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-stone-900 font-serif">
                            {p.child_name}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-stone-600">
                            {p.birth_year}.
                          </td>
                          <td className="py-3.5 px-4 text-stone-700 font-medium">
                            {p.group_level}
                          </td>
                          <td className="py-3.5 px-4 text-stone-700">
                            {p.parent_name}
                          </td>
                          <td className="py-3.5 px-4 font-mono">
                            <a
                              href={`tel:${p.phone}`}
                              className="text-[#1b3d2f] font-semibold hover:underline inline-flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{p.phone}</span>
                            </a>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                p.status === 'upisano'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : p.status === 'arhivirano'
                                  ? 'bg-stone-100 text-stone-600'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {p.status === 'upisano'
                                ? 'Upisano'
                                : p.status === 'arhivirano'
                                ? 'Arhivirano'
                                : 'Na čekanju'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <select
                              value={p.status || 'na_cekanju'}
                              onChange={(e) =>
                                handleStatusChange(p.id, e.target.value as any)
                              }
                              className="bg-stone-100 border border-stone-200 rounded-lg px-2 py-1 text-[11px] font-semibold cursor-pointer"
                            >
                              <option value="na_cekanju">Na čekanju</option>
                              <option value="upisano">Označi kao Upisano</option>
                              <option value="arhivirano">Arhiviraj</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: PITANJA ZA IMAMA & ODGOVORI */}
        {/* ============================================================ */}
        {activeTab === 'pitanja' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* List of questions */}
            <div className="lg:col-span-5 space-y-3">
              <div className="bg-white p-4 rounded-2xl border border-stone-200">
                <h3 className="font-bold text-stone-900 text-sm font-serif">
                  Pristigla pitanja ({pitanja.length})
                </h3>
                <p className="text-[11px] text-stone-500">
                  Odaberite pitanje sa liste kako biste napisali odgovor.
                </p>
              </div>

              {loadingPitanja ? (
                <div className="py-8 text-center text-xs text-stone-500">Učitavanje...</div>
              ) : pitanja.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center text-xs text-stone-500">
                  Nema postavljenih pitanja.
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
                  {pitanja.map((p) => {
                    const isSelected = selectedPitanje?.id === p.id;
                    const hasAnswer = Boolean(p.answer);

                    return (
                      <button
                        key={p.id}
                        onClick={() => handleSelectPitanje(p)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1b3d2f] text-white border-[#1b3d2f] shadow-sm'
                            : 'bg-white hover:bg-stone-50 text-stone-900 border-stone-200/80'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              isSelected
                                ? 'bg-emerald-900 text-emerald-100'
                                : 'bg-stone-100 text-stone-600'
                            }`}
                          >
                            {p.category || 'Opće'}
                          </span>
                          <span
                            className={`text-[10px] font-semibold flex items-center gap-1 ${
                              hasAnswer
                                ? isSelected
                                  ? 'text-emerald-200'
                                  : 'text-emerald-700'
                                : isSelected
                                ? 'text-amber-200'
                                : 'text-amber-700'
                            }`}
                          >
                            {hasAnswer ? (
                              <>
                                <CheckCircle2 className="w-3 h-3" /> Odgovoreno
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3" /> Čeka odgovor
                              </>
                            )}
                          </span>
                        </div>

                        <p className={`text-xs font-serif font-bold line-clamp-2 ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                          „{p.question}“
                        </p>

                        <div className={`mt-2 text-[10px] flex items-center justify-between ${isSelected ? 'text-emerald-100/70' : 'text-stone-400'}`}>
                          <span>Od: {p.sender_name || 'Džematlija'}</span>
                          <span>Kontakt: {p.sender_contact}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Answer Editor */}
            <div className="lg:col-span-7">
              {selectedPitanje ? (
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-2xs">
                  <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-[#1b3d2f] px-2.5 py-1 rounded-full">
                        {selectedPitanje.category || 'Opće'}
                      </span>
                      <h3 className="text-base font-bold text-stone-900 font-serif mt-2">
                        Pitanje džematlije:
                      </h3>
                    </div>

                    <div className="text-right text-[11px] text-stone-500">
                      <div>Pošiljalac: <strong className="text-stone-800">{selectedPitanje.sender_name || 'Anonimno'}</strong></div>
                      <div className="font-mono">Kontakt: {selectedPitanje.sender_contact}</div>
                    </div>
                  </div>

                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 mb-6 text-xs sm:text-sm font-serif text-stone-800 leading-relaxed italic">
                    „{selectedPitanje.question}“
                  </div>

                  <form onSubmit={handleSaveOdgovor} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center justify-between">
                        <span>Odgovor Imama:</span>
                        <span className="text-[10px] text-stone-400 font-normal">
                          (Džematlija će dobiti odgovor, a može se i javno objaviti)
                        </span>
                      </label>
                      <textarea
                        rows={6}
                        required
                        placeholder="Napišite šerijatski / praktični odgovor na postavljeno pitanje..."
                        value={odgovorText}
                        onChange={(e) => setOdgovorText(e.target.value)}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1b3d2f]/20 leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Kategorija pitanja
                        </label>
                        <select
                          value={odgovorCategory}
                          onChange={(e) => setOdgovorCategory(e.target.value)}
                          className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none"
                        >
                          <option value="Opće">Opće</option>
                          <option value="Namazi">Namazi i vaktovi</option>
                          <option value="Mekteb">Mekteb i djeca</option>
                          <option value="Post">Post i Ramazan</option>
                          <option value="Porodica">Porodica i brak</option>
                          <option value="Ahlak">Ahlak i etika</option>
                        </select>
                      </div>

                      <div className="flex items-center">
                        <label className="flex items-center gap-2.5 bg-stone-50 p-3 rounded-xl border border-stone-200 w-full cursor-pointer hover:bg-stone-100 transition-colors">
                          <input
                            type="checkbox"
                            checked={isObjavljeno}
                            onChange={(e) => setIsObjavljeno(e.target.checked)}
                            className="w-4 h-4 rounded text-[#1b3d2f] focus:ring-[#1b3d2f]"
                          />
                          <div className="text-xs">
                            <span className="font-bold text-stone-800 block">
                              Objavi javno na web stranici
                            </span>
                            <span className="text-[10px] text-stone-500">
                              Prikazuje se u sekciji „Pitanja i odgovori“
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {saveSuccess && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Odgovor je uspješno spremljen i ažuriran!</span>
                      </div>
                    )}

                    <div className="pt-3 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-[#1b3d2f] hover:bg-[#142e23] text-white px-6 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Sačuvaj odgovor</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 text-stone-400">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p className="text-xs">Odaberite pitanje sa lijeve strane za unos odgovora.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: UPRAVLJANJE HUTBAMA */}
        {/* ============================================================ */}
        {activeTab === 'hutbe' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div>
                <h2 className="text-lg font-bold text-stone-900 font-serif">
                  Tekstualne hutbe džemata Vreoca
                </h2>
                <p className="text-xs text-stone-500">
                  Dodavanje i uređivanje tekstova hutbi koje se čitaju na web stranici.
                </p>
              </div>

              <button
                onClick={() => setIsAddingHutba(!isAddingHutba)}
                className="inline-flex items-center gap-2 bg-[#1b3d2f] hover:bg-[#142e23] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAddingHutba ? 'Zatvori unos' : 'Dodaj novu hutbu'}</span>
              </button>
            </div>

            {/* Form for adding new Hutba */}
            {isAddingHutba && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md animate-in fade-in">
                <h3 className="text-base font-bold text-stone-900 font-serif mb-4">
                  Unos nove petkovne hutbe
                </h3>
                <form onSubmit={handleCreateHutba} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-stone-700 mb-1">
                        Naslov hutbe *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="npr. Vrijednost zajedništva i džemata"
                        value={newHutba.title}
                        onChange={(e) => setNewHutba({ ...newHutba, title: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Datum hutbe
                      </label>
                      <input
                        type="text"
                        value={newHutba.date_str}
                        onChange={(e) => setNewHutba({ ...newHutba, date_str: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Kategorija / Tema
                      </label>
                      <select
                        value={newHutba.category}
                        onChange={(e) => setNewHutba({ ...newHutba, category: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none"
                      >
                        <option value="Ahlak">Ahlak i ponašanje</option>
                        <option value="Zajedništvo">Zajedništvo i džemat</option>
                        <option value="Porodica i odgoj">Porodica i odgoj</option>
                        <option value="Duhovnost">Duhovnost i ibadet</option>
                        <option value="Znanje">Znanje i nauka</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Khatib / Autor
                      </label>
                      <input
                        type="text"
                        value={newHutba.author}
                        onChange={(e) => setNewHutba({ ...newHutba, author: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Kratak sažetak (prikazuje se na kartici) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jedna do dvije rečenice sažetka..."
                      value={newHutba.summary}
                      onChange={(e) => setNewHutba({ ...newHutba, summary: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Puni tekst hutbe *
                    </label>
                    <textarea
                      required
                      rows={8}
                      placeholder="Unesite kompletan tekst hutbe..."
                      value={newHutba.content}
                      onChange={(e) => setNewHutba({ ...newHutba, content: e.target.value })}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-serif leading-relaxed focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingHutba(false)}
                      className="px-4 py-2 text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      Odustani
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#1b3d2f] hover:bg-[#142e23] text-white font-semibold rounded-xl cursor-pointer"
                    >
                      Objavi hutbu
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Hutbe List */}
            {loadingHutbe ? (
              <div className="py-8 text-center text-xs text-stone-500">Učitavanje hutbi...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hutbe.map((h) => (
                  <div
                    key={h.id}
                    className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-stone-500 mb-2">
                        <span className="bg-emerald-50 text-[#1b3d2f] font-semibold px-2 py-0.5 rounded-full">
                          {h.category}
                        </span>
                        <span>{h.date_str}</span>
                      </div>
                      <h4 className="font-bold text-stone-900 font-serif text-base mb-1">
                        {h.title}
                      </h4>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {h.summary}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-stone-400 text-[11px]">
                        Autor: {h.author || 'Imam džemata Vreoca'}
                      </span>
                      <button
                        onClick={() => handleDeleteHutba(h.id)}
                        className="text-red-600 hover:text-red-800 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Obriši hutbu"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
