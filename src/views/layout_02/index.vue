<template>
  <div class="app-wrapper">
    <el-container class="container">
      <el-header class="sggheader">
        <navbar></navbar>
      </el-header>
      <el-container>
        <el-aside width="180px" style="z-index: 4000;">
          <!-- <sidebar></sidebar> -->
          <div class="sidebar">
            <ul class="menu">
              <li v-if="$store.getters.cacheViews[0]!=='自助录入'" @mouseover="hiddenSubMenu()">
                <!-- 首页 -->
                <img src="../../../static/menuicon/首页.png" alt="首页">
                <router-link :to="{ path: '/dashboard'}" style="display: inline-block;height: 100%;vertical-align: middle;">{{$t('navbar.dashboard')}}</router-link>
              </li>

              <li v-if="$store.getters.cacheViews[0]!=='自助录入'" @mouseover="hiddenSubMenu()">
                <img src="../../../static/menuicon/数据中心.png" alt="首页">
                <router-link :to="{ path: '/datacenter'}" style="display: inline-block;height: 100%;vertical-align: middle;">数据中心</router-link>
              </li>

              <li v-for="(item,index) in permissionTopMenus" :index="item.title" :key="item.name" ref="subLis" >
                <p @mouseover="showSubMenu(item, index)" style="margin:0;" v-if="item.title!=='系统管理'">
                  <img :src="icons[item.code]" v-if="item.code!==12121" >{{item.title}}
                  <i class="el-icon-arrow-right" v-if="item.title!=='系统管理'"></i>
                </p>
                <p  @mouseover="hiddenSubMenu(index)" @mouseleave="hiddenSubMenu()" style="margin:0;" v-else>
                  <img :src="icons[item.code]">
                  <a href="http://10.0.7.132:8085/login" target="_blank" style="display: inline-block;height: 100%;">{{item.title}}</a>
                </p>
                <router-link :to="{ path: '/datacenter'}" style="display: inline-block;height: 100%;vertical-align: middle;">数据中心</router-link>
              </li>

              <li v-if="$store.getters.cacheViews[0]!=='自助录入'" @mouseover="hiddenSubMenu()">
                <img src="../../../static/menuicon/个人中心.png" alt="个人中心">
                <!-- 个人中心 -->
                <router-link :to="{ path: '/personal'}" style="display: inline-block;height: 100%;vertical-align: middle;">{{$t('navbar.personal')}}</router-link>
              </li>
            </ul>
          </div>
        </el-aside>
        <el-main>
          <div class="submenu" ref='submenu' @mouseleave="hiddenSubMenu()">
            <div class="content-view">
              <div v-for="item in menus" :key="item.code" class="block">
                <p class="title">{{item.title}}</p>
                <div v-for="subItem in item.children" :key="subItem.code" class="content" @click="hiddenSubMenu()"> 
                  <router-link :to="subItem.path" class="subTlt" v-if="subItem.children.length===0">
                    {{subItem.title}}
                  </router-link>
                  <p v-for="thirdItem in subItem.children" :key="thirdItem.code" style="margin:0;">
                    <router-link :to="thirdItem.path" class="subTlt" >
                      {{subItem.title}}
                    </router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <tags-view></tags-view>
          <app-main></app-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Navbar, AppMain, TagsView } from './components'
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
  components: {
    Navbar,
    AppMain,
    TagsView
  },
  data() {
    return {
      menus: [],
      icons: {
        S100000000: '../../../static/menuicon/系统配置管理.png',
        H000000000: '../../../static/menuicon/人力资源.png',
        O000000000: '../../../static/menuicon/综合办公.png',
        A000000000: '../../../static/menuicon/资产管理.png',
        E000000000: '../../../static/menuicon/报销管理.png',
        W000000000: '../../../static/menuicon/流程中心.png',
        P000000000: '../../../static/menuicon/项目管理.png',
        P100000000: '../../../static/menuicon/财务管理.png',
        S000000000: '../../../static/menuicon/系统管理.png',
      }
    }
  },
  computed: {
    // sidebar() {
    //   return this.$store.state.app.sidebar
    // },
    ...mapGetters(['sidebar', 'name', 'avatar', 'permissionTopMenus', 'deptName'])
  },
  methods: {
    getSubMenu(val) {
      this.menus = val.children
      if (val.title === '系统管理') {
        window.open('http://10.0.7.132:8085/login')
      } else {
        this.$store.dispatch('GetSubMenu', val)
      }
    },
    showSubMenu(val, index) {
      this.$refs.subLis.forEach(item => {
        item.style = 'background: #304156;color: #fff;'
      })
      this.getSubMenu(val)
      this.$refs.subLis[index].style = 'background: #001228;color: #0090ff;'
      this.$refs.submenu.style.left = '180px'
      this.$refs.submenu.style.transition = 'left linear .3s'
    },
    hiddenSubMenu(index) {
      this.$refs.subLis.forEach(item => {
        item.style = 'background: #304156;color: #fff;'
      })
      if (index) {
        this.$refs.subLis[index].style = 'background: #001228;color: #0090ff;'
      }
      this.$refs.submenu.style.left = '-440px'
      this.$refs.submenu.style.transition = 'left linear .3s'
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #e4e7ed;
}
.container {
  height: 100%;
}
// 头部区域
  .sggheader {
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    z-index: 5000;
  }
img {
  vertical-align: middle;
  padding-right: 10px;
}
.sidebar {
  height: 130%;
  .box {
    position: relative;
  }
  .menu {
    margin: 0;
    padding: 0;
    width: 180px;
    li {
      position: relative;
      padding-left: 15px;
      font-size: 15px;
      height: 45px;
      line-height: 45px;
      list-style: none;
      color: rgba(255, 255, 255, .9);
      cursor: pointer;
      &:hover {
        background-color: #001228;
        color: #0090ff;
      }
    }
  }
  .el-icon-arrow-right {
    position: absolute;
    display: inline-block;
    height: 45px;
    line-height: 45px;
    right: 10px;
  }
}
.el-header {
  padding: 0;
}
.el-main {
  position: relative;
  padding: 0;
  margin-left: 180px;
  background-color: #e4e7ed;
}
.el-aside {
  background-color: #304156;
  position: fixed;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
}
.submenu {
  &::-webkit-scrollbar {
    display: none;
  }
  .content-view {
    display: flex;
    flex-wrap: wrap;
    height: 140%;
    align-content: flex-start;
  }
  position: fixed;
  height: 100%;
  left: -440px;
  width: 620px;
  overflow: auto;
  z-index: 3000;
  background: rgba(0, 18, 40, .9);
  .block {
    width: 30%;
    margin-left: 20px;
    margin-bottom: 25px;
  }
  .title {
    color: #bfcbd9;
    font-size: 15px;
  }
  .content {
    padding-left: 20px;
    font-size: 14px;
    color: rgba(255, 255, 255, .9);
  }
  .subTlt {
    display: block;
    padding-bottom: 10px;
    &:hover {
      color: #0090ff;
    }
  }
}
</style>
