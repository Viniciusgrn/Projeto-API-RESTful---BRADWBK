import api from './api'

export async function getRegisterBook() {
    const { data } = await api.get('/register-books')
    return data
}

export async function searchRegisterBook(title: string) {
    const { data } = await api.get('/register-books/search', { params: { title } })
    return data
}

export async function addRegisterBook(book: { title: string; author: string; isbn?: string; description?: string }) {
    const { data } = await api.post('/register-books', book)
    return data
}

export async function deleteBook(bookId: string | number) {
    await api.delete(`/register-books/${bookId}`)
}

export async function updateBook(bookId: string | number, updatedBook: { title?: string; author?: string; isbn?: string; description?: string }) {
    const { data } = await api.put(`/register-books/${bookId}`, updatedBook)
    return data
}
