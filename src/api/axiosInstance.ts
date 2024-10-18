// axiosInstance.js
import axios from 'axios'
import { handleAxiosError } from './errorHandler.ts'

const axiosInstance = axios.create({
  baseURL: 'https://reqres.in/api',
  timeout: 5000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return handleAxiosError(error)
  },
)

export default axiosInstance
