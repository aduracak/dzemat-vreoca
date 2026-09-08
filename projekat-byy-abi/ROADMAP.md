# ROADMAP - Džemat Vreoca

## Faza 1: Frontend & UI/UX (Završeno)
- [x] Postavljanje modernog responsive UI-a (React + Tailwind CSS 4 + Vite)
- [x] Implementacija hero sekcije sa slikom džamije i munare Vreoca
- [x] Integracija oficijelnog logotipa Islamske zajednice
- [x] Povezivanje vaktija.ba live API-ja za Sarajevo i Ilidžu

## Faza 2: Backend & Email Routing (U toku)
- [ ] Express backend server integracija sa Vite dev i production okruženjem
- [ ] Endpoint `POST /api/mekteb/prijava` za slanje prijava na džematski email
- [ ] Endpoint `POST /api/kontakt/pitanje-imamu` za slanje upita na email imama
- [ ] HTML predlošci (email templates) sa detaljima prijave / pitanja
- [ ] Sigurnosna validacija polja (input sanitization & rate limiting)

## Faza 3: Dodatne funkcionalnosti & Deploy
- [ ] Dodatni zahtjevi od korisnika ("također...")
- [ ] Deployment na hosting / produkciju (Vercel, Render, VPS ili Cloud Run)
