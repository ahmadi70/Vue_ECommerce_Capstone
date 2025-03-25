export interface APIResponse<T>{
  message: string,
  statusCode: number,
  success: boolean,
  data: T
}

export type Image = {
  _id: string,
  url: string,
  localPath: string
}

export type User = {
  __v: number,
  _id: string,
  avatar: Image,
  username: string,
  email: string,
  role: 'ADMIN' | 'USER',
  // loginType: EMAIL_PASSWORD,
  isEmailVerified: boolean,
  createdAt: string,
  updatedAt: string
}

export type Category = {
  __v: number,
  _id: string,
  createdAt: string,
  name: string,
  owner: string,
  updatedAt: string
}

type PaginationContent = {
  hasNextPage: boolean,
  hasPrevPage: boolean,
  limit: number,
  nextPage: number,
  page: number,
  prevPage: number,
  serialNumberStartFrom: number,
  totalPages: number,
}

export type Categories = PaginationContent & {
  totalCategories: number,
  categories: Category[] 
}