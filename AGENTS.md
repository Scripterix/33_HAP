# AGENTS — 33_HAP (Human-AI Publishing)

## Stałe zasady
- HAP: **Sen Iskry → pomysł Writera → publikacja**. Ewaluacja pomysłu jako projektu to osobny, późniejszy etap.
- Stosuj proste, modularne rozwiązania; bez niepotrzebnej rozbudowy.
- Nie modyfikuj literackiej treści `sny-iskry/` bez wyraźnego polecenia.
- `automatyzacje-md/` zawiera pomysły do prezentacji na stronie. Status `DRAFT` oznacza potrzebę oceny, a nie automatyczny zakaz wyświetlania. Nie rozpoczynaj wdrażania prototypów bez decyzji użytkownika.
- Sekrety przechowuj wyłącznie w `.env` lub zmiennych środowiskowych; `.env.example` zawiera tylko przykładowe wartości.
- Nie wykonuj `git push`, `pull`, `fetch`, zdalnych operacji/merge ani wdrożeń bez zgody. Do sprawdzania stanu używaj `git status` i `git diff`.
- Po zmianach uruchom odpowiednie testy, `npm run check` i `npm run build`; zaznacz, jeśli czegoś nie sprawdzono.
- Dokumentacja ma być krótka. Aktualizuj CHANGELOG i ROADMAP tylko przy istotnych zmianach.

## Ciągłość pracy
- Przed dużym zadaniem i po przerwie odczytaj `SESSION_HANDOFF.md`, a następnie zweryfikuj jego aktualność w kodzie i stanie Git.
- Po ważnych etapach i przed przerwą zapisz w handoff: cel, wykonane zmiany, otwarte zadania, wyniki testów, najbliższy krok.
- Przy przerwaniu limitem nie zakładaj ukończenia ostatniego polecenia; nie powtarzaj zmian bez sprawdzenia.
- W `SESSION_HANDOFF.md` zapisuj stan i historię sesji. Nie kopiuj tam stałych zasad z tego pliku.
