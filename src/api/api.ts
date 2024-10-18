import axiosInstance from './axiosInstance.ts'
import { TravelResponse } from '../types/Travel.ts'

export const postFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return await axiosInstance.post('/upload', file)
}

export const getTravels = async (
  page: number,
  pageSize: number,
): Promise<TravelResponse> => {
  const response = await axiosInstance.get<TravelResponse>('/travels', {
    params: { page, pageSize },
  })
  return response.data
}
