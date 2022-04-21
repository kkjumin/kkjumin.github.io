import debounce from 'lodash.debounce'

export const getScrollEvent = {
  data: () => ({
    currentScroll: 0,
    screenWidth: window.innerWidth
  }),
  mounted() {
    this.handleDebouncedScroll = debounce(this.scrollEvent, 1)
    document.getElementById('app').addEventListener('scroll', this.handleDebouncedScroll)
    window.addEventListener('resize', this.getScreenWidth)
  },
  beforeDestroy() {
    document.getElementById('app').removeEventListener('scroll', this.handleDebouncedScroll)
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
      let scrollY = document.getElementById('app').scrollTop
      this.currentScroll = scrollY
    },
    getScreenWidth() {
      this.screenWidth = window.innerWidth
    }
  }
}
