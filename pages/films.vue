<template>
  <main>
    <div :key="film.filmpic" v-for="film in films">

      <div class="card-body">
        <div class="cardWrapper">
          <div style="margin: 10px">
            <img
            :src="film.filmpic"
            class="card-img-top"
            style="max-width: 400px; min-width: 300px"
            />
          </div>

          <div style="margin: 10px">
            <h5 class="card-title">{{film.filmname}}</h5>
            <p class="card-text">{{film.filmdescription}}</p>
            <nuxt-film :selected-film="film"></nuxt-film>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>



<script>
export default {
    data() {
        return {
        films: [],
        };
    },
    mounted() {
        if (!localStorage.films) this.getDefaultValues();
        if (localStorage.films) {
        this.films = JSON.parse(localStorage.getItem("films"));
        }
    },

// Услонвый запрос на сервер
    methods: {
      async getDefaultValues() {
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
    }

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
</style>