export function isLoggedIn() {
  return !!localStorage.getItem('token')
}

export function getLoggedUser() {
  try {
    const user = localStorage.getItem('user')
    if (!user) return null

    const parsed = JSON.parse(user)

    if (!parsed.id || !parsed.username) return null

    return parsed
  } catch {
    return null
  }
}

export function logout() {
  // invalida o token no servidor (best-effort) antes de limpar a sessão local
  try {
    const token = localStorage.getItem('token')
    if (token && token !== 'undefined' && token !== 'null') {
      const base = import.meta.env.VITE_API_URL || '/api'
      // fire-and-forget; não bloqueia o logout local
      fetch(`${base}/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        keepalive: true,
      }).catch(() => {})
    }
  } catch {}
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
