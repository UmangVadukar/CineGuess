// Lightweight deterrents against casual inspection/dragging/saving.
// Note: it's impossible to fully prevent inspection; this only blocks
// common shortcuts, right-click, dragging, and shows an overlay when
// devtools-like dimensions are detected.

function createOverlay() {
  if (document.getElementById('anti-inspect-overlay')) return
  const o = document.createElement('div')
  o.id = 'anti-inspect-overlay'
  Object.assign(o.style, {
    position: 'fixed',
    inset: '0',
    background: 'rgba(0,0,0,0.95)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999999,
    fontSize: '20px',
    padding: '20px',
    textAlign: 'center',
  })
  o.textContent = 'This site disables inspection and saving of assets.'
  document.documentElement.appendChild(o)
}

function removeOverlay() {
  const o = document.getElementById('anti-inspect-overlay')
  if (o) o.remove()
}

function blockShortcuts(e) {
  // F12
  if (e.key === 'F12') {
    e.preventDefault(); e.stopPropagation(); return false
  }

  // Ctrl+Shift+I / J / C  (Chrome)  Ctrl+Shift+K (Firefox)
  if (e.ctrlKey && e.shiftKey) {
    const k = e.key.toLowerCase()
    if (k === 'i' || k === 'j' || k === 'c' || k === 'k') {
      e.preventDefault(); e.stopPropagation(); return false
    }
  }

  // Ctrl+U (view source) and Ctrl+S (save)
  if (e.ctrlKey && (e.key.toLowerCase() === 'u' || e.key.toLowerCase() === 's')) {
    e.preventDefault(); e.stopPropagation(); return false
  }
}

function blockContextMenu(e) {
  e.preventDefault(); e.stopPropagation(); return false
}

function blockDrag(e) {
  e.preventDefault(); e.stopPropagation(); return false
}

let devtoolsOpen = false
const CHECK_INTERVAL = 800
const THRESHOLD = 160

function checkDevTools() {
  try {
    const widthDiff = Math.abs(window.outerWidth - window.innerWidth)
    const heightDiff = Math.abs(window.outerHeight - window.innerHeight)
    const open = widthDiff > THRESHOLD || heightDiff > THRESHOLD
    if (open && !devtoolsOpen) {
      devtoolsOpen = true
      createOverlay()
    } else if (!open && devtoolsOpen) {
      devtoolsOpen = false
      removeOverlay()
    }
  } catch (err) {
    // ignore
  }
}

export default function initAntiInspect() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  window.addEventListener('keydown', blockShortcuts, { capture: true })
  window.addEventListener('contextmenu', blockContextMenu, { capture: true })
  window.addEventListener('dragstart', blockDrag, { capture: true })
  window.addEventListener('mousedown', (e) => {
    // block middle/right clicks
    if (e.button === 1 || e.button === 2) {
      e.preventDefault(); e.stopPropagation(); return false
    }
  }, { capture: true })

  // Prevent programmatic copying via select/drag on most elements
  document.addEventListener('copy', (e) => { e.preventDefault(); e.stopPropagation(); }, { capture: true })

  // Periodically check for devtools-like viewport changes
  setInterval(checkDevTools, CHECK_INTERVAL)
}
