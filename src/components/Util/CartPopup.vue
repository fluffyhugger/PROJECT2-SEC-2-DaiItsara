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
            <li><span class="item-price">{{ formatPrice(item.price) }}</span></li>
          </li>
        </ul>
        <div class="cart-total">
          <span>Total:</span>
          <span class="total-price">{{ formatPrice(totalPrice) }}</span>
        </div>
        <button @click="closeCart" class="close-button">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

// Define props and emits
const props = defineProps(['cart', 'builderName'])
const emits = defineEmits(['close'])

// Close cart method
const closeCart = () => {
  emits('close')
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
</script>

<style scoped>
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
  padding: 20px;
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
</style>
