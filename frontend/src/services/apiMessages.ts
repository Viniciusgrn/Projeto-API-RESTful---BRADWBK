import api from './api'

export async function sendMessage(payload: { senderId: number; receiverId: number; content: string }) {
  const { data } = await api.post('/messages', payload)
  return data
}

export async function getConversation(a: number, b: number) {
  const { data } = await api.get(`/messages/conversation/${a}/${b}`)
  return data
}

export async function getMessagesForUser(userId: number) {
  const { data } = await api.get(`/messages/for/${userId}`)
  return data
}
