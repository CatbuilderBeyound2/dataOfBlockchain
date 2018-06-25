<template>
  <div class="tabs">
    <el-tabs :value="active" @tab-click="tabClick" type="border-card">
      <el-tab-pane label="行情数据" name="quotation">
        <table1 v-if="'quotation'===active" :headerData='quotation.tableHeader' @sort-change='sortChange' :tableData='quotation.tableData'></table1>
      </el-tab-pane>
      <el-tab-pane label="交易大厅" name="transaction">
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
      <el-pagination v-if='active!=="none"' :current-page.sync='pageNo' :page-size='pageSize' :total="total" small background layout="prev, pager, next">
      </el-pagination>
    </el-tabs>
  </div>
</template>
<script>
import table1 from '@/components/table/table1';
import table2 from '@/components/table/table2';
import tabs from '@/mixins/tabs';
import api from '@/api';
import { insertData2Chart, subTabsMap } from './tool.js';
import { deleteInvalidKey } from '@/utils/utils.js';
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
        prop: '',
        order: 'desc',
      },
      pageSize: 15,
      pageNo: 1,
      total: 100,
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
          this.quotation.tableHeader = res.tableHeader.map(v => {
            let sortableArr = ['marketCap', 'price', 'circulatingSupply', 'volume', 'change'];
            if (sortableArr.indexOf(v.column) > -1) {
              v.sortable = true;
            } else {
              v.sortable = false;
            }
            return v;
          });
          this.quotation.tableData = res.tableData.map(v => {
            v.echarts = insertData2Chart(v.priceGraph);
            return v;
          });
          this.total = res.total || 100;
        });
    },
    getTrade() {
      api
        .getTrade({
          params: this.collectingParams(),
        })
        .then(res => {
          this.transaction.tableHeader = res.tableHeader.map(v => {
            let sortableArr = ['volume', 'volumeNumber', 'rank', 'tradePair'];
            if (sortableArr.indexOf(v.column) > -1) {
              v.sortable = true;
            } else {
              v.sortable = false;
            }
            return v;
          });
          this.transaction.tableData = res.tableData;
          this.total = res.total || 100;
        });
    },
    rankings() {
      api
        .rankings({
          params: this.collectingParams(),
        })
        .then(res => {
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
            v.echarts = insertData2Chart(v.priceGraph);
            return v;
          });
          this.total = res.total || 100;
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
  margin: 0 auto;
  margin-bottom:30px;
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
  .el-pagination {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
