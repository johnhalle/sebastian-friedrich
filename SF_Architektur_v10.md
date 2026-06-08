# SF Website – Architektur v10

*Stand: 08. Juni 2026*  
*Code-Stand: Website-Paket v46*  
*Ersetzt / konsolidiert: `SF_Architektur_v09.md` plus `CHANGELOG_v30.md` bis `CHANGELOG_v46.md`.*

Diese Fassung dokumentiert den aktuellen Arbeitsstand der statischen Website für den Maler **Sebastian Friedrich**. Sie konsolidiert die seit v09 vorgenommenen Korrekturen und Designentscheidungen: Rechtstexte, Datenkorrekturen, Autorenreihenfolge, reduzierte Fontauslieferung, Landingpage-Karten, Werke-Verbindungslinien, Katalogaufsatz, Reader, mobile Schutzregeln, Tablet-Breakpoints und Lightbox-Stabilisierung.

---

## 0. Status v46

Die Website ist weiterhin als **statisches Frontend ohne CMS/Backend** aufgebaut. Die zentrale redaktionelle Datenquelle ist `data.json`.

Aktueller Umfang laut `data.json`:

```text
Werke:     44
News:      5
Kataloge:  1
```

Aktueller technischer Stand:

```text
CSS/JS Cache-Busting: v=46
Lokale Fonts:         nur Inter 300, 400, 500 als WOFF2
Datenquelle:          data.json
Bildhosting:          Cloudinary
Formulare:            Netlify Forms
Tracking:             keine Analyse-/Werbe-Cookies vorgesehen
```

---

## 1. Dateistruktur

Das Website-Paket v46 enthält im Wurzelverzeichnis:

```text
/
├── index.html                         # Startseite: Hero, Neueste Werke, News, Katalog, Newsletter
├── werke.html                         # Werkübersicht mit Filter, Verfügbarkeitsmodus, Werk-Lightbox
├── news.html                          # News-/Ausstellungsseite mit Bild-Lightbox
├── katalog.html                       # Katalogseite mit Katalogdaten, Reader-Overlay und Aufsatz
├── reader.html                        # separater Katalogreader
├── vita.html                          # Vita / Biografie
├── kontakt.html                       # Kontaktformular
├── danke.html                         # Danke-/Bestätigungsseite
├── impressum.html                     # Impressum
├── datenschutz.html                   # Datenschutzerklärung
├── data.json                          # zentrale Datenquelle
├── sf-base.css                        # gemeinsame CSS-Basis
├── sf-base.js                         # gemeinsame JS-Basis
├── fonts/
│   ├── LICENSE
│   └── webfonts/
│       ├── inter-latin-300-normal.woff2
│       ├── inter-latin-400-normal.woff2
│       └── inter-latin-500-normal.woff2
├── SF_Architektur_v09.md              # ältere Architekturfassung
├── CHANGELOG_v30.md … CHANGELOG_v46.md
└── CHANGELOG_contact_update.md
```

Die Architektur v10 ist als neue konsolidierte Dokumentation zu verstehen. Der Code-Stand bleibt v46.

---

## 2. Grundprinzipien

### 2.1 Statische Website

Die Website ist bewusst statisch angelegt:

- keine serverseitige Template-Engine,
- kein CMS,
- keine Datenbank,
- keine Build-Pipeline,
- keine externen JS-Frameworks.

Die redaktionelle Pflege erfolgt aktuell über `data.json` und die statischen HTML-/CSS-/JS-Dateien.

### 2.2 Zentralisierte Datenlogik

Werkdaten, Newsdaten und Katalogdaten liegen in `data.json`. Die Seiten lesen diese Daten clientseitig und rendern daraus Karten, Listen, Detailansichten, Lightboxen und Kataloginformationen.

### 2.3 Visuelle Leitidee

Die Seite arbeitet mit einer ruhigen, galerienahen Gestaltung:

- große Weißflächen,
- zurückhaltende Typografie,
- klare Raster,
- wenige Linien,
- dezente graue Flächen,
- keine Schatten-/Card-UI im kommerziellen Sinn,
- möglichst präzise Zuordnung von Werkbild und Werkdaten.

### 2.4 Mehrsprachigkeit

Die Oberfläche ist deutsch/englisch angelegt. Die Sprachumschaltung erfolgt clientseitig. Wo englische Datenfelder fehlen, wird kontrolliert auf deutsche Inhalte zurückgegriffen.

---

## 3. Gemeinsame Ressourcen

### 3.1 `sf-base.css`

`sf-base.css` enthält die gemeinsame Layout-, Typografie-, Navigations-, Footer-, Lightbox- und Unterseitenlogik. Alle HTML-Dateien binden diese Datei mit aktuellem Cache-Busting ein:

```html
<link rel="stylesheet" href="sf-base.css?v=46">
```

### 3.2 `sf-base.js`

`sf-base.js` enthält zentrale Logik für:

- Sprachzustand,
- Internationalisierung,
- Navigation / Mobile-Menü,
- Footer,
- gemeinsame Werk-Lightbox,
- Kontaktmodal / Werkanfragen,
- mobile Schutzlogik,
- Reader- und Lightbox-nahe Hilfsfunktionen.

Alle HTML-Dateien binden die Datei mit aktuellem Cache-Busting ein:

```html
<script src="sf-base.js?v=46"></script>
```

### 3.3 Fonts

Es werden nur die tatsächlich verwendeten Inter-Schnitte ausgeliefert:

```text
fonts/LICENSE
fonts/webfonts/inter-latin-300-normal.woff2
fonts/webfonts/inter-latin-400-normal.woff2
fonts/webfonts/inter-latin-500-normal.woff2
```

Nicht genutzte Schnitte, TTF-Dateien und Sprachvarianten wurden aus dem ZIP entfernt. Die Schriften werden lokal eingebunden; Google Fonts werden nicht verwendet.

---

## 4. Datenmodell `data.json`

`data.json` enthält vier Hauptbereiche:

```json
{
  "meta": {},
  "werke": [],
  "katalog": [],
  "news": []
}
```

### 4.1 `meta`

Enthält allgemeine Websiteinformationen:

- Name,
- Tagline deutsch/englisch,
- Vita deutsch/englisch,
- Ausstellungs-/Biografiedaten,
- Social-/Kontakt-nahe Angaben.

### 4.2 `werke[]`

Jeder Werkdatensatz enthält typischerweise:

```json
{
  "id": "string",
  "titel": "string",
  "jahr": 2026,
  "masse": "30 × 40 cm",
  "medium": "Öl auf MDF",
  "medium_en": "Oil on MDF",
  "gerahmt": true,
  "serie": "string|null",
  "portraet": true,
  "verfuegbar": true,
  "preis": null,
  "neu": true,
  "bild": "https://res.cloudinary.com/...",
  "reihe": "string|null",
  "groesse": "xs|s|m|l"
}
```

Wichtige Festlegungen:

- `id` ist der technische Schlüssel für Lightbox, Anfragen und URL-/DOM-Bezüge.
- `bild` verweist auf Cloudinary.
- `groesse` steuert die Darstellung in der Werke-Liste.
- `verfuegbar` steuert Anfragebutton und Filter.
- `neu` bleibt als redaktionelles Feld erhalten, steuert aber nicht mehr die Startseiten-Auswahl.
- `medium_en` soll gepflegt werden; bei Lücken erfolgt Fallback auf `medium`.

### 4.3 Katalogdaten

Der Katalogdatensatz enthält:

- Titel deutsch/englisch,
- Jahr,
- Verlag,
- ISBN,
- Herausgeber,
- Autoren,
- Cover,
- Reader-Basis-URL,
- Gesamtseitenzahl,
- Bestelltext,
- Aufsatzdaten.

Autorenreihenfolge ist verbindlich:

```text
John Palatini, Christian Drobe
```

Das gilt für Katalogdarstellung und Aufsatz.

### 4.4 Newsdaten

News-Einträge enthalten u. a.:

- Datum/Jahr,
- Kategorie deutsch/englisch,
- Titel deutsch/englisch,
- Ort,
- Zeitraum deutsch/englisch,
- Text deutsch/englisch,
- Titelbild,
- Bildergalerie,
- PDF-/URL-Felder,
- Tags.

Die News-Seite rendert diese Einträge chronologisch bzw. absteigend nach Datum/Jahr.

---

## 5. Seitenarchitektur

### 5.1 `index.html` – Startseite

Die Startseite enthält:

1. Hero,
2. Bereich „Neueste Werke“,
3. aktueller News-Teaser,
4. Katalog-Teaser,
5. Newsletter-/Kontakt-naher Bereich,
6. Footer.

#### 5.1.1 Hero

Der Hero nutzt ein großes Bild mit Textoverlay. Die Positionierung ist desktop-, tablet- und mobilabhängig. Mobile nutzt `100dvh`, damit der sichtbare Viewport besser berücksichtigt wird.

#### 5.1.2 „Neueste Werke“

Die Auswahl erfolgt dynamisch:

```js
const thisYear = new Date().getFullYear();

return data.werke
  .filter(w => w.jahr >= thisYear - 1)
  .sort((a, b) => b.jahr - a.jahr);
```

Festlegung:

```text
Neueste Werke = Werke des aktuellen und des vorherigen Jahres.
```

Eine zusätzliche Sortierung nach `neu: true` wurde entfernt.

#### 5.1.3 Landingpage-Karten

Die Desktop-Karten im Bereich „Neueste Werke“ haben folgende Regeln:

- drei sichtbare Karten pro Desktop-Gruppe,
- graue Caption-Fläche unter dem Bild,
- Bild und graue Fläche müssen bündig sein,
- Kartenhöhe ist fest definiert und darf nicht durch Hochformate springen,
- Text sitzt unten im grauen Bereich,
- Breite darf leicht variieren, vor allem bei Hochformaten,
- `Marco` hat eine dezente Trennlinie am unteren Bildrand, weil Bildhintergrund und Kartenhintergrund sehr ähnlich sind.

Die technische Struktur lautet:

```html
<div class="werk-card">
  <div class="werk-card-inner">
    <div class="werk-card-img-wrap">
      <img class="werk-card-img">
    </div>
    <div class="werk-card-body">
      <p class="werk-card-titel"></p>
      <p class="werk-card-meta"></p>
    </div>
  </div>
</div>
```

Wichtige JS-Funktionen:

```js
layoutNeuesteCards()
syncNeuesteCardWidths()
equalizeNeuesteCards()
```

Hochformate werden über natürliche Bildproportion erkannt:

```js
img.naturalHeight > img.naturalWidth * 1.08
```

Ab v46 wird die Caption-Breite nach Bildlayout an die tatsächlich gerenderte Bildbreite gekoppelt. Dadurch schließen Bild und graue Fläche auch bei Hochformaten bündig ab.

Mobile bleibt einfacher und ohne graue Kartenfläche.

---

## 6. `werke.html` – Werke-Seite

### 6.1 Funktion

Die Werke-Seite zeigt alle Werke oder nur verfügbare Werke:

```text
alle Werke
verfügbare Werke
```

Der Filter wird über URL-Parameter abgebildet:

```text
werke.html
werke.html?filter=verfuegbar
```

### 6.2 Sortierlogik

Die Werke werden nach Jahr absteigend sortiert. Reihenwerke werden gruppiert in die chronologische Liste eingefügt.

### 6.3 Größenklassen

Die Werkdarstellung nutzt Größenklassen:

```text
xs
s
m
l
```

Sie steuern im Desktoplayout die Bildspaltenbreite bzw. die maximale lange Bildseite.

### 6.4 Desktoplayout

Desktop nutzt ein wechselndes Links-/Rechts-Layout:

```text
Bild links  – Caption rechts
Caption links – Bild rechts
```

Die Caption besteht aus:

- Titel,
- Jahr,
- Medium,
- Maße,
- ggf. Reihe,
- Anfragebutton bei `verfuegbar: true`.

### 6.5 Verbindungslinien

Auf großen Desktopbreiten wird eine dezente Verbindungslinie zwischen Werkbild und Caption ausgespielt. Die Linie ist eine reduzierte offene Klammerform:

```text
oberer Arm über dem Titel bis zur Außenkante des Informationsblocks
vertikaler Steg auf der bildseitigen Seite des Infoblocks
unterer Arm zum Bild
```

Technisch wird die Linie dynamisch berechnet:

```js
updateWerkConnectors()
```

Die Berechnung nutzt die tatsächlich gerenderten Koordinaten von:

- Bild,
- Titel,
- Meta-Liste,
- ggf. Anfragebutton.

Wichtige Konstanten:

```js
stemOffset = 16
titleTopOffset = 30
minBottomLength = 26
minStemHeight = 28
```

### 6.6 Breakpoint / Stapelmodus

Der Wechsel in die gestapelte Darstellung ist am Worst Case **Sketching** ausgerichtet, weil dieses Werk als breites Querformat die kritischste Kombination aus Bildbreite, Caption und Linie bildet.

Festlegung:

```text
bis einschließlich 1120 px: gestapelt
ab 1121 px: Desktop-Seitenlayout mit Verbindungslinie
```

Technisch:

```css
@media (max-width: 1120px) { ... gestapelt ... }
@media (min-width: 1121px) { ... Linien sichtbar ... }
```

und in JS:

```js
if (window.innerWidth <= 1120) return;
```

Im Stapelmodus werden die Verbindungslinien nicht angezeigt und nicht berechnet.

---

## 7. Gemeinsame Werk-Lightbox

Die Werk-Lightbox wird auf mehreren Seiten verwendet:

- Startseite,
- Werke-Seite,
- Katalogaufsatz.

Sie wird über `sf-base.js` gesteuert.

### 7.1 Inhalt

Die Lightbox zeigt:

- Werkbild,
- Zähler mit Navigation,
- Titel,
- Jahr,
- Medium,
- Maße,
- ggf. Anfragebutton.

### 7.2 Desktop

Oberhalb des Tablet-Breakpoints steht das Bild neben der Caption. Die Lightbox-Karte ist auf eine maximale Breite begrenzt und zentriert.

### 7.3 Tablet / Mobile

Seit v46 ist der Breakpoint an die Werke-Seite angeglichen:

```text
bis einschließlich 1120 px: gestapelt
ab 1121 px: nebeneinander
```

Im gestapelten Modus:

- Bild oben,
- Caption darunter,
- Lightbox-Gesamtkarte scrollbar,
- Metadaten und Anfragebutton bleiben bei ungünstigen Zoom-/Tabletstufen erreichbar.

Damit werden Zwischenzustände vermieden, in denen Bild und Caption nebeneinander zu wenig Raum haben.

---

## 8. `katalog.html` – Katalogseite und Aufsatz

### 8.1 Katalogseite

Die Katalogseite rendert den Katalogdatensatz aus `data.json`.

Angezeigt werden u. a.:

- Titel,
- Jahr,
- Herausgeber,
- Autoren,
- Verlag,
- ISBN,
- Reihe,
- Ausstellung,
- Katalogcover,
- Bestellbutton,
- Reader-Start.

Die Autorenreihenfolge ist:

```text
John Palatini, Christian Drobe
```

### 8.2 Reader

Der Reader nutzt Cloudinary-Seitenbilder. Der Katalogdatensatz definiert:

```json
"reader_base_url": "...",
"reader_total_pages": 25
```

Der Reader existiert in zwei Formen:

1. als eingebettetes Overlay aus `katalog.html`,
2. als eigene Seite `reader.html`.

Mobile Reader-Anpassungen:

- Kopfzone nach unten versetzt,
- Seitenzähler / Metadaten aus dem Bereich der mobilen Browserleiste verschoben,
- Schließen-Button tiefer gesetzt.

### 8.3 Katalogaufsatz

Der Aufsatz ist in `data.json` als strukturierte Blockliste hinterlegt. Unterstützt werden u. a.:

- Absätze,
- Zwischenüberschriften,
- Bild-/Werkblöcke,
- zweisprachige Textfelder.

Ab v42 wird beim eingebundenen Werk **Maske** im Aufsatz ebenfalls die dezente Verbindungslinie zwischen Bild und Werkdaten ausgespielt. Diese Linie folgt der ästhetischen Logik der Werke-Seite, bleibt aber auf Mobile deaktiviert.

---

## 9. `news.html` – News und Bild-Lightbox

Die News-Seite zeigt Ausstellungen, Präsentationen und aktuelle Hinweise. Sie unterstützt:

- News-Karten,
- chronologische Gruppierung,
- Titelbild,
- zusätzliche Bilder,
- PDF- und URL-Felder,
- Tags,
- News-Bild-Lightbox.

Die News-Lightbox ist eigenständig in `news.html` definiert und nicht identisch mit der Werk-Lightbox.

---

## 10. `vita.html`

Die Vita-Seite rendert redaktionellen Text und biografische Daten aus `data.json`.

Wichtig:

- deutsch/englisch getrennte Felder,
- mobile Titelgrößen abgesichert,
- lange englische Titel werden nicht aus dem Layout gedrückt.

---

## 11. `kontakt.html`, Kontaktmodal und Netlify Forms

Es gibt zwei Kontaktwege:

1. allgemeines Kontaktformular auf `kontakt.html`,
2. werkbezogene Anfrage über `data-contact-work`.

Formulare sind als Netlify Forms angelegt. Die Netlify-Konfiguration für Benachrichtigungen muss in Netlify selbst final geprüft werden.

Werkbezogene Anfragen übernehmen den Werkbezug aus dem Datensatz. Das Kontaktmodal wird global erzeugt und über `sf-base.js` gesteuert.

---

## 12. Rechtliche Seiten

Seit v30 sind enthalten:

```text
impressum.html
datenschutz.html
```

Verantwortlicher:

```text
Sebastian Friedrich
Atelierhaus Ehemalige Farbenfabrik
Franz-Flemming-Straße 15
04179 Leipzig
Deutschland
```

Die Texte berücksichtigen:

- Netlify Hosting,
- Netlify Forms,
- Cloudinary,
- lokale Inter-Fonts,
- lokale Speicherung der Spracheinstellung,
- Instagram als externer Link,
- keine Google Fonts,
- keine Tracking-/Analyse-/Werbe-Cookies.

Hinweis: Die Texte sind als Arbeitsfassung angelegt und sollten vor Veröffentlichung rechtlich final geprüft werden.

---

## 13. Responsive Architektur

### 13.1 Hauptbreakpoints

Aktuelle maßgebliche Breakpoints:

```text
> 1120 px       Desktoplayout für Werke und Werk-Lightbox nebeneinander
<= 1120 px      Werke und Werk-Lightbox gestapelt
<= 760 px       Mobile Startseiten-/Sliderlogik
```

### 13.2 Werke-Seite

Der Breakpoint ist am breitesten Werkfall **Sketching** ausgerichtet. Ziel ist, Tablet-Zwischenzustände mit zu enger Bild-/Caption-Kombination zu vermeiden.

### 13.3 Lightbox

Lightbox und Werke-Seite sind auf denselben Umschaltpunkt angeglichen. Dadurch entstehen keine uneinheitlichen Tablet-Zustände mehr.

### 13.4 Mobile Browser / In-App-Browser

Ab v42 wurden Schutzregeln ergänzt, um Inhalte nicht direkt hinter iOS-/WhatsApp-Browserleisten laufen zu lassen:

- weiße Schutzfläche im oberen Bereich,
- Reader-Kopfzone tiefer,
- mobile Hero-/Header-Abstände stabilisiert.

Diese Regeln können im realen Smartphone-Test weiter feinjustiert werden, weil Browser-Chrome je nach Gerät, App und Scrollzustand unterschiedlich viel Sichtfläche beansprucht.

---

## 14. Assets und externe Dienste

### 14.1 Cloudinary

Alle Werkbilder, Newsbilder, Katalogcover und Readerseiten werden über Cloudinary geladen.

Vorteil:

- schlankes Website-Paket,
- Bilddaten liegen nicht lokal im ZIP,
- schnelle Aktualisierung über URLs möglich.

Risiko:

- Website ist für Bildanzeige von Cloudinary-Verfügbarkeit abhängig.
- URL-Struktur muss stabil bleiben.

### 14.2 Netlify

Die Website ist für Netlify-Hosting vorbereitet:

- statische Auslieferung,
- Netlify Forms,
- Kontakt-/Bestellformulare.

Zu prüfen:

- Formularbenachrichtigungen,
- Spam-Schutz,
- Bestätigungsseite,
- ggf. Domain/SSL.

---

## 15. Cache-Busting und Versionierung

Alle HTML-Dateien referenzieren aktuell:

```html
sf-base.css?v=46
sf-base.js?v=46
```

Bei jedem Code-Update muss die Versionsnummer in allen HTML-Dateien konsistent erhöht werden.

Für reine Dokumentationsänderungen muss der Code-Cache-Buster nicht zwingend erhöht werden, solange CSS/JS unverändert bleiben.

---

## 16. Bisherige Versionslogik seit v30 – Kurzüberblick

```text
v30  Rechtliches, Katalogautoren, Werkdaten, Neueste-Werke-Logik
v31  lange Unterseitenüberschriften, graue Landingpage-Karten, Fonts reduziert
v32  erste Verbindungslinie Werke
v33  Hochformat-Karten auf Landingpage
v34  Karten schließen direkt an Bildkante
v35  L-förmige Werke-Verbindungslinie
v36  offene Klammerform
v37  gleiche Kartenhöhe im Slider
v38  Linienhöhe und Kartenabstände
v39  Klammerform bereinigt, Kartenkörper verdichtet
v40  feste Kartenhöhe, Linienabstand stabilisiert
v41  Kartenhöhe leicht erhöht, Linienarm-Abstand vereinheitlicht
v42  Maske-Linie im Aufsatz, mobile Browser-/Reader-Korrekturen
v43  Tablet-Lightbox gestapelt, Werke früher gestapelt, Karten verdichtet
v44  Werke-Stapelmodus an Sketching als Worst Case ausgerichtet
v45  Landingpage-Kartenhöhe auf Shams-Referenz gesetzt
v46  Caption-Breite an Bildbreite gekoppelt, Lightbox/Werke-Breakpoint angeglichen
```

---

## 17. Prüfliste vor Veröffentlichung

### 17.1 Technisch

- `data.json` valide?
- alle HTML-Dateien mit genau einem `<body>`?
- `sf-base.js` Syntaxcheck bestanden?
- Inline-Skripte Syntaxcheck bestanden?
- CSS-/JS-Versionen überall konsistent?
- nur benötigte Fontdateien im Paket?
- keine alten Bild-/Testdateien im ZIP?
- Footerlinks auf Impressum/Datenschutz korrekt?

### 17.2 Inhaltlich

- alle Werkdaten vollständig?
- englische `medium_en`-Felder gepflegt?
- Maße einheitlich?
- Verfügbarkeiten korrekt?
- Katalogdaten korrekt?
- Autorenreihenfolge überall `John Palatini, Christian Drobe`?
- Newsdaten aktuell?

### 17.3 Visuell

Desktop:

- Startseite Hero,
- Neueste-Werke-Karten,
- Werke-Seite mit Verbindungslinien,
- Katalogseite,
- Katalogaufsatz,
- Reader,
- Lightbox.

Tablet:

- Werke-Seite gestapelt ab 1120 px,
- Lightbox gestapelt ab 1120 px,
- Katalogreader,
- News-Lightbox.

Mobile:

- Navigation,
- Hero,
- Werkkarten,
- Werke-Seite,
- Werk-Lightbox,
- Reader in Safari / Chrome / WhatsApp-In-App-Browser,
- Kontaktformular,
- Impressum/Datenschutz.

### 17.4 Rechtlich / Deployment

- Impressum final geprüft?
- Datenschutzerklärung final geprüft?
- Netlify Forms funktionieren?
- Formulare erzeugen Benachrichtigungen?
- Datenschutzinformationen passen zum tatsächlichen Hosting-/Formular-Setup?
- Domain statt Netlify-Previewdomain gesetzt?
- Instagram-Link korrekt?

---

## 18. Offene bzw. bewusst nachgelagerte Punkte

1. **Rechtstexte final prüfen**  
   Die vorhandenen Texte sind Arbeitsfassungen.

2. **Realer Gerätecheck**  
   Weiterhin wichtig: iPhone Safari, Android Chrome, WhatsApp-In-App-Browser, Tablet quer/hoch.

3. **CSS-Refactoring**  
   Die CSS-Struktur ist funktional, aber historisch gewachsen. Ein späteres Refactoring kann Wiederholungen reduzieren.

4. **CMS-/Pflegekonzept**  
   Noch nicht vorhanden. Bei laufender Pflege wäre ein kleines CMS oder ein strukturierter Datenworkflow sinnvoll.

5. **Bildoptimierung**  
   Cloudinary URLs funktionieren, aber Transformationen / feste Breiten / responsive Varianten könnten später noch optimiert werden.

6. **Barrierefreiheit**  
   Grundlegende Labels sind vorhanden; ein vollständiger Accessibility-Test steht noch aus.

---

## 19. Verbindliche Gestaltungsentscheidungen Stand v46

- Die Startseiten-Kartenlänge basiert auf der Shams-Referenz und darf nicht unbeabsichtigt verändert werden.
- Bei Startseiten-Karten darf die Breite leicht variieren, die Höhe aber nicht springen.
- Bild und graue Caption-Fläche müssen bündig sein.
- Werke-Seite und Werk-Lightbox schalten bei 1120 px auf gestapelte Darstellung.
- Verbindungslinien auf der Werke-Seite sind nur oberhalb von 1120 px aktiv.
- **Sketching** ist der Worst Case für den Werke-Breakpoint.
- Autorenreihenfolge ist immer: **John Palatini, Christian Drobe**.
- Im Paket werden nur die drei tatsächlich verwendeten Inter-WOFF2-Dateien ausgeliefert.
- Keine Google Fonts.
- Keine zusätzlichen harten Kartenrahmen oder Schatten auf der Landingpage.
- Mobile bleibt grundsätzlich reduzierter als Desktop.

---

## 20. Kurzfazit

Stand v46 ist ein fortgeschrittener Release-Candidate. Die wichtigsten strukturellen Punkte sind umgesetzt:

- Rechtliches vorhanden,
- Datenmodell bereinigt,
- Katalogaufsatz integriert,
- Reader stabilisiert,
- Landingpage-Karten weitgehend ausdefiniert,
- Werke-Seite und Lightbox responsiv harmonisiert,
- Fontpaket verschlankt.

Vor Veröffentlichung sollten vor allem noch die realen Geräteansichten und Rechtstexte final geprüft werden.
