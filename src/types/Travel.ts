export interface Travel {
  CP: string
  RazonSocial: string
  Cliente: string
  Estado: string
  Documentacion: string
  Chofer: string
  Carga: string
  Fecha: string
  Patente: string
  Filial: string
  Destino: string
  Proveedor: string
}

export interface TravelResponse {
  data: Travel[]
  totalPages: number
}
