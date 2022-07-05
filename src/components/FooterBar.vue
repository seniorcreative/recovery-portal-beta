<template>
  <div v-if="contentObject && contentObject.navigation">
    <footer class="bg-blue py-6 mt-10 md:py-8">
      <div class="container _md:px-24">
        <div class="flex justify-start items-center mb-4">
            <strong class="text-white">powered by </strong>
            <img
              alt="WorkSafe logo"
              src="../assets/worksafe_logo.png"
              style="height: 48px; vertical-align: middle; padding-left: 8px;"
            />
        </div>
        <div class="grid grid-cols-1 mb-6">
          <div class="col-span-1">
            <!-- Note - two types of the nav - touch and desktop -->
            <!-- desktop nav -->
            <div
              class="hidden md:grid grid-cols-4 my-4 py-4 gap-4 border-b border-t border-white border-solid"
              v-show="showLinks"
            >
              <div
                class="col-span-1"
                v-bind:key="i"
                v-for="(navigationItem, i) in contentObject.navigation"
                v-show="navigationItem.visibleInFooter"
              >
                <span
                  @click="goPage({ path: navigationItem.path })"
                  class="cursor-pointer"
                  ><strong class="text-white">{{ navigationItem.title }}</strong></span
                >
                <ul v-if="navigationItem.subnavigation.length">
                    <li v-for="(subnavItem, index) in navigationItem.subnavigation" class="mt-4 text-white text-sm" v-bind:key="index" v-show="subnavItem.visible">
                      <router-link :to="{ path: subnavItem.path }" v-bind:disabled="subnavItem.disabled">{{subnavItem.title}}</router-link>
                    </li>
                  </ul>
              </div>
            </div>

            <!-- touch nav -->
            <!-- I am sorry there are two sets of code for this nav - 
            it just evolved this way and I ran out of time to make it work as one -->
            <div
              class="grid md:hidden grid-cols-1 gap-0"
              v-show="showLinks"
            >
              <div
                class="col-span-1 px-0 py-4 border-t-2 border-white"
                v-bind:key="i"
                v-for="(navigationItem, i) in contentObject.navigation"
                v-show="navigationItem.visibleInFooter"
              >
                <a
                  class="flex justify-between items-center cursor-pointer py-2"
                  @click="goPage({ path: navigationItem.path })"
                >
                  <strong
                    class="text-white leading-none"
                    >{{ navigationItem.title }}</strong>
                  <i class="hidden md:flex text-white text-2xl icon-chevron-right"></i>
                  <ul class="hidden md:block" v-if="navigationItem.subnavigation.length">
                    <li v-for="(subnavItem, index) in navigationItem.subnavigation" class="mt-4 text-white text-sm" v-bind:key="index" v-show="subnavItem.visible">
                      <router-link :to="{ path: subnavItem.path }" v-bind:disabled="subnavItem.disabled">{{subnavItem.title}}</router-link>
                    </li>
                  </ul>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class="col-span-1">
            <div class="flex justify-start">
              <img
                src="../assets/flags/1.png"
                width="64"
                height="38"
                alt="flag-aboriginal"
                class="mr-4"
              />
              <img
                src="../assets/flags/2.png"
                width="64"
                height="38"
                alt="flag-torres-strait-islander"
                class="mr-4"
              />
              <img
                src="../assets/flags/3.png"
                width="64"
                height="38"
                alt="flag-lgbtiq"
                class="mr-4"
              />
            </div>
            <div
              class="mt-5 text-white text-left"
              v-html="contentObject.pages.footer.acknowledgement"
            ></div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Footer",
  methods: {
    goHome() {
      this.$router.push({ path: '/home' })
    },
    goPage(navItem) {
      this.$router.push(navItem)
    }
  },
  computed: {
    ...mapState(['content']),
    contentObject() {
      return this.$store.state && this.$store.state.content.contentData
    },
    showLinks() {
      return this.$router.currentRoute.value.fullPath !== '/error'
    }
  }
}
</script>

<style lang="scss" scoped>
  a[disabled=true] {
    opacity: 0.5;
    pointer-events: none;
  }
</style>