// axiosInstance.js
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://reqres.in/api',
  timeout: 100,
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
