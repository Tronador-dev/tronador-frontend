import { Drawer, Select, Stack } from '@mantine/core'
import { columns } from './table/columns.ts'
import { useState } from 'react'

interface FilterDrawerProps {
  opened: boolean
  onClose: () => void
}

export const FilterDrawer = ({ opened, onClose }: FilterDrawerProps) => {
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null)
  console.log(selectedColumn)
  return (
    <Drawer size={'sm'} opened={opened} onClose={onClose} position={'right'}>
      <Stack>
        <Select
          label="Seleccionar columna"
          data={columns.map((column) => ({
            value: column.accessorKey,
            label: column.header,
          }))}
          onChange={(value) => setSelectedColumn(value)}
        />
      </Stack>
    </Drawer>
  )
}
