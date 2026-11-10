---
evaluationId: "b71c4f83-42b0-46a8-91cd-8f935b73ef13"
ideaId: "d1bf2c12-d4fd-4463-ab3b-f55e6278ebcd"
status: "Nowy"
title: "Godzina, której nikt nie przeżył — zachowanie wartości historii cyfrowej"
problem: "Wieloletnie archiwa zawierają duplikaty, kopie projektów, kolejne wersje i pliki w starych formatach. Zwykła deduplikacja nie wyjaśnia, które drobne różnice dokumentują istotną zmianę."
audience: "Osoby i małe zespoły posiadające wieloletnie archiwa cyfrowe; w pierwszym eksperymencie właściciel własnego archiwum."
evidence: "Istnieje artykuł Writera opisujący temporalną deduplikację. Istnieje zgłoszona potrzeba zbadania archiwum plików z około 20 lat i poprzednich komputerów. Nie przeprowadzono jeszcze inwentaryzacji ani testu na rzeczywistych danych."
assumptions: "Niektóre podobne pliki reprezentują ważne etapy rozwoju projektu. Daty plików mogą być niepełne lub mylące. Metadane i treść wystarczą do wykrycia części relacji, ale nie do pewnego odtworzenia całej historii."
hypotheses: "Połączenie hashy, metadanych, porównań treści i grupowania czasowego pomoże wykrywać ważne różnice, które narzędzie do usuwania duplikatów mogłoby pominąć."
potentialValue: "Bezpieczne odzyskiwanie kontekstu projektów, porządkowanie archiwum i ochrona informacji przed utratą czytelności. Nie zweryfikowano wartości rynkowej."
risks: "Ujawnienie prywatnych danych, uszkodzenie oryginałów podczas automatycznej reorganizacji, błędne wnioskowanie z dat modyfikacji oraz fałszywe uznanie kopii za niepotrzebną."
technicalDifficulty: "Wstępny indeks i porównanie plików: umiarkowane. Wiarygodna rekonstrukcja chronologii i interpretacja znaczenia różnic: trudne, wymagają ręcznej weryfikacji."
experimentCost: "Nieoszacowany. Pierwszy eksperyment powinien wykorzystywać istniejący komputer i mały katalog testowy; nie zakładamy zerowego kosztu pracy."
minimumExperiment: "Lokalny, wyłącznie odczytowy skan jednego katalogu: ścieżka, rozmiar, format, dostępne daty, SHA-256; grupy identycznych plików i kandydatów na wersje; raport HTML/JSON bez usuwania lub nadpisywania danych."
successCriterion: "Raport poprawnie rozróżnia kopie identyczne od zmienionych i wskazuje co najmniej kilka relacji możliwych do ręcznej weryfikacji. Oryginały pozostają bez zmian."
stopCriterion: "Jakakolwiek próba automatycznego usuwania/przenoszenia oryginałów, niekontrolowane wysyłanie prywatnych treści do usług zewnętrznych lub brak możliwości audytu wniosków."
decision: "Brak decyzji — propozycja ewaluacji do przejrzenia przez człowieka."
nextStep: "Po akceptacji zakresu wybrać mały katalog archiwalny i przygotować specyfikację skanera tylko do odczytu. Nie uruchamiać skanowania bez osobnego polecenia."
---

## Synteza

**Wstępna ocena, nie decyzja o projekcie.** Pomysł jest interesujący jako przyszły *History Engine* oraz możliwe źródło danych i skojarzeń dla *Microda*. Najbardziej wartościowa jest zasada: **kompresować opis historii, a nie usuwać źródła**.

## Fakty i obserwacje

- Artykuł Writera proponuje grupowanie powtarzalnych zdarzeń i zachowywanie tych, których znaczenie ujawnia się w czasie.
- Zgłoszono potrzebę zbadania plików i folderów pochodzących z kolejnych komputerów i około 20 lat pracy.
- HAP ma już powiązanie tego pomysłu z jego źródłowym snem.
- **Nie ma jeszcze dowodów**, że algorytm umie prawidłowo rozpoznawać znaczenie historyczne różnic.

## Hipoteza mechanizmu

1. Odczytaj strukturę katalogu bez zmiany oryginałów.
2. Wyznacz hashe; odróżnij duplikaty *bajtowo identyczne* od jedynie podobnych.
3. Grupuj wersje po nazwach, strukturze i porównaniu treści; daty traktuj jako niedoskonałe wskazówki.
4. Zachowaj wszystkie różnice i uzasadnienia powiązań.
5. Dopiero na małej, świadomie wybranej próbce sprawdź, czy analiza semantyczna pomaga odkryć porzucone wątki, projekty lub ważne zmiany.

## Czego nie robić w MVP

Nie budować automatycznego „czyszczenia dysku”, wyszukiwarki AI po całym komputerze ani integracji z chmurą. Nie wyciągać wniosków o biografii wyłącznie z timestampów. Nie łączyć od razu HAP, Microda i History Engine w jeden system.

## Wartość, wykonalność, niepewność

- **Wartość dla właściciela archiwum:** potencjalnie wysoka, lecz jakościowa i niezweryfikowana.
- **Oryginalność:** połączenie istniejących metod indeksowania, porównywania wersji i analizy historii; brak sprawdzenia konkurencyjnych rozwiązań.
- **Wykonalność pierwszego etapu:** wysoka przy małym zbiorze i bezpiecznym, tylko odczytowym dostępie.
- **Ryzyko dominujące:** błędne utożsamienie podobieństwa plików z brakiem wartości historycznej.

## Powiązane idee do osobnej analizy

- **Latarnia — strona jutra:** ryzyko utraty możliwości odczytania starych formatów, a także warunki przyszłej użyteczności odkrytych pomysłów.
- **Miasto pod guzikiem:** przekazywanie zasobów i wiedzy innym użytkownikom.
- **Microda:** możliwe późniejsze wykorzystanie relacji między plikami jako pamięci kontekstowej; brak jeszcze decyzji o wspólnej architekturze.

**Status decyzji człowieka:** niepodjęta. **Status prototypu:** nie rozpoczęty.
