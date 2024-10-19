import { columns } from './columns.ts'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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
import { useMemo, useState } from 'react'

export const Table = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
  })
  const { data, isLoading } = useGetTravels(
    pagination.pageIndex,
    pagination.pageSize,
  )

  const table = useReactTable({
    columns,
    data: data?.data || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: data?.totalPages || 1,
    manualPagination: true,
    state: {
      pagination,
    },
  })

  const buildSelectOptions = useMemo(() => {
    const totalRecords = pagination.pageSize * (data?.totalPages || 1)
    const options = [5, 10, 20, 50, 100]
    return options
      .filter((option) => option <= totalRecords || totalRecords === 0)
      .map((option) => ({
        value: option.toString(),
        label: option.toString(),
      }))
  }, [data?.totalPages, pagination.pageSize])

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, pageIndex: page }))
  }

  const handlePageSizeChange = (value: string | null) => {
    if (value) {
      const size = Number(value)
      setPagination((prev) => ({
        ...prev,
        pageSize: size,
        pageIndex: 1,
      }))
    }
  }

  if (isLoading) {
    return <TableSkeleton rows={10} />
  }

  return (
    <>
      <ScrollArea
        style={{ borderRadius: '8px', height: '80vh', overflowY: 'scroll' }}
      >
        <MTable stickyHeader={true} striped highlightOnHover>
          <MTable.Thead bg="blue">
            {table.getHeaderGroups().map((headerGroup) => (
              <MTable.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <MTable.Th
                    style={{
                      color: 'white',
                      position: 'sticky',
                      height: '45px',
                    }}
                    key={header.id}
                  >
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
      <Group gap="md" mt="sm" mb="sm" justify="flex-end">
        <Pagination
          value={pagination.pageIndex}
          onChange={handlePageChange}
          total={data?.totalPages || 1}
          withEdges
        />
        <Select
          withCheckIcon={false}
          inputSize="50px"
          value={pagination.pageSize.toString() || '10'}
          onChange={handlePageSizeChange}
          data={buildSelectOptions}
          style={{ width: '80px' }}
        />
      </Group>
    </>
  )
}
