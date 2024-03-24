<script setup>
import { defineProps } from 'vue';

//child
const props = defineProps(['selectedOption', 'products', 'isLoading']);
</script>

<template>
    <div v-if="props.isLoading">Loading...</div>

    <!-- Render products if data has been fetched -->
    <div v-else>
        <table>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
        </table>
        <router-link v-for="product in props.products" :key="product.id" :to="`/ranking/product-info/${product['builder-id']}`" class="class-table">
           <!-- <div class="class-table" v-for="product in sortByProducts()" :key="product.id" > -->
            <img :src="product.case['image-url']" :alt="product.name"
                style="max-width: 200px; max-height: 200px;">
            <p>build-date: {{ new Date(product['build-date']) }}</p>
            <p>builder-id: {{ product['builder-id'] }}</p>
            <p>builder-name: {{ product['builder-name'] }}</p>
            <p>total Price: {{ product['total-price'] }}</p>
            <!-- </div> -->

        </router-link>
    </div>
</template>

<style scoped>
.class-table {
    border: 1px solid #ccc;
    padding: 10px;
}
</style>