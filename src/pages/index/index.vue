<template>
  <div class="index">
    <div class="header"></div>
    <div class="index-search"></div>
    <div class="overview-wrap"></div>
    <indexTab></indexTab>

    <router-view></router-view>
  </div>
</template>

<script>
import overview from '@/components/overview';
import table1 from '@/components/table/table1';
import table2 from '@/components/table/table2';
import indexTab from './index-tab';
export default {
  components: {
    overview,
    table1,
    table2,
    indexTab
  },
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
                showSymbol :false
              }
            ]
          }
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    };
  }
};
</script>
