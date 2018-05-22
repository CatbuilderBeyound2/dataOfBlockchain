<template>
  <div class="overview-item">
    <i class="icon" :style="{backgroundImage:`url(${detail.icon})`}"></i>
    <div class="detail-wrap">
      <div class="detail-title">
        {{detail.title}}
      </div>
      <div class="detail-count">
        <countTo :startVal='0' :endVal='detail.count.value' :duration='3000'></countTo>
        <span class="count-unit">{{detail.count.unit}}</span>
      </div>
      <div class="detail-trend">

      </div>
    </div>
  </div>
</template>
<script>
import countTo from 'vue-count-to';
export default {
  components: { countTo },
  props: {
    detail: {
      type: Object,
      default() {
        return {
          icon: 'http://omqz8y2im.bkt.clouddn.com/business-mix-set-2012.png',
          title: '虚拟币',
          count: {
            value: 2000,
            unit: '万'
          },
          trend: '',
          trendStatus: 1
        };
      }
    }
  }
};
</script>
<style lang="less" scoped>
.overview-item {
  height: 200px;
  > i,
  > div {
    display: inline-block;
    height: 100%;
    vertical-align: middle
  }
  .icon {
    width: 100px;
    background: center no-repeat;
    background-size: contain
  }

}
</style>



