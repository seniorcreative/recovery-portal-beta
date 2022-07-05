<template>
  <div>
    <!-- Controls -->
    <div class="container md:px-24">
      <div class="hidden md:flex mb-6 justify-end">
        <span @click="scroll_left" class="cursor-pointer hover:opacity-50"
          ><i class="icon-chevron-left text-3xl"
        /></span>
        <span @click="scroll_right" class="cursor-pointer hover:opacity-50"
          ><i class="icon-chevron-right text-3xl"
        /></span>
      </div>
    </div>  
    <div id="scroller" class="overflow-x-scroll overflow-y-hidden">
      <div
        v-if="contentObject && contentObject.knowledge && contentObject.links"
        class="flex justify-start cursor-pointer"
      >
        <div
          class="flex flex-col mr-2 md:mr-6 mb-2 card"
          @click="goArticle(knowledgeItem)"
          v-for="(knowledgeItem, k) in getPanelLinks('General')"
          v-bind:key="k"
        >
          <div class="card-image">
            <figure class="image">
              <img v-bind:src="getImagePath(knowledgeItem.CONTENT.TITLE)" />
            </figure>
          </div>
          <div class="card-content relative">
            <div class="media">
              <div class="media-content">
                <p
                  class="font-bold mt-0 mb-2"
                  v-html="contentFilter(knowledgeItem.CONTENT.TITLE)"
                ></p>
                <p
                  class=""
                  v-html="
                    contentFilter(knowledgeItem.CONTENT.PROCEDURE_STEPS__C)
                  "
                ></p>
              </div>
            </div>
            <span class="card-icon-chevron cursor-pointer"
              ><i class="icon-chevron-right"
            /></span>
          </div>
        </div>

        <!-- Now loop the hardcoded links -->
        <div
          class="flex flex-col mr-2 mb-2 md:mr-6 card"
          @click="goLink(link.url)"
          v-for="(link, l) in contentObject.links"
          v-bind:key="l"
        >
          <div class="card-image">
            <figure class="image">
              <img v-bind:src="getImagePath(link.img)" />
            </figure>
          </div>
          <div class="card-content relative">
            <div class="media">
              <div class="media-content">
                <p class="font-bold mt-0 mb-2" v-html="link.title"></p>
                <p class="is-size-6" v-html="link.subtitle"></p>
              </div>
            </div>
            <span class="card-icon-link cursor-pointer"
              ><i class="icon-external-bl"
            /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { shuffle } from '../shared/utils'
import gsap from 'gsap'

export default {
  name: 'GeneralTiles',
  props: {
    filterIds: Array
  },
  methods: {
    getPanelLinks(panelCategory) {
      let links = []
      for (let k = 0; k < this.contentObject.knowledge.length; k++) {
        let knowledgeItem = this.contentObject.knowledge[k]
        if (knowledgeItem.CATEGORIES && knowledgeItem.CATEGORIES.categories.length) {
          let knowledgeCategories = knowledgeItem.CATEGORIES.categories.map(e => { for (let c in e) { return e.PARENT != 'null' ? `${e.PARENT} > ${e.CATEGORY}` : e.CATEGORY } })
          // Under Guided > 
          if (knowledgeCategories.indexOf(panelCategory) !== -1) {
            if (this.filterIds) {
              if (this.filterIds.indexOf(knowledgeItem.ID) !== -1) {
                links.push(knowledgeItem)
              }
            } else {
              links.push(knowledgeItem)
            }
          }
        }
      }
      // Add the hardcoded link articles.
      return shuffle(links).slice(0, 10)
    },
    goArticle(knowledgeItem) {
      var matomoSiteId = window.location.host.split('.')[0] === 'wsv-innovation-centre' ? '3' : '5'
      if (matomoSiteId !== '5') {
        window._paq.push(['trackEvent', 'General Article Tile', 'click', knowledgeItem.ID])
      }
      this.$router.push({ name: 'general', params: { articleId: knowledgeItem.ID } })
    },
    goLink(url) {
      var matomoSiteId = window.location.host.split('.')[0] === 'wsv-innovation-centre' ? '3' : '5'
      if (matomoSiteId !== '5') {
        window._paq.push(['trackEvent', 'General Article Tile', 'open link', url])
      }
      window.open(url)
    },
    scroll_left() {
      const scrollContainer = document.querySelector("#scroller")
      const newLeft = scrollContainer.scrollLeft - this.getScrollSize()
      gsap.to(scrollContainer, { delay: 0, duration: 0.5, scrollLeft: newLeft, ease: "quint.easeInOut" })
    },
    scroll_right() {
      const scrollContainer = document.querySelector("#scroller")
      const newRight = scrollContainer.scrollLeft + this.getScrollSize()
      gsap.to(scrollContainer, { delay: 0, duration: 0.5, scrollLeft: newRight, ease: "quint.easeInOut" })
    },
    getImagePath(title) {
      const i = require(`../assets/${title.toLowerCase().split(' ').join('-').split('?').join('')}.jpg`)
      return i
    },
    getScrollSize() {
      const content = document.querySelector("#scroller")
      let scrollSize = content.clientWidth + 16
      if (window.innerWidth >= 600) {
        scrollSize = (((content.clientWidth - 16) / 2) + 16)
      }
      if (window.innerWidth >= 768) {
        scrollSize = (((content.clientWidth - 32) / 3) + 16)
      }
      return scrollSize
    },
    doResize() {
      const content = document.querySelector("#scroller")
      content.scrollLeft = 0
    }
  },
  computed: {
    ...mapState(['content']),
    ...mapGetters({ contentFilter: 'content/getFilteredContent' }),
    contentObject() {
      return this.$store.state && this.$store.state.content.contentData
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.doResize)
  },
  mounted() {
    window.addEventListener('resize', this.doResize)
  }
}
</script>

<style lang="scss" scoped>
.tile {
  overflow-y: hidden;
  border-radius: 12px;
  min-width: 227px;
  max-width: 227px;
  height: 200px;
  background-color: #424b78;
  padding: 1em 1em;
  margin: 0 1em 0 0;
}

.title {
  color: #fff;
  margin: 0;
  @media (min-width: 1024px) {
    font-size: 16px;
    min-height: 24px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
    min-height: 32px;
  }
}

.media-content {
  color: #fff;
  @media (max-width: 767px) {
    overflow-x: hidden;
    overflow-y: hidden;
  }
  p:last-child {
    margin-bottom: 1.5em;
  }
}

.card-content {
  padding: 16px;
  line-height: 1.25;
}
.card-icon-chevron {
  position: absolute;
  right: 10px;
  bottom: 10px;
  height: 32px;
  i {
    color: #fff;
    font-size: 1.75em;
  }
}
.card-icon-link {
  position: absolute;
  right: 12px;
  bottom: 4px;
  height: 32px;
  i {
    color: #fff;
    font-size: 1.25em;
  }
}
.card-image:first-child img {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.card-footer:last-child,
.card-content:last-child,
.card-header:last-child {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}
.card .media:not(:last-child) {
  margin-bottom: 0;
}
.card-content {
  flex: 1 0 0;
  background-color: #424b78;
  @media (max-width: 768px) {
    padding: 1.2rem;
  }
}

.icon-wrapper {
  &:hover {
    opacity: 0.5;
  }
}

figure {
  img {
    height: auto;
    width: 100%;
  }
}
</style>