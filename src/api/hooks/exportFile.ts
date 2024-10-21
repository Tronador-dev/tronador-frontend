import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllTravels } from '../api'
import { exportFile } from '../../utils/exportExcel.ts'

export const useExportFile = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { refetch } = useQuery({
    queryKey: ['viajes'],
    queryFn: getAllTravels,
    enabled: false,
  })

  const handleExport = async () => {
    setIsLoading(true)

    const { data: travels } = await refetch()

    if (travels) exportFile(travels.content)

    setIsLoading(false)
  }

  return {
    handleExport,
    isLoading,
  }
}
