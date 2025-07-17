import axios from 'axios'
import { Component, Frame, Standard, CompatibilityResult } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Components API
export const componentsApi = {
  getAll: (params?: Record<string, any>) => 
    api.get<{ results: Component[] }>('/components/', { params }),
  
  getById: (id: number) => 
    api.get<Component>(`/components/${id}/`),
  
  search: (params: Record<string, any>) => 
    api.get<Component[]>('/components/search/', { params }),
  
  getCategories: () => 
    api.get<Array<{ value: string; label: string }>>('/components/categories/'),
}

// Frames API
export const framesApi = {
  getAll: (params?: Record<string, any>) => 
    api.get<{ results: Frame[] }>('/frames/', { params }),
  
  getById: (id: number) => 
    api.get<Frame>(`/frames/${id}/`),
  
  search: (params: Record<string, any>) => 
    api.get<Frame[]>('/frames/search/', { params }),
  
  getTypes: () => 
    api.get<Array<{ value: string; label: string }>>('/frames/types/'),
}

// Standards API
export const standardsApi = {
  getAll: (params?: Record<string, any>) => 
    api.get<{ results: Standard[] }>('/standards/', { params }),
  
  getById: (id: number) => 
    api.get<Standard>(`/standards/${id}/`),
  
  getCategories: () => 
    api.get<Array<{ value: string; label: string }>>('/standards/categories/'),
}

// Compatibility API
export const compatibilityApi = {
  checkCompatibility: (componentAId: number, componentBId: number) =>
    api.post<CompatibilityResult>('/compatibility/check/', {
      component_a_id: componentAId,
      component_b_id: componentBId,
    }),
}

export default api