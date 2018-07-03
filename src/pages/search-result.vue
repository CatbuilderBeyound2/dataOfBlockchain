<template>
  <div class="search-result">
    <div class="title">搜索结果</div>
    <search @search='search'></search>
    <div class="result-count">
      共{{resultTotalCount}}个结果，{{count.coinName}}个币种，{{count.trade}}个交易平台
    </div>
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
import search from '@/components/search';
import api from '@/api';
import { insertData2Chart } from './index/tool.js';
export default {
  components: {
    table1,
    table2,
    search,
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
      sort: {
        prop: 'ec_turnover',
        order: 'desc',
      },
      count: {
        coinName: 0,
        trade: 0,
      },
    };
  },
  created() {
    this.seachByTab();
    this.getCount();
  },
  computed: {
    resultTotalCount() {
      return this.count.coinName + this.count.trade;
    },
  },
  methods: {
    seachByCoinName(coinName) {
      api
        .searchByCoinName({
          params: {
            name: coinName || this.$route.query.q,
            type: this.active,
            columnName: this.sort.prop,
            orderType: this.sort.order,
            pageNo: this.pageNo,
            pageSize: this.pageSize,
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
            v.echarts = insertData2Chart(v.trend);
            return v;
          });

          this.total = res.tablePage.total;
        });
    },
    seachByTrade() {
      api
        .searchByTrade({
          params: {
            name: this.$route.query.q,
            type: this.active,
            columnName: this.sort.prop,
            orderType: this.sort.order,
          },
        })
        .then(res => {
          this.tableHeader2 = res.tableHeader.map(v => {
            let sortableArr = ['ec_turnover', 'ec_pair', 'ec_start'];
            if (sortableArr.indexOf(v.column) > -1) {
              v.sortable = true;
            } else {
              v.sortable = false;
            }
            return v;
          });
          this.tableData2 = res.tableData;
          this.total = res.tablePage.total;
        });
    },
    seachByTab() {
      if (this.active === 'coinName') {
        this.seachByCoinName();
      } else {
        this.seachByTrade();
      }
    },
    getCount(key) {
      api
        .searchCount({
          params: {
            type: 'market',
            name: key || this.$route.query.q,
          },
        })
        .then(res => {
          this.count.coinName = res.tablePage.total;
          this.count.trade = res.tablePage.total1;
        });
    },
    tabClick(tab) {
      this.active = tab.name;
      this.pageNo = 1;
      this.seachByTab();
    },
    sortChange(params) {
      if (params.order === 'descending') {
        this.sort.order = 'desc';
      } else {
        this.sort.order = 'asc';
      }
      this.sort.prop = params.prop;
      this.seachByTab();
    },
    search(key) {
      this.active = 'coinName';
      this.pageNo = 1;
      this.sort = {
        prop: 'ec_turnover',
        order: 'desc',
      };
      this.$route.query.q = key;
      this.seachByCoinName(key);
      this.getCount(key);
    },
  },
};
</script>



<style lang="less">
@import '~@style/mixins.less';
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
  .el-autocomplete {
    width: 100%;
    .el-input__suffix {
      background-color: @primary-color;
      color: @fill-color;
      width: 60px;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      right: 0;
      .el-input__icon {
        font-size: 20px;
      }
    }
  }
  .searchSelect {
    border: 1px solid @border-color;
    border-radius: 4px;
  }
  .title {
    .text(18, 50, 50);
    font-weight: 600;
    text-align: left;
    &::before {
      content: '·';
      display: inline-block;
      .size(30, 50);
      font-size: 20px;
      text-align: center;
    }
  }
  .result-count {
    color: #909399;
    text-align: left;
    padding: 10px 0 20px 20px;
  }
}
</style>

