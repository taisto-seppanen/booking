<template>
    <div class="newsRedactPandel">
        <h1>Редактирование новостей</h1>
        <b-button @click='isVisible=!isVisible'>Добавить новость</b-button>
        <div v-if="isVisible">
            <p>Заголовок: <b-form-input type="text" v-model="newTittle"></b-form-input></p>
            <p>Дата: <b-form-input type="date" v-model="newDate"></b-form-input></p>
            <p>Тект новости: <b-form-input type="text" v-model="newText"></b-form-input></p>
            <p>Ссылка на картинку: <b-form-input type="text" v-model="newPicLink"></b-form-input></p>
            <b-button @click="addNews"
            :disabled="newTittle == '' && newDate == ''
             && newText == '' && newPicLink == ''"
            >Добавить новость</b-button>

        </div>
        <ul>Список новостей:
            <li :key="news.newsTittle" v-for="(news) in newsArray">
                {{news.newsTittle}} 
                <button class='danger'>X</button>
            </li>
        </ul>
    </div>
</template>

<script>

export default {    
    layout: "admin",

    data(){
        return {
            newTittle: '',
            newDate: '',
            newText: '',
            newPicLink: '',
            newsArray : [],
            isVisible: false,
        }
    },
    
    mounted() {

        this.newsArray = JSON.parse(localStorage.getItem("newsArray"));

        if (localStorage.authorization == "true") {            
        } else {
        console.log(localStorage.authorization == "true")
        this.$router.push('../login/');
        }
    },

    methods: {
        delteCurrentNews(id) {
            this.newsArray.splice(this.newsArray.indexOf(id), 1);
            this.save();
        },

        addNews(){            
            this.newsArray.push({
                id: this.newsArray.length,
                newsTittle: this.newTittle,
                newsDate: this.newDate,
                newsText: this.newText,
                newsPic: this.newPicLink,
            });
            this.clear();
            this.save();
        },

        clear() {
            this.newTittle = "";
            this.newDate = "";
            this.newTex = "";
            this.newPicLnk = "";
        },

        save() {
            const newNewsArray = this.newsArray;
            localStorage.setItem("newsArray", JSON.stringify(newNewsArray));
        },

        
    },
}
</script>

<style scoped>

    .newsRedactPandel {
    margin: 50px;
    }
    .danger {
        color: red;
    }
</style>
