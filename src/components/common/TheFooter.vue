<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card class="indigo lighten-1 white--text text-center">
        <strong class="subheading"></strong>

        <v-spacer></v-spacer>

        <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ['mdi-github', 'mdi-instagram']
  })
}
</script>

<style></style>
