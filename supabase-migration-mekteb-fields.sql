-- ====================================================================
-- MIGRACIJA: Proširenje tabele mekteb_prijave
-- Pokrenite ovaj SQL u Supabase SQL Editoru (Ctrl+A, pa kliknite RUN)
-- ====================================================================

-- Dodaj kolonu za ime oca (kopira staru parent_name vrijednost za postojeće zapise)
ALTER TABLE mekteb_prijave ADD COLUMN IF NOT EXISTS parent_name_father TEXT;
ALTER TABLE mekteb_prijave ADD COLUMN IF NOT EXISTS parent_name_mother TEXT;
ALTER TABLE mekteb_prijave ADD COLUMN IF NOT EXISTS school_grade TEXT;
ALTER TABLE mekteb_prijave ADD COLUMN IF NOT EXISTS school_name TEXT;

-- Za postojeće zapise: kopiraj staru parent_name u parent_name_father
UPDATE mekteb_prijave 
SET parent_name_father = parent_name 
WHERE parent_name_father IS NULL AND parent_name IS NOT NULL;

-- Postavi default vrijednost za parent_name_mother za stare zapise
UPDATE mekteb_prijave 
SET parent_name_mother = '(nije uneseno)' 
WHERE parent_name_mother IS NULL;

-- Sada postavi NOT NULL constraint na nova polja
ALTER TABLE mekteb_prijave ALTER COLUMN parent_name_father SET NOT NULL;
ALTER TABLE mekteb_prijave ALTER COLUMN parent_name_mother SET NOT NULL;

-- Ukloni NOT NULL sa starog parent_name polja (legacy)
ALTER TABLE mekteb_prijave ALTER COLUMN parent_name DROP NOT NULL;
