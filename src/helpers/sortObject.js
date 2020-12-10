const sortObject = (toSort) => {
  return Object.keys(toSort)
    .sort()
    .reduce((newObj, prop) => {
      newObj[prop] = toSort[prop];
      return newObj;
    }, {});
};

export default sortObject;
