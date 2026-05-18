import { motion } from 'framer-motion'

const PODIUM = {
  1: {
    height: 'h-28 sm:h-32',
    bar: 'bg-gradient-to-t from-amber-500/70 to-yellow-300/40 border-yellow-400/30backdrop-blur-mdshadow-[0_0_25px_rgba(251,191,36,0.25)]',
    medal: '🥇',
    label: 'text-cinema-gold',
  },
  2: {
    height: 'h-20 sm:h-24',
    bar: 'bg-gradient-to-br from-gray-400/55  via-gray-300/30 to-white/10 border border-gray-200/20 backdrop-blur-lg  shadow-[0_8px_28px_rgba(255,255,255,0.08)]',
    medal: '🥈',
    label: 'text-gray-300',
  },
  3: {
    height: 'h-16 sm:h-20',
    bar: 'bg-gradient-to-br from-amber-800/65 via-amber-700/35  to-amber-400/10 border border-amber-500/20  backdrop-blur-lg  shadow-[0_8px_28px_rgba(217,119,6,0.18)]',
    medal: '🥉',
    label: 'text-amber-600',
  },
}

function PodiumSlot({ entry, rank }) {
  const style = PODIUM[rank]

  if (!entry) {
    return <div className="flex-1 max-w-[7.5rem] sm:max-w-[8.5rem]" aria-hidden />
  }

  return (
    <motion.div
      className="flex flex-1 max-w-[7.5rem] flex-col items-center sm:max-w-[8.5rem]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank === 1 ? 0.1 : rank === 2 ? 0 : 0.2 }}
    >
      <span className="mb-1 text-2xl" aria-hidden>
        {style.medal}
      </span>
      <p className="w-full truncate text-center text-sm font-semibold text-white">{entry.name}</p>
      <p className={`mb-2 text-lg font-bold ${style.label}`}>{entry.score}</p>
      <motion.div
        className={`flex w-full items-end justify-center rounded-t-lg border-2 pb-2 pt-3 shadow-lg ${style.height} ${style.bar}`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.15 + rank * 0.05, type: 'spring', stiffness: 200 }}
        style={{ transformOrigin: 'bottom' }}
      >
        <span className="font-display text-3xl text-black/70 sm:text-4xl">{rank}</span>
      </motion.div>
    </motion.div>
  )
}

function Podium({ entries }) {
  const [first, second, third] = entries

  return (
    <motion.div
      className="mb-6 flex items-end justify-center gap-2 px-2 sm:gap-4"
      aria-label="Top 3 players"
    >
      <PodiumSlot entry={second} rank={2} />
      <PodiumSlot entry={first} rank={1} />
      <PodiumSlot entry={third} rank={3} />
    </motion.div>
  )
}

export default function Leaderboard({ entries }) {
  const top3 = entries.slice(0, 3)
  const rest = entries.slice(3, 10)

  return (
    <section className="rounded-xl border border-cinema-border bg-cinema-panel p-4 sm:p-6">
      <h3 className="mb-4 text-center font-display text-2xl tracking-wide text-cinema-gold">
        Leaderboard
      </h3>

      {entries.length === 0 ? (
        <p className="text-center text-sm text-white/40">No scores yet. Win a round to rank!</p>
      ) : (
        <>
          {top3.length > 0 && <Podium entries={top3} />}

          {rest.length > 0 && (
            <ol className="space-y-2 border-t border-cinema-border pt-4">
              {rest.map((entry, i) => (
                <li
                  key={`${entry.name}-${entry.date}-${i + 3}`}
                  className="flex items-center justify-between rounded-lg bg-cinema-dark/80 px-3 py-2 text-sm"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="w-6 shrink-0 text-center font-bold text-white/50">
                      {i + 4}
                    </span>
                    <span className="truncate">{entry.name}</span>
                  </span>
                  <span className="shrink-0 font-semibold text-white">{entry.score}</span>
                </li>
              ))}
            </ol>
          )}
        </>
      )}
    </section>
  )
}
