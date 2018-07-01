<template>
  <div class="tabs">
    <el-tabs :value="active" @tab-click="tabClick" type="border-card">
      <el-tab-pane label="行情数据" name="quotation">
        <table1 v-if="'quotation'===active" :headerData='quotation.tableHeader' @sort-change='sortChange' :tableData='quotation.tableData'></table1>
      </el-tab-pane>
      <el-tab-pane label="交易平台" name="transaction">
        <el-tabs type="card" :value="subTab" @tab-click="subTabClick">
          <el-tab-pane v-for="(item,index) in subTabs" :label="item.label" :name="item.name" :key="index">
            <table2 v-if="'transaction'===active" :headerData='transaction.tableHeader' :tableData='transaction.tableData' @sort-change='sortChange'></table2>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="排行榜" name="rank">
        <el-tabs type="card" :value="subTab" @tab-click="subTabClick">
          <el-tab-pane v-for="(item,index) in subTabs" :label="item.label" :name="item.name" :key="index">
            <table1 v-if="'rank'===active" :headerData='rank.tableHeader' :tableData='rank.tableData' @sort-change='sortChange'></table1>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-pagination v-if='active!=="none"' :current-page.sync='pageNo' :page-size='pageSize' :total="total" small background layout="prev, pager, next,total">
      </el-pagination>
      <p class="remarks">备注：* 不可挖矿 ** 有预挖矿</p>
    </el-tabs>
  </div>
</template>
<script>
import table1 from '@/components/table/table1';
import table2 from '@/components/table/table2';
import tabs from '@/mixins/tabs';
import api from '@/api';
import { insertData2Chart, subTabsMap } from './tool.js';
import { deleteInvalidKey, addRowNo } from '@/utils/utils.js';
export default {
  name: 'indexTab',
  components: {
    table1,
    table2,
  },
  mixins: [tabs],
  created() {
    this.getMarketData();
    this.getTrade();
    this.rankings();
  },
  data() {
    return {
      quotation: {
        tableHeader: [],
        tableData: [],
      },
      transaction: {
        tableHeader: [],
        tableData: [],
      },
      rank: {
        tableHeader: [],
        tableData: [],
      },
      active: this.$props['activeName'],
      sort: {
        prop: 'ec_turnover',
        order: 'desc',
      },
      pageSize: 15,
      pageNo: 1,
      total: 0,
      subTab: '',
    };
  },
  computed: {
    subTabs() {
      return subTabsMap[this.active] || [];
    },
  },
  watch: {
    activeName(val) {
      this.active = val;
    },
    pageNo() {
      this.getDataByTab();
    },
    subTabs(val) {
      this.subTab = val[0] && val[0].name;
    },
  },
  methods: {
    getDataByTab() {
      if (this.active === 'quotation') {
        this.getMarketData();
      }
      if (this.active === 'transaction') {
        this.getTrade();
      }
      if (this.active === 'rank') {
        this.rankings();
      }
    },
    collectingParams() {
      let tradeType = this.subTabs.findIndex(v => {
        return v.name === this.subTab;
      });
      let res = {
        columnName: this.sort.prop,
        orderType: this.sort.order,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        tradeType: tradeType === -1 ? 0 : tradeType,
      };
      return deleteInvalidKey(res);
    },
    tabClick(tab) {
      this.active = tab.name;
      this.pageNo = 1;
      this.$emit('tab-change', tab);
      this.getDataByTab();
    },
    subTabClick(tab) {
      this.subTab = tab.name;
      this.pageNo = 1;
      this.getDataByTab();
    },
    getMarketData() {
      api
        .getMarketData({
          params: this.collectingParams(),
        })
        .then(res => {
          addRowNo({
            tableHeader: res.tableHeader,
            tableData: res.tableData,
            base: (this.pageNo - 1) * this.pageSize,
          });
          this.quotation.tableHeader = res.tableHeader.map(v => {
            let sortableArr = ['market_cap', 'price', 'market_num', 'turnover', 'change', ''];
            if (sortableArr.indexOf(v.column) > -1) {
              v.sortable = true;
            } else {
              v.sortable = false;
            }
            return v;
          });
          this.quotation.tableData = res.tableData.map(v => {
            v.echarts = insertData2Chart(v.trend);
            return v;
          });
          this.total = res.tablePage.total || 100;
        });
    },
    getTrade() {
      api
        .getTrade({
          params: this.collectingParams(),
        })
        .then(res => {
          addRowNo({
            tableHeader: res.tableHeader,
            tableData: res.tableData,
            base: (this.pageNo - 1) * this.pageSize,
          });
          this.transaction.tableHeader = res.tableHeader.map(v => {
            let sortableArr = ['ec_turnover', 'ec_pair', 'ec_start'];
            if (sortableArr.indexOf(v.column) > -1) {
              v.sortable = true;
            } else {
              v.sortable = false;
            }
            return v;
          });
          this.transaction.tableData = res.tableData;
          this.total = res.tablePage.total || 100;
        });
    },
    rankings() {
      api
        .rankings({
          params: this.collectingParams(),
        })
        .then(res => {
          addRowNo({
            tableHeader: res.tableHeader,
            tableData: res.tableData,
            base: (this.pageNo - 1) * this.pageSize,
          });
          this.rank.tableHeader = res.tableHeader.map(v => {
            let sortableArr = ['marketCap', 'price', 'circulatingSupply', 'volume', 'change'];
            if (sortableArr.indexOf(v.column) > -1) {
              v.sortable = true;
            } else {
              v.sortable = false;
            }
            return v;
          });
          this.rank.tableData = res.tableData.map(v => {
            v.echarts = insertData2Chart(v.trend);
            return v;
          });
          this.total = res.tablePage.total || 100;
        });
    },
    sortChange(params) {
      if (params.order === 'descending') {
        this.sort.order = 'desc';
      } else {
        this.sort.order = 'asc';
      }
      this.sort.prop = params.prop;
      this.getDataByTab();
    },
  },
};
</script>
<style lang="less">
@import '~@style/var.less';
.tabs {
  max-width: 1000px;
  margin: 0 20px;
  margin-bottom: 20px;
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

  .el-tabs--border-card > .el-tabs__content {
    padding: 0px;
  }
  .el-pagination {
    text-align: right;
    margin: 20px 0px;
    float: right;
  }
  .remarks {
    float: left;
    margin: 20px 20px;
    color: #999;
    font-size: 12px;
  }
  #pane-quotation,
  #pane-transaction,
  #pane-rank {
    padding: 15px;
  }
  .el-tabs--card > .el-tabs__header {
    border-bottom: none;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item {
    height: 20px;
    line-height: 19px;
    margin-right: 10px;
    border-bottom: none;
    border-left: none;
    color: #676767;
    font-size: 14px;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border: 1px solid #69c72b;
    border-radius: 4px;
    background: #ecffe1;
    color: #69c72b;
  }
}
</style>
