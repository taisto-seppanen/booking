<template>
    <b-container md="4">
    <b-form @submit.stop.prevent='save'>
        <b-form-group class="m-3" id="input-group-1" label="Адрес:" abel-for="input-1" description="город, улица, дом, индекс">
            <b-form-input id="input-1" type="text" v-model="adress" placeholder="Адрес" required></b-form-input>
        </b-form-group>

        <b-form-group class="m-3" id="input-group-1" label="Телефонный номер:" label-for="input-1" description="в формате 8(8412)757-757">
            <b-form-input id="input-1" type="text" v-model="telephone" placeholder="телефон" required></b-form-input>
        </b-form-group>

        <b-form-group class="m-3" id="input-group-1" label="Ссылка на вк:" label-for="input-1" description="Например https://vk.com/lololo">
            <b-form-input id="input-1" type="text" v-model="vkLink" placeholder="ссылка" required></b-form-input>
        </b-form-group>

        <b-form-group class="m-3" id="input-group-1" label="Ссылка на инстаграм:" label-for="input-1"
            description="Например https://www.instagram.com/lindemannofficial/">
                <b-form-input id="input-1" type="text" v-model='instagramLink' placeholder="ссылка" ></b-form-input>
        </b-form-group>

        <b-form-group class="m-3" id="input-group-1" label="Ссылка на телеграмм:" label-for="input-1" description="Например https://t.me/taisto_seppanen">
            <b-form-input id="input-1" type="text" v-model='telegramLink' placeholder="ссылка" ></b-form-input>
        </b-form-group>     

        <b-button type="submit" variant="primary">Save</b-button>
    </b-form>
    </b-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import { getUserFromCookie, getUserFromSession } from '@/helpers'

export default {
    layout: "admin",
    data() {
        return {
            adress : '',
            telephone : '',
            vkLink : '',
            instagramLink : '',
            telegramLink : '',
        };
    },
    
    asyncData({ req, redirect }) {
        if (process.server) {
            const user = getUserFromCookie(req)
            if (!user) { redirect('/login') }
        } else {
        var user = firebase.auth().currentUser
        if (!user) { redirect('/login') }
        }
    },

    beforeMount() {
        this.get();
    },

    methods: {
        save() {
            firebase.database().ref('contacts/').set({
            adress: this.adress,
            telephone: this.telephone,
            vkLink: this.vkLink,
            instagramLink: this.instagramLink,
            telegramLink: this.telegramLink
            });
        },

        get() {
            firebase.database().ref('contacts/').get().then((snapshot) => { if (snapshot.exists()) {
                    this.adress = snapshot.val().adress;
                    this.telephone = snapshot.val().telephone;
                    this.vkLink = snapshot.val().vkLink;
                    this.instagramLink = snapshot.val().instagramLink;
                    this.telegramLink = snapshot.val().telegramLink;
                } else { console.warn("bad request") }
            })
        },
    },
}
</script>