# SF Website – Architektur v13

*Stand: 10. Juni 2026*  
*Code-Stand: Website-Paket v52*  
*Ersetzt / konsolidiert: `SF_Architektur_v12.md`.*

Gegenüber v12 neu: Lightbox-Refactor (HTML aus `sf-base.js` injiziert), Galerie-Lightbox vollständig verdrahtet (Anfrage stellen, Navigation), Stapel-Zentrierung, Titel-Schriftgröße vereinheitlicht, `subpage-content-gap` kompakter, Landing-Page-Link → Galerie, `galerie.titel` i18n-Key ergänzt.

---

## 0. Status v52

Weiterhin **statisches Frontend ohne CMS/Backend**. Zentrale redaktionelle Datenquelle: `data.json`. Kuratorische Galeriedaten: `galerie.json`.

```text
Werke:     44
News:      5
Kataloge:  1
```

```text
CSS/JS Cache-Busting: v=50  ← bei nächstem Deployment erhöhen auf v=52
Lokale Fonts:         Inter 300, 400, 500 als WOFF2
Datenquellen:         data.json, galerie.json
Bildhosting:          Cloudinary (cloud: def9qgwtw)
Formulare:            Netlify Forms
Tracking:             keine Analyse-/Werbe-Cookies vorgesehen
```

---

## 1. Dateistruktur

```text
/
├── index.html
├── galerie.html
├── werke.html                         # nicht in der Nav, intern verlinkbar
├── news.html
├── katalog.html
├── reader.html
├── vita.html
├── kontakt.html
├── danke.html
├── impressum.html
├── datenschutz.html
├── data.json
├── galerie.json
├── sf-base.css
├── sf-base.js
├── favicon.ico / .svg / .png
├── apple-touch-icon.png
├── android-chrome-192x192.png / 512x512.png
├── site.webmanifest
└── fonts/webfonts/
    ├── inter-latin-300-normal.woff2
    ├── inter-latin-400-normal.woff2
    └── inter-latin-500-normal.woff2
```

---

## 2. Grundprinzipien

### 2.1 Statische Website

Keine serverseitige Template-Engine, kein CMS, keine Datenbank, keine Build-Pipeline, keine externen JS-Frameworks.

### 2.2 Datentrennung: `data.json` vs. `galerie.json`

**`data.json`** enthält die unveränderlichen Fakten zu jedem Werk: Titel, Maße, Medium, Bild-URL, Verfügbarkeit usw.

**`galerie.json`** enthält ausschließlich kuratorische Entscheidungen: welches Werk hängt wo, mit welchem Abstand, Versatz, Zoom und ob es gestapelt wird.

### 2.3 Visuelle Leitidee

Ruhige, galerienahe Gestaltung: große Weißflächen, zurückhaltende Typografie, klare Raster, wenige Linien, keine Schatten/Card-UI.

### 2.4 Mehrsprachigkeit

Deutsch/Englisch, clientseitige Umschaltung über `t()`-Funktion in `sf-base.js`. Alle i18n-Keys in `sf-base.js` definiert, nirgendwo sonst.

---

## 3. Navigation

```text
Galerie   → galerie.html
News      → news.html
Katalog   → katalog.html
Vita      → vita.html
Kontakt   → kontakt.html
[EN/DE]
```

`werke.html` ist **nicht in der Navigation**. Primärzugang zu den Werken ist die Galerie. Der „Alle Werke"-Link auf der Startseite zeigt ebenfalls auf `galerie.html`.

---

## 4. `sf-base.js` – Zentrale Logik

### 4.1 Aufbau

Enthält alle seitenübergreifenden Funktionen. Einbindung auf jeder Seite:

```html
<script src="sf-base.js?v=52"></script>
```

### 4.2 Init-Funktionen (Aufruf je nach Seite)

| Funktion | Beschreibung | Seiten |
|---|---|---|
| `initNav(hasHero)` | Navigation + Mobile-Menü | alle |
| `initLightbox()` | Lightbox injizieren + verdrahten | galerie, index, werke, katalog |
| `initContactInteractions()` | „Anfrage stellen"-Modal | galerie, index, werke, katalog |
| `initContactPageForm(formId, workId)` | Kontaktformular-Seite | kontakt |

### 4.3 Lightbox – Single Source of Truth *(neu in v52)*

`initLightbox()` schreibt das Lightbox-HTML selbst per `insertAdjacentHTML` ins `<body>`, falls noch keins vorhanden ist. Die HTML-Dateien enthalten **kein** statisches Lightbox-HTML mehr. So gibt es genau eine Quelle für die Lightbox-Struktur.

Injiziertes HTML:

```html
<div class="lightbox" id="lightbox">
  <button class="lightbox-arrow" id="lb-prev">‹</button>
  <div class="lightbox-card">
    <div class="lightbox-img-wrap">
      <img class="lightbox-img" id="lb-img" src="" alt="">
    </div>
    <div class="lightbox-info">
      <button class="lightbox-close" id="lb-close">✕</button>
      <p class="lightbox-counter" id="lb-counter"></p>
      <h2 class="lightbox-titel" id="lb-titel"></h2>
      <ul class="lightbox-meta-list" id="lb-meta"></ul>
      <div id="lb-action"></div>
    </div>
  </div>
  <button class="lightbox-arrow" id="lb-next">›</button>
</div>
```

**Regel:** Nie Lightbox-HTML in einzelne HTML-Seiten schreiben. Nie Element-IDs umbenennen.

### 4.4 Technische Regeln

- Loop-Variablen nie `t` nennen (Konflikt mit `t()`-Übersetzungsfunktion)
- `atob()` für UTF-8 immer via TextDecoder
- `openDetail(id, context)` öffnet die Lightbox; `context` ist Array von Werk-IDs für Navigation

---

## 5. `sf-base.css` – Single Source of Truth für globale Styles

Einbindung:

```html
<link rel="stylesheet" href="sf-base.css?v=52">
```

**Wichtige Regel:** Globale Regeln nie in lokalen `<style>`-Blöcken von HTML-Dateien überschreiben oder duplizieren. Ausnahmen nur für genuinen Seitenbedarf (z.B. Galerie-Vollbild-Layout).

### 5.1 Seitentitel – vereinheitlicht *(neu in v52)*

Gilt für alle Unterseiten (News, Vita, Kontakt, Katalog, Galerie, Werke):

```css
.page-title,
.vita-title,
.kontakt-title,
.katalog-page-title {
  font-size: min(13vw, 10rem, 12dvh) !important;
}
```

Der `12dvh`-Wert begrenzt die Schriftgröße auf Laptops und Hochformat-Displays, sodass der Inhalt direkt darunter sichtbar bleibt. Kein lokaler Override in HTML-Dateien.

### 5.2 Abstände Unterseiten

```css
--subpage-top:                calc(var(--nav-h) + 56px);
--subpage-content-gap:        clamp(44px, 5vw, 64px);      /* Abstand Titel → Inhalt */
--subpage-content-gap-mobile: clamp(40px, 10vw, 60px);
```

### 5.3 Lightbox-Größe

```css
.lightbox-card {
  height: 90dvh;
  width: min(1100px, calc(100vw - 112px));
}
```

Feste Kartengröße, Bild passt sich per `max-height: 100%; max-width: 100%; object-fit: contain` ein. Nie die Card-Größe von Bildinhalten abhängig machen.

---

## 6. `galerie.html` – Vollbild-Layout

### 6.1 Grundprinzip

Die Galerie-Seite scrollt **nicht vertikal**. Alles ist auf einem Bildschirm sichtbar:

```
[Nav]           flex: 0 0 auto
[Seitentitel]   flex: 0 0 auto
[Wand-Outer]    flex: 1 1 0
[Scrollbar]     flex: 0 0 20px
```

**Einzige Sonderregel gegenüber anderen Unterseiten:** `footer { display: none }` und `html, body { height: 100dvh; overflow: hidden }`. Alle anderen globalen Stile (Titel, Nav) gelten identisch.

### 6.2 Seitentitel

Kein lokaler Font-Size-Override. Gilt `min(13vw, 10rem, 12dvh)` aus `sf-base.css`.

### 6.3 Init-Sequenz

```js
initNav(false);
initLightbox();
initContactInteractions();

Promise.all([
  fetch('data.json').then(r => r.json()),
  fetch('galerie.json').then(r => r.json())
]).then(([werkData, galerie]) => {
  DATA = werkData;
  buildWand(werkData, galerie);
  applyLang();
});
```

---

## 7. `galerie.json` – Datenmodell

### 7.1 Config

```json
{
  "config": {
    "haenge_prozent": 47,
    "stapel_gap_px": 16
  }
}
```

### 7.2 Slots

| Feld | Pflicht | Bedeutung |
|---|---|---|
| `slot` | ja | Laufende Nummer |
| `abstand_vor` | ja | Horizontaler Abstand zum vorherigen Block in px |
| `werk_id` | ja | Referenz auf `id` in `data.json` |
| `reihe` | ja | 1 = neuer Block, >1 = Teil des vorherigen Stapels |
| `versatz_px` | nein | Vertikaler Versatz des gesamten Blocks von der Mittellinie |
| `zoom` | nein | Prozentualer Zoom (100 = normal, 85 = 15% kleiner) |

### 7.3 Stapel-Logik *(präzisiert in v52)*

Wenn `reihe > 1`, hängt das Bild vertikal unter dem vorangehenden. Die Gesamtkonstruktion wird gemeinsam an der Mittellinie ausgerichtet:

```
Gesamthöhe = h(Bild 1) + stapel_gap_px + h(Bild 2) + ...
Mittellinie bei Gesamthöhe / 2
```

Bilder mit unterschiedlicher Breite werden **horizontal zentriert** innerhalb des Blocks (seit v52). Versatz gilt für den gesamten Block und wird am ersten Slot (`reihe: 1`) eingestellt.

Aktuelle Stapelblöcke:
- Slots 1+2: Nachtschicht / Nachtschicht 2
- Slots 5+6: Atelier 2 / Atelier 3

### 7.4 Größenberechnung

```
px_pro_cm = (wand-outer.clientHeight × 0.80) / maxHCm
```

Perseus (150 × 120 cm) ist das größte Werk und Referenz für die Skalierung. Berechnung erfolgt nach dem Rendern aus `wand-outer.clientHeight`. Bei Viewport-Resize Rebuild nach 400ms Debounce.

### 7.5 Galerie-Editor

Für die kuratorische Arbeit an `galerie.json` steht ein lokaler HTML-Editor zur Verfügung (`galerie-editor.html`, nicht im Deployment). Funktionen: Reihenfolge per ↑↓ verschieben, Abstand/Versatz/Zoom pro Slot, Stapel-Toggle, JSON-Export.

---

## 8. `data.json` – Datenmodell

### 8.1 Struktur

```json
{
  "meta": {},
  "werke": [],
  "katalog": [],
  "news": []
}
```

### 8.2 `werke[]`

```json
{
  "id": "string",
  "titel": "string",
  "jahr": 2026,
  "masse": "150 × 120 cm",
  "medium": "Öl auf Leinwand",
  "medium_en": "Oil on canvas",
  "gerahmt": false,
  "serie": null,
  "portraet": true,
  "verfuegbar": true,
  "preis": null,
  "neu": true,
  "bild": "https://res.cloudinary.com/def9qgwtw/...",
  "groesse": "l"
}
```

Wichtig:
- `masse` Format: `"Höhe × Breite cm"` – Quellfeld für alle Größenberechnungen
- `gerahmt` wird nie angezeigt
- `groesse` (xs/s/m/l) steuert Darstellung auf `werke.html`, nicht in der Galerie
- `id` ist technischer Schlüssel für Lightbox, Galerie-Slots und URL-Bezüge

---

## 9. Unterseiten – Überblick

| Seite | Besonderheit |
|---|---|
| `index.html` | Hero fullbleed, Fisher-Yates-Shuffle neueste Werke, „Alle Werke" → `galerie.html` |
| `galerie.html` | Vollbild, kein Footer, horizontales Scrollen, `galerie.json` |
| `werke.html` | Filter, Verfügbarkeitsmodus, Desktop-Layout mit Verbindungslinien |
| `news.html` | Jahres-Gliederung, News-Lightbox |
| `katalog.html` | Hero mit Cover + Bibliografie, Essay, Reader-Modal |
| `vita.html` | Zweispaltig: Fließtext + Steckbrief-Tabelle |
| `kontakt.html` | Netlify Form, Social-Links |
| `reader.html` | PDF.js-Reader |

---

## 10. Responsive Architektur

```text
> 1120px     Desktop: Werke und Lightbox nebeneinander
≤ 1120px     Werke und Lightbox gestapelt
≤ 760px      Mobile: Slider-Logik, mobile Nav
```

Galerie hat eigene Responsive-Logik: `px_pro_cm` aus Viewport-Höhe, Rebuild bei Orientierungswechsel.

---

## 11. Assets und externe Dienste

- **Cloudinary** `def9qgwtw`: alle Werk-, News- und Katalogbilder
- **Netlify**: Hosting + Forms
- **Fonts**: lokal, Inter 300/400/500 WOFF2, kein Google Fonts

---

## 12. Cache-Busting

```html
sf-base.css?v=52
sf-base.js?v=52
```

**Regel:** Bei jedem Deployment konsistent in allen HTML-Dateien erhöhen.

Aktuell steht noch `v=50` in den Dateien – **vor dem nächsten Deployment auf `v=52` erhöhen**.

---

## 13. Verbindliche Gestaltungsentscheidungen Stand v52

- Navigation: Galerie, News, Katalog, Vita, Kontakt
- Primärzugang Werke: Galerie (nicht Werke-Seite)
- Seitentitel alle Unterseiten: `min(13vw, 10rem, 12dvh)` – eine Regel, kein lokaler Override
- Galerie: maßstabsgerechte Darstellung aus cm-Maßen, Stapel horizontal zentriert
- Perseus (150 × 120 cm) ist Referenzwerk für Wandskalierung
- Scrollbar: 20px Höhe, schwarzer Thumb, 1px-Linien oben/unten
- Lightbox: einmalig in `sf-base.js` definiert, HTML per `initLightbox()` injiziert
- `gerahmt` wird nie angezeigt
- Autorenreihenfolge immer: **John Palatini, Christian Drobe**
- Keine Google Fonts
- Favicon: typografisches `SF`, schwarz auf weiß
- `youtube-nocookie.com` für YouTube-Einbettungen
- `100dvh` statt `100vh`

---

## 14. Offene Punkte

1. **Cache-Busting** auf `v=52` erhöhen vor nächstem Deployment
2. **Admin-Backend** (`admin.html`): noch nicht umgesetzt
3. **Rechtstexte** final prüfen vor Veröffentlichung
4. **Realer Gerätecheck** (iPhone Safari, Android Chrome, WhatsApp-In-App)
5. **Galerie-Admin**: visueller Editor für `galerie.json` (Slots, Abstand, Stapel) – Konzept vorhanden, lokaler Editor `galerie-editor.html` als Zwischenlösung

---

## 15. Versionslog

```text
v30–v48  siehe SF_Architektur_v11.md
v49      Hero Fullbleed, Slider-Überarbeitung, Lightbox Tablet gestapelt
v50      Galerie-Seite neu, Navigation Werke→Galerie, galerie.json,
         px_pro_cm aus Viewport, Scrollbar-Design, Vollbild-Layout,
         versatz_px und zoom als Slot-Felder
v51      Scrollbar 20px, Thumb füllt Zwischenraum, Titelgröße dvh-Begrenzung,
         Resize-Debounce 400ms, body padding-bottom
v52      Galerie: alle 44 Werke in galerie.json (2 Stapelblöcke),
         Stapel horizontal zentriert, Lightbox verdrahtet (Klick, Anfrage),
         Lightbox-Refactor: HTML aus sf-base.js injiziert (Single Source),
         Seitentitel vereinheitlicht min(13vw,10rem,12dvh) alle Unterseiten,
         subpage-content-gap kompakter (44px–64px),
         Katalog-Hero kompakter, Kontakt kompakter,
         Landing-Page „Alle Werke"-Link → galerie.html,
         galerie.titel i18n-Key ergänzt (DE/EN)
```
