import express from 'express'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from 'cors';
import mongoose from 'mongoose'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const app = express()
const port = process.env.PORT || 3001
const mongoUri = process.env.MONGODB_URI
const mongoDbName = process.env.MONGODB_DB

const leaderboardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    normalizedName: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model('LeaderboardEntry', leaderboardSchema)

let connectPromise

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not set')
  }

  if (!connectPromise) {
    connectPromise = mongoose.connect(mongoUri, mongoDbName ? { dbName: mongoDbName } : undefined)
  }

  await connectPromise
  return mongoose.connection
}

// Allow configuring CORS origin via environment for local development
const allowedOrigin = process.env.CORS_ORIGIN || 'https://cineguessweb.onrender.com'
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}))

// Parse JSON request bodies
app.use(express.json())

async function readLeaderboard() {
  await connectToDatabase()
  return LeaderboardEntry.find()
    .sort({ score: -1, updatedAt: -1, name: 1 })
    .limit(20)
    .select('name score date updatedAt')
    .lean()
}

async function saveLeaderboardEntry(entry) {
  await connectToDatabase()

  const trimmedName = entry.name.trim() || 'Guest'
  const normalizedName = trimmedName.toLowerCase()

  await LeaderboardEntry.findOneAndUpdate(
    { normalizedName },
    {
      $set: {
        name: trimmedName,
        normalizedName,
        date: entry.date,
      },
      $inc: {
        score: entry.score,
      },
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    },
  )

  return readLeaderboard()
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/leaderboard', async (_req, res) => {
  try {
    const entries = await readLeaderboard()
    res.json(entries)
  } catch (error) {
    res.status(500).json({ error: 'Failed to read leaderboard' })
  }
})

app.post('/api/leaderboard', async (req, res) => {
  try {
    const { name, score, date } = req.body || {}

    if (typeof name !== 'string' || typeof score !== 'number' || typeof date !== 'string') {
      return res.status(400).json({ error: 'Invalid leaderboard entry' })
    }

    const next = await saveLeaderboardEntry({ name, score, date })
    res.json(next)
  } catch (error) {
    res.status(500).json({ error: 'Failed to save leaderboard entry' })
  }
})

if (existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'))
  })
}

async function startServer() {
  try {
    await connectToDatabase()
    app.listen(port, () => {
      console.log(`Leaderboard API listening on http://localhost:${port}`)
    })
  } catch (error) {
    console.error('Failed to connect to MongoDB')
    console.error(error)
    process.exit(1)
  }
}

startServer()