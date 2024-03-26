<template>
  <div class="cart-popup-overlay">
    <div class="cart-popup">
      <div class="cart-popup-content">
        <h1 class="cart-title">Items in Cart</h1>
        <ul class="cart-list">
          <li v-for="(item, key) in cart" :key="key" class="cart-item">
            <span class="item-key">{{ key }}:</span>
            <span class="item-name">{{ item.name }}</span>
          </li>
        </ul>
        <button @click="closeCart" class="close-button">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['cart'])
const emits = defineEmits(['close'])

const closeCart = () => {
  emits('close')
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
}

.cart-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.cart-item {
  margin-bottom: 5px;
}

.item-key {
  font-weight: bold;
}

.close-button {
  background-color: red;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
}

.close-button:hover {
  background-color: darkred;
}
</style>
