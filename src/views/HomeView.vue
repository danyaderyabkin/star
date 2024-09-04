<script setup lang="ts">
import TheNav from "@/components/TheNav/index.vue"
import SelectCurrency from "@/components/SelectCurrency/index.vue"
import {numberFormat} from "@/helpers/numberFormat";
import {useCurrency} from "@/composables/currency";
import {computed, onMounted, onUnmounted, ref} from "vue";
const {fetchCurrency, currencies} = useCurrency();
fetchCurrency();

const currentCurrency  = ref( {name: 'RUB', id: 1});
const timer = ref( null);
const currencyDefaultArray = ref([{name: 'RUB', id: 1}, {name: 'USD', id: 2}, {name: 'EUR', id: 3}])


const currencyRatesArray = computed(() => {
  return Object.entries(currencies.value).map(([key, value]) => ({
    key,
    value,
  }));
});

const currentCurrencyCostUsd = computed(() => {
  if (currentCurrency.value.id === 1) {
    return currencyRatesArray.value.find(el => el.key === 'usd-rub')
  } else if(currentCurrency.value.id === 2) {
    return {key: '', value: 1}
  } else {
    return currencyRatesArray.value.find(el => el.key === 'usd-eur')
  }
})

const currentCurrencyCostEur = computed(() => {
  if (currentCurrency.value.id === 1) {
    return currencyRatesArray.value.find(el => el.key === 'eur-rub')
  } else if(currentCurrency.value.id === 2) {
    return currencyRatesArray.value.find(el => el.key === 'eur-usd')
  } else {
    return {key: '', value: 1}
  }
})

const updateCurrency = (cur: number) => {
  currentCurrency.value = currencyDefaultArray.value.find(el => el.id === cur)
}

onMounted(() => timer.value = setInterval(() => fetchCurrency(), 3000));
onUnmounted(() => clearInterval(timer.value))
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <TheNav/>
      <SelectCurrency :currency-default-array="currencyDefaultArray" @update-currency="updateCurrency"/>
    </div>
  </header>
  <main>
    <div class="container">
      <h1>Текущие курсы валют</h1>
      <h2>1 USD - {{ numberFormat(currentCurrencyCostUsd?.value,'ru-RU', currentCurrency.name) }}</h2>
      <h2>1 EUR - {{ numberFormat(currentCurrencyCostEur?.value,'ru-RU', currentCurrency.name) }}</h2>
    </div>
  </main>
  <footer class="footer">
    <div class="container footer__container">
      <a href="https://starpets.gg/" target="_blank" title="starpets.gg">STARPETS.GG</a>
      <TheNav/>
    </div>
  </footer>
</template>
