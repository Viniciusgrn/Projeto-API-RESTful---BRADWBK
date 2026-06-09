import api from './api'

export interface Activity {
  id: number
  title: string
  description?: string
  type: 'CHALLENGE' | 'TASK' | 'EVENT'
  xpReward: number
  badgeName?: string
  bookTitle?: string
  deadline?: string
  createdAt: string
}

export interface UserActivityDTO {
  id: number
  activityId: number
  title: string
  description?: string
  type: string
  xpReward: number
  badgeName?: string
  bookTitle?: string
  deadline?: string
  status: 'PENDING' | 'COMPLETED'
  assignedAt: string
  completedAt?: string
  userId: number
  username: string
}

export interface UserSummary {
  id: number
  username: string
  email: string
  role?: string
}

// ── Admin ─────────────────────────────────────────────────────────────────

export async function adminCreateActivity(requesterId: number, data: {
  title: string
  description?: string
  type: string
  xpReward: number
  badgeName?: string
  bookTitle?: string
  deadline?: string
}): Promise<Activity> {
  const res = await api.post('/activities/admin/create', data, { params: { requesterId } })
  return res.data
}

export async function adminAssignActivity(requesterId: number, activityId: number, userIds: number[]): Promise<void> {
  await api.post(`/activities/admin/${activityId}/assign`, userIds, { params: { requesterId } })
}

export async function adminListActivities(requesterId: number): Promise<Activity[]> {
  const res = await api.get('/activities/admin/all', { params: { requesterId } })
  return res.data
}

export async function adminGetProgress(requesterId: number, activityId: number): Promise<UserActivityDTO[]> {
  const res = await api.get(`/activities/admin/${activityId}/progress`, { params: { requesterId } })
  return res.data
}

export async function adminDeleteActivity(requesterId: number, activityId: number): Promise<void> {
  await api.delete(`/activities/admin/${activityId}`, { params: { requesterId } })
}

export async function adminListUsers(requesterId: number): Promise<UserSummary[]> {
  const res = await api.get('/activities/admin/users', { params: { requesterId } })
  return res.data
}

// ── User ──────────────────────────────────────────────────────────────────

export async function getMyActivities(userId: number): Promise<UserActivityDTO[]> {
  const res = await api.get(`/activities/user/${userId}`)
  return res.data
}

export async function completeActivity(userActivityId: number, userId: number): Promise<UserActivityDTO> {
  const res = await api.post(`/activities/user/${userActivityId}/complete`, null, { params: { userId } })
  return res.data
}
