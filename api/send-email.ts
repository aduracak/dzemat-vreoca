import { Resend } from 'resend';

// Vercel Serverless Function za slanje emailova preko Resend-a
export default async function handler(req: any, res: any) {
  // Postavka CORS zaglavlja
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const apiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;

  if (!apiKey) {
    console.warn('RESEND_API_KEY nije postavljen u environment varijablama.');
    return res.status(200).json({
      success: true,
      simulated: true,
      message: 'Email simuliran (RESEND_API_KEY nije definisan).',
    });
  }

  const resend = new Resend(apiKey);
  const { type, data } = req.body || {};
  const officialEmail = process.env.OFFICIAL_EMAIL || process.env.VITE_OFFICIAL_EMAIL || 'vreoca@medzlis-sarajevo.ba';

  try {
    // -------------------------------------------------------------
    // 1. MEKTEB PRIJAVA
    // -------------------------------------------------------------
    if (type === 'mekteb_prijava') {
      const { parent_name, child_name, birth_year, phone, email, group_level } = data;

      // Email imamu / džematu
      await resend.emails.send({
        from: 'Džemat Vreoca <onboarding@resend.dev>',
        to: [officialEmail],
        replyTo: email || undefined,
        subject: `Nova prijava za mekteb: ${child_name} (${birth_year}.)`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f9f9f8; padding: 24px; color: #1c1917;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e7e5e4; overflow: hidden;">
              <div style="background-color: #1b3d2f; color: #ffffff; padding: 20px; text-align: center;">
                <h2 style="margin: 0; font-size: 20px;">Džemat Vreoca • Mekteb</h2>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #a7f3d0;">Nova online prijava polaznika</p>
              </div>
              <div style="padding: 24px;">
                <p style="font-size: 14px; margin-top: 0;">Esselamu alejkum, na web stranici je pristigla nova prijava za mektebsku pouku:</p>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin: 16px 0;">
                  <tr style="border-bottom: 1px solid #f5f5f4;">
                    <td style="padding: 8px 0; color: #78716c;">Ime djeteta:</td>
                    <td style="padding: 8px 0; font-weight: bold; color: #1c1917;">${child_name}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f5f5f4;">
                    <td style="padding: 8px 0; color: #78716c;">Godište:</td>
                    <td style="padding: 8px 0; font-weight: bold; color: #1c1917;">${birth_year}.</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f5f5f4;">
                    <td style="padding: 8px 0; color: #78716c;">Nivo mekteba:</td>
                    <td style="padding: 8px 0; font-weight: bold; color: #047857;">${group_level}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f5f5f4;">
                    <td style="padding: 8px 0; color: #78716c;">Ime roditelja:</td>
                    <td style="padding: 8px 0; font-weight: bold; color: #1c1917;">${parent_name}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f5f5f4;">
                    <td style="padding: 8px 0; color: #78716c;">Telefon:</td>
                    <td style="padding: 8px 0; font-weight: bold; color: #1c1917;">
                      <a href="tel:${phone}" style="color: #047857; text-decoration: none;">${phone}</a>
                    </td>
                  </tr>
                  ${email ? `
                  <tr>
                    <td style="padding: 8px 0; color: #78716c;">Email:</td>
                    <td style="padding: 8px 0; font-weight: bold; color: #1c1917;">${email}</td>
                  </tr>` : ''}
                </table>
                <p style="font-size: 12px; color: #78716c; margin-bottom: 0;">Prijavu možete pregledati i ažurirati njen status u <a href="http://localhost:3000/#admin" style="color: #047857; font-weight: bold;">Imamovom Panelu</a>.</p>
              </div>
            </div>
          </div>
        `,
      });

      // Potvrda roditelju (ako je unio email)
      if (email && email.includes('@')) {
        await resend.emails.send({
          from: 'Džemat Vreoca <onboarding@resend.dev>',
          to: [email],
          subject: 'Potvrda prijave za mekteb – Džemat Vreoca',
          html: `
            <div style="font-family: Arial, sans-serif; background-color: #f9f9f8; padding: 24px; color: #1c1917;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e7e5e4; padding: 24px;">
                <h3 style="color: #1b3d2f; margin-top: 0;">Esselamu alejkum poštovani ${parent_name},</h3>
                <p style="font-size: 13px; line-height: 1.6;">Uspješno smo zaprimili vašu online prijavu za upis djeteta <strong>${child_name}</strong> u mekteb Džemata Vreoca (nivo: <em>${group_level}</em>).</p>
                <p style="font-size: 13px; line-height: 1.6;">Imam džemata će vas kontaktirati prije početka nastave radi dogovora o rasporedu i preuzimanju udžbenika.</p>
                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f5f5f4; font-size: 12px; color: #78716c;">
                  <strong>Džemat Vreoca • Ilidža</strong><br/>
                  Islamska zajednica u Bosni i Hercegovini<br/>
                  Email: ${officialEmail}
                </div>
              </div>
            </div>
          `,
        });
      }

      return res.status(200).json({ success: true, message: 'Mekteb prijava uspješno poslata.' });
    }

    // -------------------------------------------------------------
    // 2. PITANJE ZA IMAMA
    // -------------------------------------------------------------
    if (type === 'pitanje_imamu') {
      const { sender_name, sender_contact, question, category } = data;

      await resend.emails.send({
        from: 'Džemat Vreoca <onboarding@resend.dev>',
        to: [officialEmail],
        replyTo: sender_contact.includes('@') ? sender_contact : undefined,
        subject: `Novo pitanje za Imama [${category || 'Opće'}]: ${sender_name || 'Džematlija'}`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f9f9f8; padding: 24px; color: #1c1917;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e7e5e4; overflow: hidden;">
              <div style="background-color: #1b3d2f; color: #ffffff; padding: 20px; text-align: center;">
                <h2 style="margin: 0; font-size: 20px;">Džemat Vreoca</h2>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #a7f3d0;">Novo pitanje za Imama</p>
              </div>
              <div style="padding: 24px;">
                <p style="font-size: 13px; color: #78716c; margin-top: 0;">
                  Pošiljalac: <strong>${sender_name || 'Džematlija'}</strong><br/>
                  Kontakt: <strong>${sender_contact}</strong><br/>
                  Kategorija: <strong>${category || 'Opće'}</strong>
                </p>
                <div style="background-color: #f5f5f4; padding: 16px; border-radius: 12px; font-style: italic; font-size: 14px; margin: 16px 0; color: #292524;">
                  „${question}“
                </div>
                <p style="font-size: 12px; color: #78716c; margin-bottom: 0;">Na ovo pitanje možete odgovoriti direktno u <a href="http://localhost:3000/#admin" style="color: #047857; font-weight: bold;">Imamovom Panelu</a>.</p>
              </div>
            </div>
          </div>
        `,
      });

      return res.status(200).json({ success: true, message: 'Pitanje uspješno poslano imamu.' });
    }

    return res.status(400).json({ error: 'Nepoznat tip emaila.' });
  } catch (error: any) {
    console.error('Greška pri slanju emaila:', error);
    return res.status(500).json({ error: error.message || 'Greška na serveru.' });
  }
}
