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
    },
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      sortOrders: ["descending", "ascending"],
      modelShow: false,
      detail: {}
    };
  },
  methods: {
    hideDetail() {
      this.modelShow = false;
    },
    sortChange(params) {
      console.log(params);
      this.$emit("sort-change", params);
    }
  }
};
