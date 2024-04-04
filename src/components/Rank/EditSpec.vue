<script setup>
import { onMounted, ref ,watch} from 'vue'
import ItemsCard from '../Util/ItemsCard.vue'
const props = defineProps({
    selectedOption: String,
})
const emit = defineEmits(["updatePcSet"])
const itemList = ref([])
const isLoading = ref(true)
const selectedOption = ref(props.selectedOption)
let addSuccess = ref(false)
const fetchData = async () => {
    isLoading.value = true
    const result = await fetch(`http://localhost:5000/${selectedOption.value}`)
    const response = await result.json()
    itemList.value = response
    isLoading.value = false
}

watch( () => props.selectedOption, async (newValue, oldValue) => {
  selectedOption.value = newValue
  await fetchData() 
})
onMounted(async () => {
    console.log("edit spec",selectedOption)
    await fetchData() 
   
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
    <div class="max-w-sm mx-auto" v-if="isLoading">
        <span class="text-2xl font-bold text-indigo-700">Loading... </span>
    </div>
    <div class="grid grid-cols-3 gap-4" v-else>
        <ItemsCard v-for="item in itemList" :key="item.id" :item="item" :listName="selectedOption" @itemAddedToCart="handleAdded"></ItemsCard>
    </div>
</template>

<style scoped></style>
