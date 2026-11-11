# Brief-Evaluation — plan rozwoju pomysłów HAP

**Status:** PLAN / do zatwierdzenia przed implementacją.  
**Repozytorium:** `Scripterix/33_HAP`.  
**Cel:** osobny, kontrolowany przez człowieka proces ewaluacji i rozwoju już opublikowanych pomysłów.

## 1. Rozdzielenie procesów

- **Publikacja:** Sen Iskry → Writer → Pomysł → prezentacja w Astro. Nie wymaga ewaluacji jako projektu.
- **Rozwój (opcjonalny):** człowiek wybiera pomysł → AI przygotowuje analizę → człowiek ocenia i podejmuje decyzję → ewentualny eksperyment/prototyp.
- Nie modyfikuj źródłowego snu ani artykułu Writera. Ewaluacja jest osobnym rekordem połączonym przez stabilne `ideaId`.
- Nie uruchamiaj automatycznie zleceń, wydatków, commitów, publikacji ani implementacji prototypów na podstawie samej oceny modelu.

## 2. Stan istniejącej implementacji — wykorzystać, nie zastępować

Zweryfikowany w repo:
- `data/materials.json`: stabilne `materialId`, relacje pomysł–sen.
- `ewaluacje-md/`: katalog na oddzielne pliki Markdown z frontmatter `evaluationId`, `ideaId`, `status`.
- `src/lib/evaluation-validation.mjs`: statusy `Nowy`, `Inkubacja`, `Do ewaluacji`, `Do eksperymentu`, `Prototyp`, `Odrzucony`, walidacja powiązań i pojedynczej aktywnej ewaluacji.
- `src/pages/pomysly/[id]/ewaluacja.astro`: widok problemu, odbiorcy, dowodów, założeń, hipotez, wartości, ryzyk, kosztu i najmniejszego eksperymentu.
- `src/lib/project-stats.mjs`: licznik ewaluacji/eksperymentów/prototypów.

Najpierw sprawdzić aktualny lokalny stan, `AGENTS.md`, `SESSION_HANDOFF.md` i niezakończony `Brief-Works.md`. Nie mieszać zakresów bez decyzji użytkownika.

## 3. Co powinna oceniać ewaluacja

Dla konkretnego pomysłu, nie dla snu jako literatury:
1. **Problem i odbiorca:** komu i w czym pomaga? Czy jest to rzeczywisty problem czy wyłącznie inspirująca hipoteza?
2. **Wartość / monetyzacja:** oszczędność czasu i kosztów, poprawa jakości, potencjał społeczny, możliwość sprzedaży. Brak dowodu popytu oznaczać jako hipotezę.
3. **Oryginalność i podobne rozwiązania:** co jest nowe, co już istnieje? Bez aktualnego researchu nie stwierdzać, że pomysł jest unikatowy.
4. **Wykonalność:** dostępne technologie, dane, umiejętności, zależności, nakład pracy pojedynczego programisty.
5. **Ryzyka:** prywatność, bezpieczeństwo, etyka, niezamierzone skutki, koszty utrzymania; dla danych prywatnych preferować lokalne przetwarzanie.
6. **Czas i odwracalność:** czy trzeba czekać na technologię (Latarnia), czy trzeba działać wcześniej, by nie utracić możliwości rozwiązania problemu? Sygnały zmiany, ewentualny termin i stopień niepewności.
7. **Połączenia z innymi ideami:** jawnie wskazać potencjalne relacje z innymi pomysłami HAP (np. Latarnia + Godzina + Miasto pod guzikiem); oddzielić analogię od praktycznej synergii.
8. **Minimalny eksperyment:** co można zbadać najmniejszym kosztem, przy jakich danych wejściowych, z jakim mierzalnym wynikiem i kryterium przerwania?

Wynik ma jawnie oddzielać **fakty / przesłanki / hipotezy / szacunki**. Punktowe oceny są pomocnicze, nie przesądzają o decyzji. Nie wymyślać źródeł, kosztów ani terminów.

## 4. Minimalny rezultat i decyzje

Każdy rekord ewaluacji powinien zawierać:
- tytuł i `ideaId` (+ `evaluationId`, status), datę oceny, jeśli rzeczywista;
- krótką syntezę: główna wartość, przeszkoda, najbliższy sensowny krok;
- ocenę według punktów z sekcji 3, z niepewnościami;
- hipotezy wymagające sprawdzenia;
- najmniejszy eksperyment, kryterium powodzenia i przerwania;
- propozycję: **rozwijaj / obserwuj / odłóż / odrzuć** i uzasadnienie;
- **decyzję człowieka** jako osobne pole (brak decyzji ≠ zatwierdzenie).

Uwaga: istniejący enum `status` jest odrębny od proponowanej decyzji i nie powinien być automatycznie nadpisywany przez model. Zachować dotychczasowe statusy; rozszerzenie schematu tylko w razie wykazanej potrzeby.

## 5. MVP wdrożenia — mała iteracja

**Etap A — ręczne ewaluacje (pierwszy zakres implementacji)**
- Dodać jeden przykładowy rekord ewaluacji Markdown dla wybranego pomysłu — najlepiej **„Godzina, której nikt nie przeżył”** albo **„Latarnia — strona jutra”**, ale **wybór i zapis faktycznej decyzji użytkownika pozostają do zatwierdzenia**.
- Jeśli potrzebne: uzupełnić walidację frontmatter i widok ewaluacji, opierając się na istniejących polach (bez rozbudowanego dashboardu i backendu).
- Na stronie pomysłu pokazywać link do ewaluacji tylko gdy taka ewaluacja istnieje; brak oceny nie blokuje publikacji.
- Ewaluacja ma być czytelna, powiązana z pomysłem i snem. Zachować neutralny język publikacji.

**Etap B — Evaluator jako osobna komenda CLI (po ocenie etapu A)**
- Zaproponować `npm run evaluate -- <idea-slug>` jako tryb generowania **propozycji ewaluacji**, a nie automatycznej decyzji.
- Wykorzystać obecny `src/openai.mjs` / Responses API, konfigurację promptu w `config/` oraz istniejący mechanizm raportowania usage/kosztów, jeśli da się to zrobić bez naruszania dotychczasowych danych.
- Generować nowy rekord ostrożnie, z osobnym statusem roboczym lub bez finalnego zatwierdzenia; nigdy nie zastępować istniejącej ewaluacji bez zgody.
- Używać atomowych zapisów i walidować `ideaId` / `evaluationId`; nie dopuszczać do przypadkowego tworzenia wielu aktywnych ewaluacji dla jednego pomysłu.
- Brak researchu web/API = wyraźnie oznaczona analiza wewnętrzna, nie weryfikacja rynku.

**Etap C — loop ponownej ewaluacji (PÓŹNIEJ, nie teraz)**
- Zapisywać warunki ponownej oceny, np. nowa biblioteka, tańszy hardware, zmiana prawa, ryzyko utraty plików/formatu.
- Porównywać nowe ustalenia z poprzednimi bez niszczenia historii.
- Ewentualne komentarze społeczności i relacje między pomysłami rozpatrzyć osobno; bez bazy danych i automatycznego monitoringu na tym etapie.

## 6. Pierwsze przykłady do rozmowy, nie automatycznego wdrożenia

- **Godzina, której nikt nie przeżył → History Engine / Microda:** analizować 20-letnie archiwum cyfrowe tak, by nie usuwać wartościowych różnic między podobnymi plikami. Pierwszy eksperyment wyłącznie lokalny i tylko do odczytu, ze spisem, hashami, relacjami i zachowaniem oryginałów.
- **Latarnia — strona jutra:** dwa typy warunków: (1) pomysł czeka na pojawienie się możliwości technicznych, (2) problem grozi utratą odwracalności i wymaga zabezpieczenia już teraz.
- **Drzwi, które pojawiły się po przejściu:** opakowywanie faktycznie rozwiązanych błędów i testów w powtarzalne usługi; sprawdzić popyt przed budową marketplace'u.
- **Powiązania:** Godzina + Latarnia + Miasto pod guzikiem to możliwy wspólny mechanizm ochrony, ponownego odkrywania i przekazywania wiedzy. To hipoteza do ewaluacji, nie założenie architektoniczne.

## 7. Warunki akceptacji i granice

- Podstawowy flow Sen → Pomysł → Publikacja działa niezależnie od obecności ewaluacji.
- Pojedyncza ewaluacja daje się powiązać przez prawidłowy `ideaId`, obejrzeć w Astro i zweryfikować przez istniejące kontrole.
- Nie dochodzi do edycji snów ani artykułów, nie są wymyślane dane z badań rynku, a AI nie zatwierdza decyzji w imieniu użytkownika.
- Etap A nie wprowadza nowego frameworka, bazy danych, panelu admina, automatycznych działań w tle ani komentarzy.
- Po każdej implementacji: `npm test`, `npm run check`, `npm run build`; jeśli testy nie istnieją lub nie dają się uruchomić, zapisać to jawnie.
- Odnotować realny stan w `SESSION_HANDOFF.md`. **Nie wykonywać push ani wdrożenia bez zgody użytkownika.**

## Zadanie dla Codexa TERAZ

**Najpierw zaproponuj minimalną implementację Etapu A**, wskazując faktycznie potrzebne pliki i wszelkie konflikty z istniejącym kodem. Nie implementuj Etapu B ani C bez następnego polecenia. Zachowaj wcześniejsze zadania z `Brief-Works.md` i `SESSION_HANDOFF.md` jako odrębne zakresy.
