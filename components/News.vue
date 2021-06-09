<template>
  <main>
    <div class="card-body" :key="news.title" v-for="news in newsArray.reverse()">
          <div class='gridItem'>
            <img
            :src="news.newsPic"
            onError="this.src='/_nuxt/assets/newspic.jpg'"
            class="card-img-top"
            style="max-width: 400px;"
            />
          </div>
          <div class='gridItem'>
              <h2>{{ news.newsTittle }}</h2>
              <p>{{ news.newsText }}</p>
              <p class='newsDate'>Дата: {{ news.newsDate }}</p>
          </div>
    </div>
  </main>
</template>

 

<script >
export default {
    data() {
        return {
        newsArray: [],
        };
    },
    mounted() {
        if (!localStorage.newsArray) this.getDefaultValues();
        if (localStorage.newsArray) {
        this.newsArray = JSON.parse(localStorage.getItem("newsArray"));
        }
    },

// Услонвый запрос на сервер
    methods: {
      async getDefaultValues() {
      let defaultNews = [
        {
          id: 0,
          newsDate: '1978-05-01',
          newsTittle: "Завершение строительсва кинотеатра",
          newsPic: "http://rk.karelia.ru/wp-content/uploads/2020/03/irewhyg8y2o0o8go04.jpg",
          newsText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          id: 1,
          newsDate: '2021-05-09',
          newsTittle: "Запуск сайта",
          newsPic: "https://heworthgrange.org/wp-content/uploads/2021/04/istockphoto-1197831888-612x612-1.jpg",
          newsText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },

        {
          id: 2,
          newsDate: '2021-05-10',
          newsTittle: "‘Stand By Me’ Returning to Theaters For 35th Anniversary",
          newsPic: "https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/Stand-By-Me-Returning-to-Theaters.jpg",
          newsText: "Stand By Me, the Rob Reiner movie based on Stephen King‘s novella “The Body,” is headed back to the big screen to mark the movie’s 35th anniversary. The screenings will feature the bonus featurette “Walking the Tracks: The Summer of Stand by Me,” which follows “Stephen King as he recalls what led him to write the stories of his childhood, how they impacted the development of the movie, and Rob Reiner as he reminisces about the casting of the four leads.” Screenings will take place in theaters nationwide on May 23 and May 26.",
        },
      ];
      localStorage.setItem("newsArray", JSON.stringify(defaultNews));
      
      return 
        },
      }
    }
</script>

<style scoped>
    main {
        width: 90%;
        margin: 0 auto;
    }
    .gridItem {
        padding: 10px;
        display: flex;
        justify-content: center;
        align-self: center;
        flex-direction: column;
    }
    .card-body {
        margin: 10px;
        background: rgb(241, 241, 241);
        border-radius: 5px;
        display: grid;
        grid-template-areas: "a a";
    }
    .newsDate {
        text-align:right;
        color: grey;
    }

    @media (max-width: 960px) {
        .card-body {
          display: grid;
          grid-template-areas: "a";
        }
    }
</style>