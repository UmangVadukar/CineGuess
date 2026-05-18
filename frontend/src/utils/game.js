import { MOVIES } from '../data/movies.js'

const MIN_GUESS_LENGTH = 1

/** @param {string} value */
export function normalizeGuess(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/^the\s+/i, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
}

/** @param {string} guess */
export function isGuessTooShort(guess) {
  return normalizeGuess(guess).length < MIN_GUESS_LENGTH
}

/**
 * @param {import('../data/movies.js').Movie} movie
 * @param {string} guess
 */
export function isCorrectGuess(movie, guess) {
  const normalized = normalizeGuess(guess)
  if (normalized.length < MIN_GUESS_LENGTH) return false

  const answers = [movie.title, ...movie.aliases].map(normalizeGuess)
  return answers.some((a) => a === normalized)
}

/** @param {number} attemptNumber 1–5 */
export function scoreForAttempt(attemptNumber) {
  const table = { 1: 100, 2: 80, 3: 60, 4: 40, 5: 20 }
  return table[attemptNumber] ?? 0
}

export function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

/**
 * Pick a movie not in playedIds (won or lost this session).
 * When every movie has been played, starts a new cycle (skips last movie only).
 * @param {string[]} playedIds
 * @param {string} [avoidId] - don't pick this one when starting a new cycle
 */
export function pickUnplayedMovie(playedIds = [], avoidId) {
  const played = new Set(playedIds)
  let pool = MOVIES.filter((m) => !played.has(m.id))

  if (pool.length === 0) {
    pool = avoidId ? MOVIES.filter((m) => m.id !== avoidId) : [...MOVIES]
    if (pool.length === 0) pool = [...MOVIES]
  }

  return pool[Math.floor(Math.random() * pool.length)]
}

export function allMoviesPlayed(playedIds) {
  return playedIds.length >= MOVIES.length
}

/** CSS blur px per wrong attempt (0 = clearest) */
export const BLUR_LEVELS = [20, 15, 10, 5, 0]
