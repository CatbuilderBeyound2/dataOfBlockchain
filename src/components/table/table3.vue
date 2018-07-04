//
<template>
  <div class="table-3">
    <el-table :data="tableData" v-loading="loading" header-row-class-name="table-2-header" @row-click="rowClick" @sort-change="sortChange">
      <el-table-column v-for="(item ,index) in headerData" :sortable="item.sortable?'custom':false" header-align="center" :prop="item.key" :label="item.label" :key="index" :sort-orders='sortOrders' :prop='item.column'>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import tableMixin from '@/mixins/table';
export default {
  name: 'table3',
  mixins: [tableMixin]
};
</script>
<style lang="less">
@import '~@style/var.less';
.table-3 {
  .el-table tr.table-3-header>th {
    background-color: #dedede;
    color: #999999;
    padding: 5px 0;
  }
}
</style>
