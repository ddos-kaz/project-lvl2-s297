import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import generateObj from './adapter-parser';
import renderAST from './renderers';

const buildAST = (beforeObj, afterObj) => {
  const allKeys = _.union(Object.keys(beforeObj), Object.keys(afterObj));
  return allKeys.reduce((acc, key) => {
    const resultObj = {
      name: key,
      type: '',
      valueBefore: beforeObj[key],
      valueAfter: afterObj[key],
      children: null,
    };

    if (!_.has(beforeObj, key)) {
      return [...acc, { ...resultObj, type: 'added' }];
    }

    if (!_.has(afterObj, key)) {
      return [...acc, { ...resultObj, type: 'removed' }];
    }

    if (_.isObject(resultObj.valueBefore) && _.isObject(resultObj.valueAfter)) {
      return [...acc, {
        name: key,
        type: 'object',
        valueBefore: null,
        valueAfter: null,
        children: buildAST(resultObj.valueBefore, resultObj.valueAfter),
      }];
    }

    if (resultObj.valueBefore === resultObj.valueAfter) {
      return [...acc, { ...resultObj, type: 'similar' }];
    }

    return [...acc, { ...resultObj, type: 'modified' }];
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
