export const goTo = {
  methods: {
    goTo(routerName) {
      this.$router.push({ name: routerName })
    }
  }
}
