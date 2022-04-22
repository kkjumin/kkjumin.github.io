import debounce from 'lodash.debounce'

export const getScrollEvent = {
  data: () => ({
    currentScroll: 0,
    screenWidth: window.innerWidth
  }),
  mounted() {
    this.handleDebouncedScroll = debounce(this.scrollEvent, 1)
    window.addEventListener('scroll', this.handleDebouncedScroll)
    window.addEventListener('resize', this.getScreenWidth)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
    window.removeEventListener('resize', this.getScreenWidth)
  },
  computed: {
    deviceType() {
      return this.screenWidth <= 800 ? 'MOBILE' : 'PC'
    },
    isMobile() {
      return this.screenWidth <= 800 ? true : false
    }
  },
  methods: {
    scrollEvent() {
      let scrollY = window.scrollY
      this.currentScroll = scrollY
    },
    getScreenWidth() {
      this.screenWidth = window.innerWidth
    }
  }
}
