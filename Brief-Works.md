# Brief-Works — 33_HAP

**Status:** TODO — brief dla Codexa. Nie jest potwierdzeniem wykonania zmian.  
**Zakres:** nazwa projektu, publiczna prezentacja pomysłów i dokumentacja.  
**Zasada główna:** **Sen → Pomysł → Publikacja**. Dopiero **osobno**, po lekturze i decyzji człowieka: **ewaluacja → eksperyment → ewentualny projekt**.

## 1. Nazwa i przekaz

- Ujednolić rozwinięcie skrótu HAP do **Human-AI Publishing**.
- Zastąpić wystąpienia `Human-Sourced Autonomous Publishing` i `Human Autonomous Publishing` w widokach, opisach i dokumentacji.
- Zachować skrót **HAP** i nazwy rozpoznawalnych sekcji: **Sny Iskry** oraz **Pomysły ze snów**.
- Nie sugerować, że system sam autonomicznie decyduje o realizacji projektów. Odrębna ewaluacja nadal zależy od człowieka.
- Zmiana nazwy nie wymaga zmiany identyfikatorów materiałów, URL-i ani katalogów.

## 2. Publikacja pomysłów a status DRAFT

- Traktować gotową interpretację Writera jako materiał do publicznej sekcji **Pomysły ze snów**, a nie automatycznie „prywatny szkic oczekujący na publikację”.
- W publicznym interfejsie zastąpić etykiety `wersja robocza`, `szkic Writera`, `materiały robocze wymagają akceptacji przed publikacją` neutralnymi określeniami, np. **Interpretacja Writera**, **Pomysł ze snu**.
- W README i `automatyzacje-md/README.md` usunąć przestarzałe stwierdzenia o niepublikowanych szkicach. Wprost rozdzielić **publikację interpretacji** od **wyboru pomysłu do ewaluacji i projektu**.
- W `src/cli.mjs` przestać dodawać do **nowo generowanych** artykułów komentarz `<!-- STATUS: DRAFT; ... wymaga akceptacji człowieka -->`. Zachować informację o źródłowym śnie oraz istniejące mechanizmy rejestru, sidecarów i kosztów.
- Nie usuwać mechanicznie wszystkich słów `DRAFT` w projekcie: najpierw ustalić ich rolę. Status ewaluacji, ewentualny etap redakcyjny i historyczne metadane mogą znaczyć coś innego.
- Nie zmieniać automatycznie treści istniejących 11 artykułów tylko po to, by usuwać ukryte komentarze. Jeśli komentarze wpływają na publiczny render lub metryki, zaproponować najmniejszą bezpieczną korektę warstwy prezentacji.

## 3. README — stan faktyczny

- Zmienić nagłówek `034 HAP` i dawny opis na **33_HAP — Human-AI Publishing** (numer repozytorium, nie numer wersji aplikacji).
- Opisać dwa publiczne strumienie: oryginalne sny i interpretacje/pomysły Writera oraz odrębny, opcjonalny proces ewaluacji.
- Uaktualnić opis `src/pages/`: Astro prezentuje zarówno sny, jak i pomysły, wraz z linkami między nimi.
- Stan referencyjny po ostatnim lokalnym sprawdzeniu: **11 snów, 11 pomysłów, 26 stron**. Jeśli liczby zmieniły się, podać aktualne lub zrezygnować ze sztywnych liczb.
- GitHub już działa: `https://github.com/Scripterix/33_HAP`. Cloudflare Pages nie ogłaszać jako uruchomionego bez potwierdzenia.
- Zachować instrukcję `.env.example` → `.env`, sposób uruchamiania Writera i informację, że kluczy API nie publikuje się.
- Zweryfikować nieaktualne wzmianki o pierwszym teście `gpt-4o-mini` i wersji procesu; obecne eksperymenty obejmują GPT-5 mini. Nie wymyślać niepotwierdzonych danych.

## 4. Miejsca do sprawdzenia (na podstawie snapshotu GitHub)

- `README.md` — nazwa, architektura, opis materiałów, faktyczny stan.
- `src/pages/index.astro` — eyebrow z `Human-Sourced Autonomous Publishing`.
- `src/pages/pomysly/index.astro` — `Interpretacja · wersja robocza` i stopka o wymaganej akceptacji.
- `src/pages/pomysly/[id].astro` — `Pomysł ze snu · szkic Writera`.
- `src/pages/o-projekcie.astro` — spójne rozdzielenie publikacji od przyszłej ewaluacji; nie usuwać przydatnego opisu etapów i statystyk.
- `automatyzacje-md/README.md` — nowy opis roli katalogu.
- `src/cli.mjs` — nagłówek nowych generacji `STATUS: DRAFT` oraz komunikat `Zapisano szkic`.
- `AGENTS.md` i `SESSION_HANDOFF.md` — sprawdzić spójność, **nie kopiować** stałych reguł do handoff.
- Wyszukać inne wystąpienia starych nazw i publicznych oznaczeń „draft”; zmieniać tylko przypadki o tym samym znaczeniu.

## 5. Czego nie zmieniać

- Nie przerabiać literackiej treści `sny-iskry/` ani merytorycznych analiz w `automatyzacje-md/`.
- Nie usuwać powiązań **Sen ↔ Pomysł**, stabilnych `materialId`, rejestru `data/materials.json`, metadanych API i kosztów ani stron ewaluacji.
- Nie zmieniać promptów Dreamera/Writera, modelu API, limitów tokenów, architektury Astro ani layoutu w ramach tego zadania.
- Nie projektować dodatkowego systemu moderacji, statusów publikacji ani nowego workflow bez osobnego uzgodnienia.
- Nie mieszać tego zadania z wcześniej rozpoczętymi poprawkami szerokości tekstów, zajawek, sortowania i ikon. Ich stan sprawdzić według `SESSION_HANDOFF.md`.

## 6. Procedura i kryteria zakończenia

1. Przed rozpoczęciem zsynchronizować lokalny `main` z GitHubem **po sprawdzeniu lokalnych zmian**. Zgodnie z `AGENTS.md` operacje zdalne wymagają zgody użytkownika.
2. Sprawdzić `git status`, aktualne pliki i `SESSION_HANDOFF.md`; unikać nadpisania niezakończonej pracy.
3. Wprowadzić minimalny zestaw zmian wskazany powyżej.
4. Przeszukać projekt pod kątem `Autonomous`, `Human-Sourced`, `DRAFT`, `szkic`, `wersja robocza` i `akceptacj`; oceniać znaczenie, nie zamieniać masowo.
5. Sprawdzić na stronie listę pomysłów, pojedynczy pomysł, powiązanie ze snem i stronę „O projekcie”. Publicznie nie powinny być przedstawiane jako niepublikowane drafty.
6. Uruchomić dostępne `npm test`, `npm run check`, `npm run build`; zapisać wyniki albo jasno wskazać, czego nie udało się uruchomić.
7. Uzupełnić `SESSION_HANDOFF.md` o rzeczywiście wykonane zmiany, pliki i testy. Jeśli zasadne, zwięźle odnotować etap w `CHANGELOG.md`.
8. Przed commitem przedstawić listę zmian do kontroli. Push i wdrożenie wyłącznie za zgodą użytkownika.

**Cel akceptacji:** czytelnik widzi opowieści i powstałe z nich pomysły jako publikowaną treść HAP; dokumentacja i generator mówią to samo; możliwość późniejszej ewaluacji nie jest mylona z warunkiem publikacji.
