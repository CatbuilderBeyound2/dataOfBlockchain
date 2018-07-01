<template>
  <div class="pop-bg" @click="hide">
    <div class="model">
      <el-container>
        <el-header>
          <div class="title">{{detail.name}}</div>
          <!-- <div class="rank">排名： 第一名
        </div>
        <div class="rate" v-if='show'>
          <span>等级：</span>
          <el-rate :value="2"></el-rate>
        </div>
        <div class="type" v-if='show'>类型：
          <el-tag>bddd</el-tag>
        </div> -->
        </el-header>
        <el-container>
          <el-aside width="300px">
            <div class="name">{{detail.label}}</div>
            <div class="price">{{detail.price}}
              <span class="change">{{detail.change}}</span>
            </div>
            <div class="sub-price" v-if='detail.subPrice'>{{detail.subPrice}}</div>
            <div class="sur-price" v-if='detail.high'>
              <el-tag>24小时最高{{detail.high}}</el-tag>
              <el-tag>24小时最低{{detail.low}}</el-tag>
            </div>
          </el-aside>
          <template v-if='detail.type===1'>
            <el-container>
              <el-main>{{detail.coin_description&&detail.coin_description.join('')}}</el-main>
              <el-footer>
                <span>
                  <span class='pre-label'>英文名：</span>{{detail.en_coin_name}}</span>
                <span>
                  <span class='pre-label'>中文名：</span>{{detail.ch_coin_name}}</span>
                <span>
                  <span class='pre-label'>网址：</span>
                  <a :href="item" v-for="item in detail.website">{{item}}</a>
                </span>
              </el-footer>
              <el-footer>
                <span>
                  <span class='pre-label'>上架交易所：</span>{{detail.coin_exchange_num}}</span>
                <span>
                  <span class='pre-label'>发行时间：</span>{{detail.issue_date}}</span>
                <span>
                  <span class='pre-label'>白皮书：</span>
                  <a :href="detail.white_paper">{{detail.white_paper}}/</a>
                </span>
              </el-footer>
            </el-container>
          </template>
          <template v-if='detail.type===2'>
            <el-container>
              <el-main>{{detail.coin_description}}</el-main>
              <el-footer>
                <span>
                  <span class='pre-label'>平台名：</span>{{detail.ec_name}}</span>
                <span>
                  <span class='pre-label'>国家：</span>{{detail.country}}</span>
                </span>
                <span>
                  <span class='pre-label'>网址：</span>
                  <a :href="detail.web_site">{{detail.web_site}}</a>
                </span>
              </el-footer>
              <el-footer>
                <span>
                  <span class='pre-label'>上架交易所：</span>{{detail.web_site}}</span>
              </el-footer>
            </el-container>
          </template>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    detail: {
      type: Object,
    },
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    hide() {
      this.$emit('hide');
    },
  },
};
</script>


<style lang="less">
@import '~@style/var.less';
@import '~@style/mixins.less';
.pop-bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 111;
}
.model {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 111;
  width: 80%;
  text-align: left;
  background-color: #fff;

  .box-shadow .el-header {
    > div {
      display: inline-block;
      > .el-rate {
        display: inline-block;
      }
    }
  }
  .type,
  .rate,
  .rank {
    float: right;
    margin-left: 20px;
  }
  .rate {
    span {
      vertical-align: bottom;
    }
  }
  .title {
    background-color: @fill-color;
    padding-left: 40px;
  }
  .price {
    color: @primary-color;
    margin-top: 5px;
    font-size: 20px;
    .change {
      font-size: 14px;
      margin-left: 10px;
    }
  }
  .name {
    margin-top: 100px;
    font-size: 12px;
  }
  .sub-price {
    margin-top: 5px;
  }
  .sur-price {
    margin-top: 15px;
  }
  .el-tag {
    height: 22px;
    line-height: 20px;
    color: @text-color;
    background-color: @fill-color;
  }
  .el-footer {
    border: solid @border-color 1px;
    display: flex;
    span {
      flex-grow: 1;
      display: inline-block;
      width: 100px;
      .pre-label {
        color: #b5b4b4;
      }
      a {
        margin-left: 10px;
      }
    }
    span:nth-child(3) {
      flex-grow: 2;
    }
    > span {
      border-right: solid @border-color 1px;
      padding: 0 20px;
    }
    > span:nth-child(3) {
      border: none;
    }
  }
  .el-footer:nth-child(2) {
    border-bottom: none;
  }
  .el-header {
    border: solid @border-color 1px;
  }
  .el-header,
  .el-footer {
    color: #333;
    line-height: 60px;
    padding: 0;
  }

  .el-aside {
    color: #333;
    text-align: center;
    padding-left: 40px;
    text-align: left;
    border-left: solid @border-color 1px;
    border-bottom: solid @border-color 1px;
  }

  .el-main {
    color: #333;
    text-align: left;
    width: 100%;
    min-height: 150px;
    line-height: 1.5;
    text-indent: 30px;
    border-left: solid @border-color 1px;
    border-right: solid @border-color 1px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
</style>

