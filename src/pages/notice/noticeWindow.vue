<template>
  <div class="notice-window">
    <div class="collapse">
      <ul class="collapse-content">
        <div class="collapse-title" @click="goto">各大交易所最新公告</div>
        <vue-swimlane :words="wordsArray" :circular="false" :rows="8" :scale=".4" :transitionDuration='1000' :transitionDelay='.1' :pauseOnHover="true" @item-click='jump'></vue-swimlane>
      </ul>
    </div>
  </div>
</template>
<script>
import vueSwimlane from '@/components/text-scroll';
import api from '@/api';
import { repeatArr } from '@/utils/utils';
export default {
  name: 'noticeWindow',
  components: {
    vueSwimlane,
  },
  data() {
    return {
      isShow: false,
      wordsArray: [],
    };
  },
  created() {
    api
      .notice({
        params: {
          pageNo: 1,
          pageSize: 15,
        },
      })
      .then(res => {
        this.wordsArray = repeatArr(
          res.tableData.map(v => {
            v.title = `<span style='display:inline-block;padding-left:10px;width:200px;text-align:left;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;vertical-align: bottom;'>${
              v.title
            }</span><span style='color:#999999'>${v.time.substring(5,16)}</span>`;

            return v;
          }),
          20
        );
        console.log(res.tableData)
      });
  },
  methods: {
    goto() {
      this.$router.push('/notice');
    },
    jump(word) {
      window.open(word.origin_url);
    },
  },
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
    top: -97px;
    width: 100%;
    border: 1px solid @border-color;
    transition: all 1s;
    overflow: hidden;
    height: 210px;
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
      padding: 5px 0;
      position: relative;
      .text(16,25);
      box-sizing: content-box;
      cursor: pointer;
      font-weight: 600;
      &:hover {
        color: @primary-color;
      }
      &::after {
        content: '';
        .size(16,20);
        .posr(6,6);
        transform: rotateZ(90deg);
        .bgi('../assets/iconfont_down.png');
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
  .el-icon-document {
    color: #69c72b;
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

