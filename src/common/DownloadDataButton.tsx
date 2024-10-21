import { useGetAllTravels } from '../api/hooks/getTravels.ts'
import { Button, Loader } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'

export const DataDownloadButton = () => {
  const { isLoading, isError } = useGetAllTravels()

  // Function to trigger download
  const handleDownload = () => {
    /*if (!data) return // Prevent download if no data
    downloadExcel(data.data) // Pass the data array to Excel download
  }*/

    if (isError) {
      // TODO: Avisale que algo fallo y que no puede descargar
      console.log('Error downloading data')
    }
  }

  return (
    <>
      <Button
        onClick={isError ? handleDownload : handleDownload} // TODO: cambiar si falla a un retry
        disabled={isLoading} // Disable button while loading
        rightSection={
          isLoading ? <Loader size={18} /> : <IconDownload size={18} />
        }
      >
        {isLoading ? 'Cargando...' : isError ? 'Reintentar' : `Descargar Excel`}
      </Button>
    </>
  )
}
