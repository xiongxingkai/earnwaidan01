<template>
  <div>
    <el-form-item :label="title+':'" label-width="80px">
      <span v-for="(item,index) in list" :key="index">
        <span :class="item.className" @click="chooseStyle(item)">{{item.name}}</span>
      </span>
    </el-form-item>
  </div>
</template>
<script>
export default {
  props: {
    title: '',
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
    chooseStyle(obj) {
      if (obj.className === 'name') {
        obj.className = 'choose'
      } else {
        obj.className = 'name'
      }
      this.$emit('choose', this.title)
    }
  }
}
</script>
<style lang="scss" scoped>
.name {
  padding: 6px 4px;
  margin-right: 8px;
  color: #606266;
  cursor: pointer;
}
.choose {
  padding: 6px;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 5px;
  color: #66b1ff;
  background-color: #ecf5ff;
  border: 1px solid #66b1ff;
}
</style>
