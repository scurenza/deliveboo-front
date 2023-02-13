<script>
export default{
    name: 'AppHeader',
    data(){
        return{

        }
    }
}
</script>

<template>
    <nav class="navbar bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <h4>Deliveboo</h4>
            </a>
            <div id="navbarNav">
                <ul class="navbar-nav d-flex flex-row">
                    <li class="nav-item ms-3">
                        <a class="nav-link active" aria-current="page" href="http://127.0.0.1:8000/">Accedi</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;

</style>