import { useState } from 'react'
import { Button, Modal, Group, Text, rem, Pill } from '@mantine/core'
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import '@mantine/dropzone/styles.css'

export const FileUploadModal = ({ opened, onClose, onConfirm }) => {
  const [file, setFile] = useState<FileWithPath | null>(null)

  const handleFileUpload = (files: FileWithPath[]) => {
    setFile(files[0])
  }

  const handleConfirm = () => {
    if (file) {
      onConfirm(file)
    }
    setFile(null)
    onClose()
  }

  const handleCancel = () => {
    setFile(null)
    onClose()
  }

  const handleRemove = () => {
    setFile(null)
  }

  return (
    <Modal size={'lg'} opened={opened} onClose={onClose} title="Subir archivo">
      <Dropzone
        onDrop={handleFileUpload}
        onReject={(files) => console.log('Archivos rechazados', files)}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-blue-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-red-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-dimmed)',
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>
          <Group justify="center">
            <Text c="dimmed">
              Arrastra imágenes aquí o haz clic para seleccionar.
            </Text>
            <Text size="sm" c="dimmed">
              Solamente se aceptan formatos CSV y XLSX.
            </Text>
          </Group>
        </Group>
      </Dropzone>
      {file && (
        <Pill onRemove={handleRemove} mt="md" withRemoveButton size={'lg'}>
          Archivo seleccionado: <b>{file.name}</b>
        </Pill>
      )}
      <Group mt={'md'} justify="flex-end">
        <Button variant="default" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button onClick={handleConfirm} disabled={!file}>
          Confirmar
        </Button>
      </Group>
    </Modal>
  )
}

export default FileUploadModal
