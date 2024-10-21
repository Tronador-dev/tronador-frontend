import axiosInstance from './axiosInstance.ts'
import { TravelResponse } from '../types/Travel.ts'
import { SortingState } from '../types/Travel.ts'

export const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return await axiosInstance.post('/upload', file)
}

export const getTravels = async (
  page: number,
  pageSize: number,
  sort: SortingState,
): Promise<TravelResponse> => {
  const params: {
    page: number
    pageSize: number
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
  } = {
    page,
    pageSize,
  }
  if (sort.sortBy && sort.sortOrder) {
    params.sortBy = sort.sortBy
    params.sortOrder = sort.sortOrder
  }
  const response = await axiosInstance.get<TravelResponse>('/viajes', {
    params,
  })
  return response.data
}

export const getAllTravels = async (): Promise<TravelResponse> => {
  const response = await axiosInstance.get<TravelResponse>('/viajes')
  return response.data
}
