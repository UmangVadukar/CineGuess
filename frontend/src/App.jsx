import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SceneImage from './components/SceneImage.jsx'
import AttemptsBar from './components/AttemptsBar.jsx'
import GuessForm from './components/GuessForm.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import { MAX_ATTEMPTS, MOVIES } from './data/movies.js'
import {
  allMoviesPlayed,
  isCorrectGuess,
  isGuessTooShort,
  pickUnplayedMovie,
  scoreForAttempt,
  todayKey,
} from './utils/game.js'
import { getPlayerName, setPlayerName, loadAuthUser } from './utils/storage.js'
import SignIn from './components/SignIn.jsx'
import { addLeaderboardEntry, loadLeaderboard } from './data/leaderboardApi.js'

export default function App() {
  const [authUser, setAuthUser] = useState(loadAuthUser)
  const [playerName, setPlayerNameState] = useState(getPlayerName)
  const dateKey = todayKey()
  const [playedIds, setPlayedIds] = useState([])
  const [movie, setMovie] = useState(() => pickUnplayedMovie([]))
  const [attempts, setAttempts] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)
  const [status, setStatus] = useState('playing') // playing | won | lost
  const [score, setScore] = useState(0)
  const [shake, setShake] = useState(false)
  const [message, setMessage] = useState('')
  
  const [leaderboard, setLeaderboard] = useState([])
  const movieSuggestions = Array.from(
    new Set(MOVIES.map((movie) => movie.title).filter(Boolean)),
  )

  useEffect(() => {
    let active = true

    loadLeaderboard()
      .then((entries) => {
        if (active) setLeaderboard(entries)
      })
      .catch(() => {
        if (active) setLeaderboard([])
      })

    return () => {
      active = false
    }
  }, [])

  if (!authUser) {
    return (
      <SignIn
        onSuccess={(user) => {
          setAuthUser(user)
          setPlayerNameState(user.name || 'Guest')
          setPlayerName(user.name || 'Guest')
        }}
      />
    )
  }

  const gameOver = status === 'won' || status === 'lost'

  const handleGuess = useCallback(
    async (raw) => {
      if (status !== 'playing') return

      if (isGuessTooShort(raw)) {
        setMessage('Type at least 3 characters.')
        return
      }

      const nextAttempt = attempts + 1

      if (isCorrectGuess(movie, raw)) {
        const pts = scoreForAttempt(nextAttempt)
        setAttempts(nextAttempt)
        setScore(pts)
        setStatus('won')
        setMessage(`You got it on attempt ${nextAttempt}!`)

        // record win: leaderboard updated below

        try {
          const board = await addLeaderboardEntry({
            name: playerName,
            score: pts,
            date: dateKey,
          })
          setLeaderboard(board)
        } catch {
          setLeaderboard((current) => current)
        }
        return
      }

      setShake(true)
      setTimeout(() => setShake(false), 450)

      setWrongCount((c) => c + 1)
      setAttempts(nextAttempt)

      if (nextAttempt >= MAX_ATTEMPTS) {
        setStatus('lost')
        // record loss: no streak tracking
        setMessage('Out of attempts!')
        return
      }

      setMessage(`Not quite — attempt ${nextAttempt} of ${MAX_ATTEMPTS}.`)
    },
    [status, attempts, movie, dateKey, playerName],
  )

  function playAgain() {
    const seen = [...new Set([...playedIds, movie.id])]
    const cycled = allMoviesPlayed(seen)

    setPlayedIds(cycled ? [] : seen)
    setMovie(pickUnplayedMovie(cycled ? [] : seen, movie.id))
    setAttempts(0)
    setWrongCount(0)
    setStatus('playing')
    setScore(0)
    setMessage(cycled ? 'New cycle — all movies refreshed!' : '')
  }

  return (
    <motion.div
      className="mx-auto min-h-screen max-w-3xl px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <motion.div>
          <h1 className="font-display text-5xl tracking-widest text-white sm:text-6xl">
            CINE<span className="text-cinema-red">GUESS</span>
          </h1>
          <p className="mt-1 text-white/50">
            Guess the movie from the scene
            {playedIds.length > 0 && (
              <span className="text-white/35"> · {playedIds.length} played</span>
            )}
          </p>
        </motion.div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          {/* streak removed */}
          <label className="w-full text-xs text-white/50 sm:w-48">
            Your name
            <input
              type="text"
              readOnly
              value={playerName}
              onChange={(e) => {
                setPlayerNameState(e.target.value)
                setPlayerName(e.target.value)
              }}
              className="mt-1 w-full rounded-lg border border-cinema-border bg-cinema-panel px-3 py-2 text-sm text-white outline-none focus:border-cinema-gold"
            />
          </label>
        </div>
      </header>

      <main className="space-y-6">
        <SceneImage
          movie={movie}
          wrongCount={wrongCount}
          status={status}
          score={score}
          attempt={attempts}
        />

        <AttemptsBar used={attempts} status={status} />

        {message && (
          <motion.p
            key={message}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center text-sm ${status === 'won' ? 'text-cinema-gold' : status === 'lost' ? 'text-cinema-red' : 'text-white/70'}`}
          >
            {message}
          </motion.p>
        )}

        {!gameOver && (
          <GuessForm
            onSubmit={handleGuess}
            disabled={status !== 'playing'}
            shake={shake}
            suggestions={movieSuggestions}
          />
        )}

        {gameOver && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-center">
              <button
                type="button"
                onClick={playAgain}
                className="rounded-xl bg-cinema-red px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-red-600"
              >
                Play again
              </button>
            </div>

            <Leaderboard entries={leaderboard} />
          </motion.div>
        )}
      </main>

      <footer className="mt-12 text-center text-xs text-white/30">
        5 attempts per round
        <br />
      </footer>
    </motion.div>
  )
}
