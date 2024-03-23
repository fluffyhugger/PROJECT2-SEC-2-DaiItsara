<script setup>
import { onMounted, ref, computed } from 'vue';
import { SortBy } from "./enum";

const props = defineProps(['selectedOption', 'products', 'isLoading']);
const sortByProducts = () => {
    if (props.selectedOption === SortBy.Price) {
        return [...props.products].sort((a, b) => b['total-price'] - a['total-price']);
    } else if (props.selectedOption === SortBy.Latest) {
        return [...props.products].sort((a, b) => new Date(b['build-date']) - new Date(a['build-date']));
    } else {
        return props.products;
    }
};
</script>

<template>
    <div v-if="props.isLoading">Loading...</div>

    <!-- Render products if data has been fetched -->
    <div v-else>
        <div v-for="product in sortByProducts()" :key="product.id">
            <img :src="product['components'][6].case['image-url']" :alt="product.name"
                style="max-width: 200px; max-height: 200px;">
            <p>id: {{ product['id'] }}</p>
            <p>build-date: {{ Date(product['build-date']) }}</p>
            <p>builder-id: {{ product['builder-id'] }}</p>
            <p>builder-name: {{ product['builder-name'] }}</p>
            <p>total Price: {{ product['total-price'] }}</p>
        </div>

    </div>
</template>

<style scoped></style>