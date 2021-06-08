<template>
    <main>
        <div  v-show="failLogin" class='danger'>Неверный логин или пароль</div>
        <div class='loginWrapper'>
            <input type="text" v-model="currentLogin" placeholder="логин">
            <input type="password" v-model='currentPassword' placeholder="пароль">
            <button :disabled="currentLogin == '' && currentPassword == ''" @click="authorization(currentLogin, currentPassword)">Войти</button>
        </div>
    </main>
</template>

<script>

export default {
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

<style scoped>
.danger {
    position: absolute;
    top: 10%;
    background: rgba(199, 87, 87, 0.74);
    color: black;
    width: 500px;
    text-align: center;
}
main {
        height: 700px;
}
main, .loginWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.loginWrapper {
    background: rgb(187, 187, 187);
    border-radius: 10px;
    padding: 10px;
}
input,
button {
    background: white;
    border: black solid 1px;
    margin: 3px;
}
</style>