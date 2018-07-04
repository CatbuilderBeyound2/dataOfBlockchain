<template>
  <div class="searchSelect">
    <el-input placeholder="搜索您要查看的币种/平台关键字..." v-model="searchKey" suffix-icon="el-icon-search"></el-input>
    <div class="button" @click="search"></div>
    <img class="select__icon-cur" :src="icon">
  </div>
</template>

<script>
import bus from '@/utils/bus';
export default {
  name: 'searchSelect',
  data() {
    return {
      id: '',
      icon: '',
      searchKey: '',
    };
  },
  props: {
    channels: {
      type: Array,
      default() {
        return [
          {
            id: '',
            name: '',
          },
        ];
      },
    },
  },
  created() {
    bus.$on('clear-search', () => {
      this.searchKey = '';
    });
    if (this.$route.query.q) {
      this.searchKey = this.$route.query.q;
    }
  },
  mounted() {},
  methods: {
    search() {
      this.$emit('search', this.searchKey);
    },
    querySearch(queryString, cb) {
      let self = this,
        { channels } = self;
      let results = queryString ? channels.filter(self.createFilter(queryString)) : [];
      cb(results);
    },
    createFilter(queryString) {
      return item => {
        return item.name.toLowerCase().includes(queryString.toLowerCase());
      };
    },
    handleSelect(item) {
      this.id = item.id;
      this.$emit('change', this.id);
    },
  },
};
</script>

<style lang="less" scoped>
.searchSelect {
  position: relative;
  .button {
    position: absolute;
    right: 0;
    top: 0;
    height: 40px;
    width: 40px;
  }
}

.select__icon-cur {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  max-height: 33px;
  padding: 5px;
  border-radius: 50%;
  z-index: 1;
}
</style>
