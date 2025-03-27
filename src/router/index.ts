import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import CategoryView from '@/views/CategoryView.vue'
import SingleProduct from '@/views/products/[id].vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/products/:id',
      name: 'single-product',
      component: SingleProduct,
    },
    {
      path: '/category',
      name: 'category',
      component: CategoryView,
    },
    {
      path: '/auth/login',
      name: 'auth-login',
      component: LoginView,
    },
    {
      path: '/auth/register',
      name: 'auth-register',
      component: RegisterView,
    }
  ],
})

export default router