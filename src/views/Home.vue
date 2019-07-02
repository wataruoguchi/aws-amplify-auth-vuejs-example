<template>
  <div class="home">
    <v-btn @click="signOut">Sign Out</v-btn>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {signOut} from '@/utils/auth.js'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    signOut() {
      signOut().then((data) => console.log('DONE', data)).catch((err) => console.log('SIGN OUT ERR', err));
    }
  }
}
</script>
