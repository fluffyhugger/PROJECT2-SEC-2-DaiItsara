<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  item: Object,
  listName: String
})

const emit = defineEmits(['itemAddedToCart'])

const cart = ref(JSON.parse(localStorage.getItem('cart')) || {})

let builderName = localStorage.getItem('builderName') || 'Anonymous'

onMounted(() => {
  if (!localStorage.getItem('builderName')) {
    promptBuilderName()
  }
})

const promptBuilderName = () => {
  const userInput = window.prompt('Enter builder name (optional):', 'Anonymous')
  builderName = userInput || 'Anonymous'
  localStorage.setItem('builderName', builderName)
}

const addToSpec = (listName, component) => {
  const builderId = Math.floor(Math.random() * 1000) + 1
  // Generate a random builder ID
  localStorage.setItem('builderId', builderId)
  let buildDate = new Date().toISOString()

  // Convert the Date object to a string in the specified format
  buildDate = buildDate.substring(0, 10) + 'T' + buildDate.substring(11, 19)
  localStorage.setItem('buildDate', buildDate)

  // Extract the required fields from the component
  const { id, brand, series, model, picture, price } = component
  const newItem = {
    id: id,
    name: `${brand}${series ? ` ${series}` : ''} ${model}`,
    'image-url': picture,
    price: price
  }

  // Add the component to the cart based on the listName
  switch (listName) {
    case 'cpu':
      cart.value.cpu = newItem
      break
    case 'ram':
      cart.value.ram = newItem
      break
    case 'gpu':
      cart.value.gpu = newItem
      break
    case 'ssd':
      cart.value.ssd = newItem
      break
    case 'hdd':
      cart.value.hdd = newItem
      break
    case 'psu':
      cart.value.psu = newItem
      break
    case 'case':
      cart.value.case = newItem
      break
    case 'monitor':
      cart.value.monitor = newItem
      break
    case 'mainboard':
      cart.value.mainboard = newItem
      break
    case 'cooler':
      cart.value.cooler = newItem
      break
    default:
      console.error('Invalid listName:', listName)
  }
  // Update localStorage with the updated cart data
  localStorage.setItem('cart', JSON.stringify(cart.value))
  emit('itemAddedToCart', true)
}
</script>

<template>
  <div
    class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
  >
    <!-- Image section! -->
    <div class="flex justify-center pt-3">
      <div class="item-image">
        <img class="rounded-lg" :src="item.picture" :alt="item.series" />
      </div>
    </div>
    <div class="p-5">
      <RouterLink :to="`/build/${listName}/${item.id}`">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ item.brand }} {{ item.series }} {{ item.model }}
        </h5>
      </RouterLink>
      <span class="mr-4"> {{ item.price }} Bath</span>
      <label
        for="my_modal_7"
        class="btn dark:bg-gray-700"
        @click="addToSpec(listName, item)"
      >
        Add to Spec
      </label>
      <input type="checkbox" id="my_modal_7" class="modal-toggle" />
      <div class="modal" role="dialog">
        <div class="modal-box dark:bg-gray-700">
          <h3 class="text-lg font-bold dark:text-white">
            {{ item.brand }} {{ item.series }} {{ item.model }}
          </h3>
          <p class="px-28 dark:text-black font-semibold text-xl">Has been added to cart!!</p>
        </div>
        <label class="modal-backdrop" for="my_modal_7">Close</label>
      </div>
    </div>
  </div>
</template>


<style scoped>
.item-image {
  width: 100%;
  height: 0;
  padding-top: 100%; /* 1:1 aspect ratio */
  overflow: hidden;
  position: relative;
  margin: 1rem; /* Add margin around the image */
}

.item-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* Ensure the image fits within the container without stretching */
}

.btn {
  background-color: #46ddd9; /* default button color */
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #304456; /* darker shade on hover */
}

.modal-box {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #ffffff; /* default modal background */
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent backdrop */
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal-backdrop:hover {
  background-color: #00000021; /* darker shade on hover */
}

.dark {
  color: #fff; /* default text color in dark mode */
}

.dark:hover {
  color: #b4b4b4; /* lighter shade on hover in dark mode */
}

.dark.btn {
  background-color: #304456; /* button color in dark mode */
}

.dark.btn:hover {
  background-color: #46ddd9; /* lighter shade on hover in dark mode */
}

.dark.modal-box {
  background-color: #304456; /* modal background color in dark mode */
}

.dark.modal-backdrop {
  background-color: #46ddd9; /* backdrop color in dark mode */
}
</style>
