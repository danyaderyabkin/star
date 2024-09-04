import {ref} from "vue";

export const useCurrency = () => {
    const currencies = ref({})
    const fetchCurrency = async () => await fetch(`https://status.neuralgeneration.com/api/currency`)
        .then(res => res.json()).then(data => currencies.value = data)

    return {
        fetchCurrency, currencies
    }
}