<template>
  <div id="pictureBoard">
    <div class="queryArea">
      <span class="textLabel">日期</span>
      <el-date-picker size="small" type="daterange"
                      v-model="dateRange"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      range-separator="~"></el-date-picker>
    </div>
    <div class="contentArea">
      <div class="graphBoard">
        <h3>画像看板</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <h6>客群性别画像</h6>
            <div id="consumer-gender"
                 style="height: 250px;"></div>
          </el-col>
          <el-col :span="12">
            <h6>客群年龄画像</h6>
            <div id="consumer-yearold"
                 style="height: 250px;"></div>
          </el-col>
        </el-row>
        <el-row>
          <h6>客群性别&年龄分布分析</h6>
          <div id="consumer-gender-and-yearold"
               style="height: 360px;"></div>
        </el-row>
      </div>
      <div class="memberBoard">
        <h3>会员画像看板</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <h6>会员性别画像</h6>
            <div id="member-gender"
                 style="height: 250px;"></div>
          </el-col>
          <el-col :span="12">
            <h6>会员年龄画像</h6>
            <div id="member-yearold"
                 style="height: 250px;"></div>
          </el-col>
        </el-row>
        <el-row>
          <h6>会员性别&年龄分布分析</h6>
          <div id="member-gender-and-yearold"
               style="height: 360px;"></div>
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
  data () {
    return {
      dateRange: []
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initData () {
      // loginApi({
      //   "admin": {
      //     "phone": "13111111111",
      //     "password": "12345678"
      //   }
      // }).then(res => {console.log('请求成功了', res)})
    },
    initMap () {
      const that = this
      this.$nextTick(() => {
        echarts.init(document.getElementById('consumer-gender')).setOption({
          // title: {
          //   text: '某站点用户访问来源',
          //   subtext: '纯属虚构',
          //   x: 'center'
          // },
          color: ['#04A9F5', '#1DE9B6'],
          tooltip: {
            trigger: 'item',
            confine: true,
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            right: 20,
            top: 'middle',
            // formatter(name) {
            //   if (name === '女性') {
            //     return `<span style="padding: 2px;margin: 5px 10px;border-bottom: 1px solid #EBEBEB;">${name}</span>`
            //   } else {
            //     return `<span style="padding: 2px;margin: 5px 10px;border-bottom: 1px solid #EBEBEB;">${name}</span>
            //     <br><br><br>
            //     <span style="padding: 5px;magring: 0 30px;">去重客流</span>
            //     <span style="padding: 5px;">107</span>
            //     <br>
            //     <span style="padding: 5px;magring: 0 30px;">客流数</span>
            //     <span style="padding: 5px;">8419</span>
            //     `
            //   }
            // },
            // formatter: [
            //   '{title|{b}}{abg|}',
            //   '  {weatherHead|天气}{valueHead|天数}{rateHead|占比}',
            //   '{hr|}',
            //   '  {Sunny|}{value|202}{rate|55.3%}',
            //   '  {Cloudy|}{value|142}{rate|38.9%}',
            //   '  {Showers|}{value|21}{rate|5.8%}'
            // ].join('\n'),
            // rich: {
            //   title: {
            //     color: '#eee',
            //     align: 'center'
            //   },
            //   abg: {
            //     backgroundColor: '#333',
            //     width: '100%',
            //     align: 'right',
            //     height: 25,
            //     borderRadius: [4, 4, 0, 0]
            //   },
            //   Sunny: {
            //     height: 30,
            //     align: 'left',
            //     backgroundColor: {
            //       // image: weatherIcons.Sunny
            //     }
            //   },
            //   Cloudy: {
            //     height: 30,
            //     align: 'left',
            //     backgroundColor: {
            //       // image: weatherIcons.Cloudy
            //     }
            //   },
            //   Showers: {
            //     height: 30,
            //     align: 'left',
            //     backgroundColor: {
            //       // image: weatherIcons.Showers
            //     }
            //   },
            //   weatherHead: {
            //     color: '#333',
            //     height: 24,
            //     align: 'left'
            //   },
            //   hr: {
            //     borderColor: '#777',
            //     width: '100%',
            //     borderWidth: 0.5,
            //     height: 0
            //   },
            //   value: {
            //     width: 20,
            //     padding: [0, 20, 0, 30],
            //     align: 'left'
            //   },
            //   valueHead: {
            //     color: '#333',
            //     width: 20,
            //     padding: [0, 20, 0, 30],
            //     align: 'center'
            //   },
            //   rate: {
            //     width: 40,
            //     align: 'right',
            //     padding: [0, 10, 0, 0]
            //   },
            //   rateHead: {
            //     color: '#333',
            //     width: 40,
            //     align: 'center',
            //     padding: [0, 10, 0, 0]
            //   }
            // },
            data: ['女性', '男性']
          },
          series: [
            {
              name: '客群性别画像',
              type: 'pie',
              radius: '45%',
              center: ['28%', '50%'],
              data: [
                { value: 4378, name: '女性' },
                { value: 4041, name: '男性' }
              ],
              label: {
                fontSize: 8,
                color: '#6F7379'
              }
            }
          ]
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#pictureBoard {
  padding: 40px 20px;
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
      color: #AAAEB3;
      background: #fff;
      border: 1px solid #C6CACF;
      border-top-left-radius: 1px;
      border-bottom-left-radius: 1px;
    }
  } 
}
</style>
<style lang="scss">
#pictureBoard {
  .queryArea {
    .el-range-editor--small.el-input__inner{
      width: 268px;
      height: 30px;
      line-height: 30px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      .el-range-editor--small .el-range-input{
        font-size: 14px;
      }
    }
    .el-range__icon {
      position: absolute;
      right: 0;
      line-height: 28px;
      color: #1DE9B6;
    }
  } 
}
</style>