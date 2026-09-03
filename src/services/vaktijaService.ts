/**
 * vaktija.ba API Service za Sarajevo & Ilidžu (Location ID: 77)
 * Zvanična vaktija Rijaseta Islamske zajednice u BiH
 */

export interface VaktijaResponse {
  id: number;
  lokacija: string;
  datum: string[];
  vakat: string[]; // [Zora, Izlazak, Podne, Ikindija, Aksam, Jacija]
}

export interface MonthlyVaktijaResponse {
  id: number;
  lokacija: string;
  godina: number;
  mjesec: number;
  dan: Array<{
    vakat: string[];
  }>;
}

export interface PrayerItem {
  key: 'zora' | 'izlazak' | 'podne' | 'ikindija' | 'aksam' | 'jacija';
  name: string;
  arabic: string;
  time: string;
  description: string;
}

export const PRAYER_NAMES = [
  { key: 'zora' as const, name: 'Zora', arabic: 'الفجر', description: 'Jutarnji namaz, nastupa s prvim zrakama svjetla na istoku.' },
  { key: 'izlazak' as const, name: 'Izlazak sunca', arabic: 'الشروق', description: 'Vrijeme rađanja sunca i kraj zorskog vakta.' },
  { key: 'podne' as const, name: 'Podne', arabic: 'الظهر', description: 'Nakon što sunce pređe zenit (petkom džuma namaz).' },
  { key: 'ikindija' as const, name: 'Ikindija', arabic: 'العصر', description: 'Popodnevni namaz, kada sjenka predmeta postane dvostruko veća.' },
  { key: 'aksam' as const, name: 'Akšam', arabic: 'المغرب', description: 'Večernji namaz, nastupa odmah nakon zalaska sunca.' },
  { key: 'jacija' as const, name: 'Jacija', arabic: 'العشاء', description: 'Noćni namaz, kada nestane večernjeg rumenila na zapadu.' },
];

export const FALLBACK_VAKTIJA: string[] = ['04:30', '06:04', '12:47', '16:26', '19:26', '20:49'];

const SARAJEVO_LOCATION_ID = 77;

/**
 * Fetch today's prayer times for Sarajevo & Ilidža directly from vaktija.ba
 */
export async function fetchTodayVaktija(): Promise<{
  times: PrayerItem[];
  dateStr: string;
  rawTimes: string[];
  isLive: boolean;
}> {
  try {
    const res = await fetch(`https://api.vaktija.ba/vaktija/v1/${SARAJEVO_LOCATION_ID}`);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const data: VaktijaResponse = await res.json();

    const rawTimes = data.vakat && data.vakat.length === 6 ? data.vakat : FALLBACK_VAKTIJA;
    const dateStr = data.datum && data.datum[1] ? data.datum[1] : new Date().toLocaleDateString('bs-BA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    const times: PrayerItem[] = PRAYER_NAMES.map((p, idx) => ({
      ...p,
      time: rawTimes[idx] || FALLBACK_VAKTIJA[idx],
    }));

    return { times, dateStr, rawTimes, isLive: true };
  } catch (error) {
    console.warn('vaktija.ba API nedostupan, koristim fallback:', error);
    const times: PrayerItem[] = PRAYER_NAMES.map((p, idx) => ({
      ...p,
      time: FALLBACK_VAKTIJA[idx],
    }));
    return {
      times,
      dateStr: new Date().toLocaleDateString('bs-BA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
      rawTimes: FALLBACK_VAKTIJA,
      isLive: false,
    };
  }
}

/**
 * Fetch full month takvim for current year & month from vaktija.ba
 */
export async function fetchMonthlyTakvim(year?: number, month?: number) {
  const now = new Date();
  const y = year || now.getFullYear();
  const m = month || (now.getMonth() + 1);

  try {
    const res = await fetch(`https://api.vaktija.ba/vaktija/v1/${SARAJEVO_LOCATION_ID}/${y}/${m}`);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const data: MonthlyVaktijaResponse = await res.json();

    const dayNames = ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'];
    
    return data.dan.map((item, index) => {
      const dayNum = index + 1;
      const dateObj = new Date(y, m - 1, dayNum);
      const dayOfWeek = dateObj.getDay();
      const isFriday = dayOfWeek === 5;

      return {
        day: dayNum,
        dateStr: `${dayNum}.${m.toString().padStart(2, '0')}.${y}.`,
        dayName: dayNames[dayOfWeek],
        isFriday,
        zora: item.vakat[0],
        izlazak: item.vakat[1],
        podne: item.vakat[2],
        ikindija: item.vakat[3],
        aksam: item.vakat[4],
        jacija: item.vakat[5],
      };
    });
  } catch (error) {
    console.warn('Greška pri dohvatanju mjesečnog takvima:', error);
    return null;
  }
}
