<template>
  <div class="index">
    <div class="header">
      <ul>
        <li>艾瑞集团</li>
        <li>艾瑞咨询</li>
        <li>艾瑞数据</li>
        <li>艾瑞资本</li>
        <li>艾瑞网</li>
        <li>艾瑞活动</li>
        <li>English</li>
      </ul>
    </div>
    <div class="index-search"></div>
    <div class="overview-wrap">
      <overview></overview>
    </div>
    <indexTab :tabs="tabs" :activeName="activeName"></indexTab>
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
    return {
      tabs: [
        { label: '行情数据', name: 'hangqing' },
        { label: '交易大厅', name: 'jiaoyi' },
        { label: '排行榜', name: 'rank' }
      ],
      activeName:'rank'
    };
  }
};
</script>

<style lang="less">
@import '~@style/var.less';
.index {
  width: 100%;
  max-width: 1000px;
  margin: auto;
  border: 1px solid @border-color;
  .header {
    height: 30px;
    ul {
      float: right;
      li {
        list-style: none;
        float: left;
        padding: 0 5px;
        border-right: 1px #333 solid;
        cursor: pointer;
      }
      li:nth-last-child(1) {
        border: none;
      }
      li:hover {
        color: @primary-color;
      }
    }
  }
  .index-search {
    height: 100px;
    background-color: aquamarine;
  }
  .overview-wrap {
    padding: 30px 0;
    border-bottom: 1px solid @border-color;
    .overview {
    }
  }
}
</style>

