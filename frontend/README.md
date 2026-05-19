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

The backend now stores leaderboard data in MongoDB through Mongoose.
Set `MONGODB_URI` before starting the backend. You can also set `MONGODB_DB` if you want to target a specific database name.

### Render deploy

Create a new Render Web Service from the repository root with these settings:

- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Environment: Node.js
- Add `MONGODB_URI` for your MongoDB Atlas or hosted MongoDB connection string.
- Optionally add `MONGODB_DB` if you want to override the database name.

If you deploy only the backend folder as a separate Render service, use `backend/` as the root directory and run `npm install && npm start` there.