import { ActionIcon, Box, Button, Drawer, Group } from '@mantine/core'
import { Table } from '../common/table/Table.tsx'
import { useState } from 'react'
import FileUploadModal from '../common/FileUploadModal.tsx'
import { IconMenu2, IconUpload } from '@tabler/icons-react'

export const Home = () => {
  const [openedModal, setOpenedModal] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <Box py="lg" px="xl" style={{ height: '100vh' }}>
      <Group justify="space-between">
        <ActionIcon color="blue" variant={'white'}>
          <IconMenu2 onClick={() => setOpenDrawer(true)}>Open drawer</IconMenu2>
        </ActionIcon>
        <Button
          onClick={() => setOpenedModal(true)}
          variant="outline"
          mt="md"
          mb="lg"
          rightSection={<IconUpload size={18} />}
        >
          Cargar archivo
        </Button>
      </Group>
      <Table />
      <Drawer
        style={{ backgroundColor: 'orange' }}
        opened={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box p="xl">Drawer content</Box>
      </Drawer>
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
