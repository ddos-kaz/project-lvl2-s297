import fs from 'fs';
import lodash from 'lodash';

const getData = (filePath) => {
  const file = fs.readFileSync(filePath, 'utf-8');
  return file;
};

const parse = (beforeObj, afterObj, keys) => keys.reduce((acc, key) => {
  const resultObj = {
    name: key,
    value: afterObj[key],
    sign: '\t  ',
  };
  if (lodash.has(beforeObj, key) && lodash.has(afterObj, key) && beforeObj[key] !== afterObj[key]) {
    const resultObj2 = lodash.assign({}, resultObj, { value: beforeObj[key], sign: '\t- ' });
    resultObj.sign = '\t+ ';
    return [...acc, resultObj, resultObj2];
  }
  if (lodash.has(beforeObj, key) && !lodash.has(afterObj, key)) {
    resultObj.value = beforeObj[key];
    resultObj.sign = '\t- ';
  } else if (!lodash.has(beforeObj, key) && lodash.has(afterObj, key)) {
    resultObj.sign = '\t+ ';
  }
  return [...acc, resultObj];
}, []);

const render = ast => ast.map(obj => `${obj.sign}${obj.name}: ${obj.value}`).join('\n');

export default (pathToBeforeFile, pathToAfterFile) => {
  const beforeFile = getData(pathToBeforeFile);
  const afterFile = getData(pathToAfterFile);
  const beforeObj = JSON.parse(beforeFile);
  const afterObj = JSON.parse(afterFile);
  const allKeys = lodash.union(Object.keys(beforeObj), Object.keys(afterObj));
  const ast = parse(beforeObj, afterObj, allKeys);
  return `{\n${render(ast)}\n}`;
};
