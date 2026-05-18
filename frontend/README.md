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

### Render deploy

Create a new Render Web Service from the repository root with these settings:

- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Environment: Node.js

If you deploy only the backend folder as a separate Render service, use `backend/` as the root directory and run `npm install && npm start` there.