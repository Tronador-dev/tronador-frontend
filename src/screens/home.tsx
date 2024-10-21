import { Box, Button, Group, Loader } from '@mantine/core'
import { Table } from '../common/table/Table.tsx'
import { useState } from 'react'
import FileUploadModal from '../common/FileUploadModal.tsx'
import { IconUpload, IconFilter, IconDownload } from '@tabler/icons-react'
import { FilterDrawer } from '../common/FilterDrawer.tsx'
import useUploadFile from '../api/hooks/uploadFile.ts'
import { useExportFile } from '../api/hooks/exportFile.ts'

export const Home = () => {
  const [openedModal, setOpenedModal] = useState(false)
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false)

  const { upload, isUploading } = useUploadFile({
    onSuccess: () => setOpenedModal(false),
    onError: () => {},
  })

  const { handleExport, isLoading } = useExportFile()

  return (
    <Box py="lg" px="xl" style={{ height: '100vh' }}>
      <Group justify="flex-end">
        <Group gap={'md'}>
          <Button
            onClick={() => setOpenedModal(true)}
            variant="outline"
            mt="md"
            mb="lg"
            rightSection={<IconUpload size={18} />}
          >
            Cargar archivo
          </Button>
          <Button
            onClick={handleExport}
            variant="outline"
            mt="md"
            mb="lg"
            rightSection={<IconDownload size={18} />}
          >
            {isLoading ? <Loader size={18} /> : 'Exportar archivo'}
          </Button>
          <Button
            onClick={() => setOpenFilterDrawer(true)}
            mt="md"
            mb="lg"
            rightSection={<IconFilter size={18} />}
          >
            Abrir filtros
          </Button>
        </Group>
      </Group>
      <Table />
      {openedModal && (
        <FileUploadModal
          isLoading={isUploading}
          opened={openedModal}
          onClose={() => setOpenedModal(false)}
          onConfirm={upload}
        />
      )}
      {openFilterDrawer && (
        <FilterDrawer
          opened={openFilterDrawer}
          onClose={() => setOpenFilterDrawer(false)}
        />
      )}
    </Box>
  )
}
