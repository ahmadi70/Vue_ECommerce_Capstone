import { defineStore } from "pinia"
import axios from "@/plugins/axios"
import type { Category, APIResponse } from "@/types"

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({}),

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
    }
  }
})
