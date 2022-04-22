<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card class="indigo lighten-1 white--text text-center">
        <strong class="subheading"></strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="(item, i) in linkList"
          :key="i"
          class="mx-4"
          dark
          icon
          @click="goLink(item.link)"
        >
          <v-icon size="24px">
            {{ item.icon }}
          </v-icon>
        </v-btn>
      </v-card>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Jumin</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    linkList: [
      {
        icon: 'mdi-github',
        link: 'https://github.com/kkjumin'
      }
    ]
  }),
  methods: {
    goLink(link) {
      window.open(link)
    }
  }
}
</script>

<style></style>
