import express from 'express'
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const dataDir = __dirname
const leaderboardFile = path.join(dataDir, 'leaderboard.json')
const distDir = path.join(rootDir, 'dist')
const app = express()
const port = process.env.PORT || 3001

// Allow configuring CORS origin via environment for local development
const allowedOrigin = process.env.CORS_ORIGIN || 'https://cineguessweb.onrender.com'
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}))

// Parse JSON request bodies
app.use(express.json())

async function ensureStore() {
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true })
  }

  if (!existsSync(leaderboardFile)) {
    await writeFile(leaderboardFile, '[]\n', 'utf8')
  }
}

async function readLeaderboard() {
  await ensureStore()
  const raw = await readFile(leaderboardFile, 'utf8')
  return JSON.parse(raw || '[]')
}

async function writeLeaderboard(entries) {
  await ensureStore()
  await writeFile(leaderboardFile, `${JSON.stringify(entries, null, 2)}\n`, 'utf8')
}

function mergeEntry(list, entry) {
  const normalizedName = entry.name.trim().toLowerCase()
  const existingIndex = list.findIndex(
    (item) => item.name.trim().toLowerCase() === normalizedName,
  )

  if (existingIndex >= 0) {
    const existing = list[existingIndex]
    list[existingIndex] = {
      ...existing,
      name: entry.name.trim() || existing.name,
      score: existing.score + entry.score,
      date: entry.date,
    }
  } else {
    list.push({
      ...entry,
      name: entry.name.trim() || 'Guest',
    })
  }

  list.sort((a, b) => b.score - a.score)
  return list.slice(0, 20)
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

    const current = await readLeaderboard()
    const next = mergeEntry(current, { name, score, date })
    await writeLeaderboard(next)
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

app.listen(port, () => {
  console.log(`Leaderboard API listening on http://localhost:${port}`)
})