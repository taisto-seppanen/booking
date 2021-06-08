<template>
    <div>
        <h1>В разработке</h1>
    </div>
</template>

<script>
export default {
    layout: "admin",

    mounted() {
        if (localStorage.authorization == "true") {            
        } else {
        console.log(localStorage.authorization == "true")
        this.$router.push('../login/');
        }
    }
}
</script>