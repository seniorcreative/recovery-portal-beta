<template>
  <div>
    <mast-head :searchable="true" />

    <section
      v-if="contentObject && contentObject.dataCategories"
      class="container text-left pb-0"
    >
      <h3 class="text-blue text-lg md:text-xl text-left my-3 leading-6">
        Find answers to common WorkCover questions
      </h3>
      <div class="grid grid-cols-2 gap-4">
        <div
          class="mt-3 col-span-2 md:col-span-1"
          v-bind:key="category.ID"
          v-for="(category, i) in contentObject.dataCategories.Workers.Guided"
        >
          <article
            class="
              block
              rounded-xl
              border-2
              border-solid 
              border-gray-variant-1
              p-4
              md:py-4
            "
          >
            <div class="flex items-center md:items-start relative panel-h-200">
              <i
                class="text-4xl mr-4 d:text-7xl text-blue self-center"
                v-bind:class="getIconClass(i)"
                style="line-height: 0 !important"
              ></i>
              <div
                class="
                  w-full
                  md:w-auto
                  pr-0
                  flex
                  justify-between
                  md:flex-col
                  self-start
                  items-center
                  md:items-start
                "
              >
                <router-link
                  :to="getAllLink(i)"
                  class="
                    block
                    leading-6
                    cursor-pointer
                    font-bold
                    text-blue text-left text-xl
                    md:text-lg
                    hover:underline
                  "
                  >{{ i }}</router-link
                >

                <span class="cursor-pointer icon-wrapper block md:hidden">
                  <i class="icon-chevron-right text-blue" />
                </span>

                <ul class="hidden md:block">
                  <li
                    v-for="(link, ii) in getPanelLinks(i)"
                    class="py-1 mt-2 hover:underline"
                    v-bind:key="ii"
                  >
                    <router-link
                      :to="getLink(i, link.ID)"
                      class="block leading-4 text-black text-sm no-underline"
                      >{{ contentFilter(link.CONTENT.TITLE) }}</router-link
                    >
                  </li>
                  <li class="mt-4">
                    <router-link :to="getAllLink(i)" class="font-bold underline"
                      ><strong>See all</strong></router-link
                    >
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
      <feedback-plus
        :content-page-id="40"
        :option-type="'thumbs'"
      ></feedback-plus>
      <div class="block mb-6"></div>
      <div class="block mt-6 page-divider"></div>
      <h3 class="mt-6 mb-4 text-blue text-xl">General help articles</h3>
    </section>
    <general-tiles></general-tiles>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { shuffle, iconClassMap } from '../shared/utils'
import GeneralTiles from './GeneralTiles.vue'
import FeedbackPlus from '../components/FeedbackPlus.vue'
import MastHead from './MastHead.vue'

const CAT_DELIM = " > "

export default {
  name: 'HelpCentreDashboard',
  components: { GeneralTiles, FeedbackPlus, MastHead },
  props: {
    pageName: String
  },
  data() {
    return {
      shuffle,
      iconClassMap,
      panelLinks: {}
    }
  },
  methods: {
    getPanelLinks(panelCategory) {
      let tmpPanellinks = []
      for (let k = 0; k < this.contentObject.knowledge.length; k++) {
        let knowledgeItem = this.contentObject.knowledge[k]
        if (knowledgeItem.CATEGORIES && knowledgeItem.CATEGORIES.categories.length) {
          let knowledgeCategories = knowledgeItem.CATEGORIES.categories.map(e => { for (let c in e) { return e.PARENT != 'null' ? `${e.PARENT} > ${e.CATEGORY}` : e.CATEGORY } })
          // Under Guided >  
          if (knowledgeCategories.indexOf(panelCategory) !== -1) {
            tmpPanellinks.push(knowledgeItem)
          } else {
            // Under Guided > Sub Category > 
            for (let kc = 0; kc < knowledgeCategories.length; kc++) {
              if (knowledgeCategories[kc].split(CAT_DELIM).indexOf(panelCategory) !== -1) {
                tmpPanellinks.push(knowledgeItem)
              }
            }
          }
        }
      }
      function compare(a, b) {
        if (a.VOTE_SCORE < b.VOTE_SCORE) {
          return 1
        }
        if (a.VOTE_SCORE > b.VOTE_SCORE) {
          return -1
        }
        return 0
      }
      tmpPanellinks.sort(compare)
      this.panelLinks[panelCategory] = tmpPanellinks.slice(0, 3)
      return this.panelLinks[panelCategory]
    },
    getLink(link, linkid) {
      const splitLink = link.split(' ').join('-').toLowerCase()
      const builtLink = { name: splitLink, params: { opened: linkid } }
      var matomoSiteId = window.location.host.split('.')[0] === 'wsv-innovation-centre' ? '3' : '5'
      if (matomoSiteId !== '5') {
        window._paq.push(['trackEvent', 'Help Category', 'clicked', splitLink])
      }
      return builtLink
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
    gotoLink(link) {
      const splitLink = link.split(' ').join('-').toLowerCase()
      const builtLink = { name: splitLink, params: { opened: 'all' } }
      var matomoSiteId = window.location.host.split('.')[0] === 'wsv-innovation-centre' ? '3' : '5'
      if (matomoSiteId !== '5') {
        window._paq.push(['trackEvent', 'Help Category - All', 'clicked', splitLink])
      }
      this.$router.push(builtLink)
    },
    getIconClass(i) {
      const iconClass = this.iconClassMap[i.split(' ').join('_').toLowerCase()]
      return iconClass
    }
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
  }
}
</script>

<style lang="scss" scoped>
.help-section {
  padding: 80px 0 45px 0;
  position: relative;
  color: #ffffff;
  background-image: url(../assets/help_centre_bg_image_gradient.png);
  width: 100%;
  min-height: 275px;
  background-size: cover;

  p {
    margin: 26px 0;
    font-size: 26px;
    line-height: 1.2;
  }
}

.mast-heading {
  max-width: 500px;
}

.main-section {
  @media (min-width: 1024px) {
    padding: 32px 12px 12px 12px;
  }
  @media (max-width: 1023px) {
    padding: 24px 12px 12px 12px;
  }
}

.personalisation-bar {
  background: orange;
  padding: 1.2em 0;
  width: 100%;
  position: relative;
  top: -6px;
}

.icon-wrapper {
  position: relative;
  top: 2px;
}

.padding-topbottom {
  @media (min-width: 1024px) {
    padding-top: 24px !important;
  }
  @media (max-width: 1023px) {
    padding-top: 0.75rem !important;
  }
}
</style>
