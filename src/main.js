import { createApp } from 'vue'
import App from './App.vue'
import { router } from "./router"

// import vueBraintree from 'vue-braintree'
// import Vue from 'vue'

// Vue.use(vueBraintree)




createApp(App).use(router).mount('#app')
