<template>
    <div class="model">
        <el-container>
            <el-header>
                <div class="title">BTC</div>
                <div class="rank">排名： 第一名
                </div>
                <div class="rate" v-if='show'>
                    <span>等级：</span>
                    <el-rate :value="2"></el-rate>
                </div>
                <div class="type" v-if='show'>类型：
                    <el-tag>bddd</el-tag>
                </div>

            </el-header>
            <el-container>
                <el-aside width="200px">
                    <div class="name">24小时平台成交额</div>
                </el-aside>
                <el-container>
                    <el-main>Main</el-main>
                    <el-footer>Footer</el-footer>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
        <el-container>
            <el-main>
                asdasdasd
            </el-main>
        </el-container>
    </div>
</template>
<script>

export default {
  data() {
    return {
      show: true,
    };
  },
};
</script>


<style lang="less">
@import '~@style/var.less';
@import '~@style/mixins.less';
.model {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 111;
  width: 80%;
  height: 80%;
  text-align: left;
  .el-header {
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
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
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

