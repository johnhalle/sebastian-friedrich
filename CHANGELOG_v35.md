# CHANGELOG v35

## Werke-Seite: L-Verbindungslinie

- Die bisher rein horizontale Verbindungslinie zwischen Werkbild und Werkdaten wurde in der Desktop-Ansicht zu einer L-Form erweitert.
- Die Linie beginnt weiterhin an der tatsächlichen Bildkante und läuft horizontal in Richtung Werkdaten.
- Am captionsseitigen Ende läuft sie im rechten Winkel nach oben bis zur Oberkante des Werktitels.
- Die Logik berücksichtigt weiterhin das wechselnde Links-Rechts-Layout.
- Mobile bleibt unverändert; dort wird keine Verbindungslinie angezeigt.

## Technik

- `werke.html` angepasst.
- Cache-Busting auf `v=35` erhöht.
- Reduziertes Fontpaket beibehalten.
