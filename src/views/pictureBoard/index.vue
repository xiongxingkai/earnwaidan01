<template>
  <div id="pictureBoard">
    <div class="queryArea">
      <span class="textLabel">日期</span>
      <el-date-picker
        size="small"
        type="daterange"
        v-model="dateRange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        range-separator="~"
      ></el-date-picker>
    </div>
    <div class="contentArea">
      <div class="graphBoard">
        <div class="title_1">画像看板</div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="title_2">客群性别画像</div>
            <div id="consumer-gender" style="height: 250px;"></div>
          </el-col>
          <el-col :span="12">
            <div class="title_2">客群年龄画像</div>
            <div id="consumer-yearold" style="height: 250px;"></div>
          </el-col>
        </el-row>
        <el-row>
          <div class="title_2">客群性别&年龄分布分析</div>
          <div id="consumer-gender-and-yearold" style="height: 400px;"></div>
        </el-row>
      </div>
      <div class="memberBoard">
        <div class="title_1">会员画像看板</div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="title_2">会员性别画像</div>
            <div id="member-gender" style="height: 250px;"></div>
          </el-col>
          <el-col :span="12">
            <div class="title_2">会员年龄画像</div>
            <div id="member-yearold" style="height: 250px;"></div>
          </el-col>
        </el-row>
        <el-row>
          <div class="title_2">会员性别&年龄分布分析</div>
          <div id="member-gender-and-yearold" style="height: 400px;"></div>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { loginApi } from '@/api/testApi'
export default {
  name: 'picturebard',
  data() {
    return {
      dateRange: [],
      echartData1: []
    }
  },
  created() {
    this.initData()
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap()
    })
  },
  methods: {
    initData() {
      this.echartData1= [
        {
          age_duration: '1~20',
          gender: '男性',
          count: 831
        },
        {
          age_duration: '1~20',
          gender: '女性',
          count: 738
        },
        {
          age_duration: '21~30',
          gender: '男性',
          count: 1023
        },
        {
          age_duration: '21~30',
          gender: '女性',
          count: 512
        },
        {
          age_duration: '31~40',
          gender: '男性',
          count: 531
        },
        {
          age_duration: '31~40',
          gender: '女性',
          count: 838
        },
        {
          age_duration: '41~50',
          gender: '男性',
          count: 931
        },
        {
          age_duration: '41~50',
          gender: '女性',
          count: 938
        },
        {
          age_duration: '51~60',
          gender: '男性',
          count: 557
        },
        {
          age_duration: '51~60',
          gender: '女性',
          count: 248
        },
        {
          age_duration: '61~70',
          gender: '男性',
          count: 365
        },
        {
          age_duration: '61~70',
          gender: '女性',
          count: 403
        },
        {
          age_duration: '>70',
          gender: '男性',
          count: 57
        },
        {
          age_duration: '>70',
          gender: '女性',
          count: 38
        }
      ]
      this.echartData1.sort((a, b) => a.count - b.count)
    },
    initMap() {
      const that = this
      echarts.init(document.getElementById('consumer-gender')).setOption({
        color: ['#04A9F5', '#1DE9B6'],
        tooltip: {
          trigger: 'item',
          confine: true,
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          right: 20,
          top: 'middle',
          data: ['女性', '男性']
        },
        series: [
          {
            name: '客群性别画像',
            type: 'pie',
            radius: '50%',
            center: ['28%', '50%'],
            data: [
              { value: 4378, name: '女性' },
              { value: 4041, name: '男性' }
            ],
            label: {
              fontSize: 8,
              color: '#6F7379',
              formatter: '{b}:  {d}%'
            },
            labelLine: {
              lineStyle: {
                width: 2
              }
            }
          }
        ]
      })
      echarts.init(document.getElementById('consumer-yearold')).setOption({
        color: ['#9197D4', '#1DE9B6'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          left: 20,
          textStyle: {
            fontSize: 8
          },
          data: ['女性', '男性']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['1~20', '21~30', '31~40', '41~50', '51~60', '61~70', '>70']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '女性',
            type: 'bar',
            barWidth: 30,
            stack: '占比',
            data: [120, 65, 78, 20, 90, 30, 102]
          },
          {
            name: '男性',
            type: 'bar',
            barWidth: 30,
            stack: '占比',
            data: [40, 60, 62, 80, 160, 92, 45]
          }
        ]
      })
      echarts
        .init(document.getElementById('consumer-gender-and-yearold'))
        .setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            nameTextStyle: {
              fontSize: 8,
              color: '#6F7379'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            splitNumber: 10,
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            position: 'right',
            nameTextStyle: {
              fontSize: 8,
              color: '#6F7379'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            data: that.echartData1.map(
              item => `${item.age_duration},  ${item.gender},  ${item.count}`
            )
          },
          series: [
            {
              type: 'bar',
              barWidth: 16,
              data: that.echartData1.map(item => item.count),
              itemStyle: {
                color: function(params) {
                  // console.log('输出', params)
                  var colorList = [
                    '#F5C22B',
                    '#F5C22B',
                    '#F5C22B',
                    '#F5C22B',
                    '#F5C22B',
                    '#F5C22B',
                    '#F5C22B',
                    '#F5C22B',
                    '#F5C22B',
                    '#F5C22B',
                    '#F5C22B',
                    '#04A9F5',
                    '#A389D4',
                    '#1DE9B6'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          ]
        })
      echarts.init(document.getElementById('member-gender')).setOption({
        color: ['#04A9F5', '#1DE9B6'],
        tooltip: {
          trigger: 'item',
          confine: true,
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          right: 20,
          top: 'middle',
          data: ['女性', '男性']
        },
        series: [
          {
            name: '客群性别画像',
            type: 'pie',
            radius: '50%',
            center: ['28%', '50%'],
            data: [
              { value: 4378, name: '女性' },
              { value: 4041, name: '男性' }
            ],
            label: {
              fontSize: 8,
              color: '#6F7379',
              formatter: '{b}:  {d}%'
            },
            labelLine: {
              lineStyle: {
                width: 2
              }
            }
          }
        ]
      })
      echarts.init(document.getElementById('member-yearold')).setOption({
        color: ['#9197D4', '#1DE9B6'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          left: 20,
          textStyle: {
            fontSize: 8
          },
          data: ['女性', '男性']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['1~20', '21~30', '31~40', '41~50', '51~60', '61~70', '>70']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '女性',
            type: 'bar',
            stack: '占比',
            barWidth: 30,
            data: [120, 65, 78, 20, 90, 30, 102]
          },
          {
            name: '男性',
            type: 'bar',
            barWidth: 30,
            stack: '占比',
            data: [40, 60, 62, 80, 160, 92, 45]
          }
        ]
      })
      echarts
        .init(document.getElementById('member-gender-and-yearold'))
        .setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            nameTextStyle: {
              fontSize: 8,
              color: '#6F7379'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            splitNumber: 10,
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            position: 'right',
            nameTextStyle: {
              fontSize: 8,
              color: '#6F7379'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            data: that.echartData1.map(
              item => `${item.age_duration},  ${item.gender},  ${item.count}`
            )
          },
          series: [
            {
              type: 'bar',
              barWidth: 16,
              data: that.echartData1.map(item => item.count),
              itemStyle: {
                color: function(params) {
                  // console.log('输出', params)
                  var colorList = [
                    '#F5C22B',
                    '#F5C22B',
                    '#F5C22B',
                    '#F5C22B',
                    '#F5C22B',
                    '#F5C22B',
                    '#F5C22B',
                    '#F5C22B',
                    '#F5C22B',
                    '#F5C22B',
                    '#F5C22B',
                    '#04A9F5',
                    '#A389D4',
                    '#1DE9B6'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          ]
        })
    }
  }
}
</script>
<style lang="scss" scoped>
#pictureBoard {
  padding: 35px 40px 20px 20px;
  background: #ecedef;
  .queryArea {
    .textLabel {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      padding-right: 3px;
      padding-left: 3px;
      font-size: 12px;
      vertical-align: middle;
      margin-right: -5px;
      color: #aaaeb3;
      background: #fff;
      border: 1px solid #c6cacf;
      border-top-left-radius: 1px;
      border-bottom-left-radius: 1px;
    }
  }
  .contentArea {
    letter-spacing: 2.57px;
    .graphBoard,
    .memberBoard {
      padding: 20px 30px;
      background: #fff;
      .title_1 {
        font-size: 18px;
        color: #202224;
        letter-spacing: 2.57px;
        margin: 0 0 20px;
      }
      .title_2 {
        font-size: 12px;
        color: #474b4f;
        letter-spacing: 1.71px;
      }
    }
    .graphBoard {
      margin-bottom: 20px;
    }
  }
}
</style>
<style lang="scss">
#pictureBoard {
  .queryArea {
    margin-bottom: 20px;
    .el-range-editor--small.el-input__inner {
      width: 268px;
      height: 30px;
      line-height: 30px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      cursor: pointer;
      .el-range-editor--small .el-range-input {
        font-size: 14px;
      }
    }
    .el-range__icon {
      position: absolute;
      right: 0;
      line-height: 28px;
      color: #1de9b6;
    }
  }
}
</style>