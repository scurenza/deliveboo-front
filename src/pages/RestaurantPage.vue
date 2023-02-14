<script>
import axios from 'axios';
import { store } from '../store';

export default {
  name: 'RestaurantPage',
  data() {
    return {
      restaurant: {},
      products: [],
      store 
    }
  },
  created(){
    axios.get(`http://127.0.0.1:8000/api/user/${this.$route.params.id}`).then(resp=>{
        // if(!resp.data.success){
        //     this.$router.push({name: 'notFound' })
        //     console.log('non ci sono risultati');
        // }
          
        this.restaurant = resp.data.results;
        this.products = resp.data.results.products;
        console.log(this.restaurant);
    })

    console.log(this.$route.params);
  },
  methods: {
    addToShoppingCart(product) {
      // this.store.shoppingCart.push(product); 
      const { created_at, updated_at, description, ...rest } = product;
      console.log(rest);

      const matchedProduct = this.store.shoppingCart.find(el => el.id === rest.id);

      if(!matchedProduct) {
        this.store.shoppingCart.push({...rest, quantity: 1});
      } else {
        this.store.shoppingCart = this.store.shoppingCart.map(item=> {
          if(item.id === rest.id) {
            return {
              ...item, quantity: item.quantity + 1
            }
          }
          return item
        })
      }
      localStorage.setItem('carrello', JSON.stringify(this.store.shoppingCart));
    }
  }
  
};

</script>

<template>

  <!-- types -->
  <!-- <div class="container">
    <ul class="list-group list-group-horizontal">
      <li class="list-group-item" v-for="singletype in types" :key="singletype.id">
        <a class="btn" href="#">{{ singletype.name }}</a>
      </li>
    </ul>
  </div>

  <div>
    <ul v-for="restaurant in restaurants" :key="restaurant.id">
      <li>{{ restaurant.name }}
        <ul>
          <li v-for="product in restaurant.products">{{ product.name }}</li>
        </ul>
      </li>
    </ul>
  </div> -->

  <div class="container">
    <h1 class="text-center">Nome ristorante: {{ restaurant.name }}</h1>
    <h2 class="text-center">P. IVA: {{ restaurant.VAT }}</h2>
    <div class="row row-cols-3">
      <div v-for="product in products" class="col">
          <div class="card" >
            <img :src="` http://127.0.0.1:8000/storage/${product.img} `" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{product.name}}</h5>
              <p class="card-text text-secondary">Ingredienti: {{ product.description }}</p>
              <p class="card-text">Prezzo: {{ product.price }}€</p>
              <button @click="addToShoppingCart(product)"  class="btn btn-primary">Aggiungi al carrello</button>
            </div>
          </div>
      </div>
    </div>
  </div>



</template>

<style lang="scss">
@use "../style/general.scss" as *; 
</style>