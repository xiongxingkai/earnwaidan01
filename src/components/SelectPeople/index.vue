<template>
  <div>
    <el-input v-model="value" readonly placeholder="选择人员" class="_select_people_input">
      <el-button @click="showSelPeopleDialog" slot="append" :disabled="disabled" class="_edit_btn">
        <img src="./static/images/common/logo.png" width="25" height="25" alt="">
      </el-button>
    </el-input>
    <el-dialog title="选择人员" :visible.sync="isShowSelPeopleDialog" width="50%" append-to-body custom-class="selPeopleDialogForTopMargin" :close-on-click-modal="false" :close-on-press-escape="false" @close="closeDialog">
      <el-row>
        <el-col :span="8">
          <el-tree class="filter-tree deptTree" :key="1" node-key="id" :default-expanded-keys="['73253b9b8c2841d880edd45e4fe4d520']" :highlight-current="true" :data="treeData" @node-click="getNode" :props="defaultProps" ref="deptTree"></el-tree>
        </el-col>
        <el-col :span="16" class="rightArea">
          <div class="queryArea">
            <el-input v-model="queryForm.name" placeholder="请输入姓名进行搜索" @keyup.native.enter="search"></el-input>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-table class="selTable" v-loading="loading" :data="tableData" style="width:100%;" @row-click="selectPeople" border :header-cell-style="{background: '#0090ff',textAlign: 'center',color: '#fff'}">
                <el-table-column prop="name" label="姓名"></el-table-column>
              </el-table>
            </el-col>
            <el-col :span="12">
              <div class="tagArea">
                <el-tag :key="index" v-for="(item, index) in tagsArr" closable :disable-transition="false" @close="handleTagClose(item)">{{item}}</el-tag>
              </div>
            </el-col>
          </el-row>
          <div class="paginationContainer">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryForm.page" :page-sizes="[10]" :page-size="queryForm.limit" background layout="prev, pager, next" :total="total"></el-pagination>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveEdit">确定</el-button>
        <el-button  @click="clearTags">清空</el-button>
        <el-button type="primary" @click="closeDialog">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getTree, page } from '@/api/hr/employee/employee'
export default {
  name: 'selpeople',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    singleSelect: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.initData()
  },
  watch: {
    value() {
      this.initData()
    }
  },
  data() {
    return {
      isShowSelPeopleDialog: false,
      tagsArr: [],
      queryForm: {
        deptId: '',
        name: '',
        limit: 10,
        page: 1,
        department1: '',
        department2: '',
        department3: '',
        empStatus: [],
        empType: [],
        endhHireDate: '',
        gender: [],
        number: '',
        post: '',
        sequence: [],
        startHireDate: '',
        workRank: []
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeData: [],
      tableData: [],
      total: 0,
      defaultClickedNodeData: {},
      loading: false
    }
  },
  methods: {
    showSelPeopleDialog() {
      this.tagsArr = this.value ? this.value.split(',') : []
      this.getNode(this.defaultClickedNodeData)
      this.isShowSelPeopleDialog = true
    },
    initData() {
      getTree().then(res => {
        if (res.status === 200) {
          this.treeData = res.data
          this.defaultClickedNodeData = res.data[0]
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err.message
        })
      })
    },
    search() {
      this.loading = true
      page(this.queryForm).then(res => {
        this.loading = false
        if (res.status === 200) {
          this.tableData = res.data.rows
          this.total = res.data.total
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      }).catch(err => {
        this.loading = false
        this.$message({
          type: 'warning',
          message: err.message
        })
      })
    },
    resetForm() {
      this.queryForm.limit = 10
      this.queryForm.page = 1
      this.queryForm.name = ''
      this.search()
    },
    handleSizeChange(val) {
      this.queryForm.limit = val
      this.search()
    },
    handleCurrentChange(val) {
      this.queryForm.page = val
      this.search()
    },
    getNode(data) {
      this.queryForm.deptId = data.id
      this.resetForm()
    },
    handleTagClose(tag) {
      this.tagsArr.splice(this.tagsArr.indexOf(tag), 1)
    },
    selectPeople(row) {
      if (this.tagsArr.indexOf(row.name) === -1) {
        if (this.singleSelect) {
          this.tagsArr.splice(0, 1, row.name)
        } else {
          this.tagsArr.push(row.name)
        }
      }
    },
    clearTags() {
      this.tagsArr = []
    },
    closeDialog() {
      this.isShowSelPeopleDialog = false
      this.clearTags()
    },
    saveEdit() {
      this.$emit('input', this.tagsArr.join())
      this.closeDialog()
    }
  },
}
</script>
<style lang="scss" scoped>
.rightArea {
  padding: 15px;
  padding-top: 0;
  .queryArea {
    padding: 20px 0;
    .el-input {
      display: inline-block;
      width: 280px;
      margin-right: 20px;
    }
  }
  .paginationContainer {
    padding: 15px 5px;
    text-align: left;
  }
}
.tagArea {
  width: 100%;
  height: 485px;
  overflow: auto;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 5px;
  text-align: left;
  .el-tag {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .el-tag + .el-tag {
    margin-left: 0;
  }
}
</style>
<style lang="scss">
._select_people_input {
  .el-input-group__append {
    padding: 0 15px;
    text-align: center;
    ._edit_btn.el-button {
      padding: 0;
      vertical-align: middle;
    }
  }
}
.selTable tr td {
  cursor: pointer;
}
.el-dialog.selPeopleDialogForTopMargin {
  margin-top: 10vh !important;
  .deptTree {
    height: 640px;
    overflow: auto;
    padding: 0 10px;
  }
  .el-dialog__footer {
    text-align: center;
  }
}
</style>