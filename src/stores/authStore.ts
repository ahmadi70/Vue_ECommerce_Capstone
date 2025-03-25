import { defineStore } from "pinia"
import axios from "@/plugins/axios"
import type { User, APIResponse } from "@/types"

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: {} as User
  }),

  actions: {
    async registerUser(form: Record<string, string>) {
      return new Promise<User>(async (resolve, reject) => {
        try {
          const { data } = await axios.post<APIResponse<{ user: User }>>('/users/register', {
            ...form
          })
          
          console.log('Register ', data.data)
          resolve(data.data.user)
        } catch (error) {
          reject(error)
        }
      })
    },
    async loginUser(form: Record<string, string>) {
      return new Promise<User>(async (resolve, reject) => {
        try {
          const { data } = await axios.post<APIResponse<{ user: User, accessToken:string, refreshToken:string }>>('/users/login', {
            ...form
          })
          this.user = data.data.user
          console.log('Login ', data.data)
          localStorage.setItem('currentUserContent', JSON.stringify(data.data.user))
          localStorage.setItem('currentAuthTokens', JSON.stringify({
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken
          }))

          resolve(data.data.user)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
})
