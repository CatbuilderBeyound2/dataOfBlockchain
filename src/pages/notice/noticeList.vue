<template>
  <div class="notice-list">
    <div class="title">交易平台交易列表</div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="pla" width="100">
      </el-table-column>
      <el-table-column prop="name">
      </el-table-column>
      <el-table-column prop="date" width="200">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          pla: '火币'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          pla: '火币'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          pla: '火币'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          pla: '火币'
        }
      ]
    };
  }
};
</script>






<style lang="less">
@import '~@style/var.less';
@import '~@style/mixins.less';
.notice-list {
  .title {
    text-align: left;
    padding: 15px 20px;
    border-bottom: 1px solid @border-color;
    font-weight: 600;
    font-size: 16px;
    margin: 0 15px;
  }
  .el-table__header-wrapper {
    display: none;
  }
  .el-table {
    position: relative;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    max-width: 100%;
    font-size: 14px;
    color: #606266;
    padding-left: 15px;
    padding-right: 15px;
    .el-table td{
      border-bottom: 1px dotted #ebeef5;
    }
  }
}
</style>

