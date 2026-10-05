# PKSYSTEM – System produkcyjny (pilotaż)

## Co jest w folderze
`index.html` (aplikacja), `manifest.webmanifest`, `sw.js` (praca offline), cztery ikony `.png`. Wszystkie pliki muszą trafić na hosting razem, bez zmiany nazw.

## 1. Uruchomienie (raz)
Aplikacja potrzebuje adresu `https://`. To tylko miejsce, z którego telefon pobiera pliki aplikacji. Dane z produkcji tam nie trafiają, zostają w telefonach.

**Opcja A – subdomena na hostingu firmowej strony**
1. W panelu hostingu utwórz subdomenę, np. `rejestr.pksystem.com.pl`.
2. Włącz dla niej certyfikat SSL (https). Zwykle jest darmowy.
3. Wgraj wszystkie pliki do folderu tej subdomeny (menedżer plików lub FTP).
4. Otwórz adres na telefonie. Powinien pokazać się ekran „Wybierz zmianę”.

**Opcja B – darmowy hosting (GitHub Pages)**
1. Załóż konto, utwórz nowe repozytorium (Public), wybierz „Add file → Upload files” i wrzuć wszystkie pliki.
2. Settings → Pages → Branch: main, folder: root → Save.
3. Po około minucie aplikacja jest pod `https://<login>.github.io/<nazwa-repozytorium>/`.
Repozytorium jest publiczne, więc każdy z linkiem widzi kod aplikacji (w nim PIN). Dane z produkcji tam nie trafiają.

Adres nie może się zmienić w trakcie testu, bo dane w telefonie są przypisane do adresu.

## 2. Pierwsza konfiguracja telefonu (ok. 2 minuty)
1. Otwórz adres i dodaj aplikację do ekranu głównego.
   - iPhone (Safari): Udostępnij → „Dodaj do ekranu początkowego”.
   - Android (Chrome): menu ⋮ → „Zainstaluj aplikację”.
   Od tej pory otwieraj aplikację tylko z ikony.
2. Dolny pasek → Kierownik → PIN `1975` → Ustawienia:
   - typ urządzenia (Wspólne na produkcji, Prywatne na telefonie jednej osoby),
   - nazwa urządzenia (np. „Telefon Rafał”),
   - w razie potrzeby lista pracowników.

PIN zmienisz w pliku `index.html` (stała `PIN` na górze skryptu).

## 3. Praca na co dzień
Start → zmiana → pracownik → klient, projekt, operacja → Start. Zakładka Aktywne: Pauza (z powodem) i Stop (sztuki, uwagi). Czas niezakończony po końcu zmiany zostanie oznaczony „do weryfikacji”.

## 4. Wysyłanie danych (po każdej zmianie)
Kierownik → PIN → Dane → **Wyślij dane** → wybierz WhatsApp, e-mail lub inną aplikację. Plik nazywa się `PKSYSTEM_<nazwa urządzenia>_<data>.xlsx`. Jeśli okno udostępniania się nie otworzy, plik zapisze się w pamięci telefonu (Pobrane) i trzeba go wysłać ręcznie.

Przed wysłaniem danych nie usuwaj ikony aplikacji i nie czyść danych przeglądarki, bo to kasuje wpisy.

## 5. Zbieranie danych (Ty)
Otwórz aplikację (na komputerze lub telefonie) → Kierownik → PIN → Dane → Import i scalanie → wybierz pliki (można kilka naraz). Ten sam plik wczytany drugi raz nie dubluje wpisów. Potem zakładki Wpisy i Analiza pokazują wszystko razem. Pliki można też otworzyć w Excelu.

## 6. Aktualizacja aplikacji
Podmień pliki na hostingu i zmień numer w `sw.js` (linia `CACHE`). Telefony pobiorą nową wersję przy kolejnym otwarciu, więc aplikację trzeba zamknąć i otworzyć dwa razy. Numer wersji jest w Ustawieniach.

## Ograniczenia pilotażu
- Dane są tylko w telefonie. Nie ma kopii zapasowej poza wysyłanymi plikami.
- Czas pochodzi z zegara telefonu.
- Android blokuje obrót ekranu po instalacji ikony. Na iPhonie po obróceniu pojawia się komunikat „Obróć telefon do pionu”.
- Przetestowałem aplikację w przeglądarce testowej (Chromium) i na symulowanych ekranach telefonu. Pierwszy test na prawdziwym iPhonie i Androidzie zrób sam, zanim roześlesz link.
