<template>
  <div class="fbArea" :class="buttonToggle">
    <v-btn class="mx-2" fab dark color="indigo" @click="scrollTop()">
      <v-icon dark x-large> mdi-arrow-up-bold-hexagon-outline </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false
  }),
  computed: {
    buttonToggle() {
      return this.currentScroll >= 150 ? 'buttonShow' : ''
    }
  },
  methods: {
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style>
.fbArea {
  position: fixed;
  bottom: -60px;
  right: 10px;
  z-index: 2;
  transform: rotate(-180deg);
  transition: 0.3s;
}

.buttonShow {
  bottom: 18px;
  transform: rotate(0deg);
}
</style>
