<script setup>
import { ref } from 'vue'
import DeleteConfirmPopup from './Util/DeleteConfirmPopup.vue'

const props = defineProps({
  selectedOption: String,
  products: Array,
  isLoading: Boolean
})

const showDeletePopup = ref(false)
let productToDelete = null

const confirmDelete = (productId) => {
  showDeletePopup.value = true
  productToDelete = productId
}

const cancelDeletePopup = () => {
  showDeletePopup.value = false
  productToDelete = null
}

const deleteConfirmed = async () => {
  await handleDataDeleted(productToDelete)

  cancelDeletePopup()
}

const handleDataDeleted = async (builderId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/pc-build/${builderId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.ok) {
      emit('dataDeleted', builderId)
    } else {
      console.error('Error deleting product:', response.statusText)
    }
  } catch (error) {
    console.error('Error deleting product:', error)
  }
}

const deleteProduct = (builderId) => {
  handleDataDeleted(builderId)
}
const emit = defineEmits(['dataDeleted'])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
</script>

<template>
  <div class="mt-10 mb-10">
    <table class="table">
      <thead class="font-bold text-xl">
        <tr>
          <th></th>
          <th>Spec Details</th>
          <th>xxxxxx</th>
          <th>Builder</th>
          <th>Build Date</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(product, index) in props.products"
          :key="product.id"
          :class="{ 'bg-gray-100': index % 2 === 0 }"
        >
          <td class="text-center font-semibold">{{ index + 1 }}</td>
          <td>
            <img
              v-if="product.case && product.case['image-url']"
              :src="product.case['image-url']"
              :alt="product.name"
              class="product-image w-24 h-24"
            />
            <span v-else>No Image Available</span>
            <span v-if="product.cpu && product.cpu['name']">{{
              product.cpu['name']
            }}</span>
            <span v-if="product.gpu && product.gpu['name']">{{
              product.gpu['name']
            }}</span>
          </td>
          <td>
            <router-link :to="`/ranking/pcset-info/${product['builder-id']}`"
              >xxxxxx</router-link
            >
          </td>
          <td>{{ product['builder-name'] }}</td>
          <td>{{ formatDate(product['build-date']) }}</td>
          <td>{{ formatPrice(product['total-price']) }}</td>
          <td>
            <button
              @click="confirmDelete(product.id)"
              class="btn bg-red-500 hover:opacity-50 text-white"
            >
              Delete
            </button>

            <DeleteConfirmPopup
              v-if="showDeletePopup"
              @cancel="cancelDeletePopup"
              @delete="deleteConfirmed"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.table th {
  background-color: #f2f2f2;
}

.table-row:hover {
  background-color: #f2f2f2;
}

.product-image {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
