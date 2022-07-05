<template>
  <div class="p-5">
    <section class="text-left map-control">
      <p class="content-title-size text-blue font-bold mb-6">
        Find a WorkSafe Provider near you
      </p>
      <div v-bind:class="mobileControlsClass">
        <div class="grid invisible md:visible">
          <div class="column">
            <p class="p-0 m-0" v-html="providerContent"></p>
          </div>
          <div class="column">&nbsp;</div>
        </div>
        <map-controls
          v-on:setLocation="setLocation"
          v-on:setProviderType="setProviderType"
          v-on:search="setSearchMode"
          :accessToken="accessToken"
        ></map-controls>
        <div class="grid visible md:invisible mt-6">
          <div class="column">
            <p class="p-0 m-0" v-html="providerContent"></p>
          </div>
          <div class="column">&nbsp;</div>
        </div>
      </div>
      <div class="grid">
        <div class="column is-4" v-bind:class="providerListClass">
          <div class="map-sidebar-item-container" v-bind:class="providerListContainerClass">
            <header class="visible md:invisible px-2 text-center" id="uCantTouchThis" style="margin-top: -18px; padding: 10px 0;">
              <div style="border-top: 3px solid #bdbdbd; width: 40px; padding: 0 0 5px; margin: 0 auto;"></div>
              <strong>Nearby facilities</strong>
            </header>
            <div class='map-sidebar-item-container-scrollarea'>
              <ul>
                <li
                  v-for="(item, index) in results"
                  :key="`item-${index}`"
                  style="border-radius: 8px"
                  @click="showPopup(item)"
                  :class="markerClass(item)"
                >
                  <div class="px-1 py-1 mb-5 is-size-6">
                    <div
                      class="
                        flex
                        justify-between
                        items-center
                      "
                    >
                      <p class="is-size-5 font-bold pr-2">
                        {{ nameFormatter(item.properties.providerName) }}
                      </p>
                      <p
                        class="is-size-6 font-bold has-text-grey"
                        style="min-width: 52px"
                      >
                        <small>{{ item.properties.distance }}</small>
                      </p>
                    </div>
                    <p class="mt-2 is-size-6 has-text-dark" style='max-width: 60%;'>
                      {{ item.properties.formattedAddress }}
                    </p>
                    <!-- <small>{{item.properties.Type}}</small> -->
                    <div class="block mt-2"></div>
                    <a
                      class="mt-5 text-blue is-link"
                      v-bind:href="`https://maps.google.com/?q=${item.properties.formattedAddress}`"
                      target="_blank"
                      ><span class="is-underlined">Google Map</span
                      ><i class="icon-external-bl ml-2 open-external-link"
                    /></a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-span-8 is-map-column" v-bind:class="mapViewClass">
          <div class="mobile-close-map visible md:invisible" @click="clearSearchMode"><i class="icon-chevron-left" /></div>
          <map-view
            :providerType="MapFilter"
            :accessToken="accessToken"
            :TargetCoordinates="CurrentTarget"
            v-on:filtered="FilteredResults"
          ></map-view>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import MapView from '@/components/MapView'
import MapControls from '@/components/MapControls'
import { nameFormatter } from '../shared/utils'
import emitter from 'tiny-emitter/instance'
import { nextTick } from 'vue'
import Hammer from 'hammerjs'

// Wire up so works same as vue 2
export const emitFn = {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args)
}

export default {
  name: 'Provider Page',
  components: {
    MapView,
    MapControls
  },
  data() {
    return {
      accessToken: 'pk.eyJ1IjoiYi1oaWdnaW4iLCJhIjoiY2tyeWM2dWZ3MHlyaTJuazNheXB5ZThzbyJ9.s9OCvzNu5_9Q3BTzPCh52g',
      MapFilter: "",
      CurrentTarget: [-37.8136, 144.9631],
      results: [],
      searchCount: 0,
      nameFormatter,
      mapInited: false,
      markerPanelId: null,
      searchMode: window.innerWidth > 768,
      providerContent: '<strong>Please note:</strong>&nbsp;These providers are not WorkSafe approved providers, they are just registered providers with WorkSafe. Treatment and quality may vary for each provider so remember to discuss options with your GP to find a treater that best suits you.',
      expanded: false
    }
  },
  props: {
    pageName: String
  },
  methods: {
    setProviderType: function (type) {
      this.MapFilter = type
      this.searchCount++
    },
    setLocation: function (value) {
      if (value != '') {
      this.CurrentTarget = value
      this.searchCount++
      } else {
        this.searchCount = this.MapFilter === '' ? 0 : 1
      }
    },
    FilteredResults: function (results) {
      this.results = results
    },
    showMarker(markerEvent) {
      this.markerPanelId = markerEvent.providerName.split(' ').join('-').toLowerCase()
      const el = this.$el.getElementsByClassName(`index-${this.markerPanelId}`)[0]
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    },
    closeMarker() {
      this.markerPanelId = null
    },
    markerClass(item) {
      let formattedName = item.properties.providerName.split(' ').join('-').toLowerCase()
      let markerClass = `index-${formattedName}`
      if (formattedName === this.markerPanelId) {
        markerClass = `{$markerClass} active`
      }
      return markerClass
    },
    showPopup(item) {
      emitFn.$emit('clearPopup')
      this.markerPanelId = item.properties.providerName.split(' ').join('-').toLowerCase()
      emitFn.$emit('showPopup', { lngLat: item.geometry.coordinates, properties: item.properties })
    },
    setSearchMode () {
      this.searchMode = true
    },
    clearSearchMode () {
      window.scrollTo(0,0)
      this.searchMode = false
    },
    toggleExpanded () {
      // this.expanded = !this.expanded
    },
    bindSwipeUp() {
      const hammerTime = new Hammer(document.getElementById('uCantTouchThis'), {})
      hammerTime.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL })
      hammerTime.on('pan', (e) => {
        if (e.deltaY < 0 && !this.expanded) {
          this.expanded = true
        }
        if (e.deltaY > 0 && this.expanded) {
          this.expanded = false
        }
      })
    }
  },
  computed: {
    mapViewClass() {
      let mapClass = ''
      if (window.innerWidth >= 768) {
          if (this.searchMode) {
            mapClass = ''
          } else {
            mapClass = 'map-faded map-on-screen'
          }
      } else {
          if (this.searchMode) {
            mapClass = 'map-on-screen'
          } else {
            mapClass = 'map-off-screen'
          }
      }
      return mapClass
    },
    mobileControlsClass() {
      let mobileControlsClass = ''
      if (window.innerWidth < 768) {
          if (this.searchMode) {
            mobileControlsClass = 'is-hidden'
          }
      }
      return mobileControlsClass
    },
    providerListClass() {
      let providerListClass = ''
       if (window.innerWidth < 768) {
          if (!this.searchMode) {
            providerListClass = 'is-hidden'
          }
       }
       return providerListClass
    },
    providerListContainerClass () {
      return this.expanded ? 'map-sidebar-item-container--expanded' : ''
    }
  },
  watch: {
    searchCount () {
      if (this.searchCount >= 2) {
        if (!this.mapInited) {
          nextTick(() => {
            emitFn.$emit('initMap')
          })
        }
        this.searchMode = true
      }
    }
  },
  mounted() {
    emitFn.$on('onShowMarker', this.showMarker)
    emitFn.$on('onCloseMarker', this.closeMarker)

    this.bindSwipeUp()
  },
  beforeUnmount() {
    emitFn.$off('onShowMarker', this.showMarker)
    emitFn.$off('onCloseMarker', this.closeMarker)
  }
}
</script>

<style lang="scss">
.map-faded {
  opacity: 0.4;
}
.map-off-screen {
  .map {
    @media (max-width: 767px) {
      position: fixed !important;
      z-index: -1;
    }
  }
  .mobile-close-map {
    display: none;
  }
}
.map-on-screen {
  @media (max-width: 767px) {
      position: fixed !important;
      top: 62px;
      left: 0px;
  }
}
.is-map-column {
  transition: opacity 0.5s ease;
  @media (max-width: 767px) {
    padding: 0 !important;
    z-index: 3;
    width: 100%;
    margin: 0;
    padding: 0;
  }
}
.open-external-link {
  font-size: 14px;
  text-decoration: none !important;
  color: #424b78;
}
.content-title-size {
  font-size: 24px;
  line-height: 1.2;
  @media (max-width: 767px) {
    font-size: 28px;
    margin-bottom: 24px !important;
  }
}
.mobile-close-map {
  position: absolute;
  left: 20px;
  top: 20px;
  background: white;
  padding: 0;
  border-radius: 50%;
  z-index: 2;
  height: 54px;
  width: 54px;
  text-align: center;
  i {
    color: #424b78;
    font-size: 36px;
    position: relative;
    top: 5px;
  }
}
.map-sidebar-item-container {
  @media (max-width: 767px) {
    transition: all 0.5s ease;
    width: 100% !important;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.25)); /* Check cross platform */
    position: fixed !important;
    height: 33vh;
    bottom: 0 !important;
    left: 0 !important;
    z-index: 10;
    background: #fff;
    padding: 12px;
    min-height: 0 !important;
    &--expanded {
      height: calc(100vh - 62px);
    }
  }
}
.map-sidebar-item-container--expanded .map-sidebar-item-container-scrollarea {
  height: calc(100vh - 62px - 24px) !important;
}
</style>