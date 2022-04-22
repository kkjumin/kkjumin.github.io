<template>
  <div class="boxOfficeArea">
    <v-row>
      <!-- 오늘의 박스오피스 -->
      <v-col style="margin: 20px 0 0 0">
        <v-card class="mx-auto" max-width="400" tile>
          <v-list rounded>
            <v-subheader
              ><v-icon small style="color: #ff6347">mdi-star</v-icon>오늘의 박스오피스
              <v-btn @click="openSettingPopup()" x-small style="position: absolute; right: 20px"
                ><v-icon x-small>mdi-cog</v-icon></v-btn
              ></v-subheader
            >
            <v-list-item-group v-if="isLoading" color="primary" style="min-height: 50px">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-list-item-group>
            <v-list-item-group v-if="!isLoading" color="primary">
              <v-list-item v-for="(item, i) in boxOffice.dailyBoxOfficeList" :key="i">
                <v-list-item-icon>
                  <v-icon>{{ item.rank }}</v-icon>
                  <span style="margin-left: 20px" :style="rankColor(item.rankInten)">
                    <v-icon x-small :style="rankColor(item.rankInten)">{{
                      rankIntenIcon(item.rankInten)
                    }}</v-icon
                    >{{ item.rankInten.replace('-', '') }}</span
                  >
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.movieNm"
                    style="text-align: left"
                    @click="keywordSearch(item.movieNm)"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <!-- 오늘의 박스오피스 end-->
    </v-row>
  </div>
</template>

<script>
import { DISPATCH_TODAY_BOX_OFFICE, SET_BOX_OFFICE_SETTING_POPUP } from '@/store/types'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  data: () => ({
    alignments: ['start', 'center', 'end'],
    items: [
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
      { text: 'Conversions', icon: 'mdi-flag' },
      { text: 'Conversions', icon: 'mdi-flag' }
    ]
  }),
  created() {
    this.init()
  },
  computed: {
    ...mapState({
      boxOffice: (state) => state.boxOffice,
      nationCode: (state) => state.repNationCd,
      isLoading: (state) => state.isLoading
    }),
    rankColor() {
      return (val) => {
        let color = ''
        if (val > 0) {
          color = 'red'
        } else if (val < 0) {
          color = 'blue'
        } else {
          color = 'black'
        }
        return `color:${color}`
      }
    },
    rankIntenIcon() {
      return (val) => {
        let icon = ''
        val = parseInt(val)
        if (val === 0) {
          icon = 'mdi-minus'
        } else if (val > 0) {
          icon = 'mdi-arrow-up-bold'
        } else {
          icon = 'mdi-arrow-down-bold'
        }
        return icon
      }
    }
  },
  methods: {
    ...mapActions({
      dispatchTodayBoxOffice: DISPATCH_TODAY_BOX_OFFICE
    }),
    ...mapMutations({
      settingPopupToggle: SET_BOX_OFFICE_SETTING_POPUP
    }),
    init() {
      this.dispatchTodayBoxOffice()
    },
    openSettingPopup() {
      console.log('팝업열기')
      this.settingPopupToggle(true)
    },
    keywordSearch(keyword) {
      this.$emit('keyword-search', keyword)
    }
  }
}
</script>

<style>
.boxOfficeArea {
  max-width: 1100px;
  text-align: center;
  margin: 0 auto;
  margin-top: 50px;
}
</style>
