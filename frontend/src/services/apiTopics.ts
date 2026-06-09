import api from './api'

export async function getTopicsByBookId(bookId: number) {
  const { data } = await api.get(`/topics/book/${bookId}`)
  return data
}
