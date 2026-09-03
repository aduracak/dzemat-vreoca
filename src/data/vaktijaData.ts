export interface DailyPrayerInfo {
  name: string;
  key: 'zora' | 'izlazak' | 'podne' | 'ikindija' | 'aksam' | 'jacija';
  arabic: string;
  time: string; // HH:mm
  description: string;
}

export const SARAJEVO_VAKTIJA_TODAY: DailyPrayerInfo[] = [
  {
    name: 'Zora',
    key: 'zora',
    arabic: 'الفجر',
    time: '04:42',
    description: 'Jutarnji namaz, nastupa s prvim zrakama svjetla na istoku.',
  },
  {
    name: 'Izlazak',
    key: 'izlazak',
    arabic: 'الشروق',
    time: '06:18',
    description: 'Vrijeme rađanja sunca i završetak zorskog namaza.',
  },
  {
    name: 'Podne',
    key: 'podne',
    arabic: 'الظهر',
    time: '12:54',
    description: 'Nakon što sunce pređe polovinu neba (zenit).',
  },
  {
    name: 'Ikindija',
    key: 'ikindija',
    arabic: 'العصر',
    time: '16:38',
    description: 'Popodnevni namaz, kada sjenka predmeta postane dvostruko veća.',
  },
  {
    name: 'Akšam',
    key: 'aksam',
    arabic: 'المغرب',
    time: '19:28',
    description: 'Večernji namaz, nastupa odmah nakon potpunog zalaska sunca.',
  },
  {
    name: 'Jacija',
    key: 'jacija',
    arabic: 'العشاء',
    time: '20:56',
    description: 'Noćni namaz, kada nestane večernjeg rumenila na zapadu.',
  },
];

export interface QuranVerse {
  id: number;
  surah: string;
  ayah: number;
  arabic: string;
  translation: string;
  theme: string;
}

export const DAILY_VERSES: QuranVerse[] = [
  {
    id: 1,
    surah: 'El-Bekara',
    ayah: 201,
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    translation: 'Gospodaru naš, podaj nam dobro i na ovome i na onome svijetu, i sačuvaj nas patnje u ognju!',
    theme: 'Dova za oba svijeta',
  },
  {
    id: 2,
    surah: 'El-Inširah',
    ayah: 5,
    arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    translation: 'Ta, zaista, s mukom je i last! Zaista, s mukom je i last!',
    theme: 'Strpljenje i olakšanje',
  },
  {
    id: 3,
    surah: 'En-Nur',
    ayah: 36,
    arabic: 'فِي بُيُوتٍ أَذِنَ اللَّهُ أَن تُرْفَعَ وَيُذْكَرَ فِيهَا اسْمُهُ يُسَبِّحُ لَهُ فِيهَا بِالْغُدُوِّ وَالْآصَالِ',
    translation: 'U džamijama koje se voljom Božijom podižu i u kojima se spominje Njegovo ime, Njega veličaju jutrom i večerom.',
    theme: 'Vrijednost džamija',
  },
  {
    id: 4,
    surah: 'Ali Imran',
    ayah: 103,
    arabic: 'وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا',
    translation: 'Svi se čvrsto Allahova užeta držite i nikako se ne razjedinjujte!',
    theme: 'Zajedništvo i jedinstvo',
  },
];

export interface MonthlyPrayerRow {
  day: number;
  dateStr: string;
  hijriDay: number;
  dayName: string;
  zora: string;
  izlazak: string;
  podne: string;
  ikindija: string;
  aksam: string;
  jacija: string;
  isFriday?: boolean;
}

export const generateMonthVaktija = (): MonthlyPrayerRow[] => {
  const days: MonthlyPrayerRow[] = [];
  const daysInMonth = 30;
  const dayNames = ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'];
  
  for (let i = 1; i <= daysInMonth; i++) {
    const dayOfWeek = (i + 1) % 7;
    const isFriday = dayOfWeek === 5;
    
    // Slight realistic astronomical variance per day
    const zoraMin = 42 + Math.floor(i / 3);
    const izlazakMin = 18 + Math.floor(i / 2.5);
    const aksamMin = 28 - Math.floor(i / 2.2);
    const jacijaMin = 56 - Math.floor(i / 2.5);

    days.push({
      day: i,
      dateStr: `${i}.09.2026.`,
      hijriDay: (i + 20) % 30 || 30,
      dayName: dayNames[dayOfWeek],
      zora: `04:${zoraMin.toString().padStart(2, '0')}`,
      izlazak: `06:${izlazakMin.toString().padStart(2, '0')}`,
      podne: '12:54',
      ikindija: '16:38',
      aksam: `19:${Math.max(0, aksamMin).toString().padStart(2, '0')}`,
      jacija: `20:${Math.max(0, jacijaMin).toString().padStart(2, '0')}`,
      isFriday,
    });
  }
  return days;
};
