<script setup lang="ts">
import { onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import ProductModal from '@/components/ProductModal.vue'
import useProductModal from '@/composables/useProductModal'
import { useCategoryStore } from '@/stores/categoryStore'
import { useGlobalLoader } from 'vue-global-loader'

const { isOpen, onOpen } = useProductModal()

const { displayLoader, destroyLoader } = useGlobalLoader()
const categoryStore = useCategoryStore()
const fetchCategories = async () => {
  try {
    displayLoader()
    await categoryStore.getCategories(1, 5)
  } catch (error) {
    console.log(error)
  } finally {
    destroyLoader()
  }
}

onMounted(async () => {
  await fetchCategories()
})
</script>

<template>
  <ProductModal v-if="isOpen" />
  <div class="mx-auto w-full max-w-4xl my-10">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">All Products</h1>
      <Button @click="onOpen">Add Product</Button>
    </div>
  </div>
</template>
