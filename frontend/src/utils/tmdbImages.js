// Helpers to build TMDB image URLs and resolve scene images

/**
 * Return a full TMDB image URL for a given poster/backdrop path.
 * If `path` is already a full URL it is returned unchanged.
 * @param {string} path - TMDB path like `/abc.jpg` or a full URL
 * @param {string} [size='w500'] - TMDB size (e.g. `w300`, `w500`, `w1280`)
 */
export function tmdbImage(path, size = 'w500') {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `https://image.tmdb.org/t/p/${size}${path}`
}

/**
 * Resolve a scene image which may be either a full URL, or a TMDB backdrop path.
 * If `source` is a full URL it is returned unchanged, otherwise it's treated
 * as a TMDB path and `tmdbImage()` is used to build a URL.
 * @param {string} source - full URL or TMDB path
 * @param {string} [size='w1280']
 */
export function resolveSceneImage(source, size = 'w1280') {
  if (!source) return ''
  if (source.startsWith('http://') || source.startsWith('https://')) return source
  return tmdbImage(source, size)
}
