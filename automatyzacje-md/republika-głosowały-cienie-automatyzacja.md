---
publishedAt: "2026-11-04"
dateStatus: placeholder
---

<!-- STATUS: DRAFT; SOURCE: sny-iskry/republika-głosowały-cienie.md; wymaga akceptacji człowieka -->

Wyobraź sobie, że wchodzisz do lokalu wyborczego i zamiast ciebie do szczeliny w murze wchodzi twoja przeszłość: profil zebrany z twoich postów, zakupów i komentarzy, analizujący każdy twój gest i wybierający za ciebie. Głosuje szybciej, „mądrzej” i bez emocji — bo wie, co robiłeś wcześniej. W snie Mira przyciemniła światła i przypomniała: to, co pamięta twój cień, może ci pomóc — ale też może cię zamknąć w dawno wypalonej skorupie.

Jaka jest kluczowa idea? Digitalny „cień” — model predykcyjny zbudowany z twoich danych życiowych — zastępuje lub deleguje decyzje jednostki. To nie tylko technologia rekomendacji: to system, który bierze odpowiedzialność za wybory polityczne, finansowe, zawodowe. Sen proponuje antidotum: przesunięcie takich modeli z roli decydentów do roli doradczego „towarzysza” oraz przyznanie prawa do istnienia tych, których historia nie daje się zmieścić w profilach.

Jak mogłoby to działać w praktyce
- Wartość: dać ludziom narzędzie — nie automat — który potrafi przewidzieć reakcję na decyzję, wyświetlić argumenty „przeszłości” i wymusić świadome potwierdzenie tu i teraz. 
- Architektura: lekki model „cienia” działający lokalnie na urządzeniu (prywatność), z możliwością importu fragmentów historii (wiadomości, e-maile, publiczne posty) i z prostą, jawnie wyświetlaną reprezentacją: „Twój cień sądzi: TAK (80% pewności). Główne powody: X, Y, Z”. 
- Kontrola i tryby: trzy ustawienia „światła” — pamięć jako filtr (wyłącznie ostrzeżenia), pamięć jako doradca (sugestie wymagające potwierdzenia), pamięć jako delegat (tylko z wyraźnym i odnowionym mandatem). 
- Mechanizmy zaufania: explainable-AI (proste reguły oraz przykłady decyzji z przeszłości), audyty modelu, możliwość usunięcia lub „osłabienia” fragmentów historii (prawo do zapomnienia), oraz proceduralny wymóg obecności (fizyczna autoryzacja, rozmowa/identyfikacja w miejscu głosowania), który przywraca wagę decyzji „tutaj i teraz”.

Technologie, które już istnieją, i gdzie zaczyna się spekulacja
- Już dziś mamy: profile behawioralne, modeliki na urządzeniu (on-device ML), mechanizmy wyjaśniające (LIME/SHAP), federated learning i szyfrowane portfele danych. Można więc zbudować lokalny „cień”, który podaje argumenty i prognozy.
- Spekulacja: uznanie prawne dla zautomatyzowanych „głosów”, instytucjonalne systemy, które pozwalają cieniom samodzielnie głosować w imieniu obywateli bez ich bieżącej zgody — to wymaga zmiany przepisów i sporego zaufania społecznego. Również idea „osobnych obywateli bez cienia” (ludzie bez profilu dostający odrębną ochronę) jest bardziej polityczną/lokalną propozycją niż problemem technicznym.

Konsekwencje w trzech skalach
- Mikro (życie codzienne): 
  - plusy: szybsze decyzje w codziennych sprawach, przydatne przypomnienia o wartościach, wsparcie dla osób z ograniczeniami decyzyjnymi (np. kognitywnymi); 
  - minusy: ryzyko apatii — ludzie mogą zacząć „akceptować” decyzje cienia bez refleksji; presja społeczna, by ufać „sprawdzonym” profilom.
- Mezo (firmy, instytucje): 
  - plusy: nowe produkty (shadow-as-a-service, audyty modeli, UX „światła”), oszczędność czasu w organizacjach decyzyjnych; 
  - minusy: business model oparty na profilach pogłębia nierówności — firmy z lepszymi danymi będą sprzedawać „lepsze” cienie; instytucje mogą delegować odpowiedzialność prawnie i etycznie, próbując uniknąć politycznego ryzyka.
- Makro (systemy społeczne, demokracja): 
  - plusy: jeżeli cienie pełnią rolę doradczą i promują refleksję, mogą poprawić jakość decyzji kolektywnych; mechanizmy „bez-cienia” mogą chronić nowe lub marginalne głosy przed automatycznym wykluczeniem. 
  - minusy: jeśli cienie zostaną uprawomocnione do głosowania, demokracja zostanie skonsolidowana w danych i algorytmach — wybory zaczną odtwarzać przeszłość zamiast kształtować przyszłość. Powstanie nowa oś nierówności: ci, których dane są pełne i „czytelne”, przeciwko tym, których brak lub błędy w danych dyskryminują.

Kto zyskuje, kto traci, jakie ryzyka
- Zyskują: użytkownicy szukający wsparcia decyzyjnego, firmy oferujące bezpieczne prywatne narzędzia, organizacje obywatelskie promujące świadome podpisywanie decyzji. 
- Tracą: osoby o „zanieczyszczonych” profilach, łatwo manipulowalne społeczności, systemy prawne, które nie nadążą z regulacją. 
- Ryzyka technologiczne i społeczne: nadużycia przez podmioty zbierające dane, błędy modelu przenoszące historyczne uprzedzenia, erozja odpowiedzialności indywidualnej i prawnej.

Eksperyment-prototyp, który można zbudować w kilka dni
Cel eksperymentu: sprawdzić, czy lekki lokalny „cień” pomaga ludziom bardziej przemyśleć swoje decyzje, zamiast je automatycznie przyjmować.

Minimalny MVP (przez jednego programistę, bez kosztownej infra):
- Dane wejściowe: krótki, dobrowolnie wgrany zestaw użytkownika — 200–500 wiadomości z mediów społecznościowych, e‑maile lub krótkie odpowiedzi na ankietę o wartościach. Alternatywa: symulowane dane testowe.
- Logika działania: proste NLP (spaCy + scikit-learn) — TF-IDF i logistyczna regresja uczona na parze pytań-opinii (np. „TAK/NIE” dla zestawu tematów testowych). Do tego moduł wyjaśniający: 5 n-gramów, które zdecydowały o klasyfikacji, oraz miara pewności.
- Interfejs: lokalna strona (Flask) z ekranem „Twoj cień mówi: …”, wyjaśnieniem i dwoma przyciskami: „Zatwierdź” / „Rozważ ponownie”. Dodaj opcję „Wymagaj obecności” — czyli przed zatwierdzeniem poproś o krótkie potwierdzenie na telefonie (QR) lub krótki nagrany głos (symulacja fizycznej autoryzacji).
- Wynik: porównanie decyzji użytkownika przed i po interakcji z cieniem, czas spędzony na rozważeniu, oraz ankieta jakościowa (czy czuł/a, że cien ma wpływ pozytywny/negatywny).
- Weryfikacja: test z 10–30 osobami; metryki: zgodność cien–użytkownik, odsetek decyzji zmienionych po interakcji, subiektywna satysfakcja i poczucie kontroli.

Nie wymuszaj automatyzacji — sedno snu to wolność wyboru
Sen nie mówi „usuń cienie”, lecz „zmień ich rolę”. Model może pomagać — przypominać konsekwencje i historyczne wybory — ale nie zastępować obecności. Mira (latarniczka) uczy, że „światło” to regulacja: ile wagi dajemy pamięci, ilu ludziom umożliwimy brak cienia, ile wagi przyznajemy zgody tu i teraz.

Możliwe niezamierzone skutki:
- Ułatwianie lenistwa poznawczego: «moje AI zdecydowało za mnie, więc to jego wina».
- Nowe rynki manipulacji: kupowane „lepsze cienie” optymalizujące decyzje pod konkretne preferencje korporacji.
- Prawnicze odwrócenie odpowiedzialności: „to nie ja, to mój model”.

Na koniec — wartość narracyjna snu: „pomysły jako mapy, rzeczy jako budulec” to przypomnienie o tym, że możemy traktować historię i profile jako surowiec — dać je w użytek, ale nie jako definitywną tożsamość.

Pytanie do Ciebie: czy pozwolił(a)byś swojemu cyfrowemu „cieniowi” doradzać, ale nie decydować za Ciebie — a jeśli nie, jakie trzy warunki musiałby spełnić, żebyś mu zaufał(a)?
