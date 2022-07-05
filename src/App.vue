<template>
  <div>
    <header-bar :route-title="routeTitle" @onShowPersonalisationModal="togglePersonaliseModal"></header-bar>
    <router-view></router-view>
    <footer-bar></footer-bar>
    <transition name="fade">
      <modal :activeClass="modalClass" @onCloseModal="togglePersonaliseModal"></modal>
    </transition>
  </div>
</template>

<script>
import FooterBar from './components/FooterBar'
import HeaderBar from './components/HeaderBar'
import Modal from './components/Modal'

export default {
  name: 'App',
  data () {
    return {
      showModal: false,
      modalClass: 'hidden',
      showPersonalisation: false,
    }
  },
  methods: { 
    togglePersonaliseModal() {
      this.showModal = !this.showModal
      this.modalClass = this.showModal ? 'fixed' : 'hidden'
      var matomoSiteId = window.location.host.split('.')[0] === 'wsv-innovation-centre' ? '3' : '5'
      if (this.showModal && matomoSiteId !== '5') window._paq.push(['trackEvent', 'Personalise', 'click open modal'])
    },
    togglePersonalisation() {
      this.showPersonalisation = !this.showPersonalisation
    }
  },
  components: {
    HeaderBar,
    FooterBar,
    Modal
  },
  computed: {
    routeTitle () {
      const currentRouteProps = this.$router.currentRoute.value.meta
      return currentRouteProps.title
    }
  }
}
</script>

    HeaderBar
<style>
@import './assets/main.scss';
</style>
