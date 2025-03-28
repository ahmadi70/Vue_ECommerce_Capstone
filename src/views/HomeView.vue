<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import ProductModal from '@/components/ProductModal.vue'
import useProductModal from '@/composables/useProductModal'
import { useCategoryStore } from '@/stores/categoryStore'
import { useProductStore } from '@/stores/productStore'
import { useGlobalLoader } from 'vue-global-loader'
import {
  Card,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { 
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
} from '@/components/ui/pagination'

const { isOpen, onOpen } = useProductModal()

const { displayLoader, destroyLoader } = useGlobalLoader()
const categoryStore = useCategoryStore()
const fetchCategories = async () => {
  try {
    await categoryStore.getCategories(1, 5)
  } catch (error) {
    console.log(error)
  }
}

const currentPage = ref(1)
const productStore = useProductStore()
const products = computed(() => productStore.productsData.products)
const totalPages = computed(() => productStore.productsData.totalPages)
const totalProducts = computed(() => productStore.productsData.totalProducts)
const productsData = computed(() => productStore.productsData)
const fetchProducts = async () => {
  try {
    await productStore.getProducts(currentPage.value, 2)
  } catch (error) {
    console.log(error)
  }
}

const initialSetup = async () => {
  try {
    displayLoader()
    await fetchCategories()
    await fetchProducts()
  } catch (error) {
    console.log(error)
  } finally {
    destroyLoader()
  }
}

const deleteProduct = async (id: string) => {
  try {
    displayLoader()
    await productStore.deleteProduct(id)
  } catch (error) {
    console.log(error)
  } finally {
    destroyLoader()
  }
}

onMounted(async () => {
  await initialSetup()
})
</script>

<template>
  <ProductModal v-if="isOpen" />
  <div class="mx-auto w-full max-w-4xl my-10">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">All Products</h1>
      <Button @click="onOpen">Add Product</Button>
    </div>
    <div class="w-full grid grid-cols-3 gap-4 my-10">
      <Card v-for="product in products" :key="product._id">
        <CardContent class="grid gap-4 p-0">
          <div class="grid gap-2">
            <div class="group overflow-hidden cursor-pointer">
                <div
                :style="{ backgroundImage: `url('${product.mainImage.url}')`}"
                style="transition-duration: 2000ms;"
                class="bg-cover bg-center h-[20vh] transform scale-100 transition-transform ease-[cubic-bezier(0.25,0.45,0.45,0.95)] group-hover:scale-150"
                ></div>
            </div>
            
            <div class="p-4">
              <h2 class="text-xl font-semibold line-clamp-1">{{ product.name }}</h2>
              <p class="line-clamp-3">{{ product.description }}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter class="border-t p-4 pt-4 w-full justify-between">
          <p>{{ product.price }}$</p>
          <div class="flex space-x-2">
            <Button variant="secondary" @click="$router.push(`/products/${product._id}`)">
              <Icon icon="mi:edit"  class="h-4 w-4"/>
            </Button>
            <Button variant="destructive" @click="deleteProduct(product._id)">
              <Icon icon="mi:delete"  class="h-4 w-4"/>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
    <div 
      class="w-full flex justify-center"
      v-if="Object.keys(productsData).length && productsData.products.length"
    >
      <Pagination
        v-slot="{ page }"
        :default-page="1"
        :items-per-page="2"
        :total="totalProducts"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst @click="currentPage = 1" />
          <PaginationPrev @click="currentPage = currentPage - 1" />

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                :variant="item.value === page ? 'default' : 'outline'"
                class="w-10 h-10 p-0"
                @click="
                  async () => {
                    currentPage = item.value
                    await fetchProducts()
                  }
                "
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext @click="currentPage = + 1" />
          <PaginationLast @click="currentPage = totalPages" />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>
