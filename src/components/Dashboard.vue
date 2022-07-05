<template>
  <div>
    <mast-head :title="'Welcome to the Recovery Centre'" :searchable="false" />
    <section
      v-if="contentObject && contentObject.dataCategories"
      class="container text-left"
    >
      <h3 class="title text-xl text-blue mt-2 mb-4">I want to&hellip;</h3>
      <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
        <router-link
          :to="{ path: '/recovery/get-treatment' }"
          class="
            col-span-1
            border-2
            border-gray-variant-1
            rounded-xl
            text-blue
            font-bold
            text-xl
            leading-6
            p-6
            pr-4
            flex
            justify-between
            items-center
          "
          ><strong class="text-blue">Manage my recovery</strong>
          <i class="text-blue text-3xl leading-none icon-chevron-right"
        /></router-link>
        <router-link
          :to="{ name: 'help' }"
          class="
            col-span-1
            border-2
            border-gray-variant-1
            rounded-xl
            text-blue
            leading-6
            text-xl
            p-6
            pr-4
            flex
            justify-between
            items-center
          "
          ><strong class="text-blue">Visit the Help Centre</strong>
          <i
            class="text-blue text-3xl leading-none icon-chevron-right"
        /></router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MastHead from './MastHead'

export default {
  name: 'Dashboard',
  components: {
    MastHead
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

<style lang='scss' scoped>
.panel_shadow {
  box-shadow: 0 5px 15px 3px rgba(0, 0, 0, 0.1);
}
</style>