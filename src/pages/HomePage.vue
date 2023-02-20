<script>
import axios from 'axios';
import AppHero from '../components/AppHero.vue';

export default {
  name: 'HomePage',
  data() {
    return {
      restaurants: [],
      types: [],
      urlApi: 'api/filtercategories',
      currentPage: 1,
      lastPage: null,
      totalUsers: null,
      loadingReastaurant: false
      }
  },
  components:{
    AppHero
  },
  created() {
    this.getData(this.currentPage);

  },
  methods: {
    getRestaurants(page) {
      this.loadingReastaurant = true;
      axios.get('http://127.0.0.1:8000/api/userslist', {params: {page: page}})
      .then(resp=>{
        console.log(resp);
        this.loadingReastaurant = false;
        this.currentPage = resp[0].data.results.current_page;
        this.lastPage = resp[0].data.results.last_page;
        this.totalUsers = resp[0].data.results.total;
        this.restaurants = resp[0].data.results.data;

      })
    },
    getData() {
      this.loadingReastaurant = true;
      Promise.all([
        axios.get('http://127.0.0.1:8000/api/userslist'),
        axios.get('http://127.0.0.1:8000/api/types')
      ]).then(resp=>{
        console.log(resp);
        this.loadingReastaurant = false;
        this.currentPage = resp[0].data.results.current_page;
        this.lastPage = resp[0].data.results.last_page;
        this.totalUsers = resp[0].data.results.total;
        this.restaurants = resp[0].data.results.data;
        this.types = resp[1].data.results.map(item => {
          return {
            ...item,active: false
          }
        })
      })
    },
    HandleCategoryClick(name, id) {
      this.types = this.types.map(item => {
        if(item.id === id){
          return {
            ...item,active:!item.active
          }
        }
        return item;
      })

      // let query = '';
      // this.types.forEach(el => {
      //   if(el.active){
      //     query += el.name; 
      //   }
      // });


      let query = [];
      this.types.forEach(el => {
        if(el.active){
          query.push(el.name.toLowerCase()); 
        }
      });

      const queryString = query.join(',')
      console.log(queryString);

      const urlUpdate = queryString.length > 0 ? `http://127.0.0.1:8000/${this.urlApi}?type=${queryString}` : 'http://127.0.0.1:8000/api/userslist';
    
      this.loadingReastaurant = true;

      axios.get(urlUpdate).then(resp =>{
        this.restaurants = resp.data.results;
        console.log(resp.data);
        this.currentPage = resp[0].data.results.current_page;
        this.lastPage = resp[0].data.results.last_page;
        this.totalUsers = resp[0].data.results.total;
        this.loadingReastaurant = false;
      })


    },
    
  }
};

</script>

<template>

  <AppHero/> 

  <!-- types -->
  <div class="container">
    <ul class="list-group list-group-horizontal justify-content-center">
      <li @click="HandleCategoryClick(singletype.name, singletype.id)" :class="singletype.active ? 'bg-primary' : ''" class="list-group-item my-4" v-for="singletype in types" :key="singletype.id">
        {{ singletype.name }}
      </li>
    </ul>
  </div>

  <div class="container">
    <div class="row row-cols-1 row-cols-sm-3">
      <div class="col" v-for="restaurant in restaurants">
        <div class="card" >
          <img :src="` http://127.0.0.1:8000/storage/${restaurant.img} `" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <p class="card-text">Tipologie: <br>
              <span v-for="singleType in restaurant.types">
                {{ singleType.name }} <br>
              </span>
            </p>
            <router-link :to="{ name: 'SinglePage', params: { id: restaurant.id } }" class="btn btn-primary">Vai al ristorante</router-link>
          </div>
        </div>
      </div>
    </div>
    <nav class="navigation d-flex justify-content-end py-3">
      <a :class="currentPage === 1 ? 'disabled' : ''" class="btn btn-success me-3" disabled="loadingReastaurant" @click.prevent="getRestaurants(currentPage - 1)"><i class="fa-solid fa-chevron-left"></i></a>
      <a :class="currentPage === lastPage ? 'disabled' : ''" class="btn btn-success" disabled="loadingReastaurant" @click.prevent="getRestaurants(currentPage + 1)"><i class="fa-solid fa-chevron-right"></i></a>
    </nav>
  </div>

</template>

<style lang="scss">
@use "../style/general.scss" as *; 

li {
  cursor: pointer;
}

li::not(#no-pointer){
  cursor: pointer;
}
</style>