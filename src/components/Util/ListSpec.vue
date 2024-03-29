<script setup>
import DeleteSpec from "../DeleteSpec.vue"
import { ref, onMounted, computed } from 'vue';
import { SortBy, TotalPrice } from "../Rank/enum";
import BuildSpec from "../BuildSpec.vue";

// parent component 

let selectedOption = ref(SortBy.Price);
let products = ref([]);
let isLoading = ref(true);



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

// const specList = ref(new SpecManagement())
onMounted(async () => {
    try {
        const result = await fetch(`http://localhost:5000/pc-build`);
        const responses = await result.json();
        // Filter products based on the component type and calculate total price
        responses.forEach(response => {
            const prices = Object.keys(response)
                .filter(key => componentTypes.includes(key)) // Filter out non-component keys
                .map(key => response[key].price); // Map to the price of each component
            response['total-price'] = TotalPrice(...prices); // Calculate total price and add it to the response
        });
        products.value = responses;
        isLoading.value = false;
        console.log("product ",products.value)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

const sortByProducts = computed(() => {
    if (selectedOption.value === SortBy.Price) {
        return [...products.value].sort((a, b) => b['total-price'] - a['total-price']);
    } else if (selectedOption.value === SortBy.Latest) {
        return [...products.value].sort((a, b) => new Date(b['build-date']) - new Date(a['build-date']));
    } else {
        return products.value;
    }
});



</script>

<template>
    <div class="relative m-12 bg-transparent backdrop-blur-md shadow-lg p-5">
        <h1 class="text-3xl font-bold tracking-wide ">
            PC SPEC LIST
        </h1>
        <DeleteSpec :selectedOption="selectedOption" :products="sortByProducts" :isLoading="isLoading" @dataDeleted="handleDataDeleted"/>
    </div>
</template>

<style scoped></style>
