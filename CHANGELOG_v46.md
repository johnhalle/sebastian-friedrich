# CHANGELOG v46

## Änderungen

1. **Landingpage-Karten: Caption-Breite an Bildbreite gekoppelt**
   - Die feste Kartenlänge aus v45 bleibt unverändert.
   - Die graue Caption-Box wird auf Desktop nach dem Bild-Layout an die tatsächlich gerenderte Bildbreite angepasst.
   - Dadurch schließen Bild und graue Fläche wieder bündig ab, auch bei Hochformaten wie Shams.

2. **Lightbox und Werke-Breakpoint angeglichen**
   - Die Werk-Lightbox schaltet jetzt ebenfalls bei mittleren Breiten auf die gestapelte Darstellung um.
   - Der Breakpoint ist an die Werke-Seite angeglichen: bis einschließlich 1120 px gestapelt, oberhalb davon nebeneinander.

3. **Lightbox: Caption-Bereich bei Zoomstufen stabilisiert**
   - Die gestapelte Lightbox nutzt nun eine scrollbare Gesamtkarte statt eines starr abgeschnittenen Panels.
   - Metadaten und Anfragebutton bleiben auch bei ungünstigen Zoom-/Tabletstufen zugänglich.

4. **Cache-Busting**
   - Referenzen auf `sf-base.css` und `sf-base.js` auf `v=46` angehoben.
