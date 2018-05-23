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
    return {
      header: [
        {
          key: 'date',
          label: '日期',
          sortable:1
        },
        {
          key: 'name',
          label: '姓名',
          sortable:1
        },
        {
          key: 'address',
          label: '地址',
          sortable:0
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
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
