import { motion } from 'framer-motion'
import { MAX_ATTEMPTS } from '../data/tmdbMovies.js'

export default function AttemptsBar({ used, status }) {
  return (
    <motion.div className="flex items-center justify-center gap-2" layout>
      {Array.from({ length: MAX_ATTEMPTS }, (_, i) => {
        const n = i + 1
        const spent = n <= used
        const active = status === 'playing' && n === used + 1

        return (
          <motion.div
            key={n}
            layout
            className={`h-2.5 w-10 rounded-full transition-colors ${
              spent
                ? status === 'won' && n === used
                  ? 'bg-cinema-gold'
                  : 'bg-cinema-red/80'
                : active
                  ? 'bg-cinema-gold/50 ring-2 ring-cinema-gold'
                  : 'bg-cinema-border'
            }`}
            title={`Attempt ${n}`}
          />
        )
      })}
      <span className="ml-2 text-sm text-white/60">
        {used}/{MAX_ATTEMPTS} attempts
      </span>
    </motion.div>
  )
}
