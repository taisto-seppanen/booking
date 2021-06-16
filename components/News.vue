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
import firebase from 'firebase/app'

export default {
    data() {
        return {
        newsArray: [],
        };
    },
    mounted() {
      this.get()
    },

// Услонвый запрос на сервер
    methods: {
      replaceByDefault(e) {
       e.target.src = 'https://guwahatiplus.com/public/web/images/default-news.png';
    },

    get() {
      firebase.database().ref('news/').get().then((snapshot) => {
        if (snapshot.exists()) {
          this.newsArray = snapshot.val().newsArr.reverse();
        } else console.warn("bad request");
      })
    },
  }
 }
</script>
