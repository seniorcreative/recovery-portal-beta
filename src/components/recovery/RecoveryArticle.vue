<template>
  <div class="bg-white mb-4 rounded-xl" v-bind:class="borderClasses">
    <img class="rounded-t-xl" v-bind:src="getImagePath(img)" />
    <div class="p-4">
      <p class="font-bold text-md text-black mb-2">{{ title }}</p>
      <p class="text-md text-black mt-2 mb-4" style="min-height: 150px;">{{ para }}</p>
      <div @click="goLink(uri)" class="w-full flex justify-between items-center">
        <a href="#" class="text-md text-blue underline">Find out more</a>
        <i
          class="icon-External-link text-blue hover:text-black text-3xl leading-0"
          style="line-height: 0 !important"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recovery Article',
  props: {
    img: String,
    title: String,
    para: String,
    uri: String,
    borderClasses: String
  },
  methods: {
    getImagePath(img) {
      return require(`../../assets/${img}`)
    },
    goLink(url) {
      var matomoSiteId = window.location.host.split('.')[0] === 'wsv-innovation-centre' ? '3' : '5'
      if (matomoSiteId !== '5') {
        window._paq.push(['trackEvent', 'Recovery Resource Link', 'open link', url])
      }
      window.open(url)
    },
  }
}
</script>
