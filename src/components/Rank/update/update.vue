<script setup>
import { defineProps } from 'vue';
import { library } from "@fortawesome/fontawesome-svg-core"; // Import library
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Corrected import statement

library.add(faPenToSquare); // Add the icon to the library

const props = defineProps({
    components : Array,

});
</script>

<template>
    <div>
        <div class="flex flex-col w-full lg:flex-row">
            <div class="grid flex-grow h-auto card bg-white rounded-box ">
                <ul>
                    <li v-for="(product, index) in props.products" :key="product.id">
                        <div class="flex flex-row border solid 1px border-yellow-400 rounded-md w-fit h-fit ">
                            <img src="" alt="pic">
                            <p> CPU NAME </p>
                            <p> Price </p>
                            <!-- Use the FontAwesomeIcon component with the icon prop -->
                            <font-awesome-icon :icon="['fas', 'pen-to-square']" style="color: #787878;" />
                        </div>
                    </li>
                </ul>
            </div>
            <div class="divider lg:divider-horizontal"></div>
            <div class="grid flex-grow h-auto card bg-base-300 rounded-box place-items-center">
                content
            </div>
        </div>
    </div>
</template>

<style scoped></style>
