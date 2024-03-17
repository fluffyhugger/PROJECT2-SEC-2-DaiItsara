<script setup>
defineProps({
    cpu: Object,
    ram: Object,
    gpu: Object,
    ssd: Object,
    hdd: Object,
    psu: Object,
    case: Object,
    monitor: Object,
    mainboard:Object,
    cooler:Object

})

</script>
 
<template>
<div v-if="cpu" class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-center pt-3">
        <!-- Image section! -->
    </div>
    <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {{cpu.brand}} {{ cpu.series }} {{cpu.model}}
        </h5>
    </div>
</div>

<div v-else-if="ram" class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-center pt-3">
        <!-- Image section! -->
    </div>
    <div class="p-5">
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {{ram.brand}} {{ram.model}}
        </h5>
    </div>
</div>

<div v-else-if="gpu" class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-center pt-3">
        <!-- Image section! -->
    </div>
    <div class="p-5">
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {{gpu.brand}} {{gpu.model}}
        </h5>
    </div>
</div>
</template>
 
<style scoped>

</style>