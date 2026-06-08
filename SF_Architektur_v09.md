# SF Website - Architektur v09
*Stand: 08. Juni 2026*  
*Code-Stand: Website-Paket v31*

Diese Fassung ersetzt die Architektur v08 und dokumentiert den aktuellen Stand der Website für den Maler Sebastian Friedrich. Grundlage ist die Architekturdatei v08; ergänzt sind die seitdem vorgenommenen Stabilisierungsschritte und Feinkorrekturen aus den Website-Paketen v24 bis v28: CSS-/Header-Stabilisierung, mobil konsolidierte Unterseitenüberschriften, korrigiertes Hero-/Header-Verhalten, Reader- und Lightbox-Feinschliff, mobile Startseitenregeln, Katalogaufsatz-Typografie, Autorenreihenfolge und weitere responsive Detailkorrekturen.

---

## 1. Dateistruktur

```text
/
├── index.html              ← Startseite: Hero, Neueste Werke, Aktuelles, Katalog-Teaser, Newsletter
├── werke.html              ← Werkübersicht mit Filter und Werk-Lightbox
├── news.html               ← News-Seite mit chronologischen Events und Bild-Lightbox
├── katalog.html            ← Katalog-Unterseite, Bestellbutton, Reader-Overlay, Aufsatz
├── reader.html             ← Katalogreader; Fallback-Seite und eingebetteter Overlay-Reader
├── vita.html               ← Vita-Seite
├── kontakt.html            ← Kontaktseite mit Netlify-Formular
├── danke.html              ← Dankeseite nach Formularversand
├── data.json               ← zentrale Datenquelle für Werke, Katalog, News, Vita, Kontakt, I18N
├── sf-base.css             ← globale Styles: Raster, Nav, Hero, Footer, Buttons, Lightboxen, Modals
├── sf-base.js              ← globale Logik: I18N, Nav, Footer, Werk-Lightbox, Kontaktmodal
├── fonts/                  ← lokale Inter-Webfonts
└── SF_Architektur_v09.md   ← diese Dokumentation
```

Nicht Bestandteil der aktiven Navigation:

```text
portraets.html
```

Das Datenfeld `portraet` kann in `data.json` erhalten bleiben, wird derzeit aber nicht über einen eigenen Navigationsreiter ausgespielt.

---

## 2. Grundprinzipien

### 2.1 Eine Datenquelle

`data.json` ist die zentrale Quelle für:

- Werke
- Werkmetadaten
- Verfügbarkeiten
- Vita
- Kontakt-/Social-Daten
- News
- Katalogdaten
- Katalogaufsatz deutsch/englisch
- Reader-Konfiguration
- Formularvorlagen
- englische Sprachfelder

Neue Inhalte sollen bevorzugt in `data.json` ergänzt werden. HTML-Dateien sollen Struktur und Rendering-Logik enthalten, aber möglichst keine redaktionellen Inhalte duplizieren.

### 2.2 Gemeinsame Basisdateien

Alle Seiten binden ein:

```html
<link rel="stylesheet" href="sf-base.css?v=31">
<script src="sf-base.js?v=31"></script>
```

Der Versionsparameter dient als Cache-Busting. Bei relevanten CSS-/JS-Änderungen Versionsnummer erhöhen.

### 2.3 Lokale Fonts

Keine Google Fonts. Inter wird lokal geladen:

```text
fonts/webfonts/inter-latin-300-normal.woff2
fonts/webfonts/inter-latin-400-normal.woff2
fonts/webfonts/inter-latin-500-normal.woff2
```

---

## 3. Zentrales Layout-Raster

### 3.1 Desktop-Breite

Die normale Website ist bewusst schmal geführt. Zentrale Regel in `sf-base.css`:

```css
:root {
  --max-w: 900px;
  --site-width: calc(100vw - 48px);
}
```

Diese Breite gilt für:

- Header-Inhalt
- Hero-Container der Startseite
- Startseiten-Sektionen
- Startseiten-Slider
- Unterseiten
- Footer

### 3.2 Reader-Ausnahme

Der Katalogreader ist eine funktionale Ausnahme. Im normalen Seitenfluss bleibt die Website 900 px breit. Der Reader öffnet auf der Katalogseite als Fullscreen-Overlay und darf darin die volle verfügbare Breite und Höhe nutzen.

Grund: Doppelseiten müssen lesbar bleiben; der Reader ist kein normaler Contentblock, sondern ein temporärer Lese-/Browse-Modus.

---

## 4. Navigation

### 4.1 Aktive Reiter

| Reiter  | Datei          | Status |
|---------|----------------|--------|
| Werke   | `werke.html`   | fertig |
| News    | `news.html`    | fertig |
| Katalog | `katalog.html` | fertig |
| Vita    | `vita.html`    | fertig |
| Kontakt | `kontakt.html` | fertig |

Der Reiter `Porträts` wurde entfernt.

### 4.2 Nav-Verhalten nach v24/v25

Die Header-Logik wurde nach den CSS-Aufräumversuchen stabilisiert.

Aktueller Sollzustand:

- Startseite mit Hero:
  - Header ist im Hero nicht sichtbar.
  - `nav.over-hero:not(.scrolled)` ist transparent, `opacity: 0`, `pointer-events: none`.
  - Header erscheint erst nach dem Hero als normale weiße Navigationsleiste.
- Unterseiten:
  - Nav ist immer sichtbar (`always-visible`).
  - weißer Hintergrund, schwarze Schrift, Trennlinie unten.
- Mobile/Tablet:
  - Hamburger-Menü.
  - Menü schließt bei:
    - Klick auf einen Menüpunkt
    - Klick auf freie Overlay-Fläche
    - `Escape`

Wichtig: Keine weiße Header-Schrift über dem Hero anzeigen. Das war ein Zwischenstand, wurde aber verworfen.

---

## 5. Einheitliche Unterseiten-Kopfzone

Alle Unterseiten verwenden eine gemeinsame Kopfzonenlogik:

- `Werke`
- `News`
- `Katalog`
- `Vita`
- `Kontakt`

Ziel:

- gleiche Oberkante
- gleiche Titelgröße
- gleiche Titelzeile
- gleiche Trennlinie
- gleicher Abstand zwischen Trennlinie und Inhaltsbeginn

Maßstab für den Inhaltsbeginn ist die Vita-Seite.

### 5.1 Technische Stabilisierung v24

In v24 wurden die konkurrierenden Titelregeln aus den Unterseiten reduziert und eine autoritative zentrale Regel in `sf-base.css` etabliert.

Wichtig ist:

- keine seitenspezifischen Regeln mehr für `page-title`, `vita-title`, `kontakt-title`, `katalog-page-title`, die Oberkante, Schriftgröße oder Trennlinienposition verändern;
- seitenspezifische CSS-Blöcke nur noch für echte Seitenelemente.

### 5.2 Mobile englische Langtitel

Englische Langtitel wie `Catalogue` und `Biography` dürfen die Smartphone-Seite nicht verbreitern. Dafür gibt es gezielte mobile Größenregeln.

Grundregel:

- Nicht die gesamte englische Website kleiner setzen.
- Nur lange Unterseitenüberschriften gezielt verkleinern.
- Schreibweise: `Catalogue`, nicht `Catalouge`.

### 5.3 Werke-Ausnahme innerhalb derselben Kopfzone

Auf `werke.html` sitzt der Filter rechts neben der Überschrift, damit vor den Bildern nicht unnötig viel vertikaler Raum entsteht.

Filter:

```text
Alle Werke
Verfügbare Werke
```

Der Filter darf die Höhe der Kopfzone nicht unkontrolliert verschieben.

---

## 6. Startseite (`index.html`)

### 6.1 Hero

Der Hero ist ein breitformatiger, beschnittener Bildkörper innerhalb des 900-px-Rasters.

Desktop:

- Hero nicht viewportbreit, sondern Raster-breit.
- Bild oben und unten beschnitten, damit der Hero querformatiger wirkt.
- Name im Hero weiß, rechtsbündig, zweizeilig:
  - `Sebastian`
  - `Friedrich`
- Zusatz `Maler` / `Painter` unter dem Namen.
- Hero-Schrift sitzt im freien rechten Bildraum.
- Scroll-Hinweis bleibt innerhalb des sichtbaren Hero-Bereichs.

Tablet:

- Hero-Name bleibt zweizeilig.
- Schrift skaliert responsiv.

Mobile:

- Hero bleibt eigenständig geregelt.
- Schrift weiß, linksbündig unten.
- Diese Smartphone-Komposition soll erhalten bleiben.

### 6.2 Header am Hero

Nach v25 gilt:

- Im Hero keine Header-Anzeige.
- Header erscheint erst nach Verlassen des Hero-Bereichs.
- Kein `over-hero`-Overlay mit weißer Navigation.

### 6.3 Neueste Werke

Startseiten-Slider:

- zeigt ausgewählte neue Werke.
- Desktop: mehrere Werke innerhalb des 900-px-Rasters.
- Smartphone: genau ein Werk sichtbar, zentriert.
- Swipe auf Smartphone: ein Swipe führt genau zum nächsten/vorherigen Werk.
- Keine halb sichtbaren Nachbarbilder im Mobile-Slider.
- Der Hinweistext `Nach links wischen` wurde entfernt.

Aktuelle Navigationslogik:

- Pfeile unter dem Werkbild.
- Pfeile sind funktional, nicht dekorativ.
- Linker Pfeil wird ausgeblendet, wenn kein vorheriges Werk existiert.
- Rechter Pfeil wird ausgeblendet, wenn kein folgendes Werk existiert.
- Desktop wurde an Smartphone angeglichen:
  - keine Pfeile mehr im Bild;
  - Orientierungspfeile unter dem Slider.

Mobile Feinschliff v27/v28:

- Bildbeschreibung unter `Latest Works` / `Neueste Werke` ist zentriert.
- Optik orientiert sich an der Werke-Rubrik.
- Abstand zwischen Bildbeschreibung und Pfeilen reduziert, damit bei Querformaten nicht zu viel Weißraum entsteht.
- Der Abstand zwischen kleiner Rubriküberschrift und Bild ist einheitlicher und nicht zu groß.

Button rechts:

```text
Alle Werke
All Works
```

### 6.4 Aktuelles

Zeigt automatisch den jüngsten News-Eintrag aus `data.json`.

- Der Link auf der Kachel führt zur News-Seite.
- Externe Eventlinks werden auf der Startseite nicht angezeigt.
- Externe Links erscheinen erst auf `news.html`.

Button rechts:

```text
Alle News
All News
```

Mobile Feinschliff:

- `Latest` / `Aktuelles` und `All News` / `Alle News` wurden etwas tiefer gesetzt.
- Abstand zwischen kleiner Rubriküberschrift und folgendem Bild soll konsistent zum Bereich `Latest Works` sein.

### 6.5 Katalog-Teaser

Startseitenangaben:

```text
Sebastian Friedrich: ON STAGE. Malerei
2026 · Hrsg. v. John Palatini
```

Englisch:

```text
Sebastian Friedrich: ON STAGE. Paintings
2026 · Ed. by John Palatini
```

Drobe wird auf der Startseite nicht in der Kurzmeta genannt. Die Autoren erscheinen auf der Katalogseite.

Teaser deutsch:

```text
Der Katalog ist 2026 erschienen und vermittelt erstmals einen repräsentativen Überblick zum Werk Sebastian Friedrichs.
```

Teaser englisch liegt in `data.json`.

### 6.6 Newsletter

Der Newsletter-Bereich ist weiterhin Platzhalter / Frontend-Struktur.

Mobile Feinschliff v26:

- Input und Button sind in der Smartphone-Ansicht gleichmäßiger in das Raster eingepasst.
- Abstand zum Rand ist symmetrisch.
- Button sitzt nicht mehr unruhig zum Eingabefeld.

---

## 7. Werke-Seite (`werke.html`)

### 7.1 Sortierung

- Immer nach Jahr absteigend.
- Jüngste Werke oben.
- Reihen können über das Feld `reihe` gruppiert werden.

### 7.2 Filter

Filterlogik:

```text
Alle Werke
Verfügbare Werke
```

URL-Parameter:

```text
?filter=verfuegbar
```

### 7.3 Größenlogik

Werkbilder sind nicht gleich groß. Die sichtbare Größe orientiert sich an `groesse`:

| Klasse | Bedeutung | Anzeigeprinzip |
|--------|-----------|----------------|
| `xs` | sehr klein | kleinste Bildgruppe |
| `s`  | klein     | proportional größer |
| `m`  | mittel    | proportional größer |
| `l`  | groß      | größte Bildgruppe |

Die vier Gruppen wurden mehrfach proportional hochskaliert. Wichtig: Die Relationen untereinander müssen erhalten bleiben.

### 7.4 Desktop-Layout

- Wechselndes Links-Rechts-Layout.
- Bild und Werkdaten bilden eine Werkzeile.
- Bildposition und Textposition wechseln.
- Meta-Liste zeigt nur relevante Felder.
- Button `Anfrage stellen` wird nur angezeigt, wenn das Werk verfügbar ist.

### 7.5 Mobile Layout

- Werke werden gestapelt.
- Bild oben, Text darunter.
- Nicht jedes Bild füllt automatisch die volle Breite.
- Nur große Werke dürfen maximal breit erscheinen; kleine Werke bleiben sichtbar kleiner.
- Werkbeschreibung orientiert sich am reduzierten, zentrierten Stil:
  - Titel
  - Jahr
  - Medium
  - Maße
  - ggf. Anfragebutton

### 7.6 Werk-Lightbox

- Klick auf ein Werkbild öffnet Werk-Lightbox.
- Context = aktuell gefilterte/sortierte Werkliste.
- Zählung oben mittig auf Höhe des X.
- Pfeile links/rechts neben der Zählung, sofern mehrere Werke im Context vorhanden sind.
- Keyboard-Navigation: `ArrowLeft`, `ArrowRight`, `Escape`.
- Mobile: Swipe-Navigation.

Aktueller Feinschliff v26-v28:

- Mobile Lightbox folgt der Ordnung:
  1. Navigation / X
  2. Bild
  3. Informationen
- Navigation und X wurden auf Mobile etwas tiefer gesetzt, damit sie nicht am oberen Rand kleben.
- Unterer Infobereich ist auf Mobile statisch in der Höhe.
- Der Infobereich variiert nicht mehr, wenn Felder wie `Reihe` oder `Anfrage senden` vorhanden oder nicht vorhanden sind.
- Nicht vorhandene Felder werden ausgeblendet, der Infobereich bleibt aber gleich hoch.
- Der Bildbereich nutzt den verbleibenden Raum.
- Bild wird links/rechts und oben/unten zentriert.
- Desktop-Lightbox: Navigation minimal tiefer gesetzt, sonst keine strukturelle Änderung.

---

## 8. News-Seite (`news.html`)

### 8.1 Datenquelle

News liegen in `data.json` als Array `news`.

Aktuelle Einträge: 5.

Sortierung:

- jüngste Veranstaltung oben
- `Tour de Franz` ist aktuell der jüngste Eintrag

### 8.2 News-Datenmodell

```json
{
  "id": "tour-de-franz-2026",
  "datum": "2026-05-30",
  "jahr": 2026,
  "kategorie": "Offenes Atelier",
  "kategorie_en": "Open Studio",
  "titel": "Tour de Franz",
  "titel_en": "Tour de Franz",
  "ort": "Franz-Flemming-Straße, Leipzig",
  "veranstalter": "Teilnehmende",
  "zeitraum": "30.–31. Mai 2026",
  "zeitraum_en": "30–31 May 2026",
  "text": "...",
  "text_en": "...",
  "titelbild": "https://res.cloudinary.com/...",
  "bilder": [
    {
      "src": "https://res.cloudinary.com/...",
      "beschreibung": "",
      "beschreibung_en": "",
      "copyright": ""
    }
  ],
  "pdf": "",
  "url": "",
  "url_label": "Website ...",
  "url_label_en": "Website ...",
  "tags": ["Offenes Atelier", "Leipzig"],
  "tags_en": ["Open Studio", "Leipzig"]
}
```

### 8.3 Leere Felder

Leere Felder werden nicht angezeigt.

Das gilt besonders für:

- Bildbeschreibung
- Bildbeschreibung Englisch
- Copyright
- PDF
- externe URL

### 8.4 News-Lightbox

- Bei einem oder mehreren News-Bildern öffnet Klick die Bild-Lightbox.
- Bilder können durchgeklickt/geswiped werden.
- Zählung oben mittig auf Höhe des X.
- Pfeile links/rechts neben der Zählung, sofern mehrere Bilder vorhanden sind.
- Beschreibung/Copyright werden nur angezeigt, wenn Felder gefüllt sind.

### 8.5 Mobile Abstandskorrekturen

In v26 wurden am Ende der News-Seite zusätzliche Abstände gesetzt:

- mehr Abstand zwischen letztem Bild und Footer-/Trennlinie;
- Footer nicht direkt an die letzte Bildgruppe gedrängt.

---

## 9. Katalog-Seite (`katalog.html`)

### 9.1 Katalogdaten

Katalogdaten liegen in `data.json` im Array `katalog`.

Aktueller Katalog:

```text
Sebastian Friedrich: ON STAGE. Malerei
2026
Hrsg. v. John Palatini
Texte: John Palatini, Christian Drobe
Mitteldeutscher Verlag, Halle (Saale)
ISBN 978-3-68948-133-9
Hallescher Kunstverein, Band 128
Preis: 20 €
```

Englisch:

```text
Sebastian Friedrich: ON STAGE. Paintings
2026
Edited by John Palatini
Texts: John Palatini, Christian Drobe
Mitteldeutscher Verlag, Halle (Saale)
ISBN 978-3-68948-133-9
Hallescher Kunstverein, Volume 128
Price: €20
```

Jahr und Preis werden typografisch nicht fett gesetzt.

### 9.2 Katalog-Unterseite

Die Seite beginnt mit der einheitlichen Unterseitenüberschrift:

```text
Katalog
Catalogue
```

Danach:

- Cover links
- bibliografische Angaben rechts
- Button `Im Katalog blättern` / `Browse catalogue`
- Button `Katalog bestellen` / `Order catalogue`

Mobile Feinschliff v26-v28:

- Buttons dürfen nicht auf der grauen Trennlinie sitzen.
- Unter den Buttons ist zusätzlicher Abstand gesetzt.
- Die Katalog-Hero-Sektion erhält auf Mobile mehr Luft vor der Trennlinie.

### 9.3 Katalog bestellen

`Katalog bestellen` öffnet das globale Kontaktformular als Modal.

Betreff und Nachricht werden aus `data.json` befüllt:

```json
"bestellen_betreff"
"bestellen_nachricht"
"bestellen_betreff_en"
"bestellen_nachricht_en"
```

### 9.4 Aufsatz

Der vollständige Aufsatz liegt in `data.json`:

```json
"aufsatz": {
  "titel": "ON STAGE / BACKSTAGE",
  "untertitel": "Sebastian Friedrichs Malerei inszenierter Authentizität",
  "titel_en": "ON STAGE / BACKSTAGE",
  "untertitel_en": "Sebastian Friedrich’s Painting of Staged Authenticity",
  "autoren": ["John Palatini", "Christian Drobe"],
  "blocks": [
    {
      "type": "p",
      "text": "...",
      "text_en": "..."
    }
  ]
}
```

Die Katalogseite rendert sprachabhängig `text` oder `text_en`.

Aktueller Feinschliff v27:

- Aufsatz-Schriftgröße wurde vereinheitlicht.
- Folgeabsätze wechseln nicht mehr auf kleinere Schrift.
- Größere Leseschrift wurde beibehalten.
- Autorenreihenfolge: `John Palatini, Christian Drobe`.

### 9.5 Werkabbildung im Aufsatz

Das Werk `Maske` ist im Aufsatz als Werkzeile eingebunden:

- Bild links
- Werkdaten rechts
- Klick auf Bild öffnet die Werk-Lightbox für `Maske`

---

## 10. Katalog-Reader (`reader.html` + Overlay)

### 10.1 Reader-Button

Auf `katalog.html`:

```text
Im Katalog blättern
Browse catalogue
```

Der Button öffnet ein Fullscreen-Overlay.

### 10.2 Overlay-Verhalten

- Fullscreen-Modal über der Katalogseite.
- Iframe lädt `reader.html?buch=sebastian-katalog&embed=1`.
- Oben rechts fest sichtbares `X`.
- `Escape` schließt den Reader.
- Hintergrundseite wird gegen Scrollen gesperrt.
- Der graue Kreis um das X bleibt sichtbar und verschwindet beim Hover nicht ins Weiß.

### 10.3 Reader-Seiten

Die Seitenbilder liegen auf Cloudinary.

```json
"reader_base_url": "https://res.cloudinary.com/def9qgwtw/image/upload/v1780737694/",
"reader_total_pages": 25
```

Reader erzeugt Seiten:

```text
001.jpg
002.jpg
...
025.jpg
```

Später können weitere Seiten durch Erhöhen von `reader_total_pages` und Hochladen der entsprechenden Dateien ergänzt werden.

### 10.4 Doppelseitenlogik

- Cover: Einzelseite.
- Danach Doppelseiten.
- Auch mobil sollen Doppelseiten angezeigt werden, nicht nur Einzelseiten.
- Thumbnail-Leiste zeigt Seitenspreads.

### 10.5 Fallback

`reader.html` bleibt als eigenständige Seite nutzbar, falls Overlay/iframe nicht verwendet wird.

---

## 11. Vita-Seite (`vita.html`)

### 11.1 Inhalt

Vita basiert auf dem Katalogtext:

- geboren 1987
- Studium 2009-2018 an der Burg Giebichenstein Kunsthochschule Halle
- lebt und arbeitet in Leipzig
- Ausstellungen u. a. Hallescher Kunstverein, Art Karlsruhe, Galerie X23, Galerie Westphal Berlin, Galerie Irrgang

### 11.2 Struktur

- Einheitliche Unterseitenüberschrift `Vita` / `Biography`.
- Keine zusätzliche Zwischenüberschrift `Biografie`.
- Textspalte + Faktenspalte.
- Inhaltsbeginn nach Trennlinie dient als Referenz für alle Unterseiten.

Englische Vita liegt in `data.json`.

---

## 12. Kontaktseite und Kontaktformular

### 12.1 Kontaktseite

`kontakt.html` enthält:

- einheitliche Unterseitenüberschrift `Kontakt` / `Contact`
- Kontaktformular
- Instagram-Link
- keine sichtbare E-Mail-Adresse

Instagram:

```text
https://www.instagram.com/sebastiano_friedrich/
```

### 12.2 Formulartechnik

Netlify Forms:

- Formularname: `kontakt`
- Versand über Netlify Forms
- Weiterleitung auf `danke.html`
- E-Mail-Benachrichtigung muss in Netlify konfiguriert werden
- Empfängeradresse steht nicht im öffentlichen Code

### 12.3 Anfrageformular als Modal

Alle Buttons `Anfrage stellen` / `Send enquiry` öffnen das globale Kontaktmodal.

Bei Werk-Anfrage:

- Betreff wird mit Bildtitel/Jahr vorbelegt.
- Nachricht enthält Werkdaten.

Bei Katalog-Bestellung:

- Betreff und Nachricht kommen aus Katalogdaten in `data.json`.

### 12.4 Button-Stil

`Anfrage stellen` wurde zurückhaltender gestaltet:

- weißer Grund
- schwarze Umrandung
- schwarze Schrift
- Hover: dezente Invertierung

Formular-Submit-Buttons wie `Nachricht senden` / `Send message` bleiben als strukturell stärkere schwarze Buttons zulässig.

### 12.5 Mobile Feinschliff

In v26 wurde der Abstand unter dem Formular korrigiert:

- Der Button `Send message` / `Nachricht senden` soll nicht zwischen Textbox und grauer Footer-Linie eingeklemmt wirken.
- Kontaktformular und Footer erhalten auf Mobile mehr Luft.

---

## 13. Sprachlogik / I18N

### 13.1 Grundregel

Sprache wird über `localStorage` gespeichert und über den EN/DE-Schalter gewechselt.

Das HTML-Attribut `lang` wird aktualisiert.

### 13.2 Datenfelder

Übersetzungen liegen mit `_en`-Suffix in `data.json`, z. B.:

```json
"tagline_en"
"medium_en"
"text_en"
"titel_en"
"zeitraum_en"
"tags_en"
"beschreibung_en"
```

### 13.3 Bild- und Werktitel

Grundregel:

> Bildtitel und Werktitel werden nicht übersetzt.

Ausnahme nur, wenn bewusst anders entschieden.

### 13.4 Übersetzter Katalogaufsatz

Der vollständige Aufsatz liegt deutsch und englisch in `data.json`. Beim Rendern wird sprachabhängig gewählt:

- Deutsch: `text`
- Englisch: `text_en`

### 13.5 Leere englische Felder

Falls ein englisches Feld fehlt oder leer ist, soll die deutsche Fassung nicht unkontrolliert mit englischer UI vermischt werden. Bei neuen Inhalten daher immer englische Felder mitpflegen oder bewusst Fallback definieren.

---

## 14. Lightboxen

### 14.1 Werk-Lightbox

Global in `sf-base.js` und `sf-base.css`.

Anforderungen:

- Bildbereich + Info-Panel.
- X oben rechts.
- Zählung oben mittig.
- Pfeile links/rechts neben Zählung, wenn mehrere Werke im Context.
- `Escape` schließt.
- Arrow-Keys wechseln.
- Swipe auf mobilen Geräten.

Aktueller Zustand v28:

- Mobile Navigation und X etwas tiefer gesetzt.
- Mobiler Info-Bereich statisch hoch.
- Bildbereich nutzt den verbleibenden Raum.
- Bild ist zentriert.
- Nicht vorhandene Felder werden ausgeblendet, ohne die Gesamthöhe des Infobereichs zu verändern.
- Desktop nur minimal in der vertikalen Position der Navigation angepasst.

### 14.2 News-Lightbox

Ähnliche Logik wie Werk-Lightbox, aber für News-Bilder:

- Bildtitel/Eventtitel
- Zählung
- Pfeile
- optionale Beschreibung
- optionales Copyright

### 14.3 Reader-Overlay ist keine normale Lightbox

Reader-Overlay ist ein eigener Fullscreen-Modus mit iframe und eigenem X.

---

## 15. Bilder / Cloudinary

Alle Inhaltsbilder liegen auf Cloudinary.

Aktuelle Bildtypen:

- Werkbilder
- Newsbilder
- Katalogcover
- Katalogreader-Seiten

Empfehlung für spätere Optimierung:

- Cloudinary-Transformationen für `f_auto`, `q_auto`, responsive Breiten nutzen.
- Für besonders große News-/Werkbilder differenzierte Derivate erzeugen.

---

## 16. `data.json` - zentrale Objektgruppen

### 16.1 `meta`

```json
{
  "name": "Sebastian Friedrich",
  "tagline": "Maler",
  "tagline_en": "Painter",
  "vita": {...},
  "kontakt": {...},
  "admin": {...}
}
```

### 16.2 `werke`

```json
{
  "id": "nachtschicht-2026",
  "titel": "Nachtschicht",
  "jahr": 2026,
  "medium": "Öl auf MDF",
  "medium_en": "Oil on MDF",
  "masse": "18 × 24 cm",
  "verfuegbar": true,
  "preis": null,
  "neu": true,
  "serie": null,
  "reihe": null,
  "groesse": "xs",
  "portraet": false,
  "bild": "https://res.cloudinary.com/..."
}
```

### 16.3 `news`

Siehe Abschnitt 8.

### 16.4 `katalog`

Siehe Abschnitt 9.

---

## 17. Responsives Verhalten

### 17.1 Desktop

- normales Website-Raster: 900 px
- Header, Inhalte, Hero, Slider einheitlich
- Unterseiten gleiche Kopfzone
- Reader als Fullscreen-Overlay
- Startseiten-Slider-Pfeile nicht im Bild, sondern unterhalb des Sliders
- Lightbox weitgehend unverändert, Navigation minimal tiefer

### 17.2 Tablet

- Hero-Name bleibt zweizeilig
- Werkbilder skalieren proportional
- Nav kann je nach Breite zwischen Desktop-Nav und Hamburger wechseln

### 17.3 Smartphone

- Header mit Hamburger
- Hero: Schrift links unten
- Startseiten-Slider: ein Werk pro Slide
- Slider-Pfeile funktional unterhalb des Werkblocks
- Werkseiten: gestapelte Darstellung
- Lightboxen: Swipe-Navigation, Navigation/X oben, statischer Info-Bereich unten
- Reader: Doppelseiten bleiben erhalten
- Katalogbuttons erhalten zusätzliche Luft vor Trennlinie
- Newsletter und Kontaktformular folgen dem mobilen Raster

---

## 18. Technische Regeln

- Loop-Variablen nicht `t` nennen, da `t()` als Übersetzungsfunktion genutzt wird.
- `100dvh` statt `100vh`, wenn dynamische Viewporthöhe relevant ist.
- Keine externen Google-Fonts.
- Leere Datenfelder nicht anzeigen.
- Bildtitel/Werktitel nicht übersetzen.
- Nach HTML-Edits prüfen: `grep -c "<body>"` muss `1` ergeben.
- Nach CSS-/JS-Änderungen Cache-Busting-Version erhöhen.
- Bei Layoutänderungen erst prüfen, ob die zentrale 900-px-Regel betroffen ist.
- Reader darf vom 900-px-Raster abweichen, aber nur im Fullscreen-Overlay.
- Bei Smartphone-Korrekturen besonders auf dynamische Browserleisten achten.

---

## 19. Bekannte technische Schuld / Aufräumbedarf

Die aktuelle `sf-base.css` enthält weiterhin historisch gewachsene Versionsblöcke (`V16`, `V17`, `V18`, `V24` usw.), die im Verlauf der Arbeit übereinandergelegt wurden.

Seit v24 ist die Struktur stabiler, aber noch nicht endgültig bereinigt. Funktional ist das akzeptabel, für Wartung aber nicht ideal.

Späteres CSS-Refactoring:

1. alle Versionsblöcke zusammenführen
2. doppelte/überschriebene Regeln entfernen
3. finale Regeln semantisch sortieren:
   - Variables
   - Reset/Base
   - Nav
   - Layout/Grid
   - Hero
   - Unterseitenkopf
   - Startseite
   - Werke
   - News
   - Katalog
   - Kontakt
   - Lightboxen
   - Reader
   - Mobile
4. danach visuelle Regression prüfen:
   - Desktop
   - Tablet
   - Smartphone
   - Deutsch
   - Englisch
   - lange Titel wie `Catalogue`, `Biography`
   - Werk-Lightbox mit/ohne `Reihe`
   - Werk-Lightbox mit/ohne `Anfrage senden`

---

## 20. Aktueller Funktionsstand

| Bereich | Stand |
|--------|-------|
| Startseite | fertig, redaktionell weiter pflegbar; mobiles Feintuning v28 |
| Werke | fertig, Filter + Lightbox |
| News | fertig, 5 Einträge, Bild-Lightbox |
| Katalog | fertig, Reader-Overlay, Aufsatz DE/EN, mobile Buttonabstände korrigiert |
| Reader | fertig, Cloudinary-Seiten 1-25, später erweiterbar |
| Vita | fertig, DE/EN |
| Kontakt | fertig, Netlify Forms, mobiler Formularabstand korrigiert |
| Englisch | weitgehend fertig, Aufsatz vollständig übersetzt |
| Porträts | aus Navigation entfernt, später optional |
| Backend | noch nicht vorhanden |
| CSS | funktional, aber refactoringwürdig |

---

## 21. Änderungschronik seit Architektur v08

### v24 - technische Stabilisierung

- Header-Logik auf Landingpage repariert.
- Unterseitenüberschriften zentralisiert.
- Mobile englische Langtitel korrigiert.
- Inhalt nach Unterseiten-Trennlinie zentral gesteuert.
- Alte konkurrierende Titel-CSS-Regeln reduziert.

### v25 - Header im Hero entfernt

- Keine Header-Anzeige im Hero.
- `nav.over-hero:not(.scrolled)` unsichtbar und nicht klickbar.
- Header erscheint erst nach dem Hero als weiße Leiste.

### v26 - Smartphone-Fixes und Slider-Navigation

- Kontaktformular: Abstand unter Submit-Button verbessert.
- Katalog mobil: Buttons mit mehr Abstand zur Trennlinie.
- News mobil: mehr Luft am Seitenende.
- Werk-Lightbox mobil: Navigation/X nach oben verlagert.
- Landing Page: Pfeile unter dem Slider funktional gemacht.
- Desktop: Pfeile im Bild entfernt; Slider-Navigation unterhalb.

### v27 - Katalogaufsatz und mobile Startseite

- Aufsatz-Schriftgröße vereinheitlicht und größer belassen.
- Autorenreihenfolge auf `John Palatini, Christian Drobe` gesetzt.
- Mobile Startseite: Werkbeschriftung zentriert.
- `Latest` / `All News` etwas tiefer gesetzt.
- Katalog-Hero mobil mit mehr Abstand unter Buttons.

### v28 - Lightbox-Feinschliff

- Mobile Werk-Lightbox:
  - Navigation/X etwas tiefer.
  - statischer Infobereich unten.
  - Bildbereich nutzt Resthöhe.
  - Bild zentriert.
- Desktop-Lightbox:
  - Navigation minimal tiefer.
- Landing Page mobil:
  - Abstand zwischen Bildbeschreibung und Pfeilen unter `Latest Works` reduziert.
- Katalog mobil:
  - nochmals mehr Luft unter Buttons.

---

## 22. Nächste sinnvolle Schritte

1. Website visuell in Desktop, Tablet und Smartphone gegenprüfen.
2. Nach Möglichkeit reale Smartphone-Tests in Chrome/Samsung Internet/Safari durchführen.
3. CSS konsolidieren, sobald die Gestaltung final ist.
4. Netlify-Form-Benachrichtigung für Sebastian einrichten.
5. Weitere Reader-Seiten hochladen und `reader_total_pages` erhöhen.
6. Backend/Adminbereich planen:
   - Werke pflegen
   - News pflegen
   - Bildbeschreibung/Copyright pflegen
   - Katalogdaten pflegen
   - Übersetzungsfelder pflegen
7. Optional: strukturierte Daten für SEO ergänzen (`VisualArtwork`, `Person`, `Event`, `Book`).


### v31 - Unterseiten-Titel und Startseitenkarten

- Lange Unterseiten-Titel werden per JS-Fit-Funktion automatisch verkleinert, sobald sie in der verfügbaren Breite nicht in eine Zeile passen.
- Startseite / Neueste Werke: Auf Desktop wird die graue Kartenfläche von der Bildunterkante bis in den Textbereich durchgezogen.
- Für `Marco` gibt es eine Sonderregel mit dezenter Linie am unteren Bildrand.
- Produktionspaket enthält nur noch die tatsächlich eingebundenen Inter-Webfonts.
