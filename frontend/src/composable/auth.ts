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
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
