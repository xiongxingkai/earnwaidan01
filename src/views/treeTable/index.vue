<template>
  <div id="treeTable">
    <el-table
      :data="tableData" 
      class="treeTable"
      style="width: 100%;margin-bottom: 20px;"
      row-key="rowKey"
      border
      default-expand-all
      :tree-props="{ children: 'regions', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="floor_name" label="楼层" header-align="center" align="center" width="180">
      </el-table-column>
      <el-table-column prop="name" label="区域名称" header-align="center" align="center">
      </el-table-column>
      <el-table-column label="类型" header-align="center" align="center" width="180">
        <template slot-scope="scope">
          {{
            scope.row.region_types_name && scope.row.region_types_name.join(';')
          }}
        </template>
      </el-table-column>
      <el-table-column prop="device_count" label="设备数" header-align="center" align="center" width="180"></el-table-column>
      <el-table-column prop="location" label="位置" header-align="center" align="center"></el-table-column>
      <el-table-column label="添加时间" width="200" header-align="center" align="center">
        <template slot-scope="scope">
          {{
            scope.row.created_at &&
              new Date(scope.row.created_at).toLocaleString('chinese', {
                hour12: false
              })
          }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'treeTable', // el-icon-plus el-icon-minus
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.tableData = [
        {
          floor_id: 10,
          floor_name: '3F',
          priority: 10,
          regions: [
            {
              id: 16,
              created_at: '2019-09-27T07:06:05Z',
              deleted_at: null,
              device_count: 0,
              floor_id: 10,
              location: 'VR游戏体验厅入口',
              name: 'VR游戏体验厅入口',
              region_flow_count: 0,
              region_types_detail: [
                {
                  region_type: 4,
                  related_id: 9
                }
              ],
              region_types_name: ['商铺出入口'],
              updated_at: '2019-09-30T09:42:12Z'
            },
            {
              id: 15,
              created_at: '2019-09-27T07:06:05Z',
              deleted_at: null,
              device_count: 0,
              floor_id: 10,
              location: '华润万家A出口',
              name: '金蓝影院',
              region_flow_count: 0,
              region_types_detail: [
                {
                  region_type: 3,
                  related_id: 9
                }
              ],
              region_types_name: ['A区'],
              updated_at: '2019-09-30T09:42:12Z'
            },
            {
              id: 13,
              created_at: '2019-09-27T07:06:05Z',
              deleted_at: null,
              device_count: 0,
              floor_id: 10,
              location: '百佳华三楼',
              name: '儿童乐园',
              region_flow_count: 0,
              region_types_detail: [
                {
                  region_type: 4,
                  related_id: 9
                }
              ],
              region_types_name: ['商铺'],
              updated_at: '2019-09-30T09:42:12Z'
            }
          ]
        },
        {
          floor_id: 9,
          floor_name: '2F',
          priority: 10,
          regions: [
            {
              id: 16,
              created_at: '2019-09-27T07:06:05Z',
              deleted_at: null,
              device_count: 0,
              floor_id: 9,
              location: '深圳北二楼',
              name: '高铁进站口',
              region_flow_count: 0,
              region_types_detail: [
                {
                  region_type: 4,
                  related_id: 9
                }
              ],
              region_types_name: ['果然'],
              updated_at: '2019-09-30T09:42:12Z'
            },
            {
              id: 15,
              created_at: '2019-09-27T07:06:05Z',
              deleted_at: null,
              device_count: 0,
              floor_id: 9,
              location: '地铁站二楼',
              name: '肯德基',
              region_flow_count: 0,
              region_types_detail: [
                {
                  region_type: 3,
                  related_id: 9
                }
              ],
              region_types_name: ['餐饮'],
              updated_at: '2019-09-30T09:42:12Z'
            },
            {
              id: 13,
              created_at: '2019-09-27T07:06:05Z',
              deleted_at: null,
              device_count: 0,
              floor_id: 9,
              location: '华富市场',
              name: '水果批发部',
              region_flow_count: 0,
              region_types_detail: [
                {
                  region_type: 4,
                  related_id: 9
                }
              ],
              region_types_name: ['商铺'],
              updated_at: '2019-09-30T09:42:12Z'
            }
          ]
        },
        {
          floor_id: 8,
          floor_name: '1F',
          priority: 10,
          regions: [
            {
              id: 13,
              created_at: '2019-09-27T07:06:05Z',
              deleted_at: null,
              device_count: 0,
              floor_id: 10,
              location: '龙华公园',
              name: '哥哥乐',
              region_flow_count: 0,
              region_types_detail: [
                {
                  region_type: 4,
                  related_id: 9
                }
              ],
              region_types_name: ['餐饮'],
              updated_at: '2019-09-30T09:42:12Z'
            }
          ]
        }
      ]
      this.tableData.forEach((item,index) => {
        item.rowKey= 'key_'+ index
        if (item.regions) {
          item.regions.forEach((pp,kk) => {
            pp.rowKey = 'key_' + index + '_' + kk
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.treeTable {
  .el-table__expand-icon {
    border: 1px solid #EBEBEB;
    .el-icon-arrow-right:before {
      content: "\E6D9";
    }
  }
  .el-table__expand-icon--expanded {
    transform: rotate(0deg);
    .el-icon-arrow-right:before {
      content: "\E6D8";
    }
  }
}
</style>
