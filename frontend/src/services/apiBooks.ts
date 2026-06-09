import api from './api'

export async function getBook() {
    const { data } = await api.get('/books')
    return data
}

export async function addBook(book: { title: string; author: string; description: string; coverImageUrl?: string; owner?: { id: number }; available?: boolean }) {
    const { data } = await api.post('/books', book)
    return data
}

export async function getMyBooks(userId: string | number) {
    const { data } = await api.get(`/books/users/${userId}/books`)
    return data
}
