<template>
  <section v-if="contentObject" class="container text-left">
    <p class="is-size-2 font-bold">{{contentFilter(contentObject.title)}}</p>
    <p>{{contentFilter(contentObject.content)}}</p>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import PaymentsCalc from '../components/calculators/payments.vue'

export default {
  name: 'PaymentsCalculatorPage',
  props: {
    pageName: String
  },
  components: [PaymentsCalc],
  computed: {
      ...mapGetters({
        content: 'content/getContentData',
        contentFilter: 'content/getFilteredContent'
      }),
      contentObject () {
        return this.content && this.content.pages[this.pageName].content
      }
  }
}
</script>