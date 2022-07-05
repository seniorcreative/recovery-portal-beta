<template>
  <div class="mt-4 relative">
    <div
      @click="toggleOpened"
      class="p-4 bg-gray flex justify-between items-center cursor-pointer"
      v-bind:class="openClass"
    >
      <p class="font-bold text-lg leading-6" v-html="contentFilter(title)"></p>
      <i
        v-bind:class="iconClass"
        class="text-4xl cursor-pointer"
      ></i>
    </div>
    <article
      v-show="isOpened"
      class="pt-4 border-2 border-t-0 border-gray-dark rounded-b-xl"
    >
      <div class="flex flex-wrap">
        <div v-for="(item, index) in services" v-bind:key="index">
          <div
            class="px-4 md:px-8 flex justify-between items-center py-1 md:py-4"
          >
            <i
              class="
                text-3xl
                md:text-4xl
                w-12
                md:w-1/3 md:w-auto
                md:text-6xl
                text-blue text-center
                mr-3
              "
              v-bind:class="item.icon"
            ></i>
            <Popper :placement="'top'" :arrow="true" :offset-distance="'14'">
              <p
                class="
                  text-blue text-md
                  md:text-lg
                  font-semibold
                  border-blue border-b
                  cursor-pointer
                "
                v-html="item.name"
              ></p>
              <template #content>
                <!-- Popper content in content slot as per https://vuejsexamples.com/a-tooltip-component-for-vue-3-based-on-popperjs/  -->
                <div v-html="item.tooltip"></div>
              </template>
            </Popper>
          </div>
        </div>
      </div>
      <p
        class="px-5 py-4 leading-5 md:py-6 text-sm md:text-md"
        v-html="contentFilter(text)"
      ></p>
    </article>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Popper from 'vue3-popper'

export default {
  name: 'Service Accordion Item',
  components: { Popper },
  props: {
    title: String,
    text: String,
    services: Array
  },
  data() {
    return {
      isOpened: false
    }
  },
  methods: {
    toggleOpened() {
      this.isOpened = !this.isOpened
    }
  },
  computed: {
    ...mapState(['content']),
    ...mapGetters({ contentFilter: 'content/getFilteredContent' }),
    contentObject() {
      return this.$store.state && this.$store.state.content.contentData
    },
    iconClass() {
      return this.isOpened ? 'icon-chevron-up' : 'icon-chevron-down'
    },
    openClass() {
      return this.isOpened ? 'rounded-t-xl border-2 border-gray-dark' : 'rounded-xl border-2 border-gray'
    }
  },
  mounted() {
    this.isOpened = this.opened
  }
}
</script>

<style>
/* 
NB
These root non-scoped styles are crucial for Popper as on build the deep styles below get overridden. 
Read about ::deep being deprecated. 
*/
:root {
  --popper-theme-background-color: #ffffff;
  --popper-theme-background-color-hover: #ffffff;
  --popper-theme-text-color: #000000;
  --popper-theme-border-width: 2px;
  --popper-theme-border-style: solid;
  --popper-theme-border-color: #424b78;
  --popper-theme-border-radius: 12px;
  --popper-theme-padding: 16px;
}
</style>

<style lang="scss" scoped>
:deep(.popper),
:deep(.popper):hover {
  width: 250px;
  background-color: #ffffff;
  color: #000000;
  border-width: 2px;
  border-color: #424b78;
  border-style: solid;
  border-radius: 12px;
  padding: 16px;
  font-size: 15px;
  line-height: 20px;
  z-index: 1;
  #arrow::before {
    width: 24px;
    height: 24px;
    padding: 5px;
    margin-left: -6px;
    background: white;
  }
  a {
    display: block;
    color: #424b78;
    text-decoration: underline;
    margin-top: 15px;
  }
}
:deep(.popper[data-popper-placement="top"]) {
  #arrow::before {
    border-right: 2px solid #424b78 !important;
    border-bottom: 2px solid #424b78 !important;
    border-bottom-right-radius: 5px;
    margin-top: -6px;
  }
}
:deep(.popper[data-popper-placement="bottom"]) {
  #arrow::before {
    border-top: 2px solid #424b78 !important;
    border-left: 2px solid #424b78 !important;
    border-top-left-radius: 5px;
    margin-top: -8px;
  }
}
</style>