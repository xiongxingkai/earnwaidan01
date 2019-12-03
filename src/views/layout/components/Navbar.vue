<template>
  <el-menu class="navbar" mode="horizontal" :style="{'height': height + 'px','line-height': height+'px'}">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.openend"></hamburger>

    <!-- <sidebar-item :routes="permissionTopMenus"></sidebar-item>
    <div class="left-menu">
      <h3 class="sggtitle">深圳高速工程顾问有限公司</h3>
      <ul class="menu">
        <li> -->
          <!-- 首页 -->
          <!-- <router-link :to="{path: '/dashboard'}">{{$t('navbar.dashboard')}}</router-link>
        </li>
        <li>
          <router-link :to="{path: '/datacenter'}">数据中心</router-link>
        </li>

        <li v-for="item in permissionTopMenus" @click="getSubMenu(item)" :index="item.title" :key="item.name">{{item.title}}</li>

        <li> -->
          <!-- 个人中心 -->
          <!-- <router-link :to="{path: '/personal'}">{{$t('navbar.personal')}}</router-link>
        </li>
      </ul>
    </div> -->
    <div class="left-menu">
      <div style="float: left;width: 245px;">
        <h3 class="sggtitle"></h3>
      </div>

      <!-- <el-col :span="16">
        <ul class="menu">
          <li v-if="$store.getters.cachedViews[0]!=='自助录入'">
            <router-link :to="{path: '/dashboard'}">{{$t(navbar.dashboard)}}</router-link>
          </li>
          <li v-if="$store.getters.cachedViews[0]!=='自助录入'">
            <router-link :to="{path: '/datacenter'}">数据中心</router-link>
          </li>
          <li v-for="item in permissionTopMenus" @click="getSubMenu(item)" :index="item.title" :key="item.name">{{item.title}}</li>
          <li v-if="$store.getters.cachedViews[0]!=='自助录入'">
            <router-link :to="{path: '/personal'}">{{$t(navbar.personal)}}</router-link>
          </li>
        </ul>
      </el-col> -->
      <div style="float: rigth;padding-right: 15px;">
        <el-dropdown class="avatar-container right-menu-item" trigger="click">
          <div class="avatar-wrapper" :title="$store.getters.name">
            <!-- <img src="avatar+'?imageView2/1/w/80/h/80'"  class="user-avatar"> -->
            <svg-icon icon-class="user" class-name="card-panel-icon" style="width: 22px;height:22px;color:#fff;vertical-align:middle; "/>
            <i class="el-icon-caret-bottom" style="color: #fff;vertical-align: middle;"></i>
            <span class="name" style="color:#fff;vertical-align:middle;">{{deptName}}:{{name}}</span>
          </div>
          <!-- 顶部栏右侧个人下拉 -->
          <el-dropdown-menu slot="dropdown">
            <router-link to="/personal" v-if="$store.getters.cachedViews[0]!=='自助录入'">
              <el-dropdown-item>
                {{$t(navbar.personal)}}
              </el-dropdown-item>
            </router-link>
            <router-link to="/dashboard" v-if="$store.getters.cachedViews[0]!=='自助录入'">
              <el-dropdown-item>
                {{$t(navbar.dashboard)}}
              </el-dropdown-item>
            </router-link>

            <!-- <router-link to="/datacenter">
              <el-dropdown-item>
                数据中心
              </el-dropdown-item>
            </router-link>
            <a href="http://10.0.7.132:9010/swagger/" target="_blank">
              <el-dropdown-item>
                API文档
              </el-dropdown-item>
            </a>   -->

            <el-dropdown-item divided>
              <span @click="logout">{{$t('navbar.logOut')}}</span>
            </el-dropdown-item>

            <!-- <template v-for="item in permissionTopMenus">
              <el-dropdown-item :index="item.title" :key="item.name">
                <span @click="getSubMenu(item.id)">{{item.title}}</span>
              </el-dropdown-item>
            </template> -->

          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!-- <div class="right-menu"> -->
      <!-- 错误消息提示 -->
      <!-- <error-log class="errLog-container right-menu-item"></error-log> -->
      <!-- 全屏按钮 -->
      <!-- <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="left">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>
    </div> -->
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import ScrollBar from '@/components/ScrollBar'
// import dashboard from '@/dashboard/index'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    // ErrorLog,
    // Screenfull,
    LangSelect,
    ThemePicker,
    // dashboard,
    ScrollBar
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar', 'permissionTopMenus', 'deptName']),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return {
      showStatus: true,
      height: 60
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    getSubMenu(val) {
      if (val.title === '系统管理') {
        window.open('http://10.0.7.132:8085/login')
      } else {
        this.$store.dispatch('GetSubMenu', val)
      }
    }
  },
  mounted() {
    this.$store.commit('SET_NAVBARHEIGHT', this.height)
  }
}
</script>

<style lang="scss" scoped>
// @media (min-width: 1500px) {
//   .sggtitle {
//     background-size: 62%;
//   }
// }
// @media (min-width: 1300px) and (max-width: 1499px) {
//   .sggtitle {
//     background-size: 80%;
//   }
// }
// @media (min-width: 1000px) and (max-width: 1299px) {
//   .sggtitle {
//     background-size: 80%;
//   }
// }
.navbar {
  // height: 60px;
  // line-height: 60px;
  margin-bottom: 10px;
  border-radius: 0 !important;
  background-color: #304156;
  color: #fff;
  .hamburger-container {
    display: none;
    height: 60px;
    line-height: 60px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  // 左边菜单栏
  .left-menu {
    // float: left;
    height: 100%;
    .menu {
      list-style: none;
      min-width: 1005px;
    }
    .sggtitle {
      // float: left;
      height: 60px;
      font-weight: 400;
      margin: 0 0 0 20px;
      background: url(../../../assets/img/logo3.png) no-repeat 0 center;
      background-size: 62%;
      padding-left: 36px;
    }
    .menu {
      float: left;
      li {
        float: left;
        cursor: pointer;
      }
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 56px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        top: 8px;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
