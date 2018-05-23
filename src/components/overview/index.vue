<template>
  <div class="overview">
    <overviewItem v-for="(item,index) in overview" :key="index" :detail="item"></overviewItem>
  </div>
</template>
<script>
import overviewItem from './overview-item';
export default {
  components: {
    overviewItem
  },
  data() {
    return {
      overview:[
        {
          icon: 'http://omqz8y2im.bkt.clouddn.com/business-mix-set-2012.png',
          title: '虚拟币',
          count: {
            value: 2000,
            unit: '万'
          },
          trend: '+2%',
          trendStatus: 1
        },
        {
          icon: 'http://omqz8y2im.bkt.clouddn.com/business-mix-set-2012.png',
          title: '代币',
          count: {
            value: 20000,
            unit: '亿'
          },
          trend: '-2%',
          trendStatus: 2
        },
        {
          icon: 'http://omqz8y2im.bkt.clouddn.com/business-mix-set-2012.png',
          title: '交易平台',
          count: {
            value: 200000000000000000,
            unit: '万'
          },
          trend: '+2%',
          trendStatus: 1
        },
        {
          icon: 'http://omqz8y2im.bkt.clouddn.com/business-mix-set-2012.png',
          title: '总市值',
          count: {
            value: 20000,
            unit: '万'
          },
          trend: '-2%',
          trendStatus: 2
        }
      ]
    };
  }
};
</script>
<style lang="less">
.overview{
  display: flex;
  max-width: 1000px;
  margin: auto;
  >div{
    flex-grow: 1
  }
}
</style>



