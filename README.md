# 33_HAP — Human-AI Publishing

**Sen Iskry → pomysł Writera → publikacja.** HAP łączy oryginalne opowieści z publicznymi interpretacjami powstałymi na ich podstawie. Dopiero później człowiek może wybrać pomysł do osobnej ewaluacji, eksperymentu lub projektu.

Projekt działa lokalnie w Node.js i Astro. Repozytorium: [Scripterix/33_HAP](https://github.com/Scripterix/33_HAP). Publikacja w Cloudflare Pages nie jest jeszcze potwierdzona.

## Katalogi

- `sny-iskry/` — oryginalne sny, ręcznie archiwizowane po przeczytaniu porannego Scheduled Task.
- `automatyzacje-md/` — interpretacje i pomysły Writera prezentowane w publicznej sekcji „Pomysły ze snów”.
- `ewaluacje-md/` — opcjonalne, osobne dokumenty ewaluacji wybranych pomysłów.
- `data/materials.json` — rejestr stabilnych identyfikatorów i relacji między materiałami.
- `data/generation/` — sidecary rzeczywistych danych `usage`, stawek i kosztów przyszłych generowań.
- `src/pages/` — strony Astro ze snami, pomysłami, powiązaniami między nimi i opisem projektu.
- `config/` — prompty; `src/cli.mjs` — lokalna automatyzacja.

Obecny zbiór obejmuje 14 snów i 12 pomysłów. Ostatni zweryfikowany build wygenerował 30 stron.

## Start

Wymaga Node.js 22.10+.

```bash
npm install
npm run dev
```

`npm test` uruchamia testy kosztów i relacji. `npm run check` sprawdza spójność materiałów bez połączenia z API, a `npm run build` buduje statyczną stronę Astro.

## Proces Snów Iskry

1. Przygotuj sen w ChatGPT i zapisz go jako plik Markdown w `sny-iskry/`.
2. Zarejestruj istniejący plik, aby otrzymał trwały `materialId`:

   ```bash
   npm run dream:register -- nazwa-snu.md
   ```

   Rejestracja nie generuje ani nie zmienia treści i jest bezpieczna do ponownego uruchomienia. Po rejestracji `npm run build` uwzględnia sen w Astro.
3. Opcjonalnie uruchom Writer dla zarejestrowanego snu, aby utworzyć interpretację przez API.

## Writer

Skopiuj `.env.example` do `.env`, ustaw `OPENAI_API_KEY`, a następnie uruchom:

```bash
npm run writer -- sen-o-trzecim-krzesle.md
```

Writer CLI zapisuje interpretację Markdown w `automatyzacje-md/`, zachowuje powiązanie ze snem źródłowym i rejestruje dostępne metadane generowania. Domyślna konfiguracja używa GPT-5 mini; historyczny pierwszy test API wykonano na `gpt-4o-mini`.

Po autoryzowanym wywołaniu API CLI przekazuje `usage` zwrócone przez `src/openai.mjs` do `src/lib/generation-metadata.mjs`. Brak `usage` lub nieznany cennik jest zapisywany jako koszt nieznany, nigdy jako zero.

`npm run dream:generate` to opcjonalne generowanie snu przez API. Dotychczasowa komenda `npm run dream` pozostaje jej aliasem dla kompatybilności. Klucze API pozostają wyłącznie w lokalnym `.env`; projekt nie wykonuje automatycznego pushu ani wdrożenia.

Decyzje i zadania: [AGENTS.md](AGENTS.md) · [ROADMAP.md](ROADMAP.md) · [CHANGELOG.md](CHANGELOG.md).
