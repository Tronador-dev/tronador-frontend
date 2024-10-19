import { Group, TableTh } from '@mantine/core'
import { flexRender, Header } from '@tanstack/react-table'
import { Travel } from '../../types/Travel.ts'
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from '@tabler/icons-react'

interface SorteableHeaderProps {
  header: Header<Travel, unknown>
}

export const SortableHeader = ({ header }: SorteableHeaderProps) => {
  return (
    <TableTh
      key={header.id}
      style={{
        color: 'white',
        position: 'sticky',
        height: '45px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
      onClick={header.column.getToggleSortingHandler()}
    >
      <Group wrap={'nowrap'} justify="space-between" align="center">
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
        {header.column.getIsSorted() ? (
          header.column.getIsSorted() === 'asc' ? (
            <IconChevronUp size={16} />
          ) : (
            <IconChevronDown size={16} />
          )
        ) : (
          <IconSelector size={16} />
        )}
      </Group>
    </TableTh>
  )
}
