# Production Hub

Production Hub ist ein browserbasierter Prototyp für Produktions-, Studio-, Streaming-, Masken-, Personal-, Equipment- und Schnittplanung. Die Repository-Basis ist **ProductionHub v0.24**.

## Aktueller technischer Stand

- statische Anwendung ohne Backend und ohne Laufzeit-Abhängigkeiten
- HTML, CSS und JavaScript als getrennte, direkt auslieferbare Dateien
- JSZip 3.10.2 liegt versioniert unter `vendor/` und funktioniert offline
- Anwendungsdaten im Browser unter `localStorage['productionHub.v1']`
- persönliche UI-Einstellungen unter `localStorage['productionHub.ui']`
- Datenmigrationen laufen beim Start sequenziell über `db.version`; v0.24 erwartet Schema-Version **21**
- die ursprüngliche eigenständige HTML-Datei bleibt unter `standalone/` erhalten

> **Wichtig:** Das ist weiterhin ein lokaler Prototyp, kein Mehrbenutzersystem. Daten werden weder synchronisiert noch serverseitig gesichert. Das Repository sollte wegen operativer Demo- und Infrastrukturangaben standardmäßig **privat** bleiben.

## Schnellstart

Voraussetzung: Node.js 20 oder neuer.

```bash
npm start
```

Danach `http://127.0.0.1:4173` öffnen. Alternativ funktioniert `index.html` direkt, ein lokaler HTTP-Server liefert jedoch ein stabileres Browser-Origin-Verhalten für `localStorage`.

## Prüfen und bauen

```bash
npm test
npm run build
```

Der Build erzeugt:

- `dist/site/` – statische, getrennte Dateien für Hosting
- `dist/ProductionHub_v0.24.html` – eigenständige HTML-Datei mit eingebettetem CSS, JavaScript und JSZip

## Repository-Struktur

```text
.
├── index.html                         # Einstieg und statisches HTML-Gerüst
├── src/
│   ├── app.js                         # bestehende v0.24-Anwendungslogik
│   └── styles.css                     # bestehendes v0.24-Design
├── vendor/jszip.min.js                # vendorte JSZip-Version 3.10.2
├── standalone/ProductionHub_v0.24.html# unveränderte Ausgangsversion
├── scripts/
│   ├── build.mjs                      # Site- und Standalone-Build
│   └── dev-server.mjs                 # lokaler Server ohne Abhängigkeiten
├── tests/repository.test.mjs          # Struktur- und Persistenzvertrag
├── docs/                              # Architektur und Migrationsregeln
└── .github/workflows/ci.yml           # automatisierte Prüfung und Build-Artefakt
```

## Daten sichern

Die Anwendung bietet unter Administration einen JSON-Export und -Import. Vor Änderungen an Migrationen oder Storage-Keys immer ein Backup aus der bisherigen Version exportieren.

## Entwicklung

1. Feature-Branch von `main` erstellen.
2. Bestehende Storage-Keys nicht umbenennen.
3. Für Datenmodelländerungen eine neue, idempotente `db.version`-Migration ergänzen.
4. `npm test` und `npm run build` ausführen.
5. Änderungen per Pull Request integrieren.

Details: [Architektur](docs/ARCHITECTURE.md), [Datenmigrationen](docs/DATA-MIGRATIONS.md), [Beitragen](CONTRIBUTING.md) und [Sicherheit](SECURITY.md).
