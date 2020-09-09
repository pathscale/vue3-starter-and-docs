<template>
  <div id="app">
    <v-navbar>
      <template #start>
        <v-navbar-item tag="router-link" :to="{ path: '/' }">
          Home
        </v-navbar-item>
        <v-navbar-item tag="router-link" :to="{ path: '/validation' }">
          Form validation
        </v-navbar-item>
        <v-navbar-item tag="router-link" :to="{ path: '/router' }">
          Router
        </v-navbar-item>
      </template>
    </v-navbar>
    <router-view/>
  </div>
</template>

<script>
import { VNavbar, VNavbarItem } from "@pathscale/vue3-ui"
const App = {
  name: 'App',
  components: { VNavbar, VNavbarItem }
}

export default App;
</script>

<style scoped>
</style>