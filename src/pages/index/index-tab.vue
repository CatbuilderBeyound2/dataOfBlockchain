<template>
  <div class="tabs">
    <el-tabs :value="active" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="行情数据" name="hangqing">
        <table1 v-if="'hangqing'===active" :headerData='header' :tableData='tableData'></table1>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import table1 from '@/components/table/table1';
import tabs from '@/mixins/tabs';
import api from '@/api';
export default {
  name: 'indexTab',
  components: {
    table1,
  },
  mixins: [tabs],
  created() {
    this.getMarketData();
  },
  data() {
    let data = [];
    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI;
      let r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i]);
    }

    return {
      header: [],
      tableData: [],
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
        // echarts: {
        //     xAxis: {
        //       type: 'category',
        //       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        //       show: false
        //     },
        //     yAxis: {
        //       type: 'value',
        //       show: false,
        //       scale: true
        //     },
        //     grid: {
        //       y: 1,
        //       height: '100%'
        //     },
        //     series: [
        //       {
        //         data: [1, 2, 3, 4, 3, 5, 7],
        //         type: 'line',
        //         showAllSymbol: true,
        //         showSymbol: false
        //       }
        //     ]
        //   }
        this.header = res.tableHeader;
        this.tableData = res.tableData.map(v => {
          v.echarts = {
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
                data: v.priceGraph,
                type: 'line',
                showAllSymbol: true,
                showSymbol: false,
              },
            ],
          };
          return v;
        });
        console.log(this.tableData);
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
