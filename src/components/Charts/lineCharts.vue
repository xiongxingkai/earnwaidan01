<template>
  <div :class="className" :id="id" :style="{ height: height, width: width }"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'lineChart'
    },
    width: {
      type: String,
      default: '600px'
    },
    height: {
      type: String,
      default: '400px'
    },
    // x轴坐标值
    dataX: {
      type: Array,
      default: []
    },
    // 要显示的数据
    barDatas: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.chart = null
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      // x轴的坐标
      // const xData = (function(){
      //   const data = []
      //   for (let i = 1; i < 13; i++) {
      //     data.push(i + 'month')
      //   }
      //   return data
      // }())
      this.chart.setOption({
        title: {
          text: '经营活动之现金流入净额',
          x: 'center',
          textStyle: {
            color: '#0094ff',
          }
        },
        textStyle: {
          color: 'rgb(0, 238, 255)'
        },
        tooltip: {},
        legend: {
          y: 'bottom',
          textStyle: {
            color: '#0094ff',
            fontSize: 14
          },
          data: ['经营活动之现金流入净额']
        },
        xAxis: {
          type: 'category',
          data: this.dataX,
          // 坐标轴颜色
          axisLine: {
            lineStyle: {
              color: 'rgba(13, 90, 158)'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 18
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '(单位：百万元)',
          // 坐标轴颜色
          axisLine: {
            lineStyle: {
              color: 'rgba(211, 89, 62)'
            }
          },
          // y轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: 'rgb(211, 89, 62)',
              fontSize: 16
            }
          }
        },
        series: [
          {
            name: '经营活动之现金流入净额',
            type: 'line',
            barWidth: 30,
            data: this.barDatas,
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            color: 'rgb(39, 180, 108)'
          }
        ]
      })
    }
  }
}
</script>
