<script>
import axios from 'axios';
import AppHero from '../components/AppHero.vue';
import AppFooter from '../components/AppFooter.vue'

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
    AppHero,
    AppFooter
  },
  created() {
    this.getData(this.currentPage);

  },
  methods: {
    getRestaurants(page) {

      let query = [];
      this.types.forEach(el => {
        if(el.active){
          query.push(el.name.toLowerCase()); 
        }
      });

      const queryString = query.join(',')
      const urlApi = queryString.length > 0 ? `http://127.0.0.1:8000/api/filtercategories?type=${queryString}` : 'http://127.0.0.1:8000/api/userslist'
      console.log({urlApi});
      // this.loadingReastaurant = true;

      axios.get(urlApi, {params: {page: page}})
      .then(resp=>{
        console.log(resp.data);

        this.currentPage = resp.data.results.current_page;
        this.restaurants = resp.data.results.data;
        this.lastPage = resp.data.results.last_page;
        this.totalUsers = resp.data.results.total;

        // this.loadingReastaurant = false;
        // this.currentPage = resp[0].data.results.current_page;
        // this.lastPage = resp[0].data.results.last_page;
        // this.totalUsers = resp[0].data.results.total;
        // this.restaurants = resp[0].data.results.data;

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

      axios.get(urlUpdate, {params: {page: this.currentPage}}).then(resp =>{
        // this.restaurants = resp.data.results;
        // console.log(resp.data);
        // this.currentPage = resp[0].data.results.current_page;
        // this.lastPage = resp[0].data.results.last_page;
        // this.totalUsers = resp[0].data.results.total;
        // this.loadingReastaurant = false;

        console.log(resp.data);


        this.currentPage = resp.data.results.current_page;
        this.restaurants = resp.data.results.data;
        this.lastPage = resp.data.results.last_page;
        this.totalUsers = resp.data.results.total;
      })


    },
    
  }
};

</script>

<template>

  <AppHero/> 

  <!-- types -->
  <div class="bg-types">
    <div class="container">
      <!-- <ul class="list-group justify-content-center">
        <li @click="HandleCategoryClick(singletype.name, singletype.id)" :class="singletype.active ? 'my-bg' : ''" class="my-list-group-item my-4 text-center" v-for="singletype in types" :key="singletype.id">
          {{ singletype.name }}
        </li>
      </ul> -->
      <div class="row row-cols-lg-4 row-cols-sm-2">
        <div class="col d-flex justify-content-center" v-for="singletype in types" :key="singletype.id">
          <div @click="HandleCategoryClick(singletype.name, singletype.id)"  :class="singletype.active ? 'my-bg' : ''" class="my-btn-type my-3 text-center text-light" >
            {{ singletype.name }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container py-3">

    <div v-if="restaurants.length > 0" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 mt-4 gy-5">
      <div class="col" v-for="restaurant in restaurants">

        
        <div class="card">
          <div class="img-container">
            <img v-if="restaurant.img" :src="` http://127.0.0.1:8000/storage/${restaurant.img} `" class="card-img-top" alt="">
            <img v-else src="../img/no-img.webp" class="card-img-top" alt="">
          </div>
          <div class="card-body d-flex flex-column justify-content-end">
            <h5 class="card-title text-center">{{ restaurant.name }}</h5>
            <p class="card-text d-flex justify-content-center ">
              <span class="rounded-pill my-type mx-1" v-for="singleType in restaurant.types">
                {{ singleType.name }} <br>
              </span>
            </p>
            <router-link :to="{ name: 'SinglePage', params: { id: restaurant.id } }" class="btn my-btn">Vai al ristorante</router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h3 class="text-center">Non ci sono ristoranti con queste tipologie</h3>
    </div>
    <nav class="navigation d-flex justify-content-end py-3">
      <a v-if="this.currentPage !== 1"  class="btn my-btn-chevron me-3" disabled="loadingReastaurant" @click.prevent="getRestaurants(currentPage - 1)"><i class="fa-solid fa-chevron-left"></i></a>
      <a v-if="this.lastPage !== null && this.currentPage * 3 < this.totalUsers" class="btn my-btn-chevron" disabled="loadingReastaurant" @click.prevent="getRestaurants(currentPage + 1)"><i class="fa-solid fa-chevron-right"></i></a>
    </nav>
  </div>
  <AppFooter />
</template>

<style lang="scss">
@use "../style/general.scss" as *;
@use "../style/partials/variables" as *; 

li {
  cursor: pointer;
}

li::not(#no-pointer){
  cursor: pointer;
}

.card {
 width: 100%;
 min-height: 320px;
 border-radius: 50px;
 background: #e0e0e0;
 box-shadow: 20px 20px 30px #bebebe,
               -20px -20px 30px #ffffff;
}

.bg-types {
  background-color: $secondary-color;
}

.my-btn-type {
 --color: white;
 font-family: inherit;
 display: inline-block;
 width: 8em;
 height: 2.6em;
 line-height: 2.5em;
 margin: 10px;
 position: relative;
 overflow: hidden;
 border: 2px solid var(--color);
 transition: color .5s;
 z-index: 1;
 font-size: 17px;
 border-radius: 6px;
 font-weight: 500;
 color: var(--color);
 cursor: pointer;
}

.my-btn-type:before {
 content: "";
 position: absolute;
 z-index: -1;
 background: $main-bg;
 height: 150px;
 width: 200px;
 border-radius: 50%;
}

.my-btn-type:hover {
 color: #fff;
}

.my-btn-type:before {
 top: 100%;
 left: 100%;
 transition: all .7s;
}

.my-btn-type:hover:before {
 top: -30px;
 left: -30px;
}

.my-btn-type:active:before {
 background: $main-bg;
 transition: background 0s;
}

.my-bg {
  background: $main-bg;
}

.btn.my-btn {
  background-color: $secondary-color;
  color: white;

  &:hover {
    background-color: #14213de1;
    color: white;
  }
}

.my-type{
  background-color: $main-bg;
  padding:.1rem .3rem;
}

.btn.my-btn-chevron {
  background-color: $main-bg;
  z-index: 5;
}

.btn.my-btn-chevron:hover {
  background-color: rgba(252, 162, 17, 0.679);
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

</style>