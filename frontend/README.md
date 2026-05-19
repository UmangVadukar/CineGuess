# CineGuess

## Run locally

Install dependencies:

```bash
npm install
```

Start the backend API server:

```bash
npm run server
```

Start the Vite client in a second terminal:

```bash
npm run dev
```

## Local hosting

Build the app and serve the production bundle through Express:

```bash
npm run build
npm run start
```

The backend lives in `backend/` and stores the leaderboard in `backend/leaderboard.json`.
For production deploys, point `LEADERBOARD_FILE` at persistent storage so leaderboard entries survive restarts. For example on Render, mount a persistent disk and set `LEADERBOARD_FILE=/var/data/leaderboard.json`.

### Render deploy

Create a new Render Web Service from the repository root with these settings:

- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Environment: Node.js
- Add `LEADERBOARD_FILE` if your service uses a mounted disk for persistence.

If you deploy only the backend folder as a separate Render service, use `backend/` as the root directory and run `npm install && npm start` there.