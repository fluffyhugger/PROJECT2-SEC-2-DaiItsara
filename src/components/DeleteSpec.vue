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
            <select class="select select-secondary w-full max-w-xs">
                <option disabled selected>CPU</option>
                <option>INTEL</option>
                <option>AMD</option>
            </select>
            <select class="select select-secondary w-full max-w-xs">
                <option disabled selected>GPU</option>
                <option>AMD</option>
                <option>NVIDIA</option>
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
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in props.products" :key="product.id"
                    :class="{ 'bg-gray-100': index % 2 === 0 }">
                    <td class="text-center font-semibold">{{ index + 1 }}</td>
                    <td>
                        <img :src="product.case['image-url']" :alt="product.name" class="product-image w-24 h-24" />
                        {{ product.cpu['name'] }}{{ product.gpu['name'] }}
                    </td>
                    <td> <router-link :to="`/ranking/pcset-info/${product['builder-id']}`">xxxxxx</router-link></td>
                    <td>{{ product["builder-name"] }}</td>
                    <td>{{ formatDate(product["build-date"]) }}</td>
                    <td>{{ formatPrice(product["total-price"]) }}</td>
                    <td><button type="button" class="btn bg-red-700 hover:opacity-50 text-white" @click="deleteData(product['builder-id'])">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
// Import necessary functions and variables
import { ref, defineProps } from 'vue';

// Define props
const props = defineProps({
    selectedOption: String,
    products: Array,
    isLoading: Boolean
});

// Define reactive variables
const minPrice = ref('');
const maxPrice = ref('');
const selectedCPUs = ref([]);
const selectedGPUs = ref([]);

// Logic to select CPU
    const selectCPU = (cpu) => {
        // Toggle selection
        const index = selectedCPUs.value.indexOf(cpu);
        if (index === -1) {
            selectedCPUs.value.push(cpu);
        } else {
            selectedCPUs.value.splice(index, 1);
        }
        // Sort products based on selected CPU
        sortProducts();
    };

// Logic to select GPU
    const selectGPU = (gpu) => {
        const index = selectedGPUs.value.indexOf(gpu);
        if (index === -1) {
            selectedGPUs.value.push(gpu);
        } else {
            selectedGPUs.value.splice(index, 1);
        }
        sortProducts();
};
    const sortProducts = () => {
        let sortedProducts = [...props.products];
        if (selectedCPUs.value.length > 0) {
            sortedProducts = sortedProducts.filter(product => selectedCPUs.value.includes(product.cpu.name));
        }
        if (selectedGPUs.value.length > 0) {
            sortedProducts = sortedProducts.filter(product => selectedGPUs.value.includes(product.gpu.name));
        }
        props.products = sortedProducts;
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    };
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const deleteData = async (buliderId) => {
    try {
        // Send DELETE request to delete the product with buliderId
        const response = await fetch(`http://localhost:5173/deleting/${buliderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                // Add any additional headers if needed
            }
        });
        // Check if deletion was successful
        if (response.ok) {
            // Find and remove the deleted product from the products array
            props.products = props.products.filter(product => product.id !== buliderId);
        } else {
            // Handle error response
            console.error('Error deleting product:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};
</script>

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
