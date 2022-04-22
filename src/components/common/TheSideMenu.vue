<template>
  <!-- 사이드메뉴 -->
  <v-navigation-drawer v-model="toggle" absolute temporary>
    <!-- 프로필 아이콘 -->
    <!-- <v-list-item>
      <v-list-item-avatar width="200" height="200" style="margin: 20px 0px 0px 15px">
        <v-img height="200" src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>
    </v-list-item> -->

    <!-- 프로필 리스트 -->
    <v-list dense>
      <v-list-item>
        <v-icon>mdi-account</v-icon>
        <v-list-item-title style="margin-left: 10px">{{ myInfo.name }}</v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-icon>mdi-cake-variant-outline</v-icon>
        <v-list-item-title style="margin-left: 10px">{{ myInfo.birth }}</v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-icon>mdi-email</v-icon>
        <v-list-item-title style="margin-left: 10px">{{ myInfo.email }}</v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-icon>mdi-phone </v-icon>
        <v-list-item-title style="margin-left: 10px">{{ myInfo.cellPhone }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <!-- 메뉴리스트 -->
    <v-list>
      <v-list-item v-for="menu in menuList" :key="menu.title" link @click="goTo(menu.path)">
        <v-list-item-icon>
          <v-icon>{{ menu.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { SET_MENU_TOGGLE } from '@/store/types'
import { mapMutations, mapState } from 'vuex'
export default {
  data: () => ({
    myInfo: {
      name: '이주민',
      birth: '1990.06.04',
      email: 'kkjumin@gmail.com',
      cellPhone: '010-6865-5196'
    },
    menuList: [
      // { title: '홈', icon: 'mdi-view-dashboard', path: 'home' },
      { title: '영화검색', icon: 'mdi-movie', path: 'movieSearchDefault' }
    ]
  }),
  computed: {
    ...mapState({
      sideMenuShow: (state) => state.sideMenuShow,
      isLoading: (state) => state.isLoading
    }),
    toggle: {
      get() {
        return this.sideMenuShow
      },
      set(val) {
        this.setMenuToggle(val)
      }
    }
  },
  methods: {
    ...mapMutations({
      setMenuToggle: SET_MENU_TOGGLE
    }),
    goTo(val) {
      this.$router.push({ name: val })
    }
  }
}
</script>

<style></style>
