<script setup>
import { ref, defineProps, computed, onMounted } from 'vue';
import { getComponentProperty } from "./enum"
const props = defineProps({
  selectedOption: String,
  products: Array,
  isLoading: Boolean
});
const minPrice = ref('');
const maxPrice = ref('');
const cpus = ref([]);
const gpus = ref([]);
const selectedCPUs = ref("default");
const selectedGPUs = ref("default");

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const filteredProducts = computed(() => {
  let filtered = props.products;

  // Filter by price range
  const min = parseFloat(minPrice.value);
  const max = parseFloat(maxPrice.value);
  if (!isNaN(min) && !isNaN(max)) {
    filtered = filtered.filter(product => {
      const price = parseFloat(product["total-price"]);
      console.log(price)
      return price >= min && price <= max;
    });
  }

  // Filter CPUs by brand
  if (selectedCPUs.value !== "default") {
    filtered = filtered.filter(product => {
      const cpu = cpus.value.find(cpu => cpu.brand === selectedCPUs.value);
      return cpu && product.cpu.id === cpu.id;
    });
  }

  // Filter GPUs by GPU chipset
  if (selectedGPUs.value !== "default") {
    filtered = filtered.filter(product => {
      const gpu = gpus.value.find(gpu => gpu["gpu-chipset"]=== selectedGPUs.value);
      return gpu && product.gpu.id === gpu.id;
    });
  }

  return filtered;
});
onMounted(async () => {
  const resultCpu = await fetch(`http://localhost:5000/cpu`);
  cpus.value = await resultCpu.json();
  const resultGpu = await fetch(`http://localhost:5000/gpu`);
  gpus.value = await resultGpu.json();
})
// get by id
// const getComponentById = async (domain,id) => {
//   try {
//     const response = await fetch(`http://localhost:5000/${domain}/${id}`);
//     if (response.ok) {
//       const data = await response.json();
//       console.log('Data retrieved successfully:', data);
//       // Here you can do something with the retrieved data
//       return data;
//     } else {
//       // Handle different HTTP status codes
//       if (response.status === 400) {
//         console.error('Bad request: The server did not understand the request.');
//       } else if (response.status === 401) {
//         console.error('Unauthorized: The server requires user authentication.');
//       } else if (response.status === 404) {
//         console.error('Not found: The requested resource could not be found.');
//       } else if (response.status >= 500 && response.status < 600) {
//         console.error('Server error: Something went wrong on the server.');
//       } else {
//         console.error('Failed to retrieve data. Status:', response.status);
//       }
//       return null;
//     }
//   } catch (error) {
//     console.error('Error retrieving data:', error);
//     return null;
//   }
// };
</script>
<template>
  <div class="mt-10 mb-10">
    <div class="border-t solid 0.5px border-gray-300 p-4 flex flex-row items-center">
      <div class="mr-4">filter:</div>
      <div class="mr-4">
        <span>Price Range: </span>
        <label for="min-price" class="mr-2">Min</label>
        <input type="text" name="min-price" id="min-price" v-model="minPrice"
          class="w-20 border rounded-md p-1 bg-slate-50">
        <label for="max-price" class="mx-2">Max</label>
        <input type="text" name="max-price" id="max-price" v-model="maxPrice"
          class="w-20 border rounded-md p-1 bg-slate-50">
      </div>
      <select class="select select-secondary w-full max-w-xs" v-model="selectedCPUs">
        <option disabled value="default">CPU</option>
        <option value="Intel">INTEL</option>
        <option value="AMD">AMD</option>
      </select>
      <select class="select select-secondary w-full max-w-xs" v-model="selectedGPUs">
        <option disabled value="default">GPU</option>
        <option value="AMD">AMD</option>
        <option value="NVIDIA">NVIDIA</option>
      </select>
    </div>
    <hr>
    <table class="table">
      <thead class="font-bold text-xl">
        <tr>
          <th> </th>
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
            {{ getComponentProperty(product, 'cpu', 'name') }}{{ getComponentProperty(product, 'gpu', 'name') }}
          </td>
          <td> <router-link :to="`/ranking/pcset-info/${product['builder-id']}`">xxxxxx</router-link></td>
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
