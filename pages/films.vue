<template>
  <b-container class="d-flex justify-content-center">
      <b-alert
      :show="dismissCountDown"
      dismissible fade
      variant="success"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
      style="position: fixed; z-index: 1;"
    >
      Сеанс успешно забронирован! 
    </b-alert>
    <div>
      <b-modal id="filmmodal" title="Бронирование мест" hide-footer no-close-on-backdrop @close="clear()">
          <b-form inline>

        <b-form-input placeholder="Дата" type="date" id="start" v-model="currentDate" />
        Время: <b-form-select style="width: 50%; border: grey 1px solid; margin: 5px" v-model="currentTime">
                <option :key="t.time" v-for="t in sessionsForCurrentDay"> {{t.time}} </option>
               </b-form-select>
          </b-form>
              <div class="cinima" >
               <div class="cinimaDisplay">Экран</div>
               <div class="hall" style="display: grid; grid-template-columns: repeat(6, 1fr); grid-auto-flow: dense;">
                 <b-button
                   style="min-width: 30px; min-height: 50px"
                   :class="{activBtn : currentPlaces.indexOf(number) != -1}"
                   v-for="number in 36"
                   :key="number"
                   @click="clickOnSeat(number)"
                   :disabled="isDisableBtn ||  currentTime ==''"
                 >
                   {{number}}
                 </b-button>
               </div>
               </div>

              <b-button variant="info" class="mt-3" block 
                @click="addBooking(), $bvModal.hide('filmmodal')" :disabled="currentPlaces.length == 0 || isDisableBtn">
                  Зарезервировать
              </b-button>

      </b-modal>


    </div>
    <div class="">
      <b-card no-body class="overflow-hidden" style="max-width: 80rem; margin: 10px;" :key="film.filmname" v-for="film in films">
        <b-row no-gutters>
          <b-col md="2">
            <b-card-img :src="film.filmpic" alt="Image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="10">
            <b-card-body>
              <b-card-text>
                <h1>{{film.filmname}}</h1>
                <p>{{film.filmdescription}}</p>
                  <b-button v-b-modal.filmmodal @click="chooseFilm(film)" variant="info">Забронировать места</b-button>
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>

  </b-container>
</template>



<script>
import firebase from "firebase/app";
import "firebase/database";
var database = firebase.database();

export default {
    data() {
      return {
        currentFilm: "",
        currentTime: "",
        currentDate: "",
        currentPlaces: [],
        sessionsForCurrentDay: [],
        placesForCureentSession: [],
        isDateSelected: false,
        isFilmSelected: false,
        booked: false,
        films: [],
        isDisableBtn: false,
        dismissSecs: 3,
        dismissCountDown: 0
      }
    },
// часть имитации работы с сервером     
    mounted() {
      this.get();
    },

    watch: {
//следим за изменениями выбора даты
      currentDate: function () {
      this.currentTime = "";
      this.currentPlaces= [];

      this.currentDate != ""
        ? (this.isDateSelected = true)
        : (this.isDateSelected = false);
        this.getSessionsList();
      },

// Следим за временем
// проверяем возможно ли бронирование на текущее время.
      currentTime: function () {
        this.currentPlaces= [];

        if (this.currentTime != ""  ) {
          try {
          this.placesForCureentSession = this.sessionsForCurrentDay.find((x) => x.time == this.currentTime).places;
          } catch(error) {
            console.warn(`Don't panic, it's ok! ${error}`)
            }
        } else {
          this.placesForCureentSession = [];
        }


        function format(date) {
          var d = date.getDate();
          var m = date.getMonth() + 1;
          var y = date.getFullYear();
          return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        }

        var today = new Date();
        var dateString = format(today);

        if (new Date(this.currentDate) > new Date(dateString)) {
            this.isDisableBtn = false; 
            console.warn('выбранная дата больше текущей');
            }
          else if ( this.currentDate == dateString ) {
            if (parseInt(this.currentTime) > parseInt(new Date().getHours())) {
            console.warn('выбранное время больше текущего');
            this.isDisableBtn = false; 
            } else {
              console.warn('выбранное время меньше текущего');
              this.isDisableBtn = true; 
              }
            } else {
              console.log('выбрана дата меньше текущей')
              this.isDisableBtn = true
            }

      },

    },

    methods: {
// метод выбора фильма
      chooseFilm(film) {
        this.currentFilm = film;
      },

// метод получения списка сеансов
      getSessionsList() {
        if (this.isDateSelected == true) {
          try {
            this.sessionsForCurrentDay = this.currentFilm.dates.find((day) => day.date === this.currentDate).sessions;
          } catch (error) {console.warn(`Don't panic, it's ok! ${error}`)}
          } else {
            this.sessionsForCurrentDay = [];
          }
      },

// обработка выбора мест
      clickOnSeat(index) {
        if (this.currentPlaces.indexOf(index) != -1) {this.currentPlaces.splice(this.currentPlaces.indexOf(index), 1);
        } else {
          this.currentPlaces.push(index);
        }
      },

// метод добавления брони

    addBooking() {
      try {
      let filmIndex = this.films.map((e) => e.filmname).indexOf(this.currentFilm.filmname);
      let dateIndex = this.currentFilm.dates.map((e) => e.date).indexOf(this.currentDate);
      let sessionIndex = this.sessionsForCurrentDay.map((e) => e.time).indexOf(parseInt(this.currentTime));

      for (let x of this.currentPlaces) {

        this.films[filmIndex].dates[dateIndex].sessions[sessionIndex].places.push(parseInt(x));
      }
      const AddCurrentPlacesForSession = this.films;

      this.save(AddCurrentPlacesForSession);
      this.clear();
      this.showAlert();
      } catch {}
    },

    // метод очистки значений
      clear() {
        this.currentDate = "";
        this.currentTime = "";
        this.currentFilm = "";
        this.currentPlaces = [];
        this.isDisableBtn = false;
      },
      
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },

      showAlert() {
        this.dismissCountDown = this.dismissSecs
      },

      save(newfilm) {
        console.warn('#### SAVING');
        console.warn(newfilm);
        firebase.database().ref('films/').set({newfilm});
      },

      async get() {
        console.warn('azaza');
          await firebase.database().ref('films/').get().then((snapshot) => {
              if (snapshot.exists()) {

                  this.films = snapshot.val().newfilm;

                  console.warn(this.films);

              } else {
                  console.warn("bad request")
              }
           })
      },
      }
    };

</script>

<style scoped>

  .card-body {
    width: 90%;
    display: flex;
    margin: 0 auto;
  }

  .cardWrapper{
    display: flex;
    background: rgb(241, 241, 241);
    border-radius: 5px;
}

 .activBtn {
   background: darkgrey;
 }

.cinimaDisplay { border-radius: 5px 5px 0 0;
    text-align: center;
    background: rgb(101 93 114);
    }
</style>