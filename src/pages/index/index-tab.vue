<template>
  <div class="tabs">
    <el-tabs :value="active" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="行情数据" name="quotation">
        <table1 v-if="'quotation'===active" :headerData='quotation.tableHeader' @sort-change='sortChange' :tableData='quotation.tableData'></table1>
      </el-tab-pane>
      <el-tab-pane label="交易大厅" name="transaction">
        <table2 v-if="'transaction'===active" :headerData='transaction.tableHeader' :tableData='transaction.tableData' @sort-change='sortChange'></table2>
      </el-tab-pane>
      <el-tab-pane label="排行榜" name="rank">
        <table1 v-if="'rank'===active" :headerData='rank.tableHeader' :tableData='rank.tableData' @sort-change='sortChange'></table1>
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
const insertData2Chart = data => {
  return {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
      scale: true,
    },
    grid: {
      y: 1,
      height: '100%',
    },
    series: [
      {
        data: data,
        type: 'line',
        showAllSymbol: true,
        showSymbol: false,
      },
    ],
  };
};
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
    };
  },
  watch: {
    activeName(val) {
      this.active = val;
    },
    pageNo() {
      this.getDataByTab();
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
      return {
        columnName: this.sort.prop,
        orderType: this.sort.order,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      };
    },
    handleClick(tab, event) {
      this.active = tab.name;
      this.pageNo = 1;
      this.$emit('tab-change', tab);
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
          this.total = res.total||100;
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
          this.total = res.total||100;
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
          this.total = res.total||100;
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
.tabs {
  .el-tabs__nav {
    display: flex;
    width: 100%;
    > div {
      flex-grow: 1;
    }
  }
  .el-pagination {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
