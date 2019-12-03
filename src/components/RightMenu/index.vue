<template>
  <ul class="vue-contextmenu-listWrapper" :class="'vue-contextmenuName-' + contextMenuData.menuName">
    <li v-for="item in contextMenuData.menulists" class="context-menu-list" :key="item.btnName">
      <button @click.stop="fnHandler(item)" type="button">
        <i :class="item.icoName"></i>
        <span>{{item.btnName}}</span>
      </button>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    contextMenuData: {
      type: Object,
      required: true,
      default() {
        return {
          menuName: null,
          axis: {
            x: null,
            y: null,
          },
          menulists: [
            {
              fnHandler: 'adddata',
              icoName: 'fa fa-home fa-fw',
              btnName: 'New'
            },
            {
              fnHandler: 'savedata',
              icoName: 'fa fa-home fa-fw',
              btnName: 'Save'
            }
          ]
        }
      }
    },
    transferIndex: {
      type: Number,
      default: 0
    }
  },
  watch: {
    'contextMenuData.axis'(val) {
      const x = val.x
      const y = val.y
      if (x === null || y === null) {
        // 处理控制台报错，dom对象找不到
        return 
      }
      const _this = this
      const index = _this.transferIndex
      const menuName = 'vue-contextmenuName-' + _this.contextMenuData.menuName
      const menu = document.getElementsByClassName(menuName)[index]
      // 将其他右键菜单隐藏
      const els = [...document.getElementsByClassName('vue-contextmenu-listWrapper')]
      els.forEach(el => {
        el.style.display = 'none'
      })
      if (_this.contextMenuData.isShow) {
        menu.style.display = 'block'
      }
      menu.style.left = x + 'px'
      menu.style.top = y + 'px'
      // 判断menu距离浏览器可视窗口底部距离，以免距离底部太近的时候，会导致menu被遮挡
      const menuHeight = this.contextMenuData.menulists.length * 32 // 不能用scrollHeight,获取到的menu是上一次的menu高度
      const menuWidth = 150
      const distanceToBottom = document.body.clientHeight - menu.offsetTop - menuHeight
      const distanceToRight = document.body.clientWidth - menu.offsetLeft - menuWidth
      if (distanceToBottom < menuHeight) {
        menu.style.top = y - menuHeight + 'px'
      }
      if (distanceToRight < menuWidth) {
        menu.style.left = x - menuWidth + 'px'
      }
      document.addEventListener('mouseup', e => {
        // 解决mac电脑在鼠标右键后会执行mouseup事件
        if (e.button === 0) {
          menu.style.display = 'none'
        }
      }, false)
    }
  },
  methods: {
    fnHandler(item) {
      this.$emit(item.fnHandler)
    }
  }
}
</script>
<style lang="scss" scoped>
.vue-contextmenu-listWrapper {
  box-shadow: 2px 2px 2px #ccc;
  display: none;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  .context-menu-list {
    width: 150px;
    height: 32px;
    border-radius: 4px;
    background: #fff;
    text-decoration: none;
    list-style: none;
    button {
      cursor: pointer;
      width: 100%;
      height: 100%;
      display: block;
      outline: 0;
      border: 0;
      &:hover {
        box-shadow: 0 1px 3px rgba(34,25,25,.2);
        color: #fff;
        border-radius: 4px;
        background: linear-gradient( to bottom, #409eff, #409eff)
      }
      i,
      span {
        float: left;
      }
      i {
        padding: 0 10px;
      }
    }
  }
}
</style>

