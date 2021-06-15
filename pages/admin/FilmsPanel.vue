<template>
    <b-container>
        <div class="alert alert-warning" role="alert">Этот раздел в разработке</div>
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