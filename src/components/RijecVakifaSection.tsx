import React, { useState } from 'react';
import { Heart, Sparkles, Building2, Quote, CheckCircle2, ChevronRight, BookOpen, Clock } from 'lucide-react';

export const RijecVakifaSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hronologija' | 'cjeloviti_tekst'>('hronologija');

  const milestones = [
    {
      year: '2013.',
      tag: 'Početak & Ideja',
      title: 'Kupovina kuće i tiha ideja u srcu',
      text: 'Godine 2013. kupljena je jedna srpska kuća, koja se nalazila odmah na međi, odnosno uz samu granicu našeg vrtića. Prilikom same kupovine te kuće, u meni se rodila jedna ideja – da bi bilo lijepo da djeca iz našeg vrtića imaju mjesto gdje bi mogla klanjati i učiti vjeru. Tako je, sasvim spontano došla ideja o izgradnji džamije. O tome u početku nisam nikome mnogo govorio. Nisam znao hoće li se ta ideja uopće ostvariti, niti kako će se sve odvijati.',
    },
    {
      year: '2013. / 2014.',
      tag: 'Saglasnost & Dozvole',
      title: 'Podrška Islamske zajednice i Općine',
      text: 'Znao sam samo da, ako želim krenuti tim putem prvo moram dobiti saglasnost Islamske zajednice. Uputio sam se u Islamsku zajednicu i tamo su me uputili tadašnjem sekretaru Sulji. Obavijestio sam ga o svojoj namjeri i rekao da sam popunio zahtjev kako bi komisija mogla izaći na teren i pogledati lokaciju. Nakon dva mjeseca razmatranja, stigao je pozitivan odgovor Islamske zajednice. Nakon toga predali smo dokumentaciju opštini, koja je vrlo brzo dala saglasnost i dozvolu za izgradnju džamije.',
    },
    {
      year: 'Vakuf',
      tag: 'Emanet & Porodica',
      title: 'Vakuf za majku dok je još živa',
      text: 'Kada je sve bilo odobreno, kuća i zemljište su preneseni na Islamsku zajednicu i uvakufljeni. Razgovarao sam sa svojom porodicom i spomenuo im želju da taj vakuf bude za našu majku. Upravo su oni izrazili iskrenu želju da se uključe u izgradnju: „To je naša majka.“ Željeli smo da naša majka, dok je još živa, svojim očima vidi ono što je učinjeno za nju i da zna da je za njen život, ali i za ono što dolazi nakon njega, zasađeno nešto od čega će neprestano dolaziti sevapi.',
      highlight: true,
    },
    {
      year: 'Ramazan 2014.',
      tag: 'Temelji',
      title: 'Izlivanje prve ploče i završetak gradnje',
      text: 'Godine 2014., u mjesecu ramazanu, izlivena je prva ploča. Na tom mubarek događaju prisustvovali su hodža, imam, muderis, komšije i svi oni koji su bili dio tog početka. Tako je, korak po korak, počela nastajati džamija. Gradnja je, Allahovom pomoći, završena s hajrom.',
    },
  ];

  return (
    <section id="rijec-vakifa" className="py-20 sm:py-28 bg-[#fafaf9] border-t border-stone-200/60 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold mb-3">
              <Quote className="w-3.5 h-3.5" />
              <span>Autentično svjedočanstvo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-serif leading-tight">
              Riječ vakifa – Početak i nastanak džamije
            </h2>
            <p className="mt-3 text-base sm:text-lg text-stone-600 leading-relaxed">
              Ispovijest o tome kako je od jedne kupljene kuće i tihe ideje u srcu izgrađena džamija Vreoca kao trajni vakuf i hajr za majku.
            </p>
          </div>

          {/* View Toggle */}
          <div className="inline-flex p-1 bg-stone-200/70 rounded-2xl border border-stone-300/60 text-xs font-semibold self-start md:self-auto">
            <button
              onClick={() => setActiveTab('hronologija')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'hronologija'
                  ? 'bg-white text-[#1b3d2f] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Hronologija gradnje
            </button>
            <button
              onClick={() => setActiveTab('cjeloviti_tekst')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'cjeloviti_tekst'
                  ? 'bg-white text-[#1b3d2f] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Cjelovita priča
            </button>
          </div>
        </div>

        {/* Tab 1: Chronological Interactive Flow */}
        {activeTab === 'hronologija' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  className={`rounded-3xl p-7 sm:p-8 border transition-all duration-300 flex flex-col justify-between ${
                    m.highlight
                      ? 'bg-gradient-to-br from-[#1b3d2f] to-[#142e23] text-white border-emerald-800 shadow-md'
                      : 'bg-white text-stone-900 border-stone-200/80 shadow-xs hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                          m.highlight
                            ? 'bg-emerald-700/60 text-emerald-100 border border-emerald-500/30'
                            : 'bg-emerald-50 text-[#1b3d2f] border border-emerald-200/60'
                        }`}
                      >
                        {m.tag}
                      </span>
                      <span
                        className={`text-xs font-mono font-bold ${
                          m.highlight ? 'text-emerald-300' : 'text-stone-400'
                        }`}
                      >
                        {m.year}
                      </span>
                    </div>

                    <h3
                      className={`text-xl font-bold font-serif mb-3 ${
                        m.highlight ? 'text-white' : 'text-stone-900'
                      }`}
                    >
                      {m.title}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed ${
                        m.highlight ? 'text-emerald-100/90' : 'text-stone-600'
                      }`}
                    >
                      {m.text}
                    </p>
                  </div>

                  {m.highlight && (
                    <div className="mt-6 pt-4 border-t border-emerald-700/60 flex items-center gap-2 text-xs text-amber-200 font-medium">
                      <Heart className="w-4 h-4 fill-amber-200 text-amber-200 shrink-0" />
                      <span>Posebna namjera: Vakuf za majku za njenog života</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Full Continuous Narrative Book Layout */}
        {activeTab === 'cjeloviti_tekst' && (
          <div className="bg-white rounded-3xl p-7 sm:p-12 border border-stone-200/80 shadow-sm animate-in fade-in duration-200">
            <div className="max-w-3xl mx-auto space-y-6 text-stone-700 text-sm sm:text-base leading-relaxed font-serif">
              <div className="flex items-center gap-3 pb-6 border-b border-stone-200">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1b3d2f] flex items-center justify-center font-serif font-bold text-xl">
                  V
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900">Početak i nastanak džamije Vreoca</h3>
                  <p className="text-xs font-sans text-stone-500">Zapis vakifa o gradnji i porodičnom hajduru</p>
                </div>
              </div>

              <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-[#1b3d2f] first-letter:mr-2 first-letter:float-left">
                Godine 2013. kupljena je jedna srpska kuća, koja se nalazila odmah na međi, odnosno uz samu granicu našeg vrtića. Prilikom same kupovine te kuće, u meni se rodila jedna ideja – da bi bilo lijepo da djeca iz našeg vrtića imaju mjesto gdje bi mogla klanjati i učiti vjeru. Tako je, sasvim spontano došla ideja o izgradnji džamije.
              </p>

              <p>
                O tome u početku nisam nikome mnogo govorio. Nisam znao hoće li se ta ideja uopće ostvariti, niti kako će se sve odvijati. Znao sam samo da, ako želim krenuti tim putem, prvo moram dobiti saglasnost Islamske zajednice.
              </p>

              <p>
                Uputio sam se u Islamsku zajednicu i tamo su me uputili tadašnjem sekretaru Sulji. Obavijestio sam ga o svojoj namjeri i rekao da sam popunio zahtjev kako bi komisija mogla izaći na teren i pogledati lokaciju. Nakon toga je došao na lice mjesta, pregledao zemljište i lokaciju, a zatim je dokumentaciju proslijedio dalje u Islamsku zajednicu. Čekali smo otprilike dva mjeseca da komisija razmotri zahtjev i donese odluku – da li je ta lokacija odgovarajuća, da li postoji potreba i da li je tu džamija poželjna.
              </p>

              <p>
                Nakon određenog vremena stigao je pozitivan odgovor Islamske zajednice i data je saglasnost da se na toj lokaciji može graditi džamija. Nakon toga predali smo potrebnu dokumentaciju opštini radi dobijanja građevinske dozvole. Opština je vrlo brzo razmotrila zahtjev i dala saglasnost, odnosno dozvolu za izgradnju džamije.
              </p>

              <div className="bg-emerald-50/70 p-6 sm:p-7 rounded-2xl border-l-4 border-[#1b3d2f] my-6 font-sans text-sm text-emerald-950">
                <p className="font-semibold text-base font-serif mb-2 text-[#1b3d2f]">
                  Vakuf za majku za njenog života
                </p>
                <p className="leading-relaxed text-stone-700">
                  „Kada je sve to bilo odobreno, pristupilo se i formalnom dijelu – da se kuća i dio zemljišta koje sam kupio prenesu na Islamsku zajednicu i da se uvakufe za džamiju. Nakon toga sam razgovarao sa svojom porodicom i kazao im šta sam namjeravao uraditi. Spomenuo sam im da želim da kuća i dio zemljišta koje sam kupio budu preneseni na Islamsku zajednicu i uvakufljeni za izgradnju džamije, te da mi je posebna želja da taj vakuf bude za našu majku.
                </p>
                <p className="leading-relaxed text-stone-700 mt-3">
                  Kada sam to spomenuo svojima upravo su oni izrazili želju da se uključe u izgradnju džamije i da svojim doprinosom učestvuju u tom hajru. Njihova želja bila je iskrena i jednostavna: <strong>'To je naša majka.'</strong> Željeli su da i oni učestvuju u djelu koje će biti vakuf za našu majku i da zajedno ostavimo nešto što će, ako Allah primi, trajati i koristiti ljudima.
                </p>
                <p className="leading-relaxed text-stone-700 mt-3">
                  To mi je od početka bilo posebno važno. Ljudi često prave vakuf za svoje roditelje nakon njihove smrti. Ja sam, međutim, imao želju da naša majka, dok je još živa, svojim očima vidi ono što je učinjeno za nju i da zna da je za njen život, ali i za ono što dolazi nakon njega, zasađeno nešto od čega će, ako Allah primi, neprestano dolaziti sevapi.“
                </p>
              </div>

              <p>
                Godine 2014., u mjesecu ramazanu, izlivena je prva ploča. Na tom događaju bio je prisutan i hodža, imam, muderis, komšije, i ostali... koji su bili dio tog početka. Tako je, korak po korak, počela nastajati džamija.
              </p>

              <p>
                Gradnja je, Allahovom pomoći, završena s hajrom.
              </p>
            </div>
          </div>
        )}

        {/* Big Concluding Highlight Card */}
        <div className="mt-8 sm:mt-10 bg-gradient-to-r from-[#1b3d2f] via-[#234e3c] to-[#1b3d2f] text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <span className="text-3xl sm:text-4xl mb-4 block">🤲🏻</span>
            <div className="text-xl sm:text-2xl font-bold font-serif text-emerald-200 mb-4 tracking-wide">
              Danas, nakon više od deset godina, kada pogledam unazad, mogu samo reći: <br className="hidden sm:inline" />
              <span className="text-white font-extrabold text-2xl sm:text-3xl">Elhamdulillah.</span>
            </div>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-serif italic border-t border-emerald-700/60 pt-6 mt-6">
              „Od jedne kupljene kuće, od jedne tihe ideje koja se rodila u srcu, preko saglasnosti Islamske zajednice, dozvole opštine, vakufa i porodičnog učešća, došlo se do džamije u kojoj se klanja, uči Kur'an, odgajaju djeca i spominje Allah.“
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-xs text-emerald-300 font-sans font-semibold bg-white/10 backdrop-blur-xs px-4 py-2 rounded-full border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Džemat Vreoca • Vakuf za majku • 2013 – 2026.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
