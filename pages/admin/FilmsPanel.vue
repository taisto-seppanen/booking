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
      <h3>Список фильмов:</h3>
      <b-list-group-item :key="film.filmname" v-for="film in films" style="display: flex; justify-content: space-between;">
        {{ film.filmname }}

        <b-button v-b-modal.filmmodal @click="chooseFilm(film)" variant="info">Добавить сеанс</b-button>
  
        <!-- <b-button-close style="color: red" @click.stop.prevent=""></b-button-close> -->
      </b-list-group-item>
    </b-list-group>

<!-- модалка -->

      <b-modal id="filmmodal" title="Добавление сеанса" hide-footer no-close-on-backdrop @close="clear()">
          <b-form @submit.stop.prevent='save'>
          <p>Дата: {{newSessionDate}}</p>
          <b-form-input placeholder="Дата" type="date" id="start" v-model="newSessionDate" />
          <p>Время: {{newSessionTime}}</p>          
          <b-form-input style='width: 100%;' type="range" min="0" max="23" v-model="newSessionTime"></b-form-input>
        </b-form>

        <b-button variant="info" class="mt-3" block 
          @click="addSession(), $bvModal.hide('filmmodal')" :disabled="newSessionDate == '' && newSessionTime == ''">
          Создать
        </b-button>

      </b-modal>
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
      isVisible: false,
      currentFilm: '',
      newSessionDate: '',
      newSessionTime: '',
    }
  },

  mounted() {
    this.get();
  },

  methods: {

    chooseFilm(film) {
    this.currentFilm = film;
    },

    addFilm () {
      this.films.push({
        filmname: this.filmname,
        filmdescription: this.filmdescription,
        filmpic: this.filmpic,
      });
      
      this.save(this.films);
      this.clear();
      this.get();
    },

    addSession() {
      let filmIndex = this.films.map((e) => e.filmname).indexOf(this.currentFilm.filmname);
      let dateIndex = -1;
      try {
        dateIndex = this.currentFilm.dates.map((e) => e.date).indexOf(this.newSessionDate);
      } catch(e) {
        console.warn("dont panic its ok " + e)
      }
      if (dateIndex != -1) {
        console.warn(this.films[filmIndex].dates[dateIndex].sessions)

        let id = this.films[filmIndex].dates[dateIndex].length;

        this.films[filmIndex].dates[dateIndex].sessions.push({places: { 0 : 0 }, time: this.newSessionTime});

      } else {

        this.films[filmIndex].dates.push({
          date: this.newSessionDate,
            sessions: [ { time : this.newSessionTime, places : [0]} ]
        })
        
      }

      this.save(this.films);
    },

    clear(){
      this.isVisible = false;
      this.filmname = '';
      this.filmdescription = '';
      this.filmpic = '';
      this.currentFilm = '';
      this.newSessionDate = '';
      this.newSessionTime = '';
    },

    async save(newfilm) {
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