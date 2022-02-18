function deepMerge(obj1, obj2) {
  const mergedObj = Array.isArray(obj1) ? [...obj1] : { ...obj1 };
  getOwnPropertyKeysOnly(obj2).forEach(key => {
    if (
      getOwnPropertyKeysOnly(obj2[key]).length > 0 &&
      getOwnPropertyKeysOnly(obj1[key]).length > 0
    ) {
      mergedObj[key] = deepMerge(obj1[key], obj2[key]);
    } else {
      mergedObj[key] = obj2[key];
    }
  });
  return mergedObj;
}

function getOwnPropertyKeysOnly(obj) {
  const keys = [];
  if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach(name => {
      if (obj.hasOwnProperty(name)) {
        keys.push(name);
      }
    });
  }
  return keys;
}

export { deepMerge };
