export interface Travel {
  cp: string
  estado: string
  urlDocumentacion: string
  chofer: string
  descripcion: string
  fechaInicio: string
  patente: string
  razonSocial: string
  destino: string
  proveedor: string
}

export interface TravelResponse {
  content: Travel[]
  size: number
  number: number
  totalPages: number
}

export type SortingState = {
  sortBy: string | undefined
  sortOrder: 'asc' | 'desc' | undefined
}
