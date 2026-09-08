import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  MessageSquare,
  BookOpen,
  Calendar,
  Mail,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Phone,
  Send,
  Save,
  Filter,
  Download,
  Menu,
  X,
  Database,
  ExternalLink,
  Users,
  Bell,
  Sparkles,
  Search,
} from 'lucide-react';
import { IslamskaZajednicaLogo } from '../IslamskaZajednicaLogo';
import {
  getAllMektebPrijave,
  updateMektebStatus,
  exportMektebToCSV,
  getAllQuestionsForAdmin,
  answerQuestion,
  getHutbe,
  createHutba,
  deleteHutba,
  getActivities,
  createActivity,
  deleteActivity,
  getNewsletterSubscribers,
  deleteNewsletterSubscriber,
  adminLogout,
  isSupabaseConfigured,
  MektebPrijava,
  PitanjeImamu,
  TextHutba,
  Aktivnost,
  NewsletterSubscriber,
} from '../../services/supabaseService';

interface AdminDashboardProps {
  onClose: () => void;
}

type TabType = 'overview' | 'mekteb' | 'pitanja' | 'hutbe' | 'aktivnosti' | 'newsletter';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Podaci
  const [mektebPrijave, setMektebPrijave] = useState<MektebPrijava[]>([]);
  const [pitanja, setPitanja] = useState<PitanjeImamu[]>([]);
  const [hutbe, setHutbe] = useState<TextHutba[]>([]);
  const [aktivnosti, setAktivnosti] = useState<Aktivnost[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);

  // Loading stanja
  const [loading, setLoading] = useState(true);

  // Mekteb filter
  const [mektebFilter, setMektebFilter] = useState<string>('sve');

  // Pitanja state
  const [selectedPitanje, setSelectedPitanje] = useState<PitanjeImamu | null>(null);
  const [odgovorText, setOdgovorText] = useState('');
  const [isObjavljeno, setIsObjavljeno] = useState(false);
  const [odgovorCategory, setOdgovorCategory] = useState('Opće');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Hutba forma
  const [isAddingHutba, setIsAddingHutba] = useState(false);
  const [newHutba, setNewHutba] = useState({
    title: '',
    date_str: new Date().toLocaleDateString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    category: 'Ahlak',
    summary: '',
    content: '',
    author: 'Imam džemata Vreoca',
  });

  // Aktivnost forma
  const [isAddingAktivnost, setIsAddingAktivnost] = useState(false);
  const [newAktivnost, setNewAktivnost] = useState({
    title: '',
    date_str: '',
    time_str: '',
    location: 'Džamija Vreoca',
    category: 'Edukacija',
    summary: '',
    description: '',
  });

  // Učitavanje svih podataka
  const loadAllData = async () => {
    setLoading(true);
    const [m, p, h, a, s] = await Promise.all([
      getAllMektebPrijave(),
      getAllQuestionsForAdmin(),
      getHutbe(),
      getActivities(),
      getNewsletterSubscribers(),
    ]);
    setMektebPrijave(m);
    setPitanja(p);
    setHutbe(h);
    setAktivnosti(a);
    setSubscribers(s);
    setLoading(false);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Mekteb akcije
  const handleStatusChange = async (id: number | string | undefined, newStatus: any) => {
    if (!id) return;
    await updateMektebStatus(id, newStatus);
    const m = await getAllMektebPrijave();
    setMektebPrijave(m);
  };

  // Pitanja akcije
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
      const p = await getAllQuestionsForAdmin();
      setPitanja(p);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleSendEmailReply = () => {
    if (!selectedPitanje) return;
    const subject = encodeURIComponent('Odgovor Imama džemata Vreoca na vaše pitanje');
    const body = encodeURIComponent(
      `Esselamu alejkum,\n\nVaše pitanje:\n"${selectedPitanje.question}"\n\nOdgovor Imama:\n${odgovorText}\n\nMahsuz selam,\nImam džemata Vreoca\nvreoca@medzlis-sarajevo.ba`
    );
    window.open(`mailto:${selectedPitanje.sender_contact}?subject=${subject}&body=${body}`);
  };

  // Hutbe akcije
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
    const h = await getHutbe();
    setHutbe(h);
  };

  const handleDeleteHutba = async (id: number | string | undefined) => {
    if (!id) return;
    if (confirm('Da li ste sigurni da želite obrisati ovu hutbu?')) {
      await deleteHutba(id);
      const h = await getHutbe();
      setHutbe(h);
    }
  };

  // Aktivnosti akcije
  const handleCreateAktivnost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAktivnost.title || !newAktivnost.date_str) return;

    await createActivity(newAktivnost);
    setIsAddingAktivnost(false);
    setNewAktivnost({
      title: '',
      date_str: '',
      time_str: '',
      location: 'Džamija Vreoca',
      category: 'Edukacija',
      summary: '',
      description: '',
    });
    const a = await getActivities();
    setAktivnosti(a);
  };

  const handleDeleteAktivnost = async (id: number | string | undefined) => {
    if (!id) return;
    if (confirm('Da li ste sigurni da želite obrisati ovu aktivnost?')) {
      await deleteActivity(id);
      const a = await getActivities();
      setAktivnosti(a);
    }
  };

  // Newsletter akcije
  const handleDeleteSubscriber = async (id: number | string | undefined) => {
    if (!id) return;
    if (confirm('Ukloniti ovog pretplatnika sa liste?')) {
      await deleteNewsletterSubscriber(id);
      const s = await getNewsletterSubscribers();
      setSubscribers(s);
    }
  };

  const handleBroadcastNewsletter = () => {
    if (subscribers.length === 0) {
      alert('Nema pretplatnika na newsletter listi.');
      return;
    }
    const bccList = subscribers.map((s) => s.email).join(',');
    const subject = encodeURIComponent('Novosti iz džemata Vreoca');
    const body = encodeURIComponent(
      'Esselamu alejkum poštovane džematlije,\n\nNa web stranici džemata Vreoca objavljena je nova hutba i obavijest.\n\nPosjetite nas na: http://localhost:3000/\n\nMahsuz selam,\nDžemat Vreoca'
    );
    window.open(`mailto:vreoca@medzlis-sarajevo.ba?bcc=${bccList}&subject=${subject}&body=${body}`);
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

  const pendingMektebCount = mektebPrijave.filter((p) => p.status === 'na_cekanju').length;
  const unansweredPitanjaCount = pitanja.filter((p) => !p.answer).length;

  const navItems = [
    { id: 'overview', label: 'Pregled & Statistika', icon: LayoutDashboard },
    { id: 'mekteb', label: 'Prijave za mekteb', icon: GraduationCap, badge: pendingMektebCount, badgeColor: 'bg-emerald-600' },
    { id: 'pitanja', label: 'Pitanja za Imama', icon: MessageSquare, badge: unansweredPitanjaCount, badgeColor: 'bg-amber-600' },
    { id: 'hutbe', label: 'Tekstualne hutbe', icon: BookOpen, count: hutbe.length },
    { id: 'aktivnosti', label: 'Aktivnosti i događaji', icon: Calendar, count: aktivnosti.length },

    { id: 'newsletter', label: 'Newsletter pretplatnici', icon: Mail, count: subscribers.length },
  ];

  return (
    <div className="min-h-screen bg-[#f4f4f2] text-stone-900 flex flex-col lg:flex-row">
      {/* ============================================================ */}
      {/* MOBILE TOP BAR (Phone Header) */}
      {/* ============================================================ */}
      <div className="lg:hidden bg-[#1b3d2f] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2.5">
          <IslamskaZajednicaLogo size={28} />
          <div>
            <h1 className="text-xs font-bold font-serif leading-tight">Imamov Panel</h1>
            <p className="text-[10px] text-emerald-200">Džemat Vreoca</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-900/60 transition-colors"
            title="Povratak na web stranicu"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-white bg-emerald-900/80 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SIDEBAR (Desktop Fixed Left + Mobile Slide-over Drawer) */}
      {/* ============================================================ */}
      <aside
        className={`fixed lg:sticky top-0 left-0 bottom-0 z-40 w-72 bg-[#1b3d2f] text-white flex flex-col justify-between transition-transform duration-300 shadow-xl ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6">
          {/* Brand Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-emerald-800/80 mb-6">
            <IslamskaZajednicaLogo size={38} />
            <div>
              <h2 className="text-sm font-bold font-serif tracking-tight text-white">
                Džemat Vreoca
              </h2>
              <span className="text-[10px] font-semibold text-emerald-300 uppercase tracking-wider block">
                Imamov Portal
              </span>
            </div>
          </div>

          {/* Database Connection Status Badge */}
          <div className="mb-6 bg-emerald-950/70 border border-emerald-800/60 rounded-xl p-2.5 flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-200">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Supabase Cloud:</span>
            </span>
            <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${isSupabaseConfigured ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'}`}>
              {isSupabaseConfigured ? 'Aktivno' : 'Lokalni mod'}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as TabType);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs font-bold'
                      : 'text-emerald-100/80 hover:bg-emerald-900/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-emerald-400/80'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${item.badgeColor || 'bg-emerald-600'}`}>
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && (
                    <span className="text-[10px] text-emerald-300/80 font-mono">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-emerald-800/80 space-y-2">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-emerald-900/60 hover:bg-emerald-900 text-emerald-100 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Povratak na sajt</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-900/30 hover:bg-red-900/60 text-red-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Odjavi se</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 z-30 bg-stone-900/60 backdrop-blur-xs"
        />
      )}

      {/* ============================================================ */}
      {/* MAIN DASHBOARD CONTENT AREA */}
      {/* ============================================================ */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl">
        {/* ============================================================ */}
        {/* 1. OVERVIEW / STATISTIKA TAB */}
        {/* ============================================================ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
                Esselamu alejkum, poštovani Imame!
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                Pregled aktivnosti, prijava i komunikacije u džematu Vreoca za današnji dan.
              </p>
            </div>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => setActiveTab('mekteb')}
                className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-stone-500 uppercase">Mekteb Prijave</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#1b3d2f] flex items-center justify-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold font-serif text-stone-900">
                  {mektebPrijave.length}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold">
                  <span>{pendingMektebCount} novih na čekanju</span>
                </div>
              </div>

              <div
                onClick={() => setActiveTab('pitanja')}
                className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-stone-500 uppercase">Pitanja za Imama</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold font-serif text-stone-900">
                  {pitanja.length}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-amber-800 font-semibold">
                  <span>{unansweredPitanjaCount} čeka vaš odgovor</span>
                </div>
              </div>

              <div
                onClick={() => setActiveTab('hutbe')}
                className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-stone-500 uppercase">Arhiva Hutbi</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold font-serif text-stone-900">
                  {hutbe.length}
                </div>
                <div className="mt-2 text-[11px] text-stone-500">
                  Tekstualne petkovne hutbe
                </div>
              </div>

              <div
                onClick={() => setActiveTab('newsletter')}
                className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-stone-500 uppercase">Pretplatnici</span>
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold font-serif text-stone-900">
                  {subscribers.length}
                </div>
                <div className="mt-2 text-[11px] text-stone-500">
                  Džematlija prima obavijesti
                </div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                Brze Akcije
              </h3>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => {
                    setActiveTab('hutbe');
                    setIsAddingHutba(true);
                  }}
                  className="inline-flex items-center gap-1.5 bg-[#1b3d2f] hover:bg-[#142e23] text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Unesi novu hutbu</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('aktivnosti');
                    setIsAddingAktivnost(true);
                  }}
                  className="inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all shadow-2xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Objavi novu aktivnost</span>
                </button>

                <button
                  onClick={() => exportMektebToCSV(mektebPrijave)}
                  className="inline-flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Preuzmi mekteb spisak (CSV)</span>
                </button>

                <button
                  onClick={handleBroadcastNewsletter}
                  className="inline-flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Pošalji obavijest pretplatnicima</span>
                </button>
              </div>
            </div>

            {/* Latest Mekteb & Questions split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Latest Mekteb */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                  <h3 className="font-bold text-stone-900 text-sm font-serif">
                    Najnovije prijave za mekteb
                  </h3>
                  <button
                    onClick={() => setActiveTab('mekteb')}
                    className="text-xs text-[#1b3d2f] font-semibold hover:underline cursor-pointer"
                  >
                    Vidi sve ({mektebPrijave.length})
                  </button>
                </div>

                {mektebPrijave.slice(0, 4).map((p) => (
                  <div key={p.id} className="py-2.5 border-b border-stone-100 last:border-0 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-stone-900">{p.child_name} ({p.birth_year}.)</div>
                      <div className="text-[11px] text-stone-500">Roditelj: {p.parent_name} • {p.phone}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.status === 'upisano' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
                      {p.status === 'upisano' ? 'Upisano' : 'Na čekanju'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Latest Questions */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                  <h3 className="font-bold text-stone-900 text-sm font-serif">
                    Pristigla pitanja za odgovor
                  </h3>
                  <button
                    onClick={() => setActiveTab('pitanja')}
                    className="text-xs text-[#1b3d2f] font-semibold hover:underline cursor-pointer"
                  >
                    Vidi sve ({pitanja.length})
                  </button>
                </div>

                {pitanja.slice(0, 4).map((q) => (
                  <div key={q.id} className="py-2.5 border-b border-stone-100 last:border-0 flex items-center justify-between text-xs">
                    <div className="max-w-xs sm:max-w-md">
                      <div className="font-bold text-stone-900 font-serif line-clamp-1">„{q.question}“</div>
                      <div className="text-[11px] text-stone-500">Od: {q.sender_name || 'Džematlija'} ({q.sender_contact})</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${q.answer ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
                      {q.answer ? 'Odgovoreno' : 'Čeka'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. MEKTEB PRIJAVE TAB */}
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

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => exportMektebToCSV(mektebPrijave)}
                  className="inline-flex items-center gap-1.5 bg-[#1b3d2f] hover:bg-[#142e23] text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Preuzmi CSV/Excel</span>
                </button>

                <select
                  value={mektebFilter}
                  onChange={(e) => setMektebFilter(e.target.value)}
                  className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
                >
                  <option value="sve">Sve prijave ({mektebPrijave.length})</option>
                  <option value="na_cekanju">Na čekanju</option>
                  <option value="upisano">Upisano</option>
                  <option value="arhivirano">Arhivirano</option>
                </select>
              </div>
            </div>

            {loading ? (
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
                        <th className="py-3.5 px-4 text-right">Promjena statusa</th>
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
                              className="bg-stone-100 border border-stone-200 rounded-lg px-2.5 py-1 text-[11px] font-semibold cursor-pointer focus:outline-none"
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
        {/* 3. PITANJA ZA IMAMA TAB */}
        {/* ============================================================ */}
        {activeTab === 'pitanja' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left list */}
            <div className="lg:col-span-5 space-y-3">
              <div className="bg-white p-4 rounded-2xl border border-stone-200">
                <h3 className="font-bold text-stone-900 text-sm font-serif">
                  Pristigla pitanja ({pitanja.length})
                </h3>
                <p className="text-[11px] text-stone-500">
                  Odaberite pitanje za unos odgovora i slanje džematliji.
                </p>
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
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
            </div>

            {/* Right Editor */}
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

                    <div className="pt-3 flex items-center justify-between">
                      {selectedPitanje.sender_contact && (
                        <button
                          type="button"
                          onClick={handleSendEmailReply}
                          className="inline-flex items-center gap-1.5 text-xs text-[#1b3d2f] font-semibold hover:underline cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Pošalji na email džematlije</span>
                        </button>
                      )}

                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-[#1b3d2f] hover:bg-[#142e23] text-white px-6 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer ml-auto"
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
        {/* 4. HUTBE TAB */}
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
                className="inline-flex items-center gap-2 bg-[#1b3d2f] hover:bg-[#142e23] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAddingHutba ? 'Zatvori unos' : 'Dodaj novu hutbu'}</span>
              </button>
            </div>

            {isAddingHutba && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md animate-in fade-in">
                <h3 className="text-base font-bold text-stone-900 font-serif mb-4">
                  Unos nove petkovne hutbe
                </h3>
                <form onSubmit={handleCreateHutba} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-stone-700 mb-1">Naslov hutbe *</label>
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
                      <label className="block font-semibold text-stone-700 mb-1">Datum hutbe</label>
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
                      <label className="block font-semibold text-stone-700 mb-1">Kategorija / Tema</label>
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
                      <label className="block font-semibold text-stone-700 mb-1">Khatib / Autor</label>
                      <input
                        type="text"
                        value={newHutba.author}
                        onChange={(e) => setNewHutba({ ...newHutba, author: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Kratak sažetak *</label>
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
                    <label className="block font-semibold text-stone-700 mb-1">Puni tekst hutbe *</label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hutbe.map((h) => (
                <div key={h.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-stone-500 mb-2">
                      <span className="bg-emerald-50 text-[#1b3d2f] font-semibold px-2 py-0.5 rounded-full">
                        {h.category}
                      </span>
                      <span>{h.date_str}</span>
                    </div>
                    <h4 className="font-bold text-stone-900 font-serif text-base mb-1">{h.title}</h4>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{h.summary}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-400 text-[11px]">Autor: {h.author || 'Imam džemata Vreoca'}</span>
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
          </div>
        )}

        {/* ============================================================ */}
        {/* 5. AKTIVNOSTI TAB */}
        {/* ============================================================ */}
        {activeTab === 'aktivnosti' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div>
                <h2 className="text-lg font-bold text-stone-900 font-serif">
                  Aktivnosti i aktuelnosti džemata
                </h2>
                <p className="text-xs text-stone-500">
                  Upravljanje džematskim događajima, tribinama, akcijama i druženjima.
                </p>
              </div>

              <button
                onClick={() => setIsAddingAktivnost(!isAddingAktivnost)}
                className="inline-flex items-center gap-2 bg-[#1b3d2f] hover:bg-[#142e23] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAddingAktivnost ? 'Zatvori unos' : 'Dodaj novu aktivnost'}</span>
              </button>
            </div>

            {isAddingAktivnost && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md animate-in fade-in">
                <h3 className="text-base font-bold text-stone-900 font-serif mb-4">
                  Unos novog događaja / aktivnosti
                </h3>
                <form onSubmit={handleCreateAktivnost} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-stone-700 mb-1">Naziv aktivnosti *</label>
                      <input
                        type="text"
                        required
                        placeholder="npr. Džematska tribina i predavanje"
                        value={newAktivnost.title}
                        onChange={(e) => setNewAktivnost({ ...newAktivnost, title: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Kategorija</label>
                      <select
                        value={newAktivnost.category}
                        onChange={(e) => setNewAktivnost({ ...newAktivnost, category: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none"
                      >
                        <option value="Edukacija">Edukacija / Tribina</option>
                        <option value="Humanitarno">Humanitarna akcija</option>
                        <option value="Omladina">Mreža mladih</option>
                        <option value="Džemat">Džemat / Druženje</option>
                        <option value="Ramazan">Ramazan / Iftar</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Datum *</label>
                      <input
                        type="text"
                        required
                        placeholder="npr. Petak, 18. septembar"
                        value={newAktivnost.date_str}
                        onChange={(e) => setNewAktivnost({ ...newAktivnost, date_str: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Vrijeme (opciono)</label>
                      <input
                        type="text"
                        placeholder="npr. Poslije akšama (19:30)"
                        value={newAktivnost.time_str}
                        onChange={(e) => setNewAktivnost({ ...newAktivnost, time_str: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Lokacija</label>
                      <input
                        type="text"
                        placeholder="npr. Divanhana džamije Vreoca"
                        value={newAktivnost.location}
                        onChange={(e) => setNewAktivnost({ ...newAktivnost, location: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Kratak sažetak *</label>
                    <input
                      type="text"
                      required
                      placeholder="Kratak opis koji ide na karticu..."
                      value={newAktivnost.summary}
                      onChange={(e) => setNewAktivnost({ ...newAktivnost, summary: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Detaljan opis aktivnosti *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Unesite puni opis događaja..."
                      value={newAktivnost.description}
                      onChange={(e) => setNewAktivnost({ ...newAktivnost, description: e.target.value })}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs leading-relaxed focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingAktivnost(false)}
                      className="px-4 py-2 text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      Odustani
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#1b3d2f] hover:bg-[#142e23] text-white font-semibold rounded-xl cursor-pointer"
                    >
                      Objavi aktivnost
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aktivnosti.map((a) => (
                <div key={a.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-stone-500 mb-2">
                      <span className="bg-emerald-50 text-[#1b3d2f] font-semibold px-2 py-0.5 rounded-full">
                        {a.category}
                      </span>
                      <span>{a.date_str}</span>
                    </div>
                    <h4 className="font-bold text-stone-900 font-serif text-base mb-1">{a.title}</h4>
                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">{a.summary || a.description}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-400 text-[11px]">{a.location || 'Džamija Vreoca'}</span>
                    <button
                      onClick={() => handleDeleteAktivnost(a.id)}
                      className="text-red-600 hover:text-red-800 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                      title="Obriši aktivnost"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 6. NEWSLETTER TAB */}
        {/* ============================================================ */}
        {activeTab === 'newsletter' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div>
                <h2 className="text-lg font-bold text-stone-900 font-serif">
                  Pretplatnici na obavijesti džemata
                </h2>
                <p className="text-xs text-stone-500">
                  Spisak džematlija koji žele primati email novosti o hutbama, mektebu i aktivnostima.
                </p>
              </div>

              <button
                onClick={handleBroadcastNewsletter}
                className="inline-flex items-center gap-2 bg-[#1b3d2f] hover:bg-[#142e23] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Pošalji obavijest svima ({subscribers.length})</span>
              </button>
            </div>

            {subscribers.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
                <Users className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-stone-800 font-serif">Još nema pretplatnika</h3>
                <p className="text-xs text-stone-500 mt-1">Kada se džematlije prijave putem forme na sajtu, lista će se popuniti.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
                      <tr>
                        <th className="py-3.5 px-4">Email adresa</th>
                        <th className="py-3.5 px-4">Ime džematlije</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Datum prijave</th>
                        <th className="py-3.5 px-4 text-right">Akcija</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {subscribers.map((s) => (
                        <tr key={s.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                            {s.email}
                          </td>
                          <td className="py-3.5 px-4 text-stone-600">
                            {s.name || 'Anonimno'}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                              Aktivan
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-stone-500 font-mono text-[11px]">
                            {s.created_at ? new Date(s.created_at).toLocaleDateString('bs-BA') : 'Nedavno'}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleDeleteSubscriber(s.id)}
                              className="text-red-600 hover:text-red-800 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                              title="Ukloni pretplatnika"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
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
      </main>
    </div>
  );
};
