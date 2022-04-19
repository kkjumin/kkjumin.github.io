<template>
  <header>
    <!-- 툴바 -->
    <v-toolbar elevation="4">
      <v-app-bar-nav-icon @click="setMenuToggle"></v-app-bar-nav-icon>
      <h1 style="margin: 0 auto"></h1>
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
