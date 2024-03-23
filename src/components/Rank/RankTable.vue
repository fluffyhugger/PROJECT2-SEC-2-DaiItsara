<script setup>
import { defineProps } from 'vue';
const props = defineProps(['selectedOption']);
</script>
 
<template>
<div>
    Another Child Component: {{ selectedOption }}
</div>
</template>
 
<style scoped>

</style>