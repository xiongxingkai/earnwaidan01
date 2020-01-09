<template>
  <div id="heatMap">
    <div id="div1" style="height: 500px;"></div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "heatMap",
  data() {
    return {
      echartData: []
    };
  },
  created() {
    this.initData();
  },
  mounted() {
    this.$nextTick(this.initMap);
  },
  methods: {
    initData() {
      this.echartData = [
        [0, 0, 158],
        [0, 1, 62],
        [0, 2, 753],
        [0, 3, 268],
        [0, 4, 357],
        [0, 5, 653],
        [0, 6, 186],

        [1, 0, 281],
        [1, 1, 116],
        [1, 2, 314],
        [1, 3, 189],
        [1, 4, 398],
        [1, 5, 586],
        [1, 6, 551],

        [2, 0, 182],
        [2, 1, 361],
        [2, 2, 821],
        [2, 3, 622],
        [2, 4, 393],
        [2, 5, 512],
        [2, 6, 2691],

        [3, 0, 378],
        [3, 1, 466],
        [3, 2, 583],
        [3, 3, 765],
        [3, 4, 689],
        [3, 5, 963],
        [3, 6, 152],

        [4, 0, 57],
        [4, 1, 169],
        [4, 2, 721],
        [4, 3, 623],
        [4, 4, 389],
        [4, 5, 538],
        [4, 6, 10],

        [5, 0, 2],
        [5, 1, 2],
        [5, 2, 569],
        [5, 3, 1],
        [5, 4, 269],
        [5, 5, 591],
        [5, 6, 661],

        [6, 0, 1],
        [6, 1, 731],
        [6, 2, 392],
        [6, 3, 262],
        [6, 4, 385],
        [6, 5, 373],
        [6, 6, 261],

        [7, 0, 623],
        [7, 1, 783],
        [7, 2, 822],
        [7, 3, 612],
        [7, 4, 398],
        [7, 5, 529],
        [7, 6, 678],

        [8, 0, 126],
        [8, 1, 195],
        [8, 2, 351],
        [8, 3, 167],
        [8, 4, 369],
        [8, 5, 272],
        [8, 6, 168]
      ];
    },
    initMap() {
      const xLabelArray = [
        "0:00~8:00",
        "8:00~10:00",
        "10:00~12:00",
        "12:00~14:00",
        "14:00~16:00",
        "16:00~18:00",
        "18:00~20:00",
        "20:00~22:00",
        "22:00~24:00"
      ];
      const yLabelArray = [
        "2019/11/12",
        "2019/11/13",
        "2019/11/14",
        "2019/11/15",
        "2019/11/16",
        "2019/11/17",
        "2019/11/18"
      ];
      const that = this;
      const max = 992;
      const average = parseInt(max / 5);
      echarts.init(document.getElementById("div1")).setOption({
        tooltip: {
          position: "top"
        },
        animation: false,
        grid: {
          height: "50%",
          top: "10%"
        },
        xAxis: {
          type: "category",
          data: xLabelArray,
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 12,
            color: "#6F7379",
            margin: 8
          },
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: "category",
          data: yLabelArray,
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 12,
            color: "#6F7379",
            margin: 8
          },
          splitArea: {
            show: true
          }
        },
        visualMap: {
          type: "piecewise",
          pieces: [
            { min: 0, max: average * 1, color: "#C3FFCD" },
            { min: average * 1, max: average * 2, color: "#FFF276" },
            { min: average * 2, max: average * 3, color: "#FFCE8A" },
            { min: average * 3, max: average * 4, color: "#FFA8A2" },
            // {value: 5, color: '#EDA5F7'},
            { min: average * 4, color: "#EDA5F7" }
          ],
          itemWidth: 16,
          itemHeight: 16, // 设置拖动色块的高度
          itemGap: 16,
          show: true, // 控制不显示热力图颜色控制器
          calculable: true,
          orient: "horizontal",
          text: ["高", "低"],
          left: 180,
          top: "top"
        },
        series: [
          {
            name: "回访活跃度分析",
            type: "heatmap",
            data: this.echartData,
            label: {
              show: true,
              color: "#6F7379"
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 2
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#heatMap {
  padding: 50px 25px;
}
</style>
