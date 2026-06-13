# Sebastian Friedrich – Website-Architektur v14
*Stand: 13. Juni 2026*

---

## 1. Projektübersicht

Statische Website für den Maler Sebastian Friedrich (sebastianfriedrich.de). Deployment via GitHub + Netlify. Keine serverseitige Logik, kein Framework. Alle Daten in JSON-Dateien, alle Seiten in HTML/JS.

**GitHub-Account:** sebastianfriedrich (separates Konto)
**Netlify:** separates Konto (Sebastians E-Mail)

---

## 2. Dateistruktur

```
/
├── index.html
├── werke.html
├── galerie.html
├── vita.html
├── news.html
├── katalog.html
├── kontakt.html
├── impressum.html
├── datenschutz.html
├── danke.html
├── reader.html
├── admin.html              ← Admin-Panel (372 KB, v52)
├── sf-base.css             ← Globales Stylesheet (v52)
├── sf-base.js              ← Globales JavaScript (v52)
├── data.json               ← Einzige Datenquelle (44 Werke, 5 News, 1 Katalog)
├── galerie.json            ← Kuratorische Daten Galerie-Wand (44 Slots)
├── site.webmanifest
├── favicon.ico / .png
└── fonts/
    └── webfonts/
        ├── inter-latin-300-normal.woff2
        ├── inter-latin-400-normal.woff2
        └── inter-latin-500-normal.woff2
```

---

## 3. Datenarchitektur

### data.json
Einzige Wahrheitsquelle. Struktur:

```json
{
  "meta": {
    "name": "Sebastian Friedrich",
    "tagline": "...",
    "hero_bilder": ["cloudinary-url-1", "cloudinary-url-2"],
    "admin": { "passwordHash": "sha256-hash" },
    "kontakt": {
      "email": "sebastian.friedrich87@web.de",
      "instagram": "https://www.instagram.com/sebastiano_friedrich/",
      "newsletter_list_id": ""
    },
    "vita": {
      "text": "...",
      "ausbildung": "2009–2018 ...",
      "geboren": 1987,
      "lebt_arbeitet": "Leipzig",
      "ausstellungen": ["Hallescher Kunstverein", "Art Karlsruhe", ...]
    }
  },
  "werke": [
    {
      "id": "medusa-2025",
      "titel": "Medusa",
      "jahr": 2025,
      "masse": "120 × 100 cm",
      "hoehe_cm": 120.0,
      "breite_cm": 100.0,
      "medium": "Öl auf Leinwand",
      "medium_en": "Oil on canvas",
      "gerahmt": false,
      "serie": null,
      "portraet": false,
      "verfuegbar": true,
      "preis": null,
      "neu": true,
      "bild": "cloudinary-url",
      "reihe": null,
      "groesse": "xl"
    }
  ],
  "news": [...],
  "katalog": [...]
}
```

**Wichtig:** `masse` = Freitext-String (Anzeige), `hoehe_cm`/`breite_cm` = Zahlenwerte (Berechnung). Erstes Maß in `masse` ist immer die **Höhe**. Ist Höhe < Breite → Querformat.

### galerie.json
Kuratorische Entscheidungen für die Galerie-Wand. Strikt getrennt von data.json.

```json
{
  "config": { "px_pro_cm": null },
  "slots": [
    {
      "slot": 1,
      "werk_id": "nachtschicht-2026",
      "reihe": 1,
      "abstand_vor": 80,
      "versatz_px": 0,
      "zoom": 100
    }
  ]
}
```

---

## 4. Technische Grundregeln

- **Loop-Variablen:** nie `t` (Konflikt mit `t()`-Übersetzungsfunktion)
- **Viewport-Höhe:** `100dvh` statt `100vh`
- **Fonts:** lokal gehostet (kein Google Fonts CDN)
- **YouTube:** ausschließlich `youtube-nocookie.com`
- **Kontrast:** `#a867a7` und `#888` nie für Fließtext
- **Fetch-only:** keine inline-Daten-Fallbacks
- **`atob()` für UTF-8:** immer via `TextDecoder`
- **Nach jedem Edit:** `grep -c "<body>"` muss 1 ergeben

---

## 5. Cache-Busting

Aktueller Stand: **v52** (sf-base.css, sf-base.js, alle HTML-Dateien konsistent).

---

## 6. Bilder

Alle Bilder auf **Cloudinary** (Account: def9qgwtw).
- Upload Preset: noch einzurichten
- Transformationen in URLs: `w_1400,c_limit,q_88` für PDF-Export, `w_160,h_160,c_fit,q_70` für Thumbnails

---

## 7. Admin-Panel (admin.html)

### Passwort
SHA-256-Hash in `data.json` unter `meta.admin.passwordHash`. Kein Klartext.

### Panels
- **Werke** – CRUD, Bild-Upload via GitHub API
- **News** – CRUD
- **Einstellungen** – Meta, Vita, Hero-Bilder
- **Galerie-Wand** – Slot-Editor für galerie.json
- **Portfolio PDF** – PDF-Generator (neu in v14)
- **Bilder hochladen** – Cloudinary-Upload

### Session-Persistenz
Nach Login wird `sessionStorage.setItem('sf_admin_auth', '1')` gesetzt. Bei Seiten-Reinit (z.B. nach PDF-Download in Chrome/file://) wird der Login-Screen automatisch übersprungen.

---

## 8. Portfolio PDF (neu in v14)

### Technologie
- **jsPDF 2.5.1** via CDN (cdnjs.cloudflare.com)
- **Inter-Font** eingebettet als Base64-TTF (300/400/500, je ~88KB, gesamt ~264KB)
  - Registriert als: `InterL` (light/300), `InterR` (normal/400), `InterM` (medium/500)
  - jsPDF-Style immer `'normal'` (Custom-Fonts kennen nur normal/bold)
- **Format:** A4 Hochformat, 210×297mm
- **Ränder:** ML=22mm, MR=22mm, MT=20mm, MB=20mm
- **Satzspiegel:** 166×257mm

### Seitenstruktur
1. **Titelseite** – Bild randlos (Canvas-Export 1240×1754px), Text via HTML Canvas eingezeichnet (nicht jsPDF) → pixel-perfect mit Preview
2. **Textseite** (optional) – Überschrift 36pt + schwarze Linie + Fließtext 13pt, Zeilenabstand 1.6
3. **Werkseiten** – Bild oben ausgerichtet (nie beschnitten, fit-in-box), Caption bündig zur Bildkante: Titel 16pt + Metazeile 9pt grau
4. **Vita-Seite** (optional) – Überschrift „Vita" 36pt + Linie + Fließtext + Ausbildung + Ausstellungen
5. **Kontaktseite** – Überschrift „Kontakt" 36pt + Linie + zweispaltig (Adresse links, Kontaktdaten rechts)
6. **Fußzeile** – auf allen Seiten außer Titelseite: feine Linie + „Sebastian Friedrich" 7.5pt

### Titelseiten-Editor
- Canvas-Vorschau im A4-Verhältnis (560×792px CSS)
- Pan: Maus ziehen
- Zoom: Mausrad oder ＋/－-Buttons
- Schriftgröße: Slider 14–60px (live-Preview)
- Typografie: „Sebastian" / „Friedrich" je eine Zeile + „MALER", oben rechts, weiß
- Text wird direkt in Canvas gerendert (ctx.fillText), kein jsPDF

### Pflichtfunktionen (müssen nach JEDEM Eingriff vorhanden sein)
```
pfRenderPreviewStrip, pfBuildPageList, pfDragStart, pfDragOver, pfDrop,
pfRenderWerkeGrid, pfSetTitelbild, pfInitCanvas, pfDrawCanvas, pfFitImage,
pfCanvasZoom, pfUpdateTypo, pfGetCanvasDataUrl, pfRegisterFonts, pfFont,
pfAddPageHeader, pfAddPageFooter, pfAddTitelseite, pfAddWerkseite,
pfAddTextseite, pfAddVitaseite, pfAddKontaktseite, pfLoadImage,
exportPortfolioPDF
```
Fehlende Funktionen → sofort vor `pfLoadImage` einfügen.

### Texte (vorbelegt)
**Portfolio-Text (1800 Zeichen max):**
> Mich interessiert der Moment, in dem jemand ganz bei sich zu sein scheint. Das Verb „scheinen" ist dabei entscheidend – ich behaupte keine Wahrheiten hinter der Oberfläche...

**Vita (Ich-Form):**
> Ich bin 1987 geboren und habe früh angefangen zu malen. Von 2009 bis 2018 studierte ich an der Burg Giebichenstein Kunsthochschule Halle (Saale). Seitdem lebe und arbeite ich in Leipzig...

---

## 9. Galerie-Wand (galerie.html)

- Horizontal scrollbare Wand
- `parseMasse(w.masse)` parst Freitext-Maße (Höhe × Breite)
- `px_pro_cm` aus Viewport berechnet oder manuell in galerie.json
- Scrollbar: custom touch/mouse
- Stapel-Slots: reihe > 1 für übereinander liegende Bilder

### Geplant (noch nicht umgesetzt)
- `abstand_vor_portrait`: separater Abstandswert für Hochformat/Smartphone

---

## 10. Offene Punkte

| # | Aufgabe | Priorität |
|---|---------|-----------|
| 1 | `abstand_vor_portrait` in galerie.json + galerie.html + admin.html | mittel |
| 2 | Cloudinary Upload Preset einrichten | hoch |
| 3 | Rechtstexte (Impressum, Datenschutz) final prüfen | mittel |
| 4 | Gerätecheck: iPhone Safari, WhatsApp-In-App | mittel |
| 5 | Portfolio: PDF-Speichern zuverlässig testen (Chrome file:// vs. Netlify) | hoch |
| 6 | `meta.kontakt.email` und `newsletter_list_id` befüllen | niedrig |

---

## 11. Arbeitsregeln (Session-Start)

1. John lädt aktuelle Dateien hoch + nennt „Ziel: X – nur das"
2. Claude fordert fehlende Dateien ein
3. Nur explizit Beauftragtes ändern
4. Vor Dateiausgabe: Änderungsliste
5. Session-Ende: Änderungsliste, John bestätigt vor finaler Datei
6. Nach admin.html-Eingriff: Pflichtprüfung (24 Funktionen + node --check + grep -c body)
7. Bei langem Chat oder großen Dateien: aktiv auf volles Kontextfenster hinweisen

---

*Dokument erstellt auf Basis der Arbeitssession vom 13. Juni 2026.*
*Vorgänger: SF_Architektur_v13.md*
