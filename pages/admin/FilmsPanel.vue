<template>
    <b-container>
        <div class="alert alert-danger" role="alert">Этот раздел в разработке</div>

            <b-button variant="primary" @click="isVisible = !isVisible">Добавить фильм</b-button>

    <b-form v-if="isVisible" @submit.stop.prevent="addFilm" class="m-3">

        <b-form-group class="m-3"
            id="input-group-1"
            label="Название фильма"
            label-for="input-1">
                <b-form-input id="input-1" type="text" v-model="filmname"
                placeholder="" required></b-form-input>
        </b-form-group>

        <b-form-group class="m-3"
            id="input-group-1"
            label="Описание фильма"
            label-for="input-1">
                <b-form-input id="input-1" type="text" v-model="filmdescription"
                placeholder="" required></b-form-input>
        </b-form-group>


        <b-form-group class="m-3"
            id="input-group-1"
            label="Ссылка на картинку"
            label-for="input-1"
            description="Например https://pic.com/pic.png">
                <b-form-input id="input-1" type="text" v-model="filmpic"
                placeholder="" required></b-form-input>
        </b-form-group>


      <b-button type="submit" variant="primary">Save</b-button>
    </b-form>

      <b-list-group class="m-3">
      <h3>Список новостей:</h3>
      <b-list-group-item :key="film.filmname" v-for="film in films">
        {{ film.filmname }}
        <b-button-close style="color: red" @click.stop.prevent=""></b-button-close>
      </b-list-group-item>
    </b-list-group>

    </b-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import { getUserFromCookie, getUserFromSession } from '@/helpers'

export default {
  layout: "admin",

  asyncData({ req, redirect }) {
    if (process.server) {
      const user = getUserFromCookie(req)
      if (!user) {
        redirect('/login')
      }
    } else {
      var user = firebase.auth().currentUser
      if (!user) {
        redirect('/login')
      }
    }
  },

  data() {
    return {
      filmname: '',
      filmdescription: '',
      filmpic: '',
      films: [],
      isVisible: false
    }
  },

  mounted() {
    this.get();
  },

  methods: {

     addFilm () {
      console.warn('adding into array');
      
      this.films.push({
        filmname: this.filmname,
        filmdescription: this.filmdescription,
        filmpic: this.filmpic,
      });
      
      this.save(this.films);
      this.clear();
      this.get();
    },

    clear(){
      this.isVisible = false;
      this.filmname = '';
      this.filmdescription = '';
      this.filmpic = '';
    },

    async save(newfilm) {
        console.warn('sending to db')
        await firebase.database().ref('/').set({ newfilm });
    },
    
    async get() {
      await firebase.database().ref('/').get().then((snapshot) => {
      if (snapshot.exists()) {
          this.films = snapshot.val().newfilm;
      } else {
          console.warn("bad request")
          }
        })
    },
  },
}
</script>