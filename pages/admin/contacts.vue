<template>
    <b-container md="4">
    <b-form @submit.stop.prevent='save'>
        <b-form-group class="m-3"
            id="input-group-1"
            label="Адрес:"
            label-for="input-1"
            description="город, улица, дом, индекс">
                <b-form-input id="input-1" type="text" v-model="contacts.adress"
                placeholder="Адрес" required></b-form-input>
        </b-form-group>

        <b-form-group class="m-3"
            id="input-group-1"
            label="Телефонный номер:"
            label-for="input-1"
            description="в формате 8(8412)757-757">
                <b-form-input id="input-1" type="text" v-model="contacts.telephone"
                placeholder="телефон" required></b-form-input>
        </b-form-group>

        <b-form-group class="m-3"
            id="input-group-1"
            label="Ссылка на вк:"
            label-for="input-1"
            description="Например https://vk.com/lololo">
                <b-form-input id="input-1" type="text" v-model="contacts.vkLink"
                placeholder="ссылка" required></b-form-input>
        </b-form-group>

        <b-form-group class="m-3"
            id="input-group-1"
            label="Ссылка на инстаграм:"
            label-for="input-1"
            description="Например https://www.instagram.com/lindemannofficial/">
                <b-form-input id="input-1" type="text" v-model='contacts.instagramLink'
                placeholder="ссылка" ></b-form-input>
        </b-form-group>

        <b-form-group class="m-3"
            id="input-group-1"
            label="Ссылка на телеграмм:"
            label-for="input-1"
            description="Например https://t.me/taisto_seppanen">
                <b-form-input id="input-1" type="text" v-model='contacts.telegramLink'
                placeholder="ссылка" ></b-form-input>
        </b-form-group>     

        <b-button type="submit" variant="primary">Save</b-button>

    </b-form>
    </b-container>
</template>

<script>
export default {
    layout: "admin",

    data() {
        return {
            contacts: {},
        };
    },

    beforeMount() {
        if (localStorage.authorization == "true") {            
        } else {
        console.log(localStorage.authorization == "true")
        this.$router.push('../login/');
        }
        
        if (!localStorage.contacts) this.setDefaultValues();
        if (localStorage.contacts) {
            this.contacts = JSON.parse(localStorage.getItem("contacts"));
        }
    },

methods: {
    save () {
    localStorage.setItem("contacts", JSON.stringify(this.contacts));
    },

    async setDefaultValues() {
        let defaultContacts = { 
            adress : "Первомайский проспект 2 Петрозаводск Карелия Републиц, Петрозаводск, Респ. Карелия, 185001",
            telephone : "8(8142)76-55-70",
            vkLink : "https://vk.com/ptzkino",
            instagramLink : "",
            telegramLink : "",
            };
        localStorage.setItem("contacts", JSON.stringify(defaultContacts));
        },
    },
}
</script>