import { defineStore } from "pinia"
import axios from "@/plugins/axios"
import type { Category, APIResponse, Categories } from "@/types"

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    categoriesData: {} as Categories
  }),

  actions: {
    async createCategory(form: Record<string, string>) {
      return new Promise<Category>(async (resolve, reject) => {
        try {
          const { data } = await axios.post<APIResponse<Category>>('/ecommerce/categories', {
            ...form
          })

          console.log('Category ', data.data)
          resolve(data.data)
        } catch (error) {
          reject(error)
        }
      })
    },
    async getCategories(page: number, limit: number) {
      return new Promise<Categories>(async (resolve, reject) => {
        try {
          const { data } = await axios.get<APIResponse<Categories>>(`/ecommerce/categories?page=${page}&limit=${limit}`)

          this.categoriesData = data.data
          console.log('Categories ', data.data)
          resolve(data.data)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
})
