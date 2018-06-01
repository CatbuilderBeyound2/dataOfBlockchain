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
    <div class="index-search">
      <img src="http://omqz8y2im.bkt.clouddn.com/business-mix-set-2012.png" class="logo" alt="">
      <search></search>
    </div>
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
import search from '@/components/search';
export default {
  components: {
    overview,
    table1,
    table2,
    indexTab,
    search
  },
  data() {
    return {
      tabs: [
        { label: '行情数据', name: 'hangqing' },
        { label: '交易大厅', name: 'jiaoyi' },
        { label: '排行榜', name: 'rank' }
      ],
      activeName: 'rank1'
    };
  }
};
</script>

<style lang="less">
@import '~@style/var.less';
@import '~@style/mixins.less';
body {
  background-color: @bg-color;
}
.index {
  width: 100%;
  max-width: 1000px;
  margin: auto;
  border: 1px solid @border-color;
  .header {
    height: 32px;
    background-color: @fill-color;
    color: @text-color;
    ul {
      float: right;
      li {
        list-style: none;
        float: left;
        padding: 0 5px;
        border-right: 1px @text-color solid;
        cursor: pointer;
        .text(12,16);
        margin: 8px 0;
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
    height: 80px;
    border-bottom: 1px solid @border-color;
    .logo{
      .size(108,80);
      float: left
    }
    .searchSelect {
      border: 1px solid @border-color;
      width: 360px;
      float: right;
      margin: 20px 0;
      .el-autocomplete {
        width: 100%;
      }
    }
  }
  .overview-wrap {
    padding: 30px 0;
    border-bottom: 1px solid @border-color;
    .overview {
    }
  }
}
</style>

