<template>
  <div class="overview-item">
    <!-- <i class="icon-main" :style="{backgroundImage:`url(${detail.icon})`}"></i> -->
    <div class="detail-wrap">
      <div>
        <div class="detail-title">
          {{detail.name}}
        </div>
        <div class="detail-count">
          <countTo :startVal='0' :endVal='detail.value' :duration='3000'></countTo>
          <!-- <span class="count-unit">{{detail.count.unit}}</span> -->
        </div>
        <!-- <div :class="`detail-trend ${detail.trendStatus===1?'up':'down'}`">
          <span>{{detail.trend}}</span>
          <i class="icon-trend">{{detail.trendStatus===1?'↑':'↓'}}</i>
        </div> -->
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
          // icon: 'http://omqz8y2im.bkt.clouddn.com/business-mix-set-2012.png',
          name: '虚拟币',
          value: 2000,
        };
      },
    },
  },
};
</script>
<style lang="less" scoped>
.overview-item {
  height: 60px;
  > i,
  > div {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
  .icon-main {
    width: 40px;
    background: center no-repeat;
    background-size: contain;
  }
  .detail-wrap > div {
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .detail-count {
      font-size: 30px;
      font-weight: 600;
      .count-unit {
        font-size: 16px;
        font-weight: 300;
      }
    }
    .detail-trend {
    }
    .up {
      color: #69c72b;
    }
    .down {
      color: crimson;
    }
    > div {
      flex-grow: 1;
      display: flex;
      align-items: center;
    }
  }
}
</style>



