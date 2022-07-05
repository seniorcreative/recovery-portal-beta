<template>
  <section v-if="contentObject" class="container text-left">
    <div>
      <router-link to="/help" class="text-gray flex start-padding"><span class="relative" style="left: -4px;"><i class="relative icon-chevron-left mr-2" style="top: 4px; left: 4px;"></i></span>Home</router-link>
      <div class="flex justify-start items-center my-4 py-2">
        <i class="text-blue text-left text-5xl mr-4" v-bind:class="getIconClass(categoryTitle)"></i>
        <p class="text-2xl text-blue font-bold leading-6">{{categoryTitle}}</p>
      </div>
      <div class="page-divider"></div>
    </div>
    <div v-for="(category, c) in pageData" v-bind:key="c">
      <!-- numKeys {{numKeys}} -->
        <p v-if="numKeys > 1" class="text-l section-title text-blue font-bold">{{convertTitleKey(c)}}</p>
        <p v-if="numKeys <= 1" class="text-l section-title-blank text-blue font-bold"></p>
        <faq-accordion-item v-for="(item, f) in category" 
          v-bind:key="f"
          :contentId="item.ID"
          :opened="isOpen(item.ID)"
          :q=item.CONTENT.QUESTION__C 
          :a=item.CONTENT.ANSWER__C>
        </faq-accordion-item>
    </div>
    <!-- general help articles -->    
    <div class="block mt-6  page-divider"></div>
    <feedback-plus :content-page-id="41" :option-type="'thumbs'"></feedback-plus>
    <div class="mb-6"></div>
    <!-- Contains a scrollable wrapper -->
    <div v-if="filteredIds && filteredIds.length">
      <div class="block mt-6  page-divider"></div>
      <p class="text-blue helparticlesheading font-bold main-headings">General help articles</p>
      <general-tiles :filter-ids="filteredIds"></general-tiles>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { capitalizeFirstLetter } from '../shared/utils'
import { iconClassMap } from '../shared/utils'
import FaqAccordionItem from './FaqAccordionItem.vue'
import GeneralTiles from './GeneralTiles.vue'
import FeedbackPlus from '../components/FeedbackPlus.vue'

const CAT_DELIM = ' > '
// const GENERAL_RECORDTYPEID = '0125P000000MfiiQAC'

export default {
  components: { FaqAccordionItem, GeneralTiles, FeedbackPlus },
  name: 'HelpArticleFaqPage',
  props: {
    categoryTitle: String
  },
  data () {
    return {
      iconClassMap,
      capitalizeFirstLetter,
      openedId: null,
      pageName: null,
      pageData: null,
      numKeys: 0
    }
  },
  methods: {
    getPageData() {
      let tmpPageData = {}
      for (let k = 0; k < this.contentObject.knowledge.length; k++) {
        let knowledgeItem = this.contentObject.knowledge[k]
        if (knowledgeItem.CATEGORIES && knowledgeItem.CATEGORIES.categories.length) {
          let knowledgeCategories = knowledgeItem.CATEGORIES.categories.map(e => {for (let c in e) {return e.PARENT != 'null' ? `${e.PARENT} > ${e.CATEGORY}` : e.CATEGORY}})
          for (let c = 0; c < knowledgeCategories.length; c++) {
            let categoryKey = knowledgeCategories[c].split(' ').join('-').toLowerCase()
            if (categoryKey === this.pageName) {
              if (!tmpPageData[categoryKey]) {
                tmpPageData[categoryKey] = []
              }
              if (knowledgeItem.CONTENT.QUESTION__C !== '') {
                tmpPageData[categoryKey].push(knowledgeItem)
              }
            }
            if (knowledgeCategories[c].split(CAT_DELIM).length > 1) {
              let catSplit = knowledgeCategories[c].split(CAT_DELIM)
              let firstParentKey = catSplit[0].split(' ').join('-').toLowerCase()
              let childCategoryKey = catSplit[1].split(' ').join('-').toLowerCase()
              if (firstParentKey === this.pageName) {
                  if (!tmpPageData[childCategoryKey]) {
                    tmpPageData[childCategoryKey] = []
                  }
                  if (knowledgeItem.CONTENT.QUESTION__C !== '') {
                      tmpPageData[childCategoryKey].push(knowledgeItem)
                  }
              }
            }
          }
        }
      }
      this.numKeys = Object.keys(tmpPageData).length
      this.pageData = tmpPageData
    },
    convertTitleKey ( t ) {
      return this.capitalizeFirstLetter(t.split('-').join(' '))
    },
    isOpen ( id ) {
      return this.openedId == id
    },
    setContent() {
      this.openedId = this.$router.currentRoute.value.params.opened
      this.pageName = this.$router.currentRoute.value.name
      this.getPageData()
    },
    getIconClass (i) {
      const iconClass = this.iconClassMap[i.split(' ').join('_').toLowerCase()]
      return iconClass
    },
    getPosition(element) {
      let xPosition = 0
      let yPosition = 0
      while(element) {
          xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft)
          yPosition += (element.offsetTop - element.scrollTop + element.clientTop)
          element = element.offsetParent
      }
      return { x: xPosition, y: yPosition }
    }
  },
  watch: {
    currentRoute() {
      this.setContent()
    }
  },
  computed: {
    ...mapState(['content']),
    contentObject() {
      return this.$store.state && this.$store.state.content.contentData
    },
    currentRoute() {
      return this.$router.currentRoute.value.name
    },
    filteredIds() {
      const filterIds = {
        "understanding-workcover": [],
        "payments": [4],
        "treatment-and-support": [2],
        "recovery-and-return-to-work": [35,5,3],
        "certificate-of-capacity": [6],
        "rights-and-obligations": [],
        "agent-support": [],
      }
      return filterIds[this.pageName]
    }
  },
  mounted() {
    this.setContent()
    setTimeout(() => {
      const anchorElement = document.getElementById(this.$router.currentRoute.value.params.opened)
      const offsetTop = this.getPosition(anchorElement)
      window.scrollTo(0, offsetTop.y - 88)
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
.panel-icon-dashboard {
  @media (max-width: 1023px) {
    margin-left: 0;
    margin-right: 42px;
    font-size: 72px;
  }
}
  .section-title {
    margin: 62px 0 24px 0;
    
    @media screen and (max-width: 1023px) {
      margin: 48px 0 24px;
      font-size: 22px !important;
    }
  }  
  .section-title-blank {
    margin: 48px 0 24px 0;
    
    @media screen and (max-width: 1023px) {
      margin: 24px 0 24px;
      font-size: 22px !important;
    }
  }  

  .container {
    padding-left: 24px;
    padding-right: 24px;
  }
  .page-divider {
    @media (max-width: 1023px) {
      margin-top: 24px;
    }
    @media (min-width: 1023px) {
      margin-top: 32px;
    }
  }
  
</style>