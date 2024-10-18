import { columns } from './columns.ts'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Table as MTable, ScrollArea } from '@mantine/core'

const data = [
  {
    CP: 'CP001',
    RazónSocial: 'Empresa 1',
    Cliente: 'Cliente A',
    Estado: 'En Proceso',
    Documentación: 'Completa',
    Chofer: 'Juan Pérez',
    Carga: 'Carga general',
    Fecha: '2024-10-18',
    Patente: 'ABC123',
    Filial: 'Filial 1',
    Destino: 'Ciudad A',
    Proveedor: 'Proveedor 1',
  },
  {
    CP: 'CP002',
    RazónSocial: 'Empresa 2',
    Cliente: 'Cliente B',
    Estado: 'Completado',
    Documentación: 'Pendiente',
    Chofer: 'Carlos López',
    Carga: 'Carga refrigerada',
    Fecha: '2024-10-17',
    Patente: 'XYZ789',
    Filial: 'Filial 2',
    Destino: 'Ciudad B',
    Proveedor: 'Proveedor 2',
  },
  {
    CP: 'CP001',
    RazónSocial: 'Empresa 1',
    Cliente: 'Cliente A',
    Estado: 'En Proceso',
    Documentación: 'Completa',
    Chofer: 'Juan Pérez',
    Carga: 'Carga general',
    Fecha: '2024-10-18',
    Patente: 'ABC123',
    Filial: 'Filial 1',
    Destino: 'Ciudad A',
    Proveedor: 'Proveedor 1',
  },
  {
    CP: 'CP001',
    RazónSocial: 'Empresa 1',
    Cliente: 'Cliente A',
    Estado: 'En Proceso',
    Documentación: 'Completa',
    Chofer: 'Juan Pérez',
    Carga: 'Carga general',
    Fecha: '2024-10-18',
    Patente: 'ABC123',
    Filial: 'Filial 1',
    Destino: 'Ciudad A',
    Proveedor: 'Proveedor 1',
  },
  {
    CP: 'CP001',
    RazónSocial: 'Empresa 1',
    Cliente: 'Cliente A',
    Estado: 'En Proceso',
    Documentación: 'Completa',
    Chofer: 'Juan Pérez',
    Carga: 'Carga general',
    Fecha: '2024-10-18',
    Patente: 'ABC123',
    Filial: 'Filial 1',
    Destino: 'Ciudad A',
    Proveedor: 'Proveedor 1',
  },
]

export const Table = () => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <ScrollArea>
      <MTable striped highlightOnHover>
        <MTable.Thead>
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
  )
}
