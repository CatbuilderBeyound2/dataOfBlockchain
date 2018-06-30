export default {
  props: {
    headerData: {
      type: Array,
      default() {
        return [];
      }
    },
    tableData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      sortOrders: ["descending", "ascending"],
      modelShow: false
    };
  },
  methods: {
    rowClick(params) {
      this.modelShow = true;
      console.log(params);
    },
    sortChange(params) {
      console.log(params);
      this.$emit("sort-change", params);
    }
  }
};
