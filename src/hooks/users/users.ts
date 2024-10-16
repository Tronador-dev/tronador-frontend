import { useQuery, UseQueryResult } from '@tanstack/react-query'
import axiosInstance from '../../api/axiosInstance'
import { UserApiResponse } from '../../types/User'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const fetchUsers = async (): Promise<UserApiResponse> => {
  await delay(100)
  const response = await axiosInstance.get('/users')
  return response.data
}

const useUsers = (): UseQueryResult<UserApiResponse, Error> => {
  return useQuery<UserApiResponse, Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: Infinity,
    cacheTime: Infinity,
  }) as UseQueryResult<UserApiResponse, Error>
}

export default useUsers
