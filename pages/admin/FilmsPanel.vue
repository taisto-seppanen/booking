<template>
    <b-container>
        <div class="alert alert-warning" role="alert">Этот раздел в разработке</div>
    </b-container>
</template>

<script>
export default {
    layout: "admin",

    beforeMount() {
        if (localStorage.authorization == "true") {            
        } else {
        console.log(localStorage.authorization == "true")
        this.$router.push('../login/');
        }
    }
}
</script>