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