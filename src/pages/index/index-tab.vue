<template>
  <div class="tabs">
    <el-tabs :value="active" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="行情数据" name="quotation">
        <table1 v-if="'quotation'===active" :headerData='quotation.tableHeader' :tableData='quotation.tableData'></table1>
      </el-tab-pane>
      <el-tab-pane label="交易大厅" name="transaction">
        <table2 v-if="'transaction'===active" :headerData='transaction.tableHeader' :tableData='transaction.tableData'></table2>
      </el-tab-pane>
      <el-tab-pane label="排行榜" name="rank">
        <table1 v-if="'rank'===active" :headerData='rank.tableHeader' :tableData='rank.tableData'></table1>
      </el-tab-pane>
      <el-pagination v-if='active!=="none"' :current-page.sync='pageNo' :page-size='pageSize' small background layout="prev, pager, next" :total="1000">
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
      pageSize: 15,
      pageNo: 1,
    };
  },
  watch: {
    activeName(val) {
      this.active = val;
    },
    pageNo() {
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
  },
  methods: {
    handleClick(tab, event) {
      this.active = tab.name;
      this.pageNo = 1;
      this.$emit('tab-change', tab);
    },
    getMarketData() {
      api.getMarketData().then(res => {
        this.quotation.tableHeader = res.tableHeader;
        this.quotation.tableData = res.tableData.map(v => {
          v.echarts = insertData2Chart(v.priceGraph);
          return v;
        });
      });
    },
    getTrade() {
      api.getTrade().then(res => {
        this.transaction.tableHeader = res.tableHeader;
        this.transaction.tableData = res.tableData;
      });
    },
    rankings() {
      api.rankings().then(res => {
        this.rank.tableHeader = res.tableHeader;
        this.rank.tableData = res.tableData.map(v => {
          v.echarts = insertData2Chart(v.priceGraph);
          return v;
        });
      });
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
