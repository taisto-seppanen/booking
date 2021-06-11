<template>
  <b-container>
    <h1>Редактирование новостей</h1>

    <b-button variant="primary" @click="isVisible = !isVisible">Добавить новость</b-button>

    <b-form v-if="isVisible" @submit.stop.prevent="addNews" class="m-3">

                <b-form-group class="m-3"
            id="input-group-1"
            label="Заголовок"
            label-for="input-1">
                <b-form-input id="input-1" type="text" v-model="newTittle"
                placeholder="" required></b-form-input>
        </b-form-group>

                <b-form-group class="m-3"
            id="input-group-1"
            label="Дата"
            label-for="input-1">
                <b-form-input id="input-1" type="date" v-model="newDate"
                placeholder="" required></b-form-input>
        </b-form-group>

                <b-form-group class="m-3"
            id="input-group-1"
            label="Текст новости"
            label-for="input-1">
                <b-form-input id="input-1" type="text" v-model="newText"
                placeholder="" required></b-form-input>
        </b-form-group>

                <b-form-group class="m-3"
            id="input-group-1"
            label="Ссылка на картинку"
            label-for="input-1"
            description="Например https://pic.com/pic.png">
                <b-form-input id="input-1" type="text" v-model="newPicLink"
                placeholder="" required></b-form-input>
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
export default {
  layout: "admin",

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

  beforeMount() {
    this.newsArray = JSON.parse(localStorage.getItem("newsArray"));

    if (localStorage.authorization == "true") {
    } else {
      console.log(localStorage.authorization == "true");
      this.$router.push("../login/");
    }
  },

  methods: {
    delteCurrentNews(news) {
        this.newsArray.splice(this.newsArray.indexOf(news), 1);
        this.save();
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
      this.save();
    },

    clear() {
      this.newTittle = "";
      this.newDate = "";
      this.newText = "";
      this.newPicLink = "";
    },

    save() {
      const newNewsArray = this.newsArray;
      localStorage.setItem("newsArray", JSON.stringify(newNewsArray));
    }
  }
};
</script>

<style scoped>

</style>
