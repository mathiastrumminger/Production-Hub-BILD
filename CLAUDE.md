# Production Hub – Projektrichtlinien für Claude

## Was ist Production Hub?

Production Hub ist ein browserbasiertes Studio- und Produktionsplanungstool für das **BILD Video Ressort**. Die Anwendung läuft vollständig im Browser und speichert alle Daten lokal im localStorage des Browsers.

**Zentrale Funktionen:**
- Studio-Buchungen und Produktionsplanung
- Live-Streaming-Koordination
- Masken-Termine und -Anfragen
- Schnittplanung für Cutter
- Personal- und Equipment-Verwaltung
- Kamera-Anfragen und Drehs
- Redaktionsanfragen

## Nutzergruppen

Das Tool wird von verschiedenen Teams genutzt:

1. **Produktion** – Koordination und Planung aller Ressourcen
2. **Video Producer** – Technische Umsetzung von Streams und Studio-Produktionen
3. **Redaktion** – Anfragen für Drehs, Studio und Maske
4. **Video-Redaktion** – Spezielle Redaktions-Features
5. **Video Business** – Geschäftliche Streaming-Planung
6. **Cutter** – Schnittplanung und Post-Produktion
7. **Maske** – Masken-Termine und Verfügbarkeit

## Wichtig: Kommunikationsstil

**Der Projektinhaber ist kein professioneller Entwickler.** Bitte:

- ✅ Erkläre technische Konzepte einfach und verständlich
- ✅ Verwende deutsche Begriffe wo möglich
- ✅ Zeige konkrete Beispiele statt nur Theorie
- ✅ Erkläre, WARUM etwas gemacht wird, nicht nur WIE
- ✅ Warnung bei risikoreichen Operationen mit klarer Erklärung
- ❌ Vermeide Fachjargon ohne Erklärung
- ❌ Keine Abkürzungen ohne Erläuterung

## Entwicklungs-Workflow

### Vor jedem Commit MUSS laufen:

```bash
npm test
npm run build
```

**Beide Befehle müssen ohne Fehler durchlaufen!**

- `npm test` prüft Code-Syntax und Repository-Struktur
- `npm run build` erstellt die produktiven Dateien in `dist/`

### Versionserhöhung

Bei jedem Versionssprung (z.B. v0.30 → v0.31) müssen **drei Dateien** synchron erhöht werden:

1. **VERSION** – Die Hauptversionsdatei
2. **package.json** – Feld `"version"`
3. **helm/production-hub/Chart.yaml** – Felder `version` und `appVersion`

**Beispiel für v0.31:**
```
VERSION: 0.31
package.json: "version": "0.31.0"
Chart.yaml: version: 0.31.0
Chart.yaml: appVersion: "0.31"
```

## Kritische Regel: Datensicherheit

### ⚠️ NIEMALS Nutzerdaten verlieren!

Die Anwendung speichert alle Daten im Browser unter:
- `localStorage['productionHub.v1']` – Hauptdaten
- `localStorage['productionHub.ui']` – UI-Einstellungen

**Absolut verboten:**
- ❌ localStorage-Keys umbenennen ohne Migration
- ❌ Datenstruktur-Änderungen ohne Migrationscode
- ❌ Löschen von Datenfeldern ohne Prüfung

**Pflicht bei Datenmodelländerungen:**
1. Neue `db.version` Migration hinzufügen (siehe `docs/DATA-MIGRATIONS.md`)
2. Migration muss idempotent sein (mehrfach ausführbar)
3. Alte Daten müssen transformiert, nicht gelöscht werden
4. Migrationslogik MUSS getestet werden

**Vor großen Änderungen:**
- Benutzer auffordern, Backup zu exportieren (Administration → Daten-Export)
- Migrations-Code in separatem Commit mit ausführlicher Dokumentation

## Technischer Stack

- **Frontend:** Vanilla JavaScript (kein Framework)
- **CSS:** Vanilla CSS (keine Preprocessors)
- **Build:** Node.js-Skripte (`scripts/build.mjs`)
- **Deployment:** Docker + Kubernetes (Helm)
- **Hosting:** Bildnext PRD (internes Firmennetz)

## Repository-Struktur

```
.
├── src/
│   ├── app.js          # Hauptanwendungslogik
│   └── styles.css      # Alle Styles
├── standalone/         # Archivierte eigenständige HTML-Versionen
├── vendor/             # JSZip (versioniert)
├── scripts/            # Build- und Dev-Server
├── tests/              # Repository-Tests
├── helm/               # Kubernetes Helm-Chart
└── docs/               # Architektur-Dokumentation
```

## Git-Workflow

1. **Feature-Branch** von `main` erstellen
2. Änderungen implementieren
3. `npm test && npm run build` ausführen
4. Commit mit aussagekräftiger Message
5. Pull Request erstellen
6. Nach Review: Merge in `main`

**Branch-Naming:**
- `feature/beschreibung` – Neue Features
- `fix/beschreibung` – Bugfixes
- `docs/beschreibung` – Dokumentation

## Storage-Keys (NICHT ändern!)

Diese Keys sind produktiv im Einsatz und dürfen **NIEMALS** umbenannt werden:

- `productionHub.v1` – Hauptdaten
- `productionHub.ui` – UI-Einstellungen
- `productionHub.notif` – Benachrichtigungen

## Hilfreiche Befehle

```bash
npm start              # Dev-Server auf :4173
npm test               # Tests ausführen
npm run build          # Production Build
npm run check          # Nur Syntax-Check
```

## Bei Problemen

1. **Tests schlagen fehl:** Code-Syntax prüfen, Dateistruktur validieren
2. **Build schlägt fehl:** Pfade in `scripts/build.mjs` prüfen
3. **LocalStorage-Probleme:** Browser-Console öffnen, `localStorage.getItem('productionHub.v1')` prüfen
4. **Deployment-Probleme:** `helm/production-hub/` Konfiguration prüfen

## Dokumentation

Weitere Details in:
- `docs/ARCHITECTURE.md` – System-Architektur
- `docs/DATA-MIGRATIONS.md` – Migrations-Richtlinien
- `docs/DEPLOYMENT.md` – Deployment-Prozess
- `CHANGELOG.md` – Versionshistorie
- `README.md` – Schnellstart-Anleitung
