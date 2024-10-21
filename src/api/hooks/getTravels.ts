import { Updater, useQuery } from '@tanstack/react-query'
import { TravelResponse } from '../../types/Travel.ts'
import { getTravels } from '../api.ts'
import { useState } from 'react'

type SortingState = { id: string; desc: boolean }

const useGetTravels = (initialPageSize = 10) => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [sorting, setSorting] = useState<SortingState[]>([])

  const sortBy = sorting.length > 0 ? sorting[0].id : undefined
  const sortOrder =
    sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : undefined

  const { data, isLoading } = useQuery<TravelResponse, Error>({
    queryKey: ['viajes', page, pageSize, sorting],
    queryFn: () => getTravels(page, pageSize, { sortBy, sortOrder }),
    staleTime: 5 * 60 * 1000,
  })

  const setPageIndex = (newPage: number) => setPage(newPage - 1)
  const setPageSizeAndResetPage = (newPageSize: number) => {
    setPageSize(newPageSize)
    setPage(0)
  }
  const updateSorting = (
    updaterOrValue: Updater<SortingState[], SortingState[]>,
  ) => {
    setSorting(updaterOrValue)
  }
  return {
    data,
    isLoading,
    page,
    pageSize,
    sorting,
    setPageIndex,
    setPageSizeAndResetPage,
    updateSorting,
  }
}

export default useGetTravels

export const useGetAllTravels = () => {
  return useQuery<TravelResponse, Error>({
    queryKey: ['travels'],
    queryFn: () =>
      getTravels(0, 10, { sortBy: undefined, sortOrder: undefined }),
    staleTime: 5 * 60 * 1000,
  })
}
