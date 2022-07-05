<template>
  <div class="grid">
    <div class="column is-4 short-column">
      <label for="serviceType" class="has-text-grey my-0 py-0"
        >I'm looking for</label
      >
      <div class="select my-2">
        <select id="serviceType" @change="onSetType">
          <option value="">Select a provider type</option>
          <option
            v-for="(providerType, i) in providerTypes"
            v-bind:key="i"
            :value="providerType"
          >
            {{ providerType }}
          </option>
        </select>
      </div>
    </div>
    <div class="column is-6 relative short-column">
      <label for="geocoder" class="has-text-grey my-0 py-0"
        >Closest to</label
      >
      <div class="my-2" id="geocoder"></div>
      <button
        v-show="false"
        class="btn-float"
        @click="onSearch"
        v-bind:disabled="searchButtonDisabled"
        v-bind:class="searchFloatButtonClass"
      ></button>
    </div>
    <div class="col-span-2 short-column">
      <button
        type="button"
        class="py-2 my-0 button btn-search font-bold"
        @click="onSearch"
        v-bind:class="searchButtonClass"
        v-bind:disabled="searchButtonDisabled"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script>
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

export default {
  name: 'MapControls',
  data() {
    return {
      MapFilter: "",
      CurrentTarget: [],
      results: [],
      searchLocation: '',
      providerType: '',
      searchResult: null,
      providerTypes: ['GP', 'Physiotherapy', 'Hydrotherapy', 'Osteotherapy', 'Chiropractor'],
      geocoder: null
    }
  },
  props: {
    pageName: String,
    accessToken: String
  },
  mounted() {
    this.geocoder = new MapboxGeocoder({
      accessToken: this.accessToken,
      placeholder: 'Address, suburb, postcode, etc...'
    })
    this.geocoder.addTo('#geocoder')
    this.geocoder.on('result', (e) => {
      this.searchLocation = e.result.place_name
      this.searchResult = [e.result.center[1], e.result.center[0]]
      this.$emit('set-location', this.searchResult)
    })
    this.geocoder.on('clear', () => {
      console.log('cleared results')
      this.searchLocation = ''
      this.searchResult = null
      this.$emit('set-location', '')
    })
    const inputField = document.querySelector('input.mapboxgl-ctrl-geocoder--input')
    inputField.addEventListener('keyup', (e) => {
      this.searchLocation = e.target.value
    })
  },
  methods: {
    onSetType: function (type) {
      this.providerType = type.target.value
      this.$emit("set-provider-type", this.providerType)
    },
    onSearch(e) {
      e.preventDefault()
      const listItem = document.querySelector('#geocoder > div > div.suggestions-wrapper > ul > li.active')
      if (listItem) {
        listItem.dispatchEvent(new Event('mousedown')); // Sets the value in list.js (see Events in inspector)
        listItem.dispatchEvent(new Event('mouseup')); // Calls the list handler in list.js (see Events in inspector)
      }
      this.$emit("search", this.providerType)
    }
  },
  computed: {
    searchButtonClass() {
      return this.searchLocation !== '' ? 'is-link' : 'is-dark is-disabled'
    },
    searchFloatButtonClass() {
      return this.searchLocation !== '' ? '' : 'is-disabled'
    },
    searchButtonDisabled() {
      return !this.searchLocation
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  box-shadow: none;
  border-radius: 12px;
}
.btn-search {
  position: relative;
  top: 30px;
  width: 100%;
}
</style>

<style lang="scss">
select#serviceType {
  color: #4f4f4f;
  border: 1px solid #000;
  border-radius: 12px;
}
.mapboxgl-ctrl-geocoder--input,
select#serviceType {
  font-family: VIC-Regular, Arial, sans-serif;
  font-weight: 400;
  font-size: 16px;
  font-style: normal;
  border-radius: 12px;
  padding-left: 14px;
  border: 1px solid #000 !important;
  &::-webkit-input-placeholder {
    color: #4f4f4f;
    font-size: 16px;
  }
}
.mapboxgl-ctrl-geocoder,
.mapboxgl-ctrl {
  z-index: 1;
  box-shadow: none;
  border-radius: 12px;
}
.mapboxgl-ctrl-geocoder--icon-search {
  right: 9px !important;
  left: auto !important;
  top: 9px !important;
  transform: scale(1.2) !important;
}
.btn-float {
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: none;
  border: none;
  z-index: 1;
  right: 15px;
  top: 48px;
  @media (max-width: 767px) {
     top: 38px;
  }
  cursor: pointer;
  &[disabled] {
    cursor: not-allowed;
    background-color: rgba(255, 255, 255, 0.75) !important;
  }
}
.short-column {
  @media (max-width: 767px) {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
}
</style>