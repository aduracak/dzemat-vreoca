export interface PrayerTime {
  id: string;
  name: string;
  arabicName: string;
  time: string;
  isNext?: boolean;
  isCurrent?: boolean;
  description: string;
}

export interface DayPrayerTimes {
  date: string;
  hijriDate: string;
  gregorianDateStr: string;
  prayers: {
    zora: string;
    izlazak: string;
    podne: string;
    ikindija: string;
    aksam: string;
    jacija: string;
  };
}

export interface Hutba {
  id: string;
  title: string;
  summary: string;
  content: string;
  khatib: string;
  date: string;
  hijriDate: string;
  category: 'Ahlak' | 'Porodica' | 'Zajednica' | 'Ramazan' | 'Omladina' | 'Znanje';
  durationMinutes: number;
  audioUrl?: string;
  tags: string[];
}

export interface DonationTier {
  id: string;
  amount: number;
  label: string;
  description: string;
  recommended?: boolean;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image?: string;
  time: string;
  location: string;
}
