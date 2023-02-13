<script>
import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      restaurants: []
    }
  },
  created() {
    this.getRestaurants();
  },
  methods: {
    getRestaurants() {
      axios.get('http://127.0.0.1:8000/api/userslist').then(resp => {
        this.restaurants = resp.data.results;
        console.log(this.restaurants);
      })
    }

  }
};

</script>

<template>
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
@use "./style/general.scss" as *; 
</style>