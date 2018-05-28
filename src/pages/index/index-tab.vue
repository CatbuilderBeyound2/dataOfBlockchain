<template>
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane v-for="(item,index) in tabs" :label="item.label" :key="index" :name="item.name">
      <table1></table1>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import table1 from '@/components/table/table1';
import tabs from '@/mixins/tabs';
export default {
  name:'indexTab',
  components:{
    table1
  },
  mixins:[tabs],
  data() {
    return {
      activeName2: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
