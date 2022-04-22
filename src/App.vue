<template>
  <v-app>
    <the-header />
    <the-side-menu />
    <div class="contents">
      <router-view></router-view>
    </div>
    <the-floating-button />
    <popup-box-office-setting />
    <the-footer />
  </v-app>
</template>

<script>
import TheFloatingButton from './components/common/TheFloatingButton.vue'
import TheFooter from './components/common/TheFooter.vue'
import TheHeader from './components/common/TheHeader.vue'
import TheSideMenu from './components/common/TheSideMenu.vue'
import PopupBoxOfficeSetting from './components/movieSearch/PopupBoxOfficeSetting.vue'
export default {
  components: { TheHeader, TheFooter, TheSideMenu, TheFloatingButton, PopupBoxOfficeSetting }
}
</script>
<style scoped>
.contents {
  min-height: 100%;
  padding: 20px 50px 20px 50px;
}
</style>
