# DATABASE - Šema baze podataka (SQLite)

## Tabele

### 1. `mekteb_prijave`
| Polje | Tip | Opis |
|---|---|---|
| `id` | INTEGER PRIMARY KEY AUTOINCREMENT | ID prijave |
| `parent_name` | TEXT NOT NULL | Ime i prezime roditelja |
| `child_name` | TEXT NOT NULL | Ime i prezime djeteta |
| `birth_year` | INTEGER NOT NULL | Godište djeteta |
| `phone` | TEXT NOT NULL | Telefon roditelja |
| `email` | TEXT | Email roditelja (opciono) |
| `group_level` | TEXT NOT NULL | Nivo mekteba (I, II, III) |
| `status` | TEXT DEFAULT 'na_cekanju' | 'na_cekanju', 'prihvaceno', 'arhivirano' |
| `notes` | TEXT | Bilješke imama |
| `created_at` | DATETIME DEFAULT CURRENT_TIMESTAMP | Datum i vrijeme prijave |

### 2. `pitanja_imamu`
| Polje | Tip | Opis |
|---|---|---|
| `id` | INTEGER PRIMARY KEY AUTOINCREMENT | ID pitanja |
| `sender_name` | TEXT NOT NULL | Ime pošiljaoca (ili Anonimno) |
| `sender_contact` | TEXT NOT NULL | Email ili telefon |
| `question` | TEXT NOT NULL | Tekst pitanja |
| `answer` | TEXT | Odgovor imama |
| `is_published` | INTEGER DEFAULT 0 | 1 = javno prikazano na sajtu, 0 = privatno |
| `category` | TEXT DEFAULT 'Opće' | Kategorija pitanja (Namazi, Post, Porodica, Ahlak) |
| `answered_at` | DATETIME | Vrijeme kad je odgovoreno |
| `created_at` | DATETIME DEFAULT CURRENT_TIMESTAMP | Vrijeme postavljanja |

### 3. `hutbe`
| Polje | Tip | Opis |
|---|---|---|
| `id` | INTEGER PRIMARY KEY AUTOINCREMENT | ID hutbe |
| `title` | TEXT NOT NULL | Naslov hutbe |
| `date_str` | TEXT NOT NULL | Datum hutbe (npr. "04.09.2026.") |
| `category` | TEXT NOT NULL | Tema (Ahlak, Porodica, Zajedništvo...) |
| `summary` | TEXT NOT NULL | Kratak sažetak |
| `content` | TEXT NOT NULL | Puni tekst hutbe |
| `author` | TEXT DEFAULT 'Imam džemata Vreoca' | Autor |
| `created_at` | DATETIME DEFAULT CURRENT_TIMESTAMP | Vrijeme unosa |

### 4. `admin_users`
| Polje | Tip | Opis |
|---|---|---|
| `id` | INTEGER PRIMARY KEY AUTOINCREMENT | ID korisnika |
| `username` | TEXT UNIQUE NOT NULL | Korisničko ime za imama |
| `password_hash` | TEXT NOT NULL | Hashirana lozinka (bcrypt) |
| `created_at` | DATETIME DEFAULT CURRENT_TIMESTAMP | Vrijeme kreiranja |
