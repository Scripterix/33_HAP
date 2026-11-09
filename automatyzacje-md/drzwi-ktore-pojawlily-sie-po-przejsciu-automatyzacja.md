---
publishedAt: "2026-10-23"
---

<!-- STATUS: DRAFT; SOURCE: sny-iskry/drzwi-ktore-pojawlily-sie-po-przejsciu.md; wymaga akceptacji człowieka -->

Wyobraź sobie, że do twojego zespołu przychodzi właściciel sklepu z jednym zdaniem: „Przycisk zamówienia przestał działać”. Nie prosi o nową platformę, nie chce rewolucji — chce jedno działające kliknięcie. Naprawiasz to. Parę dni później ta naprawa staje się nie tylko fakturą, lecz małym, namacalnym wejściem: opisem problemu, procedurą odtworzenia, poprawką, testem i ofertą dla następnego klienta z tym samym bólem. Z jednego rozwiązania powstaje drzwi — i za nimi kolejne zadania, aż w końcu cała ulica warsztatów.

Idea: drzwi, które powstają z pracy
Core pomysł to nie nowy marketplace ani błyskawiczny generator produktów, lecz mechanizm gospodarowania efektami drobnych, bieżących napraw: każde zamknięte zlecenie (naprawa, usprawnienie, małe narzędzie) zostaje zebrane, ustrukturyzowane i opublikowane jako „drzwi” — zwięzła oferta + artefakty (opis problemu, kroki odtworzenia, patch/testy, cena, gwarancja). Te drzwi nie obiecują wszystkiego; obiecują jedno rozwiązanie, które już zadziałało. Z czasem zbiory drzwi tworzą katalog powtarzalnych usług i małych produktów, które firmy mogą przeglądać, kupować i wdrażać bez przerostu obietnic.

Jak to działa w praktyce
Wyobraźmy sobie prosty proces pracy po stronie warsztatu:

- Klient zgłasza problem. Zgłoszenie zawiera: opis objawów, środowisko, priorytet.
- Zespół odtwarza błąd i formułuje hipotezę. Zapisywane są kroki odtworzenia i test sprawdzający.
- Naprawa jest wdrażana i opatrzona małym automatycznym testem/regresem.
- Po akceptacji klienta generowany jest artefakt „drzwi”: zwięzły wpis opisowy, patch, testy, cena i warunki.
- Drzwi trafiają do katalogu; system automatycznie przypisuje tagi, sugeruje podobne zgłoszenia i wystawia ofertę „kup tę naprawę” dla innych klientów z podobnym problemem.

Rola ludzi, AI i organizacji
- Ludzie: eksperci robią naprawy, walidują hipotezy, opisują przypadki brzegowe. Klienci decydują, czy chcą gotowe drzwi czy indywidualne rozwiązanie.
- AI: asystuje przy ekstrakcji kroków odtworzenia, generuje streszczenia, sugeruje tagi i wyszukuje podobne zgłoszenia (embeddings). Automatyczne testy uruchamiane w CI potwierdzają naprawę.
- Organizacje: małe agencje i warsztaty zarabiają nie tylko na godzinach, lecz na katalogu powtarzalnych prac; platforma łączy popyt z gotowymi „drzwiami”.

Konsekwencje — trzy skale

Mikro (codzienne życie użytkownika)
- Szybsze rozwiązania: zamiast czekać na pełną przebudowę, właściciel sklepu może kupić sprawdzone „drzwi” i przywrócić działanie w godzinach.
- Mniejszy koszt decyzji: jasne, konkretne oferty ułatwiają wybór.
- Większa przewidywalność: każdy zakup zawiera testy i instrukcję wdrożenia.

Mezo (firmy, pracownicy, instytucje)
- Nowy produkt firmy: warsztaty zyskują katalog „micro-products” (gotowych napraw/usług), co obniża CAC i przyspiesza skalowanie.
- Zmiana roli specjalistów: część pracy staje się produktowa (opakowane naprawy), część — konsultacyjna (skomplikowane zlecenia).
- Lepsze repozytoria wiedzy: każda naprawa tworzy artefakt, który służy jako wzorzec dla onboardingu i szkoleń.

Makro (gospodarka i systemy)
- Modularność usług: wiele małych, sprawdzonych poprawek staje się warstwą kompozycyjną przyszłych rozwiązań (jak znormalizowane części w przemyśle).
- Efektywność rynku: drobne problemy przestają być barierą wejścia dla małych firm; ekonomia napraw (fix-economy) rośnie.
- Ryzyka: możliwość komodyfikacji wiedzy specjalistycznej, pogłębienie nierówności między tymi, którzy potrafią szybko „opakować” rozwiązania, a tymi, którzy robią kompleksowe inżynierskie prace; także pokusa krótkoterminowych poprawek zamiast systemowych napraw.

Co już technicznie istnieje, a co jest spekulacją
Istnieją: systemy ticketowe, CI/CD, automatyczne testy, narzędzia do ekstrakcji tekstu i embeddingów do wyszukiwania podobnych problemów, marketplace’y usług. Spekulacja: powstanie substancjalnej gałęzi ekonomii opartej na „drzwiach” — masowych, opakowanych naprawach sprzedawanych jak produkty, oraz towarzysząca im architektura prawna/ubezpieczeniowa i kulturowa adaptacja (zaufanie do „mikro-produktywności”).

Wartość, beneficjenci i ryzyka
- Kto zyskuje: małe firmy, właściciele stron, freelancerzy i agencje, platformy usługowe, integratorzy systemów.
- Co rozwiązujemy: powtarzalne awarie, fragmentaryzację wiedzy, dług czasu naprawy, wysokie koszty adaptacji.
- Możliwości biznesowe: subskrypcje na katalog drzwi, white-label bibliotekę napraw do wbudowania w SaaS, szkolenia i certyfikaty „drzwiowych” ekspertów.
- Ryzyka: niskiej jakości „drzwi” (fragmentaryczne poprawki bez zrozumienia kontekstu), tworzenie zachęt do generowania drobnych problemów, prawnoliczne pytania o odpowiedzialność za gotowe poprawki.

MVP — prosty eksperyment do zrobienia w kilka dni
Cel MVP: zweryfikować, czy uporządkowane, opakowane naprawy sprzedają się częściej i szybciej niż tradycyjne zgłoszenia.

Dane wejściowe
- Formularz zgłoszeniowy: opis problemu, kroki odtworzenia, środowisko (wersje), priorytet.
- Artefakty: patch / diff, skrypt testowy, zrzuty ekranu, minimalna instrukcja wdrożenia, cena/faktura.

Logika działania
1. Zgłoszenie trafia do warsztatu; ekspert odtwarza błąd i wykona naprawę lokalnie.
2. Po akceptacji klienta: wygeneruj „drzwi” — stronę z opisem problemu, krokiem odtworzenia, patch’em i testem. Dodaj meta: czas naprawy, koszt, gwarancja.
3. Indeksuj treść drzwi z użyciem prostego modelu embeddingów (np. sentence-transformers) i prostego wyszukiwania semantycznego.
4. Na stronie katalogu pokaż „podobne” problemy; umożliw zakup/drugi klient może zamówić wdrożenie opisanego patcha.

Rezultat i metryki
- Czas od zgłoszenia do przywrócenia funkcji.
- Liczba „drzwi” utworzonych w tydzień.
- Konwersja: ile drzwi konwertuje na kolejny sprzedaż (powtarzalność)?
- Średni przychód na drzwi.

Technologia (najprostsza ścieżka)
- Frontend: prosty formularz HTML/JS.
- Backend: Flask/Express z SQLite.
- Repo: git do przechowywania patchy i testów.
- Embeddings: gotowy model sentence-transformers (lokalny) lub API (jeśli dostępne).
- CI: GitHub Actions do uruchamiania testów po wdrożeniu.
To wystarczy, aby jeden programista mógł uruchomić prototyp w kilka dni bez dużych kosztów.

Nieoczywiste zależności i potencjalne drogi rozwoju
- Z czasem katalog drzwi staje się mapą zależności: które poprawki często występują razem? To umożliwia budowę „ulicy” — grupy warsztatów specjalizujących się w konkretnej klasie problemów.
- Agentowi AI można powierzyć pierwszą klasyfikację i przygotowanie szablonów naprawy, ale człowiek nadal waliduje i dopracowuje.
- Firmy mogą oferować „szkice” drzwi jako wewnętrzny asset — biblioteka, która przyspiesza onboardingi i redukuje koszt napraw.

Nie wszystko da się i nie wszystko powinno się automatyzować
Drzwi są wartościowe wtedy, gdy reprezentują kompletną, przetestowaną i rzetelną poprawkę. Nie powinniśmy opakowywać prowizorycznych, ryzykownych „poprawek”, byle sprzedać je jako produkt. Trzeba też pilnować, by nagroda pieniężna nie motywowała do tworzenia drobnych błędów lub bagatelizowania głębszych, systemowych wad.

Na koniec: eksperyment, który można przeprowadzić od zaraz
Zrób A/B test: połowie klientów zaoferuj standardową naprawę, drugiej połowie naprawę + utworzenie drzwi (dodatkowa, mała opłata lub rabat). Mierz: czas rozwiązania, liczba powrotów, koszt pozyskania klienta i przychód na klienta po 3 miesiącach. To szybko powie, czy model drzwi się opłaca.

Pytanie do Ciebie
Które jedne drzwi naszej strony usług powinniśmy otworzyć jako pierwsze, aby po ich drugiej stronie mogła powstać cała ulica?
