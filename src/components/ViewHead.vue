<template>

  <div class="ViewHead">
  <div class="wrap">

    <div class="head_nav">

      <ul class="head_list">
        <a href="#"><li><span>{{li01}}</span></li></a>
        <a href="#"><li><span>{{li02}}</span></li></a>
        <a href="#"><li><span>{{li03}}</span></li></a>
        <a href="#"><li><span>{{li04}}</span></li></a>
        <a href="#"><li><span>{{li05}}</span></li></a>
        <a href="#"><li><span>{{li06}}</span></li></a>
        <a href="#"><li><span>{{li07}}</span></li></a>
      </ul>

  </div>

  </div>
  </div>

</template>

<script>
export default {
  name: 'ViewHead',
  data() {
    return {
      li01: '爱瑞集团',
      li02: '爱瑞咨询',
      li03: '爱瑞数据',
      li04: '爱瑞资本',
      li05: '艾瑞网',
      li06: '艾瑞活动',
      li07: 'English'
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.ViewHead {
  width: 100%;
  height: 32px;
  line-height: 32px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
}

.wrap {
  width: 70%;
  margin:0 auto;
}


.ViewHead .head_nav {
  float: right;
}

.ViewHead ul.head_list {
  

 
}
.ViewHead .head_list li {
  float: left;
  color: #777777;
  font-size: 12px;
  margin-right: 10px;
}

.ViewHead .head_list a:last-child  li span {
  border-right: none;

}

.ViewHead .head_list li span {
  border-right: 1px solid #ddd;
  padding-right: 10px;
}


</style>
