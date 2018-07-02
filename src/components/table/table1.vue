

// 有图表预览的table


<template>
  <div class="table-1">
    <el-table :data="tableData" stripe header-row-class-name="table-1-header" @row-click="rowClick" @sort-change="sortChange">
      <el-table-column v-for="(item ,index) in headerData" :min-width="item.column==='coin_name'?150:0" :sortable="item.sortable?'custom':false" header-align="center" align="center" :prop="item.column" :label="item.columnName" :key="index" :sort-orders='sortOrders'>
        <template slot-scope="scope">
          <chart v-if="item.column==='trend'" :options="scope.row.echarts"></chart>
          <template v-else-if="item.column==='change'">
            <div :class="parseInt(scope.row[item.column])<0?'red':'green'">{{scope.row[item.column]}}</div>
          </template>
          <template v-else-if="item.column==='coin_name'">
            <img class="logo" :src="scope.row.img_url" alt="">
            <div class="name">{{scope.row[item.column]}}</div>
          </template>
          <template v-else>
            {{scope.row[item.column]}}
          </template>
        </template>
      </el-table-column>
    </el-table>
    <model v-if='modelShow' :detail='detail' @hide='hideDetail'></model>
  </div>
</template>

<script>
import tableMixin from '@/mixins/table';
import model from '../detail-model';
import api from '@/api';
export default {
  name: 'table1',
  mixins: [tableMixin],
  components: {
    model,
  },
  created() {},
  methods: {
    rowClick(params) {
      this.getDetail(params);
    },
    getDetail(params) {
      api
        .detailMarket({
          params: {
            name: params.coin_name,
          },
        })
        .then(res => {
          let { coin_name, price, change } = params;
          this.detail = Object.assign(
            {},
            {
              name: coin_name,
              price,
              change,
              label: '价格',
              type: 1,
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
.table-1 {
  .el-table tr.table-1-header th {
    background-color: @primary-color;
    color: aliceblue;
    padding: 5px 0;
  }
  .el-table__row {
    cursor: pointer;
  }
  .echarts {
    height: 23px;
    width: 100px;
    margin: auto;
    div canvas {
      left: -18px !important;
    }
  }
  .red {
    color: #e40202;
  }
  .green {
    color: #3ba316;
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
