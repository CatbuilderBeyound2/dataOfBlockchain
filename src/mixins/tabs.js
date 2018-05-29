export default {
  props: {
    tabs: {
      type: Array,
      default() {
        return [{ label: "a" }];
      }
    },
    activeName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    tabClick(...rest) {
      console.log(rest);
    }
  }
};
