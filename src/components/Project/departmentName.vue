<template>
  <div>
    <!-- 这个组件绑定的是部门名称 -->
    <el-select v-model="selectedDepartment" filterable :loading="deptmentLoading" @change="selectedDepartments" :disabled="disabled">
      <el-option v-for="item in deptOption" :key="item.id" :label="item.label" :value="item.label">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import {
  projectDepartArr, // 获取所有部门
  projectDepartmentNode // 获取部门节点
} from '@/api/project/supervise/prj-info/project.js'
export default {
  name: 'supervisionDepartments',
  props: {
    selectedDepartment: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'mini'
    },
    deptNum: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      deptmentLoading: false,
      departmentList: undefined,
      deptOption: undefined
    }
  },
  methods: {
    initDepartmentList() {
      // 为All时走全部部门接口
      if (this.deptNum === 'All') {
        projectDepartArr().then(response => {
          if (response.status === 200) {
            this.deptOption = response.data.rows.map(item => {
              return {
                label: item.deptName,
                id: item.id,
                name: item.deptName,
                number: item.deptNumber
              }
            })

          } else {
            this.$message({
              title: '失败',
              type: 'error',
              message: response.message
            })
          }
        })
      } else if (this.deptNum !== 'blank') {
        projectDepartmentNode(this.deptNum).then(res => {
          if (res.status === 200) {
            this.deptOption = res.data.rows.map(item => {
              return {
                label: item.deptName,
                value: item.id,
                name: item.deptName,
                number: item.deptNumber
              }
            })
          } else {
            this.$message({
              title: '失败',
              type: 'error',
              message: res.message
            })
          }
        })
      } else {
        this.deptOption = []
      }
    },
    // 点击下拉框选项监听
    selectedDepartments(item) {
      this.$emit('update:selectedDepartment', item)
    }
  },
  watch: {
    deptNum(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', {
          number: '',
          name: ''
        })
        this.initDepartmentList()
      }
    }
  },
  mounted() {
    this.initDepartmentList()
  }
}
</script>

