<template>
    <div class="container contactsWrappet">
        <div class="gridItem">
            <p><strong>Адрес: </strong>{{ adress }}</p>
            <p><strong>Телефон: </strong> <a :href="`tel:`+telephone">{{ telephone }}</a></p>
            <p><strong>Социальные сети: </strong>
                <a :href='vkLink' target="_blank" v-if='vkLink != ""'><img class="soclink" src="../assets/vk-logo.svg"/></a>
                <a :href='instagramLink' target="_blank" v-if='instagramLink != ""'><img class="soclink" src="../assets/Instagram_logo.svg"/></a>
                <a :href='telegramLink' target="_blank" v-if='telegramLink != ""'><img class="soclink" src="../assets/Telegram_logo.svg"/></a>
            </p>
        </div>
        <div class="gridItem">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1885.799570626184!2d34.34573081617316!3d61.79335368258777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46a1ec44531c1a47%3A0x33b6ecbb27d56a51!2z0JrQsNC70LXQstCw0LvQsA!5e0!3m2!1sru!2sru!4v1623153064019!5m2!1sru!2sru" class="map" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
var database = firebase.database();

export default {
    data() {
        return {
            adress: '',
            telephone: '',
            vkLink: '',
            instagramLink: '',
            telegramLink: '',
        };
    },

    beforeMount() {
        this.get()
    },

methods: {
    get() {
    firebase.database().ref('contacts/').get().then((snapshot) => {
        if (snapshot.exists()) {
            this.adress = snapshot.val().adress;
            this.telephone = snapshot.val().telephone;
            this.vkLink = snapshot.val().vkLink;
            this.instagramLink = snapshot.val().instagramLink;
            this.telegramLink = snapshot.val().telegramLink;
        } else {
            console.warn("bad request")
        }
        })
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