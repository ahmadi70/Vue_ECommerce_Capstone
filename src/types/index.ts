export interface APIResponse<T>{
  message: string
  statusCode: number
  success: boolean
  data: T
}

export type Image = {
  _id: string
  url: string
  localPath: string
}

export type User = {
  __v: number
  _id: string
  avatar: Image
  username: string
  email: string
  role: 'ADMIN' | 'USER'
  isEmailVerified: boolean
  createdAt: string
  updatedAt: string
}

export type Category = {
  __v: number
  _id: string
  createdAt: string
  name: string
  owner: string
  updatedAt: string
}

type PaginationContent = {
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  nextPage: number
  page: number
  prevPage: number
  serialNumberStartFrom: number
  totalPages: number
}

export type Categories = PaginationContent & {
  totalCategories: number
  categories: Category[] 
}

export type Product = {
  __v: number
  _id: string
  category: string
  createdAt: string
  description: string
  mainImage: Image
  name: string
  owner: string
  price: number
  stock: number
  subImages: Image[]
  updatedAt: string
}

export type Products = PaginationContent & {
  totalProducts: number
  products: Product[]
}

export type Error = {
  error?: Record<string, string[]>
  statusCode: number
  message: string
  success: boolean
}