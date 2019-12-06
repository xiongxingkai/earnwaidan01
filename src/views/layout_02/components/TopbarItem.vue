<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">

      <el-submenu v-if="item.title!=='系统管理'" :index="item.title" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
          <span>{{generateTitle(item.title)}}</span>
        </template>
        <template v-for="child in item.children">
          <sidebar-item :is-nest="true" class="nest-menu" :routes="[child]" :key="child.path"></sidebar-item>
          <!-- <router-link v-else :to="'/' + item.code+'/'+child.code" :key="child.name">
            <el-menu-item :index="'/'+item.code+'/'+child.code" :route="'/'+item.code+'/'+child.code">
              <svg-icon v-if="child.icon" :icon-class="child.icon"></svg-icon>
              <span>{{generateTitle(child.title)}}</span>
            </el-menu-item>
          </router-link> -->
        </template>
      </el-submenu>
      <template v-else>
        <div :key="item.name">
          <svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
          <a href="http://10.0.7.132:8085" target="view_frame">
            <span>{{generateTitle(item.title)}}</span>
          </a>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n'

export default {
  name: 'TopbarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    generateTitle
  }
}
</script>
