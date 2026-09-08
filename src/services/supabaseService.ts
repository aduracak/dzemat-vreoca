/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

// Environment varijable za Supabase
const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';

// Inicijalizacija Supabase klijenta (ako su ključevi definisani)
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ============================================================================
// TIPOVI PODATAKA
// ============================================================================

export interface MektebPrijava {
  id?: number | string;
  parent_name: string;
  child_name: string;
  birth_year: number | string;
  phone: string;
  email?: string;
  group_level: string;
  status?: 'na_cekanju' | 'upisano' | 'arhivirano';
  notes?: string;
  created_at?: string;
}

export interface PitanjeImamu {
  id?: number | string;
  sender_name: string;
  sender_contact: string;
  question: string;
  answer?: string;
  is_published?: boolean;
  category?: string;
  created_at?: string;
  answered_at?: string;
}

export interface TextHutba {
  id?: number | string;
  title: string;
  date_str: string;
  category: string;
  summary: string;
  content: string;
  author?: string;
  created_at?: string;
}

export interface Aktivnost {
  id?: number | string;
  title: string;
  date_str: string;
  time_str?: string;
  location?: string;
  category: string;
  summary: string;
  description: string;
  is_active?: boolean;
  created_at?: string;
}

export interface NewsletterSubscriber {
  id?: number | string;
  email: string;
  name?: string;
  is_active?: boolean;
  created_at?: string;
}

// ============================================================================
// IN-MEMORY / LOCAL STORAGE FALLBACK PODACI
// ============================================================================

const LOCAL_STORAGE_KEYS = {
  MEKTEB: 'dzemat_vreoca_mekteb_prijave',
  PITANJA: 'dzemat_vreoca_pitanja',
  HUTBE: 'dzemat_vreoca_hutbe',
  AKTIVNOSTI: 'dzemat_vreoca_aktivnosti',
  NEWSLETTER: 'dzemat_vreoca_newsletter',
  ADMIN_AUTH: 'dzemat_vreoca_admin_auth',
};

const INITIAL_HUTBE: TextHutba[] = [
  {
    id: 1,
    title: 'Vrijednost zajedništva i džemata u islamu',
    date_str: '28.08.2026.',
    category: 'Zajedništvo',
    summary: 'O važnosti očuvanja sloge među komšijama, džematskog jedinstva i podršci onima u potrebi.',
    content: `Hvala Allahu, Gospodaru svih svjetova, Koji nas je stvorio u najljepšem obliku i Koji nas poziva na slogu i međusobno potpomaganje. 

Draga braćo u islamu, džemat je snaga svakog vjernika. Poslanik, s.a.v.s., je rekao: "Allahova ruka je nad džematom."

Kada smo okupljeni oko dobra, kada su naša srca čista i kada jedni drugima želimo ono što želimo i sami sebi, tada se na našu zajednicu spušta Božija milost i bereket. Čuvajmo naš džemat Vreoca, pomažimo se u dobru i budimo oslonac jedni drugima.`,
    author: 'Imam džemata Vreoca',
  },
  {
    id: 2,
    title: 'Odgoj djece u vremenu savremenih izazova',
    date_str: '21.08.2026.',
    category: 'Porodica i odgoj',
    summary: 'Uloga roditelja i mekteba u formiranju čestite i obrazovane omladine pod okriljem islamskih vrijednosti.',
    content: `U ime Allaha, Milostivog, Samilosnog.

Naša djeca su emanet koji nam je povjeren od Uzvišenog Stvoritelja. Najveći poklon koji roditelj može dati svom djetetu jeste lijep ahlak, korisno znanje i čvrsta vjera.

Mektebska pouka u našem džematu predstavlja temelj na kojem gradimo ličnost budućih generacija. Pozivam sve roditelje da upišu svoju djecu u mekteb i time osiguraju njihovu svijetlu duhovnu budućnost.`,
    author: 'Imam džemata Vreoca',
  },
  {
    id: 3,
    title: 'Snaga dove i strpljenja u iskušenjima',
    date_str: '14.08.2026.',
    category: 'Duhovnost',
    summary: 'Kako očuvati mir u srcu i čvrst oslonac na Allaha u trenucima životnih poteškoća.',
    content: `Hvala Allahu Koji čuje dove onih koji Ga mole.

Život na ovome svijetu satkan je od radosti i iskušenja. Vjernik u blagostanju zahvaljuje, a u poteškoći je strpljiv — i u oba slučaja je na dobitku. Dova je oružje vjernika i najiskreniji razgovor roba sa svojim Gospodarom.`,
    author: 'Imam džemata Vreoca',
  },
];

const INITIAL_PITANJA: PitanjeImamu[] = [
  {
    id: 1,
    sender_name: 'Džematlija',
    sender_contact: 'vreoca@medzlis-sarajevo.ba',
    question: 'Kako se naklanjavaju propušteni namazi iz opravdanih razloga (npr. san ili zaborav)?',
    answer: 'Propušteni namaz se treba naklanjati čim se čovjek sjeti ili nestane razlog zbog kojeg je namaz propušten. Naklanjava se samo farz namaz (osim sabahskog namaza gdje se istog dana do podneva naklanjavaju i sunnet i farz). Prilikom naklanjavanja donosi se nijet za onaj farz koji je propušten.',
    is_published: true,
    category: 'Namazi',
    created_at: '2026-08-25T10:00:00Z',
    answered_at: '2026-08-26T14:30:00Z',
  },
  {
    id: 2,
    sender_name: 'Roditelj',
    sender_contact: 'vreoca@medzlis-sarajevo.ba',
    question: 'Koja je preporučena dob za upis djeteta u mekteb i šta je potrebno od literature?',
    answer: 'Optimalna dob za upis u početni nivo mekteba je 6 ili 7 godina (polazak u školu). Svi polaznici u našem džematu Vreoca besplatno dobijaju udžbenike (ilmihal i sufaru) i školski pribor koji obezbjeđuje džemat. Prijavu možete popuniti online putem naše web stranice.',
    is_published: true,
    category: 'Mekteb',
    created_at: '2026-08-20T11:00:00Z',
    answered_at: '2026-08-21T09:15:00Z',
  },
  {
    id: 3,
    sender_name: 'Omladinac',
    sender_contact: 'vreoca@medzlis-sarajevo.ba',
    question: 'Kako postupiti ako zakasnimo na džuma-namaz i stignemo na drugi rekat?',
    answer: 'Ako klanjač stigne imamu makar i na ruku drugog rekata džuma-namaza (ili prije nego što imam preda selam), uhvatio je džumu. Nakon što imam preda selam, klanjač ustaje i samostalno doklanjava onaj dio koji je propustio.',
    is_published: true,
    category: 'Namazi',
    created_at: '2026-08-15T15:00:00Z',
    answered_at: '2026-08-16T12:00:00Z',
  },
];

const INITIAL_AKTIVNOSTI: Aktivnost[] = [
  {
    id: 1,
    title: 'Redovna džematska tribina i predavanje',
    date_str: 'Petak, 18. septembar 2026.',
    time_str: 'Poslije akšam-namaza',
    location: 'Divanhana džamije Vreoca',
    category: 'Edukacija',
    summary: 'Predavanje o jačanju vjerskog i moralnog integriteta porodice uz gostujućeg predavača.',
    description: 'Pozivamo sve džematlije, omladinu i komšije na redovnu džematsku tribinu. Nakon predavanja predviđeno je vrijeme za pitanja, diskusiju i bratsko druženje uz kahvu.',
    is_active: true,
  },
  {
    id: 2,
    title: 'Humanitarna akcija: Pomoć porodicama u potrebi',
    date_str: 'Subota, 26. septembar 2026.',
    time_str: '09:00 – 17:00 h',
    location: 'Džamija Vreoca',
    category: 'Humanitarno',
    summary: 'Prikupljanje osnovnih životnih namirnica i higijenskih paketa za socijalno ugrožene.',
    description: 'Mreža mladih i Odbor džemata Vreoca organizuju prikupljanje paketa pomoći. Svi koji žele donirati namirnice ili novčani prilog mogu se javiti u prostorije džamije.',
    is_active: true,
  },
  {
    id: 3,
    title: 'Druženje i halka Kur\'ana za omladinu',
    date_str: 'Svake nedjelje',
    time_str: '18:30 h',
    location: 'Mektebska učionica',
    category: 'Omladina',
    summary: 'Zajedničko učenje, tedžvid i razgovori o temama koje zanimaju mlade generacije.',
    description: 'Prostor otvoren za sve mlade koji žele unaprijediti svoje učenje Kur\'ana i provesti vrijeme u lijepom i korisnom društvu.',
    is_active: true,
  },
];

// Helperi za LocalStorage
function getLocal<T>(key: string, defaultVal: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setLocal<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

// ============================================================================
// SERVISNE FUNKCIJE
// ============================================================================

/**
 * 1. Slanje prijave za mekteb
 */
export async function submitMektebEnrollment(data: MektebPrijava): Promise<{ success: boolean; error?: string }> {
  try {
    if (supabase) {
      const { error } = await supabase.from('mekteb_prijave').insert([{
        parent_name: data.parent_name,
        child_name: data.child_name,
        birth_year: Number(data.birth_year),
        phone: data.phone,
        email: data.email || null,
        group_level: data.group_level,
        status: 'na_cekanju',
      }]);
      if (error) throw error;
    } else {
      const existing = getLocal<MektebPrijava[]>(LOCAL_STORAGE_KEYS.MEKTEB, []);
      const newEntry: MektebPrijava = {
        ...data,
        id: Date.now(),
        status: 'na_cekanju',
        created_at: new Date().toISOString(),
      };
      setLocal(LOCAL_STORAGE_KEYS.MEKTEB, [newEntry, ...existing]);
    }

    return { success: true };
  } catch (err: any) {
    console.error('Greška pri prijavi u mekteb:', err);
    return { success: false, error: err.message || 'Greška pri slanju prijave.' };
  }
}

/**
 * 2. Postavljanje pitanja imamu
 */
export async function submitQuestionToImam(data: {
  sender_name: string;
  sender_contact: string;
  question: string;
  category?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    if (supabase) {
      const { error } = await supabase.from('pitanja_imamu').insert([{
        sender_name: data.sender_name || 'Džematlija',
        sender_contact: data.sender_contact,
        question: data.question,
        category: data.category || 'Opće',
        is_published: false,
      }]);
      if (error) throw error;
    } else {
      const existing = getLocal<PitanjeImamu[]>(LOCAL_STORAGE_KEYS.PITANJA, INITIAL_PITANJA);
      const newEntry: PitanjeImamu = {
        id: Date.now(),
        sender_name: data.sender_name || 'Džematlija',
        sender_contact: data.sender_contact,
        question: data.question,
        category: data.category || 'Opće',
        is_published: false,
        created_at: new Date().toISOString(),
      };
      setLocal(LOCAL_STORAGE_KEYS.PITANJA, [newEntry, ...existing]);
    }

    return { success: true };
  } catch (err: any) {
    console.error('Greška pri postavljanju pitanja:', err);
    return { success: false, error: err.message || 'Greška pri postavljanju pitanja.' };
  }
}

/**
 * 3. Dohvatanje javnih objavljenih pitanja
 */
export async function getPublishedQuestions(): Promise<PitanjeImamu[]> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('pitanja_imamu')
        .select('*')
        .eq('is_published', true)
        .order('answered_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      const all = getLocal<PitanjeImamu[]>(LOCAL_STORAGE_KEYS.PITANJA, INITIAL_PITANJA);
      return all.filter((q) => q.is_published);
    }
  } catch (err) {
    return INITIAL_PITANJA.filter((q) => q.is_published);
  }
}

/**
 * 4. Dohvatanje svih pitanja za Admin Panel
 */
export async function getAllQuestionsForAdmin(): Promise<PitanjeImamu[]> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('pitanja_imamu')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      return getLocal<PitanjeImamu[]>(LOCAL_STORAGE_KEYS.PITANJA, INITIAL_PITANJA);
    }
  } catch (err) {
    return getLocal<PitanjeImamu[]>(LOCAL_STORAGE_KEYS.PITANJA, INITIAL_PITANJA);
  }
}

/**
 * 5. Odgovaranje na pitanje (Admin)
 */
export async function answerQuestion(
  id: number | string,
  answer: string,
  is_published: boolean,
  category?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const now = new Date().toISOString();
    if (supabase) {
      const { error } = await supabase
        .from('pitanja_imamu')
        .update({
          answer,
          is_published,
          category: category || 'Opće',
          answered_at: now,
        })
        .eq('id', id);
      if (error) throw error;
    } else {
      const all = getLocal<PitanjeImamu[]>(LOCAL_STORAGE_KEYS.PITANJA, INITIAL_PITANJA);
      const updated = all.map((q) =>
        q.id === id ? { ...q, answer, is_published, category: category || q.category, answered_at: now } : q
      );
      setLocal(LOCAL_STORAGE_KEYS.PITANJA, updated);
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * 6. Dohvatanje mekteb prijava (Admin)
 */
export async function getAllMektebPrijave(): Promise<MektebPrijava[]> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('mekteb_prijave')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      return getLocal<MektebPrijava[]>(LOCAL_STORAGE_KEYS.MEKTEB, []);
    }
  } catch (err) {
    return getLocal<MektebPrijava[]>(LOCAL_STORAGE_KEYS.MEKTEB, []);
  }
}

/**
 * 7. Promjena statusa mekteb prijave (Admin)
 */
export async function updateMektebStatus(
  id: number | string,
  status: 'na_cekanju' | 'upisano' | 'arhivirano',
  notes?: string
): Promise<{ success: boolean }> {
  try {
    if (supabase) {
      const updateData: any = { status };
      if (notes !== undefined) updateData.notes = notes;
      await supabase.from('mekteb_prijave').update(updateData).eq('id', id);
    } else {
      const all = getLocal<MektebPrijava[]>(LOCAL_STORAGE_KEYS.MEKTEB, []);
      const updated = all.map((p) => (p.id === id ? { ...p, status, notes: notes ?? p.notes } : p));
      setLocal(LOCAL_STORAGE_KEYS.MEKTEB, updated);
    }
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}

/**
 * 8. Export mekteb prijava u CSV
 */
export function exportMektebToCSV(prijave: MektebPrijava[]): void {
  const headers = 'ID,Ime djeteta,Godiste,Nivo mekteba,Ime roditelja,Telefon,Email,Status,Datum prijave\n';
  const rows = prijave
    .map((p) =>
      `"${p.id || ''}","${p.child_name}","${p.birth_year}","${p.group_level}","${p.parent_name}","${p.phone}","${p.email || ''}","${p.status || 'na_cekanju'}","${p.created_at || ''}"`
    )
    .join('\n');

  const blob = new Blob(['\uFEFF' + headers + rows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Mekteb_Prijave_Vreoca_${new Date().getFullYear()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 9. Dohvatanje tekstualnih hutbi
 */
export async function getHutbe(): Promise<TextHutba[]> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('hutbe')
        .select('*')
        .order('id', { ascending: false });
      if (error) throw error;
      return data && data.length > 0 ? data : INITIAL_HUTBE;
    } else {
      return getLocal<TextHutba[]>(LOCAL_STORAGE_KEYS.HUTBE, INITIAL_HUTBE);
    }
  } catch {
    return INITIAL_HUTBE;
  }
}

/**
 * 10. Dodavanje nove tekstualne hutbe (Admin)
 */
export async function createHutba(data: TextHutba): Promise<{ success: boolean; error?: string }> {
  try {
    if (supabase) {
      const { error } = await supabase.from('hutbe').insert([{
        title: data.title,
        date_str: data.date_str,
        category: data.category,
        summary: data.summary,
        content: data.content,
        author: data.author || 'Imam džemata Vreoca',
      }]);
      if (error) throw error;
    } else {
      const all = getLocal<TextHutba[]>(LOCAL_STORAGE_KEYS.HUTBE, INITIAL_HUTBE);
      const newHutba: TextHutba = {
        ...data,
        id: Date.now(),
        created_at: new Date().toISOString(),
      };
      setLocal(LOCAL_STORAGE_KEYS.HUTBE, [newHutba, ...all]);
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * 11. Brisanje hutbe (Admin)
 */
export async function deleteHutba(id: number | string): Promise<{ success: boolean }> {
  try {
    if (supabase) {
      await supabase.from('hutbe').delete().eq('id', id);
    } else {
      const all = getLocal<TextHutba[]>(LOCAL_STORAGE_KEYS.HUTBE, INITIAL_HUTBE);
      setLocal(LOCAL_STORAGE_KEYS.HUTBE, all.filter((h) => h.id !== id));
    }
    return { success: true };
  } catch {
    return { success: false };
  }
}

/**
 * 12. Dohvatanje Aktivnosti
 */
export async function getActivities(): Promise<Aktivnost[]> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('aktivnosti')
        .select('*')
        .eq('is_active', true)
        .order('id', { ascending: false });
      if (error) throw error;
      return data && data.length > 0 ? data : INITIAL_AKTIVNOSTI;
    } else {
      return getLocal<Aktivnost[]>(LOCAL_STORAGE_KEYS.AKTIVNOSTI, INITIAL_AKTIVNOSTI);
    }
  } catch {
    return INITIAL_AKTIVNOSTI;
  }
}

/**
 * 13. Dodavanje nove Aktivnosti (Admin)
 */
export async function createActivity(data: Aktivnost): Promise<{ success: boolean; error?: string }> {
  try {
    if (supabase) {
      const { error } = await supabase.from('aktivnosti').insert([{
        title: data.title,
        date_str: data.date_str,
        time_str: data.time_str || null,
        location: data.location || 'Džamija Vreoca',
        category: data.category || 'Džemat',
        summary: data.summary,
        description: data.description,
        is_active: true,
      }]);
      if (error) throw error;
    } else {
      const all = getLocal<Aktivnost[]>(LOCAL_STORAGE_KEYS.AKTIVNOSTI, INITIAL_AKTIVNOSTI);
      const newAct: Aktivnost = {
        ...data,
        id: Date.now(),
        is_active: true,
        created_at: new Date().toISOString(),
      };
      setLocal(LOCAL_STORAGE_KEYS.AKTIVNOSTI, [newAct, ...all]);
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * 14. Brisanje Aktivnosti (Admin)
 */
export async function deleteActivity(id: number | string): Promise<{ success: boolean }> {
  try {
    if (supabase) {
      await supabase.from('aktivnosti').delete().eq('id', id);
    } else {
      const all = getLocal<Aktivnost[]>(LOCAL_STORAGE_KEYS.AKTIVNOSTI, INITIAL_AKTIVNOSTI);
      setLocal(LOCAL_STORAGE_KEYS.AKTIVNOSTI, all.filter((a) => a.id !== id));
    }
    return { success: true };
  } catch {
    return { success: false };
  }
}

/**
 * 15. Pretplata na Newsletter / Obavijesti
 */
export async function subscribeNewsletter(email: string, name?: string): Promise<{ success: boolean; message?: string }> {
  try {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: 'Unesite ispravnu email adresu.' };
    }

    if (supabase) {
      const { error } = await supabase.from('newsletter_pretplatnici').insert([{
        email: cleanEmail,
        name: name?.trim() || null,
        is_active: true,
      }]);
      if (error) {
        if (error.code === '23505') {
          return { success: true, message: 'Već ste prijavljeni na obavijesti džemata Vreoca.' };
        }
        throw error;
      }
    } else {
      const all = getLocal<NewsletterSubscriber[]>(LOCAL_STORAGE_KEYS.NEWSLETTER, []);
      if (all.some((s) => s.email.toLowerCase() === cleanEmail)) {
        return { success: true, message: 'Već ste prijavljeni na obavijesti džemata Vreoca.' };
      }
      const newSub: NewsletterSubscriber = {
        id: Date.now(),
        email: cleanEmail,
        name: name?.trim() || '',
        is_active: true,
        created_at: new Date().toISOString(),
      };
      setLocal(LOCAL_STORAGE_KEYS.NEWSLETTER, [newSub, ...all]);
    }
    return { success: true, message: 'Uspješno ste se prijavili za obavijesti džemata Vreoca!' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Greška pri prijavi na obavijesti.' };
  }
}

/**
 * 16. Dohvatanje pretplatnika (Admin)
 */
export async function getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('newsletter_pretplatnici')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      return getLocal<NewsletterSubscriber[]>(LOCAL_STORAGE_KEYS.NEWSLETTER, []);
    }
  } catch {
    return getLocal<NewsletterSubscriber[]>(LOCAL_STORAGE_KEYS.NEWSLETTER, []);
  }
}

/**
 * 17. Brisanje pretplatnika (Admin)
 */
export async function deleteNewsletterSubscriber(id: number | string): Promise<{ success: boolean }> {
  try {
    if (supabase) {
      await supabase.from('newsletter_pretplatnici').delete().eq('id', id);
    } else {
      const all = getLocal<NewsletterSubscriber[]>(LOCAL_STORAGE_KEYS.NEWSLETTER, []);
      setLocal(LOCAL_STORAGE_KEYS.NEWSLETTER, all.filter((s) => s.id !== id));
    }
    return { success: true };
  } catch {
    return { success: false };
  }
}

/**
 * 18. Admin autentifikacija
 */
const DEFAULT_ADMIN_PASS = 'vreoca2026';

export function verifyAdminPassword(password: string): boolean {
  const envPass = env.VITE_ADMIN_PASSWORD;
  const target = envPass || DEFAULT_ADMIN_PASS;
  const isMatch = password === target;
  if (isMatch) {
    try {
      sessionStorage.setItem(LOCAL_STORAGE_KEYS.ADMIN_AUTH, 'true');
    } catch {}
  }
  return isMatch;
}

export function isUserAdminLoggedIn(): boolean {
  try {
    return sessionStorage.getItem(LOCAL_STORAGE_KEYS.ADMIN_AUTH) === 'true';
  } catch {
    return false;
  }
}

export function adminLogout(): void {
  try {
    sessionStorage.removeItem(LOCAL_STORAGE_KEYS.ADMIN_AUTH);
  } catch {}
}
