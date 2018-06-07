

// 有图表预览的table


<template>
  <div class="table-1">
    <el-table :data="tableData" header-row-class-name="table-1-header" @row-click="rowClick" @sort-change="sortChange">
      <el-table-column v-for="(item ,index) in headerData" :sortable="item.sortable?'custom':false" header-align="center" :label="item.columnName" :key="index">
        <template slot-scope="scope">
          <chart v-if="item.column==='priceGraph'" :options="scope.row.echarts"></chart>
          <template v-if="item.column!=='priceGraph'">{{scope.row[item.column]}}</template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import tableMixin from '@/mixins/table';
export default {
  name: 'table1',
  mixins: [tableMixin],
  created() {},
};
</script>
<style lang="less">
@import '~@style/var.less';
.table-1 {
  .el-table tr.table-1-header th {
    background-color: @primary-color;
    color: aliceblue;
  }
  .echarts {
    height: 23px;
    width: 100px;
    margin: auto;
  }
}
</style>

