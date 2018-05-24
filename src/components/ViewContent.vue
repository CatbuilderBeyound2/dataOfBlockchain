<template>

<div class="ViewContent">
<div class="wrap">
  
  <el-tabs v-mode="activeName" @tab-click="handleClick">
    
    <el-tabs-pane label="行情数据" name="first">行情数据</el-tabs-pane>
    <el-tabs-pane label="交易大厅" name="second">交易大厅</el-tabs-pane>
    <el-tabs-pane label="排行榜" name="third">排行榜</el-tabs-pane>

  </el-tabs>

</div>
</div>

</template>

<script>
export default {
  name: 'ViewContent',
  data() {
    return {
      activeName:'second'
    };
  },
  methods: {
    handleClick(tab,ecent) {
      console.log(tab,evevt);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.ViewContent {
  width: 100%;

}


</style>
