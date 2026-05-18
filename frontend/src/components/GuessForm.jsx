import { useState } from 'react'
import { motion } from 'framer-motion'

export default function GuessForm({ onSubmit, disabled, shake, suggestions = [] }) {
  const [value, setValue] = useState('')
  const query = value.trim().toLowerCase()
  const filteredSuggestions = query
    ? suggestions.filter((suggestion) => suggestion.toLowerCase().includes(query))
    : suggestions

  function handlePickSuggestion(suggestion) {
    setValue(suggestion)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!value.trim() || disabled) return
    onSubmit(value)
    setValue('')
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 sm:flex-row"
      animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          placeholder="Type the movie name…"
          className="w-full rounded-xl border border-cinema-border bg-cinema-panel px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-cinema-gold focus:ring-1 focus:ring-cinema-gold disabled:opacity-50"
          autoComplete="off"
          spellCheck={false}
        />
        {value.trim() && filteredSuggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-64 overflow-auto rounded-xl border border-cinema-border bg-cinema-dark shadow-2xl">
            {filteredSuggestions.slice(0, 8).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handlePickSuggestion(suggestion)}
                className="flex w-full items-center px-4 py-3 text-left text-sm text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
      <motion.button
        type="submit"
        disabled={disabled || value.trim().length < 1}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className="rounded-xl bg-cinema-red px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Guess
      </motion.button>
    </motion.form>
  )
}
