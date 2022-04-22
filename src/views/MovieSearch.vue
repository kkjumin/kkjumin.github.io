<template>
  <div>
    <section>
      <div class="searchArea">
        <input
          v-model="keyword"
          class="searchInput"
          type="text"
          placeholder="키워드를 입력하세요"
          @keyup.enter="searchAction()"
          @click="focus = !focus"
        />
        <button class="searchBtn" @click="searchAction()">검색</button>
      </div>

      <!-- 최근검색어 -->
      <div v-if="focus" class="recentKeywordArea" v-click-outside="outSideClick">
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="(keyword, i) in recentKeyword"
              :key="i"
              @click="clickRecentKeyword(keyword)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="keyword"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon v-text="`mdi-close-circle`"></v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item v-if="_.isEmpty(recentKeyword)">최근 검색어가 없습니다.</v-list-item>
          </v-list-item-group>
        </v-list>
      </div>

      <template v-if="!routeKeywordParams">
        <the-box-office @keyword-search="clickRecentKeyword" />
      </template>

      <template v-if="routeKeywordParams">
        <div v-if="!isMobile" class="genreArea">
          <div class="genreButton" v-for="genre in genreList" :key="genre.key">
            <v-btn :color="activeGenre(genre.key)" elevation="2" @click="clickGenre(genre.key)">{{
              genre.desc
            }}</v-btn>
          </div>
        </div>

        <!-- 영화 리스트 -->
        <div class="movieListArea">
          <v-container fluid>
            <div class="countArea">
              Page {{ page }}/{{ totalPage === 0 ? 1 : totalPage }}
              검색결과 총
              <span style="color: #ff6600">{{ totalCount }}</span
              >건
            </div>
            <v-row dense>
              <template v-for="(movie, i) in movies.items">
                <v-col :key="i" :cols="flexibleCols">
                  <v-card class="mx-auto my-12" max-width="200">
                    <template slot="progress">
                      <v-progress-linear
                        color="deep-purple"
                        height="10"
                        indeterminate
                      ></v-progress-linear>
                    </template>

                    <v-img height="200" :src="movie.image ? movie.image : noImage">
                      <div class="blackBack" @click="goDetail(movie.link)">
                        <v-icon
                          color="#fff"
                          x-large
                          style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
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
                          size="14"
                        ></v-rating>

                        <div class="grey--text ms-4">{{ starToFixed(movie.userRating) }}</div>
                      </v-row>

                      <div
                        class="my-4 text-subtitle-1 ell"
                        style="font-size: 0.9rem !important; height: 60px"
                      >
                        <span v-if="movie.director">감독 :</span> {{ deleteText(movie.director) }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </template>

              <template
                ><v-col v-if="_.isEmpty(movies.items) && !isLoading">
                  <p class="resultEmpty">검색결과가 없습니다.</p>
                </v-col>
              </template>

              <template>
                <v-col v-if="_.isEmpty(movies.items) && isLoading">
                  <p class="resultEmpty">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  </p>
                </v-col>
              </template>
            </v-row>
          </v-container>
        </div>

        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="totalPage || 1"
            circle
            :total-visible="7"
            @input="paging"
          ></v-pagination>
        </div>
      </template>
    </section>
  </div>
</template>

<script>
import { DISPATCH_SEARCH_MOV } from '@/store/types'
import { mapActions, mapState } from 'vuex'
import TheBoxOffice from '@/components/movieSearch/TheBoxOffice.vue'
export default {
  components: { TheBoxOffice },
  name: 'SearchMovie',
  data: () => ({
    page: 1,
    start: 1,
    keyword: '',
    focus: false,
    recentKeyword: [],
    selectedGenre: 99,
    genreList: [
      { key: 99, desc: '전체' },
      { key: 1, desc: '드라마' },
      { key: 2, desc: '판타지' },
      { key: 3, desc: '서부' },
      { key: 4, desc: '공포' },
      { key: 5, desc: '로맨스' },
      { key: 6, desc: '모험' },
      { key: 7, desc: '스릴러' },
      { key: 8, desc: '느와르' },
      { key: 10, desc: '다큐' },
      { key: 11, desc: '코미디' },
      { key: 12, desc: '가족' },
      { key: 13, desc: '미스터리' },
      { key: 14, desc: '전쟁' },
      { key: 15, desc: '애니' },
      { key: 16, desc: '범죄' },
      { key: 17, desc: '뮤지컬' },
      { key: 18, desc: 'SF' },
      { key: 19, desc: '액션' },
      { key: 20, desc: '무협' },
      { key: 21, desc: '에로' },
      { key: 22, desc: '서스펜스' },
      { key: 25, desc: '실험' }
    ]
  }),
  computed: {
    ...mapState({
      movies: (state) => state.movies,
      isLoading: (state) => state.isLoading
    }),
    starToFixed() {
      return (starVal) => {
        let halfVal = parseFloat(starVal) / 2
        return parseFloat(halfVal.toFixed(1))
      }
    },
    activeGenre() {
      return (genreKey) => {
        return genreKey === this.selectedGenre ? 'primary' : ''
      }
    },
    noImage() {
      return require('../assets/images/noImg.png')
    },
    flexibleCols() {
      let cols = 6
      if (this.screenWidth > 1024) {
        cols = 2
      } else if (this.screenWidth <= 1024 && this.screenWidth > 960) {
        cols = 3
      } else if (this.screenWidth <= 960 && this.screenWidth > 500) {
        cols = 4
      } else if (this.screenWidth <= 500) {
        cols = 6
      }
      return cols
    },
    totalCount() {
      return this.movies.total
    },
    totalPage() {
      let totalPage = Math.ceil(this.totalCount / 12)
      return totalPage
    },
    currentLength() {
      return this.movies?.items?.length
    },
    routeKeywordParams() {
      return this.$route.params.keyword
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions({
      dispatchSearchAction: DISPATCH_SEARCH_MOV
    }),
    searchAction() {
      if (this.keyword !== '') {
        if (this.$route.name === 'movieSearchDefault') {
          this.$router.push({ name: 'movieSearch', params: { keyword: this.keyword } })
        } else {
          this.$router.push({ params: { keyword: this.keyword } })
        }

        this.dispatchSearchAction({
          query: this.keyword,
          display: 12,
          start: this.start,
          page: this.page,
          genre: this.selectedGenre === 99 ? '' : this.selectedGenre
        })
        if (this.recentKeyword.length >= 5) {
          this.recentKeyword.splice(4, 1)
        }
        this.recentKeyword.splice(0, 0, this.keyword)
        this.focus = false

        sessionStorage.recentKeyword = JSON.stringify(this.recentKeyword)
      }
    },
    init() {
      if (sessionStorage.recentKeyword) {
        this.recentKeyword = JSON.parse(sessionStorage.recentKeyword)
      }
      if (sessionStorage.page) {
        this.page = parseInt(sessionStorage.page)
      }
      if (sessionStorage.start) {
        this.start = parseInt(sessionStorage.start)
      }
      if (sessionStorage.genre) {
        this.selectedGenre = parseInt(sessionStorage.genre)
      }
      if (this.routeKeywordParams) {
        this.keyword = this.routeKeywordParams
        this.searchAction()
      } else {
        this.keyword = ''
      }
    },
    clickRecentKeyword(keyword) {
      this.focus = false
      this.keyword = keyword
      this.searchAction()
      this.selectedItem = keyword
    },
    deleteText(text) {
      let reg = /.$/
      return text.replace(reg, '')
    },
    clickGenre(key) {
      this.selectedGenre = key
      this.initPage()

      this.dispatchSearchAction({
        query: this.keyword,
        display: 12,
        genre: this.selectedGenre === 99 ? '' : this.selectedGenre
      })

      sessionStorage.genre = key
    },
    paging(page) {
      this.start = 1 * (12 * (page - 1)) + 1
      this.dispatchSearchAction({ query: this.keyword, display: 12, start: this.start })
      sessionStorage.start = this.start
      sessionStorage.page = page
    },
    initPage() {
      this.page = 1
      this.start = 1
      sessionStorage.page = 1
      sessionStorage.start = 1
    },
    goDetail(url) {
      if (url) {
        window.open(url, '_blank')
      }
    },
    outSideClick() {
      this.focus = false
    }
  }
}
</script>

<style>
li {
  list-style: none;
}
.searchArea {
  text-align: center;
  margin-top: 30px;
}
.searchInput {
  border: 1px solid #000;
  border-radius: 5px;
  width: calc(100% - 90px);
  height: 50px;
  padding-left: 10px;
  max-width: 315px;
}
.searchBtn {
  height: 50px;
  background: #000;
  border-radius: 5px;
  width: 80px;
  margin-left: 5px;
  color: #fff;
  line-height: initial;
}

.recentKeywordArea {
  position: absolute;
  z-index: 2;
  display: block;
  border: 1px solid #eee;
  width: 400px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  margin-top: 5px;
  top: 160px;
}
.ell {
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.2em;
  height: 3.6em;
}

.v-image__image--cover {
  background-size: contain;
}
.blackBack {
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.5);
  visibility: hidden;
}
.v-responsive__content:hover .blackBack {
  visibility: visible;
}
.genreArea {
  margin-top: 40px;
}
.genreButton {
  display: inline-block;
  margin: 10px;
}
.resultEmpty {
  text-align: center;
  font-size: 1.5em;
  margin-top: 80px;
  height: 100px;
}
</style>
