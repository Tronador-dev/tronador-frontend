import { useQuery, UseQueryResult } from '@tanstack/react-query'
import axiosInstance from '../../api/axiosInstance'
import { UserApiResponse } from '../../types/User'

const fetchUsers = async (): Promise<UserApiResponse> => {
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
