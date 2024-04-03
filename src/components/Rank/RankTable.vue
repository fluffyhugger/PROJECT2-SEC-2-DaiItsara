<script setup>
import { ref, computed, onMounted } from 'vue';
import { getComponentProperty } from "./enum"
const props = defineProps({
  selectedOption: String,
  products: Array,
  isLoading: Boolean,
})
const minPrice = ref("")
const maxPrice = ref("")
const cpus = ref([])
const gpus = ref([])
const selectedCPUs = ref("default")
const selectedGPUs = ref("default")

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
}
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const filteredProducts = computed(() => {
  let filtered = props.products
  // Filter by price range
  const min = parseFloat(minPrice.value)
  const max = parseFloat(maxPrice.value)
  if (!isNaN(min) && !isNaN(max)) {
    filtered = filtered.filter((product) => {
      const price = parseFloat(product["total-price"])
      console.log(price)
      return price >= min && price <= max
    })
  }

  // Filter CPUs by brand
  if (selectedCPUs.value !== "default") {
    filtered = filtered.filter((product) => {
      const matchingCPUs = cpus.value.filter((cpu) => cpu.brand.toLowerCase() === selectedCPUs.value.toLowerCase());
      return matchingCPUs.some(cpu => cpu.id === product.cpu.id);
    });

  }


  // // Filter GPUs by GPU chipset
  if (selectedGPUs.value !== "default") {
    console.log("before", filtered)
    filtered = filtered.filter((product) => {
      const matchingGPUs = gpus.value.filter((gpu) => gpu['gpu-chipset'].toLowerCase() === selectedGPUs.value.toLowerCase());
      return matchingGPUs.some(gpu => gpu.id === product.gpu.id);
    });
    console.log("after", filtered)
  }
  return filtered
})
onMounted(async () => {
  const resultCpu = await fetch(`http://localhost:5000/cpu`)
  cpus.value = await resultCpu.json()
  const resultGpu = await fetch(`http://localhost:5000/gpu`)
  gpus.value = await resultGpu.json()
})

</script>
<template>
  <div class="mt-10 mb-10">
    <div class="border-t solid 0.5px border-gray-300 p-4 flex flex-row items-center">
      <div class="mr-4">filter:</div>
      <div class="mr-4">
        <span>Price Range: </span>
        <label for="min-price" class="mr-2">Min</label>
        <input type="text" name="min-price" id="min-price" v-model="minPrice"
          class="w-20 border rounded-md p-1 bg-slate-50" />
        <label for="max-price" class="mx-2">Max</label>
        <input type="text" name="max-price" id="max-price" v-model="maxPrice"
          class="w-20 border rounded-md p-1 bg-slate-50" />
      </div>
      <select class="select select-secondary w-full max-w-xs" v-model="selectedCPUs">
        <option value="">All CPUs</option>
        <option value="Intel">INTEL</option>
        <option value="AMD">AMD</option>
      </select>
      <select class="select select-secondary w-full max-w-xs" v-model="selectedGPUs">
        <option value="">All GPUs</option>
        <option value="NVIDIA">NVIDIA</option>
        <option value="AMD">AMD</option>
      </select>
    </div>
    <hr />
    <table class="table">
      <thead class="font-bold text-xl">
        <tr>
          <th></th>
          <th>Spec Details</th>
          <th>xxxxxx</th>
          <th>Builder</th>
          <th>Build Date</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in filteredProducts" :key="product.id" :class="{ 'bg-gray-100': index % 2 === 0 }">
          <td class="text-center font-semibold">{{ index + 1 }}</td>
          <td>
            <img :src="getComponentProperty(product, 'case', 'image-url')" :alt="product.name"
              class="product-image w-24 h-24" />
            {{ getComponentProperty(product, "cpu", "name")
            }}{{ getComponentProperty(product, "gpu", "name") }}
          </td>
          <td>
            <router-link :to="`/ranking/pcset-info/${product['builder-id']}`">xxxxxx</router-link>
          </td>
          <td>{{ product["builder-name"] }}</td>
          <td>{{ formatDate(product["build-date"]) }}</td>
          <td>{{ formatPrice(product["total-price"]) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <hr />
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
