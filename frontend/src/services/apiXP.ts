import api from './api'

export interface UserXPDTO {
  userId: number
  username: string
  userAvatarUrl?: string
  xp: number
  level: number
  xpForNextLevel: number
  streak: number
  totalBooksRead: number
  totalPosts: number
}

export async function getXP(userId: number): Promise<UserXPDTO> {
  const res = await api.get(`/xp/${userId}`)
  return res.data
}

export async function markBookRead(userId: number): Promise<UserXPDTO> {
  const res = await api.post(`/xp/${userId}/book-read`)
  return res.data
}

export async function getLeaderboard(): Promise<UserXPDTO[]> {
  const res = await api.get('/xp/leaderboard')
  return res.data
}
