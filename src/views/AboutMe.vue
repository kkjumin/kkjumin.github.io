<template>
  <div>
    <h1>test</h1>
    <section>
      <div class="searchArea">
        <input
          v-model="keyword"
          class="searchInput"
          type="text"
          placeholder="키워드를 입력하세요"
          @keyup.enter="searchAction()"
        />
        <button class="searchBtn" @click="searchAction()">검색</button>
      </div>
      <div class="recentKeywordArea">
        <v-list>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon v-text="`mdi-close-circle`"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </section>
  </div>
</template>

<script>
import { DEPATCH_SEARCH_MOV } from '@/store/types'
import { mapActions } from 'vuex'
export default {
  name: 'SearchMovie',
  data: () => ({
    items: [{ text: 'test' }, { text: 'tets2' }, { text: 'test3' }],
    selectedItem: 1,
    keyword: ''
  }),
  methods: {
    ...mapActions({
      dispatchSearchAction: DEPATCH_SEARCH_MOV
    }),
    searchAction() {
      if (this.keyword === '') return alert('키워드를 입력 해주세요')
      console.log(this.keyword)
      this.dispatchSearchAction({ query: this.keyword })
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
}
.searchInput {
  border: 1px solid #000;
  border-radius: 5px;
  width: 315px;
  height: 50px;
  padding-left: 10px;
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
  display: block;
  border: 1px solid #eee;
  width: 400px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  margin-top: 5px;
}
</style>
