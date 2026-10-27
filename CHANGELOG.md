# Changelog

## 0.24.1 – 2026-10-27

- Original-Repository als einzige Quelle für Builds und private Registry-Pakete festgelegt
- Chart-Standardwerte auf das Image im Original-Owner umgestellt
- PRD-Lesezugriff für das bestehende Servicekonto als Deployment-Voraussetzung dokumentiert
- Anwendungslogik und Schema-Version 21 unverändert

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
