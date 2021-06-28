<template>
  <b-container>
    <h1>Редактирование новостей</h1>
    <b-button variant="primary" @click="isVisible = !isVisible">Добавить новость</b-button>
    <b-form v-if="isVisible" @submit.stop.prevent="addNews" class="m-3">
      <b-form-group class="m-3" id="input-group-1" label="Заголовок" label-for="input-1">
        <b-form-input id="input-1" type="text" v-model="newTittle" placeholder="" required></b-form-input>
      </b-form-group>

      <b-form-group class="m-3" id="input-group-1" label="Дата" label-for="input-1">
        <b-form-input id="input-1" type="date" v-model="newDate" placeholder="" required></b-form-input>
      </b-form-group>

      <b-form-group class="m-3" id="input-group-1" label="Текст новости" label-for="input-1">
        <b-form-input id="input-1" type="text" v-model="newText" placeholder="" required></b-form-input>
      </b-form-group>

      <b-form-group class="m-3" id="input-group-1" label="Ссылка на картинку"
        label-for="input-1" description="Например https://pic.com/pic.png">
        <b-form-input id="input-1" type="text" v-model="newPicLink" placeholder="" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Save</b-button>
    </b-form>

    <b-list-group class="m-3">
      <h3>Список новостей:</h3>
      <b-list-group-item :key="news.newsTittle" v-for="news in newsArray">
        {{ news.newsTittle }}
        <b-button-close style="color: red" @click.stop.prevent="delteCurrentNews(news)"></b-button-close>
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import {saveFilm, getNews  } from '../../plugins/dataMethods'
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
      newTittle: "",
      newDate: "",
      newText: "",
      newPicLink: "",
      newsArray: [],
      isVisible: false
    };
  },
 
  mounted() {
    this.get();
  },

  methods: {
    delteCurrentNews(news) {
        this.newsArray.splice(this.newsArray.indexOf(news), 1);
        this.save(this.newsArray);
    },

    addNews() {
      this.newsArray.push({
        id: this.newsArray.length,
        newsTittle: this.newTittle,
        newsDate: this.newDate,
        newsText: this.newText,
        newsPic: this.newPicLink
      });
      this.clear();
      this.isVisible = false;
      this.save(this.newsArray);
    },

    clear() {
      this.newTittle = "";
      this.newDate = "";
      this.newText = "";
      this.newPicLink = "";
    },

    save(newsArr) {
      firebase.database().ref('news/').set({ newsArr });
    },

    async get() {
      this.newsArray = await getNews();
    },
  }
};
</script>

<style scoped>
</style>
