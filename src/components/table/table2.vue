//
<template>
  <div class="table-2">
    <el-table :data="tableData" header-row-class-name="table-1-header" @row-click="rowClick" @sort-change="sortChange">
      <template v-for="(item ,index) in headerData">
        <el-table-column v-if="item.column==='tradeType'" width="200" :sortable="item.sortable?'custom':false" header-align="center" :label="item.columnName" :key="index" :sort-orders='sortOrders' :prop='item.column'>
          <template slot-scope="scope">
            <el-tag v-for="(tagItem,tagIndex) in scope.row.tradeType" :type="tagMap[tagItem].type" :key='tagIndex'>{{tagMap[tagItem].label}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="item.column==='rank'" width="150" :sortable="item.sortable?'custom':false" header-align="center" :label="item.columnName" :key="index" :sort-orders='sortOrders' :prop='item.column'>
          <template slot-scope="scope">
            <el-rate :value="scope.row[item.column]" disabled allow-half text-color="#ff9900">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column v-if="item.column!=='rank'&&item.column!=='tradeType'" :sortable="item.sortable?'custom':false" header-align="center" :label="item.columnName" :key="index" :sort-orders='sortOrders' :prop='item.column'>
          <template slot-scope="scope">
            {{scope.row[item.column]}}
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import tableMixin from '@/mixins/table';
export default {
  name: 'table2',
  mixins: [tableMixin],
  data() {
    return {
      tagMap: {
        '1': {
          type: 'success',
          label: '现货',
        },
        '2': {
          type: 'info',
          label: '期货',
        },
        '3': {
          type: 'warning',
          label: '法币',
        },
      },
    };
  },
};
</script>
<style lang="less">
.table-2 {
  .el-table tr.table-2-header > th {
    background-color: #dedede;
    color: #999999;
  }
  .el-tag{
    height: 23px;
    line-height: 23px
  }
}
</style>
