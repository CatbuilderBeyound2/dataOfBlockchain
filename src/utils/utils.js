export const deleteInvalidKey = data => {
  return Object.keys(data).reduce((acc, key) => {
    if (data[key] !== "_NULL_") {
      acc[key] = data[key];
    }
    return acc;
  }, {});
};

export const addRowNo = opt => {
  opt.tableHeader.unshift({
    column: "index",
    columnName: "序号"
  });
  opt.tableData.forEach((v, i) => {
    v.index = opt.base + i + 1;
  });
};

export const repeatArr = (arr, count) => {
  let res = arr;
  for (let i = 0; i < count; i++) {
    res = res.concat(arr);
  }
  return res;
};
