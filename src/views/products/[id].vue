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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { computed, onMounted, ref } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore'
import FileUploader from '@/components/FileUploader.vue'
import { useObjectUrl } from '@vueuse/core'
import { useGlobalLoader } from 'vue-global-loader'
import { useProductStore } from '@/stores/productStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const { isOpen, onClose } = useProductModal()

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
const mainImagePreview = ref<string[]>([])
  const subImagePreviews = ref<string[]>([])

const onMainImageDrop = (files: File[] | null) => {
  form.value.mainImage = files && files.length > 0 ? files[0] : undefined
  
  if(files && files.length) {
    files.forEach((file, index) => {

      if (index === 0) {
        const url = useObjectUrl(file)

         if (url.value) {
          mainImagePreview.value = []
          mainImagePreview.value.push(url.value)
         }
      }
    })
  }
}

const onMainImageChange = (files: FileList | null) => {
  form.value.mainImage = files && files.length > 0 ? files[0] : undefined
  
  if(files && files.length) {
    Array.from(files).forEach((file, index) => {

      if (index === 0) {
        const url = useObjectUrl(file)
        
         if (url.value) {
          mainImagePreview.value = []
          mainImagePreview.value.push(url.value)
         }
      }
    })
  }
}

const onSubImagesDrop = (files: File[] | null) => {
  form.value.subImages = files && files.length > 0 ? files : undefined
  
  if(files && files.length) {
    files.forEach((file) => {
      const url = useObjectUrl(file)
      
      if (url.value) {
        subImagePreviews.value.push(url.value)
      }
    })
  }
}

const onSubImagesChange = (files: FileList | null) => {
  form.value.subImages = files && files.length > 0 ? Array.from(files) : undefined
  
  if(files && files.length) {
    Array.from(files).forEach((file) => {
      const url = useObjectUrl(file)
        
      if (url.value) {
        subImagePreviews.value.push(url.value)
      }
    })
  }
}

const { displayLoader, destroyLoader } = useGlobalLoader()
const productStore = useProductStore()
const onSubmit = async () => {
  try {
    displayLoader()
    await productStore.editProduct(route.params.id.toString(), form.value)
    onClose()
  } catch (error) {
    console.log(error)
  } finally {
    destroyLoader()
  }
}

const fetchProduct = async () => {
  try {
    displayLoader()
    const product = await productStore.getProduct(route.params.id.toString())

    if (product) {
      form.value.name = product.name
      form.value.price = product.price
      form.value.stock = product.stock
      form.value.description = product.description
      form.value.category = product.category
      mainImagePreview.value.push(product.mainImage.url)
      subImagePreviews.value = product.subImages.map(image => image.url)
    }
  } catch (error) {
    console.log(error)
  } finally {
    destroyLoader()
  }
}

onMounted( async () => {
  await fetchProduct()
})
</script>

<template>
  <div class="mx-auto max-w-4xl w-full my-10">
    <form @submit.prevent="onSubmit" class="grid gap-y-4">
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
        <Label>Main Image</Label>
        <div class="grid grid-cols-2 gap-2 flex-wrap">
          <FileUploader
            :multiple="false"
            @on-change="onMainImageChange"
            @on-drop="onMainImageDrop"
          />
          <img
            v-for="img in mainImagePreview"
            class="h-40 w-auto object-cover border"
            :alt="img"
            :src="img"
          >
        </div>
      </div>
      <div class="grid gap-2">
        <Label>Sub Image</Label>
        <div class="grid grid-cols-2 gap-2 flex-wrap">
          <FileUploader
            :multiple="true"
            @on-change="onSubImagesChange"
            @on-drop="onSubImagesDrop"
          />
          <img
            v-for="img in subImagePreviews"
            class="h-40 w-auto object-cover border"
            :alt="img"
            :src="img"
          >
        </div>
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
      <Button class="w-full" type="submit"> Update Product </Button>
    </form>
  </div>
</template>