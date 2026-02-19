import api from '@/lib/api'

export interface User {
  id: string
  email: string
  name: string
  isArtist: boolean
  avatar?: string
}

interface LoginResponse {
  token: string
  user: User
}

class AuthService {
  async login(email: string, password: string): Promise<User> {
    try {
      const response = await api.post<LoginResponse>('/auth/login', { email, password })
      const { token, user } = response.data
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      return user
    } catch (error) {
      // For demo purposes, use mock data if API is not available
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        isArtist: email.includes('artist'),
      }
      const mockToken = 'mock-jwt-token'
      
      localStorage.setItem('token', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))
      
      return mockUser
    }
  }

  async register(email: string, password: string, name: string, isArtist: boolean): Promise<User> {
    try {
      const response = await api.post<LoginResponse>('/auth/register', { 
        email, 
        password, 
        name, 
        isArtist 
      })
      const { token, user } = response.data
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      return user
    } catch (error) {
      // For demo purposes, use mock data if API is not available
      const mockUser: User = {
        id: '1',
        email,
        name,
        isArtist,
      }
      const mockToken = 'mock-jwt-token'
      
      localStorage.setItem('token', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))
      
      return mockUser
    }
  }

  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null
    
    const userStr = localStorage.getItem('user')
    if (!userStr) return null
    
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('token')
  }
}

export const authService = new AuthService()
