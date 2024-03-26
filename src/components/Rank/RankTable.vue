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
    <div class="mt-10 mb-10">
        <table class="table ">
            <thead class="font-bold text-xl">
                <tr>
                    <th>#</th>
                    <th>Spec Details</th>
                    <th>xxxxxx</th>
                    <th>Builder</th>
                    <th>Build Date</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in props.products" :key="product.id"
                    :class="{ 'bg-gray-100': index % 2 === 0 }" >
                    <td class=" text-center font-semibold">{{ index + 1 }}</td>
                    <td>
                       
                        <img :src="product.case['image-url']" :alt="product.name" class="product-image w-24 h-24" />
                        {{ product.cpu['name'] }}{{ product.gpu['name'] }}

                    </td>
                    <td> <router-link :to="`/ranking/pcset-info/${product['builder-id']}`">xxxxxx</router-link></td>
                    <td>{{ product["builder-name"] }}</td>
                    <td>{{ formatDate(product["build-date"]) }}</td>
                    <td>{{ formatPrice(product["total-price"]) }}</td>
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
