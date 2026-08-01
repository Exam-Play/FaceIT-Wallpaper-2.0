# Faceit Wallpaper Widget

A live [Wallpaper Engine](https://www.wallpaperengine.io/) widget that shows your **Faceit CS2** stats — current Elo, rank, recent matches, and a 30-match performance breakdown — directly on your desktop wallpaper.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Release](https://img.shields.io/github/v/release/Exam-Play/FaceIT-Wallpaper-2.0?include_prereleases)

> Replace `Exam-Play` above (and throughout this file) with your actual GitHub username/org once the repo is public.

---

## Features

- **Main Elo card** — current Elo, level, win rate, match count, country/region rank
- **Recent matches table** — last 5 matches with score, K/D/A, ADR, rating, map, Elo change
- **30-match performance panel** — Elo history chart, rating/consistency, win streak, average stats
- Fully **draggable, resizable, and scalable** widgets, positioned independently on screen
- **Lock mode** to freeze layout once you're happy with it, and a one-click **reset** to defaults
- Reads your Faceit nickname and background settings directly from Wallpaper Engine's built-in properties panel — no manual config file editing needed

## How it works

The project has two parts that run together:

| Component | What it does |
|---|---|
| **Widget** (`/src`, React + TypeScript) | Renders the UI inside the Wallpaper Engine CEF browser. Polls a local backend every 60 seconds for fresh stats. |
| **Local server** (`main.py` / packaged as `faceit-server.exe`) | A small FastAPI server running on `127.0.0.1:8000` that talks to Faceit's API and stats endpoints on the widget's behalf, and returns clean JSON. |

The widget never talks to Faceit directly — it always goes through the local server. This keeps your Faceit API key off the frontend entirely.

```
Wallpaper Engine (CEF)
    └── Widget (React)  ──HTTP──►  Local server (127.0.0.1:8000)  ──HTTPS──►  Faceit API / faceit.com
```

## Quick start (just want the widget running)

1. **Download the latest server release**
   Go to [Releases](https://github.com/Exam-Play/FaceIT-Wallpaper-2.0/releases) and download `faceit-server.exe` from the latest version. Pre-release builds are marked accordingly — pick a stable (non pre-release) tag unless you want to test something new.

2. **Run the server**
   Double-click `faceit-server.exe` (or run it from a terminal to see the logs). No setup or API key needed — it's ready to use out of the box. Keep it running in the background while your wallpaper is active.

3. **Add the widget in Wallpaper Engine**
   Import/subscribe to the widget project, then open its Properties panel and set your Faceit **nickname**. Stats should appear within a 10 seconds.

4. **Arrange it**
   Click the unlock icon (top right) to drag, resize, and scale each panel. Click lock again once you're happy — this also saves the layout locally.

## Running from source

### Backend (server)

> The prebuilt `.exe` from Releases ships ready to use — this section is only needed if you want to run/modify the server from source.

```bash
git clone https://github.com/Exam-Play/FaceIT-Wallpaper-2.0.git
cd FaceIT-Wallpaper-2.0/backend

python -m venv .venv
.venv\Scripts\activate              # Windows
# source .venv/bin/activate         # macOS/Linux

pip install -r requirements.txt
```

For local development, create a `.env` file in the same folder with your own Faceit API key (get one from the [Faceit Developer Portal](https://developers.faceit.com/)):
```
FACEIT_API_KEY=your_key_here
```

Run it:
```bash
python run.py
```
The server starts on `http://127.0.0.1:8000`.

### Frontend (widget)

```bash
cd frontend/faceit-wallpaper-2.0

npm install
npm run dev      # local dev server with hot reload
npm run build    # production build, output ready to package as a WE wallpaper
```

> Adjust the commands above to match your actual `package.json` scripts if they differ.

## Building the server executable

The server is packaged into a single `.exe` with [PyInstaller](https://pyinstaller.org/) so end users don't need Python installed:

```bash
pyinstaller run.py --name faceit-server --onefile --console ^
--hidden-import=uvicorn.logging --hidden-import=uvicorn.loops --hidden-import=uvicorn.loops.auto ^
--hidden-import=uvicorn.protocols --hidden-import=uvicorn.protocols.http --hidden-import=uvicorn.protocols.http.auto ^
--hidden-import=uvicorn.protocols.websockets --hidden-import=uvicorn.protocols.websockets.auto ^
--hidden-import=uvicorn.lifespan --hidden-import=uvicorn.lifespan.on ^
--hidden-import=cloudscraper --hidden-import=js2py --hidden-import=js2py.pyjs --hidden-import=js2py.pyjs.builtins ^
--hidden-import=pyjsparser --hidden-import=pyjsparser.parser --hidden-import=pyjsparser.pyjsparser ^
--hidden-import=requests.cookies --hidden-import=chardet --hidden-import=charset_normalizer ^
--hidden-import=colorama ^
--collect-all uvicorn --collect-all cloudscraper --collect-all js2py --collect-all fastapi ^
--collect-all requests --collect-all chardet --collect-all charset_normalizer --collect-all httpx ^
--collect-all rich
```

The built binary lands in `dist/faceit-server.exe`. See [Releases](#quick-start-just-want-the-widget-running) for how it's published — new versions are attached to a Git tag (e.g. `v1.0.0`, or `v0.1.0-beta.1` for pre-releases).

> **Note on the API key:** release builds have the maintainer's own Faceit API key embedded directly in the source before compiling (not via `.env`), so end users don't need to configure anything. Keep in mind a key embedded in a compiled binary can still be extracted (e.g. via `strings`) by anyone determined enough — it's not a secure secret, just convenient distribution. Don't commit the key-bearing source file to the public repo; keep it local/private and only publish the compiled `.exe`.

## Configuration

The widget reads the following from Wallpaper Engine's Properties panel (`applyUserProperties`):

| Property | Type | Description |
|---|---|---|
| `nickname` | text | Your Faceit nickname. Debounced by ~1s while typing before it's applied. |
| `background_color` | color | Solid background color (used if no image/video is set). |
| `background_image` | file | Background image path. |
| `background_video` | file | Background video path (takes priority over image). |

Everything else (widget positions, sizes, scale, lock state) is managed by the widget itself and persisted locally — it's not exposed as a Wallpaper Engine property.

## Disclaimer

This project uses both the official [Faceit Data API](https://developers.faceit.com/) (with your own API key) and some additional statistics endpoints from faceit.com that aren't part of the public API, accessed via `cloudscraper`. Use of the latter isn't officially supported by Faceit and could break at any time if they change their site, and may or may not be consistent with their Terms of Service depending on how you use it — use at your own discretion.

This project is not affiliated with, endorsed by, or connected to Faceit or Wallpaper Engine in any way.

## Contributing

Issues and pull requests are welcome. If you're adding a new stats panel or endpoint, please keep the frontend/backend contract in mind — the widget only ever talks to the local server, never to Faceit directly.

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for details.

© 2026 <Andrew / Exam-Play>
