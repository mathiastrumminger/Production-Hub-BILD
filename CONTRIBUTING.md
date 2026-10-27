# Beitragen

## Workflow

- kurze Branch-Namen, z. B. `feature/studio-filter` oder `fix/backup-restore`
- kleine, thematisch geschlossene Commits
- Pull Request mit Problem, Lösung, Testweg und möglicher Datenmigration
- `npm test` und `npm run build` vor jedem Pull Request

## Definition of Done

- bestehende Daten bleiben migrierbar
- UI funktioniert in aktuellem Chromium/Edge
- Import und Export bleiben funktionsfähig, wenn betroffen
- keine geheimen Schlüssel, Passwörter oder personenbezogenen Echtdaten im Commit
- Dokumentation und `CHANGELOG.md` sind bei relevanten Änderungen aktualisiert
