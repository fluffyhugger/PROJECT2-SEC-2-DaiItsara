<template>
  <div class="delete-popup-overlay">
    <div class="delete-popup">
      <p>Are you sure you want to delete this product?</p>
      <div class="button-container">
        <button class="btn-cancel" @click="cancelDelete">Cancel</button>
        <button class="btn-delete" @click="deleteProduct">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    cancelDelete() {
      this.$emit('cancel')
    },
    deleteProduct() {
      this.$emit('delete')
    }
  }
}
</script>

<style scoped>
.delete-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.178);
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-popup {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.096);
  max-width: 400px;
  text-align: center;
}

.button-container {
  margin-top: 20px;
}

.btn-cancel,
.btn-delete {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel {
  background-color: #ccc;
}

.btn-delete {
  background-color: #ff4d4f;
  color: white;
}
</style>
