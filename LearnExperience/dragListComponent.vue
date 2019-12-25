<template>
  <div id="dragListComponent">
    <h4 class="processTitle">{{title}}</h4>
    <ul class="processList" @dragstart="onDragStart" @dragover="onDragOver" @dragend="onDragEnd" ref="parentNode">
      <li v-for="(item, index) in listArr" :key="index" draggable="true">
        {{item.name}}
        <div class="fr">
          <el-button icon="el-icon-edit" @click="editStep(index)"></el-button>
          <el-button icon="el-icon-delete" @click="delStep(index)"></el-button>
        </div>
      </li>
    </ul>
    <el-form :model="formData" v-if="isShowForm">
      <el-form-item label="" label-width="20px" required="">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <div class="text-center">
        <el-button type="primary" v-if="isNewAdd" @click="saveNewAdd">保存</el-button>
        <el-button type="primary" v-else @click="saveEdit">保存</el-button>
        <el-button type="info" @click="cancelSave">取消</el-button>
      </div>
    </el-form>
    <div class="btnArea text-center">
      <el-button class="lgBtn" icon="el-icon-plus" @click="addStep">{{buttonLabel}}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'dragComponent',
  props: {
    value: {
      type: Array,
      required: true,
      default: () => []
    },
    title: {
      type: String,
      required: true,
      default: '标题'
    },
    recruitPhase: {
      type: String,
      required: true,
      default: 'PICK'
    },
    buttonLabel: {
      type: String,
      required: true,
      default: '添加'
    }
  },
  data() {
    return {
      listArr: [],
      draging: null,
      target: null,
      startIndex: null,
      lastIndex: null,
      isShowForm: false,
      formData: {
        id: '',
        name: '',
        recruitPhase: '',
        order: 0
      },
      isNewAdd: false,
      editIndex: null // 用来保存当前正在编辑的元素在数组中的索引位置
    }
  },
  created() {
    this.listArr = JSON.parse(JSON.stringify(this.value))
  },
  watch: {
    value: {
      deep: true,
      handler(nveV) {
        this.listArr = JSON.parse(JSON.stringify(newV))
      }
    }
  },
  methods: {
    // 拖动开始时
    onDragStrat(event) {
      this.draging = event.target
      this.startIndex = this._index(this.draging)
      this.lastIndex = null
    },
    // 拖动结束
    onDragEnd() {
      // 如果拖动位置没有改变，直接返回
      if (this.lastIndex === null || this.lastIndex === this.startIndex) {
        return false
      }
      // 下移
      if (this.lastIndex > this.startIndex) {
        const arr = this.listArr.splice(this.startIndex, 1)
        this.listArr.splice(this.lastIndex, 0, JSON.parse(JSON.stringify(arr[0])))
        this.$emit('input', JSON.parse(JSON.stringify(this.listArr)))
      } else {
        // 上移
        const arr = this.listArr.splice(this.startIndex, 1)
        this.listArr.splice(this.lastIndex, 0, JSON.parse(JSON.stringify(arr[0])))
        this.$emit('input', JSON.parse(JSON.stringify(this.listArr)))
      }
    },
    // 拖动到目标对象上方
    onDragOver(event) {
      this.target = event.target
      if (this.target.nodeName === 'LI' && this.target !== this.draging) {
        this.lastIndex = this._index(this.target)
      }
    },
    _index(el) {
      const domData = Array.from(this.$refs.parentNode.childNodes)
      return domData.findIndex(i => i.innerText === el.innerText)
    },
    // 编辑筛选阶段
    editStep(index) {
      this.isShowForm = true
      this.editIndex = index
      this.formData = JSON.parse(JSON.stringify(this.listArr[index]))
    },
    // 删除筛选阶段
    delStep(index) {
      this.$confirm('确定要删除该条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listArr.splice(index, 1)
        this.$emit('input', JSON.parse(JSON.stringify(this.listArr)))
        this.$message({
          type: 'success',
          message: '删除成功！'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加阶段招聘流程
    addStep() {
      this.isShowForm = true
      this.isNewAdd = true
      this.formData = {
        id: '',
        name: '',
        recruitPhase: this.recruitPhase,
        order: 0
      }
    },
    // 保存添加阶段
    saveNewAdd() {
      if (!this.formData.name) {
        this.$message({
          type: 'warning',
          message: '请先填写名称'
        })
      } else {
        this.listArr.push(JSON.parse(JSON.stringify(this.formData)))
        this.listArr.forEach((item, index) => {
          item.order = index
        })
        this.cancelSave()
        this.$emit('input', JSON.parse(JSON.stringify(this.listArr)))
      }
    },
    // 保存添加阶段
    saveEdit() {
      if (!this.formData.name) {
        this.$message({
          type: 'warning',
          message: '请先填写筛选阶段名称'
        })
      } else {
        this.listArr.splice(this.editIndex, 1, JSON.parse(JSON.stringify(this.formData)))
        this.cancelSave()
        this.$emit('input', JSON.parse(JSON.stringify(this.listArr)))
      }
    },
    // 取消保存筛选阶段
    cancelSave() {
      this.isShowForm = false
      this.isNewAdd = false
    }
  }
}
</script>
<style lang="scss" scoped>
#dragListComponent {
  .processTitle {
    font-weight: 400;
    margin: 0 0 10px;
  }
  .text-center {
    text-align: center;
  }
  .btnArea {
    padding: 25px 0;
    .lgBtn {
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding-top: 0;
      padding-bottom: 0;
      color: #333;
      background: #f5f5f5;
      border: 0;
      font-weight: 700;
    }
  }
  .fr {
    float: right;
  }
  .processList {
    padding-left: 0;
    li {
      list-style: none;
      padding: 0 20px 0 50px;
      color: #999;
      font-size: 14px;
      height: 36px;
      line-height: 36px;
      margin-bottom: 5px;
      border: 1px solid #cccccc;
      border-radius: 5px;
      clear: both;
      .fr {
        float: right;
        .el-button {
          padding: 5px;
          border: 0;
        }
      }
    }
  }
}
</style>
