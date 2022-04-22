<template>
  <div>
    <section>
      <!-- 검색영역 -->
      <div class="searchArea">
        <input
          v-model="keyword"
          class="searchInput"
          type="text"
          placeholder="키워드를 입력하세요"
          @keyup.enter="searchButtonClick()"
          @click="focus = !focus"
        />
        <button class="searchBtn" @click="searchButtonClick()">검색</button>
      </div>
      <!-- 검색영역 end -->

      <!-- 최근검색어 -->
      <div v-if="focus" class="recentKeywordArea" v-click-outside="outSideClick">
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="(keyword, i) in recentKeyword" :key="i">
              <v-list-item-content @click="clickRecentKeyword(keyword)">
                <v-list-item-title v-text="keyword"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon @click="recentKeywordDelete(i)">
                <v-icon v-text="`mdi-close-circle`"></v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item v-if="_.isEmpty(recentKeyword)">최근 검색어가 없습니다.</v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
      <!-- 최근검색어 end -->

      <!-- 박스오피스 컴포넌트 -->
      <template v-if="!routeKeywordParams">
        <the-box-office @keyword-search="clickRecentKeyword" />
      </template>
      <!-- 박스오피스 컴포넌트 end-->

      <template v-if="routeKeywordParams">
        <!-- 검색 후 장르버튼 -->
        <div v-if="!isMobile" class="genreArea">
          <div class="genreButton" v-for="genre in genreList" :key="genre.key">
            <v-btn :color="activeGenre(genre.key)" elevation="2" @click="clickGenre(genre.key)">{{
              genre.desc
            }}</v-btn>
          </div>
        </div>
        <!-- 검색 후 장르버튼 end -->

        <!-- 모바일 전용 장르 셀렉트박스-->
        <div v-if="isMobile" class="genreArea">
          <v-select
            :items="genreList"
            item-text="desc"
            item-value="key"
            label="장르"
            solo
            v-model="selectedGenre"
            @change="clickGenre(selectedGenre)"
          ></v-select>
        </div>
        <!-- 모바일 전용 장르 셀렉트박스 end-->

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
                  <!-- 영화 컴포넌트 -->
                  <movie-content :movie="movie" />
                  <!-- 영화 컴포넌트 end-->
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
        <!-- 영화 리스트 end -->

        <!-- 페이지네이션 -->
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="totalPage || 1"
            circle
            :total-visible="7"
            @input="paging"
          ></v-pagination>
        </div>
        <!-- 페이지네이션 end-->
      </template>
    </section>
  </div>
</template>

<script>
import { DISPATCH_SEARCH_MOV } from '@/store/types'
import { mapActions, mapState } from 'vuex'
import TheBoxOffice from '@/components/movieSearch/TheBoxOffice.vue'
import MovieContent from '@/components/movieSearch/MovieContent.vue'
export default {
  components: { TheBoxOffice, MovieContent },
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
      isLoading: (state) => state.isLoading,
      display: (state) => state.display
    }),

    activeGenre() {
      return (genreKey) => {
        return genreKey === this.selectedGenre ? 'primary' : ''
      }
    },

    flexibleCols() {
      let cols = 6
      if (this.screenWidth > 1600) {
        cols = 1
      } else if (this.screenWidth <= 1600 && this.screenWidth > 1100) {
        cols = 2
      } else if (this.screenWidth <= 1100 && this.screenWidth > 800) {
        cols = 3
      } else if (this.screenWidth <= 800 && this.screenWidth > 620) {
        cols = 4
      } else if (this.screenWidth <= 620) {
        cols = 6
      }
      return cols
    },
    totalCount() {
      return this.movies.total
    },
    totalPage() {
      let totalPage = Math.ceil(this.totalCount / this.display)
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
    searchButtonClick() {
      sessionStorage.page = 1
      sessionStorage.start = 1
      this.page = 1
      this.start = 1
      this.searchAction()
    },

    searchAction() {
      if (this.keyword !== '') {
        if (this.$route.name === 'movieSearchDefault') {
          this.$router.push({ name: 'movieSearch', params: { keyword: this.keyword } })
        } else {
          this.$router.push({ params: { keyword: this.keyword } })
        }

        this.dispatchSearchAction({
          query: this.keyword,
          display: this.display,
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
      this.facetClear()
      this.focus = false
      this.keyword = keyword
      this.searchAction()
      this.selectedItem = keyword
    },

    clickGenre(key) {
      this.selectedGenre = key
      this.initPage()

      this.dispatchSearchAction({
        query: this.keyword,
        display: this.display,
        genre: this.selectedGenre === 99 ? '' : this.selectedGenre
      })

      sessionStorage.genre = key
    },
    paging(page) {
      this.start = 1 * (this.display * (page - 1)) + 1
      this.dispatchSearchAction({ query: this.keyword, display: this.display, start: this.start })
      sessionStorage.start = this.start
      sessionStorage.page = page
    },
    initPage() {
      this.page = 1
      this.start = 1
      sessionStorage.page = 1
      sessionStorage.start = 1
    },

    outSideClick() {
      this.focus = false
    },
    facetClear() {
      sessionStorage.removeItem('page')
      sessionStorage.removeItem('genre')
      sessionStorage.removeItem('start')
    },
    recentKeywordDelete(i) {
      this.recentKeyword.splice(i, 1)
      sessionStorage.recentKeyword = JSON.stringify(this.recentKeyword)
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
  border: 2px solid #000;
  border-radius: 15px;
  width: calc(100% - 90px);
  height: 50px;
  padding-left: 10px;
  max-width: 315px;
  display: inline-block;
}
.searchBtn {
  height: 50px;
  background: #000;
  border-radius: 15px;
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
  width: 80%;
  max-width: 400px;
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
  background-size: cover;
  border-radius: 20px 20px 0px 0px;
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
