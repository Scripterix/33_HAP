# Propozycja mechanizmu ewaluacji pomysłów HAP

**Status: propozycja koncepcyjna do omówienia. Nie jest zatwierdzoną specyfikacją ani zgodą na implementację.**

## Cel i miejsce w HAP

Mechanizm ma krytycznie oceniać pomysły Writera jako możliwe kierunki dalszego działania. Ma pomagać odkrywać słabe założenia, braki dowodowe, ryzyka i najtańszy sposób sprawdzenia najważniejszej niewiadomej. Nie ocenia literackiej wartości Snu Iskry i nie podejmuje decyzji za człowieka.

Dokument rozwija koncepcję mechanizmu. `Brief-Evaluation.md` pozostaje źródłem dotychczasowego planu MVP, istniejących pól, walidacji i etapów; jego wymagań nie należy tu traktować jako zatwierdzonych zmian w kodzie.

## Proponowany przepływ

**Dream → Writer → Evaluator → Human Decision**

1. **Dream:** oryginalny materiał źródłowy, przechowywany bez zmian.
2. **Writer:** tworzy interpretację lub pomysł i zapisuje relację ze snem.
3. **Evaluator:** przygotowuje krytyczną, ustrukturyzowaną analizę pomysłu. Wynik jest propozycją zawierającą uzasadnienia i niepewności, a nie werdyktem.
4. **Human Decision:** człowiek przyjmuje, poprawia lub odrzuca analizę, wybiera dalszy krok albo kończy pracę. Decyzja człowieka jest osobnym zapisem i nie wynika automatycznie z wyniku modelu.

Publikacja pomysłu może pozostać niezależna od ewaluacji. Brak oceny nie powinien blokować prezentacji Snu ani interpretacji Writera.

## Kryteria i wstępna skala

Poniższe kryteria są kandydatami do przetestowania. Każda ocena powinna mieć krótkie uzasadnienie, podstawę oraz poziom pewności. Skala nie zastępuje argumentacji.

| Kryterium | Pytanie pomocnicze |
| --- | --- |
| Wartość | Jaka zmiana byłaby cenna i dla kogo? Czy istnieje dowód problemu lub potrzeby? |
| Oryginalność | Co odróżnia propozycję od znanych podejść i co wymaga aktualnego sprawdzenia? |
| Wykonalność | Jakie zasoby, kompetencje, dane i zależności są potrzebne? |
| Potencjał rozwoju | Czy istnieją wiarygodne następne kroki lub możliwość zwiększania użyteczności? |
| Ryzyko | Jak poważne są możliwe szkody, koszty, zależności i skutki uboczne? |

Wstępny zakres **0–5** można czytać opisowo: 0 — przesłanki silnie przemawiają przeciw; 1 — bardzo słabo; 2 — słabo lub z dużymi zastrzeżeniami; 3 — mieszanie / umiarkowanie; 4 — mocno; 5 — bardzo mocno. W przypadku ryzyka kierunek jest odwrócony: 0 oznacza małe rozpoznane ryzyko, a 5 — wysokie. Brak danych oznaczamy jako **N/O (nieocenione)**, a nie jako zero.

Nie należy domyślnie sumować punktów ani tworzyć rankingu. Kryteria mierzą różne rzeczy, oceny nie mają potwierdzonej kalibracji, wagi zależą od kontekstu, a wysoka wartość może współistnieć z niską wykonalnością lub dużym ryzykiem. Preferowanym wynikiem początkowym jest profil ocen z uzasadnieniami, brakami wiedzy i stopniem pewności. Ewentualny wynik łączny wymagałby osobnego uzasadnienia wag i sprawdzenia, czy nie ukrywa ważnego ryzyka.

## Fakty, hipotezy i oceny

Analiza powinna rozdzielać co najmniej:

- **Fakty:** twierdzenia poparte wskazanym źródłem lub bezpośrednio sprawdzonym materiałem. Przy źródłach zewnętrznych zapisać link i datę sprawdzenia.
- **Przesłanki:** informacje przyjęte na potrzeby rozumowania, których prawdziwość nie została potwierdzona.
- **Hipotezy:** twierdzenia wymagające weryfikacji, na przykład o potrzebie odbiorców lub zmianie ich zachowania.
- **Szacunki:** przybliżenia kosztu, czasu, skali lub wysiłku z jawnymi założeniami i zakresem niepewności.
- **Oceny modelu:** interpretacje, porównania i rekomendacje wygenerowane przez Evaluatora; nie są faktami nawet wtedy, gdy brzmią stanowczo.

Jeśli Evaluator nie wykonał researchu, powinien określić wynik jako analizę wewnętrzną bez weryfikacji rynku. Nie może przedstawiać niezweryfikowanej znajomości konkurencji ani źródeł jako ustaleń.

## Niewiadoma i eksperyment

Każda ewaluacja powinna wskazać **największą niewiadomą**, której rozstrzygnięcie najbardziej zmieniłoby decyzję. Następnie powinna zaproponować najmniejszy eksperyment pozwalający ją sprawdzić: pytanie, metodę, dane, mierzalny sygnał powodzenia, kryterium przerwania oraz ewentualny koszt i czas jako szacunki.

Eksperyment ma być proporcjonalny, możliwie lokalny, odwracalny i bezpieczny. Sam opis eksperymentu nie oznacza zgody na jego wykonanie. Decyzję o działaniu podejmuje człowiek osobno.

## Perspektywy wartości

Wartość można rozpatrywać z perspektywy technicznej, komercyjnej, społecznej, naukowej lub filozoficznej. Nie wiadomo jeszcze, czy perspektywy te powinny być kryteriami, opcjonalnymi soczewkami, czy sekcjami wybieranymi dla konkretnego pomysłu. Nie należy wymagać każdej perspektywy przy każdym pomyśle ani sprowadzać ich do jednej skali bez uzasadnienia.

## Możliwa architektura

To szkic do dalszego projektowania, nie kontrakt implementacyjny:

- osobna komenda, np. `npm run evaluate -- <idea-slug>`, wskazywałaby konkretny pomysł;
- CLI ładowałoby pomysł, jego stabilny `ideaId`, powiązany sen przez `data/materials.json` i prompt Evaluatora;
- wynik trafiałby do osobnego pliku w `ewaluacje-md/`, bez zmiany treści pomysłu lub snu;
- rekord wiązałby się z pomysłem przez `ideaId`, a unikalny `evaluationId` identyfikowałby konkretną ewaluację;
- istniejąca walidacja statusów i relacji oraz zasada najwyżej jednej aktywnej ewaluacji powinny zostać ocenione przed ewentualnym rozszerzeniem;
- status procesu i decyzja człowieka muszą pozostać rozdzielone. Evaluator nie może automatycznie ustawiać decyzji ani statusu jako akceptacji;
- koszt i `usage` dotyczyłyby rzeczywistego przebiegu modelu. Warto zaprojektować powiązanie metadanych generowania z `evaluationId`, zamiast przypisywać koszt do treści pomysłu lub tworzyć sztuczne dane. Ewaluacja ręczna nie wymaga sidecara generowania.

Szczegóły, takie jak nadpisywanie istniejących ocen, ponowne ewaluacje, wersjonowanie promptu i modelu oraz kształt metadanych, pozostają otwarte.

## Ryzyka i zabezpieczenia

- **Pozorna precyzja:** liczby mogą wyglądać obiektywnie mimo niekalibrowanej skali. Pokazywać uzasadnienie, pewność i N/O; nie opierać decyzji na sumie.
- **Samopotwierdzanie pomysłu przez AI:** model może rozwinąć założenia zawarte w tekście Writera tak, jakby były dowodami. Wymagać krytycznej perspektywy, kontrargumentu i wskazania, co mogłoby obalić hipotezę.
- **Fikcyjne fakty:** oddzielać źródła od wiedzy modelu, datować sprawdzenia i jawnie oznaczać brak researchu.
- **Fikcyjne koszty:** szacunki oznaczać jako szacunki; rzeczywisty koszt zapisywać wyłącznie na podstawie rzeczywistego `usage` i właściwego snapshotu stawek.
- **Automatyczna decyzja lub działanie:** blokować automatyczne uruchamianie eksperymentów, tworzenie prototypów, wydatki i publikację na podstawie oceny modelu.

## Otwarte decyzje

1. Kto ocenia: wyłącznie model, człowiek, czy model z obowiązkową recenzją człowieka?
2. Które kryteria są wspólne, a które wybierane zależnie od problemu?
3. Jakie kotwice i przykłady opisują poziomy 0–5 dla każdego kryterium?
4. Czy wagi lub wynik łączny są w ogóle potrzebne?
5. Czy Evaluator ma korzystać z researchu zewnętrznego, a jeśli tak, jak rejestrować źródła i daty?
6. Jak oddzielić `evaluationId`, status ewaluacji, rekomendację modelu i decyzję człowieka w pliku oraz w UI?
7. Jak przechowywać wersje promptu, model, `usage`, koszty i historię ponownych ocen?
8. Jaki pomysł i eksperyment ręczny najlepiej sprawdzą użyteczność samego formularza oraz rubryki?

## Proponowany pierwszy eksperyment

Przeprowadzić **jedną ręczną ewaluację** wybranego pomysłu, bez Evaluatora CLI. Kandydatem pozostaje „Godzina, której nikt nie przeżył”, wskazana już w `Brief-Evaluation.md`; wybór wymaga potwierdzenia w ramach kolejnego etapu. Użyć roboczej skali jako profilu, jawnie oddzielić fakty, przesłanki, hipotezy, szacunki i oceny, wskazać największą niewiadomą oraz zaproponować eksperyment bez jego wykonywania. Po przeglądzie ocenić, które pola rzeczywiście pomagają w decyzji i uprościć lub zmienić rubrykę przed jakąkolwiek implementacją.
