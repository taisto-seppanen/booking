<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">Admin</b-navbar-brand>
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
import Cookies from 'js-cookie';

export default {
    layout: "admin",
    methods: {
      logout() {
      Cookies.remove('access_token');
      firebase.auth().signOut().then(() => {
          this.$router.replace({ name: 'login' })
        })
      },
    },
}
</script>