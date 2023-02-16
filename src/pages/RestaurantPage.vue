<script>
import axios from 'axios';
import { store } from '../store';
export default {
  name: 'RestaurantPage',
  data() {
    return {
      restaurant: {},
      products: [],
      store,
      showModal: false,
      productSelected : null
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
  mounted() {
    

  },
  methods: {
    addToShoppingCart(product) {
      // this.store.shoppingCart.push(product); 
      // console.log(this.$refs.modal);
      // const newModal = new this.bootstrap.Modal(document.getElementById('myModal'));
      
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
    },
    productControl(product) {
      const isProductPresent = this.store.shoppingCart.some(el => el.user_id === product.user_id)
      if(isProductPresent || this.store.shoppingCart.length === 0) {
        this.addToShoppingCart(product);
        this.showModal = false;
      } else if (!isProductPresent) {
        this.productSelected = product;
        this.showModal = true;
      } 
    },
    replaceProducts() {
      this.store.shoppingCart = [];
      this.addToShoppingCart(this.productSelected);
      this.showModal = false;
    },
    closeModal () {
      this.showModal = false;
      this.productSelected = null;
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
                <button @click="productControl(product)"  class="btn btn-primary">Aggiungi al carrello</button>
              </div>
            </div>
        </div>
      </div>
    <!-- MODAL -->
      <div :class="{ 'd-none' : !showModal, 'd-block' : showModal }" id="customModal">
        <p class="text-secondary">Puoi acquistare solo da un ristorante alla volta, aggiungendo questo prodotto verranno sostituiti i prodotti precedenti, vuoi procedere?</p>
        <button @click="replaceProducts()" class="btn btn-primary">Procedi</button>
        <button @click="closeModal()" class="btn btn-secondary ms-2">Annulla</button>
      </div>
  </div>





</template>

<style lang="scss">
@use "../style/general.scss" as *; 

.container {
  position: relative;

  #customModal {
    padding: 2rem;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
  }
}
</style>