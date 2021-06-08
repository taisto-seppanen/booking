<template>
    <div class="newsRedactPandel">
        <h1>Редактирование новостей</h1>
        <button @click='isVisible=!isVisible'>Добавить новость</button>
        <div v-if="isVisible">
            <p>Заголовок: <input type="text" v-model="newTittle"></p>
            <p>Дата: <input type="date" v-model="newDate"></p>
            <p>Тект новости: <input type="text" v-model="newText"></p>
            <p>Ссылка на картинку: <input type="text" v-model="newPicLink"></p>
            <button @click="addNews"
            :disabled="newTittle == '' && newDate == ''
             && newText == '' && newPicLink == ''"
            >Добавить новость</button>

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
