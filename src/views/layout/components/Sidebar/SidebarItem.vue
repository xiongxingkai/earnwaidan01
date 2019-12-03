<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <!-- <router-link v-for v-if="item.children.length === 1 && !item.children[0].children" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name" >
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.title">{{generateTitle(item.children[0].meta.title)}}</span>
        </el-menu-item>
      </router-link> -->
<!-- 
      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title">{{generateTitle(item.meta.title)}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path">
          </sidebar-item>
          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.meta.title">{{generateTitle(child.meta.title)}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu> -->
      <el-submenu v-if="item.title!=='系统管理'" :index="item.title" :key="item.code">
        <template slot="title">
          <svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
          <span>{{generateTitle(item.title)}}</span>
        </template>
        <template v-for="child in item.children">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.code">
          </sidebar-item>
          <router-link v-else :to="child.path" :key="child.code">
            <el-menu-item :index="child.path" :route="child.path">
              <svg-icon v-if="child.icon" :icon-class="child.icon"></svg-icon>
              <span >{{generateTitle(child.title)}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
      <template v-else>
        <div :key="item.code">
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
  name: 'SidebarItem',
  props: {
    routes: {
      Type: Array
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
