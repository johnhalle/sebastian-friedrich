# CHANGELOG v33

## Landingpage: Hochformat-Karten im Bereich „Neueste Werke"

- Hochformatige Werke werden im Desktop-Slider automatisch erkannt, sobald das Bild geladen ist.
- Für Hochformate wird die eigentliche Karte innerhalb ihres Drittel-Slots schmaler gesetzt.
- Dadurch entstehen größere weiße Abstände links und rechts, während weiterhin drei Werke nebeneinander im Desktop-Raster bleiben.
- Bild und graue Textfläche sind bündig: Die Breite der grauen Karte entspricht der tatsächlich dargestellten Bildbreite.
- Mobile Darstellung bleibt unverändert ohne graue Kartenfläche.

## Technisch

- Markup der Startseiten-Werkkarten um `.werk-card-inner` ergänzt.
- JS-Klassifikation über natürliche Bildproportionen (`naturalHeight > naturalWidth * 1.08`).
- Cache-Busting auf `v=33` erhöht.
- Reduziertes Fontpaket beibehalten: nur tatsächlich genutzte Inter-Webfonts.
