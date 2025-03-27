import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { push } from 'notivue'
import type { Error } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleSuccess = (title: string, message: string) => {
  push.success({
    title,
    message
  })
}

export const handleError = (err: any) => {

  const error = err.response.data as Error
  push.error({
    title: error.statusCode.toString(),
    message: error.message
  })
}