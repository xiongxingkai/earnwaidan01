<template>
  <div>
    <div v-if="trace">
      <el-checkbox v-model="followChk">画面跟随</el-checkbox>
      <el-button id="playBtn" @click="playTrace" :disabled="playBtn">开始</el-button>
      <el-button id="pauseBtn" @click="pauseTrace" :disabled="pauseBtn">暂停</el-button>
      <el-button  @click="resetTrace" :disabled="resetBtn">重置</el-button>
      速度:
      <el-select v-model="playSpeed" style="width: 80px;">
        <el-option :value="500/1" label="x 1"></el-option>
        <el-option :value="500/2" label="x 2"></el-option>
        <el-option :value="500/5" label="x 5"></el-option>
      </el-select>
      <div class="block">
        <el-slider v-model="progress" :show-tooltip="false" :disabled="!showProgress" @change="changeProgress"></el-slider>
      </div>
      <div id="lefalet-map" :style="mapStyle"></div>
    </div>
  </div>
</template>
<script>
import L from 'leaflet'
import 'proj4leaflet' // 自定义坐标系
import 'leaflet.markercluster' // 标签聚合
import '@/vendor/leaflet.MapProvider.js'
import '@/vendor/leaflet.rotatedMarker.js'
import '@/components/LeafletMap/leaflet.EasyButton.vue'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'font-awesome/css/font-awesome.min.css'
import { clearTimeout, setTimeout } from 'timers';
export default {
  props: ['mapData'],
  data() {
    return {
      mapStyle: 'width: 100%;height: 680px;',
      map: null,
      markers: null,
      geoJsonLayer: null,
      init_map_data: null,
      reset_btn: null,
      trace: false,
      marker: null,
      polyline: null,
      index: 0,
      followChk: false,
      playBtn: true,
      pauseBtn: true,
      resetBtn: true,
      map_config: {
        zoom: 4,
        center: [37.5, 106],
        minZoom: 3,
        maxZoom: 18,
        attribution: '&copy; 高德地图'
      },
      markersBound: null,
      MAP_IMAGE_PATH: '../../static/images/leaflet/man/',
      playSpeed: 500,
      progress: 0,
      showProgress: false,
      assets: null,
      assetsIcon: null,
      cars: null,
      carsIcon: null,
      supervisors: null,
      manIcon: null,
      projects: null,
      standbyIcon: null
    }
  },
  created() {
    this.mapStyle = 'width: 100%;height: ' + window.screen.height + 'px;'
  },
  mounted() {
    this.ininMap()
    this.addMapLayer()
    this.addMapBtn()
    const odiv = document.getElementById('leaflet-map')
    odiv.style.height = window.screen.height + 'px'
  },
  methods: {
    // 地图初始化
    ininMap() {
      // need set default L.Icon.Default.imagePath
      L.Icon.Default.imagePath = this.MAP_IMAGE_PATH

      // var crs = new L.Proj.CRS('EPSG:3857', '+proj=merc +lon_0=0 +k=1 +x_0=140 +y_0=-250 +datum=WGS84 +units=m +no_defs', {
      //   resolution: function () {
      //     var level = 19
      //     var res = []
      //     res[0] = Math.pow(2, 18)
      //     for (var i = 1;i < level; i++) {
      //       res[i] = Math.pow(2, (18 - i))
      //     }
      //     return res
      //   }(),
      //   origin: [0, 0],
      //   bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
      // })

      // 地图初始化 center中心位置， zoom缩放层级
      this.map = L.map('leaflet-map', {
        center: this.map_config.center,
        zoom: this.map_config.zoom,
        minZoom: this.map_config.minZoom,
        maxZoom: this.map_config.maxZoom
        // scrollWheelZoom: false,
        // crs: crs
      })

      // 当地图缩放时触发
      this.map.on('zoomend', () => {
        if (this.reset_btn && this.map.getZoom() !== this.map_config.zoom) {
          this.reset_btn.enable()
        }
      })
    },
    // 添加高德地图
    addMapLayer() {
      L.tileLayer.mapProvider('GaoDe.Normal.Map', {
        attribution: this.map_config.attribution
      }).addTo(this.map)
    },

    // 设置重置按钮
    addMapBtn() {
      // add rest button
      this.reset_btn = L.easyButton('fa-refresh', () => {
        if (this.markersBound) {
          // 将地图视图尽可能的设定在给定的地理边界内
          this.map.fitBounds(this.markersBound)
        }
      })
      // 将重置按钮放在地图上
      this.reset_btn.addTo(this.map)
      this.reset_btn.disable()
    },

    // 添加集群层
    addClusterLayer(geoJsonData) {
      // clear pervious layer
      if (this.markers) {
        this.markers.clearLayers()
      }
      this.markers = L.markerClusterGroup()
      this.geoJsonLayer = L.geoJson(geoJsonData, {
        onEachFeature: this.onEachFeature
      })
      // 添加图层
      this.markers.addLayer(this.geoJsonLayer)
      this.markers.addTo(this.map)
    },
    onEachFeature(feature, layer) {
      let html = ''
      let tip = ''
      if (feature.properties.type === 'car') {
        html = '车牌号：' +
        feature.properties.plateNum + 
        '<br>时间：' +
        feature.properties.time + 
        '<br>经度：' +
        feature.geometry.coordinates[0] + 
        '<br>纬度：' +
        feature.geometry.coordinates[1] 
      }
      if (feature.properties.html) {
        html = feature.properties.html
      }
      if (feature.properties.tip) {
        tip = feature.properties.tip
      }
      //给图表
      if (feature.properties.iconUrl) {
        const myIcon = L.icon({
          iconUrl: feature.properties.iconUrl,
          iconSize: [15, 15],
          iconAnchor: [15, 8],
          popupAnchor: [-8, -8],
          shadowUrl: feature.properties.shadowUrl,
          shadowSize: [15, 15],
          shadowAnchor: [10, 8]
        })
        switch (feature.properties.type) {
          case 'car':
            // if (this.carsIcon === null) {
            //   this.carsIcon = myIcon
            // }
            layer.setIcon(myIcon)
            break
          case 'asset':
            if (this.assetsIcon === null) {
              this.assetsIcon = myIcon
            }
            layer.setIcon(this.assetsIcon)
            break
          case 'man':
            if (this.manIcon === null) {
              this.manIcon = myIcon
            }
            layer.setIcon(this.manIcon)
            break
          case 'standby':
            if (this.standbyIcon === null) {
              this.standbyIcon = myIcon
            }
            layer.setIcon(this.standbyIcon)
            break
          default: 
            layer.setIcon(myIcon)
            break
        }
      }
      if (tip !== '') {
        layer.bindTooltip(tip, {
          permanent: true,
          offset: [0, 0], // 偏移
          direction: 'right' // 放置位置
          // sticky: true, // 是否标记在点上面
          // className: 'anim-tooltip' // CSS控制
        }).openTooltip()
      }
      if (html !== '') {
        // 显示HTML内容窗口
        layer.bindPopup(html)
      }
      layer.on('mouseover', function() {
        // 鼠标移上去显示弹出框
        this.openPopup()
      })
      layer.on('mouseout', function() {
        // 鼠标移上去隐藏弹出框
        this.closePopup()
      })
      if (feature.properties.clickToDialog) {
        layer.on('click', () => {
          this.showDetail(feature.properties.type, feature.properties.id, feature)
        })
      }
    },

    updateMapData(map_data) {
      // need set default L.Icon.Default.imagePath
      L.Icon.Default.imagePath = this.MAP_IMAGE_PATH
      if (map_data.feature.length !== 0) {
        this.addClusterLayer(map_data)
        // 返回线段的经纬度边界
        this.markersBound = this.markers.getBounds()
        this.map.fitBounds(this.markersBound)
      }
    },
    changeProgress() {
      this.index = parseInt(this.progress / 100 * this.init_map_data.features.length)
      const feature = this.init_map_data.features[this.index]
      this.setMarker(feature).catch(() => {
        clearTimeout(this.timer)
      })
    },
    async setMarker(feature) {
      const latlng = [
        parseFloat(feature.geometry.coordinates[1]),
        parseFloat(feature.geometry.coordinates[0])
      ]
      if (!this.marker) {
        this.marker = L.marker()
      }
      let html = ''
      if (feature.properties.type === 'car') {
        html = '车牌号：' +
        feature.properties.plateNum + 
        '<br>时间：' + 
        this.$options.filters.parseTime(feature.properties.time, '{y}-{m}-{d} {h}:{i}') + 
        '<br>经度：' + 
        feature.geometry.coordinates[0] + 
        '<br>纬度：' + 
        feature.geometry.coordinates[1]
      }
      this.marker.bindPopup(html)
      this.marker.setLatLng(latlng).setRotationAngle(feature.properties.course - 100)
      .addTo(this.map)
      .openPopup()
    },
    setMarkers(features) {
      this.markers = new L.LayerGroup()
      features.forEach(element => {
        const latlng = [
          parseFloat(element.geometry.coordinates[1]),
          parseFloat(element.geometry.coordinates[0])
        ]
        const marker = L.marker()
        let html = ''
        let tip = ''
        if (element.properties.type === 'car') {
          html = '车牌号：' + 
          element.properties.plateNum + 
          '<br>时间：' +
          this.$options.filters.parseTime(element.properties.time, '{y}-{m}-{d} {h}:{i}') + 
          '<br>定位：' + 
          element.properties.location + 
          '<br>经度：' + 
          element.geometry.coordinates[0] + 
          '<br>纬度：' + 
          element.geometry.coordinates[1]
          tip = '车牌号：' + element.properties.plateNum 
        }
        if (element.properties.type === 'man') {
          html = '姓名：' + 
          element.properties.plateNum + 
          '<br>时间：' +
          element.properties.time + 
          '<br>经度：' + 
          element.geometry.coordinates[0] + 
          '<br>纬度：' + 
          element.geometry.coordinates[1]
          tip = '姓名：' + element.properties.plateNum 
        }
        if (element.properties.html) {
          html = element.properties.html
        }
        if (element.properties.tip) {
          tip = element.properties.tip
        }
        marker.bindPopup(html)
        marker.setLatLng(latlng)
        // 给图标
        if (element.properties.iconUrl) {
          const myIcon = L.icon({
            iconUrl: element.properties.iconUrl,
            iconSize: [30, 30],
            iconAnchor: [30, 15],
            popupAnchor: [-15, -16],
            shadowUrl: element.properties.shadowUrl,
            shadowSize: [30, 30],
            shadowAnchor: [20, 15]
          })
          marker.setIcon(myIcon)
        }
        if (tip !== '') {
          marker.bindTooltip(tip, {
            permanent: true,
            offset: [0, 0], // 偏移
            direction: 'right' // 放置位置
            // sticky: true, // 是否标记在点上面
            // className: 'anim-tooltip' // CSS控制
          }).openTooltip()
        }
        marker.on('mouseover', function() {
          // 鼠标移上去显示弹出框
          this.openPopup()
        })
        marker.on('mouseout', function() {
          // 鼠标移上去隐藏弹出框
          this.closePopup()
        })
        this.markers.addLayer(marker)
      })
      this.map.addLayer(this.markers)
    },
    painTrace(geoJsonData) {
      const latlngs = []
      for (const feature of geoJsonData.features) {
        if (feature.geometry.type === 'Point') {
          latlngs.push([
            parseFloat(feature.geometry.coordinates[1]),
            parseFloat(feature.geometry.coordinates[0])
          ])
        }
      }
      this.setMarker(geoJsonData.features[0])
      this.polyline = L.polyline(latlngs, { color: 'red' })
      this.markersBound = this.polyline.getBounds()
      this.map.fitBounds(this.markersBound)
      this.markers = new L.LayerGroup()
      this.markers.addLayer(this.polyline)
      this.map.addLayer(this.markers)
      this.showProgress = true
    },
    initMarkers(geoJsonData) {
      // 显示所有标记点（车辆、人）
      this.init_map_data = geoJsonData
      L.Icon.Default.imagePath = this.MAP_IMAGE_PATH
      const corners = []
      for (const feature of geoJsonData.features) {
        if (feature.geometry.type === 'Point') {
          corners.push(L.latLng(
            parseFloat(feature.geometry.coordinates[1]),
            parseFloat(feature.geometry.coordinates[0])
          ))
        }
      }
      if (this.markers) {
        this.markers.clearLayers()
      }
      this.setMarkers(geoJsonData.features)
      this.markersBound = L.latLngBounds(corners)
      this.map.fitBounds(this.markersBound)
    },
    // 开始
    playTrace() {
      this.playBtn = true
      this.pauseBtn = false
      this.resetBtn = false

      const feature = this.init_map_data.features[this.index]
      this.setMarker(feature).catch(() => {
        clearTimeout(this.timer)
      })
      this.progress = this. index / this.init_map_data.features.length * 100
      this.index++
      const latLng = [
        parseFloat(feature.geometry.coordinates[1]),
        parseFloat(feature.geometry.coordinates[0])
      ]
      if (this.followChk) {
        this.map.panTo(latlng)
      }
      if (this.index < this.init_map_data.features.length) {
        this.timer = setTimeout(() => this.playTrace(), this.playSpeed)
      } else {
        this.playBtn = true
        this.pauseBtn = true
        this.map.panTo(latlng)
      }
    },
    // 暂停
    pauseTrace() {
      this.playBtn = false
      this.pauseBtn = true
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    // 重置
    resetTrace() {
      this.playBtn = false
      this.pauseBtn = true
      this.resetBtn = true
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.index = 0
      this.progress = 0
      const feature = this.init_map_data.features[this.index]
      this.setMarker(feature).catch(() => {
        clearTimeout(this.timer)
      })
    },
    initListenMsg(geoJsonData) {
      // 显示所有标记点（车辆、人）
      this.init_map_data = geoJsonData
      this.updateMapData(this.init_map_data)
    },

    showCarTrack(traceData) {
      // clear pervious layer
      if (this.markers) {
        this.markers.clearLayers()
      }
      this.playBtn = false
      // 显示车辆轨迹
      this.init_map_data = traceData
      this.painTrace(this.init_map_data)
    },
    resetMap() {
      // 关闭轨迹界面
      this.trace = false
      this.playBtn = true
      this.pauseBtn = true
      this.resetBtn = true
      this.showProgress = false
      this.map.remove()
      this.initMap()
      this.addMapLayer()
      this.addMapBtn()
    },
    focusMarker(latlng) {
      // 移动画面中心至目标
      this.map.panTo(latlng)
    },
    async setDataList(geoJsonData, MAP_IMAGE_PATH) {
      if (MAP_IMAGE_PATH !== null && MAP_IMAGE_PATH !== undefined && MAP_IMAGE_PATH.length > 0) {
        this.MAP_IMAGE_PATH = MAP_IMAGE_PATH
      }
      this.trace = false
      this.initMarkers(geoJsonData)
    },
    async setDataListInCluster(geoJsonData, MAP_IMAGE_PATH) {
      if (MAP_IMAGE_PATH !== null && MAP_IMAGE_PATH !== undefined && MAP_IMAGE_PATH.length > 0) {
        this.MAP_IMAGE_PATH = MAP_IMAGE_PATH
      }
      this.trace = false
      this.initListenMsg(geoJsonData)
    },
    initHistoryTrace(feature) {
      this.trace = true
      // clear pervious layer
      if (this.markers) {
        this.markers.clearLayers()
      }
      const latlngs = []
      if (feature.geometry.type === 'Point') {
        latlngs.push([
          parseFloat(feature.geometry.coordinates[1]),
          parseFloat(feature.geometry.coordinates[0])
        ])
      }
      this.setMarker(feature)
    },
    setHistoryTrace(geoJsonData) {
      this.showCarTrack(geoJsonData)
    },
    // 设置仪表板数据列表
    async setDashboardDataList(geoJsonData, type) {
      this.trace = false
      // 显示所有标记点（车辆、人、项目、仪器）
      switch (type) {
        case 'asset':
          // clear pervious layer
          if (this.assets) {
            this.assets.clearLayers()
          }
          if (geoJsonData.features.length !== 0 ) {
            // 创建一个组 一个初始图层
            this.assets = new L.LayerGroup()
            // 创建一个Geojson图层
            this.geoJsonLayer = L.geoJson(geoJsonData, {
              onEachFeature: this.onEachFeature
            })
            this.assets.addLayer(this.geoJsonLayer)
            this.assets.addTo(this.map)
          }
          break
        case 'car':
          // clear pervious layer
          if (this.cars) {
            this.cars.clearLayers()
          }
          if (geoJsonData.features.length !== 0 ) {
            // 创建一个组 一个初始图层
            this.cars = new L.LayerGroup()
            // 创建一个Geojson图层
            this.geoJsonLayer = L.geoJson(geoJsonData, {
              onEachFeature: this.onEachFeature
            })
            this.cars.addLayer(this.geoJsonLayer)
            this.cars.addTo(this.map)
          }
          break
        case 'supervisor':
          // clear pervious layer
          if (this.supervisor) {
            this.supervisor.clearLayers()
          }
          if (geoJsonData.features.length !== 0 ) {
            // 创建一个组 一个初始图层
            this.supervisor = new L.LayerGroup()
            // 创建一个Geojson图层
            this.geoJsonLayer = L.geoJson(geoJsonData, {
              onEachFeature: this.onEachFeature
            })
            this.supervisor.addLayer(this.geoJsonLayer)
            this.supervisor.addTo(this.map)
          }
          break
        case 'project':
          // clear pervious layer
          if (this.projects) {
            this.projects.clearLayers()
          }
          this.projects = new L.LayerGroup()
          if (geoJsonData.sectionGPS.features.length !== 0 ) {
            // 描绘项目路段
            // let latlngs = []
            // for (const feature of geoJsonData.sectionGPS.features[0].geometry.coordinates) {
            //   latlngs.push([
            //     parseFloat(feature[1]),
            //     parseFloat(feature[0])
            //   ])
            // }
            // this.polyline = L.polyline(latlngs, { color: 'green' })
            // this.projects.addLayer(this.polyline)
            // latlngs = []
            // for (let i = 35; i < 40; i++) {
            //   latlngs.push([
            //     parseFloat(geoJsonData.sectionGPS.features[1].geometry.coordinates[i][1]),
            //     parseFloat(geoJsonData.sectionGPS.features[1].geometry.coordinates[i][0])
            //   ])
            // }
            // this.polyline = L.polyline(latlngs, { color: 'green' })
            // this.projects.addLayer(this.polyline)
            const sectionGPS = geoJsonData.sectionGPS
            this.geoJsonLayer = L.geoJson(sectionGPS, {
              style: {
                color: 'green',
                weight: 3
              },
              onEachFeature: this.onEachFeature
            })
            this.projects.addLayer(this.geoJsonLayer)
          }
          // 描绘驻点信息
          if (geoJsonData.baseStation.features.length !== 0) {
            const baseStation = geoJsonData.baseStation
            this.geoJsonLayer = L.geoJson(baseStation, {
              onEachFeature: this.onEachFeature
            })
            this.projects.addLayer(this.geoJsonLayer)
          }
          // 描绘旁站信息
          if (geoJsonData.standby.features.length !== 0) {
            const standby = geoJsonData.standby
            this.geoJsonLayer = L.geoJson(standby, {
              onEachFeature: this.onEachFeature
            })
            this.projects.addLayer(this.geoJsonLayer)
          }
          this.map.addLayer(this.projects)
          break
        default:
          return false
      }
    },
    // 在集群钟设置仪表板数据列表
    async setDashboardDataListInCluster(geoJsonData, type) {
      this.trace = false
      // 显示所有标记点（车辆、人、项目、仪器）
      switch (type) {
        case 'asset':
          // clear pervious layer
          if (this.assets) {
            this.assets.clearLayers()
          }
          if (geoJsonData.features.length !== 0 ) {
            // this.assets = new L.LayerGroup()
            this.assets = L.markerClusterGroup({
              iconCreateFunction: cluster => {
                const html = '<b>' + cluster.getChildCount() + '</b>'
                return L.divIcon({
                  className: 'assetCluster',
                  html,
                  iconSize: L.point(30, 30)
                })
              }
            })
            this.geoJsonLayer = L.geoJson(geoJsonData, {
              onEachFeature: this.onEachFeature
            })
            this.assets.addLayer(this.geoJsonLayer)
            this.assets.addTo(this.map)
          }
          break
        case 'car':
          // clear pervious layer
          if (this.cars) {
            this.cars.clearLayers()
          }
          if (geoJsonData.features.length !== 0 ) {
            // this.cars = new L.LayerGroup()
            this.cars = L.markerClusterGroup({
              iconCreateFunction: cluster => {
                const html = '<b>' + cluster.getChildCount() + '</b>'
                return L.divIcon({
                  className: 'carCluster',
                  html,
                  iconSize: L.point(30, 30)
                })
              }
            })
            this.geoJsonLayer = L.geoJson(geoJsonData, {
              onEachFeature: this.onEachFeature
            })
            this.cars.addLayer(this.geoJsonLayer)
            this.cars.addTo(this.map)
          }
          break
        case 'supervisor':
          // clear pervious layer
          if (this.supervisors) {
            this.supervisors.clearLayers()
          }
          if (geoJsonData.features.length !== 0 ) {
            // this.supervisors = new L.LayerGroup()
            this.supervisors = L.markerClusterGroup({
              iconCreateFunction: cluster => {
                const html = '<b>' + cluster.getChildCount() + '</b>'
                return L.divIcon({
                  className: 'supervisorCluster',
                  html,
                  iconSize: L.point(30, 30)
                })
              }
            })
            this.geoJsonLayer = L.geoJson(geoJsonData, {
              onEachFeature: this.onEachFeature
            })
            this.supervisors.addLayer(this.geoJsonLayer)
            this.supervisors.addTo(this.map)
          }
          break
        case 'project':
          // clear pervious layer
          if (this.projects) {
            this.projects.clearLayers()
          }
          // this.projects = new L.LayerGroup()
          this.projects = L.markerClusterGroup({
            iconCreateFunction: cluster => {
              const html = '<b>' + cluster.getChildCount() + '</b>'
              return L.divIcon({
                className: 'projectCluster',
                html,
                iconSize: L.point(30, 30)
              })
            }
          })
          if (geoJsonData.sectionGPS.features.length !== 0 ) {
            const sectionGPS = geoJsonData.sectionGPS
            this.geoJsonLayer = L.geoJson(sectionGPS, {
              style: {
                color: 'green',
                weight: 3
              },
              onEachFeature: this.onEachFeature
            })
            this.projects.addLayer(this.geoJsonLayer)
          }
          // 描绘驻点信息
          if (geoJsonData.baseStation.features.length !== 0) {
            const baseStation = geoJsonData.baseStation
            this.geoJsonLayer = L.geoJson(baseStation, {
              onEachFeature: this.onEachFeature
            })
            this.projects.addLayer(this.geoJsonLayer)
          }
          // 描绘旁站信息
          if (geoJsonData.standby.features.length !== 0) {
            const standby = geoJsonData.standby
            this.geoJsonLayer = L.geoJson(standby, {
              onEachFeature: this.onEachFeature
            })
            this.projects.addLayer(this.geoJsonLayer)
          }
          this.map.addLayer(this.projects)
          break
        default:
          return false
      }
    },
    showDetail(type, id, feature) {
      this.$emit('openDialog', type, id, feature)
    },
    boundsLayerGroup() {
      // 合并layer
      const group = L.LayerGroup()
      if (this.projects) {
        this.projects.addTo(group)
      }
      if (this.supervisors) {
        this.supervisors.addTo(group)
      }
      if (this.cars) {
        this.cars.addTo(group)
      }
      if (this.assets) {
        this.assets.addTo(group)
      }
      const layers = this.groupToLayers(group)
      if (layers.length > 0) {
        // 创建一个图组 指定一个初始图层
        const featuresGroup = L.featureGroup(layers)
        // 返回要素组的经纬度边界 （通过子图层的边界和坐标获得）
        this.markersBound = featuresGroup.getBounds()
        // 将地图视图尽可能的设定在给定的地理边界内
        this.map.fitBounds(this.markersBound)
      }
    },
    groupToLayers(layerGroup) {
      if (layerGroup._layers) {
        // 得到图层组合
        const layerGroups = layerGroup.getLayers()
        let layers = []
        for (const layer of layerGroups) {
          const tempLayer = this.groupToLayers(layer)
          layers = layers.concat(tempLayer)
        }
        return layers
      } else {
        const layers = []
        layers.push(layerGroup)
        return layers
      }
    }
  }
}
</script>

<style lang="scss">
// #leaflet-map {
//   width: 100%;
//   height: 747px!important;
// }
/* icon style */
#leaflet-map {
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

.anim-toolip {
  transition: opacity 4s linear; /* 动画效果*/
  font: italic bold 12px/30px arial, sans-serif;
  font-family: 'Times New Roman', Georgia, Serif;
  /*字体发光*/
  text-shadow: 1px 0 0 #8b4513, 0 1px 0 #8b4513, 0 -1px 0 #8b4513, -1px 0 0 #8b4513, 1px 0 1px #8b4513, 0 1px 1px #8b4513, 0 -1px 1px #8b4513, -1px 0 1 px #8b4513;
}
.assetCluster,
.carCluster,
.supervisorCluster,
.projectCluster {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  text-align: center;
  font-size: 18px;
}
/* 设备 */
.assetCluster {
  background-color: rgba(0, 255, 255 .8);
  border: 5px solid rgba(10, 254, 255, .5)
}
/* 车辆 */
.carCluster {
  background-color: rgba(173, 255, 47 .8);
  border: 5px solid rgba(215, 247, 174, .5)
}
/* 人员 */
.supervisorCluster {
  background-color: rgba(230, 140, 0 .8);
  border: 5px solid rgba(230, 140, 3, .5)
}
/* 旁站 */
.projectCluster {
  background-color: rgba(255, 0, 0 .9);
  border: 5px solid rgba(254, 0, 0, .5)
}
</style>

