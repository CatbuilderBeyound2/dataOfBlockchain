<template>
    <div class="search-result">
        <el-tabs :value="active" @tab-click="tabClick" type="border-card">
            <el-tab-pane label="币种" name="coinName">
                <table1 v-if="'quotation'===active" :headerData='tableHeader' @sort-change='sortChange' :tableData='tableData'></table1>
            </el-tab-pane>
            <el-tab-pane label="交易平台" name="transaction">
                <table1 v-if="'quotation'===active" :headerData='tableHeader' @sort-change='sortChange' :tableData='tableData'></table1>
            </el-tab-pane>
            <el-pagination v-if='active!=="none"' :current-page.sync='pageNo' :page-size='pageSize' :total="total" small background layout="prev, pager, next">
            </el-pagination>
        </el-tabs>
    </div>
</template>

<script>
import api from '@/api';
import { insertData2Chart } from './index/tool.js';
export default {
  data() {
    return {
      active: 'coinName',
      tableHeader: [],
      tableData: [],
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
  .el-tabs__item{
    height: 40px;
    line-height: 39px;
  }
}
</style>

