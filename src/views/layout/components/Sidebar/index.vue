<template>
  <scroll-bar>
    <el-menu mode="vertiacl" :default-active="navselected" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409eff">
      <sidebar-item :routes="permissionMenus"></sidebar-item>
    </el-menu>
    <div class="nest-menu" style="margin-bottom:50px;"></div>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import { setTimeout } from 'timers';

export default {
  components: {
    SidebarItem,
    ScrollBar
  },
  data() {
    return {
      navselected: ''
    }
  },
  methods: {
    getNavType() {
      const self = this
      setTimeout(() => {
        self.navselected = self.$route.path
      }, 500)
    }
  },
  created() {
    this.getNavType()
  },
  computed: {
    ...mapGetters(['permissionMenus', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  watch: {
    $route: 'getNavType'
  }
}
</script>
