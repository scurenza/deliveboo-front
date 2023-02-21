<script>
export default {
    name: "AppFooter",
    data() {
        return {
            map: [
                {
                    name: "Scopri Deliveboo",
                    items: ["Investitori", "Chi siamo", "Ristoranti", "Altro", "Pressroom", "Diventa partner", "Programmazione"]
                },
                {
                    name: "Note Legali",
                    items: ["Termini & Condizioni", "Informativa sulla Privacy"]
                },
                {
                    name: "Aiuto",
                    items: ["Contatti", "FAQ", "Tipi di cucina",]
                },
            ],
        }
    }
}
</script>

<template>
    <footer>
            <div class="container">
                    <div class="list-contents">                   
                        <div v-for="(list) in map" class="list">
                            <h2>{{list.name}}</h2>
                            <ul>
                                <li v-for="(items) in list.items"><a href="">{{items}}</a></li>
                            </ul>
                        </div>
                        <div class="social">
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
        }
        li {
            font-size: .8rem;
        }
    }
    ul {
        padding:0;
    }
    .list-contents {
        height: 270px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
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