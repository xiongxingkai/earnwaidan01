<template>
  <div id="dragTable">
    <h1>拖拽排序</h1>
    <!-- <el-table :data="tableData">
      <el-table-column label="序号" prop="id"></el-table-column>
      <el-table-column label="数值" prop="number"></el-table-column>
    </el-table> -->
    <table>
      <thead>
        <tr>
          <th>序号</th>
          <th>数值</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="item.id" draggable="true" @dragstart="onDragStart($event, index)" @dragover="onDragOver($event, index)" @dragend="onDragEnd">
          <td>{{item.id}}</td>
          <td>{{item.number}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'dragTable',
  data() {
    return {
      tableData: [],
      draging: null,
      target: null,
      startIndex: undefined,
      endIndex: undefined
    }
  },
  created() {
    this.tableData = [
      {
        id: '01',
        number: parseInt(Math.random()*1000000)
      },
      {
        id: '02',
        number: parseInt(Math.random()*1000000)
      },
      {
        id: '03',
        number: parseInt(Math.random()*1000000)
      },
      {
        id: '04',
        number: parseInt(Math.random()*1000000)
      },
      {
        id: '05',
        number: parseInt(Math.random()*1000000)
      },
      {
        id: '06',
        number: parseInt(Math.random()*1000000)
      },
      {
        id: '07',
        number: parseInt(Math.random()*1000000)
      },
      {
        id: '08',
        number: parseInt(Math.random()*1000000)
      },
      {
        id: '09',
        number: parseInt(Math.random()*1000000)
      },
      {
        id: '10',
        number: parseInt(Math.random()*1000000)
      }
    ]
  },
  methods: {
    onDragStart(e, index) {
      console.log('开始拖动', e, 'value_' + index)
      this.draging = e.target
      this.startIndex = index
      this.endIndex = undefined
    },
    onDragOver(e, index) {
      console.log('进入', e, index)
      this.target = e.target
      if (this.target !== this.draging) {
        this.endIndex = index
      }
    },
    onDragEnd() {
      if (this.endIndex) {
        const arr = this.tableData.splice(this.startIndex, 1)
        this.tableData.splice(this.endIndex, 0, arr[0])
      }
    }
  }
}
</script>