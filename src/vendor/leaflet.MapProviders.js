// this js is refer to https://github.com/htoooth/Leaflet.ChineseTmsProviders
import configJs from '../../config/config.js'
import L from 'leaflet'

const MAPBOX_TOKEN = 'pk.eyJ1IjoicGxheW5pdW5pdSIsImEiOiJjOWMyYjA3MTU1MDFmMWM1OTM2OTM5YzczODRKM2U0NSJ9.OC4GhScXX0FqODs-2_vSuw'

L.TileLayer.MapProvider = L.TileLayer.extend({

  initialize(type, options) { // (type, Object)
    const providers = L.TileLayer.MapProvider.providers

    const parts = type.split('.')

    const providerName = parts[0]
    const mapName = parts[1]
    const mapType = parts[2]

    const url = providers[providerName][mapName][mapType]
    options.subdomains = providers[providerName].Subdomains

    L.TileLayer.prototype.initialize.call(this, url, options)
  }
})

L.TileLayer.MapProvider.providers = {
  TianDiTu: {
    Normal: {
      Map: 'http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}',
      Annotion: 'http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}'
    },
    Satellite: {
      Map: 'http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}',
      Annotion: 'http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}'
    },
    Terrain: {
      Map: 'http://t{s}.tianditu.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}',
      Annotion: 'http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}'
    },
    Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
  },
  GaoDe: {
    Normal: {
      // Map: '//webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
      Map: configJs.MAP_URL + '?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
    }，
    Satellite: {
      Map: '//webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
      Annotion: '//webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
    },
    Subdomains: ['1', '2', '3', '4']
  },
  Google: {
    Normal: {
      // Map: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'
      Map: configJs.MAP_URL + '/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'
    },
    Satellite: {
      Map: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
    },
    Subdomains: []
  },
  Geoq: {
    Normal: {
      Map: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
      Color: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetColor/MapServer/tile/{z}/{y}/{x}',
      PurplishBlue: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
      Gray: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
      Warm: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}',
      Cold: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetCold/MapServer/tile/{z}/{y}/{x}'
    },
    Subdomains: []
  },
  BAIDU: {
    Normal: {
      Map: 'http://map1.szewec.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scale=1&p=1'
    },
    Subdomains: []
  },
  QQ: {
    Normal: {
      Map: 'http://map.szewec.com/maptilesv2/?z={z}&x={x}&y={y}&styleid=1000&scene=0&version=227'
    },
    Subdomains: []
  },
  OSM: {
    Normal: {
      Map: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    },
    Subdomains: ['a', 'b', 'c']
  },
  Mapbox: {
    Normal: {
      Map: 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token=' + MAPBOX_TOKEN
    },
    Subdomains: ['a', 'b', 'c', 'd']
  }
}

L.tileLayer.mapProvider = function(type, options) {
  return new L.TileLayer.MapProvider(type, options)
}