<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const productId = router.currentRoute.value.params.id;
let product = ref(null);
const isLoading = ref(true);
let component
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
        console.log(responses, productId)
        product.value = responses.filter(response => response['builder-id'].toString() === productId);
        isLoading.value = false;
        let totalPrice = 0;
        component = product.value[0]['components']
        component.forEach(item => {
            const componentType = Object.keys(item)[0];
            if (componentTypes.includes(componentType)) {
                totalPrice += item[componentType].price;
            }
        })
        product.value[0]['total-price'] = totalPrice;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
</script>

<template>
    <div class="grid-container" v-if="!isLoading">
        <img :src="product[0]['components'][0]['cpu']['image-url']" :alt="product.name"
            style="max-width: 200px; max-height: 200px;" class="grid-item">
        <img :src="product[0]['components'][1]['ram']['image-url']" :alt="product.name"
            style="max-width: 200px; max-height: 200px;" class="grid-item">
        <img :src="product[0]['components'][2]['gpu']['image-url']" :alt="product.name"
            style="max-width: 200px; max-height: 200px;" class="grid-item">
        <img :src="product[0]['components'][3]['ssd']['image-url']" :alt="product.name"
            style="max-width: 200px; max-height: 200px;" class="grid-item">
        <img :src="product[0]['components'][4]['hdd']['image-url']" :alt="product.name"
            style="max-width: 200px; max-height: 200px;" class="grid-item">
        <img :src="product[0]['components'][5]['psu']['image-url']" :alt="product.name"
            style="max-width: 200px; max-height: 200px;" class="grid-item">
        <img :src="product[0]['components'][6]['case']['image-url']" :alt="product.name"
            style="max-width: 200px; max-height: 200px;" class="grid-item">
        <img :src="product[0]['components'][7]['monitor']['image-url']" :alt="product.name"
            style="max-width: 200px; max-height: 200px;" class="grid-item">
        <img :src="product[0]['components'][8]['mainboard']['image-url']" :alt="product.name"
            style="max-width: 200px; max-height: 200px;" class="grid-item">
        <img :src="product[0]['components'][9]['cooler']['image-url']" :alt="product.name"
            style="max-width: 200px; max-height: 200px;" class="grid-item">
        <div class="grid-info grid-item">

            <p> CPU name:{{ component[0]['cpu']['name'] }} price {{ product[0]['components'][0]['cpu']['price'] }}</p>
            <br> <!-- เว้นบรรทัดด้วยแท็ก <br> -->
            <p> Ram name:{{ component[1]['ram']['name'] }} price {{ product[0]['components'][1]['ram']['price'] }}</p>
            <br> <!-- เว้นบรรทัดด้วยแท็ก <br> -->
            <p> GPU name:{{ component[2]['gpu']['name'] }} price {{ product[0]['components'][2]['gpu']['price'] }}</p>
            <br> <!-- เว้นบรรทัดด้วยแท็ก <br> -->
            <p> SSD name:{{ component[3]['ssd']['name'] }} price {{ product[0]['components'][3]['ssd']['price'] }}</p>
            <br> <!-- เว้นบรรทัดด้วยแท็ก <br> -->
            <p> HDD name:{{ component[4]['hdd']['name'] }} price {{ product[0]['components'][4]['hdd']['price'] }}</p>
            <br> <!-- เว้นบรรทัดด้วยแท็ก <br> -->
            <p> PSU name:{{ component[5]['psu']['name'] }} price {{ product[0]['components'][5]['psu']['price'] }}</p>
            <br> <!-- เว้นบรรทัดด้วยแท็ก <br> -->
            <p> CASE name:{{ component[6]['case']['name'] }} price {{ product[0]['components'][6]['case']['price'] }}
            </p>
            <br> <!-- เว้นบรรทัดด้วยแท็ก <br> -->
            <p> MONITOR name:{{ component[7]['monitor']['name'] }} price {{
        product[0]['components'][7]['monitor']['price'] }}</p>
            <br> <!-- เว้นบรรทัดด้วยแท็ก <br> -->
            <p> MAINBOARD name:{{ component[8]['mainboard']['name'] }} price {{
        product[0]['components'][8]['mainboard']['price'] }}</p>
            <br> <!-- เว้นบรรทัดด้วยแท็ก <br> -->
            <p> COOLER name:{{ component[9]['cooler']['name'] }} price {{ product[0]['components'][9]['cooler']['price']
                }}</p>
            <br>
            <p>Total Price: {{ product[0]['total-price'] }}</p>
        </div>
    </div>
</template>

<style scoped>
.grid-info {
    width: 300;
    grid-column: 4 / 5;
    /* Position on the 4th column */
    grid-row: 1 / span 3;
    /* Span 3 rows */
}

.grid-item {
    background-color: #f0f0f0;
    /* Add background color for grid items */
    padding: 20px;
    /* Add padding for spacing within grid items */
    border-radius: 5px;
    /* Add border radius for rounded corners */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* Add box shadow for depth */
}

.grid-container {
    display: grid;
    grid-template-columns: auto auto auto auto;
    margin: 0 auto;
    /* Center the grid horizontally */

}
</style>
