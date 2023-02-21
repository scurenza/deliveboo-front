<script>
import moment from 'moment';
import axios from 'axios';
import dropin from "braintree-web-drop-in"
import validator from 'validator';
import { store } from '../store';
import AppFooter from '../components/AppFooter.vue';
export default {
    name: 'Checkout',
    data() {
        return {
            store,
            loading: true,
            name: '',
            last_name: '',
            email: '',
            phone_number: '',
            address: '',
            show: false,
            braintreeInstance: null,
            errorEmail: false,
            errorMessage: '',
            paymentErrorMessage: ''
        }
    },
    components: {
        AppFooter
    },
    computed: {
        getTotal() {
            const total = this.store.shoppingCart.reduce((tot, current) => {
                return tot + current.price*current.quantity;

            }, 0)
            return total.toFixed(2);
        }
    },
    mounted() {
        dropin.create({
            // insert your tokenization key or client token here
            // sandbox_4xbcfnmh_2ns4kxhfxbspps9p
            // sandbox_w3tpbxkw_86mh2yt4nm4gzz7f
            authorization: "sandbox_4xbcfnmh_2ns4kxhfxbspps9p", 
            container: '#braintree-drop-in-div',
        } 
        ).then((instance) => {
            console.log('siamo entrati qui');
            console.log(instance);
            this.braintreeInstance = instance;
        })
        .catch(error => {
            console.log(error);
            console.log('siamo nell errore');
        })
    },
    created () {
        // axios.get('http://127.0.0.1:8000/api/orders/generate').then(resp => console.log(resp));
        axios.get('http://127.0.0.1:8000/api/orders/generate').then(resp => {
            console.log(resp);
            console.log(resp.status);
        })
    },
    methods: {
        checkout() {
            if (this.name !== '' && this.last_name !== '' && this.email !== '' && this.phone_number !== '' && this.address !== '') {
                this.show = true;   
                this.errorMessage = '';
            } else {
                this.errorMessage = 'Compila tutti i campi per procedere al checkout'
            }
              

        },

        incrementQuantity(id){
            this.store.shoppingCart = this.store.shoppingCart.map(el=> {
                if (el.id === id) {
                    return { ...el, quantity: el.quantity+1 }
                }
                return el; 
            })
            localStorage.setItem("carrello",JSON.stringify(this.store.shoppingCart));
        },

        decrementQuantity(id){
            this.store.shoppingCart = this.store.shoppingCart.reduce((tot,current) => {
                if(current.id === id){
                    if (current.quantity > 1) {
                        tot.push({...current,quantity: current.quantity-1})
                    }
                } else {
                    tot.push(current)
                }
                return tot;
            },[])
            localStorage.setItem("carrello",JSON.stringify(this.store.shoppingCart));
        },

        deleteProductFromCart(id){
            this.store.shoppingCart = this.store.shoppingCart.filter((el) => el.id !== id);
            localStorage.setItem("carrello",JSON.stringify(this.store.shoppingCart));
            console.log(this.store.shoppingCart);
        },

        checkBraintree() {

            console.log('bottone checkout');
            if (this.braintreeInstance) {
                    this.braintreeInstance.requestPaymentMethod()
                        .then(payload =>{
                            this.paymentErrorMessage = '';
                                const paymentMethodNonce = payload.nonce;
                                // console.log("payment method nonce", payload.nonce);
                                axios.post('http://127.0.0.1:8000/api/orders/make/payment', {nonce: paymentMethodNonce, amount: this.getTotal})
                                .then(resp => {
                                        console.log('siamo allinterno di questa chiamata')
                                    if(resp.data.success) {
                                        
                                            console.log('risposta ha avuto successo');
                                        const bodyPost = this.store.shoppingCart.map(el => {
                                        const {available, img, ...rest} = el;
                                        return rest;
                                    })
                                    console.log({bodyPost});
                                    let date = moment().format('YYYY-MM-DD HH-mm-ss')
                                    const bodyRequest = {
                                        name: this.name,
                                        last_name: this.last_name,
                                        email: this.email,
                                        phone_number: this.phone_number,
                                        address: this.address,
                                        amount: this.getTotal,
                                        success: true,
                                        date: date,
                                        products: bodyPost
                                    }
                                        console.log(bodyRequest);
                                        axios.post('http://127.0.0.1:8000/api/order/', bodyRequest).then(resp => {
                                        console.log(resp.data.success);
                                        this.show = false;
                                        
                                        this.store.shoppingCart = [];
                                        localStorage.setItem('carrello', JSON.stringify([]));
                                        this.name = '';
                                        this.last_name = '';
                                        this.email = '';
                                        this.phone_number = '';
                                        this.address = '';
                                        })
                                    }
                                })
                                
                            })
                                // console.log({nonce: paymentMethodNonce, amount: this.getTotal});

                                .catch(error => {
                                
                                this.paymentErrorMessage = 'Attenzione! I dati inseriti non sono corretti. Ricontrolla e riprova.';
                            })
                            
                                
            }
        },
        checkInput(word){
            // console.log(validator.isAlpha(word));
                return validator.isAlpha(word);
        },
        checkMail(mail){
            this.errorEmail = !validator.isEmail(mail);
            // console.log(validator.isEmail(mail));
            // return validator.isEmail(mail);
        },
        checkNumber(number){
            // const prova = 10;
            // console.log(prova.toString());
            // console.log(number);
            const numberString = number.toString();
            return validator.isLength(numberString, {max:13});
        }
        
    }
}
</script>


<template>
    <div class="overflow-auto" style="height: 100vh;" >
    <div class="container mt-4">


        <h1>Carrello</h1>
        <div v-if="store.shoppingCart.length === 0" class="container emptyCart">
            <h1 class="text-center">
                Il tuo Carrello è vuoto
            </h1>
        </div>
        <table class="table table-borderless" v-else>
        <thead>
        <tr>
            <th scope="col">Immagine</th>
            <th scope="col">Nome</th>
            <th scope="col">Prezzo</th>
            <th scope="col">Quantità</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>

        <tr class="border-bottom" v-for="product in store.shoppingCart">

        <td scope="row">
            <img :src="` http://127.0.0.1:8000/storage/${product.img} `" alt="">
        </td>
        <!-- class=" d-flex align-items-center justify-content-between" -->
        <td class="td-ms-price"><span class="ms-price">{{ product.name }}</span></td>
        <td class="td-ms-price"><span class="ms-price">{{ product.price }} €</span></td>
        <td class="td-ms-price"><span class="ms-price">{{ product.quantity }}</span></td>
        <td class="td-ms-price">
            <div class="ms-price d-flex align-items-center justify-content-between">
                <div class="d-flex">
        
                    <button @click="incrementQuantity(product.id)" class="btn my-btn  ms-4 me-2">+</button>
                    <button @click="decrementQuantity(product.id)" class="btn my-btn ">-</button>
                </div>
                <!-- <button id="delete-button" @click="deleteProductFromCart(product.id)" class="btn btn-danger">Elimina</button> -->
        
                <!-- Animazione bottone elimina nel carrello -->
                <div>
                    <button id="delete-button" class="noselect" @click="deleteProductFromCart(product.id)"><span class="text">Elimina</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                    <!-- Animazione bottone elimina nel carrello -->
                </div>
            </div>
        </td>     
                

        </tr>
        <tr>
            <td colspan="4"></td>
            <td class="text-end mt-2" ><h4> Totale: {{ getTotal }} € </h4></td>
        </tr>
        </tbody>
        </table>

        <!-- form -->
        <div v-if="store.shoppingCart.length>0" class="container">
        <form>
            <div class="mb-3">
                <label for="name" class="form-label">Nome*</label>
                <input type="text" @keyup="checkInput(name)" :class="name.length>0 && !checkInput(name) ? 'is-invalid' : ''" class="form-control" id="name" required v-model="name">
                <div v-if="name.length>0 && !checkInput(name)" class="invalid-feedback">
                    <span>E' possibile inserire solamente lettere</span>
                </div>

            </div>
            <div class="mb-3">  
                <label for="last_name" class="form-label">Cognome*</label>
                <input type="text" @keyup="checkInput(last_name)" :class="last_name.length>0 && !checkInput(last_name) ? 'is-invalid' : ''" class="form-control" id="last_name" required v-model="last_name">
                <div v-if="last_name.length>0 && !checkInput(last_name)" class="invalid-feedback">
                    <span>E' possibile inserire solamente lettere</span>
                </div>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email*</label>
                <input type="email" @blur="checkMail(email)" :class="email.length>0 && errorEmail ? 'is-invalid' : ''" class="form-control" id="email" required v-model="email">
                <div v-if="email.length>0 && errorEmail" class="invalid-feedback">
                    <span>Inserisci una email valida</span>
                </div>
            </div>
            <div class="mb-3">
                <label for="phone_number" class="form-label">Numero*</label>
                <input type="number" @keyup="checkNumber(phone_number)" :class="phone_number.toString().length>0 && !checkNumber(phone_number) ? 'is-invalid' : ''" class="form-control" id="phone_number" required v-model="phone_number">
                <div v-if="phone_number.toString().length>0 && !checkNumber(phone_number)" class="invalid-feedback">
                    <span>Inserisci un numero di telefono valido</span>
                </div>
            </div>
            <div class="mb-3">
                <label for="address" class="form-label">Address*</label>
                <input type="text" class="form-control" id="address" required v-model="address">
            </div>
        </form>
        <span class="text-danger" v-if="this.errorMessage !== ''" >{{ errorMessage }}</span>
        <div class="d-flex justify-content-end">
        <button @click="checkout()" :disabled="!loading" class="btn btn-primary mb-4 ms_checkout">Vai al checkout</button>
        </div>
    

        </div>

        </div>

        <div :class="show ? 'd-block' : 'd-none'" class="ms_absolute">

            <div class="modal-container px-2 bg-light">
                <div id="braintree-drop-in-div"></div>

                <div class="d-flex justify-content-center">
                    <button class="btn btn-primary" @click="checkBraintree()">
                        Paga
                    </button>
                </div>
                <div class="text-center text-danger p-2 mt-2" v-if="paymentErrorMessage !== ''" >{{ paymentErrorMessage }}</div>
            </div>
        </div>
    <AppFooter />
    </div>
</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;
img {
width: 150px;
}
.ms_checkout:disabled {
opacity: 0.5;
cursor: not-allowed;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
-webkit-appearance: none;
margin: 0;
}

/* Firefox */
input[type=number] {
-moz-appearance: textfield;
}

.ms_absolute{
position: absolute;
background-color: rgba(0, 0, 0, 0.506);
height: 100%;
width: 100%;

left: 0;
top: 0;

display: flex;
justify-content: center;
align-items: center;
}

// #braintree-drop-in-div{
// width: 70%;

// margin: 3rem auto;
// }

.modal-container{
    width: 50%;
    margin: 3rem auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 700px;
    border-radius: 20px;
    
}

// Bottone elimina nel carrello

#delete-button {
width: 150px;
height: 50px;
cursor: pointer;
display: flex;
align-items: center;
background: red;
border: none;
border-radius: 5px;
box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
background: #e62222;
}

#delete-button, #delete-button span {
transition: 200ms;
}

#delete-button .text {
transform: translateX(35px);
color: white;
font-weight: bold;
}

#delete-button .icon {
position: absolute;
border-left: 1px solid #c41b1b;
transform: translateX(110px);
height: 40px;
width: 40px;
display: flex;
align-items: center;
justify-content: center;
}

#delete-button svg {
width: 15px;
fill: #eee;
}

#delete-button:hover {
background: #ff3636;
}

#delete-button:hover .text {
color: transparent;
}

#delete-button:hover .icon {
width: 150px;
border-left: none;
transform: translateX(0);
}

#delete-button:focus {
outline: none;
}

#delete-button:active .icon svg {
transform: scale(0.8);
}

.my-btn{
height: 38px;
width: 38px;
}

.td-ms-price{
position: relative;
}

.ms-pricee{
position: absolute;
top: 50%;
transform: translate(0, -50%);
}

.emptyCart {
    min-height: 80vh;
}
</style>