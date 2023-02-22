<script>
export default {
    name: "AppFooter",
    data() {
        return {
                    About: ["Investitori", "Chi siamo", "Ristoranti", "Altro", "Pressroom", "Diventa partner", "Programmazione"],
                    Legal: ["Termini & Condizioni", "Informativa sulla Privacy"],
                    Help: ["Contatti", "FAQ", "Tipi di cucina",],
        }
    }
}
</script>

<template>
    <footer>
            <div class="container">
                    <div class="list-contents row"> 
                        <div class="col-6 col-sm-3">                
                            <h2>Scopri Deliveboo</h2>
                            <ul>
                                <li v-for="(item) in About"><a href="">{{item}}</a></li>
                            </ul>
                        </div>
                        <div class="col-6 col-sm-3">
                            <h2>Note Legali</h2>
                            <ul>
                                <li v-for="(item) in Legal"><a href="">{{item}}</a></li>
                            </ul>
                        </div>
                        <div class="col-6 col-sm-3"> 
                            <h2>Aiuto</h2>
                            <ul>
                                <li v-for="(item) in Help"><a href="">{{item}}</a></li>
                            </ul>
                        </div>
                        <div class="social col-6 col-sm-3 ">
                            <h2>Social</h2>
                            <div class="group">
                                <a href=""><i class="fa-brands fa-facebook"></i></a>
                                <a href=""><i class="fa-brands fa-twitter"></i></a>
                                <a href=""><i class="fa-brands fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
    </footer>    
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
    footer {
        background-color: $secondary-color;
        color: white;
        h2 {
            font-size: 1.4rem;
            color: $main-bg;
        }
        li {
            font-size: .8rem;
        }
    }
    ul {
        padding:0;
    }
    .list-contents {
        padding: 2rem 0;
        li {
            list-style-type: none;
           
        }
        a {
                color:inherit;
                text-decoration: none;
                &:hover {
                    color: $main-bg
                }
            }
    }
    .social a {
        font-size: 1rem;
        margin:5px
    }

</style>