<template>
  <v-card class="mx-auto my-12" max-width="150" style="border-radius: 20px">
    <template slot="progress">
      <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
    </template>

    <v-img height="200" :src="movie.image ? movie.image : noImage">
      <div class="blackBack" @click="goDetail(movie.link)">
        <v-icon color="#fff" x-large style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
          >mdi-magnify-scan</v-icon
        >
      </div>
    </v-img>
    <v-divider></v-divider>
    <v-card-title
      class="ell"
      style="font-size: 0.9rem; line-height: 2rem; height: 88px"
      v-html="movie.title"
    ></v-card-title>

    <v-divider></v-divider>
    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="starToFixed(movie.userRating)"
          color="amber"
          dense
          half-increments
          readonly
          size="10"
        ></v-rating>

        <div class="grey--text ms-4">{{ starToFixed(movie.userRating) }}</div>
      </v-row>

      <div class="my-4 text-subtitle-1 ell" style="font-size: 0.9rem !important; height: 60px">
        <span v-if="movie.director">감독 :</span> {{ deleteText(movie.director) }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: { movie: { type: Object } },
  computed: {
    starToFixed() {
      return (starVal) => {
        let halfVal = parseFloat(starVal) / 2
        return parseFloat(halfVal.toFixed(1))
      }
    },
    noImage() {
      return require('../../assets/images/noImg.png')
    }
  },
  methods: {
    goDetail(url) {
      if (url) {
        window.open(url, '_blank')
      }
    },
    deleteText(text) {
      let reg = /.$/
      return text.replace(reg, '')
    }
  }
}
</script>

<style></style>
