import { motion, AnimatePresence } from 'framer-motion'
import { BLUR_LEVELS } from '../utils/game.js'

function MovieReveal({ movie, status, score, attempt }) {
  const won = status === 'won'

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 px-4 text-center backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {won && (
        <>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            className="mb-2 text-5xl"
          >
            🎬
          </motion.span>
          <p className="font-display text-3xl tracking-wide text-cinema-gold">Correct!</p>
          <p className="mb-4 text-sm text-white/80">
            +{score} pts · attempt {attempt}
          </p>
        </>
      )}
      {!won && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cinema-red">
          Out of attempts
        </p>
      )}

      <motion.img
        src={movie.poster}
        alt={movie.title}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
        style={{ userSelect: 'none', WebkitUserDrag: 'none' }}
        className="h-44 w-auto max-w-[45%] rounded-lg object-cover shadow-glow sm:h-52 select-none cursor-default"
      />
      <motion.h2
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 font-display text-3xl text-white sm:text-4xl"
      >
        {movie.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-2 text-sm text-white/70"
      >
        {movie.year} · {movie.genre} · ⭐ {movie.rating}
      </motion.p>
    </motion.div>
  )
}

export default function SceneImage({ movie, wrongCount, status, score, attempt }) {
  const reveal = status === 'won' || status === 'lost'
  const blurPx = reveal
    ? 0
    : BLUR_LEVELS[Math.min(wrongCount, BLUR_LEVELS.length - 1)]

  return (
    <motion.div
      layout
      className="relative aspect-video w-full overflow-hidden rounded-xl border border-cinema-border bg-black shadow-2xl"
    >
      <motion.img
        src={movie.scene}
        alt="Movie scene"
        className="h-full w-full object-cover select-none cursor-default"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
        style={{ userSelect: 'none', WebkitUserDrag: 'none' }}
        animate={{ filter: `blur(${blurPx}px)` }}
        transition={{ duration: 0.5 }}
      />
      <div className="film-grain pointer-events-none absolute inset-0" />

      {status === 'playing' && wrongCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-cinema-gold backdrop-blur"
        >
          Image unblurred slightly
        </motion.div>
      )}

      <AnimatePresence>
        {reveal && (
          <MovieReveal
            key="reveal"
            movie={movie}
            status={status}
            score={score}
            attempt={attempt}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
