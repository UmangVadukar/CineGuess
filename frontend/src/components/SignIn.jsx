import { useEffect, useState } from 'react'
import { saveAuthUser } from '../utils/storage.js'

export default function SignIn({ onSuccess }) {
  const [name, setName] = useState('')
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

  useEffect(() => {
    if (!clientId) return

    const existing = document.getElementById('google-identity')
    if (existing) return

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.id = 'google-identity'
    script.onload = () => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        })
        window.google.accounts.id.renderButton(
          document.getElementById('gsi-button'),
          { theme: 'filled_black', size: 'large', width: '280' },
        )
      }
    }
    document.head.appendChild(script)

    return () => {
      // no cleanup needed for gsi script
    }
  }, [clientId])

  function parseJwt(token) {
    try {
      const payload = token.split('.')[1]
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
      return JSON.parse(decodeURIComponent(escape(decoded)))
    } catch {
      return null
    }
  }

  function handleCredentialResponse(response) {
    const data = parseJwt(response.credential)
    if (!data) return
    const user = {
      name: data.name || data.email || 'User',
      email: data.email,
      picture: data.picture,
    }
    saveAuthUser(user)
    if (onSuccess) onSuccess(user)
  }

  function handleContinueAs() {
    const user = { name: name.trim() || 'Guest' }
    saveAuthUser(user)
    if (onSuccess) onSuccess(user)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cinema-bg p-4">
      <div className="w-full max-w-md rounded-xl bg-cinema-panel p-6 text-center">
        <h2 className="mb-4 text-2xl font-semibold text-white">Sign in to play</h2>
        {clientId ? (
          <div className="flex flex-col items-center gap-4">
            <div id="gsi-button"></div>
          </div>
        ) : (
          <>
            <p className="text-sm text-white/60 mb-4">Google sign-in not configured. Please Wait</p>

        
          </>
        )}
      </div>
    </div>
  )
}
