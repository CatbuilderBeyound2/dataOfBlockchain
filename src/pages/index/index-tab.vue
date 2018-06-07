<template>
  <div class="tabs">
    <el-tabs :value="active" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="行情数据" name="hangqing">
        <table1 v-if="'hangqing'===active" :headerData='hangqing.tableHeader' :tableData='hangqing.tableData'></table1>
      </el-tab-pane>
      <el-tab-pane label="交易大厅" name="jiaoyi">
        <table2 v-if="'jiaoyi'===active" :headerData='jiaoyi.tableHeader' :tableData='jiaoyi.tableData'></table2>
      </el-tab-pane>
      <el-tab-pane label="排行榜" name="rank">
        <table1 v-if="'rank'===active" :headerData='rank.tableHeader' :tableData='rank.tableData'></table1>
      </el-tab-pane>
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
      hangqing: {
        tableHeader: [],
        tableData: [],
      },
      jiaoyi: {
        tableHeader: [],
        tableData: [],
      },
      rank: {
        tableHeader: [],
        tableData: [],
      },

      active: this.$props['activeName'],
    };
  },
  watch: {
    activeName(val) {
      this.active = val;
    },
  },
  methods: {
    handleClick(tab, event) {
      this.active = tab.name;
      this.$emit('tab-change', tab);
    },
    getMarketData() {
      api.getMarketData().then(res => {
        this.hangqing.tableHeader = res.tableHeader;
        this.hangqing.tableData = res.tableData.map(v => {
          v.echarts = insertData2Chart(v.priceGraph);
          return v;
        });
      });
    },
    getTrade() {
      api.getTrade().then(res => {
        this.jiaoyi.tableHeader = res.tableHeader;
        this.jiaoyi.tableData = res.tableData;
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
}
</style>
