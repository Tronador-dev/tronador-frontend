import { columns } from './columns.ts'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Table as MTable, ScrollArea, Pagination, Group } from '@mantine/core'
import useGetTravels from '../../api/hooks/getTravels.ts'
import { TableSkeleton } from '../TableSkeleton.tsx'

export const Table = () => {
  const { data, isLoading } = useGetTravels(1, 10)

  const table = useReactTable({
    columns,
    data: data?.data || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: data?.totalPages || 1,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: data?.currentPage || 0,
        pageSize: data?.pageSize || 5,
      },
    },
  })

  if (isLoading) {
    return <TableSkeleton rows={10} />
  }

  return (
    <>
      <ScrollArea>
        <MTable striped highlightOnHover>
          <MTable.Thead bg="cyan">
            {table.getHeaderGroups().map((headerGroup) => (
              <MTable.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <MTable.Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </MTable.Th>
                ))}
              </MTable.Tr>
            ))}
          </MTable.Thead>
          <MTable.Tbody>
            {table.getRowModel().rows.map((row) => (
              <MTable.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <MTable.Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </MTable.Td>
                ))}
              </MTable.Tr>
            ))}
          </MTable.Tbody>
        </MTable>
      </ScrollArea>
      <Group mt="sm" mb="sm" justify="flex-end">
        <Pagination
          color="cyan"
          value={data?.currentPage || 1}
          onChange={() => {}}
          total={data?.totalPages || 1}
          withEdges
        />
      </Group>
    </>
  )
}
