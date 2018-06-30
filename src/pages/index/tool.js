export const insertData2Chart = data => {
  return {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      show: false
    },
    yAxis: {
      type: "value",
      show: false,
      scale: true
    },
    grid: {
      y: 1,
      height: "100%"
    },
    series: [
      {
        data: data,
        type: "line",
        showAllSymbol: true,
        showSymbol: false,
        itemStyle: {
          normal: {
            lineStyle: {
              color: "#69c72b"
            }
          }
        }
      }
    ]
  };
};

export const subTabsMap = {
  rank: [
    { label: "涨幅排行榜", name: "zhuangfu" },
    { label: "跌幅排行榜", name: "diefu" },
    { label: "24H成交额排行", name: "24H" },
    { label: "市值排行", name: "shizhi" }
  ],
  transaction: [
    { label: "所有", name: "all" },
    { label: "现货", name: "xianhuo" },
    { label: "期货", name: "qihuo" },
    { label: "法币", name: "fabi" }
  ]
};
