<script>
    
    

    export default {
        name: 'Payment',
        props: {
            authorization: {
                required: true,
                type: String
            }
        },
        methods: {
            onSuccess (payload) {
            let nonce = payload.nonce;
            // Do something great with the nonce...
        },
            onError (error) {
            let message = error.message;
            // Whoops, an error has occured while trying to get the nonce
        }
  }

    }
</script>

<template>
    <div>
        <v-braintree 
    authorization="xxxxxxxxxxxxxxxxxxxxxx"
    @success="onSuccess"
    @error="onError"
    ></v-braintree>
    </div>
</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;

</style>