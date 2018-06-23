export const deleteInvalidKey = data => {
  return Object.keys(data).reduce((acc, key) => {
    if (data[key] !== "_NULL_") {
      acc[key] = data[key];
    }
    return acc;
  }, {});
};
