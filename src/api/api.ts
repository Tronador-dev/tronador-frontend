import axiosInstance from './axiosInstance.ts'

export const postFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return await axiosInstance.post('/upload', file)
}
