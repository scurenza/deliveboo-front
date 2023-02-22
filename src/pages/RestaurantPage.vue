<script>
import AppFooter from '../components/AppFooter.vue'
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
  components: {
AppFooter,
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
  <div id="my-container">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FCA311" fill-opacity="1" d="M0,256L48,218.7C96,181,192,107,288,106.7C384,107,480,181,576,202.7C672,224,768,192,864,149.3C960,107,1056,53,1152,48C1248,43,1344,85,1392,106.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
  </div>
    
    <div class="container">
      
        <h1 class="my-title my-4 text-center">
          <span class="my-title-span">{{ restaurant.name }}</span></h1>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 gy-3">
          <div v-for="product in products" class="col">
              <div class="card" >
                <div class="img-container">
                  <img v-if="product.img" :src="` http://127.0.0.1:8000/storage/${product.img} `" class="card-img-top" alt="...">
                  <img v-else src="../img/no-img.webp" class="card-img-top" alt="">
                </div>
                <div class="card-body d-flex flex-column justify-content-end">
                  <h5 class="card-title">{{product.name}}</h5>
                  <p class="card-text text-secondary">Ingredienti: {{ product.description }}</p>
                  <p class="card-text">Prezzo: {{ product.price }}€</p>
                  <button @click="productControl(product)"  class="btn my-btn">Aggiungi al carrello</button>
                </div>
              </div>
          </div>
        </div>
        <!-- MODAL -->
      <div :class="{ 'd-none' : !showModal, 'd-block' : showModal }" id="rest-modal-container">
        <div id="customModal">
          <p class="text-secondary">Puoi acquistare solo da un ristorante alla volta, aggiungendo questo prodotto verranno sostituiti i prodotti precedenti, vuoi procedere?</p>
          <button @click="replaceProducts()" class="btn btn-primary">Procedi</button>
          <button @click="closeModal()" class="btn btn-secondary ms-2">Annulla</button>
        </div>
      </div>
      </div>
  





</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *; 
@use "../style/partials/variables" as *;

.container {
  position: relative;
  margin-top: 125px;
  #customModal {
    padding: 2rem;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    z-index: 999;
  }
}

#my-container {
  
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  height: 20vh;
  
}

.card-title{
  color: $main-bg;
}

.card {
  height: 100%;
 .text-secondary{
  font-size: .8rem;
  }
}

.img-container {
  width: 100%;
  height: 200px;
}

.card-img-top {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.btn {
  z-index: 6;
}

.my-title {
  margin: 1rem 0;
  padding: 2rem 0;
  color: $main-bg;
  z-index: 2;
  position: relative;
  
  &-span {
    padding: 1rem 2rem ;
    background-color: $secondary-color;
    border-radius: 40px;
  }
}
.my-page-wrapper {
  position: relative;
}

#rest-modal-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

</style>