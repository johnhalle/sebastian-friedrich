# CHANGELOG v48 – Hero-Titel oben rechts fixiert

## Ziel
Die Hero-Beschriftung auf der Startseite sollte in allen Nicht-Smartphone-Ansichten zuverlässig rechts oben stehen, mit konstantem Abstand nach oben und rechts. Dadurch soll vermieden werden, dass die Schrift in den Kopf der dargestellten Figur hineinragt.

## Änderung
- `index.html` angepasst:
  - `.hero-text` auf Desktop/Tablet mit festem oberen Abstand positioniert: `top: calc(var(--nav-h) + 28px)`
  - Desktop-/Tablet-Media-Queries entsprechend vereinheitlicht
- Smartphone-Ansicht (`max-width: 760px`) unverändert belassen
- Schriftgröße unverändert belassen

## Ergebnis
- Hero-Titel bleibt oberhalb des Kopfbereichs der Figur
- rechter Abstand bleibt wie bisher
- keine Verkleinerung der Schrift in Nicht-Smartphone-Ansichten
