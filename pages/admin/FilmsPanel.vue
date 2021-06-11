<template>
    <b-container>
        <div class="alert alert-info" role="alert">Этот раздел в разработке</div>
    </b-container>
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