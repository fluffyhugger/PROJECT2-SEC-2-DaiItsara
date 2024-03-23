<script setup>
import { onMounted, ref, computed } from 'vue';
import { SortBy } from "./enum";

const props = defineProps(['selectedOption']);
let isLoading = ref(true); // Indicates whether data is loading
let products = []
const componentTypes = [
    "cpu",
    "ram",
    "gpu",
    "ssd",
    "hdd",
    "psu",
    "case",
    "monitor",
    "mainboard",
    "cooler",
];

onMounted(async () => {
    try {
        const result = await fetch(`http://localhost:5000/pc-build`);
        const responses = await result.json();
        let i = 0

        // Filter products based on the component type
        // Iterate over each component type
        responses.forEach(response => {
            let totalPrice = 0
            products[i] = response
            response.components.forEach(component => {
                // Extract the component type
                const componentType = Object.keys(component)[0];

                // Check if the component type is included in the list of component types
                if (componentTypes.includes(componentType)) {
                    // Add the price of the component to the total price
                    totalPrice += component[componentType].price;
                }
            });
            products[i]['total-price'] = totalPrice
            i = i + 1
        })

        console.log('Total price:', products);
        isLoading.value = false;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
const sortByProducts = computed(() => {
    if (props.selectedOption === SortBy.Price) {
        // Sort by price if selected option is 'price' desc
        return [...products].sort((a, b) =>  b['total-price']-a['total-price'] );
    }
    else if (props.selectedOption === SortBy.Latest) {
        
        return [...products].sort((a, b) => new Date(b['build-date']) - new Date(a['build-date']));
    }
    else {
        return products;
    }
});
</script>

<template>
    <div v-if="isLoading">Loading...</div>

    <!-- Render products if data has been fetched -->
    <div v-else>
        <div v-if="props.selectedOption === SortBy.Price">sort by price</div>
        <div v-for="product in sortByProducts" :key="product.id">
            <img :src="product['components'][0].cpu['image-url']" :alt="product.name"
                style="max-width: 200px; max-height: 200px;">
            <p>id : {{ product['id'] }}</p>
            <p>buold-date {{ product['build-date'] }}</p>
            <p>url :{{ product['components'][0].cpu['image-url'] }} </p>
            <p>builder-id :{{ product['builder-id'] }}</p>
            <p>builder-name :{{ product['builder-name'] }}</p>
            <p>total Price : {{ product['total-price'] }}</p>
        </div>
        <div v-if="props.selectedOption === 'price'"></div>

    </div>
</template>

<style scoped></style>