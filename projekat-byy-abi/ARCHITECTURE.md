# ARCHITECTURE - Arhitektura sistema

## Pregled sistema
```
[ Klijent: React 19 + Tailwind CSS + Vite ]
         |
         | HTTP POST /api/mekteb/prijava
         | HTTP POST /api/kontakt/pitanje-imamu
         v
[ Backend: Node.js + Express.js API Server ]
         |
         |-- Validacija & Sanitizacija unosa
         |-- Rate Limiting (zaštita od spama)
         |-- Formiranje HTML Email Template-a
         v
[ SMTP Servis: Nodemailer ]
         |
         |---> [ Džematski Inbox: dzemat.vreoca@gmail.com ] (Prijave u mekteb)
         |---> [ Imamov Inbox: imam@... ] (Pitanja i duhovni savjeti)
```

## Sigurnosna pravila:
1. Validacija svakog polja na serveru (ime, email, telefon, tekst poruke).
2. XSS zaštita pri renderovanju sadržaja u emailu.
3. CORS zaštita za dozvoljene domene.
4. `.env` zaštita tajnih ključeva i SMTP lozinki.
