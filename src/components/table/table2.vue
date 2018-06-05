//
<template>
  <div class="table-2">
    <el-table :data="tableData" header-row-class-name="table-2-header" @row-click="rowClick" @sort-change="sortChange">
      <el-table-column v-for="(item ,index) in headerData" :sortable="item.sortable?'custom':false" header-align="center" :prop="item.key" :label="item.label" :key="index">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import tableMixin from '@/mixins/table';
export default {
  name: 'table2',
  mixins: [tableMixin]
};
</script>
<style lang="less">
.table-2 {
  .el-table tr.table-2-header>th {
    background-color: #dedede;
    color: #999999;
  }
}
</style>
