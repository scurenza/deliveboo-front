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
   <div class="ms_hero">
        <img src="../img/jumbo.jpg" alt="">
   </div>
</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;
.ms_hero{
    height: 60vh;
    width: 100%;
    margin-top: 55px;
    // background-color: rgb(56, 56, 56);
    // background-image: url(../img/jumbo.jpg);
    // background-repeat: no-repeat;
    // background-size:fill;
    // background-position: center;
    
    

    img{
        object-fit: cover;
        object-position: center;
        height: 100%;
        width: 100%;
        
    }
}
</style>