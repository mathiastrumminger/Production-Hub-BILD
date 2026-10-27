# Bildnext PRD

Production Hub bleibt eine statische Anwendung mit Daten im jeweiligen Browser.
Das Hosting schafft keine zentrale Benutzerverwaltung, Synchronisation oder Datensicherung.
Bestehende lokale Daten werden nicht automatisch auf die neue HTTPS-Origin übertragen;
dafür den vorhandenen JSON-Export und -Import verwenden.

## Komponenten

- Quellrepository: `mathiastrumminger/Production-Hub-BILD`
- Privater Deployment-Spiegel: `spring-media/next-production-hub`
- ARM64-Image: `ghcr.io/spring-media/next-production-hub:<VERSION>`
- OCI-Chart: `oci://ghcr.io/spring-media/next-production-hub-chart`
- Flux: `spring-media/bildnext-flux-cd`, Verzeichnis `prd/production-hub`
- Ziel: `https://production-hub.prd.bildnext.as-infra.de`
- Zugriff: Firmennetz/VPN, Skipper-Prädikat `SourceFromLast("145.243.0.0/16")`

Der private Spiegel nutzt den vorhandenen Registry-Zugang des Bildnext-Clusters.
Es werden keine persönlichen GitHub-Tokens in Workflows oder Kubernetes-Secrets kopiert.
Die Workflows veröffentlichen ihre Pakete mit dem eigenen `GITHUB_TOKEN` im jeweiligen Repository-Owner.
Nur Pakete aus dem Spring-Media-Spiegel werden nach PRD ausgerollt.

## Releases

1. Änderungen im Quellrepository per Pull Request integrieren.
2. Für ein neues Release `package.json`, `package-lock.json`, `VERSION`, `helm/Chart.yaml`
   (`version`, `appVersion`) und `helm/values.yaml` (`tag`) gemeinsam anheben.
3. Den geprüften `main`-Stand ohne Force-Push in den privaten Deployment-Spiegel übernehmen:

   ```bash
   git remote add bildnext https://github.com/spring-media/next-production-hub.git
   git switch main
   git pull --ff-only origin main
   git push bildnext main
   ```

4. `Docker Build and Push` prüft Anwendung und Chart, baut ARM64 und testet den echten
   Container mit schreibgeschütztem Dateisystem. Danach werden das private Semver-Image
   und ein SHA-Tag veröffentlicht. `Build Helm charts` veröffentlicht anschließend
   das Chart vom exakt gleichen Commit.
5. Die Flux-Image-Automation folgt Patch-Releases ab `0.24.0` unterhalb `0.25.0`.
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
