<script>
import { store } from '../store';
export default{
    name: 'AppHeader',
    data(){
        return{
            store
        }
    },
    computed:{
        numberCart(){
            let result = 0;
            this.store.shoppingCart.forEach(element => {
                result += element.quantity;
            });
            return result;
        }
    }
}
</script>

<template>
    <nav class="navbar px-2">
        <div class="container">

            <a class="navbar-brand text-white brand" href="/">
                <div id="logo" class="d-flex text-center">
                    <img src="../img/3.png" alt="">
                    <h4>eliveboo</h4>
                </div>               
            </a>
            <div id="navbarNav">
                <ul class="navbar-nav d-flex flex-row">
                    <li class="nav-item ms-3 d-flex align-items-center">

                        <span id="no-pointer" class="text-white me-2">Sei un ristoratore?</span>
                        <a class="nav-link text-white" aria-current="page" href="http://127.0.0.1:8000/">Accedi</a>
                    </li>
                    <li class="nav-item ms-3">
                        <!-- <div class="span bg-primary rounded text-white">{{ numberCart }}</div>
                        <router-link class="nav-link" aria-current="page" :to="{ name: 'Checkout' }">Carrello</router-link> -->

                        
                            <router-link  class="nav-link" aria-current="page" :to="{ name: 'Checkout' }">
                                <button type="button" class="btn position-relative px-3" style="height: 40px;">

                                    <i class="fa-solid fa-cart-shopping text-light position-absolute top-50 start-50 translate-middle"></i>
                                    <span id="push" v-if="numberCart > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> 
                                    {{ numberCart }}
                                    <!-- <span class="visually-hidden">unread messages</span> -->
                                    </span>
                                </button>

                            </router-link>  
                        

                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;
@use "../style/partials/variables" as *;

.navbar{
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;

    z-index: 8;
    background-color: $main-bg;

    color: $text-primary;
    
}
img {
        width:35px;
        height: 35px;
    }
.btn {
    background-color: $main-bg;

    &:hover {
        background-color: $secondary-color;
    }
}

.brand:hover {
    transform: scale(1.1);
    transition: 400ms;
}

#no-pointer {
    cursor: default;
}

#push {
    font-size: .6rem;
}
// MEDIA QUERY
@media screen and (max-width: 600px)  {
    #no-pointer {
        display:none
    }
}
</style>