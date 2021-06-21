<template>
  <b-container>
      <h1>Раздел управления контентом</h1>
      <p>В  качестве БД используется firebase</p>
      <p>Этот раздел скрыт от просмотра не авторизованными пользователями через значение токен в куках</p>
      <p>Раздел "новости" выводит имеющийся в бд список новостных записей, 
         с возможностью удаления элементов списка. Кнопка "Добавить новость" - отображает форму содержащую 
         поля для ввода значений новостной записи и кнопку сохранения новостной записи</p>
      <p>Раздел "Контакты" предназначен для редактировани списка контактных данных, который хранится в бд</p>
      <p>Раздел "фильмы" имеет форму добавления нового фильма, выводит список имеющихся фильмов и модалку добавления сеансов</p>  
      <p>Кнопка "выход" токен с куков и выбрасывает из админки</p>                 
  </b-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
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
  }
}
</script>