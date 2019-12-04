<template>
  <div id="menupag">
    <div class="listContainer text-center">
      <h1>导航菜单列表</h1>
      <router-link target="_blank"
                   v-for="(router,index) in menuList"
                   :key="index"
                   :to="router.url">{{router.title}}</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'menupag',
  data () {
    return {
      menuList: [
        {
          title: '登录',
          url: '/login'
        },
        {
          title: '顾客偏好业态',
          url: '/consumer-nalysis'
        },
        {
          title: '用户画像分析',
          url: '/picture-board'
        },
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
#menupag {
  padding: 25px;
  width: 300px;
  margin: auto;
  .listContainer {
    border: 1px dashed #f00;
    box-shadow: 0 0 5px 5px #f0f;
    a {
      display: block;
      padding: 5px;
      margin: 5px;
      color: #f00;
      transition: all .25s linear;
    }
    a:hover {
      background: #0ff;
      color: #fff;
    }
  }
}
</style>