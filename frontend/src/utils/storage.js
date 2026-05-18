const PLAYER_KEY = 'cineguess-player'
const AUTH_KEY = 'cineguess-auth'

export function getPlayerName() {
  return localStorage.getItem(PLAYER_KEY) || 'Guest'
}

export function setPlayerName(name) {
  localStorage.setItem(PLAYER_KEY, name.trim() || 'Guest')
}

export function saveAuthUser(user) {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))
    // also keep player name in sync
    localStorage.setItem(PLAYER_KEY, user.name || 'Guest')
  } catch {}
}

export function loadAuthUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clearAuthUser() {
  try {
    localStorage.removeItem(AUTH_KEY)
  } catch {}
}

export function isAuthenticated() {
  return Boolean(loadAuthUser())
}
