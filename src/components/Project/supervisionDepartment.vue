<template>
  <div>
    <!-- 这个组件绑定的是部门名称 -->
    <el-select v-model="selectedDepartment" filterable placeholder="请选择部门名称" :loading="deptmentLoading" @change="selectedDepartments" :disabled="disabled">
      <el-option v-for="item in deptOption" :key="item.id" :label="item.label" :value="item">
        <span style="font-size: 13px;">{{item.name}}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import {
  projectDepartmentlist 
} from '@/api/project/supervise/prj-info/project.js'
export default {
  name: 'supervisionDepartment',
  props: {
    value: {
      type: Object,
      default: {
        number: '',
        name: ''
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedDepartment: undefined,
      deptmentLoading: false,
      departmentList: undefined,
      deptOption: undefined
    }
  },
  methods: {
    initDepartmentList() {
      projectDepartmentlist().then(response => {
          if (response.status === 200) {
            this.deptOption = response.data.rows.map(item => {
              return {
                label: item.deptName,
                value: item.id,
                name: item.deptName,
                number: item.deptNumber,
                deptNodesOption: this.value.deptNodesOptions
              }
            })
            if (
              this.value.number !== undefined &&
              this.value.number !== '0' &&
              this.value.number !== ''
            ) {
              this.selectedDepartment = this.value.name
            }

          } else {
            this.$message({
              title: '失败',
              type: 'error',
              message: response.message
            })
          }
        })
    },
    // 点击下拉框选项监听
    selectedDepartments(item) {
      this.$emit('input', {
        number: item.number,
        name: item.name
      })
    }
  },
  mounted() {
    this.initDepartmentList()
  }
}
</script>

