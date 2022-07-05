<template>
  <div class="mt-4 relative">
    <a :id="contentId"></a>
    <div @click="toggleOpened" class="p-5 bg-gray flex justify-between items-center cursor-pointer" v-bind:class="openClass">
      <p class="font-bold text-lg" v-html="contentFilter(formattedQ)"></p>
      <i @click="toggleOpened" v-bind:class="iconClass" class="cursor-pointer"></i>
    </div>
    <article v-show="isOpened" class="pt-4 border-2 border-t-0 border-gray-dark rounded-b-xl">
      <p class="px-5" v-html="addClasses(contentFilter(formattedA))"></p>
      <feedback v-show="isOpened" :contentId="contentId"></feedback>
    </article>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Feedback from './Feedback.vue'

export default {
  name: 'FaqAccordionItem',
  components: {
    Feedback
  },
  props: {
    q: String,
    a: String,
    opened: Boolean,
    contentId: Number
  },
  data () {
    return {
      isOpened: false,
      searchval: this.$route.query.q,
    }
  },
  methods: {
    toggleOpened () {
      this.isOpened = !this.isOpened
    },
    addClasses(content) {
      return content.split('<a ').join('<a class="link" ')
    }
  },
  computed: {
      ...mapState(['content']),
      ...mapGetters({ contentFilter: 'content/getFilteredContent'}),
      contentObject() {
        return this.$store.state && this.$store.state.content.contentData
      },
      iconClass () {
        return this.isOpened ? 'icon-chevron-up' : 'icon-chevron-down'
      },
      openClass () {
        return this.isOpened ? 'rounded-t-xl border-2 border-gray-dark' : 'rounded-xl border-2 border-gray'
      },
      formattedQ() {
        return this.searchval? this.q.split(this.searchval).join(`<mark>${this.searchval}</mark>`) : this.q
      },
      formattedA() {
        return this.searchval? this.a.split(this.searchval).join(`<mark>${this.searchval}</mark>`) : this.a
      }
  },
  mounted() {
    this.isOpened = this.opened
  }
}
</script>