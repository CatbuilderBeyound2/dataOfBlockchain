<template>
  <div class="notice-list">
    <div class="title">交易平台交易列表</div>
    <el-table :data="tableData1" style="width: 100%" @row-click='rowClick'>
      <el-table-column width="150">
        <template slot-scope="scope">
          <span class="green">{{scope.row['coin_name']}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title">
      </el-table-column>
      <el-table-column prop="time" width="200">
      </el-table-column>
    </el-table>
    <el-pagination :current-page.sync='pageNo' :page-size='pageSize' :total="total" small background layout="prev, pager, next,total">
    </el-pagination>
  </div>
</template>
<script>
import api from '@/api';
import tableMixin from '@/mixins/table';
export default {
  mixins: [tableMixin],
  data() {
    return {
      tableData1: [],
      pageSize: 15,
      pageNo: 1,
      total: 0,
    };
  },
  created() {
    this.getNotice();
  },
  methods: {
    rowClick(params) {
      window.open(params.origin_url);
    },
    getNotice() {
      api
        .notice({
          params: {
            pageNo: this.pageNo,
            pageSize: this.pageSize,
          },
        })
        .then(res => {
          this.tableData1 = res.tableData;
          this.total = res.tablePage.total;
        });
    },
  },
  watch: {
    pageNo() {
      this.getNotice();
    },
  },
};
</script>
<style lang="less">
@import '~@style/var.less';
@import '~@style/mixins.less';
.notice-list {
  padding-bottom: 50px;
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
    .el-table td {
      border-bottom: 1px dotted #ebeef5;
    }
  }
  .el-pagination {
    text-align: right;
    margin: 20px 0px;
    float: right;
  }
}
</style>

