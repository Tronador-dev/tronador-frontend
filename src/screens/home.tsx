import { Button } from '@mantine/core'
import { Table } from '../common/table/table.tsx'
import { useState } from 'react'
import FileUploadModal from '../common/FileUploadModal.tsx'

export const Home = () => {
  const [openedModal, setOpenedModal] = useState(false)

  return (
    <>
      <Button
        onClick={() => setOpenedModal(true)}
        variant="filled"
        color="cyan"
        mt="md"
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
    </>
  )
}
