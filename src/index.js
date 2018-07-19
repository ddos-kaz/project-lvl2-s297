import fs from 'fs';
import lodash from 'lodash';
import path from 'path';
import generateObj from './adapter-parser';

const parse = (beforeObj, afterObj, keys) => keys.reduce((acc, key) => {
  const resultObj = {
    name: key,
    value: afterObj[key],
    sign: '\t  ',
  };
  if (lodash.has(beforeObj, key) && lodash.has(afterObj, key) && beforeObj[key] !== afterObj[key]) {
    return [...acc, lodash.assign(resultObj, { sign: '\t+ ' }), lodash.assign({}, resultObj, { value: beforeObj[key], sign: '\t- ' })];
  }
  if (lodash.has(beforeObj, key) && !lodash.has(afterObj, key)) {
    return [...acc, lodash.assign({}, resultObj, { value: beforeObj[key], sign: '\t- ' })];
  }
  if (!lodash.has(beforeObj, key) && lodash.has(afterObj, key)) {
    return [...acc, lodash.assign(resultObj, { sign: '\t+ ' })];
  }
  return [...acc, resultObj];
}, []);

const render = ast => ast.map(obj => `${obj.sign}${obj.name}: ${obj.value}`).join('\n');

export default (pathToBeforeFile, pathToAfterFile) => {
  const beforeFile = fs.readFileSync(pathToBeforeFile, 'utf-8');
  const afterFile = fs.readFileSync(pathToAfterFile, 'utf-8');
  const beforeFileExt = path.extname(pathToBeforeFile);
  const afterFileExt = path.extname(pathToAfterFile);
  const beforeObj = generateObj(beforeFileExt, beforeFile);
  const afterObj = generateObj(afterFileExt, afterFile);
  const allKeys = lodash.union(Object.keys(beforeObj), Object.keys(afterObj));
  const ast = parse(beforeObj, afterObj, allKeys);
  return `{\n${render(ast)}\n}`;
};
