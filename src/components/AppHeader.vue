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
                <h4>Deliveboo</h4>
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

                        <button type="button" class="btn position-relative px-3" style="height: 40px;">
                            <router-link  class="nav-link" aria-current="page" :to="{ name: 'Checkout' }">
                                <i class="fa-solid fa-cart-shopping text-light position-absolute top-50 start-50 translate-middle"></i>
                            </router-link> 

                            <span id="push" v-if="numberCart > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> 
                                {{ numberCart }}
                                <!-- <span class="visually-hidden">unread messages</span> -->
                            </span> 
                        </button>

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

</style>