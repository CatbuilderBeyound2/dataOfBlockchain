<template>
<div class="ViewData">
<div class="wrap">
  
  <div class="data_box">

    <div class="data_sectiong">
      
      <div class="sec_left">
        <img src="" alt="">
      </div>
      <div class="sec_right">
        <p>虚拟币</p>
        <p>945.26</p>
        <p>+2.63</p>
      </div>

    </div>

    <div class="data_sectiong">
      
      <div class="sec_left">
        <img src="" alt="">
      </div>
      <div class="sec_right">
        <p>代币</p>
        <p>945.26</p>
        <p>+2.63</p>
      </div>

    </div>

    <div class="data_sectiong">
      
      <div class="sec_left">
        <img src="" alt="">
      </div>
      <div class="sec_right">
        <p>交易平台</p>
        <p>945.26</p>
        <p>+2.63</p>
      </div>

    </div>

    <div class="data_sectiong">
      
      <div class="sec_left">
        <img src="" alt="">
      </div>
      <div class="sec_right">
        <p>总市值</p>
        <p>945.26</p>
        <p>+2.63</p>
      </div>

    </div>

    <div class="data_sectiong">
      
      <div class="sec_left">
        <img src="" alt="">
      </div>
      <div class="sec_right">
        <p>24小时成交量</p>
        <p>945.26</p>
        <p>+2.63</p>
      </div>

    </div>

  </div>



</div>
</div>
</template>

<script>
export default {
  name: 'ViewData',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ViewData {
  width: 100%;
  height: 100px;
  
}
.wrap {
  width: 70%;
  margin: 0 auto;
}
.data_box {
  width: 100%;
  height: 100px;
  border: 1px solid #ddd;
  display: flex;
  display: -webkit-flex;
  align-items:center;
  justify-content:space-around;
}
.data_box .data_sectiong {
  display: flex;
  display: -webkit-flex;
  justify-content:center;
  align-items:center;
}
.data_box .data_sectiong .sec_left {
  width: 25px;
  height: 25px;
  background-color: #ddd;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
