# SCTogether Desktop Builder

Damit bekommst du automatisch eine installierbare Windows-EXE und eine portable EXE.

## So bekommst du die fertige EXE

1. Neues GitHub Repository erstellen.
2. Den Inhalt dieses ZIPs in das Repository hochladen.
3. In GitHub auf **Actions** gehen.
4. Workflow **Build Windows EXE** starten.
5. Nach dem Build bei **Artifacts** herunterladen:
   - Installer EXE
   - Portable EXE

## Lokal testen

```bash
npm install
npm start
```

## Lokal EXE bauen

```bash
npm install
npm run dist
```

Die EXEs liegen danach im `dist` Ordner.

## Was die App macht

Die App öffnet https://sctogether.fyi in einem Electron-Fenster und setzt:
- Background-Throttling aus
- Autoplay möglichst frei
- Power-Save-Blocker aktiv
- normales Fenster für Gaming/Background-Nutzung

Das ist deutlich stabiler als ein normaler Browser-Tab.
