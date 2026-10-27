# Changelog

## Bildnext-Hosting – 2026-10-27

- ARM64-Container, statischer Nginx-Server und Helm-Chart ergänzt
- private Container- und Chart-Veröffentlichung mit Container-Smoke-Test ergänzt
- PRD-Hosting mit Firmennetz-Zugriff und Release-/Rollback-Dokumentation vorbereitet
- Anwendungslogik, Datenmigrationen und Storage-Keys unverändert

## 0.24.0 – 2026-10-27

### Repository-Baseline

- v0.24 aus der eigenständigen HTML-Datei übernommen
- HTML, CSS, Anwendungslogik und JSZip getrennt versionierbar gemacht
- unveränderte Standalone-Ausgangsversion archiviert
- lokaler Entwicklungsserver ohne externe Abhängigkeiten ergänzt
- reproduzierbaren Standalone- und Site-Build ergänzt
- Struktur-, Syntax- und Persistenztests ergänzt
- CI-Workflow sowie Architektur-, Migrations- und Sicherheitshinweise ergänzt

### Anwendung

- keine fachliche Logik und keine Storage-Keys geändert
- erwartete Datenbankversion bleibt 21
