

// 有图表预览的table


<template>
  <el-table :data="tableData" header-row-class-name="table-1-header" @row-click="rowClick" @sort-change="sortChange">
    <el-table-column v-for="(item ,index) in headerData" :sortable="item.sortable?'custom':false" header-align="center" :prop="item.key" :label="item.label" :key="index">
    </el-table-column>
  </el-table>
</template>

<script>
import tableMixin from '@/mixins/table';
export default {
  name: 'table1',
  mixins: [tableMixin]
};
</script>
<style lang="less">
.el-table th, .el-table tr.table-1-header  {
  background: #69c72b;
  color: aliceblue
}
</style>

