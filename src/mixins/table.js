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
      sortOrders: ["descending", "ascending"]
    };
  },
  methods: {
    rowClick(params) {
      console.log(params);
    },
    sortChange(params) {
      console.log(params);
      this.$emit("sort-change", params);
    }
  }
};
