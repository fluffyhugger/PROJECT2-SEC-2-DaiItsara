<script setup>
// import { defineProps } from "vue";

//child
const props = defineProps(["selectedOption", "products", "isLoading"]);
//format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

//format price ,
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
</script>
<template>
    <div v-if="props.isLoading">Loading...</div>
    <div v-else>
        <table class="product-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Spec Details</th>
                    <th>Builder</th>
                    <th>Build Date</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <router-link v-for="(product, index) in props.products" :key="product.id"
                    :to="`/ranking/pcset-info/${product['builder-id']}`" class="table-row">
                    <tr>
                        <td>{{ index + 1 }}</td>
                        <td>
                            <div class="product-image">
                                <img :src="product.case['image-url']" :alt="product.name" />
                            </div>
                        </td>
                        <td>{{ product["builder-name"] }}</td>
                        <td>{{ formatDate(product["build-date"]) }}</td>
                        <td>{{ formatPrice(product["total-price"]) }}</td>
                    </tr>
                </router-link>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.product-table {
    border-collapse: collapse;
    width: 100%;
}

.product-table th,
.product-table td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
}

.product-table th {
    background-color: #f2f2f2;
}

.table-row:hover {
    background-color: #f2f2f2;
}

.product-image img {
    width: 75px;
    height: 75px;
    object-fit: cover;
}
</style>
