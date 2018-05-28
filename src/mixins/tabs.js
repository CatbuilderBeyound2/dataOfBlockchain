export default {
  props: {
    tabs: {
      type: Array,
      default() {
        return [{ label: "a" }];
      }
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
