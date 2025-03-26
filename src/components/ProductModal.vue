<script setup lang="ts">
import Modal from '@/components/ui/Modal.vue'
import useProductModal from '@/composables/useProductModal'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from './ui/input'
import { Label } from './ui/label'
// import { useGlobalLoader } from 'vue-global-loader'
import { computed, ref } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore'

const { isOpen, onClose } = useProductModal()
// const { displayLoader, destroyLoader } = useGlobalLoader

type PAYLOAD = {
  name: string
  price: number
  stock: number
  mainImage: File | undefined
  subImages: File[] | undefined
  description: string
  category: string | undefined
}

const form = ref<PAYLOAD>({
  name: "Product",
  price: 10,
  stock: 10,
  mainImage: undefined,
  subImages: undefined,
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel sapiente in praesentium tempora ipsam libero mollitia excepturi itaque. Saepe, rerum!",
  category: undefined
})

const categoryStore = useCategoryStore()
const categories = computed(() => categoryStore.categoriesData.categories)
</script>

<template>
  <Modal :isOpen="isOpen" @on-close="onClose">
    <div class="overflow-y-auto h-[500px] max-h-[600px]">
      <form action="">
        <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input 
            id="name"
            type="text"
            placeholder="Name"
            v-model="form.name"
          />
        </div>
        <div class="grid gap-2">
          <Label for="price">Price</Label>
          <Input 
            id="price"
            type="number"
            placeholder="Price"
            v-model="form.price"
          />
        </div>
        <div class="grid gap-2">
          <Label for="stock">Stock</Label>
          <Input 
            id="stock"
            type="number"
            placeholder="Stock"
            v-model="form.stock"
          />
        </div>
        <div class="grid gap-2">
          <Label for="description">Description</Label>
          <Input 
            id="description"
            type="text"
            placeholder="Description"
            v-model="form.description"
          />
        </div>
        <div class="grid gap-1">
          <Label for="category">Category</Label>
          <Select v-model="form.category" id="category">
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="category in categories"
                  :key="category._id"
                  :value="category._id"
                >
                  {{ category.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>
  </Modal>
</template>