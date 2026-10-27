# Architektur

## Laufzeitmodell

Production Hub ist eine statische Single-Page-Anwendung. `index.html` stellt die feste Shell bereit; `src/app.js` rendert Ansichten und Dialoge dynamisch in den DOM. Es gibt aktuell keinen Server, keine API und keine zentrale Authentifizierung.

## Schichten

1. **Darstellung** – `index.html` und `src/styles.css`
2. **Anwendungslogik** – `src/app.js` mit Views, Aktionen, Formularen, Rollen und Widgets
3. **Persistenz** – `Store` über einen austauschbaren `storage`-Adapter
4. **Dateifunktionen** – Import/Export von JSON und XLSX; XLSX wird mit der vendorten JSZip-Bibliothek verarbeitet

## Persistenz

| Zweck | Schlüssel | Inhalt |
|---|---|---|
| Anwendungsdaten | `productionHub.v1` | Datenbankobjekt einschließlich `version` |
| UI-Zustand | `productionHub.ui` | Ansicht, Tabs, Filter, Benutzer, Theme, Kacheldichte |

Falls `localStorage` in einer eingebetteten OneDrive-/SharePoint-Vorschau nicht verfügbar ist, fällt die Anwendung auf einen nicht persistenten In-Memory-Speicher zurück.

## Berechtigungsmodell

Rollen und Gruppen werden im Browser ausgewertet. Das ist für die Oberfläche nützlich, aber **keine Sicherheitsgrenze**. Ein produktiver Mehrbenutzerbetrieb benötigt serverseitige Identität, Autorisierung, Datenhaltung und Auditierung.

## Bewusste Entscheidung für den ersten Repository-Stand

Die v0.24-Logik bleibt zunächst in einer Datei. Die Trennung von HTML, CSS, Anwendungscode und Vendor-Code reduziert das Änderungsrisiko und schafft eine verifizierbare Basis. Eine spätere Modularisierung sollte funktionsweise erfolgen und jeweils durch Browser-Tests abgesichert werden.
