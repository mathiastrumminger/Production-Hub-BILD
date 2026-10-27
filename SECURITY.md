# Sicherheit

## Unterstützter Stand

Aktuell wird nur die Version auf `main` gepflegt.

## Wichtige Einschränkungen

Production Hub v0.24 speichert Daten unverschlüsselt im `localStorage` des Browsers. Rollen werden clientseitig ausgewertet. Der Prototyp darf daher nicht als belastbare Authentifizierungs-, Autorisierungs- oder zentrale Datenspeicherlösung verstanden werden.

## Umgang mit Daten

- Repository privat halten.
- Keine echten Passwörter, Tokens oder vertraulichen Personaldaten committen.
- Vor der Weitergabe Demo- und Infrastrukturangaben prüfen.
- Backups wie operative Daten behandeln.
- Für einen produktiven Betrieb Backend, serverseitige Rechte, Verschlüsselung, Logging, Backup und Aufbewahrungsregeln ergänzen.

Sicherheitsfunde bitte nicht als öffentliches Issue veröffentlichen, sondern über den internen Sicherheitsweg des zuständigen Teams melden.
