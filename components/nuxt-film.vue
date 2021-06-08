<template>
    <div>
<div>
  <b-button v-b-modal.modal-1>Бронирование</b-button>

  <b-modal id="modal-1" title="Резервирование биллетов" cancel-title='Отмена' ok-title="Забронировать" @ok="addBooking()">
    {{film.filmname}}
     Дата:
    <input
      type="date"
      id="start"
      min="2021-05-25"
      max="2021-06-25"
      v-model="currentDate"
    />

    Время:
      <select style="width: 100px" v-model="currentTime">
        <option :key='t.time' v-for="t in sessionsForCurrentDay">
          {{t.time}}
        </option>
      </select>

      <div class="cinima" style="margin-top: 5px">
        <div class="cinimaDisplay" style="background: rgb(49, 49, 49)">
          Экран
        </div>
        <div class="hall" style="display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-auto-flow: dense;">

          <button
            style="min-width: 30px; min-height: 50px"
            :class="{ activBtn : currentPlaces.indexOf(number) != -1 }"
            :key='number'
            v-for="number in 36"
            @click="clickOnSeat(number)"
            :disabled="currentTime ==''"
          >
            {{number}}
          </button>
        </div>
      </div>
  </b-modal>
</div>
    </div>
</template>


<script>
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export default {
  props: {
    'selectedFilm' : Object },

  data() {
    return {
      film: this.selectedFilm,
      currentDate: 0,
      currentTime: 0,
      currentPlaces: [],
      sessionsForCurrentDay: [],
      placesForCurrentSession: [],
    }
  },

  watch: {
    currentDate: function () {
      if (this.currentDate != "") this.getSessionsList();
     },

     currentTime: function () {
       if(this.currentTime != "") this.getPlaces();
     }
  },

  methods: {
    getSessionsList() {
      try {
        this.sessionsForCurrentDay = this.film.dates.find((day) => day.date === this.currentDate).sessions;
      } catch {
        console.error();
      }
    },

    getPlaces() {
      if (this.currentTime != "") {
         this.placesForCurrentSession = this.sessionsForCurrentDay.find((session) => session.time == this.currentTime).places;
      } else {
        this.placesForCurrentSession = [];
      }
    },

    clickOnSeat(index) {
      if (this.currentPlaces.indexOf(index) != -1) {
        this.currentPlaces.splice(this.currentPlaces.indexOf(index), 1);
      } else {
        this.currentPlaces.push(index);
        console.log(this.currentPlaces)
      }
    },

    addBooking() {
      let films = JSON.parse(localStorage.getItem("films"));
      let filmIndex = films.map((e) => e.filmname).indexOf(this.film.filmname);
      let dateIndex = this.film.dates.map((e) => e.date).indexOf(this.currentDate);
      let sessionIndex = this.sessionsForCurrentDay.map((e) => e.time).indexOf(parseInt(this.currentTime));


        console.log(this.currentFilm);
        console.log(dateIndex);
        console.log(films[filmIndex]);

      for (let place of this.currentPlaces) {
        films[filmIndex].dates[dateIndex].sessions[sessionIndex].places.push(parseInt(place));
      }

      const AddCurrentPlacesForSession = films;
      localStorage.setItem("films", JSON.stringify(AddCurrentPlacesForSession));

      this.clear();
    },

    clear() {
      this.film = '';
      this.currentDate = 0;
      this.currentTime = 0;
      this.currentPlaces = [];
      this.sessionsForCurrentDay = [];
      this.placesForCurrentSession = [];
    },
  },
}
</script>

<style>

      .activBtn {
        background: darkgrey;
      }

      @media (max-width: 630px) {
        .cardWrapper {
          flex-direction: column;
        }
        .modal-body {
          display: flex;
          flex-direction: column;
        }
      }
</style>