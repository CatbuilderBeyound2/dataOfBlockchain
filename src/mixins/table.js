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
    return {};
  },
  methods: {
    rowClick(...rest) {
      console.log(rest);
    },
    sortChange(...rest) {
      console.log(rest);
    }
  }
};
