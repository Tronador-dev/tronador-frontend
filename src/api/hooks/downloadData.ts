import * as XLSX from 'xlsx'
import { Travel } from '../../types/Travel.ts'

export const downloadExcel = (data: Travel[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Travels')

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'viajes-tronador.xlsx') // Nombre del archivo Excel
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
