<template>
  <div id="tableFormContainerONe">
    <el-form ref="rule-form" :rules="rules" :model="formDatas" class="form-conatiner" style="margin-left:15px;margin-right:15px;">
      <sticky :class-name="'sub-navbar' + status">
        <el-button v-loading="loading" type="primary" @click="submitForm">保存发布</el-button>
        <el-button type="warning" @click="backForm">返回</el-button>
      </sticky>
      <div class="tableForm-main-container">
        <el-row :gutter="50">
          <el-col v-for="(item, index) in postForms" :key="index" :span="165">

            <el-form-item v-if="item.type==='title'&&item.isShow" :prop="index" class="mb-40">
              <MDinput v-model="formDatas[index]" :maxlength="100" :disabled="isDetail||item.disable" name="name" required>标题</MDinput>
            </el-form-item>
            <!-- 级联 -->
            <el-form-item v-else-if="item.type==='cascader'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="postInfo-container-item">
              <el-cascader v-model="formDatas[index]" :options="item.data" expand-trigger="hover"></el-cascader>
            </el-form-item>
            <!-- 是否为bool的下拉 -->
            <el-form-item v-else-if="item.type==='select' &&item.requestType==='boolean'&&item.isShow" :label="item.name+':'" label-width="300px" class="postInfo-container-item">
              <el-select v-model="formDatas[index]" :disabled="isDetail||item.disable" :placeholder="'选择'+item.name">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <!-- 下拉select -->
            <el-form-item v-else-if="item.type==='select' &&item.requestType==='default'&&item.isShow" :label="item.name+':'" label-width="300px" class="postInfo-container-item">
              <el-select v-model="formDatas[index]" :disabled="isDetail||item.disable" :placeholder="'选择'+item.name">
                <el-option v-for="(ele,sindex) in (JSON.parse(item.value))" :key="sindex" :label="ele" :value="sindex"></el-option>
              </el-select>
            </el-form-item>
            <!-- 字典 -->
            <el-form-item v-else-if="item.type==='select' &&item.requestType==='dict'&&item.isShow" :label="item.name+':'" label-width="300px" class="postInfo-container-item">
              <el-select v-model="formDatas[index]" :disabled="isDetail||item.disable" :placeholder="'选择'+item.name" filterable remote value-key="id">
                <el-option v-for="ele in item.data" :key="ele.id" :label="ele.name" :value="ele.name"></el-option>
              </el-select>
            </el-form-item>
            <!-- 部门组件绑对象 -->
            <el-form-item v-else-if="item.type==='select' &&item.requestType==='department'&&item.isShow" :label="item.name+':'" label-width="300px" class="postInfo-container-item">
              <supervision-departments v-if="item.requestType==='department'||formDatas[index]!==null" v-model="formDatas[index]" :deptNum="outNum" :disabled="isDetail||item.disable"></supervision-departments>
            </el-form-item>
            <!-- 部门组件名称 -->
            <el-form-item v-else-if="item.type==='select' &&item.requestType==='department-name'&&item.isShow" :label="item.name+':'" label-width="300px" class="postInfo-container-item">
              <supervision-departments v-if="item.requestType==='department-name'&&formDatas[index]!==null&&formDatas[index]!==''&&formDatas[index]!==undefined" :selectedDepartment.sync="formDatas[index]"  :disabled="isDetail||item.disable"></supervision-departments>
            </el-form-item>
            <!-- 项目组件 -->
            <el-form-item v-else-if="item.type==='select' &&item.requestType==='projects'&&item.isShow" :label="item.name+':'" label-width="300px" class="postInfo-container-item">
              <supervision-project v-if="item.requestType==='projects'&&formDatas[index]!==null" v-model="formDatas[index]"  :disabled="isDetail||item.disable"></supervision-project>
            </el-form-item>
            <!-- 选择多个人员组件 -->
            <el-form-item v-else-if="item.type==='input' &&item.requestType==='morePerson'&&item.isShow" :label="item.name+':'" label-width="270px" class="postInfo-container-item">
              <select-people v-if="item.requestType==='onePerson'&&formDatas[index]!==null" v-model="formDatas[index]" :singleSelect="true"  :disabled="isDetail||item.disable"></select-people>
            </el-form-item>

            <el-form-item v-else-if="item.type==='radio'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="postInfo-container-item">
              <el-radio-group v-model="formDatas[index]" :disabled="isDetail||item.disable" size="mini">
                <el-radio v-for="(vv,kk) in item.data" :key="kk" :label="vv" border></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item v-else-if="item.type==='checkbox'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="postInfo-container-item">
              <el-checkbox-group v-model="formDatas[index]" :disabled="isDetail||item.disable" size="mini">
                <el-checkbox v-for="(vv,kk) in item.data" :key="kk" :label="vv" :value="vv" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- 开关 -->
            <el-form-item v-else-if="item.type==='switch'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="postInfo-container-item">
              <el-switch v-model="formDatas[index]" :disabled="isDetail||item.disable"></el-switch>
            </el-form-item>
            <!-- 年月日 -->
            <el-form-item v-else-if="item.type==='date'&&item.isShow&&item.fieldType!=='timestamp'" :prop="index" :label="item.name+':'" label-width="300px" class="mb-10">
              <el-date-picker v-model="formDatas[index]" value-format="yyyy-MM-dd" :picker-options="pickerOptions" :disabled="isDetail||item.disable" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            
            <!-- 返回时间戳  v-model绑定的值需要是字符串-->
            <el-form-item v-else-if="item.type==='date'&&item.isShow&&item.fieldType=='timestamp'" :prop="index" :label="item.name+':'" label-width="280px" class="mb-10">
              <el-date-picker v-model="formDatas[index]" value-format="timestamp" format="yyyy年MM月dd日" :picker-options="pickerOptions" :disabled="isDetail||item.disable" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>

            <el-form-item v-else-if="item.type==='date-range'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="mb-10">
              <el-date-picker v-model="formDatas[index]"  :disabled="isDetail||item.disable" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>

            <el-form-item v-else-if="item.type==='time'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="mb-10">
              <el-time-picker v-model="formDatas[index]" value-format="yyyy-MM-dd" :disabled="isDetail||item.disable" placeholder="选择时间"></el-time-picker>
            </el-form-item>

            <el-form-item v-else-if="item.type==='time'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="mb-10">
              <el-time-picker v-model="formDatas[index]" value-format="yyyy-MM-dd" :disabled="isDetail||item.disable" is-range  range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"></el-time-picker>
            </el-form-item>

            <el-form-item v-else-if="item.type==='datetime'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="mb-10">
              <el-date-picker v-model="formDatas[index]" value-format="yyyy-MM-dd" :picker-options="pickerOptions" :disabled="isDetail||item.disable" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>

            <el-form-item v-else-if="item.type==='datetime-range'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="mb-10">
              <el-date-picker v-model="formDatas[index]"  :disabled="isDetail||item.disable" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <!-- 文本框 -->
            <el-form-item v-else-if="item.type==='textarea'&&item.isShow" :prop="index" :label="item.name+':'" label-width="300px" class="mb-10">
              <el-input v-model="formDatas[index]"  :disabled="isDetail||item.disable" type="textarea" class="article-textarea" :autosize="{ minRows: 1,maxRows: 5 }" placeholder="请输入内容"></el-input>
            </el-form-item>
            <!-- 附件上传 -->
            <el-form-item v-else-if="item.type==='plupload'&&item.isShow" :prop="index" :label="item.name+':'" label-width="300px" class="mb-10">
              <plupload v-if="item.requestType==='plupload'&&formDatas[index]!==null" v-model="formDatas[index]"  :imageOnly="true" service-name="asset" module-name="inventory" ></plupload>
            </el-form-item>
            <!-- 富文本编辑 -->
            <el-form-item v-else-if="item.type==='editor'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="mb-10">
              <Tinymce ref="editor" :height="400" v-model="formDatas[index]" :disabled="isDetail||item.disable" />
            </el-form-item>

            <!-- 图片上传 -->
            <el-form-item v-else-if="item.type==='image'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="mb-10">
              <Upload v-model="formDatas[index]" :disabled="isDetail||item.disable" />
            </el-form-item>

            <el-form-item v-else-if="item.type==='http'&&item.isShow" :prop="index" :label="item.name+':'" label-width="300px" class="mb-10">
              <el-input v-model="formDatas[index]"  :disabled="isDetail||item.disable" >
                <template slot="prepend">Http://</template>
              </el-input>
            </el-form-item>

            <el-form-item v-else-if="item.type==='map'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" >
              <el-input v-model="formDatas[index]"  :disabled="isDetail||item.disable" readonly="readonly" @click.native="selectMap(index)"></el-input>
            </el-form-item>

            <el-form-item v-else-if="item.type==='password'&&item.isShow" :prop="index" :label="item.name+':'" label-width="165px" class="postInfo-container-item">
              <el-input v-model="formDatas[index]"  :disabled="isDetail||item.disable" type="password"></el-input>
            </el-form-item>

            <el-form-item v-else-if="item.type==='input'&&item.isShow" :prop="index" :label="item.name+':'" label-width="300px" class="postInfo-container-item">
              <el-input v-model="formDatas[index]"  :disabled="isDetail||item.disable" @change="handInputChange(item, index)"></el-input>
            </el-form-item>

            <el-form-item v-else-if="item.isShow" :prop="index" :label="item.name+':'" label-width="300px" class="postInfo-container-item">
              <el-input v-model="formDatas[index]"  :disabled="isDetail||item.disable" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table :show-header="false" :data="linkageTable" highligh-current-row @current-change="linkTable">
        <el-table-column  v-for="(item,index) in formDatas" :key="index" :prop="index" width="200"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce/index'
import Upload from '@/components/Upload/singleImage'
import MDinput from '@/components/MDinput/index'
import Sticky from '@/components/Sticky/index'
import supervisionDepartments from '@/components/Project/supervisionDepartments' // 部门组件
import departmentsName from '@/components/departmentsName' // 部门名称组件
import supervisionProject from '@/components/Project/supervisionProject' // 项目组件
import SelectPeople from '@/components/SelectPeople/index' 
import SelectOnePeople from '@/components/SelectOnePeople/index' 
import Plupload from '@/components/Plupload/index' 
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers';
export default {
  name: 'PostForm',
  components: {
    Tinymce,
    MDinput,
    Upload,
    Sticky,
    supervisionDepartments,
    departmentsName,
    supervisionProject,
    SelectPeople,
    SelectOnePeople,
    Plupload
  },
  props: {
    isDetail: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    afieldName: {
      type: Object,
      default: {}
    },
    apiCreate: Function, // init function
    apiEdit: Function, // modify function
    apiData: Function, // detail function
    apiSave: Function, // save function
    apiTable: Function, // table function
    apiLinkage: Function // 数据关联 function
  },
  data() {
    return {
      test: '',
      temp: {
        f: null
      },
      loading: false,
      dialogTableVisible: false,
      status: 'waiting',
      postForms: {}, // 需要传初始化后台返回的对象
      resFormlist: {}, // 初始化的表单列表
      formData: {},
      formDatas: {},
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const  date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const  date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      SystemIdentity: '', // 接请求表头带过来请求服务标识
      outNum: '', // 部门组件
      outdept: {
        number: '',
        name: ''
      },
      projectData: { // 项目组件
        id: '',
        number: '',
        name: ''
      },
      subData: {}, // 新增提交的数据对象
      detailData: {}, // 编辑提交的数据
      selectVal: '', // 下拉框绑定的值
      dialogMap: false,
      mapIndex: null,
      mapView: null,
      mapSearch: null,
      linkageTable: [] // 级联返回多条数据
    }
  },
  computed: {
    ...mapGetters(['elements', 'deptName']),
    lang() {
      return this.$store.getters.language
    },
    // 校验必填
    rules() {
      const ruleData = {}
      for (const index in this.postForms) {
        if (!this.postForms[index].nullable) {
          ruleData[index] = [
            {
              required: true,
              message: '请输入：' + this.postForms[index].name,
              trigger: 'blur,change'
            }
          ]
        }
      }
      return ruleData
    }
  },
  methods: {
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
        // 渲染表单
        for (const index in this.postForms) {
          this.$set(this.formDatas, index, null)
        }
        // 先请求详情数据回来之后再渲染表单列表，避免组件赋值有问题
        this.resFormlist = res.data
        this.postForms = this.resFormlist
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
#tableFormContainerONe {
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
<style lang="scss">
#tableFormContainerONe{
  .el-button--warning {
    margin-left: 30px;
    margin-top: 0 !important;
  }
}
</style>
