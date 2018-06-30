<template>
  <div class="index">
    <div style="background:#f8f8f8">
      <div class="header">
        <div class="headerBox">
          <a href="http://group.iresearch.com.cn/" target="_blank">艾瑞集团</a>|
          <a target="_blank" href="http://www.iresearch.com.cn/">艾瑞咨询</a>|
          <a href="http://data.iresearch.com.cn/" target="_blank">艾瑞数据</a>|
          <a href="http://capital.iresearch.com.cn/" target="_blank">艾瑞资本</a>|
          <a href="http://www.iresearch.cn/" target="_blank">艾瑞网</a>|
          <a href="http://events.iresearch.cn/" target="_blank">艾瑞活动</a>|
          <a href="http://www.iresearchchina.com/" target="_blank">English</a>
        </div>

      </div>
    </div>
    <div class="index-search">
      <img src="../../assets/logo.png" class="logo" alt="">
      <search @search='search' v-if='!hideSearch'></search>
    </div>
    <div class="overview-wrap">
      <overview></overview>
      <noticeWindow></noticeWindow>
    </div>
    <indexTab :activeName="activeName" @tab-change='tabChange'></indexTab>
    <router-view class="router" v-if="!hideRouterView"></router-view>
  </div>
</template>

<script>
import overview from '@/components/overview';
import indexTab from './index-tab';
import search from '@/components/search';
import noticeWindow from '../notice/noticeWindow';
import bus from '@/utils/bus';
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
      hideSearch: false,
    };
  },
  methods: {
    tabChange(tab) {
      this.$router.push('/');
      this.activeName = tab.name;
      this.hideSearch = false;
      bus.$emit('clear-search')
    },
    search(key) {
      this.$router.push({
        path: '/search',
        query: {
          q: key,
        },
      });
      this.hideSearch = true;
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
    // max-width: 1000px;
    margin: 0 auto;
    line-height: 30px;
    text-align: right;
    color: #777;
    background-color: #f8f8f8;
    .headerBox {
      // max-width: 1000px;
      padding-left: 15px;
      padding-right: 15px;
      margin-left: auto;
      margin-right: auto;
      -webkit-box-sizing: border-box;
      -ms-box-sizing: border-box;
      box-sizing: border-box;
      a {
        list-style: none;
        color: rgb(119, 119, 119);
        padding: 0 5px;
        cursor: pointer;
        .text(14, 16);
        margin: 8px 0;
      }
      a:nth-last-child(1) {
        border: none;
      }
      a:hover {
        color: @primary-color;
      }
    }
  }
  .index-search {
    height: 80px; // max-width: 1000px;
    margin: 0 20px; // border-top: 1px solid @border-color;
    border-bottom: none;
    .logo {
      .size(100, 48);
      float: left;
      margin: 15px 0 0 15px;
    }
    .searchSelect {
      border: 1px solid @border-color;
      width: 300px;
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
    margin: 0 20px;
    border: 1px solid @border-color;
    position: relative;
    margin-bottom: 20px;
    .overview {
    }
    .notice-window {
      position: absolute;
      right: -320px;
      top: 320px;
      width: 300px;
    }
  }

  .router {
    margin-top: 30px; // border: 1px solid @border-color;
    border-bottom: none; // .box-shadow;
    max-width: 1000px;
    margin: 0 20px;
    margin-bottom: 30px;
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

