<template>
  <li class="m-0 p-0 bg-white cursor-pointer" @click="toggleOpened" >
    <header class="flex justify-between items-center">
      <figure
        class="
          rounded-full
          text-black
          py-4
          px-3
          leading-0
          bg-yellow
          mr-4
          font-bold
          text-black text-md
          text-center
        "
        style="line-height: 6px !important"
      >
        <span style="display: inline-block; width: 16px;">{{num}}</span>
      </figure>
      <p class="flex-auto font-bold leading-4 py-2">{{title}}</p>
      <i class="ml-4 text-gray-dark text-4xl" v-bind:class="openedClass"></i>
    </header>
    <div style="margin-left: 20px; margin-top: 0;" class="m-0 border-l-2 border-yellow py-2" >
        <article
        v-show="isOpened"
        class="pl-8 pr-4 text-md"
        v-html="desc">
        </article> 
    </div>
  </li>
</template>

<script>
export default {
  name: 'Recovery treatment accordion',
  props: {
    title: String,
    desc: String,
    num: String
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
    openedClass() {
      return this.isOpened ? 'icon-chevron-up' : 'icon-chevron-down'
    }
  }
}
</script>
