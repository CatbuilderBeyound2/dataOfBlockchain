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
        this.overview = res.tableData;
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
