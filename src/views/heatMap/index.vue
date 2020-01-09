<template>
  <div id="heatMap">
    <div id="div1" style="height: 500px;"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'heatMap',
  data() {
    return {
      echartData: []
    }
  },
  created() {
    this.initData()
  },
  mounted() {
    this.$nextTick(this.initMap)
  },
  methods: {
    initData() {
      this.echartData = [
        [0, 0, 1],
        [0, 1, 4],
        [0, 2, 1],
        [0, 3, 1],
        [0, 4, 1],
        [0, 5, 4],
        [0, 6, 1],

        [1, 0, 1],
        [1, 1, 1],
        [1, 2, 4],
        [1, 3, 1],
        [1, 4, 3],
        [1, 5, 5],
        [1, 6, 1],
       
        [2, 0, 1],
        [2, 1, 1],
        [2, 2, 1],
        [2, 3, 2],
        [2, 4, 3],
        [2, 5, 2],
        [2, 6, 1],
        
        [3, 0, 3],
        [3, 1, 4],
        [3, 2, 4],
        [3, 3, 5],
        [3, 4, 3],
        [3, 5, 3],
        [3, 6, 1],
        
        [4, 0, 5],
        [4, 1, 1],
        [4, 2, 1],
        [4, 3, 3],
        [4, 4, 1],
        [4, 5, 4],
        [4, 6, 1],
        
        [5, 0, 2],
        [5, 1, 2],
        [5, 2, 5],
        [5, 3, 1],
        [5, 4, 2],
        [5, 5, 5],
        [5, 6, 1],
        
        [6, 0, 1],
        [6, 1, 1],
        [6, 2, 2],
        [6, 3, 2],
        [6, 4, 4],
        [6, 5, 3],
        [6, 6, 1],

        [7, 0, 3],
        [7, 1, 3],
        [7, 2, 2],
        [7, 3, 2],
        [7, 4, 4],
        [7, 5, 4],
        [7, 6, 1],

        [8, 0, 1],
        [8, 1, 1],
        [8, 2, 3],
        [8, 3, 1],
        [8, 4, 4],
        [8, 5, 2],
        [8, 6, 1]
      ]
    },
    initMap() {
      const xLabelArray = [
        '0:00~8:00',
        '8:00~10:00',
        '10:00~12:00',
        '12:00~14:00',
        '14:00~16:00',
        '16:00~18:00',
        '18:00~20:00',
        '20:00~22:00',
        '22:00~24:00'
      ]
      const yLabelArray = [
        '2019/11/12',
        '2019/11/13',
        '2019/11/14',
        '2019/11/15',
        '2019/11/16',
        '2019/11/17',
        '2019/11/18'
      ]
      const that = this
      echarts.init(document.getElementById('div1')).setOption({
        tooltip: {
          position: 'top'
        },
        animation: false,
        grid: {
          height: '50%',
          top: '10%'
        },
        xAxis: {
          type: 'category',
          data: xLabelArray,
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 12,
            color: '#6F7379',
            margin: 8
          },
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: yLabelArray,
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 12,
            color: '#6F7379',
            margin: 8
          },
          splitArea: {
            show: true
          }
        },
        visualMap: {
          type: 'piecewise',
          pieces: [
            {value: 1, color: '#C3FFCD'},
            {value: 2, color: '#FFF276'},
            {value: 3, color: '#FFCE8A'},
            {value: 4, color: '#FFA8A2'},
            {value: 5, color: '#EDA5F7'}
          ],
          itemWidth: 16,
          itemHeight: 16, // 设置拖动色块的高度
          itemGap: 16,
          show: true, // 控制不显示热力图颜色控制器
          calculable: true,
          orient: 'horizontal',
          text: ['高', '低'],
          left: 180,
          top: 'top'
        },
        series: [
          {
            name: '回访活跃度分析',
            type: 'heatmap',
            data: this.echartData,
            label: {
              show: true,
              color: '#6F7379'
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
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
#heatMap {
  padding: 50px 25px;
}
</style>