import { Box, Button } from '@mantine/core'
import { Table } from '../common/table/Table.tsx'
import { useState } from 'react'
import FileUploadModal from '../common/FileUploadModal.tsx'

export const Home = () => {
  const [openedModal, setOpenedModal] = useState(false)

  return (
    <Box p="xl" style={{ height: 'calc(100vh - 60px)' }}>
      <Button
        onClick={() => setOpenedModal(true)}
        variant="filled"
        color="cyan"
        mt="md"
        mb="lg"
      >
        Cargar archivo
      </Button>
      <Table />
      {openedModal && (
        <FileUploadModal
          opened={openedModal}
          onClose={() => setOpenedModal(false)}
          onConfirm={() => setOpenedModal(false)}
        />
      )}
    </Box>
  )
}
