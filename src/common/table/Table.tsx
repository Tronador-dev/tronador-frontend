import { columns } from './columns.ts'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table as MTable,
  ScrollArea,
  Pagination,
  Group,
  Select,
} from '@mantine/core'
import useGetTravels from '../../api/hooks/getTravels.ts'
import { TableSkeleton } from '../TableSkeleton.tsx'
import { useMemo } from 'react'
import { SortableHeader } from './SortableHeader.tsx'

export const Table = () => {
  const {
    data,
    isLoading,
    page,
    pageSize,
    sorting,
    setPageIndex,
    setPageSizeAndResetPage,
    updateSorting,
  } = useGetTravels()

  const table = useReactTable({
    columns,
    data: data?.content || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount: data?.totalPages || 1,
    manualPagination: true,
    manualSorting: true,
    onSortingChange: updateSorting,
    state: {
      pagination: {
        pageIndex: page,
        pageSize,
      },
      sorting,
    },
  })

  const buildSelectOptions = useMemo(() => {
    const totalRecords = pageSize * (data?.totalPages || 1)
    const options = [5, 10, 20, 50, 100]
    return options
      .filter((option) => option <= totalRecords || totalRecords === 0)
      .map((option) => ({
        value: option.toString(),
        label: option.toString(),
      }))
  }, [data, pageSize])

  if (isLoading) {
    return <TableSkeleton rows={10} />
  }

  return (
    <>
      <ScrollArea
        style={{ borderRadius: '4px', height: '80vh', overflowY: 'scroll' }}
      >
        <MTable stickyHeader={true} striped highlightOnHover>
          <MTable.Thead bg="blue">
            {table.getHeaderGroups().map((headerGroup) => (
              <MTable.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <SortableHeader header={header} />
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
      <Group gap="md" mt="sm" mb="sm" justify="flex-end">
        <Pagination
          value={page + 1}
          onChange={setPageIndex}
          total={data?.totalPages || 1}
          withEdges
        />
        <Select
          withCheckIcon={false}
          inputSize="50px"
          value={pageSize.toString()}
          onChange={(value) => setPageSizeAndResetPage(Number(value))}
          data={buildSelectOptions}
          style={{ width: '80px' }}
        />
      </Group>
    </>
  )
}
