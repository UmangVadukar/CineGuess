const TMDB_BASE = 'https://image.tmdb.org/t/p'

/**
 * @param {string} filePath - e.g. "/abc123.jpg"
 * @param {'w300' | 'w500' | 'w780' | 'w1280' | 'original'} [size]
 */
export function tmdbImage(filePath, size = 'w780') {
  if (!filePath) return ''
  return `${TMDB_BASE}/${size}${filePath}`
}

/**
 * @param {string[]} paths
 * @param {'w300' | 'w500' | 'w780' | 'w1280' | 'original'} [size]
 */
export function tmdbImages(paths, size = 'w780') {
  return paths.map((p) => tmdbImage(p, size))
}

/**
 * Scene still — full URL (Guardian, etc.) or TMDB file path.
 * @param {string} pathOrUrl
 * @param {'w300' | 'w500' | 'w780' | 'w1280' | 'original'} [size]
 */
export function resolveSceneImage(pathOrUrl, size = 'w1280') {
  if (!pathOrUrl) return ''
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }
  return tmdbImage(pathOrUrl, size)
}
