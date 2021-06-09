<template>
  <main>
    <div>
      <b-modal id="filmmodal" title="Бронирование мест" hide-footer>
        Дата: <input type="date" id="start" v-model="currentDate" />
        Время: <select style="width: 100px" v-model="currentTime">
                <option :key="t.time" v-for="t in sessionsForCurrentDay"> {{t.time}} </option>
               </select>

              <div class="cinima" >
               <div class="cinimaDisplay">Экран</div>
               <div class="hall" style="display: grid; grid-template-columns: repeat(6, 1fr); grid-auto-flow: dense;">
                 <b-button
                   style="min-width: 30px; min-height: 50px"
                   :class="{activBtn : currentPlaces.indexOf(number) != -1}"
                   v-for="number in 36"
                   :key="number"
                   @click="clickOnSeat(number)"
                   :disabled="isDisableBtn || placesForCureentSession.indexOf(number) != -1 || currentTime ==''"
                 >
                   {{number}}
                 </b-button>
               </div>
               </div>

              <b-button type="button" class="mt-3" block 
                @click="addBooking(), $bvModal.hide('filmmodal')" :disabled="currentPlaces.length == 0 || isDisableBtn">
                  Зарезервировать
              </b-button>

      </b-modal>


    </div>
    <div class="filmsArrayWrapper">
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
                  <b-button v-b-modal.filmmodal @click="chooseFilm(film)">Забронировать места</b-button>
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>

  </main>
</template>



<script>
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
      }
    },
    mounted() {
        if (!localStorage.films) this.setDefaultValues();
        if (localStorage.films) {
        this.films = JSON.parse(localStorage.getItem("films"));
        }
    },

    watch: {
    //следим за изменениями выбора даты
      currentDate: function () {
        this.currentTime = "";

      this.currentDate != ""
        ? (this.isDateSelected = true)
        : (this.isDateSelected = false);

        console.log(this.currentDate);
        this.getSessionsList();
      },

    // Следим за временем
    // проверяем возможно ли бронирование на текущее время.
      currentTime: function () {
        if (this.currentTime != "") {
          this.placesForCureentSession = this.sessionsForCurrentDay.find(
            (x) => x.time == this.currentTime
          ).places;
        } else {
          this.placesForCureentSession = [];
        }

        let timeNow = new Date();
        new Date(this.currentDate.toLocaleString()).setHours(23) >=
          timeNow.setHours(0) && this.currentTime > timeNow.getHours() + 12
          ? (this.isDisableBtn = false)
          : (this.isDisableBtn = true);
      },

    },

    methods: {
// метод выбора фильма
      chooseFilm(film) {
        this.currentFilm = film;
        console.log(this.currentFilm.filmname);
      },

// метод получения списка сеансов
      getSessionsList() {
         console.log("getSessionsList")
        if (this.isDateSelected == true) {
          try {
            this.sessionsForCurrentDay = this.currentFilm.dates.find((day) => day.date === this.currentDate).sessions;
            console.log(this.sessionsForCurrentDay);
          } catch (error) {}
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
      let filmIndex = this.films.map((e) => e.filmname).indexOf(this.currentFilm.filmname);
      console.log("filmIndex "+ filmIndex);
      let dateIndex = this.currentFilm.dates.map((e) => e.date).indexOf(this.currentDate);
      console.log("dateIndex "+dateIndex);
      let sessionIndex = this.sessionsForCurrentDay.map((e) => e.time).indexOf(parseInt(this.currentTime));
      console.log("sessionIndex "+sessionIndex);

      for (let x of this.currentPlaces) {

        this.films[filmIndex].dates[dateIndex].sessions[sessionIndex].places.push(parseInt(x));
      }
      const AddCurrentPlacesForSession = this.films;
      localStorage.setItem("films", JSON.stringify(AddCurrentPlacesForSession));

      this.clear();
    },

    // метод очистки значений
      clear() {
        console.log("clear")
        this.currentDate = "";
        this.currentTime = "";
        this.currentFilm = "";
        this.currentPlaces = [];
        this.isDisableBtn = false;
      },

      async setDefaultValues() {
      let newfilm = [
        {
          filmpic:
            "https://upload.wikimedia.org/wikipedia/ru/9/9d/Matrix-DVD.jpg",
          filmdescription:
            "Живет на свете обычный хакер Нео и даже не подозревает, что этот мир – всего лишь симуляция, созданная зловещими машинами, а он сам – тот самый Избранный, которому подвластно подчинить себе Матрицу. Чтобы вырваться из сна в настоящую реальность, он присоединяется к повстанцам и начинает гнуть ложки глазами",
          id: 0,
          filmname: "Матрица",
          dates: [
            {
              date: "2021-06-04",
              sessions: [
                {
                  time: 10,
                  places: [0, 1],
                },
              ],
            },
            {
              date: "2021-05-30",
              sessions: [
                {
                  time: 10,
                  places: [0, 1],
                },
                {
                  time: 12,
                  places: [],
                },
                {
                  time: 14,
                  places: [],
                },
                {
                  time: 20,
                  places: [],
                },
              ],
            },
            {
              date: "2021-06-06",
              sessions: [
                {
                  time: 16,
                  places: [],
                },
                {
                  time: 18,
                  places: [],
                },
              ],
            },
            {
              date: "2021-06-07",
              sessions: [
                {
                  time: 10,
                  places: [0, 1],
                },
                {
                  time: 12,
                  places: [],
                },
                {
                  time: 14,
                  places: [],
                },
                {
                  time: 20,
                  places: [],
                },
              ],
            },
            {
              date: "2021-06-08",
              sessions: [
                {
                  time: 16,
                  places: [],
                },
                {
                  time: 18,
                  places: [],
                },
              ],
            },
            {
              date: "2021-06-09",
              sessions: [
                {
                  time: 10,
                  places: [0, 1],
                },
                {
                  time: 12,
                  places: [],
                },
                {
                  time: 14,
                  places: [],
                },
                {
                  time: 20,
                  places: [],
                },
              ],
            },
            {
              date: "2021-06-10",
              sessions: [
                {
                  time: 16,
                  places: [],
                },
                {
                  time: 18,
                  places: [],
                },
              ],
            },
          ],
        },
        {
          filmname: "Тёмный рыцарь",
          id: 1,
          filmpic: "https://i.redomm.ru/AAfb0OBJDTdl-r1275x900.jpg",
          filmdescription:
            "Богатый промышленник постоянно попадает в неприятности из-за обострённого чувства справедливости, а эксцентричный психолог, использующий в работе образ шута, решает развенчать его иллюзии о мире с помощью серии масштабных пранков",
          dates: [
            {
              date: "2021-05-30",
              sessions: [
                {
                  time: 16,
                  places: [],
                },
                {
                  time: 18,
                  places: [],
                },
              ],
            },
            {
              date: "2021-06-06",
              sessions: [
                {
                  time: 10,
                  places: [],
                },
                {
                  time: 12,
                  places: [],
                },
                {
                  time: 14,
                  places: [],
                },
                {
                  time: 20,
                  places: [],
                },
              ],
            },
            {
              date: "2021-06-07",
              sessions: [
                {
                  time: 16,
                  places: [],
                },
                {
                  time: 18,
                  places: [],
                },
              ],
            },
            {
              date: "2021-06-08",
              sessions: [
                {
                  time: 10,
                  places: [],
                },
                {
                  time: 12,
                  places: [],
                },
                {
                  time: 14,
                  places: [],
                },
                {
                  time: 20,
                  places: [],
                },
              ],
            },
            {
              date: "2021-06-09",
              sessions: [
                {
                  time: 16,
                  places: [],
                },
                {
                  time: 18,
                  places: [],
                },
              ],
            },
            {
              date: "2021-06-10",
              sessions: [
                {
                  time: 10,
                  places: [],
                },
                {
                  time: 12,
                  places: [],
                },
                {
                  time: 14,
                  places: [],
                },
                {
                  time: 20,
                  places: [],
                },
              ],
            },
          ],
        },
      ];
      localStorage.setItem("films", JSON.stringify(newfilm));
      
      return 
        },
      }
    };

</script>

<style scoped>
  .filmsArrayWrapper {
    margin: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
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
    background: rgb(101 93 114);}
</style>