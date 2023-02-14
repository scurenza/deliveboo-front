import { reactive } from "vue";

export const store = reactive({ 
    shoppingCart: JSON.parse(localStorage.getItem('carrello')) || [] 
}) 