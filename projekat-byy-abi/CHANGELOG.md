# CHANGELOG - Džemat Vreoca

## [2026-09-08] - Implementacija Supabase Cloud Baze, Q&A Sekcije i Admin Panela
- **Supabase Cloud Arhitektura**: Integrisan `@supabase/supabase-js` umjesto lokalnog SQLite-a radi kompatibilnosti sa Vercel serverless okruženjem.
- **SQL Šema**: Kreiran `supabase-schema.sql` sa tabelama `mekteb_prijave`, `pitanja_imamu`, `hutbe` i RLS politikama.
- **Pitanja i odgovori (`PitanjaOdgovoriSection.tsx`)**: Nova javna sekcija za odgovore imama sa kategorijama, pretragom i modalom za postavljanje pitanja.
- **Mekteb prijava (`MektebSection.tsx`)**: Povezano online slanje prijava u bazu i na webmail `vreoca@medzlis-sarajevo.ba`.
- **Hutbe (`HutbeSection.tsx` & `HutbaModal.tsx`)**: Uklonjeni svi audio plejeri — prelazak na isključivo tekstualni format.
- **Donacije (`DonationModal.tsx`)**: Postavljen status „U pripremi“ za online kartično i žiro plaćanje.
- **Admin Panel za Imama (`AdminDashboard.tsx` & `AdminLoginModal.tsx`)**: Kompletno rješenje za upravljanje mekteb prijavama, odgovaranje na pitanja i unos novih hutbi.
