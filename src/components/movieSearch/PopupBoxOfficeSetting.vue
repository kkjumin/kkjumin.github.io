<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <v-card>
        <v-card-text style="height: 150px">
          <v-radio-group v-model="nationCode" column>
            <v-radio label="전체" value=""></v-radio>
            <v-radio label="국내영화" value="K"></v-radio>
            <v-radio label="해외영화" value="F"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text right @click="popupClose"> close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {
  DISPATCH_TODAY_BOX_OFFICE,
  SET_BOX_OFFICE_SETTING_POPUP,
  SET_NATION_CODE
} from '@/store/types'
import { mapActions, mapMutations, mapState } from 'vuex'
import moment from 'moment'
export default {
  data() {
    return {
      dialogm1: ''
      //       dialog: false
    }
  },
  computed: {
    ...mapState({
      dialogInfo: (state) => state.boxOfficeSettingPopup,
      nationCodeInfo: (state) => state.repNationCd
    }),
    dialog: {
      get() {
        return this.dialogInfo
      },
      set(val) {
        this.popupToggle(val)
      }
    },
    nationCode: {
      get() {
        return this.nationCodeInfo
      },
      set(val) {
        this.setNationCode(val)
      }
    },
    statisticsDate() {
      let date = new Date()
      date.setDate(date.getDate() - 1)
      return moment(date).format('YYYYMMDD')
    }
  },
  methods: {
    ...mapActions({
      dispatchTodayBoxOffice: DISPATCH_TODAY_BOX_OFFICE
    }),
    ...mapMutations({
      popupToggle: SET_BOX_OFFICE_SETTING_POPUP,
      setNationCode: SET_NATION_CODE
    }),
    popupClose() {
      this.popupToggle(false)
    }
  },
  watch: {
    nationCodeInfo() {
      this.dispatchTodayBoxOffice({ targetDt: this.statisticsDate })
    }
  }
}
</script>

<style></style>
