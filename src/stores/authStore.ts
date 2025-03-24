import { defineStore } from "pinia"
import axios from "@/plugins/axios"

export const useAuthStore = defineStore('AuthStore', {
  state: () => ({}),

  actions: {
    async registerUser(form: Record<string, string>) {
      return new Promise<string>(async (resolve, reject) => {
        try {
          const { data } = await axios.post('/users/register', {
            ...form
          })
          console.log('Register ', data)

          resolve('')
        } catch (error) {
          reject()
        }
      })
    }
  }
})
