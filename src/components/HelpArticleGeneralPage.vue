<template>
  <section v-if="contentObject" class="container container-content text-left px-4">
    <router-link to="/help" class="text-gray flex pt-10"><span class="icon-flipped relative" style="left: -4px;"><i class="relative icon-chevron-right mr-2" style="top: 4px; left: 4px;"></i></span>Home</router-link>
    <p class="mt-3 is-size-2-desktop is-size-4-touch text-blue font-bold" v-html="pageData && pageData.CONTENT.TITLE"></p>
    <div class="block my-4" v-if="readingTime">
      <span class="rounded-full bg-gray py-1 p-3 my-2 text-sm">{{readingTime}} minute reading time</span>
    </div>
    <div v-if="pageData && pageData.CONTENT.PROCEDURE_STEPS__C" class="text-xl" v-html="contentFilter(pageData.CONTENT.PROCEDURE_STEPS__C)"></div>
    <div class="border-b-4 border-solid border-gray my-10"></div>
    <div v-if="pageData && pageData.CONTENT.SUPPORT_TEXT__C" v-html="contentFilter(pageData.CONTENT.SUPPORT_TEXT__C)">
    </div>
    <feedback-plus :contentPageId="42" :option-type="'thumbs'"></feedback-plus>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import readingTime from 'reading-time'
import FeedbackPlus from '../components/FeedbackPlus.vue'

export default {
  name: 'HelpArticleGeneralPage',
  components: {
    FeedbackPlus
  },
  props: {
    pageName: String
  },
  data () {
    return {
      pageData: null,
      readingTime: null
    }
  },
  methods: {
    setContent() {
      this.getPageData()
    },
     getPageData() {
      let tmpPageData = {}
      for (let k = 0; k < this.contentObject.knowledge.length; k++) {
        let knowledgeItem = this.contentObject.knowledge[k]
        if (String(knowledgeItem.ID) === String(this.$router.currentRoute.value.params.articleId)) {
          tmpPageData = knowledgeItem
          break
        }
      }
      this.readingTime = Math.round(readingTime(tmpPageData.CONTENT.PROCEDURE_STEPS__C + tmpPageData.CONTENT.SUPPORT_TEXT__C).minutes)
      this.pageData = tmpPageData
     }
  },
  computed: {
      ...mapState(['content']),
      ...mapGetters({ contentFilter: 'content/getFilteredContent'}),
      contentObject() {
        return this.$store.state && this.$store.state.content.contentData
      },
  },
  mounted() {
    this.setContent()
  }
}
</script>