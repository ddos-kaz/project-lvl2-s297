import fs from 'fs';
import lodash from 'lodash';
import path from 'path';
import generateObj from './adapter-parser';
import renderAST from './renderers';

const generateAST = (key, beforeValue, afterValue) => {
  const resultObj = {
    name: key,
    type: '',
    valueBefore: beforeValue,
    valueAfter: afterValue,
    children: null,
  };

  if (lodash.isObject(beforeValue) && lodash.isObject(afterValue)) {
    const valueKeys = lodash.union(Object.keys(beforeValue), Object.keys(afterValue));
    return {
      name: key,
      type: 'object',
      valueBefore: null,
      valueAfter: null,
      children: valueKeys.map(item => generateAST(item, beforeValue[item], afterValue[item])),
    };
  }

  if (beforeValue === undefined) {
    return { ...resultObj, type: 'added' };
  }

  if (afterValue === undefined) {
    return { ...resultObj, type: 'removed' };
  }

  if (beforeValue === afterValue) {
    return { ...resultObj, type: 'similar' };
  }

  return { ...resultObj, type: 'modified' };
};

const buildAST = (beforeObj, afterObj) => {
  const allKeys = lodash.union(Object.keys(beforeObj), Object.keys(afterObj));
  return allKeys.map(key => generateAST(key, beforeObj[key], afterObj[key]));
};

export default (pathToBeforeFile, pathToAfterFile, format = 'default') => {
  const beforeFile = fs.readFileSync(pathToBeforeFile, 'utf-8');
  const afterFile = fs.readFileSync(pathToAfterFile, 'utf-8');
  const beforeFileExt = path.extname(pathToBeforeFile);
  const afterFileExt = path.extname(pathToAfterFile);
  const beforeObj = generateObj(beforeFileExt)(beforeFile);
  const afterObj = generateObj(afterFileExt)(afterFile);
  const ast = buildAST(beforeObj, afterObj);
  return renderAST(format, ast);
};
