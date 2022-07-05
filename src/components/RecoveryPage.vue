<template>
  <div>
    <mast-head :back="true" v-if="subNavigation" :sub-nav="subNavigation" />
    <main
      v-if="contentObject && contentObject.dataCategories"
      class="text-left"
    >
      <router-view></router-view>
      <div class="container">
         <feedback-plus :content-page-id="44" :option-type="'stars'"></feedback-plus>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import FeedbackPlus from './FeedbackPlus.vue'
import MastHead from './MastHead'

export default {
  name: 'Recovery Page',
  components: { MastHead, FeedbackPlus },
  computed: {
    ...mapState(['content']),
    ...mapGetters({ contentFilter: 'content/getFilteredContent' }),
    contentObject() {
      return this.$store.state && this.$store.state.content.contentData
    },
    pageContent() {
      return this.$store.state && this.$store.state.content.contentData.pages[this.pageName].content
    },
    subNavigation() {
      let subnavigation = []
      if (this.$store.state && this.$store.state.content.contentData.navigation) {
        for (let s in this.$store.state.content.contentData.navigation) {
          if(this.$store.state.content.contentData.navigation[s].name === 'recovery') {
            subnavigation = this.$store.state.content.contentData.navigation[s].subnavigation
          }
        }
      }
      return subnavigation
    },
    backgroundImage() {
      return `
      background-image: url(../assets/help_centre_bg_image.jpg); 
      width: 100%; 
      min-height: 275px; 
      background-size: cover;
      `
    }
  }
}
</script>