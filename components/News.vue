<template>
     <b-container>
      <b-card no-body class="border border-dark" style="max-width: 80rem; margin: 10px;" :key="news.title" v-for="news in newsArray">
        <b-row no-gutters>
          <b-col md="2" style="display: flex; ">
            <b-card-img :src="news.newsPic" @error="replaceByDefault" alt="Image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="10">
            <b-card-body >
              <b-card-text>
                <h1>{{news.newsTittle}}</h1>
                <p>{{news.newsText}}</p>
                <p class="text-muted">Дата: {{ news.newsDate }}</p>
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
</template>

<script >
export default {
    data() {
        return {
        newsArray: [],
        };
    },
    mounted() {
        if (!localStorage.newsArray) this.setDefaultValues();
        if (localStorage.newsArray) {
        this.newsArray = JSON.parse(localStorage.getItem("newsArray")).reverse();
        }
    },

// Услонвый запрос на сервер
    methods: {
      replaceByDefault(e) {
       e.target.src = 'https://guwahatiplus.com/public/web/images/default-news.png';
    },

      async setDefaultValues() {
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
          newsDate: '2021-05-07',
          newsTittle: "Запуск сайта",
          newsPic: "https://heworthgrange.org/wp-content/uploads/2021/04/istockphoto-1197831888-612x612-1.jpg",
          newsText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },

        {
          id: 2,
          newsDate: '2021-05-10',
          newsTittle: "‘Stand By Me’ Returning to Theaters For 35th Anniversary",
          newsPic: "https://www.picclickimg.com/d/l400/pict/143972666807_/Various-Stand-By-Me-Original-Motion-Picture.jpg",
          newsText: "Stand By Me, the Rob Reiner movie based on Stephen King‘s novella “The Body,” is headed back to the big screen to mark the movie’s 35th anniversary. The screenings will feature the bonus featurette “Walking the Tracks: The Summer of Stand by Me,” which follows “Stephen King as he recalls what led him to write the stories of his childhood, how they impacted the development of the movie, and Rob Reiner as he reminisces about the casting of the four leads.” Screenings will take place in theaters nationwide on May 23 and May 26.",
        },

        
        {
          id: 3,
          newsDate: '2021-06-05',
          newsTittle: "Why Doctor Who fans are criticising the BBC’s stance on copyright",
          newsPic: "https://upload.wikimedia.org/wikipedia/ru/8/85/Doctor_Who_Series_5.png",
          newsText: "Doctor Who fans have always been a little different. After decades of the show being on air there’s a particular kind of devotion, excitement and sense of ownership over what began as a somewhat educational children’s programme about a time traveller, but morphed into an international brand that sometimes awkwardly straddles its dual identity.",
        },
      ];
      localStorage.setItem("newsArray", JSON.stringify(defaultNews)); 
        },
      }
    }
</script>
