<script>
    import moment from 'moment';
    import axios from 'axios';
import { store } from '../store';
    export default {
        name: 'Checkout',
        data() {
            return {
                store,
                loading: true,
                name: '',
                last_name: '',
                email: '',
                phone_number: '',
                address: ''
            }
        },
        computed: {
            getTotal() {
                const total = this.store.shoppingCart.reduce((tot, current) => {
                    return tot + current.price*current.quantity;

                }, 0)
                return total.toFixed(2);
            }
        },
        methods: {
            checkout() {
                const bodyPost = this.store.shoppingCart.map(el => {
                    const {available, img, ...rest} = el;
                    return rest;
                })
                console.log(bodyPost);
                // let number = null;
                // if(!Number.parseInt(this.phone_number)){

                // }

                    // const date = new Date();
                let date = moment().format('YYYY-MM-DD')

                const bodyRequest = {
                    name: this.name,
                    last_name: this.last_name,
                    email: this.email,
                    phone_number: this.phone_number,
                    address: this.address,
                    amount: this.getTotal,
                    success: true,
                    date: date,
                    products: bodyPost
                }
                this.loading = false;
                
                    axios.post('http://127.0.0.1:8000/api/order/', bodyRequest).then(resp => {
                        console.log(resp);
                        this.loading = true;
                    })
                console.log(bodyRequest);
                
            },

            incrementQuantity(id){
                this.store.shoppingCart = this.store.shoppingCart.map(el=> {
                    if (el.id === id) {
                        return { ...el, quantity: el.quantity+1 }
                    }
                    return el; 
                })
                localStorage.setItem("carrello",JSON.stringify(this.store.shoppingCart));
            },
            decrementQuantity(id){
                this.store.shoppingCart = this.store.shoppingCart.reduce((tot,current) => {
                    if(current.id === id){
                        if (current.quantity > 1) {
                            tot.push({...current,quantity: current.quantity-1})
                        }
                    } else {
                        tot.push(current)
                    }
                    return tot;
                },[])
                localStorage.setItem("carrello",JSON.stringify(this.store.shoppingCart));
            },
            deleteProductFromCart(id){
                this.store.shoppingCart = this.store.shoppingCart.filter((el) => el.id !== id);
                localStorage.setItem("carrello",JSON.stringify(this.store.shoppingCart));
                console.log(this.store.shoppingCart);
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
      <td class="d-flex align-items-center">{{ product.quantity }} 
        <div class="ms-4">
            <button @click="incrementQuantity(product.id)" class="btn btn-info">+</button>
            <button @click="decrementQuantity(product.id)" class="btn btn-info">-</button>
        </div>
        <button @click="deleteProductFromCart(product.id)" class="btn btn-danger">Elimina</button>
    </td>
    </tr>
    <tr>
        <td colspan="3"></td>
        <td>Totale: {{ getTotal }} €</td>
    </tr>
  </tbody>
</table>

<div class="container">
    <form>
        <div class="mb-3">
            <label for="name" class="form-label">Nome</label>
            <input type="text" class="form-control" id="name" v-model="name">
        </div>
        <div class="mb-3">  
            <label for="last_name" class="form-label">Cognome</label>
            <input type="text" class="form-control" id="last_name" v-model="last_name">
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="email">
        </div>
        <div class="mb-3">
            <label for="phone_number" class="form-label">Numero</label>
            <input type="number" class="form-control" id="phone_number" v-model="phone_number">
        </div>
        <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <input type="text" class="form-control" id="address" v-model="address">
        </div>
    </form>

</div>


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
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
</style>