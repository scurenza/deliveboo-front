<script>
import axios from 'axios';
import AppHero from '../components/AppHero.vue';

export default {
  name: 'HomePage',
  data() {
    return {
      restaurants: [],
      types: [],
      urlApi: 'api/filtercategories'
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
    
      axios.get(urlUpdate).then(resp =>{
        console.log(resp.data.results);
        this.restaurants = resp.data.results;
      })


    },
    
  }
};

</script>

<template>

  <AppHero/>

  <!-- types -->
  <div class="container">
    <ul class="list-group list-group-horizontal">
      <li @click="HandleCategoryClick(singletype.name, singletype.id)" :class="singletype.active ? 'bg-primary' : ''" class="list-group-item my-4" v-for="singletype in types" :key="singletype.id">
        {{ singletype.name }}
      </li>
    </ul>
  </div>

  <div class="container">
    <div class="row row-cols-3">
      <div class="col" v-for="restaurant in restaurants">
        <div class="card" >
          <img :src="` http://127.0.0.1:8000/storage/${restaurant.img} `" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <p class="card-text">Tipologie:
              <span v-for="singleType in restaurant.types">
                {{ singleType.name }}
              </span>
            </p>
            <router-link :to="{ name: 'SinglePage', params: { id: restaurant.id } }" class="btn btn-primary">Vai al ristorante</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss">
@use "../style/general.scss" as *; 

li{
  cursor: pointer;
}
</style>