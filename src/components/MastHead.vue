<template>
  <div class="mast-head bg-beige">
    <!-- Help Centre -->
    <!-- Version with central search bar -->
    <header
      class="grid grid-cols-12 flex items-center"
      v-if="pageName == 'help' || pageName == 'help-search'"
    >
      <div
        class="
          col-span-2
          p-0
          hidden
          md:block
          h-full
          mainheadingimage mainheadingimage-left
        "
      ></div>
      <div class="col-span-12 md:col-span-8 px-4 md:px-8">
        <h3 class="md:hidden text-blue text-2xl my-6">{{ pageTitle }}</h3>
        <div class="text-center">
          <div class="absolute pl-4">
            <router-link
              v-if="back"
              :to="{ name: 'home' }"
              class="is-link flex items-center"
              ><i class="icon-chevron-left text-blue mr-2" /><span
                class="is-underlined"
                >Menu</span
              ></router-link
            >
            <!-- TODO: Fix appearance condition and location of back button -->
            <a
              @click="$router.back()"
              class="text-gray flex"
              data-v-7282e0c0=""
            >
              <span
                class="icon-flipped relative"
                style="left: -4px"
                data-v-7282e0c0=""
              >
                <i
                  class="relative icon-chevron-right mr-2"
                  style="top: 4px; left: 4px"
                  data-v-7282e0c0=""
                >
                </i>
              </span>
              Back
            </a>
          </div>
          <SearchBar
            v-on:searching="search"
            :mount-search-value="this.$route.query.q"
          ></SearchBar>
        </div>
      </div>
      <div
        class="
          col-span-2
          p-0
          hidden
          md:block
          h-full
          mainheadingimage mainheadingimage-right
        "
      ></div>
    </header>

    <!-- Dashboard -->
    <!-- Plain heading, no search -->
    <header
      class="grid grid-cols-12 flex items-center"
      v-if="pageName == 'home'"
    >
      <div class="col-span-12">
        <div class="flex justify-between items-center mast-head-background">
          <div class="pl-4 md:pl-24 w-1/2 md:w-full">
            <router-link
              v-if="back"
              :to="{ name: 'home' }"
              class="is-link flex items-center"
              ><i class="icon-chevron-left text-blue mr-2" /><span
                class="is-underlined"
                >Menu</span
              ></router-link
            >
            <h3 class="text-blue text-2xl">
              {{ pageTitle }}
            </h3>
          </div>
        </div>
      </div>
    </header>

    <!-- Recovery pages - these start to get a bit more complicated with additional subnavigation routes -->
    <header
      class="grid grid-cols-12 flex items-center"
      v-if="pageName == 'recovery'"
    >
      <div class="col-span-12">
        <div
          class="
            flex
            justify-between
            items-center
            mast-head-background-recovery
          "
        >
          <div class="py-4 sm:py-2 md:pl-24 w-full md:w-1/2">
            <div class="pl-4">
              <router-link
                v-if="back"
                :to="{ name: 'home' }"
                class="is-link flex items-center"
                ><i class="icon-chevron-left text-blue mr-2" /><span
                  class="underline text-blue"
                  >Menu</span
                ></router-link
              >
              <h3 class="text-blue text-2xl">
                {{ pageTitle }}
              </h3>
            </div>
            <nav class="my-2 py-3 md:py-6 px-4 bg-white md:bg-beige flex justify-start items-center">
              <router-link
                :to="`/recovery/${subNavItem.name}`"
                class="
                  flex flex-col justify-around items-center
                  text-center
                  rounded-xl
                  px-3
                  py-3
                  mr-3
                  md:mr-4
                  md:px-5
                  bg-white
                  leading-5
                  font-bold 
                  text-blue
                  border-2
                  hover:border-yellow
                  sm_beta-recovery-subnav-button
                  md:md_beta-recovery-subnav-button 
                "
                v-bind:class="activeSubNav(subNavItem)"
                v-bind:disabled="subNavItem.disabled"
                v-show="subNavItem.visible"
                v-bind:key="i"
                v-for="(subNavItem, i) in subNav"
              >
                <i class="block w-full text-center text-4xl md:text-5xl text-blue" v-bind:class="subNavItem.iconClass"></i>
                <p class="block leading-4">{{ subNavItem.title }}</p>
              </router-link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import SearchBar from './search/SearchBar' // '../components/search/SearchBar.vue'
export default {
  name: 'MastHead',
  components: { SearchBar },
  props: {
    title: String,
    back: Boolean,
    subNav: Array
  },
  methods: {
    search(searchValue) {
      const builtLink = { path: "/search", query: { q: searchValue } }
      this.$router.push(builtLink)
    },
    activeSubNav(navItem) {
      return navItem.name === this.$router.currentRoute.value.fullPath.split("/")[2] ? 'border-yellow' : 'border-gray'
    },
  },
  computed: {
    pageTitle() {
      return this.$router.currentRoute.value.matched[0].meta.title
    },
    pageName() {
      return this.$router.currentRoute.value.matched[0].name
    }
  }
}
</script>

<style lang="scss" scoped>
.mast-head {
  padding-top: 62px;
}

.control.has-icons-right .icon {
  top: 0.5rem;
}

.mainheadingimage {
  min-height: 195px;
  background-size: 110%;
  background-repeat: no-repeat;
  &-left {
    background-image: url(../assets/HC-header-image-left.png);
    background-position: bottom right;
  }
  &-right {
    background-image: url(../assets/HC-header-image-right.png);
    background-position: bottom left;
  }
}

.mast-head-background {
  min-height: 155px;
  @media (min-width: 768px) {
    min-height: 195px;
    background-image: url(../assets/header-desktop.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom right;
  }
  @media (max-width: 767px) {
    background-image: url(../assets/header-mobile-v2.png);
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: bottom right;
  }
  &-recovery {
    @media (min-width: 768px) {
      min-height: 370px;
      background-image: url(../assets/header-desktop-recovery@2x.png);
      background-size: 20%;
      background-repeat: no-repeat;
      background-position: bottom right;
    }
  }
}

.md_beta-recovery-subnav-button {
  width: 140px;
  height: 140px;
}

.sm_beta-recovery-subnav-button {
  width: 135px;
  height: 100px;
}

a[disabled=true] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
