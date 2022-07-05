<template>
  <div class="text-left mx-4 mb-8">
    <ul class="nav-item-list">
      <li
        v-bind:key="i"
        v-for="(navigationItem, i) in contentObject.navigation"
        @click="goPage(navigationItem)"
        class="cursor-pointer text-white"
        v-show="navigationItem.visibleInHeader"
      >
        <strong class="text-white">
          {{ navigationItem.title }}
          <!-- TODO: - put chevron right if has subs -->
        </strong>
      </li>
      <li class="md:hidden cursor-pointer text-white" @click="showPersonalisationModal">
        <strong class="text-white">
          Settings &hellip;
        </strong>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Navigation Options Menu',
  methods: {
    goHome() {
      this.$emit('onHideNav')
      this.$router.push({ path: '/home'})
    },
    goPage(navItem) {
      this.$router.push({ path: navItem.path })
      this.$emit('onHideNav')
    },
    showPersonalisationModal() {
      this.$emit('onShowPersonalisationModal')
    }
  },
  computed: {
    ...mapState(['content']),
    contentObject() {
      return this.$store.state && this.$store.state.content.contentData
    }
  }
}
</script>

<style scoped lang="scss">
ul li {
  padding: 10px 0;
  padding-left: 8px;
  border-bottom: 2px solid #f2f2f2;
  transition: all 0.3s ease;
  &:first-child {
    border-top: none;
  }
}
.nav-list {
  z-index: 2;
  list-style: none !important;
}

.nav-list li:hover {
  background-color: darken(#424b78, 10%);
}
</style>