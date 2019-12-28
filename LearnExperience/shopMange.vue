<template>
  <div class="shopMange">
    <div class="title clearfix">
      <div class="fr">
        <el-button
          class="icon-btn sort-btn"
          @click="manageBusinessType"
        />
        <el-button
          class="icon-btn add-btn"
          @click="add"
        />
      </div>
      商铺信息
    </div>
    <el-table
      :data="tableData"
      size="small"
      class="bg-table"
      style="width: 100%;"
      border
    >
      <el-table-column
        prop="name"
        label="商铺名称"
        header-align="center"
        align="center"
        width="150"
      />
      <el-table-column
        prop="business_type"
        label="业态类型"
        header-align="center"
        align="center"
        width="150"
      />
      <el-table-column
        label="所属楼层"
        header-align="center"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.floors.map(item => item.name).toString() }}
        </template>
      </el-table-column>
      <el-table-column
        prop="device_count"
        label="设备数"
        header-align="center"
        align="center"
        width="150"
      />
      <el-table-column
        prop="location"
        label="位置"
        header-align="center"
        align="center"
        width="150"
      />
      <el-table-column
        label="添加时间"
        header-align="center"
        align="center"
        width="280"
      >
        <template slot-scope="scope">
          {{
            new Date(scope.row.created_at).toLocaleString('chinesse', {
              hour12: false
            })
          }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <span
            class="textBtn"
            @click="edit(scope.row)"
          >编辑</span>
          <span
            class="textBtn"
            @click="del(scope.row)"
          >删除</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagenationContainer text-right">
      <el-pagination
        :current-page="page"
        :page-size="per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <!-- 新增或编辑商铺弹窗 -->
    <el-dialog
      :title="(isNewAdd ? '新增' : '编辑') + '商铺'"
      :visible.sync="isShowShopDialog"
      width="370px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      custom-class="hasBorderDialog"
      @close="closeShopDialog"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item
          label="商铺名称"
          prop="name"
          size="small"
        >
          <el-input
            v-model="form.name"
            placeholder="请输入商铺名称"
          />
        </el-form-item>
        <el-form-item
          label="业态类型"
          size="small"
        >
          <el-select
            v-model="form.business_type_id"
            class="customerSelect"
          >
            <el-option
              v-for="item in business_type_arr"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="位置"
          prop="name"
          size="small"
        >
          <el-input
            v-model="form.location"
            placeholder="请输入位置"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <div class="btnContainer">
          <span @click="closeShopDialog">取 消</span>
          <span
            v-if="isNewAdd"
            @click="saveNewAdd"
          >确 认</span>
          <span
            v-else
            @click="saveEdit"
          >确 认</span>
        </div>
      </div>
    </el-dialog>
    <!-- 确认删除楼层弹窗 -->
    <el-dialog
      title="删 除"
      :visible.sync="isShowDelDialog"
      width="370px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      custom-class="hasBorderDialog"
      @close="isShowDelDialog = false"
    >
      <div class="text-center">确定删除 {{ currentFlor.name }}？</div>
      <div slot="footer">
        <div class="btnContainer">
          <span @click="isShowDelDialog = false">取 消</span>
          <span @click="doDel">确 认</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getFloorTableDataApi,
  saveNewAddFloorApi,
  saveEditFloorApi,
  delFloorApi
} from '@/api/peopleManage/areaMange'
export default {
  name: 'Floormange',
  props: {
    tableData: {
      type: Array,
      required: true,
      default: () => []
    },
    total: {
      type: Number,
      required: true,
      default: 0
    },
    page: {
      type: Number,
      required: true,
      default: 1
    },
    perPage: {
      type: Number,
      required: true,
      default: 10
    },
    businessTypeArr: {
      type: Array,
      required: true,
      default: () => []
    },
    floorsArray: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      isNewAdd: false,
      isShowShopDialog: false,
      form: {
        business_type_id: '',
        floor_ids: [],
        location: '',
        name: ''
      },
      rules: {
        name: [
          {
            required: true,
            max: 15,
            message: '必填项且最多输入15个字符',
            trigger: 'blur'
          }
        ],
        business_type_id: [
          {
            required: true,
            message: '请选择业态类型',
            trigger: ['blur', 'change']
          }
        ],
        floor_ids: [
          {
            required: true,
            message: '请选择所属楼层',
            trigger: ['blur', 'change']
          }
        ],
        location: [
          {
            required: true,
            message: '请输入位置',
            trigger: 'blur'
          }
        ]
      },
      isShowDelDialog: false,
      currentFlor: {},
      isShowShopDetailDialog: false,
      shopDetailTableData: [],
      shopDetailForm: {
        page: 1,
        per_page: 10,
        total: 0
      },
      isShowAreaDetailDialog: false,
      areaDetailTableData: [],
      areaDetailForm: {
        page: 1,
        per_page: 10,
        total: 0
      },
      isShowSortDialog: false,
      sortData: [],
      draging: null,
      target: null,
      startIndex: undefined,
      endIndex: undefined
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading...',
        spinner: 'el-icon-loading',
        background: 'rgba(0,0,0,0.7)'
      })
      getFloorTableDataApi({
        per_page: this.per_page,
        page: this.page,
        return: '',
        order_by: 'default'
      })
        .then(res => {
          loading.close()
          if (res.status === 200) {
            this.tableData = res.data
            this.total = +res.headers['x-total-count']
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
        .catch(err => {
          loading.close()
          this.$message({
            type: 'warning',
            message: err.message
          })
        })
    },
    handleCurrentChange(val) {
      this.page = val
      this.initData()
    },
    handleSizeChange(val) {
      this.per_page = val
      this.page = 1
      this.initData()
    },
    manageBusinessType() {
      console.log('业态管理')
    },
    del(obj) {
      this.currentFlor = obj
      this.isShowDelDialog = true
    },
    doDel() {
      delFloorApi(this.currentFlor.id).then(res => {
        if (!res.errors) {
          this.$message({
            type: 'success',
            message: '删除楼层成功'
          })
          this.isShowDelDialog = false
          this.initData()
        }
      })
    },
    add() {
      this.form = {
        business_type_id: '',
        floor_ids: [],
        location: '',
        name: ''
      }
      this.isNewAdd = true
      this.isShowShopDialog = true
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    edit(obj) {
      this.form = { ...obj }
      this.isShowShopDialog = true
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    saveNewAdd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading...',
            spinner: 'el-icon-loading',
            background: 'rgba(0,0,0,0.7)'
          })
          saveNewAddFloorApi(this.form)
            .then(res => {
              loading.close()
              if (!res.errors) {
                this.$message({
                  type: 'success',
                  message: '新增楼层成功'
                })
                this.closeShopDialog()
                this.initData()
              }
            })
            .catch(() => {
              loading.close()
              this.closeShopDialog()
            })
        } else {
          this.$message({
            type: 'warning',
            message: '请先完善表格后再保存'
          })
        }
      })
    },
    saveEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading...',
            spinner: 'el-icon-loading',
            background: 'rgba(0,0,0,0.7)'
          })
          saveEditFloorApi({ name: this.form.name }, this.form.id)
            .then(res => {
              loading.close()
              if (!res.errors) {
                this.$message({
                  type: 'success',
                  message: '更新商铺成功'
                })
                this.closeShopDialog()
                this.initData()
              }
            })
            .catch(() => {
              loading.close()
              this.closeShopDialog()
            })
        } else {
          this.$message({
            type: 'warning',
            message: '请先完善表格后再保存'
          })
        }
      })
    },
    closeShopDialog() {
      this.isNewAdd = false
      this.isShowShopDialog = false
    }
  }
}
</script>
<style lang="scss" scoped>
.shopMange {
  padding: 20px;
  background: #fff;
  .title {
    height: 42px;
    line-height: 42px;
    font-size: 18px;
    color: #202224;
    letter-spacing: 2.57px;
    margin-bottom: 10px;
  }
  .icon-btn {
    width: 42px;
    height: 42px;
    padding: 0;
    border: 0;
  }
  .sort-btn {
    background: url('../../../../../assets/images/manage.png');
  }
  .add-btn {
    background: url('../../../../../assets/images/add.png');
  }
  // .el-table--border {
  //   border-left: 0;
  //   border-right: 0;
  // }
  .textBtn {
    font-size: 12px;
    color: #1de9b6;
    letter-spacing: 1.71px;
    padding-right: 9px;
    margin-right: 9px;
    border-right: 1px solid #ebebeb;
    cursor: pointer;
    &:last-child {
      border-right: 0;
      padding-right: 0;
      margin-right: 0;
    }
  }
  .pagenationContainer {
    padding: 15px 20px;
  }
  .specialTip {
    margin-top: -10px;
    margin-bottom: 10px;
    font-size: 12px;
    color: #6f7379;
    letter-spacing: 1.71px;
    .icon {
      display: inline-block;
      width: 14px;
      height: 14px;
      line-height: 14px;
      text-align: center;
      border-radius: 14px;
      font-weight: bold;
      color: #fff;
      background-image: linear-gradient(180deg, #1dc5e9 0%, #1de9b6 100%);
    }
  }
  .sortTable {
    border-collapse: collapse;
    width: 100%;
    text-align: center;
    th,
    td {
      padding: 5px;
      border: 1px solid #dfe6ec;
    }
    td {
      cursor: move;
    }
  }
}
</style>
<style lang="scss">
.shopMange {
  // .el-table--border th.is-leaf:nth-child(5),
  // .el-table--border td.is-center:last-child {
  //   border-right: 0;
  // }
  .el-table {
    th > .cell {
      font-size: 12px;
      color: #474b4f;
      letter-spacing: 1.71px;
    }
    td > .cell {
      font-size: 12px;
      color: #6f7379;
      letter-spacing: 1.71px;
    }
  }
  .pagination {
    .el-pager li {
      color: #aaaeb3;
      background: #ffffff;
      border: 1px solid #ebebeb;
    }
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    color: #1de9b6;
    background: #ffffff;
    border: 1px solid #1de9b6;
  }
}
</style>

