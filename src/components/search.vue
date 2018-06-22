<template>
  <div class="searchSelect">
    <el-autocomplete placeholder="搜索您要查看的币种/平台关键字..." v-model="searchKey" @select="handleSelect" :fetch-suggestions="querySearch" value-key="name" suffix-icon="el-icon-search"></el-autocomplete>
    <img class="select__icon-cur" :src="icon">
  </div>
</template>

<script>
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
  created() { },
  methods: {
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
  beforeMount() {
    this.id = this.channels[0] && this.channels[0].id;
    this.searchKey = this.channels[0] && this.channels[0].name;
  },
  watch: {
    id: function(cur) {
      try {
        this.icon = this.channels.find(item => item.id === cur).icon;
      } catch (err) { }
    },
  },
};
</script>

<style lang="less" scoped>
.searchSelect {
  position: relative;
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
