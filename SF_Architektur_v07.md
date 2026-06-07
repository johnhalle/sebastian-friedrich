# SF Website – Architektur v07
*Stand: Juni 2026*

## Dateistruktur

```
/
├── sf-base.css        ← Gemeinsame Styles (Fonts, Reset, Nav, Lightbox, Footer, Buttons, Werk-Karte)
├── sf-base.js         ← Gemeinsames JS (I18N, Nav, Lightbox, Footer)
├── index.html         ← Startseite (Hero, Neueste Werke, News, Katalog, Newsletter)
├── werke.html         ← Werke-Übersicht (Grid, Filter: Alle / Verfügbare Werke)
├── data.json          ← Einzige Datenquelle
├── fonts/             ← Inter-Light/Regular/Medium .woff2
└── SF_Architektur_v07.md
```

## Prinzipien

- **Eine Datenquelle:** `data.json` — alle Seiten fetchen dieselbe Datei
- **Gemeinsame Basis:** `sf-base.css` + `sf-base.js` werden von jeder Seite eingebunden
- **Lightbox existiert einmal:** HTML-Snippet + CSS in sf-base.css + JS in sf-base.js. Änderungen gelten global.
- **Seiten-spezifisches** bleibt im jeweiligen `<style>`- und `<script>`-Block der HTML-Datei

## Nav-Verhalten

- Seiten **mit Hero** (`index.html`): Nav startet unsichtbar (`opacity: 0`), erscheint nach dem Scrollen durch den Hero → `initNav(true)`
- Seiten **ohne Hero** (alle Unterseiten): Nav immer sichtbar (Klasse `always-visible`) → `initNav(false)`

## Lightbox

- Verbindliche Implementierung: `alignInfoPanel()` via `getBoundingClientRect` nach jedem Bildwechsel
- Panel-Oberkante fluchtet mit Bild-Oberkante, Panel-Unterkante / Button-Unterkante fluchtet mit Bild-Unterkante
- Mobile: Touch-Swipe, keine Pfeil-Buttons

## Navigation (Reiter)

| Reiter | Datei | Beschreibung |
|--------|-------|--------------|
| Werke | werke.html | Alle Werke als Grid; Filter: Alle / Verfügbare Werke |
| Porträts | portraets.html | (geplant) |
| News | news.html | (geplant) |
| Katalog | katalog.html | (geplant) |
| Vita | vita.html | (geplant) |
| Kontakt | kontakt.html | (geplant) |

## data.json – Schlüsselfelder Werk-Objekt

```json
{
  "id": "marco-2026",
  "titel": "Marco",
  "jahr": 2026,
  "medium": "Öl auf Leinwand",
  "medium_en": "Oil on canvas",
  "masse": "30 × 40 cm",
  "gerahmt": false,
  "verfuegbar": true,
  "serie": "Mythologie",
  "bild": "https://res.cloudinary.com/...",
  "neu": true
}
```

## Technische Regeln

- Loop-Variablen nie `t` (Konflikt mit `t()`-Übersetzungsfunktion)
- `100dvh` statt `100vh`
- Keine Google Fonts — Inter lokal in `/fonts/`
- Bilder auf Cloudinary
- Kontrast: `#a867a7` und `#888` nie für Fließtext
