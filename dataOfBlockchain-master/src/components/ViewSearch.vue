<template>
  
  <div class="ViewSearch">
  <div class="wrap">
    
    <div class="sea_box">

      <div class="sea_left">
        <div class="img"><img src="" alt=""></div>
        <p>爱瑞数据</p>
      </div>

      <div class="sea_right">
        <div class="ri_box">
          
          <input type="text" placeholder="搜索您要查找的币种/平台关键字......">
          <img src="" alt="">

        </div>
      </div>

    </div>

  </div>
  </div>
</template>

<script>
export default {
  name: 'ViewSearch',
  data() {
    return {
      
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.ViewSearch {
  width: 100%;
  height: 90px;
  
}
.wrap {
  width: 70%;
  margin: 0 auto;
}

.sea_box {
  width: 100%;
  height: 90px;
  display: flex;
  display: -webkit-flex;
  justify-content:space-between;
  align-items:center;
}
.sea_left {
  
}
.sea_left .img {
  width: 110px;
  height: 36px;
  background-color: #ddd;
}

.sea_right .ri_box {
  width: 360px;
  height: 36px;
  border:1px solid #ddd;
  border-radius: 5px;
  display: flex;
  display: -webkit-flex;
  align-items:center;
  padding-left: 20px;
}

.sea_right .ri_box input {
  width: 80%;
  border: none;
  outline: none;
}


</style>
