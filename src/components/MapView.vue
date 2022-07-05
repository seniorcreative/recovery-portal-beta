<template>
  <div>
    <!-- Preload icon -->
    <img v-show="false" src="../assets/sprite_images/location-marker.png" id="marker-image" />
    <div id="map" class="map"/>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import source from '../assets/geodata-v2.json'
import PopupView from '@/components/PopupView'
import { nameFormatter } from '../shared/utils'
import { createApp, defineComponent, nextTick } from 'vue'
import * as turf from '@turf/turf'
import emitter from 'tiny-emitter/instance'

// Wire up so works same as vue 2
export const emitFn = {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args)
}

function _BuildPopup(e){
    let Type = e.Type;
    let Title = nameFormatter(e.providerName)
    let Subtitle = e.formattedAddress
    const MyNewPopup = defineComponent({
      extends: PopupView,
      setup() {
        return { Type: Type, Title: Title, Subtitle: Subtitle };
      },
    });
    nextTick(() => {
      createApp(MyNewPopup).mount("#popup-content");
      emitFn.$emit('onShowMarker', e)
    })
}

function _ClosePopup() {
  emitFn.$emit('onCloseMarker')
}

function spatialJoin(sourceGeoJSON, filterFeature, providerType) {
  var joined = sourceGeoJSON.features.filter(function (feature) {
    return turf.booleanPointInPolygon(feature, filterFeature) && feature.properties.Type === providerType;
  });
  return joined;
}

function CalcDistance(joined, from) {
  const _turf = turf
  joined.map(function(feature) {
    let to = _turf.point(feature.geometry.coordinates)
    let distance = _turf.distance(from, to, {units: 'meters'});
    feature.properties["distance"] = `${(Math.round(distance/100)/10)} km`
  })
  joined.sort((a, b) => (a.properties.distance > b.properties.distance) ? 1: -1);
}

export default {
  name: 'MapView',
  components:{
  },
   data() {
        return {
          mapStyle: "mapbox://styles/b-higgin/ckrye90wf7ygh1bruvqcsghdy",
          map: null,
          popup: null
        }
    },
    props: {
      TargetCoordinates: {
        type: Array
        },
        providerType: {
          type:String,
          default:"GP"
        },
        accessToken: String
    },
    mounted() {
        emitFn.$on('showPopup', this.showPopup)
        emitFn.$on('clearPopup', this.clearPopup)
        emitFn.$on('initMap', this.initMap)
    },
    beforeUnmount () {
        emitFn.$off('showPopup', this.showPopup)
        emitFn.$off('clearPopup', this.clearPopup)
        emitFn.$off('initMap', this.initMap)
    },
    watch:{
      providerType: function(providerType) {
        this.Filter(providerType, this.TargetCoordinates[0], this.TargetCoordinates[1])
      },
      TargetCoordinates: function(TargetCoordinates) {
        this.Filter(this.providerType,TargetCoordinates[0],TargetCoordinates[1])
      }
    },
    methods: {
      initMap () {
        mapboxgl.accessToken = this.accessToken;
        this.map = new mapboxgl.Map({
          container: "map",
          style: this.mapStyle
        })
        this.map.on('styleimagemissing', () => {
            if (!this.map.hasImage('location-marker')) this.map.addImage('location-marker', document.getElementById('marker-image'));
        })
        this.map.on('load', function() {
           this.map.addLayer({
            id: 'search-radius',
            source: {
              type: 'geojson',
              data: { "type": "FeatureCollection", "features": [] }
            },
            type: 'fill',
            paint: {
              'fill-color': '#fefefe',
              'fill-opacity': 0.1
            }
          });
          this.map.addLayer({
            id: 'symbols-filtered',
            source: {
              type: 'geojson',
              data: { "type": "FeatureCollection", "features": [] }
            },
            type: 'symbol',
            layout: {
              "icon-image": [
                    "match",
                    ["get", "Type"],
                    "Osteotherapy",
                    "location-marker",
                    "Physiotherapy",
                    "location-marker",
                    "Hydrotherapy",
                    "location-marker",
                    "GP",
                    "location-marker",
                    "Chiropractor",
                    "location-marker",
                    ""
                ],
              'icon-size': 0.8,
              'icon-allow-overlap': true
              }
          })
          this.map.on("click", "symbols-filtered", function(e) {
            this.showPopup(e)
            /*this.popup = new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML('<div id="popup-content"></div>')
              .addTo(this.map);
            _BuildPopup(e.features[0].properties)
            this.popup.on('close', _ClosePopup)*/
          }.bind(this))
          // Add geolocate control to the map.
          this.map.addControl(
            new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true
            })
          )
          this.Filter(this.providerType,this.TargetCoordinates[0],this.TargetCoordinates[1])
        }.bind(this))
      },
      Filter: function(providerType="GP", lat = -38.15, lng = 144.5) {
        if (!this.map) return
        this.map.flyTo({
          center: [lng, lat],
          zoom: 11,
          essential: true // this animation is considered essential with respect to prefers-reduced-motion
        })
        let searchRadius = this.makeRadius(lat, lng, 5000)
        this.map.getSource('search-radius').setData(searchRadius)
        let featuresInBuffer = spatialJoin(source,searchRadius,providerType)
        CalcDistance(featuresInBuffer, turf.point([lng,lat]))
        this.map.getSource('symbols-filtered').setData(turf.featureCollection(featuresInBuffer))
        this.map.setLayoutProperty('symbols', 'visibility', 'none')
        this.$emit('filtered',featuresInBuffer)
      },
      makeRadius: function(lat,lng,radiusInMeters) {
        const point = turf.point([lng,lat])
        const buffered = turf.buffer(point, radiusInMeters, { units: 'meters' })
        return buffered
      },
      showPopup ( e ) {
          this.popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<div id="popup-content"></div>')
            .addTo(this.map);
          _BuildPopup(e.properties)
          this.popup.on('close', _ClosePopup)
      },
      clearPopup () {
        this.popup && this.popup.remove() //Does this short-circuit evaluate?
      }
    }
}
</script>

<style lang="scss">
.map-control .map {
  height: 67vh;
  min-height: 67vh;
  border-radius: 0;
  @media (min-width: 768px) {
    height: calc(100vh - 384px);
    min-height: 500px;
    border-radius: 4px;
  }
}
</style>