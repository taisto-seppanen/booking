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
            <NuxtLink
              class="nav-link"
              no-prefetch
              to="/"
              >Новинки кино</NuxtLink
            >
          </li>

          <li class="nav-item">
            <NuxtLink to='/films' no-prefetch class="nav-link" aria-disabled="true"
              >Сейчас в прокате</NuxtLink
            >

          <li class="nav-item">
            <NuxtLink to='/contacts' o-prefetch class="nav-link" aria-disabled="true"
              >Контакты</NuxtLink
            >
          </li>
          <li class="nav-item">
            <NuxtLink to='/about' no-prefetch class="nav-link" aria-disabled="true"
              >О нас</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>
</template>

<style>


@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
