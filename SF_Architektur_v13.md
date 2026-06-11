# SF Website – Architektur v13

*Stand: 10. Juni 2026*  
*Code-Stand: Website-Paket v52*  
*Ersetzt / konsolidiert: `SF_Architektur_v12.md`.*

Gegenüber v12 neu: Lightbox vollständig refaktoriert, Nav + Overlay + Footer + Newsletter aus `sf-base.js` injiziert (Single Source), Galerie-Lightbox verdrahtet, Caption-Positionen fixiert, Stapel-Zentrierung, Seitentitel vereinheitlicht, Admin-Backend `admin.html`, Scrollbar-Gestaltung, diverse Mobile-Fixes.

---

## 0. Status v52

Weiterhin **statisches Frontend ohne CMS/Backend**. Zentrale redaktionelle Datenquelle: `data.json`. Kuratorische Galeriedaten: `galerie.json`.

```text
Werke:     44
News:      5
Kataloge:  1
```

```text
CSS/JS Cache-Busting: v=52
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
├── admin.html                         # NEU: Admin-Backend
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

`werke.html` ist **nicht in der Navigation**. Der „Alle Werke"-Link auf der Startseite zeigt auf `galerie.html`.

---

## 4. `sf-base.js` – Single Source of Truth für alle gemeinsamen Komponenten

### 4.1 Prinzip

`sf-base.js` injiziert alle gemeinsamen HTML-Komponenten selbst ins DOM. Keine HTML-Datei pflegt Nav, Overlay, Footer oder Lightbox mehr manuell. Änderungen an diesen Elementen erfolgen ausschließlich in `sf-base.js`.

### 4.2 Init-Funktionen

| Funktion | Beschreibung | Seiten |
|---|---|---|
| `initNav(hasHero)` | Nav + Hamburger + Overlay injizieren, aktiven Link per URL erkennen | alle |
| `initFooter(data)` / `renderFooter(data)` | Newsletter-Sektion + Footer injizieren | alle außer galerie |
| `initLightbox()` | Lightbox-HTML injizieren + verdrahten | galerie, index, werke, katalog |
| `initContactInteractions()` | „Anfrage stellen"-Modal | galerie, index, werke, katalog |
| `initContactPageForm(formId, workId)` | Kontaktformular-Seite | kontakt |
| `nlSubmit()` | Newsletter-Anmeldung | global (via initFooter) |

### 4.3 Injizierte Komponenten – Übersicht

**Nav** (`initNav`): Logo, Links (Galerie/News/Katalog/Vita/Kontakt), Sprachumschalter, Hamburger. Aktiver Link wird per `location.pathname` automatisch gesetzt.

**Overlay** (`initNav`): Mobile-Vollbild-Menü mit denselben Links + Sprachumschalter.

**Footer + Newsletter** (`initFooter`): Newsletter-Sektion (E-Mail, DSGVO-Hinweis) direkt vor dem Footer. Footer mit Copyright, Impressum, Datenschutz, Instagram-Link aus `data.json`.

**Lightbox** (`initLightbox`): Vollständige Lightbox-Struktur inkl. `lb-img-wrap`, `lb-info`, `lb-close`, `lb-counter`, `lb-titel`, `lb-meta`, `lb-action`.

### 4.4 Technische Regeln

- Loop-Variablen nie `t` nennen (Konflikt mit `t()`-Übersetzungsfunktion)
- `openDetail(id, context)` öffnet die Lightbox
- `renderFooter(data)` ist Alias für `initFooter(data)` – beide Namen funktionieren

---

## 5. `sf-base.css` – Single Source of Truth für globale Styles

Einbindung:

```html
<link rel="stylesheet" href="sf-base.css?v=52">
```

**Wichtigste Regel:** Globale Stile nie lokal in HTML-Dateien überschreiben. Ausnahmen nur für genuinen Seitenbedarf (Galerie-Vollbild-Layout).

### 5.1 Seitentitel

```css
font-size: min(13vw, 10rem, 12dvh) !important;
```

Gilt für alle Unterseiten. `12dvh` verhindert überdimensionale Titel auf Laptops und Hochformat.

### 5.2 Abstände Unterseiten

```css
--subpage-content-gap: clamp(44px, 5vw, 64px);
```

### 5.3 Lightbox

```css
.lightbox-card { height: 90dvh; width: min(1100px, calc(100vw - 112px)); }
```

Feste Kartengröße. Caption: 4 feste Zeilen (Jahr, Medium, Maße, Serie), `serie` als unsichtbarer Platzhalter wenn leer. `#lb-action` mit `margin-top: auto` immer am unteren Rand.

### 5.4 Scrollbar (Webkit)

```css
::-webkit-scrollbar { width: 15px; }
::-webkit-scrollbar-track { background: white; box-shadow: inset 1px/−1px schwarz; }
::-webkit-scrollbar-thumb { background: black; border-radius: 0; }
html { scrollbar-width: thin; scrollbar-color: black white; } /* Firefox */
```

### 5.5 Hero-Bezeichnung

`font-size: 0.8rem` – rem-basiert, nicht vw, damit stabile Größe auf allen Viewports.

---

## 6. `galerie.html` – Vollbild-Layout

### 6.1 Einzige Sonderregeln

- `footer { display: none }` – kein Footer, kein vertikales Scrollen
- `html, body { height: 100dvh; overflow: hidden }`
- `z-index: 999` auf `.nav-overlay` – überlagert das Vollbild-Layout

### 6.2 Init-Sequenz

```js
initNav(false);
initLightbox();
initContactInteractions();
// kein initFooter() → kein Footer
Promise.all([fetch('data.json'), fetch('galerie.json')])
  .then(([werkData, galerie]) => { DATA = werkData; buildWand(...); applyLang(); });
```

---

## 7. `galerie.json` – Datenmodell

### 7.1 Config

```json
{ "haenge_prozent": 47, "stapel_gap_px": 16 }
```

### 7.2 Slots

| Feld | Pflicht | Bedeutung |
|---|---|---|
| `slot` | ja | Laufende Nummer |
| `abstand_vor` | ja | Horizontaler Abstand zum vorherigen Block in px |
| `werk_id` | ja | Referenz auf `id` in `data.json` |
| `reihe` | ja | 1 = neuer Block, >1 = Teil des vorherigen Stapels |
| `versatz_px` | nein | Vertikaler Versatz des Blocks von der Mittellinie |
| `zoom` | nein | Prozentualer Zoom (100 = normal) |

### 7.3 Stapel

Gesamthöhe = h₁ + `stapel_gap_px` + h₂. Mittellinie bei Gesamthöhe/2. Bilder unterschiedlicher Breite werden horizontal zentriert. Aktuelle Stapelblöcke: Slots 1+2 (Nachtschicht), Slots 5+6 (Atelier 2+3).

### 7.4 Galerie-Editor

`galerie-editor.html` (nicht im Deployment) – lokales Werkzeug mit ↑↓, Abstand/Versatz/Zoom, Stapel-Toggle, JSON-Export. Dieselbe Funktionalität auch im Admin-Backend unter „Galerie-Wand".

---

## 8. Admin-Backend (`admin.html`)

Passwortgeschützt (SHA-256-Hash in `data.json` → `meta.admin.passwordHash`). GitHub Token und Repo-URL werden im `localStorage` des Browsers gespeichert.

### 8.1 Sektionen

| Sektion | Funktion |
|---|---|
| Werke | Liste, bearbeiten, neues Werk, löschen |
| News | Liste, bearbeiten, neue News, löschen |
| Katalog | Bibliografie, Ausstellungsinfo, Aufsatz (alle Textblöcke DE/EN) |
| Vita | Fließtext DE/EN, Steckbrief, Tagline |
| Galerie-Wand | Vollständiger Slot-Editor (identisch mit galerie-editor.html) |
| Bilder hochladen | Direkt zu Cloudinary via Unsigned Preset |
| Einstellungen | GitHub Token/Repo/Branch, Netlify Deploy Hook, Hero-Bilder, Passwort ändern |

### 8.2 Technischer Ablauf

Speichern → GitHub API (`PUT /repos/{repo}/contents/{path}`) → optional Netlify Deploy Hook auslösen → Website live.

---

## 9. `data.json` – Datenmodell

```json
{
  "meta": {
    "name": "Sebastian Friedrich",
    "tagline": "...", "tagline_en": "...",
    "vita": { "text": "...", "text_en": "...", "ausbildung": "...", "geboren": "1987",
              "lebt_arbeitet": "Leipzig", "ausstellungen": [...] },
    "kontakt": { "email": "", "instagram": "https://...", "newsletter_list_id": "" },
    "admin": { "passwordHash": "sha256-hash" },
    "hero_bilder": ["url1", "url2"]
  },
  "werke": [...],
  "katalog": [...],
  "news": [...]
}
```

Aktuell: 44 Werke, 1 Katalog, 5 News. Hero-Bilder: Senhora Rodriguez 3, Perseus.

---

## 10. Unterseiten

| Seite | Besonderheit |
|---|---|
| `index.html` | Hero fullbleed, Fisher-Yates-Shuffle neueste Werke, „Alle Werke" → galerie.html |
| `galerie.html` | Vollbild, kein Footer, horizontales Scrollen, galerie.json |
| `werke.html` | Filter, Verfügbarkeitsmodus, Desktop mit Verbindungslinien |
| `news.html` | Jahres-Gliederung |
| `katalog.html` | Hero Cover + Bibliografie, Essay, Reader-Modal |
| `vita.html` | Fließtext + Steckbrief, letzte Tabellenzeile ohne Border |
| `kontakt.html` | Netlify Form, Social-Links |
| `reader.html` | PDF.js-Reader |

---

## 11. Responsive

```text
> 1120px   Desktop: Lightbox nebeneinander
≤ 1120px   Mobile-Lightbox: gestapelt, 30dvh Caption-Bereich, scrollbar
≤ 760px    Mobile Nav, Slider-Logik
```

---

## 12. Assets und externe Dienste

- **Cloudinary** `def9qgwtw`: alle Bilder
- **Netlify**: Hosting + Forms
- **GitHub**: Datei-Storage, Admin schreibt via API
- **Fonts**: lokal, Inter 300/400/500 WOFF2

---

## 13. Cache-Busting

```html
sf-base.css?v=52
sf-base.js?v=52
```

Cache-Busting auf v=52 gesetzt (Stand: 10. Juni 2026).

---

## 14. Verbindliche Gestaltungsentscheidungen Stand v52

- Navigation: Galerie, News, Katalog, Vita, Kontakt
- Primärzugang Werke: Galerie
- Seitentitel: `min(13vw, 10rem, 12dvh)` – eine Regel, überall gleich
- Hero-Bezeichnung: `rem`-basiert (stabile Größe)
- Hero-Bilder: Senhora Rodriguez 3, Perseus
- Galerie: cm-genaue Darstellung, Stapel horizontal zentriert, kein Footer
- Perseus (150 × 120 cm): Referenzwerk für Wandskalierung
- Lightbox: aus `sf-base.js` injiziert, 4 feste Caption-Zeilen, Button immer unten
- Nav + Overlay + Footer + Newsletter: aus `sf-base.js` injiziert
- Scrollbar: Webkit 15px, schwarz/weiß, eckig; Firefox thin
- Autorenreihenfolge: **John Palatini, Christian Drobe**
- Keine Google Fonts, `youtube-nocookie.com`, `100dvh` statt `100vh`
- Favicon: typografisches `SF`, schwarz auf weiß

---

## 15. Offene Punkte

1. **Cache-Busting** auf `v=52` erhöhen vor Deployment
2. **Cloudinary Upload Preset** einrichten (für Admin-Bildupload)
3. **Rechtstexte** final prüfen
4. **Gerätecheck** (iPhone Safari, WhatsApp-In-App)

---

## 16. Versionslog

```text
v30–v48  siehe SF_Architektur_v11.md
v49      Hero Fullbleed, Slider, Lightbox Tablet
v50      Galerie-Seite, galerie.json, Scrollbar-Design, Vollbild-Layout
v51      Scrollbar 20px, dvh-Titelgröße, Resize-Debounce
v52      Galerie: 44 Werke, 2 Stapelblöcke, horizontal zentriert
         Lightbox Single Source (sf-base.js), alle Fragmente entfernt
         Nav + Overlay + Footer + Newsletter Single Source (sf-base.js)
         Aktiver Nav-Link per URL automatisch erkannt
         Admin-Backend (admin.html): Werke, News, Katalog, Vita,
           Galerie-Editor, Cloudinary-Upload, Einstellungen
         Caption: 4 feste Zeilen, Button margin-top:auto
         Seitentitel vereinheitlicht min(13vw,10rem,12dvh)
         Hero-Bezeichnung rem-basiert
         Vita: letzte Tabellenzeile ohne border-bottom
         Scrollbar: Webkit 15px schwarz/weiß, Firefox thin
         Medusa aus hero_bilder entfernt
```
