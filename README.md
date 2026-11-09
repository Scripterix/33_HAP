# 034 HAP — Sny Iskry

**Sny → inspiracje → automatyzacje.** Lokalnie Node.js/TypeScript (Astro), docelowo GitHub + Cloudflare Pages + osobny worker/API. Bez FTP.

## Katalogi
- `sny-iskry/` — oryginalne sny, ręcznie archiwizowane po przeczytaniu porannego Scheduled Task.
- `automatyzacje-md/` — **niepublikowane szkice** GPT Writer.
- `ewaluacje-md/` — osobne dokumenty ewaluacji powiązane przez stabilne `ideaId`.
- `data/materials.json` — rejestr stabilnych identyfikatorów i relacji między materiałami.
- `data/generation/` — sidecary rzeczywistych danych `usage`, stawek i kosztów przyszłych generowań.
- `src/pages/` — publiczna strona Astro, obecnie tylko sny.
- `config/` — prompty; `src/cli.mjs` — lokalna automatyzacja.

## Start
Wymaga Node.js 22.10+.

```bash
npm install
npm run dev
```

`npm test` — testy kosztów i relacji. `npm run build` — statyczna strona Astro. `npm run list`, `npm run check` — bez API.

Writer: skopiuj `.env.example` do `.env`, ustaw `OPENAI_API_KEY`, uruchom:

```bash
npm run writer -- sen-o-trzecim-krzesle.md
```

Writer CLI działa lokalnie i zapisuje wynik jako szkic Markdown w `automatyzacje-md/`. Pierwszy test API wykonano na modelu `gpt-4o-mini`; wynik pozostał `DRAFT`, ponieważ wymaga dopracowania pod kątem oryginalności, konkretności i wykonalności.

Po przyszłym autoryzowanym wywołaniu API CLI przekazuje `usage` zwrócone przez `src/openai.mjs` do modułu `src/lib/generation-metadata.mjs`. Brak `usage` lub nieznany cennik jest zapisywany jako koszt nieznany, nigdy jako zero.

`npm run dream` to **opcjonalne** generowanie snu przez API, niezależne od Scheduled Task w ChatGPT. Szkice wymagają akceptacji; brak auto-push i autopublikacji. GitHub i Cloudflare Pages nie są jeszcze uruchomione.

Decyzje i zadania: [AGENTS.md](AGENTS.md) · [ROADMAP.md](ROADMAP.md) · [CHANGELOG.md](CHANGELOG.md).
