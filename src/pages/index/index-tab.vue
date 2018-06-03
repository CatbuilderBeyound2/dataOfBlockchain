<template>
  <div class="tabs">
    <el-tabs :value="active" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in tabs" :label="item.label" :key="index" :name="item.name">
        <table1 v-if="item.name===active" :headerData='header' :tableData='tableData'></table1>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import table1 from '@/components/table/table1';
import tabs from '@/mixins/tabs';
export default {
  name: 'indexTab',
  components: {
    table1
  },
  mixins: [tabs],
  data() {
    let data = [];
    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI;
      let r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i]);
    }

    return {
      header: [
        {
          key: 'date',
          label: '日期',
          sortable: 1
        },
        {
          key: 'name',
          label: '姓名',
          sortable: 1
        },
        {
          key: 'address',
          label: '地址',
          sortable: 0
        },
        {
          key: 'echarts',
          label: '图表'
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          echarts: {
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              show: false
            },
            yAxis: {
              type: 'value',
              show: false,
              scale: true
            },
            grid: {
              y: 1,
              height: '100%'
            },
            series: [
              {
                data: [1, 2, 3, 4, 3, 5, 7],
                type: 'line',
                showAllSymbol: true,
                showSymbol: false
              }
            ]
          }
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          echarts: {
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              show: false
            },
            yAxis: {
              type: 'value',
              show: false,
              scale: true
            },
            grid: {
              y: 1,
              height: '100%'
            },
            series: [
              {
                data: [1, 8, 3, 4, 3, 5, 7],
                type: 'line',
                showAllSymbol: true,
                showSymbol: false
              }
            ]
          }
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          echarts: {
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              show: false
            },
            yAxis: {
              type: 'value',
              show: false,
              scale: true
            },
            grid: {
              y: 1,
              height: '100%'
            },
            series: [
              {
                data: [1, 2, 3, 9, 3, 5, 7],
                type: 'line',
                showAllSymbol: true,
                showSymbol: false
              }
            ]
          }
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          echarts: {
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              show: false
            },
            yAxis: {
              type: 'value',
              show: false,
              scale: true
            },
            grid: {
              y: 1,
              height: '100%'
            },
            series: [
              {
                data: [5, 2, 3, 4, 3, 5, 7],
                type: 'line',
                showAllSymbol: true,
                showSymbol: false
              }
            ]
          }
        }
      ],
      active: this.$props['activeName']
    };
  },
  watch: {
    activeName(val) {
      this.active = val;
    }
  },
  methods: {
    handleClick(tab, event) {
      this.active = tab.name;
      this.$emit('tab-change', tab);
    }
  }
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
