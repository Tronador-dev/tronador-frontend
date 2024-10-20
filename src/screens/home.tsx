import { Box, Button, Group } from '@mantine/core'
import { Table } from '../common/table/Table.tsx'
import { useState } from 'react'
import FileUploadModal from '../common/FileUploadModal.tsx'
import { IconUpload, IconFilter } from '@tabler/icons-react'
import { FilterDrawer } from '../common/FilterDrawer.tsx'
import { DataDownloadButton } from '../common/DownloadDataButton.tsx'

export const Home = () => {
  const [openedModal, setOpenedModal] = useState(false)
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false)

  return (
    <Box py="lg" px="xl" style={{ height: '100vh' }}>
      <Group justify="flex-end">
        <Group gap={'md'}>
          <DataDownloadButton type={'excel'} />
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
          opened={openedModal}
          onClose={() => setOpenedModal(false)}
          onConfirm={() => setOpenedModal(false)}
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
