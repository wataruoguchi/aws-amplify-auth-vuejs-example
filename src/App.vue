<template>
  <div id="app">
    <v-navigation-drawer v-model="sideNav" app right>
      <v-list>
        <v-list-tile v-for="(item, itemIdx) in menuItems" :key="itemIdx" :to="item.link">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.label }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar scroll-off-screen fixed>
      <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>My App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="(item, itemIdx) in menuItems" :key="itemIdx" :to="item.link">{{ item.label }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
            <router-view style="margin-top:70px"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sideNav: false,
    }
  },
  computed: {
    menuItems() {
      return [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "About",
          link: "/about",
        },
        {
          label: "Sign Up",
          link: "/signUp",
        },
        {
          label: "Confirm",
          link: "/signUpConfirm",
        },
        {
          label: "Sign In",
          link: "/signIn",
        },
      ]
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>