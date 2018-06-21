export const flattenObject = (ob) => {
  const toReturn = {};

  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if ((typeof ob[i]) === 'object') {
      const flatObject = flattenObject(ob[i]);
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[`${i}_${x}`] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

export const renameKeys = (obj, pattern, replaceble) => {
  const out = {};
  Object.keys(obj).forEach((key) => {
    out[key.replace(pattern, replaceble).toLowerCase()] = obj[key];
  });
  return out;
};