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
      overview: [
        {
          title: '虚拟币',
          count: {
            value: 2000,
            unit: '万',
          },
          trend: '+2%',
          trendStatus: 1,
        },
        {
          title: '代币',
          count: {
            value: 20000,
            unit: '亿',
          },
          trend: '-2%',
          trendStatus: 2,
        },
        {
          title: '交易平台',
          count: {
            value: 200000000000000000,
            unit: '万',
          },
          trend: '+2%',
          trendStatus: 1,
        },
        {
          title: '总市值',
          count: {
            value: 20000,
            unit: '万',
          },
          trend: '-2%',
          trendStatus: 2,
        },
      ],
    };
  },
  methods: {
    fetchData() {
      api.marketSummary({ method: 'get' }).then(res => {
        this.overview = res.tableHeader.reduce((acc, headerObj) => {
          try {
            acc.push({
              ...headerObj,
              value: res.tableData[0][headerObj['column']],
            });
          } catch (err) {}
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
