import { getToken } from './auth'

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = getToken()

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    }

    const response = await fetch(url, { ...options, headers })

    if (response.status === 401) {
        // Token is invalid or expired
        window.location.href = '/auth'
    }

    return response
}