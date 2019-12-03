<template>
  <div>
    <div id="leaflet-map" :style="mapStyle"></div>
  </div>
</template>
<script>
import L from 'leaflet'
// import '@supermap/iclient-leaflet'
import { graphic, graphicLayer } from '@supermap/iclient-leaflet'
import '@/vendor/leaflet.MapProviders.js'

export default {
  props: ['mapData'],
  data() {
    return {
      mapStyle: 'width: 100%;height: 680px',
      map: null,
      init_map_data: [],
      map_config: {
        zoom: 4,
        center: [37.5, 106],
        minZoom: 3,
        maxZoom: 18,
        attribution: '&copy; 高德地图'
      },
      MAP_IMAGE_PATH: '../../static/images/leaflet/man/',
      graphicLayerInst: null,
      layerGroupInst: null
    }
  },
  created() {
    this.mapStyle = 'width: 100%;height: ' + window.screen.height + 'px;'
  },
  mounted() {
    this.initMap()
    this.addMapLayer()
    this.addMapBtn()
  },
  methods: {
    initMap() {
      // need set default L.Icon.Default.imagePath
      L.Icon.Default.imagePath = this.MAP_IMAGE_PATH

      this.map = L.map('leaflet-map', {
        preferCanvas: true,
        center: this.map_config.center,
        zoom: this.map_config.zoom,
        minZoom: this.map_config.minZoom,
        maxZoom: this.map_config.maxZoom
        // scrollWheelZoom: false,
        // crs: crs
      })
      
      // this.map.on('zoomend', () => {
      //   if (this.reset_btn && this.map.getZoom() !== this.map_config.zoom) {
      //     this.reset_btn.enable()
      //   }
      // })


    },
    addMapLayer() {
      L.tileLayer.mapProvider('GaoDe.Normal.Map', {
        attribution: this.map_config.attribution
      })
      .addTo(this.map)
    },
    addMapBtn() {
      // add rest button
      // this.reset_btn = L.easyButton('fa-refresh', () => {
      //   if (this.markersBound) {
      //     this.map.fitBounds(this.markersBound)
      //   }
      // })
      // this.reset_btn.addTo(this.map)
      // this.reset_btn.disable()
    },
    resetMap() {
      // 关闭轨迹界面
      this.map.remove()
      this.initMap()
      this.addMapLayer()
      this.addMapBtn()
    },
    focusMarker(latlng) {
      // 放大地图
      this.map.setZoom(15)
      // 移动画面中心至目标
      this.map.panTo(latlng)
    },
    showDetail(type, id) {
      this.$emit('openDialog', type, id)
    },
    buildMapData(gpsData) {
      const graphics = []
      const geoJsonGroup = []
      let graphicsIndex = 0
      gpsData.forEach(item => {
        if (item.shapeType === 'point') {
          const img = new Image()
          img.src = item.imageUrl
          const imgStyle = L.supermap.imageStyle({
            img,
            anchor: [16, 16]
          })
          const features = item.data
          const count = item.data.length
          for (let i = 0; i < count; ++i) {
            const feature = features[i]
            if (feature.lat === feature.lng) {
              continue
            }
            graphics[graphicsIndex] = graphic({
              attributes: { id: feature.id, type: item.type },
              latLng: L.latLng(feature.lat, feature.lng),
              style: imgStyle.getStyle()
            })
            graphicsIndex++
          }
        } else if (item.shapeType === 'line' && item.data.length !== 0) {
          const geoJson = {
            features: [],
            type: 'FeatureCollenction'
          }
          const features = item.data
          const count = item.data.length
          for (let i = 0; i < count; ++i) {
            const line = features[i]
            if (line.data.length === 0) {
              continue
            }
            const feature = {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: []
              },
              properties: {
                type: item.type,
                id: line.id
              }
            }
            for (const point of line.data) {
              if (point.lat === point.lng) {
                continue
              }
              feature.geometry.coordinates.push([point.lng, point.lat])
            }
            geoJson.features.push(feature)
          }
          geoJsonGroup.push(geoJson)
        }
      })
      return { graphics, geoJsonGroup }
    },
    addGraphic(gpsData) {
      if (this.graphicLayerInst !== null) {
        const gpsList = []
        gpsList.push(gpsData)
        const mapData = this.buildMapData(gpsList)
        this.graphicLayerInst.addGraphics(mapData.graphics)
        // this.graphicLayerInst.update()
      }
    },
    addLine(gpsData) {
      if (this.layerGroupInst !== null) {
        const self = this
        const gpsList = []
        gpsList.push(gpsData)
        const mapData = this.buildMapData(gpsList)
        for (let i = 0; i < mapData.geoJsonGroup.length; i++) {
          const geoJson = mapData.geoJsonGroup[i]
          const lineLayer = L.geoJson(geoJson, {
            style: {
              color: 'green',
              weight: 3
            },
            onEachFeature(feature, layer) {
              layer.on('click', () => {
                console.log('lineOnClick')
                self.showDetail(feature.properties.type, feature.properties.id)
              })
            }
          })
          this.layerGroupInst.addLayer(lineLayer)
        }
      }
    },
    initGraphicLayer() {
      // widgets.loader.showLoader()
      // this.map.remove()
      // this.init_map_data = graphicData
      // const graphicData = buildGraphicData(gpsData)
      // 绘制GeoJson图层组
      // if (graphicData.layerGroup !== undefined && graphicData.layerGroup.length > 0) {
      //   graphicData.layerGroup.addTo(this.map)
      // }

      const self = this
      // 绘制点图层
      this.graphicLayerInst = graphicLayer([], {
        render: 'canvas',
        onClick(graphic) {
          self.showDetail(graphic.getAttributes().type, graphic.getAttributes().id)
        }
      })
      this.graphicLayerInst.addTo(this.map)
      this.layerGroupInst = new L.LayerGroup()
      this.map.addLayer(this.layerGroupInst)

      // widgets.loader.removeLoader()
    },
    clearPointLayer() {
      this.graphicLayerInst.removeGraphics()
    },
    clearLineLayer() {
      this.layerGroupInst.clearLayers()
    }
  }
}
</script>
<style lang="scss" scoped>
#leaflet-map {
  // width: 100%;
  // height: 680px;
  .easy-button-button {
    border: none;
    border-radius: 2px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    background-color: #fff;
    .fa {
      vertical-align: 0;
      font-size: 1.3em;
    }
  }
}
@media (max-width: 768px) {
  #leaflet-map {
    height: 300px;
  }
}
</style>

