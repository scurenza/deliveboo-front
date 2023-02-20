<script>
export default{
    name: 'AppHero',
    data(){
        return{

        }
    }
}
</script>

<template>
   <div class="container-fluid ms_hero">
        <!-- <img src="../img/jumbo.jpg" alt=""> -->
   </div>
</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;
.ms_hero{
    height: 40vh;
    width: 100%;
    margin-top: 60px;
    // background-color: rgb(56, 56, 56);
    background-image: url(../img/jumbo.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    

    // img{
    //     object-fit: contain;
    //     object-position: center;
    //     max-width: 100%;
        
    // }
}
</style>