<script>
    import axios from 'axios';
import { store } from '../store';
    export default {
        name: 'Checkout',
        data() {
            return {
                store,
                loading: true
            }
        },
        computed: {
            getTotal() {
                return this.store.shoppingCart.reduce((tot, current) => {
                    return tot + current.price*current.quantity;
                }, 0)
            }
        },
        methods: {
            checkout() {
                const bodyPost = this.store.shoppingCart.map(el => {
                    const {available, img, ...rest} = el;
                    return rest;
                })
                console.log(bodyPost);
                const bodyRequest = {
                    name: "Federico",
                    email: "federico@mail.it",
                    products: bodyPost
                }
                this.loading = false;
                
                    axios.post('http://127.0.0.1:8000/api/order/', bodyRequest).then(resp => {
                        console.log(resp);
                        this.loading = true;
                    })
                
            }
        }
    }
</script>

<template>
    <div class="container">

    
    <h1>Carrello</h1>
    <table class="table">
  <thead>
    <tr>
        <th scope="col">Immagine</th>
        <th scope="col">Nome</th>
        <th scope="col">Prezzo</th>
        <th scope="col">Quantità</th>
    </tr>
  </thead>
  <tbody>
    
    <tr v-for="product in store.shoppingCart">
      <td scope="row">
        <img :src="` http://127.0.0.1:8000/storage/${product.img} `" alt="">
      </td>
      <td>{{ product.name }}</td>
      <td>{{ product.price }} €</td>
      <td>{{ product.quantity }}</td>
    </tr>
    <tr>
        <td colspan="3"></td>
        <td>Totale: {{ getTotal }} €</td>
    </tr>
  </tbody>
</table>
<div class="d-flex justify-content-end">

    <button @click="checkout()" :disabled="!loading" class="btn btn-primary ms_checkout">Vai al checkout</button>
</div>
</div>
</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;
img {
    width: 150px;
}
.ms_checkout:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

</style>