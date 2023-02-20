<script>
import axios from 'axios';
import AppHeader from './components/AppHeader.vue';
import AppHero from './components/AppHero.vue';

export default {
  name: 'App',
  data() {
    return {
      restaurants: [],
      types: []
    }
  },
  components:{
    AppHeader,
    AppHero
  },
};

</script>

<template>
  <!-- header -->
  <AppHeader/>
  
  <!-- hero -->
  <!-- <AppHero/> -->

  <router-view></router-view>


</template>

<style lang="scss">
@use "./style/general.scss" as *; 
</style>