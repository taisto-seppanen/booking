<template>
    <div>
        <input type="text" v-model="login" placeholder="логин">
        <input type="password" v-model='password' placeholder="пароль">
        <button :disabled="login == '' && password == ''" @click="authorization(login, passoword)">Войти</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
        adminLogin: 'admin',
        adminPassword: 'admin',
        }
    },
    methods: {
        authorization(login, passoword) {
            if (login === adminLogin && passoword === adminPassword) {
                this.$router.push('./adminPanel');
                
            }
        }
    },
}
</script>