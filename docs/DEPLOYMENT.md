# Bildnext PRD

Production Hub bleibt eine statische Anwendung mit Daten im jeweiligen Browser.
Das Hosting schafft keine zentrale Benutzerverwaltung, Synchronisation oder Datensicherung.
Bestehende lokale Daten werden nicht automatisch auf die neue HTTPS-Origin übertragen;
dafür den vorhandenen JSON-Export und -Import verwenden.

## Komponenten

- Einziges Quell- und Build-Repository: `mathiastrumminger/Production-Hub-BILD`
- Privates ARM64-Image: `ghcr.io/mathiastrumminger/production-hub-bild:<VERSION>`
- Privates OCI-Chart: `oci://ghcr.io/mathiastrumminger/next-production-hub-chart`
- Flux: `spring-media/bildnext-flux-cd`, Verzeichnis `prd/production-hub`
- Ziel: `https://production-hub.prd.bildnext.as-infra.de`
- Zugriff: Firmennetz/VPN, Skipper-Prädikat `SourceFromLast("145.243.0.0/16")`

Es wird kein Deployment-Spiegel verwendet. Image und Chart entstehen direkt im Original
mit dem eigenen `GITHUB_TOKEN`. Der Cluster nutzt seinen bestehenden Registry-Zugang
für `maps-technical`; persönliche Tokens werden nicht in den Cluster kopiert.

## Einmalige Voraussetzung: PRD-Lesezugriff

`maps-technical` muss die privaten Pakete des Original-Repositories lesen dürfen.
Beide Pakete sind dem Original-Repository zugeordnet. Der Repository-Administrator
kann dem Servicekonto Lesezugriff auf das Repository geben:

```bash
gh api --method PUT \
  repos/mathiastrumminger/Production-Hub-BILD/collaborators/maps-technical \
  -f permission=pull
```

Eine eventuell erzeugte Einladung muss mit dem Servicekonto angenommen werden.
Die Pakete müssen die Repository-Berechtigungen erben oder dem Servicekonto explizit
Lesezugriff gewähren. Vor Aktivierung des Flux-Releases den Abruf von Image und Chart
mit dem vorhandenen PRD-Zugang prüfen. Ohne diese Freigabe bleibt der Release ein Entwurf.

## Releases

1. Änderungen im Original-Repository per Pull Request integrieren.
2. Für ein neues Release `package.json`, `package-lock.json`, `VERSION`, `helm/Chart.yaml`
   (`version`, `appVersion`) und `helm/values.yaml` (`tag`) gemeinsam anheben.
3. `Docker Build and Push` prüft Anwendung und Chart, baut ARM64 und testet den echten
   Container mit schreibgeschütztem Dateisystem. Danach werden das private Semver-Image
   und ein SHA-Tag veröffentlicht. `Build Helm charts` veröffentlicht anschließend
   das Chart vom exakt gleichen Commit.
4. Die Flux-Image-Automation folgt Patch-Releases ab `0.24.0` unterhalb `0.25.0`.
   Bei Chart-Änderungen zusätzlich `spec.chart.spec.version` im Flux-HelmRelease
   über einen Pull Request anheben.

Bereits veröffentlichte Semver-Tags dürfen nicht für geänderte Images wiederverwendet werden.
Für einen Rollback die Image-Automation vorübergehend suspendieren und den zuvor
geprüften Image- und Chart-Stand im Flux-Repository wieder eintragen.

## Prüfung

```bash
npm test
npm run build
helm lint helm
helm template production-hub helm --namespace bildnext
curl --fail https://production-hub.prd.bildnext.as-infra.de/healthz
```

Der Deployment-Container läuft als UID/GID 101, mit schreibgeschütztem Root-Dateisystem
und einem temporären `/tmp`. Zwei Replikas liefern die gleichen statischen Dateien aus.
Fehlende Assets liefern 404; HTML und Assets werden vor Wiederverwendung revalidiert.
