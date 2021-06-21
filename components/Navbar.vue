<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#" style="display: flex; align-items: center; width: 120px;
    justify-content: space-between;margin: 0px 10px 0px;">
    <img src="../static/Film-icon.png" style="width: 25px">Калевала</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <NuxtLink class="nav-link" no-prefetch to="/">Новинки кино</NuxtLink>
        <NuxtLink to='/films' no-prefetch class="nav-link">Сейчас в прокате</NuxtLink>
        <NuxtLink to='/contacts' o-prefetch class="nav-link">Контакты</NuxtLink>
        <NuxtLink to='/about' no-prefetch class="nav-link">О нас</NuxtLink>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
