<template>
  <div class="cart-popup-overlay">
    <div class="cart-popup">
      <div class="cart-popup-content">
        <h2 class="cart-title">Items in Cart</h2>
        <p class="textHead">Builder: {{ builderName }}</p>
        <!-- Display the builderName -->
        <ul class="cart-list">
          <li v-for="(item, key) in cart" :key="key" class="cart-item">
            <span class="item-key">{{ key.toUpperCase() }}:</span>
            <span class="item-name">{{ item.name }}</span>
            <button class="underline text-red-700 hover:text-red-400" @click="deleteItem(key)">Delete</button>
            <li><span class="item-price">{{ formatPrice(item.price) }}</span></li>
          </li>
        </ul>
        <div class="cart-total">
          <span>Total:</span>
          <span class="total-price">{{ formatPrice(totalPrice) }}</span>
        </div>
        <!-- Success Message -->
        <p v-if="buildSuccessful" class="success-message">
          BUILD PC SUCCESSFUL <br>
        </p>
        <!-- Close Button -->
        <button @click="closeCart" class="close-button">Close</button>
        <!-- Confirm Build Spec Button -->
        <button v-if="!buildSuccessful" @click="postAndNavigate" class="confirm-button">
          Build
        </button>
        <!-- View Button -->
        <router-link v-if="buildSuccessful" :to="{ path: '/ranking' }" class="view-button">View</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['cart', 'builderName'])
const emits = defineEmits(['close', 'update-cart'])

const router = useRouter()

// Reactive variable for success message
const buildSuccessful = ref(false)

// Define function to post data to JSON server
const postAndNavigate = async () => {
  const currentDate = new Date().toISOString()
  const data = {
    id: Math.random().toString(36).substring(7), // Generate a random ID
    'builder-id': Math.random().toString(36).substring(7), // Generate a random builder ID
    'builder-name': props.builderName,
    'build-date': currentDate,
    ...props.cart
  }
  try {
    const response = await fetch('http://localhost:5000/pc-build', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      console.log('Data posted successfully')
      // Set buildSuccessful to true to display the success message
      buildSuccessful.value = true
      // Optionally, you can emit an event to notify the parent component about the successful post
      localStorage.removeItem('builderId')
      localStorage.removeItem('builderName')
      localStorage.removeItem('buildDate')
      localStorage.removeItem('cart')
    } else {
      console.error('Failed to post data')
    }
  } catch (error) {
    console.error('Error posting data:', error)
  }
}

// Compute total price
const totalPrice = computed(() => {
  let total = 0
  for (const itemKey in props.cart) {
    if (props.cart.hasOwnProperty(itemKey)) {
      total += props.cart[itemKey].price
    }
  }
  return total
})

// Format price
const formatPrice = (price) => {
  return `${price.toFixed(2)}B`
}

// Close cart method
const closeCart = () => {
  emits('close')
}

// Function to delete an item from the cart by its key (ID)
const deleteItem = (key) => {
  const updatedCart = { ...props.cart }
  delete updatedCart[key]
  localStorage.setItem('cart', JSON.stringify(updatedCart))
  console.log(updatedCart)

  // Emit an event to notify the parent component to update the cart
  emits('update-cart', key)
}
</script>

<style scoped>
/* Your existing styles */
.success-message {
  color: green;
  font-weight: bold;
  margin-top: 10px;
}

.close-button,
.confirm-button {
  margin-right: 10px;
}

.cart-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-popup {
  background-color: white;
  padding: 50px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.cart-popup-content {
  max-width: 400px;
}

.cart-title {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
}

.cart-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.cart-item {
  margin-bottom: 5px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
}

.item-key {
  font-weight: bold;
  text-transform: uppercase; /* Convert text to uppercase */
}

.item-name {
  margin-right: 10px;
}

.item-price {
  font-size: 14px;
  color: #777;
}

.cart-total {
  margin-top: 10px;
  font-weight: bold;
  font-size: 18px;
}

.total-price {
  color: red;
}

.close-button {
  background-color: red;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.close-button:hover {
  background-color: darkred;
}

.textHead {
  font-weight: bold;
}

.confirm-button {
  background-color: #46ddd9;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
}

.confirm-button:hover {
  background-color: #304456;
}

.view-button {
  background-color: #46ddd9;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
}

.view-button:hover {
  background-color: #304456;
}
</style>
