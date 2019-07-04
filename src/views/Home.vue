<template>
  <div class="home">
    <div>
      <img alt="Vue logo" src="../assets/logo.png">
    </div>
    <v-btn @click="signOut">Sign Out</v-btn>
  </div>
</template>

<script>
// @ is an alias to /src
import {signOut} from '@/utils/auth.js'
export default {
  name: 'home',
  methods: {
    signOut() {
      signOut().then((data) => console.log('DONE', data)).catch((err) => console.log('SIGN OUT ERR', err));
    }
  }
}
</script>
