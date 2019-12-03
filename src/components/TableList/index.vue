<template>
  <div id="editindex" :style="{'height': boxHeight+'px'}" >
    <!-- 仪表盘 @reset="reset" -->
    <search :search="apiSearchrows" :create="apiCreate" :break-line="singleSearch" @getSearch="searchTable" @reset="reset" />
    
    <div style="background:#fff;padding:15px;height:calc(100% - 86px);margin-top:5px;">
      <!-- 按钮组 -->
      <div v-if="apiButtonData.length>0" style="height:40px;line-height:40px;width:100%;background-color:#fff;margin-top:2px;margin-bottom:10px;">
        <el-button v-for="(item,index) in apiButtonData" :class="item.fieldEnName" :key="item.id" :type="index===0?item.type: ''" :size="item.width" @click="handleAction(item.fieldEnName,item.id)" >
          {{item.name}}
          <!-- 简单导出 -->
          <a id="simpleExport" v-if="item.fieldEnName === 'export'" 
          :href="urlConfig + apiExport.configUrl + '&apiUrl=' + urlGateConfig + apiExport.apiUrl + '&result=' + apiExport.result + '&token=' + tokens + apiExport.params + newStr" target="_blank">
          </a>
        </el-button>
      </div>
      <!-- table -->
      <el-table v-loading="listLoading" :data="list" @selection-change="selectionChange" border fit highlight-current-row :header-cell-style="{background:'#0090ff',color: '#fff'}" style="width: 100%;" :height="tableHeight" ref="table">
        <!-- selection -->
        <el-table-column fixed="left" type="selection" width="50"></el-table-column>
        <el-table-column fixed="left" type="index" width="50" label="序号"></el-table-column>
        <!-- :prop="item.fieldEnName" -->
        <el-table-column v-for="(item,index) in apiTableTitle.filter(tt => tt.isShow)" style="background-color: rgb(64,158,255)" :key="index" :align="item.align" :label="item.name" :width="item.width">
          <template slot-scope="scope">
            <!-- 支持行内编辑 -->
            <!-- 输入框 -->
            <template v-if="scope.row.editShow && item.type==='input'">
              <el-input v-model="scope.row[item.fieldEnName]" :disabled="item.readonly"></el-input>
            </template>
            <!-- 日期 -->
            <template v-else-if="scope.row.editShow && item.type==='date'">
              <el-date-picker v-model="scope.row[item.fieldEnName]" value-format="yyyy-MM-dd" :disabled="item.readonly" type="date" placeholder="选择日期"></el-date-picker>
            </template>
            <!-- 下拉框 -->
            <template v-else-if="scope.row.editShow && item.type==='select'">
              <el-select v-model="scope.row[item.fieldEnName]" :placeholder="'搜索'+item.name" :disabled="item.readonly">
                <el-option v-for="(ele,key) in (JSON.parse(item.value))" :key="key" :label="ele" :value="key"></el-option>
              </el-select>
            </template>
            <span v-else-if="!scope.row.editShow && item.type==='select'">{{JSON.parse(item.value)[scope.row[item.fieldEnName]]}}</span>
            <!-- 支持行内编辑 -->
            <span v-else>{{scope.row[item.fieldEnName]}}</span>
          </template>
        </el-table-column>
        <!-- 操作栏 -->
        <el-table-column v-if="apiActionData.length > 0" width="240" fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <span v-for="item in apiActionData" :key="item.id">
              <el-button v-if="item.fieldEnName==='detail'" :type="item.type" size="mini" @click="handleAction(item.fieldEnName,scope.row)" style="margin-right: 5px;" >
                查看
              </el-button>
              <el-button v-if="item.fieldEnName==='delete'" :type="item.type" size="mini" @click="handleAction(item.fieldEnName,scope.row)" style="margin-right: 5px;" >
                删除
              </el-button>
              <el-button v-if="item.fieldEnName==='editor'" :type="item.type" size="mini" @click="handleAction(item.fieldEnName,scope.row)" style="margin-right: 5px;" >
                编辑
              </el-button>
              <!-- 行内编辑按钮 -->
              <template v-else-if="item.fieldEnName==='editor_inner'">
                <el-button v-if="!scope.row.editShow" size="mini" type="primary" icon='el-icon-edit' style="margin-right:5px;" @click="handleAction(item.fieldEnName,scope.row)" >
                  编辑
                </el-button>
                <el-button v-else type="warning" size="mini" @click="confirmEdit(scope.row)" style="margin-right:5px;" >保存</el-button>
              </template>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination :total="listPage.totalNum" :page.sync="apiPage.page" :limit.sync="apiPage.limit" @pagination="loadTable"></pagination>
    </div>
    <!-- 导入弹框 -->
    <el-dialog title=" 提示 " :visible.sync="centerDialogVisible" width="30%">
      <form id="file_upload" style="text-align:center;">
        <p>
          <input type="file" id="exFile" accept="image/xlsx,image/xls">
        </p>
        <p id="test-file-info"></p>
        <el-button type="primary" @click="submitUpload" >导入
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible=false" >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Search from '@/components/Search/index'
import Pagination from '@/components/Pagination'
import { getToken } from '@/utils/auth' // 获取token
import configJs from './../../../config/config.js'
import { mapGetters } from 'vuex'
import { parseTime } from '@/filters/index'; // 时间过滤插件
import fileDownload from 'js-file-download' // 文件导出插件
export default {
  name: 'TableList',
  components: {
    Search,
    Pagination
  },
  props: {
    apiList: Function,
    apiData: Function, // detail function
    apiDelete: Function, // 单个删除
    apiBatchdel: Function, // 批量删除
    apiSearch: Function, // 最外层父组件传查询列表请求方法进来
    apiEdit: Function, // modify function
    apiCreate: {
      type: Boolean,
      default: true
    },
    apiTable: Function, // table function
    apiPage: {
      type: Object,
      default: () => ({
        page:1,
        limit:10
      })
    },
    apiExport: Object, // 导出
    apiAutoexport: Function, // 自动导出
    saveFlag: { // 服务名称
      type: Object,
      default: () => ({})
    },
    apiImport: Function, // 导入
    apiDownload: Function, // 下载模板
    apiFilename: Function, // 获取导出或下载文件名
    totalNum: 0,
    apiAction: Function, // 操作按钮
    apiButton: Function, // 按钮组
    addAction: Object,
    // 通过路由获取字段
    apiServicename: Function,
    field: {}, // 接路由字段数据
    afieldName: {
      type: Object,
      default: {}
    },
    miniAction: {
      type: Boolean,
      default: true
    },
    singleSearch: {
      type: Boolean,
      default: false
    },
    simpleSearch: {
      type: Boolean,
      default: false
    },
    apiFlowsub: Function, // 工作流提交
    apiFlowappr: Function, // 工作流审核
    apiFlowrej: Function // 工作流驳回
  },
  data() {
    return {
      boxHeight: null,
      bodyHeight: document.documentElement.clientHeight,
      navBarHeight: null,
      tagsViewHeight: null,
      tableHeight: null,
      formData: undefined, // 导入需要用到的字段
      list: null,
      apiSearchShow: false, // 控制仪表盘是否有值
      listLoading: true,
      expoertLoading: false, // 导出数据控制
      listPage: {
        totalNum: 0,
        isMore: false
      },
      apiSearchrows: [], // 接查询接口的值
      apiActionData: [], //接操作按钮组
      apiButtonData: [], // 按钮数组
      apiTableTitle: [], // 接表头数据
      deleteUrl: '', // 获取删除的url
      deleteWay: '', // 获取删除的请求方式
      multipleSelection: [], // 选中的行
      SystemIdentity: '', // 接请求表头带过来的请求服务标识
      hrefUrl: '', // 接点击导出a标签需要的导出地址
      newStr: '', // 接有值的查询框对象切成字符串
      urlConfig: configJs.REPORT_URL,
      urlGateConfig: configJs.BASE_API,
      tokens: getToken(),
      tabTitleSelect: {}, // 接表头字段是json对象的
      editId: '', // 行内id
      centerDialogVisible: false, // 导入弹框控制
      fileDatas: {}, // 接获取文件名称接口数据
      templateFileName: '', // 下载文件名
      exportFilename: '', // 自动导出的文件名
      fieldProperty: {}, // 字段属性
      allDataList: [] 
    }
  },
  computed: {
    ...mapGetters(['elements', 'deptName']),
    actionList() {
      return this.apiAction
    },
    showMini() {
      return this.miniAction && this.actionList.length > 1
    }
    
  },
  methods: {
    // build page query
    buildPageQuery() {
      const pageQuery = this.apiPage
      this.apiSearchrows.forEach(element => {
        // 查询字段是否显示
        if (element.isShow) {
          // assign default value 
          pageQuery[element.fieldEnName] = !element.value ? '': element.value
        }
      })
      this.apiSearchShow = true
      return pageQuery
    },
    loadTable() {
      this.listLoading = true
      // asset system identity
      if (!this.SystemIdentity) {
        this.$message({
          title: '失败',
          type: 'error',
          message: '系统标识不能为空!'
        })
        return
      }
      // 本地接口
      if (this.SystemIdentity === 'local') {
        const queryParams = JSON.stringify(this.buildPageQuery())
        if (this.allDataList !== null && this.allDataList.length > 0 && this.apiSearchShow !== true) {
          this.list = this.allDataList.slice((this.apiPage.page - 1) * this.apiPage.limit, this.apiPage.page * this.apiPage.limit)
          this.listLoading = false
        } else {
          this.apiList(queryParams).then(response => {
            if (response.status === 200) {
              const result = response.data
              this.list = []
              const data = result !== null && result.rows !== undefined ? (this.list = result.rows) : (this.allDataList = JSON.parse(JSON.stringify(result)))
              console.log(data === null)
              if (this.allDataList !== null && this.allDataList.length > 0) {
                result.total = this.allDataList.length
                this.list = this.allDataList.slice((this.apiPage.page - 1) * this.apiPage.limit, this.apiPage.page * this.apiPage.limit)
              }
              result.total = result.total === undefined || result.total === null ? 0 : result.total
              this.listLoading = false
              this.$set(this.listPage, item.serviceName, result.total)
              this.$set(this.list, item.serviceName, result.rows)
              this.list[item.serviceName].forEach(item => {
                // 支持行内编辑
                this.$set(item, 'editShow', false)
                // 返回类型转换
                for (const key in item) {
                  const val = item[key]
                  const property = this.fieldProperty[key]
                  if (property && property.type === 'select') {
                    // 转文本类型，匹配下拉值
                    this.$set(item, key, val.toString())
                  } else if (property && property.type === 'timestamp') {
                    // 时间戳
                    this.$set(item, key, parseTime(Number(val)))
                  } else if (property && property.type === 'date') {
                    // 日期
                    this.$set(item, key, val)
                  } else {
                    this.$set(item, key, val)
                  }
                }
              })
            } else {
              this.$message({
                title: '失败',
                type: 'error',
                message: response.message
              })
              this.listLoading[item.serviceName] = false
            }
          })
        }

        this.postForms.children.forEach(item => {
          this.listLoading[item.serviceName] = true
          if (this.$route.params.id) {
            this.apiPage[item.serviceName][this.postForms.children[0].childField] = this.$route.params.id
          }
          this.apiPage[item.serviceName].blockNo = item.serviceName + 'Search'
          const queryParams = JSON.stringify(this.apiPage[item.serviceName])
          this.apiList(queryParams).then(response => {
            if (response.status === 200) {
              this.listLoading[item.serviceName] = false
              const result = response.data
              this.$set(this.listPage, item.serviceName, result.total)
              this.$set(this.list, item.serviceName, result.rows)
              this.list[item.serviceName].forEach(item => {
                // 支持行内编辑
                this.$set(item, 'editShow', false)
                // 返回类型转换
                for (const key in item) {
                  const val = item[key]
                  const property = this.fieldProperty[key]
                  if (property && property.type === 'select') {
                    // 转文本类型，匹配下拉值
                    this.$set(item, key, val.toString())
                  } else if (property && property.type === 'timestamp') {
                    // 时间戳
                    this.$set(item, key, parseTime(Number(val)))
                  } else if (property && property.type === 'date') {
                    // 日期
                    this.$set(item, key, val)
                  } else {
                    this.$set(item, key, val)
                  }
                }
              })
            } else {
              this.$message({
                title: '失败',
                type: 'error',
                message: response.message
              })
              this.listLoading[item.serviceName] = false
            }
          })
        })
      } else if (this.SystemIdentity === 'out') {
        this.apiList(queryParams).then(response => {
          if (response.status === 200) {
            const result = response.data
            this.list = result.rows
            this.list.forEach(item => {
              for (const key in item) {
                // 下拉字段转换
                const property = this.fieldProperty[key]
                if (property && property.type === 'select') {
                  const valProperty = this.fieldProperty[key].value
                  item[key] = JSON.parse(valProperty)[item[key]]
                }
              }
            })
            this.listPage.totalNum = result.total
            this.listLoading = false
          } else {
            this.$message({
              title: '失败',
              type: 'error',
              message: response.message
            })
            this.listLoading = false
          }
        })
      }
    },
    // 表头初始化，拿系统识别字段
    // 接系统标识admin的是message： local， oa的是：message： out
    getTableTitle() {
      const listquery = {
        blockNo: this.afieldName.getTableTitle
      }
      this.apiTable(listquery).then(res => {
        if (res.status === 200) {
          this.SystemIdentity = res.message
        }
      })
    },
    // 表单列表初始化接口
    getForms() {
      const listquery = {
        blockNo: this.afieldName.getFormList
      }
      this.apiCreate(listquery).then(res => {
        // 表单生成后再请求数据，如果有id的时候在渲染详情数据，过滤新增的时候发这个请求
        if (this.$route.params && this.$route.params.id) {
          this.getFormDetail() // 详情初始化
        } else {
          // 新增的时候传进去的为false
          this.isDetail = false
        }
        this.postForms = res.data
        // 渲染表单
        for (const index in this.postForms) {
          if (index !== 'children') {
            this.$set(this.formDatas, index, null)
          }
        }
        // 先请求详情数据回来之后再渲染表单列表，避免组件赋值有问题
        this.apiButtonData = res.data.children
        this.apiTableTitle = res.data.children
        for (const el of this.apiTableTitle) {
          this.$set(this.fieldProperty, el.fieldEnName, {})
          this.$set(this.fieldProperty[el.fieldEnName], 'type', el.type)
          this.$set(this.fieldProperty[el.fieldEnName], 'value', el.value)
        }
        this.apiActionData = res.data.children
        this.postForms.children.forEach(item => {
          this.$set(this.list, item.serviceName, [])
          this.$set(this.listPage, item.serviceName, 0)
          this.$set(this.listLoading, item.serviceName, false)
          this.$set(this.apiPage, item.serviceName, { page: 1, limit: 10 })
        })
      })
    },
    loadChildTable(name) {
      this.listLoading[name] = true
      // asset system identity
      if (!this.SystemIdentity) {
        this.$message({
          title: '失败',
          type: 'error',
          message: '系统标识不能为空!'
        })
        return
      }
      // 本地接口
      if (this.SystemIdentity === 'local') {
        if (this.$route.params.id) {
          this.apiPage[name][this.postForms.children[0].childField] = this.$route.params.id
        }
        this.apiPage[name].blockNo = name + 'Search'
        const queryParams = JSON.stringify(this.apiPage[name])
        this.apiList(queryParams).then(response => {
          if (response.status === 200) {
            this.listLoading[name] = false
            const result = response.data
            this.$set(this.listPage, name, result.total)
            this.$set(this.list, name, result.rows)
            this.list[name].forEach(item => {
              // 支持行内编辑
              this.$set(item, 'editShow', false)
              // 返回类型转换
              for (const key in item) {
                const val = item[key]
                const property = this.fieldProperty[key]
                if (property && property.type === 'select') {
                  // 转文本类型，匹配下拉值
                  this.$set(item, key, val.toString())
                } else if (property && property.type === 'timestamp') {
                  // 时间戳
                  this.$set(item, key, parseTime(Number(val)))
                } else if (property && property.type === 'date') {
                  // 日期
                  this.$set(item, key, val)
                } else {
                  this.$set(item, key, val)
                }
              }
            })
          } else {
            this.$message({
              title: '失败',
              type: 'error',
              message: response.message
            })
            this.listLoading[name] = false
          }
        })
      } else if (this.SystemIdentity === 'out') {
        this.apiList(queryParams).then(response => {
          if (response.status === 200) {
            const result = response.data
            this.list = result.rows
            this.list.forEach(item => {
              for (const key in item) {
                // 下拉字段转换
                const property = this.fieldProperty[key]
                if (property && property.type === 'select') {
                  const valProperty = this.fieldProperty[key].value
                  item[key] = JSON.parse(valProperty)[item[key]]
                }
              }
            })
            this.listPage.totalNum = result.total
            this.listLoading[name] = false
          } else {
            this.$message({
              title: '失败',
              type: 'error',
              message: response.message
            })
            this.listLoading[name] = false
          }
        })
      }
    },
    getChildDetail(paramsId) {
      // 先请求回来系统识别后再发详情的请求
      const listquery = {
        blockNo: this.blockNo + 'table'
      }
      this.apiTable(listquery).then(res => {
        if (res.status === 200) {
          this.SystemIdentity = res.message 
          // 如果是admin
          if(this.SystemIdentity && this.SystemIdentity === 'local' && paramsId) {
            const detailQuery = {
              blockNo: this.blockNo + 'Form',
              id: paramsId
            }
            this.apiData(detailQuery).then(res => {
              const detailData = res.data
              for (const key in detailData) {
                if ( detailData.hasOwnProperty(key) && detailData[key] !== null) {
                  detailData[key] = detailData[key].toString()
                }
              }
              this.childrenformDatas = detailData
            })
          } else if (this.SystemIdentity && this.SystemIdentity === 'out' && paramsId) {
            this.apiData(paramsId).then(res => {
              const detailData = res.data
              this.childrenformDatas = detailData
            })
          }
        }
      })
    },
    // 获取表单详情数据
    getFormDetail() {
      const paramsId = this.$route.params.id
      // 先请求回来系统识别后再发详情的请求
      const listquery = {
        blockNo: this.afieldName.getTableTitle
      }
      this.apiTable(listquery).then(res => {
        if (res.status === 200) {
          this.SystemIdentity = res.message 
          // 如果是admin
          if(this.SystemIdentity && this.SystemIdentity === 'local' && paramsId) {
            const detailQuery = {
              blockNo: this.afieldName.getFormList,
              id: paramsId
            }
            this.apiData(detailQuery).then(res => {
              const detailData = res.data
              for (const key in detailData) {
                if ( detailData.hasOwnProperty(key) && detailData[key] !== null) {
                  detailData[key] = detailData[key].toString()
                }
              }
              this.formDatas = detailData
              this.$set(this.apiPage, this.postForms.children[0].childField, this.formDatas[this.postForms.children[0].parentField])
              this.loadTable()
            })
          } else if (this.SystemIdentity && this.SystemIdentity === 'out' && paramsId) {
            this.apiData(paramsId).then(res => {
              const detailData = res.data
              this.formDatas = detailData
            })
          }
        }
      })
    },
    readId() {
      return (this.isEdit && this.$route.params && this.$route.params.id) || null
    },
    // 表单保存
    submitForm() {
      this.$refs['rule-form'].validate(valid => {
        if (valid) {
          this.adminSaveForm()
        } else {
          console.log('error submit !!')
        }
      })
    },
    // 子表单保存
    submitChildForm(name, idx) {
      this.$refs['child-form'].validate(valid => {
        if (valid) {
          this.childSaveForm(name, idx)
        } else {
          console.log('error submit !!')
        }
      })
    },
    // 子表单 服务的新增和修改
    childSaveForm(name, idx) {
      if (this.SystemIdentity === 'local') {
        // 如果是admin
        this.subData = {
          blockNo: this.blockNo + 'Form'
        }
        for (const index in this.childTitle) {
          this.subData[this.childTitle[index].requestParams] = this.childrenformDatas[index]
        }
        this.subData[this.postForms.children[0].childField] = this.apiPage[this.blockNo][this.postForms.children[0].childField]
      } else {
        // 如果是oa
        this.subData = {}
        for (const index in this.childTitle) {
          this.subData[this.childTitle[index].requestParams] = this.childrenformDatas[index]
        }
      }

      if (name === 'add') {
        this.apiSave(this.subData).then(response => {
          if (response.status === 200) {
            this.$notify({
              title: '成功',
              type: 'success',
              message: '保存成功',
              duration: 2000
            })
            this.status = 'success'
            this.apiPage[this.blockNo].page = 1
            this.apiPage[this.blockNo].limit = 10
            this.loadChildTable(this.blockNo) // 详情初始化
            this.addTable = false
          } else {
            this.addTable = false
            this.$message({
              type: 'error',
              title: '失败',
              message: response.message
            })
            this.apiPage[this.blockNo].page = 1
            this.apiPage[this.blockNo].limit = 10
            this.loadChildTable(this.blockNo) // 详情初始化
          }
        })
      } else if (name === 'edit') {
        // 编辑保存
        if (this.SystemIdentity === 'loacl') {
          this.detailData = {
            blockNo: this.blockNo + 'Form',
            id: idx
          }
          for (const index in this.childTitle) {
            if (index !== 'children') {
              this.detailData[this.childTitle[index].requestParams] = this.childrenformDatas[index]
            }
          }
        } else {
          // 如果是oa
          this.detailData = {
            id: idx
          }
          for (const index in this.postForms) {
            this.detailData[this.postForms[index].requestParams] = this.postForms[index]
          }
        }
        this.apiEdit(this.detailData).then(res => {
          if (res.status === 200) {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.status = 'success'
            this.loadChildTable(this.blockNo) // 详情初始化
            this.addTable = false
            this.loading = false
          } else {
            this.loading = false
            this.loadChildTable(this.blockNo) // 详情初始化
            this.addTable = false
            this.$message({
              title: '失败',
              type: 'error',
              message: res.message
            })
          }
        })
      }
    },
    // admin 服务的新增和修改
    adminSaveForm() {
      // 键值对的方式数据保存
      if (this.SystemIdentity === 'local') {
        // 如果是admin
        this.subData = {
          blockNo: this.afieldName.getFormList
        }
        for (const index in this.postForms) {
          this.subData[this.postForms[index].requestParams] = this.formDatas[index]
        }
      } else {
        // 如果是oa
        this.subData = {}
        for (const index in this.postForms) {
          this.subData[this.postForms[index].requestParams] = this.formDatas[index]
        }
      }

      if (this.$route.params.id) {
        // 新增保存
        this.loading = true
        this.apiSave(this.subData).then(response => {
          if (response.status === 200) {
            this.$notify({
              title: '成功',
              type: 'success',
              message: '保存成功',
              duration: 2000
            })
            this.status = 'success'
            this.backForm()
            this.loading = false
          } else {
            this.loading = false
            this.$message({
              type: 'error',
              title: '失败',
              message: response.message
            })
          }
        })
      } else {
        // 编辑保存
        if (this.SystemIdentity === 'loacl') {
          // 如果是admin
          const paramsId = this.$route.params.id
          this.detailData = {
            blockNo: this.afieldName.getFormList,
            id: paramsId
          }
          for (const index in this.postForms) {
            this.detailData[this.postForms[index].requestParams] = this.formDatas[index]
          }
        } else {
          // 如果是oa
          const paramsId = this.$route.params.id
          this.detailData = {
            id: paramsId
          }
          for (const index in this.postForms) {
            this.detailData[this.postForms[index].requestParams] = this.formDatas[index]
          }
        }
        this.apiEdit(this.detailData).then(res => {
          if (res.status === 200) {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.status = 'success'
            this.backForm()
            this.loading = false
          } else {
            this.loading = false
            this.$message({
              title: '失败',
              type: 'error',
              message: res.message
            })
          }
        })
      }
    },
    serializeData() {
      const serializeData = this.formDatas
      for (const i in serializeData) {
        if (postForms[i].disable) {
          delete postForms[i]
        }
      }
    },
    selectMap(index) {
      this.dialogMap = true
      this.mapIndex = index
      setTimeout(() => {
        this.initMap()
      }, 50)
    },
    searchMap() {
      this.mapView.centerAndZoom(this.mapSearch, 14)
    },
    initMap() {
      if (!this.mapView) {
        const $this = this
        // 初始化地图
        const mapView = new BMap.Map('dialogMap')
        // 设置起点
        mapView.centerAndZoom('广州', 14)
        // 添加鼠标滚动缩放
        mapView.enableScrollWheelZoom()
        // 添加缩放平移控件
        mapView.addControl(new BMap.NavigationControl())
        // 添加比例尺寸控件
        mapView.addControl(new BMap.ScaleControl())
        // 添加缩略图控件
        mapView.addControl(new BMap.OverviewMapControl({ isOpen: true }))
        // 地图类型
        mapView.addControl(new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        }))
        // 绑定事件
        mapView.addEventListener('click', event => {
          $this.dialogMap = false
          $this.formDatas[$this.mapIndex] = event.point.lng + ',' + event.point.lat
        })
        // 定义数据
        this.mapView = mapView
      }
    },
    // 点击返回按钮
    backForm() {
      this.$router.back(-1)
    },
    // 输入框变化监听
    handInputChange(data, index) {
      if (data.linkageService !== null && data.linkageService !== '') {
        const query = {
          configId: data.id,
          value: this.formDatas[index],
          contrast: '='
        }
        this.apiLinkage(query).then(res => {
          const count = res.data.total
          if (count > 1) {
            this.formDatas = res.data.rows[0]
            this.linkageTable = res.data.rows
            this.dialogTableVisible = true
          } else if (count === 1) {
            const data = res.data.rows[0]
            this.formDatas = data
          }
        })
      }
    },
    linkTable(val) {
      this.formDatas = val
      this.dialogTableVisible = false
    },
    // 根据不同的类型匹配方法
    handleAction(action, row, name) {
      switch (action) {
        case 'detail':
          this.handleDetail(row.fid, name)
          break
        case 'editor': // 编辑
          this.handleEditor(row.fid, name)
          break
        case 'editor_inner': // 行内编辑
          this.handleEditorInner(row)
          break
        case 'delete':
          this.handleDelete(row.fid)
          break
        case 'add':
          this.handleAdd(name)
          break
        case 'export': // 导出
          this.handleExport()
          break
        case 'auto-export': // 自动导出
          this.handleAutoExport()
          break
        case 'batchRemove': // 批量删除
          this.handleBatchRemove(name)
          break
        case 'download-template': // 下载模板
          this.handleDownloadTemplate()
          break
        case 'import_ex':
          this.handleImport()
          break
        case 'workflow_entr': // 工作流
          this.handleWorkflow()
          break
        default:
        if (action.indexOf('/') === 0) {
          this.$router.push(action + '/' + row.id)
          if (row.id === '' || row.id === null) {
            this.$router.push(action)
          }
        } else {
          this.$router.push(this.getPath(action + '/' + row.id))
        }
      }
    },
    // 编辑
    handleEditor(id, name) {
      this.editId = id
      this.childTitleName = '编辑数据'
      this.blockNo = name
      this.getChildForm()
      this.isDetailChild = false
      this.getChildDetail(id)
    },
    // 行内编辑
    handleEditorInner(row) {
      this.editId = row.id
      row.editShow = !row.editShow
    },
    // 行内保存
    confirmEdit(row) {
      if (this.SystemIdentity === 'local') {
        const lineData = row
        delete lineData.editShow
        this.$set(lineData, 'blockNo', this.afieldName.getFormList)
        this.apiEdit(lineData).then(res => {
          if (res.status === 200) {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            row.editShow = false
            this.loadTable()
          } else {
            this.$message({
              title: '失败',
              type: 'error',
              message: res.message
            })
          }
        })
      }
    },
    getChildForm() {
      const listquery = {
        blockNo: this.blockNo + 'Form'
      }
      this.apiCreate(listquery).then(res => {
        if (res.status === 200) {
          this.childTitle = res.data
          this.addTable = true
        }
      })
    },
    // 详情
    handleDetail(id, name) {
      this.childTitleName = '查看数据'
      this.isDetailChild = true
      this.blockNo = name
      this.getChildForm()
      this.getChildDetail(id)
    },
    // 新增
    handleAdd(name) {
      if (this.status === 'success' || this.$route.params.id) {
        this.childrenformDatas = {}
        this.isDetailChild = false
        this.childTitleName = '新增数据'
        this.blockNo = name
        this.getChildForm()
      } else {
        this.$message({
          title: '提示',
          type: 'warning',
          message: '请先保存主表单再添加'
        })
      }
    },
    addChildTable(name) {
      if (name === '新增数据') {
        this.submitChildForm('add')
      } else if (name === '查看数据') {
        this.addTable = false
      } else if (name === '编辑数据') {
        this.submitChildForm('edit', this.editId)
      }
    },
    // 导入
    handleImport() {
      // 工资条临时处理
      if (this.$route.path === '/hr/info/wage') {
        this.$router.push(this.getPath('import_ex'))
      } else {
        this.centerDialogVisible = true
      }
    },
    // 点击弹框导入数据
    submitUpload() {
      this.formData = new FormData()
      this.formData.append('file', document.getElementById('exFile').files[0])
      this.apiImport(this.formData, this.severFlag.name).then(response => {
        if (response.status === 200) {
          this.$message({
            title: '成功',
            type: 'success',
            message: response.message
          })
          this.loadTable()
        } else {
          this.$message({
            title: '失败',
            type: 'error',
            message: response.message
          })
        }
      })
    },
    // 获取文件名称
    getFileNameFn() {
      if (this.severFlag.name) {
        this.apiFilename(this.severFlag.name).then(res => {
          if (res.status === 200) {
            this.fileDatas = res.data
          } else {
            this.$message({
              type: 'warning',
              message: '获取文件名失败'
            })
          }
          for (const k in this.fileDatas) {
            if (k === 'template_name') {
              this.templateFileName = this.fileDatas[k].value // 下载文件名
            } else if (k === 'export_file_name') {
              this.exportFilename = this.fileDatas[k].value // 自动导出的文件名
            }
          }
        })
      }
    },
    // 删除行
    handleDelete(id) {
      this.$msgbox({
        title: '提示消息',
        message: '是否确认删除记录？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          if (this.SystemIdentity === 'local') {
            const delObj = {
              blockNo: this.afieldName.getSearch,
              ids: [id]
            }
            this.apiDelete(this.deleteUrl, this.deleteWay, delObj).then(response => {
              if (response.status === 200) {
                this.loadTable()
              }
            })
          } else {
            // 调用其他方法删除
            this.apiDelete(id).then(response => {
              if (response.status === 200) {
                this.loadTable()
              }
            })
          }
        } 
      })
    },
    // 复选框方法
    selectionChange(val) {
      this.multipleSelection = val
    },
    // 批量删除
    handleBatchRemove(name) {
      if (this.multipleSelection.length > 0) {
        const selectIds = []
        for (const item of this.multipleSelection) {
          selectIds.push(item[this.postForms.children[0].parentField])
        }
        this.$msgbox({
          title: '提示消息',
          message: '是否确认删除记录？',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action === 'confirm') {
            if (this.SystemIdentity === 'local') {
              const delObjs = {
                blockNo: name + 'Search',
                ids: selectIds
              }
              delObjs[this.postForms.children[0].childField] = this.apiPage[this.postForms.children[0].childField]
              this.apiBatchdel(delObjs).then(response => {
                if (response.status === 200) {
                  this.loadChildTable(name)
                }
              })
            } else {
              // 需要的是一个对象的ids数组集
              const batchdel = {
                ids: selectIds
              }
              this.apiBatchdel(batchdel).then(res => {
                if (response.status === 200) {
                  this.loadChildTable(name)
                }
              })
            }
          } 
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择需要删除的数据'
        })
      }
    },
    // 导出数据
    handleExport() {
      // 获取查询框的字段 遍历获取有值的输入框
      const list = {}
      this.apiSearchrows.forEach(element => {
        if (element.value && element.isShow) {
          list[element.fieldEnName] = element.value
        }
      })
      const as = JSON.stringify(list).replace(/:/gi, '=')
      const bs = as.replace(/"/ig, '')
      this.newStr = bs.substring(1, bs.length - 2)
      // 若果前面有值，前面添加一个逗号
      if (this.newStr.length > 0) {
        this.newStr = ',' + this.newStr
      }
      document.getElementById('simpleExport').click()
    },
    // 自动导出
    handleAutoExport() {
      this.apiAutoexport(this.severFlag.name).then(response => {
        fileDownload(response, this.exportFilename)
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '导出失败'
        })
      })
    },
    // 下载模板
    handleDownloadTemplate() {
      this.apiDownload(this.severFlag.name).then(res => {
        fileDownload(res, this.templateFileName)
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '下载模板失败'
        })
      })
    },
    handleWorkflow() {
      // 工作流
      this.$router.push(this.getPath('workflow'))
    }

  },
  // 监听路由的变化重新加载详情的数据
  watch: {
    $route(to, from) {
      if (from.path !== to.path && this.$route.params && this.$route.params.id) {
        this.getFormDetail() // 详情初始化
      }
    }
  },
  mounted() {
    this.getTableTitle() // 表头初始化
    this.getForms() // 表单初始化
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
.tableForm-box {
  border-top: 1px solid #dcdfe6;
}
.titleTable {
  margin-top: 25px;
}
.tableForm-container {
  position: relative;
  .tableForm-main-container {
    background-color: #fff;
    padding: 40px 45px 20px 40px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0;
  }
}
</style>

