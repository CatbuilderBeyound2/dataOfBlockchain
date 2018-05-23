<template>
  <div class="index">
    <!-- <overview></overview> -->
    <table1 :headerData="header" :tableData="tableData"></table1>
  </div>
</template>

<script>
import overview from '@/components/overview';
import table1 from '@/components/table/table1';
export default {
  components: {
    overview,
    table1
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
              type: 'value',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
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
