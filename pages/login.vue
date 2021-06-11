<template>
    <b-container class="d-flex justify-content-center">
        <b-form @submit.stop.prevent='authorization(currentLogin, currentPassword)' style="width: 18rem;">
            <b-form-group class="m-3"
            label="Login"
            label-for="input-1">
                <b-form-input id="input-1" type="text" v-model="currentLogin"
                placeholder="admin" required></b-form-input>
            </b-form-group>

        <b-form-group class="m-3"
            label="Password"
            label-for="input-1">
                <b-form-input id="input-1" type="password" v-model="currentPassword"
                placeholder="*****" required></b-form-input>
        </b-form-group>

        <b-form-group class="m-3">
            <b-button type="submit" variant="primary">Войти</b-button>
        </b-form-group>

            <b-alert variant="danger" fade :show="failLogin" >
            <strong>Неверный логин/пароль!</strong>

              <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="failLogin=false">
                <span aria-hidden="true">&times;</span>
            </button>
            </b-alert>
        </b-form>
    </b-container>
</template>

<script>

export default {
    layout: "empty",

    data() {
        return {
        currentLogin: "",
        currentPassword: "",
        adminLogin: 'admin',
        adminPassword: 'admin',
        isAuthorization: false,
        failLogin: false,
        }
    },
    methods: {
        authorization(login, passoword) {
            this.failLogin = false;
            if (this.currentLogin === this.adminLogin && this.currentPassword === this.adminPassword) {
                this.$router.push('../admin/');
                this.isAuthorization = true
                localStorage.setItem("authorization", JSON.stringify(this.isAuthorization));
            } else {
                  this.failLogin = true;
            }
        }
    },
}
</script>
