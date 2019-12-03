<template>
  <div id="componentSearch" class="filter-container" :class="breakLine?'filter-container-break': ''">
    <div class="searchBox">
      <el-form>
        <template v-for="(item,index) in search" v-if="item.isShow">
          <span v-if="item.type=='hidden'" class="hidden" :key="index">
            <el-input v-model="search[index].value" type="hidden" @change.native="handleFilter"></el-input>
          </span>

          <span v-else class="filter-item" :key="index">
            <span v-if="breakLine" class="filter-item-name">{{item.name}}:</span>
            <!-- 级联 -->
            <span v-if="item.type=='cascader'&&item.isShow">
              <el-cascader v-if="item.isShow" v-model="search[index].value" :options="item.data" :placeholder="item.name" expand-trigger="hover" class="w150"></el-cascader>
            </span>

            <el-form-item v-else-if="item.type=='select' && item.requestType==='default'&&item.isShow" :label="item.name+':'" class="w120">
              <el-select v-if="item.isShow" v-model="search[index].value" clearable :placeholder="item.name">
                <el-option v-for="(ele,sindex) in (JSON.parse(item.value))" :key="sindex" :label="ele" :value="sindex"></el-option>
              </el-select>
            </el-form-item>

            <!-- 下拉 -->
            <span v-else-if="item.type == 'select'&&item.interfac==='dict' && item.isShow">
              <el-select v-if="item.isShow" v-model="search[index].value" :placeholder="item.name" clearable class="w120">
                <el-option v-for="option in item.data" :key="option.id" :label="option.name" :value="option.name"></el-option>
              </el-select>
            </span>
            <!-- 部门组件 -->
            <span v-else-if="item.type == 'select'&&item.interfac==='department' && item.isShow">
              <supervision-departments v-if="item.isShow" v-model="outdept" :deptNum="outNum"></supervision-departments>
            </span>
            <!-- 项目组件 -->
            <span v-else-if="item.type == 'select'&&item.interfac==='projects' && item.isShow">
              <supervision-project v-if="item.isShow" v-model="projectData" ></supervision-project>
            </span>
            <!-- 日期 -->
            <span v-else-if="item.type === 'date'&&item.isShow">
              <el-date-picker :type="item.type" value-format="yyyy-MM-dd" :placeholder="item.name" v-model="search[index].value" :picker-options="pickerOptions" class="w100"></el-date-picker>
            </span>
            <span v-else-if="item.type === 'datetime'&&item.isShow">
              <el-date-picker :type="item.type" :placeholder="item.name" v-model="search[index].value" :picker-options="pickerOptions" class="w180"></el-date-picker>
            </span>
            <!-- input -->
            <span v-else-if="item.isShow">
              <el-input :placeholder="item.name" v-model="search[index].value" class="w150"></el-input>
            </span>
          </span>
        </template>
        <!-- 按钮 -->
        <span style="display:inline-block;margin-top:3px;vertical-align: top;">
          <el-button size="small" class="mr-5" type="primary" @click="handleFilter">查询</el-button>
          <el-button size="small" class="mr-5"  @click="handleReset">重置</el-button>
        </span>
      </el-form>
    </div>
  </div>
</template>

<script>
import supervisionDepartments from '@/components/Project/supervisionDepartments' // 部门组件
import supervisionProject from '@/components/Project/supervisionProject' // 项目组件
export default {
  name: 'Search',
  props: {
    breakLine: {
      type: Boolean,
      default: false
    },
    create: {
      type: Boolean,
      default: true
    },
    search: {
      type: Array,
      default: []
    }
  },
  components: {
    supervisionDepartments,
    supervisionProject
  },
  data() {
    return {
      outNum: '000', // 部门组件
      outdept: {
        number: '',
        name: ''
      },
      projectData: { // 项目组件
        id: '',
        number: '',
        name: ''
      },
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
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  },
  methods: {
    getPath: append => this.$route.path.substr(0, this.$route.path.lastIndexOf('/') + 1) + (append || ''),
    // 查询
    handleFilter() {
      this.$emit('getSearch', { search: this.search })
    },
    // 重置
    handleReset() {
      this.$emit('reset', {
        search: this.search,
        dept: this.dept,
        project: this.projectData
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#componentSearch {
  .searchBox {
    border-radius: 3px;
    padding: 20px 20px 10px 40px;
    width: 100%;
    background-color: #fff;
  }
  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px !important;
  }
  .w100 {
    width: 180px !important;
  }
  .w120 {
    width: 120px !important;
  }
  .w150 {
    width: 150px !important;
  }
  .w180 {
    width: 180px !important;
  }
  .w200 {
    width: 200px !important;
  }
  .mr-15 {
    margin-right: 15px !important;
  }
  .ml-5 {
    margin-left: 5px !important;
  }
}
</style>

