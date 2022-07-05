<template>
  <div>
    <mast-head :searchable="true" />
    <div class="px-5">
      <div v-show="loading" class="loading-panel">
        <div class="">
          <h1 class="w-full text-xl text-blue text-center mt-4">
            Please wait...
          </h1>
        </div>
      </div>
      <p v-show="!loading" class="text-blue mt-6 text-center">
        {{ faqResults.length }} result{{
          faqResults.length !== 1 ? "s" : ""
        }}
        found for<br><strong class="text-blue">"{{ searchval }}"</strong>
      </p>
      <!-- Loop faq search results -->
      <faq-accordion-item
        v-for="(item, index) in faqResults"
        v-bind:key="index"
        :contentId="item.ID"
        :opened="isOpen(item.ID)"
        :q="item.CONTENT.QUESTION__C"
        :a="item.CONTENT.ANSWER__C"
      >
      </faq-accordion-item>

      <p v-show="!loading" class="text-blue mt-12 mb-4 text-center">
        Check out these topics on<br /><strong class="text-blue"
          >"{{ searchval }}"</strong
        >
      </p>
      <!-- NB: Looped router links have to be a block -->
      <router-link
        v-for="(item, index) in generalResults"
        :to="getLink(item)"
        v-bind:key="index"
        class="block
        mt-3 rounded-xl border border-solid border-gray-dark py-2 px-0 md:mx-48 lg:mx-80"
      >
        <div class="flex items-center relative">
          <i
            class="m-3 text-4xl text-blue"
            style="line-height: 0 !important;"
            v-bind:class="getIconClass(item)"
          ></i>
          <div class="w-full pr-2 flex justify-between items-center">
            <p
              class="
                flex
                justify-between
                font-bold
                text-blue text-left
                leading-5
              "
              >{{ item.CONTENT.TITLE }}</p>

            <span class="icon-wrapper block">
              <i class="icon-chevron-right text-blue" />
            </span>

          </div>

        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'
import { iconClassMap } from '../../shared/utils'
import MastHead from '../MastHead.vue'
import FaqAccordionItem from '../FaqAccordionItem.vue'
export default {
  name: 'SearchPage',
  components: {
    MastHead,
    FaqAccordionItem
  },
  data() {
    return {
      searchresults: [],
      faqResults: [],
      generalResults: [],
      searchval: this.$route.query.q,
      loading: false,
      openedId: null,
      iconClassMap
    }
  },
  props: {
    pageName: String
  },
  mounted() {
    this.GetSearchResults(this, this.searchval)
  },
  computed: {
    ...mapState(['content']),
    ...mapGetters({ contentFilter: 'content/getFilteredContent' }),
    contentObject() {
      return this.$store.state && this.$store.state.content.contentData
    },
    pageContent() {
      return this.$store.state && this.$store.state.content.contentData.pages[this.pageName].content
    },
    backgroundImage() {
      return `background-image: url(../assets/help_centre_bg_image.jpg); width: 100%; min-height: 275px; background-size: cover;`;
    }
  },
  methods: {
    search: function (searchtext) {
      this.searchval = searchtext
      const builtLink = { name: "search", query: { q: this.searchval } }
      this.$router.push(builtLink)
      this.GetSearchResults(this, this.searchval)
    },
    getLink: function (item) {
      let target = this.contentObject.knowledge.find(x => x.ID === item.ID)
      let url = "#"
      if (target.CATEGORIES && target.CATEGORIES.categories.length) {
        let link = target.CATEGORIES.categories.map(e => { for (let c in e) { return e.PARENT != 'null' ? `${e.PARENT} > ${e.CATEGORY}` : e.CATEGORY } })
        link = link.map(x => x = x.split(" > ")[0])
        link.forEach(element => {
          let i = Object.keys(this.contentObject.dataCategories.Workers.Guided).indexOf(element)
          if (i === -1) {
            url = { name: 'general', params: { articleId: target.ID } }
          } else {
            url = { name: link[0].split(' ').join('-').toLowerCase(), params: { opened: target.ID } }
          }
        })
      }
      return url
    },
    gotoLink(item) {
      const link = this.getLink(item)
      var matomoSiteId = window.location.host.split('.')[0] === 'wsv-innovation-centre' ? '3' : '5'
      if (matomoSiteId !== '5') {
        window._paq.push(['trackEvent', 'Help Category - All', 'clicked', link])
      }
      this.$router.push(link)
    },
    getAllLink(link) {
      const splitLink = link.split(' ').join('-').toLowerCase()
      const builtLink = { name: splitLink, params: { opened: 'all' } }
      var matomoSiteId = window.location.host.split('.')[0] === 'wsv-innovation-centre' ? '3' : '5'
      if (matomoSiteId !== '5') {
        window._paq.push(['trackEvent', 'Help Category - All', 'clicked', builtLink])
      }
      return builtLink
    },
    getIconClass(item) {
      let classSplit = item.CONTENT.CATEGORIES[item.CONTENT.CATEGORIES.length - 1].split(" > ")[0]
      classSplit = classSplit.split(" ").join("_").toLowerCase()
      const iconClass = this.iconClassMap[classSplit]
      return iconClass
    },
    GetSearchResults: async function (_this, query) {
      this.loading = true
      const axiosInstance = axios.create()
      const knowledge = await axiosInstance.get(`search/${query}`)
      this.loading = false
      this.searchresults = knowledge.data.data
      // Divide the search results into two categories as per design
      this.faqResults = this.searchresults.filter(i => {
        if (i.CONTENT.QUESTION__C) {
          return i
        }
      })
      this.generalResults = this.searchresults.filter(i => {
        if (!i.CONTENT.QUESTION__C) {
          return i
        }
      })
    },
    isOpen(id) {
      return this.openedId == id
    }
  }
}
</script>

<style lang="scss" scoped>
.search-results-list {
  li {
    margin-top: 10px;
    padding: 10px;
    &:nth-child(2n) {
      background-color: #eee;
    }
  }
}

.category-list {
  i {
    font-size: 1rem !important;
  }
  span:not(:last-child):after {
    content: ", ";
  }
  .loading-panel {
    position: fixed;
    top: 20%;
    left: 50%;
    text-align: center;
    .bg {
      position: static;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #ccc;
      opacity: 0.5;
    }
  }
}
</style>