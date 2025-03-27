import { defineStore } from "pinia"
import axios from "@/plugins/axios"
import type { APIResponse, Product, Products } from "@/types"
import { handleSuccess, handleError } from "@/lib/utils"

export const useProductStore = defineStore('productStore', {
  state: () => ({
    productsData: {} as Products
  }),

  actions: {
    async createProduct(form: Record<string, any>) {
      return new Promise<Product>(async (resolve, reject) => {
        try {
          const formData = new FormData()
          formData.append('name', form.name)
          formData.append('price', form.price)
          formData.append('stock', form.stock)
          formData.append('mainImage', form.mainImage)
          formData.append('description', form.description)
          formData.append('category', form.category)

          for (const image of form.subImages) {
            formData.append('subImages', image)
          }

          const { data } = await axios.post<APIResponse<Product>>('/ecommerce/products', formData)

          console.log('Products ', data.data)
          resolve(data.data)
        } catch (error) {
          reject(error)
        }
      })
    },
    async getProducts(page: number, limit: number) {
      return new Promise<Products>(async (resolve, reject) => {
        try {
          const { data } = await axios.get<APIResponse<Products>>(`/ecommerce/products?page=${page}&limit=${limit}`)

          this.productsData = data.data
          console.log('Products', data.data)
          resolve(data.data)
        } catch (error) {
          handleError(error)
          reject(error)
        }
      })
    },
    async getProduct(productId: string) {
      return new Promise<Product>(async (resolve, reject) => {
        try {
          const { data } = await axios.get<APIResponse<Product>>(`/ecommerce/products/${productId}`)

          console.log('Product', data.data)
          resolve(data.data)
        } catch (error) {
          handleError(error)
          reject(error)
        }
      })
    },
    async editProduct(productId: string, form: Record<string, any>) {
      return new Promise<Product>(async (resolve, reject) => {
        try {
          const formData = new FormData()
          formData.append('name', form.name)
          formData.append('price', form.price)
          formData.append('stock', form.stock)
          formData.append('description', form.description)
          formData.append('category', form.category)
          if(form.mainImage) {
            formData.append('mainImage', form.mainImage)
          }
          if(form.subImages) {
            for (const image of form.subImages) {
              formData.append('subImages', image)
            }
          }

          const { data } = await axios.patch<APIResponse<Product>>(`/ecommerce/products/${productId}`, formData)

          await this.getProducts(1, 2)
          handleSuccess(data.statusCode.toString(), data.message)
          console.log('Product', data.data)
          resolve(data.data)
        } catch (error) {
          handleError(error)
          reject(error)
        }
      })
    },
    async deleteProduct(productId: string) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await axios.delete(`/ecommerce/products/${productId}`)

          await this.getProducts(1, 2) //Improve - need to change for production
          console.log('Products', data.data)
          resolve(data.data)
        } catch (error) {
          handleError(error)
          reject(error)
        }
      })
    }
  }
})
