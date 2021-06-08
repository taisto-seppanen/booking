<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

           <li class="nav-item">
            <NuxtLink to="../admin/" class="nav-link" no-prefetch>Главная</NuxtLink>
          </li>

          <li class="nav-item">
            <NuxtLink to="../admin/NewsPandel" class="nav-link" no-prefetch>Редактирование новостей</NuxtLink>
          </li>

          <li class="nav-item">
            <NuxtLink to='../admin/FilmsPanel' no-prefetch class="nav-link">Редактирование фильмов</NuxtLink>
          </li>

          <li class="nav-item">
            <a to='href' @click="logout" no-prefetch class="nav-link">Выйти</a>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</header>
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