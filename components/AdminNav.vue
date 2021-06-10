<template>

<div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">Админ</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <NuxtLink to="../admin/" class="nav-link" no-prefetch>Главная</NuxtLink>
        <NuxtLink to="../admin/NewsPandel" class="nav-link" no-prefetch>Редактирование новостей</NuxtLink>
        <NuxtLink to='../admin/FilmsPanel' no-prefetch class="nav-link">Редактирование фильмов</NuxtLink>
        <a to='href' @click="logout" no-prefetch class="nav-link">Выйти</a>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>


</template>

<script>
export default {
    layout: "admin",

    methods: {
      logout() {
        localStorage.setItem("authorization", JSON.stringify(false));
        this.$router.push('../login/');
      }
    },
    
}
</script>