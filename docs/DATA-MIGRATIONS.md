# Datenmigrationen

## Vertrag in v0.24

- Storage-Key: `productionHub.v1`
- aktuelle Schema-Version: `21`
- Einstieg: `loadDb()` lädt JSON, ruft `migrate(x)` auf und speichert das Ergebnis
- unbekannte oder nicht vollständig migrierbare Versionen führen derzeit zum Laden der Demo-Daten

## Regel für jede Modelländerung

1. Schema-Version genau um eins erhöhen.
2. In `migrate(x)` einen neuen Block `if (x && x.version === N)` ergänzen.
3. Fehlende Collections und Felder defensiv initialisieren.
4. Bestehende Nutzerdaten nicht überschreiben, wenn bereits ein Wert vorhanden ist.
5. Am Ende des Blocks `x.version = N + 1` setzen.
6. Erwartete Version in `loadDb()`, Restore-Prüfung und Tests gemeinsam aktualisieren.
7. Migration mit einem Backup der vorherigen Version testen.

## Beispiel

```js
if (x && x.version === 21) {
  x.options = x.options || {};
  if (x.options.example == null) x.options.example = 'default';
  x.version = 22;
}
```

## Rückwärtskompatibilität

Der Repository-Umbau ändert weder Storage-Keys noch das Datenmodell. Daten einer zuvor geöffneten eigenständigen Datei sind wegen Browser-Origin-Regeln nicht automatisch unter `http://127.0.0.1` sichtbar. Für den Wechsel ist der JSON-Export aus der bisherigen Datei und der Import in die neue Origin der sichere Weg.
