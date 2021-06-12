<template>
    <div class="container contactsWrappet">

        <div class="gridItem">
            <p><strong>Адрес:</strong>{{ contacts.adress }}</p>
            <p><strong>Телефон:</strong> <a href="tel:8(8142)76-55-70">{{ contacts.telephone }}</a></p>
            <p><strong>Социальные сети:</strong>
                <a :href='contacts.vkLink' target="_blank" v-if='contacts.vkLink != ""'><img class="soclink" src="../assets/vk-logo.svg"/></a>
                <a :href='contacts.instagramLink' target="_blank" v-if='contacts.instagramLink != ""'><img class="soclink" src="../assets/Instagram_logo.svg"/></a>
                <a :href='contacts.telegramLink' target="_blank" v-if='contacts.telegramLink != ""'><img class="soclink" src="../assets/Telegram_logo.svg"/></a>

                </p>
        </div>

        <div class="gridItem">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1885.799570626184!2d34.34573081617316!3d61.79335368258777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46a1ec44531c1a47%3A0x33b6ecbb27d56a51!2z0JrQsNC70LXQstCw0LvQsA!5e0!3m2!1sru!2sru!4v1623153064019!5m2!1sru!2sru" class="map" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            contacts: {},
        };
    },

    mounted() {
        if (!localStorage.contacts) this.setDefaultValues();
        if (localStorage.contacts) {
            this.contacts = JSON.parse(localStorage.getItem("contacts"));
        }
        
    },

methods: {
    async setDefaultValues() {

        let defaultContacts = { 
            adress : "Первомайский проспект 2 Петрозаводск Карелия Републиц, Петрозаводск, Респ. Карелия, 185001",
            telephone : "8(8142)76-55-70",
            vkLink : "https://vk.com/ptzkino",
            instagramLink : "",
            telegramLink : "",
            viberLink : "",
            }   ;

        localStorage.setItem("contacts", JSON.stringify(defaultContacts));
        },
    },
}
</script>
<style scoped>
    .container {
        display: grid;
        grid-template-areas: "a a" ;
    }
    p {
        padding: 10px;
        background: rgb(241, 241, 241);
        border-radius: 5px;
     }
    .gridItem {
        max-width: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-self: center;
        margin: 10px;
     }
     .map {
        width: 600px;
        height: 600px;
     }
     .soclink {
         width: 32px;
     }

    @media (max-width: 960px) {
        .contactsWrappet {
          display: grid;
          grid-template-areas: "a";
        }
        .gridItem {
          max-width: 600px;
        }
        .map {
         width: auto;
         min-height: 450px;
        max-height: 440px;
     }
    }
</style>