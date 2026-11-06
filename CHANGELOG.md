# Changelog

## 0.30 – 2026-11-06

### v0.29 – Masken-Anfrage: freie Zeitfenster
- Masken-Anfragen zeigen jetzt freie Zeitfenster statt fixem Drehbeginn
- Automatische Prüfung der Masken-Kapazität mit Auslastungsanzeige
- Intelligente Berechnung von Alternativzeiten für Studio-Buchungen
- Verbesserte Masken-Planung mit visueller Belegungsdarstellung

### v0.28 – Globale Suche und Erfolgsmeldungen
- Neue globale Suchfunktion auf der Übersicht für alle Kollektionen
- Prominente Erfolgsmeldungen oben rechts im Interface
- Verbesserte Toast-Benachrichtigungen mit animierten Erfolgshinweisen
- Durchsuchbare Inhalte: Studio-Termine, Streams, Maske, Schnitte, Anfragen, Personal, Equipment

### v0.27 – Streaming-Tabelle
- Excel-ähnliche Streaming-Tabelle mit Inline-Editing
- Tastenkürzel für schnelle Dateneingabe (Tab, Enter, Strg+D für Duplizieren)
- Multi-Zeilen-Bearbeitung und Bulk-Operationen
- Event-Vorlagen für wiederkehrende Streams
- Batch-Anlage von Events aus Vorlagen mit automatischer Terminverteilung
- Copy-Paste-Support aus Excel/Spreadsheets

### v0.26 – Accessibility (WCAG 2.1)
- Focus-Indikatoren für Tastaturnavigation (WCAG 2.4.7)
- Verbesserte ARIA-Labels und Rollen (WCAG 4.1.2, 1.3.1)
- Skip-Links für schnelle Navigation (WCAG 2.4.1)
- Fehlerkennung und Hinweise in Formularen (WCAG 3.3.2)
- Responsive Design für mobile Geräte
- Unterstützung für prefers-reduced-motion

### v0.25 – Accessibility-Grundlage
- 8-Pixel-Grid für konsistente Abstände
- rem-basierte Schriftgrößen für bessere Skalierung
- Mindest-Zielgrößen von 24×24px für Touch-Targets (WCAG 2.5.8)
- Verbesserte Mindesthöhen für Eingabefelder (40px) und Buttons (32px)
- Erhöhte Zeilenhöhe für bessere Lesbarkeit (line-height: 1.5)

### Technische Verbesserungen
- Erweiterte CSS-Struktur mit neuen Utility-Klassen
- Optimierte Formular-Validierung
- Verbesserte Performance bei großen Datensätzen
- Neue Hilfsfunktionen für Masken- und Studio-Planung

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
