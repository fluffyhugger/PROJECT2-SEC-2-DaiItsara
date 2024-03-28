<script setup>
import { onMounted, ref ,watch} from 'vue'
import ItemsCard from '../Util/ItemsCard.vue'
const props = defineProps({
    selectedOption: String,
})
const emit = defineEmits(["updatePcSet"])
// Define reactive variable to hold itemList data fetched from API
const itemList = ref([])
// Define reactive variable to track loading state
const isLoading = ref(true)
// Define reactive variable to track selected option
const selectedOption = ref(props.selectedOption)
let addSuccess = ref(false)
// Function to fetch data from API based on selected option
const fetchData = async () => {
    isLoading.value = true
    const result = await fetch(`http://localhost:5000/${selectedOption.value}`)
    const response = await result.json()
    itemList.value = response
    isLoading.value = false
}

watch( () => props.selectedOption, async (newValue, oldValue) => {
  selectedOption.value = newValue
  await fetchData() // Fetch initial data when component is mounted
})
onMounted(async () => {
    console.log("edit spec",selectedOption)
    await fetchData() // Fetch initial data when component is mounted
   
})

const handleAdded = (isAdded) => {
    if (isAdded){
        emit("updatePcSet",selectedOption.value)
    }
}
</script>

<template>
    <button ></button>
    <h1>Build spec {{ addSuccess }}</h1>
    <h1>Select {{ selectedOption }}</h1>
    <!-- Loading indicator -->
    <div class="max-w-sm mx-auto" v-if="isLoading">
        <span class="text-2xl font-bold text-indigo-700">Loading... </span>
    </div>
    <!-- Grid layout for displaying fetched items -->
    <div class="grid grid-cols-3 gap-4" v-else>
        <!-- Items fetched from API -->
        <ItemsCard v-for="item in itemList" :key="item.id" :item="item" :listName="selectedOption" @itemAddedToCart="handleAdded"></ItemsCard>
        <!-- Button to show cart pop-up -->
    </div>
</template>

<style scoped></style>
