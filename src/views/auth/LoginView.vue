<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/authStore'

type PAYLOAD = {
  password: string,
  username: string
}

const form = ref<PAYLOAD>({
  password: 'password',
  username: 'nahid'
})

const router = useRouter()
const authStore = useAuthStore()

const onSubmit = async () => {
  try {
    await authStore.loginUser(form.value)
    router.push('/')
  } catch (error) {
    console.log(error)
  } finally {

  }
}

</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="mx-auto w-full max-w-md">
      <form @submit.prevent="onSubmit">
        <Card class="overflow-y-auto">
          <CardHeader class="space-y-1">
            <CardTitle class="text-2xl">Login</CardTitle>
            <CardDescription>Enter your details below to login</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4">
            <div class="grid gap-2">
              <Label for="username">username</Label>
              <Input 
                id="username"
                type="text"
                placeholder="Username"
                v-model="form.username"
              />
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input 
                id="password"
                type="password"
                v-model="form.password"
              />
            </div>
          </CardContent>
          <CardFooter class="flex-col space-y-2">
            <Button class="w-full" type="submit"> Login </Button>
            <div>
              <span>Don't have an account</span>
              <RouterLink
                to="/auth/register"
                class="border-b border-gray-500 text-muted-foreground hover:text-primary"
              >
                Rgister
              </RouterLink>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  </div>
</template>