import api from './api'

export async function getCommunities() {
    const { data } = await api.get('/communities')
    return data
}

export async function createCommunity(community: { name: string; description?: string }) {
    const { data } = await api.post('/communities', community)
    return data
}

export async function getDonations() {
    const { data } = await api.get('/donations')
    return data
}

export async function createDonation(donation: { bookId: number; donorId: number; receiverId?: number }) {
    const { data } = await api.post('/donations', donation)
    return data
}
