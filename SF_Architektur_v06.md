# Architektur: sebastianfriedrich.de
# Stand: Juni 2026 — v06

---

## PROJEKT

Website für Sebastian Friedrich, Maler
Hosting: Netlify (Account johnhalle, temporär — später eigener Account)
GitHub: johnhalle, Repository `sebastian-friedrich`
Domain: noch zu sichern (sebastianfriedrich.de bevorzugt)
SSL: via Netlify automatisch

Alle Regeln aus `lessons-learned.md` (johnpalatini.de) gelten von Anfang an.

---

## DATEISTRUKTUR

```
index.html              – Startseite (SPA, History-API-Routing)
verfuegbar.html         – Verfügbare Werke (öffentlich, OHNE Preise)
verfuegbar-preise.html  – Verfügbare Werke MIT Preisen (nicht verlinkt, nicht in Sitemap)
portraets.html          – Porträts (gefilterte Werkansicht)
werkarchiv.html         – Gesamtes Werkarchiv (alle Werke, filterbar)
news.html               – News-Übersicht
katalog.html            – Katalog-Seite mit Anmoderation + Reader-Link
reader.html             – Buchblätter-Viewer (aus johnpalatini.de übernommen, angepasst)
vita.html               – Biografie
kontakt.html            – Kontaktformular (Netlify Forms)
admin.html              – CMS-Backend (nicht verlinkt, nicht in Sitemap, nicht in Nav)
data.json               – EINZIGE Datenquelle für alle Seiten
netlify.toml            – HTTP-Headers
_headers                – zusätzliche Headers
sitemap.xml             – eingereicht bei Google (verfuegbar-preise.html NICHT drin)
og-image.png            – Social-Media-Vorschaubild
favicon.ico / .png      – Favicons
fonts/                  – lokale .woff2-Dateien (Inter 300, 400, 500)
images/                 – Werkfotos (.jpg) — auf Cloudinary, URLs in data.json
images/reader/          – Katalog-Seiten (lokal, falls nicht Cloudinary)
pdf/                    – PDFs (Katalog, News-Flyer)
  news/               – News-PDFs (z.B. news-2025-ausstellung-oper-karte.pdf)
```

---

## CLOUDINARY

Cloud Name: `def9qgwtw`
Ordner: `sebastian-friedrich/werke/` (aktuell direkt im Root, ohne Unterordner)
Basis-URL: `https://res.cloudinary.com/def9qgwtw/image/upload/`
Dateiformat: `.jpg` (Cloudinary normalisiert .jpeg → .jpg)

Katalog-Seiten (Reader): ebenfalls direkt im Root, 001.jpg–025.jpg
Upload-Preset: `sebastian-friedrich` (als Default gesetzt)

**Ordnerstruktur (Ziel):**
```
sebastian-friedrich/werke/     – Werkfotos (44 Einträge)
sebastian-friedrich/news/      – Bilder zu News-Einträgen (Titelbild + Galeriefotos)
```
News-Bilder: pro Eintrag beliebig viele Fotos. `titelbild` (ein Bild, für Teaser)
und `galerie` (Array, Vernissage-Fotos usw.) werden separat in data.json geführt.

**Hero-Hintergrundbild:** `senhora-rodriguez-3-2024_ausschnitt.jpg` (beschnittene Version,
im Cloudinary-Root). Wird als CSS `background-image` eingebunden, kein `<img>`-Tag.

**Dateinamenskonvention News-Bilder (Cloudinary):**
```
news-[stichwort]-titelbild.jpg
news-[stichwort]-vernissage-01.jpg
news-[stichwort]-vernissage-02.jpg
```

**PDFs im GitHub-Repo:** Ordner `pdf/news/`
```
pdf/news/news-[stichwort]-[typ].pdf
```
Beispiel: `pdf/news/news-2025-ausstellung-oper-karte.pdf`
URL: `https://sebastianfriedrich.de/pdf/news/news-2025-ausstellung-oper-karte.pdf`

Keine Jahreszahlen in Cloudinary-Dateinamen nötig — die stecken in der JSON-ID.
Bei PDFs sind Jahreszahlen im Dateinamen erlaubt zur Unterscheidung.

Auflösung Werkfotos: 2400px längste Seite, JPEG 85% — ca. 500 KB pro Datei
Für Portfolio-PDF: URL-Parameter `w=1800,q=90` anhängen

---

## DESIGN-KONSTANTEN

```
Hintergrund:  #ffffff
Text:         #111111
Grau hell:    #f5f5f5
Grau mittel:  #e0e0e0
Grau dunkel:  #888888  (NUR für Meta-Infos, nie für Fließtext)
Akzent:       keiner — die Bilder tragen die Seite
Schriften:    Inter (lokal, @font-face)
              Light 300:   Werktitel, Bildunterschriften
              Regular 400: Fließtext, Navigation
              Medium 500:  Labels, Buttons (kein Bold)
max-width:    1400px
Nav-Höhe:     48px
Hamburger ab: 1050px
```

**Grundprinzip:** Typografie tritt zurück. Viel Luft. Keine Akzentfarbe. Die Bilder
sprechen allein. Jede Designentscheidung muss sich fragen lassen: „Drängt sich das
vor das Bild?"

---

## NAVIGATION

Desktop (links): **Sebastian Friedrich** (= Home-Link, kein eigener „Startseite"-Reiter)
Desktop (rechts): Verfügbare Werke · Porträts · Werkarchiv · News · Katalog · Vita · Kontakt
+ Sprachumschalter (DE/EN)

Mobile: Hamburger ab 1050px, Vollbild-Overlay

`verfuegbar-preise.html` erscheint NIE in der Navigation.
`admin.html` erscheint NIE in der Navigation.

Footer: Impressum · Datenschutz · Instagram-Link
Footer-Bereich: Newsletter-Anmeldung (Brevo, dezent, immer sichtbar)

---

## SPRACHUMSCHALTUNG

Identisch zu johnpalatini.de:
- Globale Hilfsfunktion: t(obj, field) — gibt obj[field_en] zurück wenn LANG==='en'
- KRITISCH: Loop-Variablen dürfen NIE 't' heißen
- Übersetzungen als _en-Felder direkt in data.json
- Sprachzustand in localStorage('lang')
- Button zeigt Zielsprache (EN wenn Seite auf DE, DE wenn auf EN)
- document.documentElement.lang wird bei Sprachwechsel aktualisiert
- Institutionsnamen bleiben auf Deutsch auch in EN-Version

---

## DATENSTRUKTUR data.json

Stand: vollständig befüllt (Juni 2026)

```json
{
  "meta": {
    "name": "Sebastian Friedrich",
    "tagline": "Sebastian Friedrich malt Bilder...",   ← befüllt (Rückentext Katalog)
    "tagline_en": "",
    "vita": {
      "text": "...",        ← befüllt (aus Katalog S. 70)
      "text_en": "",
      "ausbildung": "Studium an der Burg Giebichenstein...",
      "ausbildung_en": "Studies at Burg Giebichenstein..."
    },
    "kontakt": {
      "email": "",          ← noch einzutragen
      "instagram": "",      ← noch einzutragen
      "newsletter_list_id": ""  ← nach Brevo-Setup einzutragen
    },
    "admin": {
      "passwordHash": ""    ← noch einzurichten
    }
  },

  "werke": [ ... ],   ← 44 Einträge, vollständig (Cloudinary-URLs, Verfügbarkeit, Serien)

  "katalog": [
    {
      "id":          "sebastian-katalog",
      "titel":       "Sebastian Friedrich. ON STAGE. Malerei",
      "titel_en":    "Sebastian Friedrich. ON STAGE. Paintings",
      "jahr":        2024,
      "text_de":     "...",   ← befüllt (erster Absatz Drobe/Palatini)
      "text_en":     "",
      "autoren":     ["Christian Drobe", "John Palatini"],
      "cover":       "https://res.cloudinary.com/def9qgwtw/image/upload/001.jpg",
      "reader_pfad": "https://res.cloudinary.com/def9qgwtw/image/upload/",
      "pdf":         "pdfs/sebastian-katalog.pdf"
    }
  ],

  "news": [ ... ]   ← 2 Einträge (Stand Juni 2026), vollständig befüllt
}
```

### Werkfelder im Detail

| Feld | Typ | Bedeutung |
|------|-----|-----------|
| `id` | string | Sprechend: `urania-2022` — NIE numerisch |
| `titel` | string | Werktitel (bleibt auf Deutsch) |
| `jahr` | number | Entstehungsjahr |
| `masse` | string | z.B. „40 × 30 cm" |
| `medium` | string | z.B. „Öl auf MDF" |
| `medium_en` | string | z.B. „Oil on MDF" |
| `gerahmt` | boolean | |
| `serie` | string\|null | z.B. „Musen", „Girls", „Atelier" — für Filter |
| `portraet` | boolean | steuert Anzeige auf portraets.html |
| `verfuegbar` | boolean | steuert Anzeige auf verfuegbar.html |
| `preis` | number\|null | optional — nur auf verfuegbar-preise.html sichtbar |
| `neu` | boolean | Badge + Priorisierung auf Startseite |
| `bild` | string | Cloudinary-URL (endet auf .jpg) |

### Serien (in data.json)
`"Musen"` (9 Werke) · `"Girls"` (3) · `"Mythologie"` (2) · `"Atelier"` (4) ·
`"Nachtschicht"` (2) · `"Elise"` (2) · `"Senhora Rodriguez"` (2) · `null` (20)

### News-Felder (final)

```json
{
  "id":           "ausstellung-on-stage-oper-halle-2025",
  "datum":        "2025-09-01",
  "titel":        "Einzelausstellung „ON STAGE" in der Oper Halle",
  "titel_en":     "Solo Exhibition "ON STAGE" at Oper Halle",
  "kategorie":    "Ausstellung",
  "ort":          "Oper Halle",
  "veranstalter": "Hallescher Kunstverein e. V.",
  "zeitraum":     "September 2025 – März 2026",
  "zeitraum_en":  "September 2025 – March 2026",
  "text":         "...",
  "text_en":      "",
  "titelbild":    "",   ← Cloudinary-URL, ein Hauptbild (für Teaser + Hero)
  "galerie":      [],   ← Array von Cloudinary-URLs (Vernissage, Presse usw.)
  "pdf":          "",   ← optional, direkte URL zum PDF
  "url":          "",   ← externer Link (Verlag, HKV-Seite usw.), optional
  "url_label":    "",   ← frei, z.B. "Zur Ausstellung", "Zum Verlag"
  "url_label_en": ""
}
```

**Kategorie:** Freies Textfeld. Vorschläge im Admin: „Ausstellung", „Präsentation",
„Katalog", „Presse", „Blick ins Atelier" — aber jeder beliebige Begriff möglich.

**Bilder in Cloudinary:** Ordner `sebastian-friedrich/news/`
Empfehlung: Dateinamen mit News-ID beginnen, z.B. `ausstellung-on-stage-001.jpg`

| Feld | Typ | Bedeutung |
|------|-----|-----------|
| `id` | string | Sprechend: `ausstellung-on-stage-oper-halle-2025` |
| `datum` | string | ISO 8601: `2025-09-01` (für Sortierung) |
| `titel` | string | Deutscher Titel |
| `titel_en` | string | Englischer Titel |
| `kategorie` | string | Frei; Vorschläge s.o. |
| `ort` | string | Ort der Veranstaltung |
| `veranstalter` | string | Optional |
| `zeitraum` | string | Anzeige-Zeitraum, z.B. „September 2025 – März 2026" |
| `zeitraum_en` | string | |
| `text` | string | Fließtext (Sebastians Ich-Perspektive) |
| `text_en` | string | |
| `titelbild` | string | Eine Cloudinary-URL — erscheint groß auf news.html + Teaser |
| `galerie` | array | 0–n Cloudinary-URLs für Bilderstrecke innerhalb des Eintrags |
| `pdf` | string | Optionale URL zu Flyer/Pressetext |
| `url` | string | Optionaler externer Link |
| `url_label` | string | Beschriftung des Links, frei |
| `url_label_en` | string | |

---

## SEITEN

### index.html — Startseite (gebaut, Juni 2026)

Fünf Blöcke:

1. **Hero (Vollbild)** — `senhora-rodriguez-3-2024_ausschnitt.jpg` als Vollbild-Background.
   Name „Sebastian Friedrich" groß rechts oben, darunter „MALER". Scroll-Pfeil unten mittig.
   Nav transparent über dem Bild, wird weiß beim Scrollen.
   Responsive: Tablet-Hochformat eigene background-position, Smartphone Text unten links.
   Hamburger-Breakpoint: 1050px.

2. **Neueste Werke** — Alle Werke `neu: true` + Fallback aktuelles/Vorjahr.
   Horizontaler Slider mit Pfeil-Buttons. Karten 320px breit, feste Bildhöhe 380px (Bild oben).
   Klick öffnet Lightbox mit Kontext-Navigation.

3. **Aktuelles** — Neuester News-Eintrag, zweikolumnig (Bild + Text).

4. **Katalog-Teaser** — Cover + gekürzter Text + zwei Buttons.

5. **Newsletter** — Dezent auf grauem Hintergrund, Brevo-Slot vorbereitet.

**Lightbox:** Dunkler Hintergrund, weißes Info-Panel rechts (280px), feste Gesamtbreite
`min(1100px, calc(100vw - 112px))`, Bild mit `padding: 40px` rundum. Pfeiltasten + Keyboard.
Kontext-Navigation: jede Seite übergibt eigene ID-Liste.

### verfuegbar.html — Verfügbare Werke (öffentlich)

Alle Werke mit `verfuegbar: true`. Grid. Kein Preis.
Lightbox: Titel, Jahr, Maße, Medium, Rahmung + „Für Anfragen: [email]"

### verfuegbar-preise.html — Verfügbare Werke mit Preisen

Wie verfuegbar.html, aber `preis` sichtbar.
NICHT verlinkt · NICHT in Nav · NICHT in sitemap.xml
Verwendung: Link per E-Mail an Interessenten.

### portraets.html — Porträts

Alle Werke mit `portraet: true`.

### werkarchiv.html — Werkarchiv

Alle 44 Werke, filterbar nach Serie · Jahr · Medium.
**Layout: noch offen** — individuelle Lösung, wird nach allen anderen Seiten
entwickelt. Kein Masonry. Entscheidung erst mit echten Bildern + Rücksprache Sebastian.

### news.html — News (noch zu bauen)

Chronologisch absteigend nach `datum`.
Jeder Eintrag: Kategorie-Badge · Zeitraum · Titel · Ort · Kurztext · Titelbild.
Detailansicht per History-API: Fließtext, Bildergalerie (Lightbox), PDF-Viewer (`<iframe>`),
externer Link mit `url_label`.
PDF-Viewer: direkter `<iframe>` auf GitHub-URL (`pdf/news/...`), kein Drittanbieter.

### katalog.html — Katalog

Cover groß · Titel, Jahr, Autoren, Anmoderationstext (aus data.json)
Button: „Im Katalog blättern" → reader.html?buch=sebastian-katalog
Button: „PDF herunterladen" → `pdf/sebastian-katalog.pdf` (HEAD-Check)

### reader.html — Buchblätter-Viewer

Aus johnpalatini.de übernommen, Design angepasst.
Katalog: 25 Seiten (001.jpg–025.jpg), auf Cloudinary.
Aufruf: /reader.html?buch=sebastian-katalog

### vita.html — Biografie

Zweispaltig Desktop (Text + Porträtfoto), einspaltig Mobile.

### kontakt.html — Kontakt

Netlify Forms · DE/EN · E-Mail sichtbar · Instagram-Link.

---

## NEWSLETTER — Brevo

**Footer-Formular:** auf jeder Seite, sehr dezent. E-Mail + Button + DSGVO.

**Popup:**
- Erscheint nach 45 Sekunden Inaktivität
- Nur einmal pro Session (sessionStorage-Flag)
- Schließbar per X
- Design: zentriertes Modal, weißer Kasten

---

## ADMIN-PANEL — admin.html

Passwortschutz: SHA-256-Hash in data.json (admin.passwordHash).
GitHub PAT im localStorage (pro Gerät einmal eintragen).
Speichern → data.json via GitHub API → Netlify baut → ~2 Min. live.

### Kategorien
- Werke (anlegen, bearbeiten, löschen, sortieren)
- News (anlegen, bearbeiten, löschen)
- Katalog (Metadaten, Texte)
- Vita & Meta (Kontakt, Biografie, Tagline)
- Einstellungen (Passwort, GitHub-Konfiguration)

### Auto-Übersetzung (DE → EN)

Gilt für alle mehrsprachigen Felder in allen Kategorien.
**Auslöser:** `blur`-Event auf dem deutschen Textfeld — beim Verlassen wird das
EN-Feld automatisch via Claude API befüllt, sofern es noch leer ist.
Bereits befüllte EN-Felder werden NICHT überschrieben (bewusster Schutz).
Nach der Auto-Übersetzung ist das EN-Feld editierbar — John prüft und passt an.
Ladezustand: EN-Feld zeigt „Übersetze…" während der API-Call läuft.

Betroffene Felder News: `titel_en`, `zeitraum_en`, `text_en`, `url_label_en`
Betroffene Felder Werke: `medium_en`
Betroffene Felder Meta/Vita: `tagline_en`, `vita.text_en`, `vita.ausbildung_en`

### News-Verwaltung im Admin

- Neuen Eintrag anlegen mit allen Feldern
- `kategorie`: Freies Textfeld mit Datalist-Vorschlägen:
  „Ausstellung", „Präsentation", „Katalog", „Presse", „Blick ins Atelier"
- `titelbild`: Cloudinary-URL eintragen (manuell nach Upload)
- `galerie`: URLs zeilenweise eingeben, werden als Array gespeichert
- `pdf`: Pfad im Repo, z.B. `pdf/news/news-2025-ausstellung-oper-karte.pdf`
  (wird als `/pdf/news/...` relativ zur Domain aufgerufen)
- `url` + `url_label`: frei, optional
- Sortierung: chronologisch nach `datum`, neueste zuerst (automatisch)

### Portfolio-Generator

Im Admin: „Portfolio erstellen"
1. Werke per Klick auswählen (Thumbnail-Grid)
2. Reihenfolge per Drag & Drop
3. Schalter: Mit / Ohne Preise
4. „PDF generieren & herunterladen"

Technisch: `jsPDF` + `html2canvas`, clientseitig, kein Server.
PDF-Inhalt: Deckblatt · pro Werk: Bild + Titel/Jahr/Maße/Medium/Rahmung (±Preis) · Kontaktseite
Bilder von Cloudinary mit `w=1800,q=90`.
Fallback auf reine jsPDF-Lösung falls html2canvas instabil.

---

## SEO

Meta-Tags: description, keywords, author
Open Graph: og:type=website, og:description, og:locale:alternate
Twitter Cards: summary_large_image
Schema.org Person + Schema.org VisualArtwork (pro Werk)
Google Search Console: nach Go-Live verifizieren, sitemap.xml einreichen

---

## TECHNISCHE KONVENTIONEN

- Daten NUR in data.json, NIEMALS in HTML einbetten
- Werk-IDs und Katalog-IDs: sprechend, stabil, nie numerisch
- Bilder auf Cloudinary als .jpg (Cloudinary-Standard)
- Anführungszeichen im JSON-Text: gerade " verwenden (typografische „..." brechen JSON)
- Inter: lokale @font-face (fonts/-Ordner)
- Loop-Variablen NIE 't' (Konflikt mit t()-Übersetzungsfunktion)
- Nach Edits: grep -c "<body>" datei.html → muss 1 ergeben
- 100dvh statt 100vh (Mobile)
- Auto-Übersetzung im Admin: blur auf DE-Feld → Claude API → EN-Feld (nur wenn leer)
- PDF-Viewer: direkter <iframe> — KEIN mozilla.github.io
- HEAD-Check für bedingte PDF-Link-Anzeige
- atob() für UTF-8 immer via TextDecoder
- #888 nie für Fließtext
- VOR JEDEM EDIT: aktuelle Dateien anfordern

---

## OFFENE PUNKTE

1. **Domain sichern** — sebastianfriedrich.de
2. **Inter-Fonts lokal** — Gewichte 300/400/500 als .woff2 in fonts/-Ordner (Go-Live-Blocker)
3. **Netlify-Konto verbinden** — Repository sebastian-friedrich deployen
4. **GitHub PAT anlegen** — fine-grained, nur Repository sebastian-friedrich, Contents Read & Write
5. **News-Bilder vervollständigen** — Katalogpräsentation 2026: Galerie noch leer
6. **news-2026-katalog-oper.png** — liegt im Cloudinary-Root statt in `sebastian-friedrich/news/`;
   nach Upload in korrekten Ordner URL in data.json korrigieren (aktuell ohne Unterordner)
7. **E-Mail + Instagram** — in data.json meta.kontakt eintragen
8. **Admin-Passwort** — SHA-256-Hash setzen
9. **Brevo** — Account prüfen, List-ID in data.json eintragen
10. **news.html** — noch zu bauen
11. **Weitere Seiten** — verfuegbar.html, portraets.html, werkarchiv.html, katalog.html,
    vita.html, kontakt.html, admin.html, reader.html
12. **Werkarchiv-Layout** — individuelle Lösung, zuletzt entwickeln
13. **EN-Übersetzungen** — tagline_en, vita.text_en, medium_en-Felder
14. **Katalog-PDF** — in pdf/-Ordner ablegen
15. **Hero-Bild** — `senhora-rodriguez-3-2024_ausschnitt.jpg` ist aktuell im Cloudinary-Root;
    sollte in `sebastian-friedrich/` verschoben werden

---

## WORKFLOW IM ALLTAG

**Inhalte:** Admin-Panel → Speichern → ~2 Min. live
**Code/Design:** HTML/JS mit Claude → GitHub Desktop → Push → Netlify
**Portfolio:** Admin → Portfolio erstellen → Auswahl → PDF
**Preisliste:** URL /verfuegbar-preise.html per E-Mail an Interessenten
