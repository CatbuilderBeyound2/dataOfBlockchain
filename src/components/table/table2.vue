//
<template>
  <div class="table-2">
    <el-table :data="tableData" stripe header-row-class-name="table-2-header" @row-click="rowClick" @sort-change="sortChange">
      <template v-for="(item ,index) in headerData">
        <el-table-column v-if="item.column==='index'" width="60" :sortable="item.sortable?'custom':false" header-align="center" :label="item.columnName" :key="index" :sort-orders='sortOrders' :prop='item.column'>
          <template slot-scope="scope">
            {{scope.row[item.column]}}
          </template>
        </el-table-column>
        <el-table-column v-if="item.column==='ec_name'" width="120" :sortable="item.sortable?'custom':false" header-align="center" :label="item.columnName" :key="index" :sort-orders='sortOrders' :prop='item.column'>
          <template slot-scope="scope">
            <img class="logo" :src="scope.row.img_url" alt="">
            <div class="name">{{scope.row[item.column]}}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="item.column==='trade_type'" width="200" :sortable="item.sortable?'custom':false" header-align="center" :label="item.columnName" :key="index" :sort-orders='sortOrders' :prop='item.column'>
          <template slot-scope="scope">
            <el-tag v-for="(tagItem,tagIndex) in scope.row.trade_type" :type="tagMap[tagItem].type" :key='tagIndex'>{{tagMap[tagItem].label}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="item.column==='ec_start'" width="150" :sortable="item.sortable?'custom':false" header-align="center" :label="item.columnName" :key="index" :sort-orders='sortOrders' :prop='item.column'>
          <template slot-scope="scope">
            <el-rate allow-half :value="scope.row[item.column]/2" disabled allow-half text-color="#ff9900">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column v-if="item.column!=='ec_start'&&item.column!=='index'&&item.column!=='trade_type'&&item.column!=='turnover'&&item.column!=='ec_pair'&&item.column!=='ec_name'" :sortable="item.sortable?'custom':false" header-align="center" :label="item.columnName" :key="index" :sort-orders='sortOrders' :prop='item.column'>
          <template slot-scope="scope">
            {{scope.row[item.column]}}
          </template>
        </el-table-column>
        <el-table-column v-if="item.column==='ec_pair'" :sortable="item.sortable?'custom':false" header-align="center" :label="item.columnName" :key="index" :sort-orders='sortOrders' :prop='item.column'>
          <template slot-scope="scope">
            {{(scope.row[item.column])==='NaN'?'-':'¥'+(scope.row[item.column])}}
          </template>
        </el-table-column>
        <el-table-column v-if="item.column==='turnover'" :sortable="item.sortable?'custom':false" header-align="center" :label="item.columnName" :key="index" :sort-orders='sortOrders' :prop='item.column'>
          <template slot-scope="scope">
            {{'¥'+(scope.row[item.column])}}
          </template>
        </el-table-column>
      </template>
    </el-table>
    <model v-if='modelShow' :detail='detail' @hide='hideDetail'></model>

  </div>
</template>

<script>
import tableMixin from '@/mixins/table';
import model from '../detail-model';
import api from '@/api';
export default {
  name: 'table2',
  mixins: [tableMixin],
  components: {
    model,
  },
  data() {
    return {
      tagMap: {
        '1': {
          type: 'success',
          label: '现货',
        },
        '2': {
          type: 'info',
          label: '期货',
        },
        '3': {
          type: 'warning',
          label: '法币',
        },
      },
    };
  },
  methods: {
    rowClick(params) {
      this.getDetail(params);
      console.log(params);
    },
    getDetail(params) {
      api
        .detailTrade({
          params: {
            name: params.coin_name,
          },
        })
        .then(res => {
          let { ec_name, price, change } = params;
          this.detail = Object.assign(
            {},
            {
              name: coin_name,
              price,
              change,
              label: '价格',
              type: 2,
            },
            res.tableData[0]
          );
          this.modelShow = true;
        });
    },
  },
};
</script>
<style lang="less">
@import '~@style/var.less';
.table-2 {
  .el-table tr.table-2-header th {
    background-color: @primary-color;
    color: aliceblue;
    padding: 5px 0;
  }
  .el-table__row {
    cursor: pointer;
  }
  .el-tag {
    height: 23px;
    line-height: 23px;
    margin: 0 5px;
  }
  .cell {
    display: flex;
  }
  .logo {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
}
</style>
