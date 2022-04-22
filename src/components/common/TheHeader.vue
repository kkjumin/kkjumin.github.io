<template>
  <header>
    <!-- 툴바 -->
    <v-toolbar elevation="4">
      <v-app-bar-nav-icon @click="setMenuToggle"></v-app-bar-nav-icon>
      <h2 style="margin: 0 auto; cursor: pointer" @click="goTo('home')">
        <v-icon large style="margin-right: 10px">mdi-movie-open-outline</v-icon>
        <v-icon>MOVIE SEARCH</v-icon>
      </h2>
    </v-toolbar>
  </header>
</template>

<script>
import { SET_MENU_TOGGLE } from '@/store/types'
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      sideMenuShow: (state) => state.sideMenuShow
    })
  },
  methods: {
    ...mapMutations({
      setMenuToggle: SET_MENU_TOGGLE
    }),
    clickToggle() {
      this.setMenuToggle(true)
    }
  }
}
</script>

<style></style>
