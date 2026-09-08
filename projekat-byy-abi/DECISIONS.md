# DECISIONS - Tehničke odluke

## 1. Arhitektura Backenda: Express.js + Vite Server / Node.js
- **Odluka**: Korištenje Express.js u kombinaciji sa postojećim TypeScript okruženjem.
- **Zašto**: Express je već u `dependencies`, izuzetno je lagan, stabilan i omogućava jednostavno definisanje REST ruta `/api/...`.
- **Alternativa**: Serverless funkcije (Vercel/Netlify functions) ili eksterni BaaS (Firebase Cloud Functions / Supabase).
- **Trade-off**: Express server traži Node.js runtime, ali pruža punu kontrolu bez zaključavanja u specifičnog cloud provajdera.

## 2. Email Provajder: Nodemailer sa SMTP konfiguracijom
- **Odluka**: Nodemailer biblioteka sa konfiguracijom preko `.env` (Gmail App Password, cPanel webmail ili namjenski SMTP poput Resend/Brevo/SendGrid).
- **Zašto**: Univerzalno rješenje koje radi sa bilo kojim postojećim džematskim emailom (npr. Gmail, Google Workspace, cPanel webmail Medžlisa).
- **Sigurnost**: Akreditivi se čuvaju isključivo u `.env.local` / environment varijablama, nikada u repozitoriju.

## 3. Odvajanje Email ruta po svrsi:
- **Mekteb prijava** -> ide na džematski email (`DZEMAT_EMAIL`).
- **Pitanje za imama / vjerski upit** -> ide direktno na imamov email (`IMAM_EMAIL`).
- **Reply-To header** -> postavljen na email korisnika koji šalje, tako da imam ili odbor mogu direktno kliknuti "Reply" i odgovoriti.
