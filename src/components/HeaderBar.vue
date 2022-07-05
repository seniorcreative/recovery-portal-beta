<template>
  <div
    class="fixed t-0 l-0 w-full bg-blue border-white border-2 border-solid z-50"
  >
    <nav
      class="flex justify-between items-center"
      v-if="contentObject && contentObject.navigation"
    >
      <a class="cursor-pointer" href="#" @click="goHome">
        <img alt="WorkSafe logo" src="../assets/worksafe_logo.png" />
      </a>
      <ul
        class="
          hidden
          md:flex
          flex-auto
          ml-12
          items-center
          justify-start
          list-none
        "
      >
        <li v-for="(navigationItem, i) in contentObject.navigation"
        class="mr-12" 
        v-bind:key="i" 
        v-bind:class="activeNav(navigationItem)"
        v-show="navigationItem.visibleInHeader">
          <router-link
            :to="{ path: navigationItem.path }"
            class="font-bold text-white text-sm flex items-center"
            >{{navigationItem.title}}
            <!-- TODO: Unhide the dropdown arrow and have sub nav -->
            <!-- <span v-if="navigationItem.subnavigation.length">&nbsp;<i class="icon-chevron-down text-white text-2xl"></i></span>-->
          </router-link>
        </li>
      </ul>
      <div
        class="
          md:hidden
          absolute
          w-full
          pointer-events-none
          text-center
          px-28
          leading-tight
          md:px-0
        "
      >
        <strong class="text-white cursor-pointer">{{ routeTitle }}</strong>
      </div>
      <MenuIcon
        v-show="!navActive"
        class="md:hidden h-6 w-6 text-white mr-4 cursor-pointer"
        @click="toggleNav"
      />
      <XIcon
        v-show="navActive"
        class="md:hidden h-6 w-6 text-white mr-4 cursor-pointer"
        @click="toggleNav"
      />
      <DotsHorizontalIcon class="p-2 h-8 w-8 hidden md:inline-block mr-4 text-white cursor-pointer"
      @click="showPersonalisationModal" />
    </nav>

    <!-- Navigation items -->
    <navigation-options-menu
      v-show="navActive"
      @on-hide-nav= "toggleNav"
      @on-show-personalisation-modal="showPersonalisationModal"
    ></navigation-options-menu>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavigationOptionsMenu from './NavigationOptionsMenu.vue'
import { MenuIcon, XIcon, DotsHorizontalIcon } from '@heroicons/vue/solid'

export default {
  components: { NavigationOptionsMenu, MenuIcon, XIcon, DotsHorizontalIcon },
  name: 'HeaderBar',
  props: {
    routeTitle: String
  },
  data() {
    return {
      navActive: false,
    }
  },
  methods: {
    toggleNav() {
      this.navActive = !this.navActive
    },
    toggleContactPanel() {
      this.$emit('onShowContactPanel')
    },
    goHome() {
      this.navActive = false
      this.$router.push("/")
    },
    goPage(pageName) {
      this.navActive = false
      this.$router.push(`/${pageName}`)
    },
    activeNav(navItem) {
      let match = this.$route.name || this.$route.path
      return match.includes(navItem.name) ? 'border-b-2 border-white' : ''
    },
    showPersonalisationModal() {
      this.$emit('onShowPersonalisationModal')
    }
  },
  computed: {
    navClass() {
      return this.navActive ? 'is-active' : ''
    },
    contentObject() {
      return this.$store.state && this.$store.state.content.contentData
    },
    ...mapState(['content'])
  }
}
</script>

<style lang="scss" scoped>
nav {
  height: 62px;
  display: flex;
  img {
    width: 90px;
    margin-left: 1em;
  }
}
</style>