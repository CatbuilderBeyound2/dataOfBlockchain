

// 有图表预览的table


<template>
  <div class="table">
    <el-table :data="tableData" header-row-class-name="table-1-header" @row-click="rowClick" @sort-change="sortChange">
      <el-table-column v-for="(item ,index) in headerData" :sortable="item.sortable?'custom':false" header-align="center" :prop="item.key" :label="item.label" :key="index">
        <template slot-scope="scope">
          <chart   v-if="item.key==='echarts'" :options="scope.row.echarts"></chart>
          <template v-if="item.key!=='echarts'">{{scope.row[item.key]}}</template>
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
  methods:{
    handleEdit(a){
      console.log(a);
    }
  }
};
</script>
<style lang="less">
.el-table tr.table-1-header th {
  background-color: #69c72b;
  color: aliceblue;
}
.table .echarts {
  height: 50px;
  width: 200px;
  margin: auto
}
</style>

