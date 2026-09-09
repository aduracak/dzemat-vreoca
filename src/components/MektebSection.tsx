import React, { useState } from 'react';
import { BookOpen, GraduationCap, Calendar, Clock, CheckCircle2, UserCheck, Send, Check } from 'lucide-react';
import { submitMektebEnrollment } from '../services/supabaseService';

export const MektebSection: React.FC = () => {
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    fatherName: '',
    motherName: '',
    childName: '',
    birthYear: '',
    phone: '',
    email: '',
    group: 'Početni nivo (učenje ilmihala i sura)',
    schoolGrade: '',
    schoolName: '',
  });

  const handleSubmitEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    const res = await submitMektebEnrollment({
      parent_name_father: formData.fatherName,
      parent_name_mother: formData.motherName,
      child_name: formData.childName,
      birth_year: formData.birthYear,
      phone: formData.phone,
      email: formData.email,
      group_level: formData.group,
      school_grade: formData.schoolGrade,
      school_name: formData.schoolName || undefined,
    });

    setSubmitting(false);

    if (res.success) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEnrollModalOpen(false);
        setFormData({
          fatherName: '',
          motherName: '',
          childName: '',
          birthYear: '',
          phone: '',
          email: '',
          group: 'Početni nivo (učenje ilmihala i sura)',
          schoolGrade: '',
          schoolName: '',
        });
      }, 3000);
    } else {
      setErrorMessage(res.error || 'Došlo je do greške prilikom slanja prijave.');
    }
  };


  const groups = [
    {
      level: 'I Nivo – Početnici',
      age: '6 – 9 godina',
      time: 'Subota i Nedjelja, 09:30 – 11:00',
      description: 'Upoznavanje sa osnovama islama, ahlakom, kratkim kur\'anskim surama i dova.',
    },
    {
      level: 'II Nivo – Sufara',
      age: '10 – 13 godina',
      time: 'Subota i Nedjelja, 11:15 – 12:45',
      description: 'Učenje arapskog pisma, pravila tedžvida, priprema za učenje Kur\'ana i propisi namaza.',
    },
    {
      level: 'III Nivo – Kur\'an i Hifz',
      age: '14+ godina & omladina',
      time: 'Subota i Nedjelja, 13:30 – 15:00',
      description: 'Učenje Kur\'ana naglas, usavršavanje tedžvida, hifz odabranih sura i islamska etika.',
    },
  ];

  // Opcije za razred škole
  const schoolGradeOptions = [
    { label: 'Odaberite razred', value: '' },
    { label: '1. razred osnovne škole', value: '1. razred OŠ' },
    { label: '2. razred osnovne škole', value: '2. razred OŠ' },
    { label: '3. razred osnovne škole', value: '3. razred OŠ' },
    { label: '4. razred osnovne škole', value: '4. razred OŠ' },
    { label: '5. razred osnovne škole', value: '5. razred OŠ' },
    { label: '6. razred osnovne škole', value: '6. razred OŠ' },
    { label: '7. razred osnovne škole', value: '7. razred OŠ' },
    { label: '8. razred osnovne škole', value: '8. razred OŠ' },
    { label: '9. razred osnovne škole', value: '9. razred OŠ' },
    { label: 'I razred srednje škole', value: 'I razred SŠ' },
    { label: 'II razred srednje škole', value: 'II razred SŠ' },
    { label: 'III razred srednje škole', value: 'III razred SŠ' },
    { label: 'IV razred srednje škole', value: 'IV razred SŠ' },
    { label: 'Student / Ostalo', value: 'Student/Ostalo' },
  ];

  return (
    <section id="mekteb" className="py-20 sm:py-28 bg-white border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Mektebska nastava 2026/2027</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-serif">
              Mekteb – Temelj islamskog odgoja
            </h2>
            <p className="mt-3 text-base sm:text-lg text-stone-600">
              Učionica znanja, druženja i moralnog sazrijevanja za djecu i omladinu džemata Vreoca.
            </p>
          </div>

          <button
            onClick={() => setEnrollModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-[#1e4734] hover:bg-[#163627] text-white px-6 py-3.5 rounded-full text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>Upiši dijete u mekteb</span>
          </button>
        </div>

        {/* 3 Groups Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {groups.map((grp, i) => (
            <div
              key={grp.level}
              className="bg-stone-50/70 hover:bg-white rounded-3xl p-7 border border-stone-200/80 hover:border-stone-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full">
                    {grp.age}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">Grupa 0{i + 1}</span>
                </div>

                <h3 className="text-xl font-bold text-stone-900 font-serif mb-3">
                  {grp.level}
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed mb-6">
                  {grp.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/60 flex items-center gap-2 text-xs text-stone-600">
                <Clock className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                <span>{grp.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Online Enrollment Modal */}
      {enrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-stone-900 font-serif mb-1">
              Elektronska prijava za mekteb
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Džemat Vreoca • Mektebska godina 2026/2027.
            </p>

            {submitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-stone-900 font-serif">
                  Prijava uspješno poslata!
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Imam džemata Vreoca će vas kontaktirati prije početka nastave.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitEnrollment} className="space-y-4 text-xs">
                {/* Ime i prezime oca */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Ime i prezime oca
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="npr. Adnan Hadžić"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>

                {/* Ime i prezime majke */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Ime i prezime majke
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="npr. Amina Hadžić"
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>

                {/* Dijete + godište */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Ime i prezime djeteta
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="npr. Faris Hadžić"
                      value={formData.childName}
                      onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Godište djeteta
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="npr. 2017"
                      min="2005"
                      max="2022"
                      value={formData.birthYear}
                      onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    />
                  </div>
                </div>

                {/* Razred škole + Naziv škole */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Razred u školi
                    </label>
                    <select
                      required
                      value={formData.schoolGrade}
                      onChange={(e) => setFormData({ ...formData, schoolGrade: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    >
                      {schoolGradeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Naziv škole <span className="text-stone-400 font-normal">(opciono)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="npr. OŠ Hrasno"
                      value={formData.schoolName}
                      onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    />
                  </div>
                </div>

                {/* Telefon */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Kontakt telefon (roditelj)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+387 61 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>

                {/* Mektebski nivo */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Odaberite mektebski nivo
                  </label>
                  <select
                    value={formData.group}
                    onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  >
                    <option value="Početni nivo (učenje ilmihala i sura)">
                      I Nivo – Početnici (6 – 9 god)
                    </option>
                    <option value="Sufara (učenje arapskog pisma)">
                      II Nivo – Sufara (10 – 13 god)
                    </option>
                    <option value="Kur'an i hifz">
                      III Nivo – Kur'an i Hifz (14+ god)
                    </option>
                  </select>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs">
                    {errorMessage}
                  </div>
                )}

                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEnrollModalOpen(false)}
                    className="px-4 py-2 text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    Odustani
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 bg-[#1e4734] hover:bg-[#163627] disabled:opacity-50 text-white rounded-xl font-semibold cursor-pointer shadow-xs"
                  >
                    {submitting ? 'Slanje...' : 'Pošalji prijavu'}
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
