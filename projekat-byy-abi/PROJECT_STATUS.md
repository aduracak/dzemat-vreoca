# PROJECT STATUS - Džemat Vreoca

## Trenutno stanje projekta
- **Faza**: Faza 2 - Završena (Supabase Cloud Arhitektura, Q&A Sekcija, Tekstualne Hutbe, Donacije u pripremi, Admin Panel za Imama)
- **Status**: Sve komponente spremne, testirane i optimizovane za Vercel & GitHub.

## Šta je urađeno:
1. **Supabase Cloud Integracija**:
   - Kreiran `src/services/supabaseService.ts` sa potpunom podrškom za `@supabase/supabase-js` i pametnim fallback sistemom.
   - Pripremljena kompletna SQL šema `supabase-schema.sql` sa RLS sigurnosnim politikama.
2. **Nova sekcija "Pitanja i odgovori Imama"**:
   - Javni pregled odobrenih odgovora po kategorijama.
   - Forma za slanje novih pitanja imamu (stiže na webmail `vreoca@medzlis-sarajevo.ba`).
3. **Mekteb sekcija**:
   - Povezana online prijava djece u mekteb direktno u bazu i na džematski mail.
4. **Tekstualne hutbe**:
   - Potpuno uklonjeni svi audio elementi i plejeri — hutbe su sada 100% čist, čitljiv tekst sa opcijom pretrage, čitanja i printanja.
5. **Donacije (U pripremi)**:
   - Donacijski modal prilagođen u status „U pripremi“ (i online i žiro račun).
6. **Admin Panel za Imama (`/admin` ili hash `#admin`)**:
   - Sigurna prijava sa lozinkom (`vreoca2026`).
   - Pregled mekteb prijava sa statusima i kontaktom roditelja.
   - Pregled i odgovaranje na pitanja sa opcijom objave na sajt.
   - Dodavanje i brisanje novih tekstualnih hutbi.
