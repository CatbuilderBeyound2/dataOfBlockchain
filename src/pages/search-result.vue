<template>
  <div class="search-result">
    <el-tabs :value="active" @tab-click="tabClick" type="border-card">
      <el-tab-pane label="币种" name="coinName">
        <table1 :headerData='tableHeader' @sort-change='sortChange' :tableData='tableData'></table1>
      </el-tab-pane>
      <el-tab-pane label="交易平台" name="transaction">
        <table2 :headerData='tableHeader2' @sort-change='sortChange' :tableData='tableData2'></table2>
      </el-tab-pane>
      <el-pagination v-if='active!=="none"' :current-page.sync='pageNo' :page-size='pageSize' :total="total" small background layout="prev, pager, next">
      </el-pagination>
    </el-tabs>
  </div>
</template>

<script>
import table1 from '@/components/table/table1';
import table2 from '@/components/table/table2';
import api from '@/api';
import { insertData2Chart } from './index/tool.js';
export default {
  components: {
    table1,
    table2,
  },
  data() {
    return {
      active: 'coinName',
      tableHeader: [],
      tableData: [],
      tableHeader2: [],
      tableData2: [],
      pageNo: 1,
      pageSize: 15,
      total: 0,
    };
  },
  created() {
    this.seachByTab();
  },
  methods: {
    seachByTab() {
      api
        .search({
          params: {
            name: this.$route.query.q,
            type: this.active,
            orderCloumn: '',
            orderType: '',
          },
        })
        .then(res => {
          this.tableHeader = res.tableHeader.map(v => {
            let sortableArr = ['marketCap', 'price', 'circulatingSupply', 'volume', 'change'];
            if (sortableArr.indexOf(v.column) > -1) {
              v.sortable = true;
            } else {
              v.sortable = false;
            }
            return v;
          });
          this.tableData = res.tableData.map(v => {
            v.echarts = insertData2Chart(v.priceGraph);
            return v;
          });
          this.total = res.total || 100;
        });
    },
    tabClick() {},
    sortChange() {},
  },
};
</script>



<style lang="less">
@import '~@style/var.less';
.search-result {
  > .el-tabs > .el-tabs__header .el-tabs__nav {
    display: flex;
    width: 100%;
    > div {
      flex-grow: 1;
    }
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
    color: @primary-color;
  }
  .el-tabs__item {
    height: 40px;
    line-height: 39px;
  }
  .el-pagination {
    text-align: right;
    margin-top: 20px;
  }
}
</style>

