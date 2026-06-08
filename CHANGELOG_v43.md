# CHANGELOG v43

## Änderungen

1. **Lightbox auf Tablet gestapelt**
   - Der Umschaltpunkt der gemeinsamen Werk-Lightbox wurde auf mittlere Breiten vorgezogen.
   - Ab Tablet-/Mittelbreiten wird Bild über der Caption gestapelt statt nebeneinander angezeigt.
   - Betrifft die Werk-Lightbox auf Startseite, Werke und Katalogaufsatz.

2. **Landingpage-Karten verkürzt und verdichtet**
   - Die Karten im Bereich „Neueste Werke“ wurden etwas verkürzt.
   - Der graue Abstand zwischen Bildunterkante und Textbeginn wurde zusätzlich reduziert.
   - Die feste, einheitliche Kartenhöhe bleibt erhalten; die Breite darf weiterhin leicht variieren.

3. **Werke-Seite: Stapelansicht auf Tablet früher**
   - Der Wechsel von Seitenlayout zu gestapelter Darstellung erfolgt jetzt bereits auf mittleren Breiten.
   - Dadurch werden problematische Zwischenzustände wie bei „Die Näherin“ vermieden.
   - Verbindungslinien werden in diesen Breiten nicht mehr berechnet oder angezeigt.

4. **Cache-Busting**
   - Referenzen auf `sf-base.css` und `sf-base.js` auf `v=43` angehoben.
