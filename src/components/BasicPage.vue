<template>
  <section v-if="contentObject" class="container py-24 text-left">
    <p class="is-size-2 font-bold">{{contentFilter(pageContent.title)}}</p>
    <p>{{contentFilter(pageContent.content)}}</p>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'BasicPage',
  props: {
    pageName: String
  },
  computed: {
    ...mapState(['content']),
    ...mapGetters({ contentFilter: 'content/getFilteredContent' }),
    contentObject() {
      return this.$store.state && this.$store.state.content.contentData
    },
    pageContent() {
      return this.$store.state && this.$store.state.content.contentData.pages[this.pageName].content
    }
  }
}
</script>