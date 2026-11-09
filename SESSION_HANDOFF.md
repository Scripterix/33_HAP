# Instrukcja dla Codexa — praca nad HAP

Przy realizacji większych, wieloetapowych zadań aktualizuj plik `SESSION_HANDOFF.md` po zakończeniu istotnego etapu oraz przed planowaną przerwą.

Zapisuj:
- Aktualny cel.
- Wykonane zadania i zmodyfikowane pliki.
- Zadania rozpoczęte, ale niedokończone.
- Następny konkretny krok.
- Wyniki ostatnich testów i napotkane błędy.

Po wznowieniu pracy najpierw przeczytaj `SESSION_HANDOFF.md`, sprawdź aktualny stan Git i plików, a dopiero potem kontynuuj.

Nie powtarzaj automatycznie wcześniejszych zmian. Nie zakładaj, że stan zapisany w notatce jest aktualny bez sprawdzenia.

Prowadź sesje narastająco w tym pliku - krótkie odnosniki do sesji od najświższego na górze.

1. Fikcyjne daty powinny być oznaczone jako testowe. Możemy rozłożyć je między 20 października a 9 listopada 2026, ale nie powinniśmy później przedstawiać ich czytelnikom jako rzeczywistych dat publikacji. Proponuję:
---
publishedAt: 2026-11-03
dateStatus: placeholder
---


Dzięki temu później wymienimy daty bez zgadywania, które są prawdziwe.

2. Nierówne zajawki mogą wynikać z obu czynników: sposobu pobierania pierwszego akapitu Markdown oraz reguł CSS. Trzeba sprawdzić helper generujący zajawki. Jeśli w Markdown są krótkie akapity, nie należy bezpośrednio przenosić ich podziałów do kart. Lepiej połączyć tekst kilku akapitów w jeden ciąg i dopiero ograniczyć go do trzech linii przez line-clamp: 3.
Ostateczna lista dla Codexa
1. Zachować main o maksymalnej szerokości 890 px.
2. Usunąć sztuczne ograniczenia szerokości leadów (70ch, 72ch).
3. Ujednolicić zajawki do maksymalnie trzech linii, łącząc tekst sąsiednich akapitów.
4. Dodać publishedAt w frontmatter i oznaczyć fikcyjne daty jako testowe.
5. Nad archiwami umieścić dyskretne sortowanie z jedną ikoną zmieniającą kierunek:  / .
6. Przenieść ikonę informacji na prawą stronę nagłówków materiałów.
7. Sprawdzić wygląd mobilny, poprawność sortowania oraz npm test, npm run check i npm run build.
8. Dodać do AGENTS.md zasadę przekazywania stanu większych zadań przez SESSION_HANDOFF.md, żeby ograniczyć ryzyko utraty postępu po przerwaniu Codexa przez limit.
Moja rekomendacja: zlecić te poprawki jako jeden zamknięty etap, a po wykonaniu zrobić commit. Nie rozbudowywać teraz systemu o nowe funkcje.