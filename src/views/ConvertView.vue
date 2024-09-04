<script setup lang="ts">
import {numberFormat} from "@/helpers/numberFormat";
import TheNav from "@/components/TheNav/index.vue";
import SelectLeft from "@/components/SelectLeft/index.vue"
import SelectRight from "@/components/SelectRight/index.vue"
import {computed, ref} from "vue";
import {useCurrency} from "@/composables/currency";
const num = ref(100);
const currentCurrencyLeft  = ref( {name: 'USD', id: 2});
const currentCurrencyRight  = ref( {name: 'RUB', id: 1});
const {fetchCurrency, currencies} = useCurrency();
fetchCurrency();

const currencyDefaultArray = ref([{name: 'RUB', id: 1}, {name: 'USD', id: 2}, {name: 'EUR', id: 3}])
const currencyRatesArray = computed(() => {
  return Object.entries(currencies.value).map(([key, value]) => ({
    key,
    value,
  }));
});
const updateCurrencyLeft = (cur: number) => {
  currentCurrencyLeft.value = currencyDefaultArray.value.find(el => el.id === cur)
}
const updateCurrencyRight = (cur: number) => {
  currentCurrencyRight.value = currencyDefaultArray.value.find(el => el.id === cur)
}

const currentCurrencyCost = computed(() => {
  if (currentCurrencyLeft.value.id === currentCurrencyRight.value.id) {
    return {key: '', value: 1}
  } else if(currentCurrencyLeft.value.id === 1 && currentCurrencyRight.value.id === 2) {
    return currencyRatesArray.value.find(el => el.key === 'rub-usd')
  } else if (currentCurrencyLeft.value.id === 1 && currentCurrencyRight.value.id === 3) {
    return currencyRatesArray.value.find(el => el.key === 'rub-eur')
  } else if (currentCurrencyLeft.value.id === 2 && currentCurrencyRight.value.id === 1) {
    return currencyRatesArray.value.find(el => el.key === 'usd-rub')
  } else if (currentCurrencyLeft.value.id === 3 && currentCurrencyRight.value.id === 1) {
    return currencyRatesArray.value.find(el => el.key === 'eur-rub')
  } else if (currentCurrencyLeft.value.id === 2 && currentCurrencyRight.value.id === 3) {
    return currencyRatesArray.value.find(el => el.key === 'usd-eur')
  } else if (currentCurrencyLeft.value.id === 3 && currentCurrencyRight.value.id === 2) {
    return currencyRatesArray.value.find(el => el.key === 'eur-usd')
  }


})
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <TheNav/>
    </div>
  </header>
  <main>
    <div class="container">
      <form class="convert">
        <h3>Выберите валюту и сконвертируйте значение</h3>
        <input v-model.number="num" type="number" placeholder="Введите значение...">
        <div class="convert__wrap">
          <SelectLeft :currency-default-array="currencyDefaultArray" @update-currency="updateCurrencyLeft"/>
          ➜
          <SelectRight :currency-default-array="currencyDefaultArray" @update-currency="updateCurrencyRight"/>
        </div>
        <p class="convert__output">{{ numberFormat((num * currentCurrencyCost?.value),'ru-RU', currentCurrencyRight.name) }}</p>
      </form>
    </div>
  </main>
  <footer class="footer">
    <div class="container footer__container">
      <a href="https://starpets.gg/" target="_blank" title="starpets.gg">STARPETS.GG</a>
      <TheNav/>
    </div>
  </footer>
</template>
