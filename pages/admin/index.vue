<template>
    <b-container>
        <h1>Раздел управления контентом</h1>
        <p>Для имитации работы с сервером используется localStorage</p>

        <p>Этот раздел скрыт от просмотра не авторизованными пользователями через значение authorization в localStorage.</p>
        <p>Раздел "новости" выводит имеющийся в localStorage список новостных записей, 
           с возможностью удаления элементов списка. Кнопка "Добавить новость" - отображает форму содержащую 
           поля для ввода значений новостной записи и кнопку сохранения новостной записи</p>
        <p>Раздел "Контакты" предназначен для редактировани списка контактных данных, который хранится  
           в localStorage</p>
        <p>Раздел "фильмы" в разработке</p>  
        <p>Кнопка "выход" удаляет информацию о успешной авторизации из localStorage и выбрасывает из админки</p>                 
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
      console.log('server', req.headers)
      const user = getUserFromCookie(req)
      if (!user) {
        console.log('redirecting server')
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