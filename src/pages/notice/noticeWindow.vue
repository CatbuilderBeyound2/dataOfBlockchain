<template>
  <div class="notice-window">
    <div class="collapse" :class="{isShow:!isShow}">
      <ul class="collapse-content">
        <div class="collapse-title" @click="goto">各大交易所最新公告</div>
        <li>最新公告最新公告</li>
        <li>最新公告最新公告</li>
        <li>最新公告最新公告</li>
        <li>最新公告最新公告</li>
        <li>最新公告最新公告</li>
        <li>最新公告最新公告</li>
      </ul>
      <div class="collapse-split">
        <img src="../../assets/iconfont_down.png" alt="">
      </div>
      <div class="collapse-button" @click="toggle">
        <i class="el-icon-document"></i>最新公告
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'noticeWindow',
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow;
    },
    goto() {
      this.$router.push('/notice');
      this.toggle();
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@style/var.less';
@import '~@style/mixins.less';
.collapse {
  position: relative;
  .collapse-content {
    list-style: none;
    .middle;
    top: -92px;
    width: 100%;
    border: 1px solid @border-color;
    border-bottom: none;
    transition: all 1s;
    overflow: hidden;
    height: 194px;
    border-radius: 5px;
    li {
      margin-top: 10px;
      cursor: pointer;
      &:nth-last-child(1) {
        padding-bottom: 20px;
      }
      &:hover {
        color: @primary-color;
      }
    }
    .collapse-title {
      border-bottom: 1px solid @border-color;
      padding: 5px 0;
      position: relative;
      .text(12,14);
      box-sizing: content-box;
      cursor: pointer;
      font-weight: 600;
      &:hover {
        color: @primary-color;
      }
      &::after {
        content: '';
        .size(10,10);
        .posr(6,6);
        transform: rotateZ(90deg);
        .bgi('/static/icon/iconfont_down.png');
      }
    }
  }
  .collapse-button {
    padding: 10px 40px;
    box-sizing: content-box;
    border: 1px solid @border-color;
    cursor: pointer;
    border-radius: 5px;
    font-weight: 700;
  }
  .el-icon-document{
    color:#69c72b;
    padding-right: 5px;
  }
  .collapse-split {
    width: 100%;
    height: 10px;
    background-color: @fill-color;
    border-radius: 5px;
    img {
      width: 8px;
      padding-top: 2px;
      transition: all 1s;
      transform: rotateZ(180deg);
    }
  }
  &.isShow {
    img {
      transform: rotateZ(0deg);
      padding-bottom: 2px;
    }
    .collapse-content {
      height: 0;
      top: 0;
      opacity: 0;
    }
  }
}
</style>

