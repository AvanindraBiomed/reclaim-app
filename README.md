# RECLAIM — Recovery Demo

Live demo: https://reclaim7.netlify.app/

This is a front-end prototype with sample data only. It is not connected to patient records, clinicians, or messaging services.

## Run locally on Windows

1. Extract this ZIP.
2. Open PowerShell in the extracted `RECLAIM_MVP_peer_share` folder.
3. Run:

```powershell
npm.cmd ci
npm.cmd run dev
```

4. Open the local URL Vite prints, usually `http://localhost:5173/`.

The `dist` folder contains the prebuilt static site for hosting. `node_modules` is not included; `npm.cmd ci` installs the locked dependencies.
