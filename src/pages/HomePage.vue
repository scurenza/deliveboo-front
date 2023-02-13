<script>
import axios from 'axios';
import AppHero from '../components/AppHero.vue';

export default {
  name: 'HomePage',
  data() {
    return {
      restaurants: [],
      types: []
    }
  },
  components:{
    AppHero
  },
  created() {
    this.getData();

  },
  methods: {
    getData() {
      Promise.all([
        axios.get('http://127.0.0.1:8000/api/userslist'),
        axios.get('http://127.0.0.1:8000/api/types')
      ]).then(resp=>{
        this.restaurants = resp[0].data.results;
        this.types = resp[1].data.results;
      })
    }
  }
};

</script>

<template>

  <AppHero/>

  <!-- types -->
  <div class="container">
    <ul class="list-group list-group-horizontal">
      <li class="list-group-item" v-for="singletype in types" :key="singletype.id">
        <router-link :to="{ name:'singlePage', params:{name:singletype.name} }" class="btn">{{ singletype.name }}</router-link>
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
  </div>

</template>

<style lang="scss">
@use "../style/general.scss" as *; 
</style>