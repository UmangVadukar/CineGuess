const API_BASE = '/api/leaderboard'

export async function loadLeaderboard() {
  const response = await fetch(API_BASE)
  if (!response.ok) {
    throw new Error('Failed to load leaderboard')
  }
  return response.json()
}

export async function addLeaderboardEntry(entry) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  })

  if (!response.ok) {
    throw new Error('Failed to save leaderboard entry')
  }

  return response.json()
}