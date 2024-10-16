export type User = {
  name: string
  phone: string
  email: string
  address: string
  list: number
  country: string
  region: string
  postalZip: string
  text: string
  numberrange: number
  currency: string
  alphanumeric: string
}

export type UserApiResponse = {
  data: User[]
  page: number
  per_page: number
  total: number
  total_pages: number
}
