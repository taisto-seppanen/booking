<template>
  <main>
    <div class="card-body" :key="news.title" v-for="news in newsArray.reverse()">
          <div class='gridItem'>
            <img
            :src="news.newsPic"
            class="card-img-top"
            style="max-width: 400px; min-width: 300px"
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
          newsDate: '1991-04-01',
          newsTittle: "Завершение строительсва кинотеатра",
          newsPic: "http://rk.karelia.ru/wp-content/uploads/2020/03/irewhyg8y2o0o8go04.jpg",
          newsText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          id: 1,
          newsDate: '1991-04-01',
          newsTittle: "Запуск сайта",
          newsPic: "https://heworthgrange.org/wp-content/uploads/2021/04/istockphoto-1197831888-612x612-1.jpg",
          newsText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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