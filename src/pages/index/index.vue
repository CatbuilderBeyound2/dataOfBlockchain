<template>
  <div class="index">
    <div style="background:#f8f8f8">
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
    </div>
    <div class="index-search">
      <img src="/static/icon/logo.png" class="logo" alt="">
      <search></search>
    </div>
    <div class="overview-wrap">
      <overview></overview>
      <noticeWindow></noticeWindow>
    </div>
    <indexTab :activeName="activeName" @tab-change='tabChange'></indexTab>
    <router-view class="router" v-if="!hideRouterView"></router-view>
    <div class="footer">
      <div class="contact">联系我们&nbsp;&nbsp;&nbsp;&nbsp;Contact Us</div>
      <div class="phone-num">400-026-2099</div>
      <div class="email">ask@ireseach.com.cn</div>
      <div class="copy-right">2002-2018 Copyright© 艾瑞数据</div>
      <div class="copy-num">啊实打实大苏打</div>
    </div>
  </div>
</template>

<script>
import overview from '@/components/overview';
import indexTab from './index-tab';
import search from '@/components/search';
import noticeWindow from '../notice/noticeWindow';
export default {
  components: {
    overview,
    indexTab,
    search,
    noticeWindow,
  },
  created() {
    this.hideRouterView = typeof this.$route.meta.hideRouterView === 'undefined' ? false : true;
    if (!this.hideRouterView) {
      this.activeName = 'none';
    }
  },
  data() {
    return {
      activeName: 'quotation',
      hideRouterView: true,
    };
  },
  methods: {
    tabChange(tab) {
      this.$router.push('/');
      this.activeName = tab.name;
    },
  },
  watch: {
    $route(val) {
      this.hideRouterView = typeof val.meta.hideRouterView === 'undefined' ? false : true;
    },
    hideRouterView(val) {
      if (!val) {
        this.activeName = 'none'; //收回tab
      }
    },
  },
};
</script>

<style lang="less">
@import '~@style/var.less';
@import '~@style/mixins.less';
body {
  background-color: @bg-color;
  #app {
    position: relative;
  }
}

.index {
  width: 100%;
  margin: auto; // border: 1px solid @border-color;
  position: relative;
  .header {
    height: 32px;
    max-width: 1000px;
    margin: 0 auto;
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
        .text(12, 16);
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
    max-width: 1000px;
    margin: 0 auto; // border-top: 1px solid @border-color;
    border-bottom: none;
    .logo {
      .size(100, 48);
      float: left;
      margin: 15px 0 0 15px;
    }
    .searchSelect {
      border: 1px solid @border-color;
      width: 360px;
      float: right;
      margin: 20px 0;
      border-radius: 4px;
      .el-autocomplete {
        width: 100%;
      }
    }
  }
  .overview-wrap {
    padding: 30px 0;
    max-width: 1000px;
    margin: 0 auto;
    border: 1px solid @border-color;
    position: relative;
    margin-bottom: 20px;
    .overview {}
    .notice-window {
      .pos(-175, 350);
    }
  }

  .router {
    margin-top: 30px;
    border: 1px solid @border-color;
    border-bottom: none;
    .box-shadow
  }
  .footer {
    position: absolute;
    left: 0;
    bottom: -170px;
    background-color: #39434d;
    height: 170px;
    width: 99vw;
    color: @text-color;
    text-align: center;
    overflow: hidden;
    .contact {
      color: @primary-color;
      font-size: 16px;
      position: relative;
      width: 200px;
      margin: 45px auto 0 auto;
      &::before {
        content: '';
        display: inline-block;
        width: 100px;
        height: 1px;
        background-color: @primary-color;
        .pos(-100, 7);
      }
      &::after {
        content: '';
        display: inline-block;
        width: 100px;
        height: 1px;
        background-color: @primary-color;
        .posr(-100, 7);
      }
    }
  }
}
</style>

