<script setup lang="ts">
import {ref} from "vue";
defineProps({
  currencyDefaultArray: {
    type: Array
  }
});
const currencyDefault = ref(1)
</script>

<template>
  <select v-model="currencyDefault" @change="$emit('updateCurrency', currencyDefault)">
    <option v-for="currency in currencyDefaultArray" :value="currency.id">{{ currency.name }}</option>
  </select>
</template>

<style scoped>

</style>