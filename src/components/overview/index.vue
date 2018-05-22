<template>
  <div class="overview">
    <overviewItem></overviewItem>
    <overviewItem></overviewItem>
    <overviewItem></overviewItem>
    <overviewItem></overviewItem>
  </div>
</template>
<script>
import overviewItem from './overview-item';
export default {
  components: {
    overviewItem
  },
  data() {
    return {};
  }
};
</script>
<style lang="less">
.overview{
  display: flex;
  max-width: 1000px;
  margin: auto;
  >div{
    flex-grow: 1
  }
}
</style>



