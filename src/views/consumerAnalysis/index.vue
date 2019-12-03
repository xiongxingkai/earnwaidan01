<template>
  <div id="consumerAnalysis">
    <div class="queryArea">
      <h4><span class="title">客群分析</span><span class="spread">/</span> 各属性顾客偏好分析 </h4>
      <el-form class="queryForm"
               :model="queryForm"
               label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="顾客属性">
              <el-select size="small"
                         v-model="queryForm.gender"
                         multiple
                         filterable
                         allow-create
                         default-first-option
                         placeholder="请选择顾客性别">
                <el-option v-for="item in genderArr"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label=" "
                          label-width="20px">
              <el-select size="small"
                         v-model="queryForm.yearRange"
                         multiple
                         filterable
                         allow-create
                         default-first-option
                         placeholder="请选择顾客年龄阶段">
                <el-option v-for="item in yearRangerArr"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="日期">
              <el-date-picker size="small"
                              v-model="queryForm.dateRange"
                              type="daterange"
                              range-separator="~"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary"
                       @click="serach"
                       size="small">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="echartsArea">
      <h4>品牌/业态偏好分布图</h4>
      <div id="div1"
           style="min-height: 300px;"></div>
    </div>
    <div class="resultArea">
      <h4>
        品牌/业态偏好分布表
        <div class="btnOperateArea fr">
          <el-button size="small"
                     type="primary"
                     @click="exportReport">导出报表</el-button>
        </div>
      </h4>
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column prop="consumerProperity"
                         label="顾客属性">
        </el-table-column>
        <el-table-column prop="dateRange"
                         label="时间">
          <template slot-scope="scope">
            {{scope.row.dateRange.join('~')}}
          </template>
        </el-table-column>
        <el-table-column prop="category"
                         label="业态"
                         width="120">
        </el-table-column>
        <el-table-column prop="brand"
                         label="品牌">
        </el-table-column>
        <el-table-column prop="number"
                         label="人数">
        </el-table-column>
        <el-table-column prop="percent"
                         label="占比">
        </el-table-column>
      </el-table>
      <div class="paginationArea">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="queryForm.page"
                       :page-sizes="[100, 200, 300, 400]"
                       :page-size="queryForm.limit"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>

  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'consumerAnalysis',
  data () {
    return {
      queryForm: {
        page: 1,
        limit: 10,
        gender: [],
        yearRange: [],
        dateRange: []
      },
      genderArr: [
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '2'
        }
      ],
      yearRangerArr: [
        {
          label: '0-20',
          value: '1'
        },
        {
          label: '21-30',
          value: '2'
        },
        {
          label: '31-40',
          value: '3'
        },
        {
          label: '41-50',
          value: '4'
        },
        {
          label: '51以上',
          value: '5'
        }
      ],
      tableData: [],
      total: 0
    }
  },
  created () {
    this.serach()
  },
  mounted () {
    this.initEchart()
  },
  methods: {
    serach () {
      this.queryForm.page = 1
      this.doSearch()
    },
    doSearch () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
        this.tableData = [
          {
            id: '01',
            consumerProperity: '性别不限，年龄不限',
            dateRange: ['2019/11/29', '2019-11-29'],
            category: '餐饮',
            brand: '麦当劳',
            number: 952,
            percent: '39.11%'
          },
          {
            id: '02',
            consumerProperity: '性别不限，年龄不限',
            dateRange: ['2019/11/29', '2019-11-29'],
            category: '餐饮',
            brand: '点都德',
            number: 567,
            percent: '23.29%'
          },
          {
            id: '03',
            consumerProperity: '性别不限，年龄不限',
            dateRange: ['2019/11/29', '2019-11-29'],
            category: '餐饮',
            brand: '甲哺甲哺',
            number: 233,
            percent: '9.57%'
          },
          {
            id: '04',
            consumerProperity: '性别不限，年龄不限',
            dateRange: ['2019/11/29', '2019-11-29'],
            category: '餐饮',
            brand: '姜虎东白丁烤肉',
            number: 140,
            percent: '5.75%'
          },
          {
            id: '05',
            consumerProperity: '性别不限，年龄不限',
            dateRange: ['2019/11/29', '2019-11-29'],
            category: '餐饮',
            brand: '太二酸菜鱼',
            number: 129,
            percent: '5.30%'
          },
          {
            id: '06',
            consumerProperity: '性别不限，年龄不限',
            dateRange: ['2019/11/29', '2019-11-29'],
            category: '餐饮',
            brand: '其他',
            number: 413,
            percent: '16.97%'
          },
          {
            id: '07',
            consumerProperity: '性别不限，年龄不限',
            dateRange: ['2019/11/29', '2019-11-29'],
            category: '餐饮',
            brand: '餐饮总计',
            number: 2434,
            percent: '100%'
          },
          {
            id: '08',
            consumerProperity: '性别不限，年龄不限',
            dateRange: ['2019/11/29', '2019-11-29'],
            category: '服装',
            brand: '以纯',
            number: 952,
            percent: '39.11%'
          },
          {
            id: '09',
            consumerProperity: '性别不限，年龄不限',
            dateRange: ['2019/11/29', '2019-11-29'],
            category: '文教',
            brand: '新东方',
            number: 952,
            percent: '39.11%'
          },
          {
            id: '01',
            consumerProperity: '性别不限，年龄不限',
            dateRange: ['2019/11/29', '2019-11-29'],
            category: '娱乐',
            brand: '阿里',
            number: 952,
            percent: '39.11%'
          },
        ]
        this.total = 30
      }, 2000);
    },
    exportReport () {
      console.log('导出报表')
    },
    handleSizeChange (val) {
      this.queryForm.limit = val
      this.queryForm.page = 1
      this.doSearch()
    },
    handleCurrentChange (val) {
      this.queryForm.page = val
      this.doSearch()
    },
    initEchart () {
      const that = this
      const listData = [
        {
          categoryName: '餐饮',
          data: [
            {
              brand: '麦当劳',
              data: 835
            },
            {
              brand: '点都德',
              data: 559
            },
            {
              brand: '甲哺甲哺',
              data: 229
            },
            {
              brand: '姜虎东白丁烤肉',
              data: 140
            },
            {
              brand: '太二酸菜鱼',
              data: 128
            },
            {
              brand: '其他',
              data: 404
            }
          ]
        },
        {
          categoryName: '服饰',
          data: [
            {
              brand: '麦当劳',
              data: 835
            },
            {
              brand: '点都德',
              data: 559
            },
            {
              brand: '甲哺甲哺',
              data: 229
            },
            {
              brand: '姜虎东白丁烤肉',
              data: 140
            },
            {
              brand: '太二酸菜鱼',
              data: 128
            },
            {
              brand: '其他',
              data: 404
            }
          ]
        },
        {
          categoryName: '文教',
          data: [
            {
              brand: '麦当劳',
              data: 835
            },
            {
              brand: '点都德',
              data: 559
            },
            {
              brand: '甲哺甲哺',
              data: 229
            },
            {
              brand: '姜虎东白丁烤肉',
              data: 140
            },
            {
              brand: '太二酸菜鱼',
              data: 128
            },
            {
              brand: '其他',
              data: 404
            }
          ]
        },
        {
          categoryName: '休闲娱乐',
          data: [
            {
              brand: '麦当劳',
              data: 835
            },
            {
              brand: '点都德',
              data: 559
            },
            {
              brand: '甲哺甲哺',
              data: 229
            },
            {
              brand: '姜虎东白丁烤肉',
              data: 140
            },
            {
              brand: '太二酸菜鱼',
              data: 128
            },
            {
              brand: '其他',
              data: 404
            }
          ]
        },
        {
          categoryName: '家居生活',
          data: [
            {
              brand: '麦当劳',
              data: 835
            },
            {
              brand: '点都德',
              data: 559
            },
            {
              brand: '甲哺甲哺',
              data: 229
            },
            {
              brand: '姜虎东白丁烤肉',
              data: 140
            },
            {
              brand: '太二酸菜鱼',
              data: 128
            },
            {
              brand: '其他',
              data: 404
            }
          ]
        },
        {
          categoryName: '珠宝/钟表/配饰',
          data: [
            {
              brand: '麦当劳',
              data: 835
            },
            {
              brand: '点都德',
              data: 559
            },
            {
              brand: '甲哺甲哺',
              data: 229
            },
            {
              brand: '姜虎东白丁烤肉',
              data: 140
            },
            {
              brand: '太二酸菜鱼',
              data: 128
            },
            {
              brand: '其他',
              data: 404
            }
          ]
        },
        {
          categoryName: '鞋/箱包/皮具',
          data: [
            {
              brand: '麦当劳',
              data: 835
            },
            {
              brand: '点都德',
              data: 559
            },
            {
              brand: '甲哺甲哺',
              data: 229
            },
            {
              brand: '姜虎东白丁烤肉',
              data: 140
            },
            {
              brand: '太二酸菜鱼',
              data: 128
            },
            {
              brand: '其他',
              data: 404
            }
          ]
        },
        {
          categoryName: '个护化妆',
          data: [
            {
              brand: '麦当劳',
              data: 835
            },
            {
              brand: '点都德',
              data: 559
            },
            {
              brand: '甲哺甲哺',
              data: 229
            },
            {
              brand: '姜虎东白丁烤肉',
              data: 140
            },
            {
              brand: '太二酸菜鱼',
              data: 128
            },
            {
              brand: '其他',
              data: 404
            }
          ]
        },
        {
          categoryName: '专项服务',
          data: [
            {
              brand: '麦当劳',
              data: 835
            },
            {
              brand: '点都德',
              data: 559
            },
            {
              brand: '甲哺甲哺',
              data: 229
            },
            {
              brand: '姜虎东白丁烤肉',
              data: 140
            },
            {
              brand: '太二酸菜鱼',
              data: 128
            },
            {
              brand: '其他',
              data: 404
            }
          ]
        }
      ]
      const totalObj = {}
      listData.forEach(item => {
        totalObj[item.categoryName] = item.data.reduce((rr, pp) => rr + pp.data , 0)
      })
      const allTotal = Object.keys(totalObj).reduce((pre, item) => pre + totalObj[item] , 0)
      function getPercent(data, totalData) {
        return (data/totalData*100).toFixed(2) + '%'
      }
      echarts.init(document.getElementById('div1')).setOption({
        tooltip: {
          trigger: 'item',
          formatter(params) {
            console.log(params)
            let str = '\n'
            listData.filter(item => item.categoryName === params[0].axisValue)[0].data.forEach(aa => {
                str+= aa.brand + '\n' + aa.data + '人' + '\n占全部餐饮：' + getPercent(aa.data, totalObj[params[0].axisValue])
              })
            return `${params[0].axisValue} ${that.queryForm.yearRange[0]}~${that.queryForm.yearRange[1]}占全部业态${getPercent(params[0].data, allTotal)}
              ${str}
            `
          },
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          formatter: function (name) {
            return echarts.format.truncateText(name, 100, '14px Microsoft Yahei', '…');
          },
          tooltip: {
            show: true
          },
          icon: 'roundRect',
          data: ['Top1品牌', 'Top2品牌', 'Top3品牌', 'Top4品牌', 'Top5品牌','其他']
        },
        // legend: {
        //   data: ['Top1品牌', 'Top2品牌', 'Top3品牌', 'Top4品牌', 'Top5品牌','其他']
        // },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: listData.map(item => item.categoryName)
          // data: ['餐饮', '服装', '文教', '休闲娱乐', '家居生活', '珠宝/钟表/配饰', '鞋/箱包/皮具','个护化妆','专项服务']
        },
        series: [
          {
            name: 'Top1品牌',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: listData.map(item => item.data[0].data)
            // data: [320, 302, 301, 334, 390, 330, 320,230,58]
          },
          {
            name: 'Top2品牌',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: listData.map(item => item.data[1].data)
            // data: [120, 132, 101, 134, 90, 230, 210,230,58]
          },
          {
            name: 'Top3品牌',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: listData.map(item => item.data[2].data)
            // data: [220, 182, 191, 234, 290, 330, 310,230,58]
          },
          {
            name: 'Top4品牌',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: listData.map(item => item.data[3].data)
            // data: [150, 212, 201, 154, 190, 330, 410,230,58]
          },
          {
            name: 'Top5品牌',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: listData.map(item => item.data[4].data)
            // data: [820, 832, 901, 934, 1290, 1330, 1320,230,58]
          },
          {
            name: '其他',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: listData.map(item => item.data[5].data)
            // data: [820, 832, 901, 934, 1290, 1330, 1320,230,58]
          },
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#consumerAnalysis {
  background: #f0f2f5;
  .queryArea {
    padding: 20px;
    margin-bottom: 20px;
    background: #fff;
    .el-select,
    .el-range-editor.el-input__inner {
      width: 100%;
    }
  }
  .echartsArea {
    background: #fff;
    margin-bottom: 20px;
    h4 {
      padding: 15px 25px 0;
      margin-top: 0;
      border-bottom: 1px solid #f0f0f0;
    }
  }
}
</style>