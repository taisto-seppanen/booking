<template>

<div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">Админка</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <NuxtLink to="../admin/" class="nav-link" no-prefetch>Главная</NuxtLink>
        <NuxtLink to="../admin/NewsPandel" class="nav-link" no-prefetch>Новости</NuxtLink>
        <NuxtLink to='../admin/FilmsPanel' no-prefetch class="nav-link">Фильмы</NuxtLink>
        <NuxtLink to='../admin/contacts' no-prefetch class="nav-link">Контакты</NuxtLink>
        <a to='href' @click="logout" no-prefetch class="nav-link">Выйти</a>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>


</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
    layout: "admin",
    data() {
      return {
              loggedIn: false,
      }
    },

    methods: {
      logout() {
        // localStorage.setItem("authorization", JSON.stringify(false));
        firebase.auth().signOut().then(() => {
          this.$router.push
        })
        
      },

      setupFirebase() {
        firebase.auth().onAuthStateChanged(user => {
          if(user){
            this.loggedIn = true
          } else  {
            this.loggedIn = false
            }          
        })
      }
    },
    
}
</script>