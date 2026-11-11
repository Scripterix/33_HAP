# Changelog

## 0.2.5 — 2026-11-10
- Ujednolicono nazwę projektu jako „33_HAP — Human-AI Publishing”.
- Rozdzielono publiczną prezentację interpretacji Writera od późniejszej, opcjonalnej ewaluacji pomysłu.
- Nowe wyniki Writer CLI zachowują wskazanie snu źródłowego bez automatycznego oznaczenia `DRAFT`.
- Dodano daty wyrównane do prawej strony dolnego wiersza kart snów i pomysłów.
- Dodano wspólny link do repozytorium GitHub po prawej stronie stopek.

## 0.2.4 — 2026-11-09
- Dodano stronę „Projekt HAP”, wspólne karty z line-clamp oraz dyskretny panel informacji na stronach materiałów.
- Wprowadzono stabilne `materialId`, osobne ewaluacje i atomowo zapisywane sidecary metadanych generowania.
- Dodano wersjonowany cennik, obliczanie kosztów z `usage` i testy stanów niepełnych bez tworzenia fikcyjnych danych.

## 0.2.3 — 2026-11-09
- Ujednolicono hierarchię i zachowanie kafli „Snów” oraz „Pomysłów” przez wspólny komponent wizualny.
- Wydłużono zajawki snów do trzech zdań, poprawiono zawijanie wprowadzeń i zastosowano mieszany krój serif/sans-serif.
- Uproszczono wybór motywu do jednej aktywnej ikony z obsługą klawiatury i pamięcią ustawienia oraz zmieniono znak brandu na `◆`.

## 0.2.2 — 2026-11-02
- Ujednolicono listę „Sny Iskry” z widokiem „Pomysłów” przez wspólny system kafelków.
- Dodano wspólny jasny i ciemny motyw z przełącznikiem słońce–księżyc oraz zapamiętywaniem wyboru.
- Dodano zajawki na kafelkach snów i czytelniejszą strukturę Markdown opowieści.

## 0.2.1 — 2026-10-27
- Podłączono OpenAI API przez lokalny plik `.env`; test wykonano na modelu `gpt-4o-mini`.
- Potwierdzono działanie Writer CLI dla wskazanego snu.
- Pierwszy test utworzył prywatny szkic `sen-o-trzecim-krzesle-automatyzacja.md` ze statusem `DRAFT`.
- Technicznie test zakończył się sukcesem, ale wygenerowana koncepcja okazała się zbyt ogólna i mało oryginalna.

## 0.2.0 — 2026-10-25
- Dodano szkic strony Astro: lista snów i strony pojedynczych opowieści.
- Dodano AGENTS.md i ROADMAP.md.
- Zachowano CLI Writer oraz rozdzielenie snów od szkiców automatyzacji.

## 0.1.0 — 2026-10-25
- Lokalny CLI: `dream`, `writer`, `list`, `check`.
- Trzy przykładowe sny i szablony promptów.
