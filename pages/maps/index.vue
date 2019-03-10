<template>
  <v-layout row wrap>
    <GmapMap v-bind:center="center" v-bind:map-type-id="mapTypeId" v-bind:zoom="5">
      <GmapMarker
        v-for="(item, index) in markers"
        v-bind:key="index"
        v-bind:position="item.position"
        @click="center=item.position"
      />
    </GmapMap>

    <GChart
      :settings="chartSettings"
      type="GeoChart"
      :data="chartData"
      :options="chartOptions"
    />
  </v-layout>
</template>

<script>
  import { GChart} from 'vue-google-charts';

  export default {
    components: {
      GChart
    },
    data:() => ({
      center: {lat: 34.702485, lng: 135.495951},
      mapTypeId: "roadmap",
      markers: [],

      sessions: [],
      shops: [],

      chartSettings: {
        packages: ['geochart'],
        'mapsApiKey': 'ここにGoogleMapAPI-key'
      },
      chartData: [
        ['Pref', 'Population'],
        ['北海道', 5352],
        ['青森', 1293],
        ['岩手', 1268],
        ['宮城', 2330],
        ['秋田', 1010],
        ['山形', 1113],
        ['福島', 1901],
        // 以下略
      ],
      chartOptions: {
        region: 'JP',
        resolution: 'provinces',
        displayMode: 'markers',
      }
    }),
    async asyncData({ $axios }) {
      const sessions = await $axios.$get("/admin/sessions")
      let shops = await $axios.$get("/admin/shops")
      return {
        sessions: sessions.data,
        shops: shops.data
      }
    },
    created() {
      this.shops.forEach(shop => {
        this.markers.push({ position: { lat: shop.lat, lng: shop.lng } })
      })
    }
  };
</script>

<style lang="stylus" scoped>
  .vue-map-container
    height 800px
    width 100%

</style>
