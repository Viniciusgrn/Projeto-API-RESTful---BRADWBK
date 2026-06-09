import api from './api'

export function getNotificationsForUser(userId: number) {
  return api.get(`/notifications/for/${userId}`).then(r => r.data)
}

export function markNotificationRead(id: number) {
  return api.patch(`/notifications/${id}/read`).then(r => r.data)
}
