<template>
  <div class="overview">
    <overviewItem v-for="(item,index) in overview" :key="index" :detail="item"></overviewItem>
  </div>
</template>
<script>
import overviewItem from './overview-item';
import api from '@/api';
export default {
  name: 'overview',
  components: {
    overviewItem,
  },
  created() {
    this.fetchData();
  },
  data() {
    return {
      overview: [],
    };
  },
  methods: {
    fetchData() {
      api.marketSummary({ method: 'get' }).then(res => {
        let temp = [
          {
            name: '虚拟币',
            key: 'currencies',
          },
          {
            name: '代币',
            key: 'assets',
          },
          {
            name: '交易平台',
            key: 'exchange',
          },
          {
            name: '总市值(亿)',
            key: 'total_cap',
            dec: 2, //精确位数
          },
          {
            name: '24小时成交量(亿)',
            key: 'total_vol',
            dec: 2,
          },
        ];
        this.overview = temp.reduce((acc, { name, key, dec }) => {
          acc.push({
            name,
            value: parseFloat(res.tableData[0][key].match(/([0-9]|\.)/gi, '').join('')),
            dec,
          });
          return acc;
        }, []);
      });
    },
  },
};
</script>
<style lang="less">
.overview {
  display: flex;
  max-width: 1000px;
  margin: auto;
  > div {
    flex-grow: 1;
  }
}
</style>
