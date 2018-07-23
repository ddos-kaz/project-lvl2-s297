import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import generateObj from './parser';
import renderAST from './renderers';

const buildAST = (beforeObj, afterObj) => {
  const allKeys = _.union(Object.keys(beforeObj), Object.keys(afterObj));
  return allKeys.reduce((acc, key) => {
    const resultObj = {
      name: key,
      type: '',
      valueBefore: null,
      valueAfter: null,
      children: null,
    };

    if (!_.has(beforeObj, key)) {
      return [...acc, { ...resultObj, valueAfter: afterObj[key], type: 'added' }];
    }

    if (!_.has(afterObj, key)) {
      return [...acc, { ...resultObj, valueBefore: beforeObj[key], type: 'removed' }];
    }

    if (_.isObject(beforeObj[key]) && _.isObject(afterObj[key])) {
      return [...acc, {
        name: key,
        type: 'object',
        children: buildAST(beforeObj[key], afterObj[key]),
      }];
    }

    if (beforeObj[key] === afterObj[key]) {
      return [...acc, {
        ...resultObj,
        valueBefore: beforeObj[key],
        valueAfter: afterObj[key],
        type: 'similar',
      }];
    }

    return [...acc, {
      ...resultObj,
      valueBefore: beforeObj[key],
      valueAfter: afterObj[key],
      type: 'modified',
    }];
  }, []);
};

export default (pathToBeforeFile, pathToAfterFile, format = 'tree') => {
  const beforeFile = fs.readFileSync(pathToBeforeFile, 'utf-8');
  const afterFile = fs.readFileSync(pathToAfterFile, 'utf-8');
  const beforeFileExt = path.extname(pathToBeforeFile);
  const afterFileExt = path.extname(pathToAfterFile);
  const beforeObj = generateObj(beforeFileExt)(beforeFile);
  const afterObj = generateObj(afterFileExt)(afterFile);
  const ast = buildAST(beforeObj, afterObj);
  return renderAST(format, ast);
};
