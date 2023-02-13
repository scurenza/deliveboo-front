<script>
import axios from 'axios';

export default {
  name: 'CategoryPage',
  data() {
    return {
      restaurantList: [],
    }
  },
  created(){
    axios.get(`http://127.0.0.1:8000/api/types/${this.$route.params.name}`).then(resp=>{
        if(!resp.data.success){
            this.$router.push({name: 'notFound' })
            console.log('non ci sono risultati');
        }


        console.log(resp.data.results);
    })
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

  <h1 v-if="this.$route.params.name" class="text-center">Categoria: {{ this.$route.params.name }}</h1>

</template>

<style lang="scss">
@use "../style/general.scss" as *; 
</style>