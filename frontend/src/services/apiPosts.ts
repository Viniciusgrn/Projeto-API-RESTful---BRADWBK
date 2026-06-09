import api from './api'

export interface PostDTO {
  id: number
  userId: number
  username: string
  userAvatarUrl?: string
  bookTitle: string
  bookAuthor?: string
  coverImageUrl?: string
  content: string
  createdAt: string
  likesCount: number
  likedByCurrentUser: boolean
  comments: PostCommentDTO[]
}

export interface PostCommentDTO {
  id: number
  userId: number
  username: string
  userAvatarUrl?: string
  content: string
  createdAt: string
}

export async function getFeed(userId?: number | null): Promise<PostDTO[]> {
  const params = userId ? { userId } : {}
  const res = await api.get('/posts/feed', { params })
  return res.data
}

export async function getUserPosts(userId: number, currentUserId?: number | null): Promise<PostDTO[]> {
  const params = currentUserId ? { currentUserId } : {}
  const res = await api.get(`/posts/user/${userId}`, { params })
  return res.data
}

export async function createPost(data: {
  userId: number
  bookTitle: string
  bookAuthor?: string
  coverImageUrl?: string
  content: string
}): Promise<PostDTO> {
  const res = await api.post('/posts', data)
  return res.data
}

export async function toggleLike(postId: number, userId: number): Promise<PostDTO> {
  const res = await api.post(`/posts/${postId}/like`, null, { params: { userId } })
  return res.data
}

export async function addComment(postId: number, userId: number, content: string): Promise<PostDTO> {
  const res = await api.post(`/posts/${postId}/comments`, { userId, content })
  return res.data
}

export async function deletePost(postId: number, userId: number): Promise<void> {
  await api.delete(`/posts/${postId}`, { params: { userId } })
}
