import fs from 'fs';
import lodash from 'lodash';
import path from 'path';
import generateObj from './adapter-parser';

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
    return { ...resultObj, type: 'added', valueBefore: null };
  }

  if (afterValue === undefined) {
    return { ...resultObj, type: 'removed', valueAfter: null };
  }

  if (beforeValue === afterValue) {
    return { ...resultObj, type: 'similar' };
  }

  return { ...resultObj, type: 'modified' };
};

const objToString = (obj, level) => {
  const space = '  ';
  if (lodash.isObject(obj)) {
    const objKeys = Object.keys(obj);
    const valuesCollection = objKeys.map(key => `${space.repeat(level + 2)}${key}: ${obj[key]}`).join('\n');
    return `{\n${valuesCollection}\n${space.repeat(level)}}`;
  }
  return obj;
};

const buildLine = (obj, level) => {
  const space = '  ';
  const added = '+ ';
  const removed = '- ';
  const {
    name,
    type,
    valueBefore,
    valueAfter,
    children,
  } = obj;

  if (type === 'object') {
    return `${space.repeat(level + 1)}${name}: {\n${children.map(child => buildLine(child, level + 2)).join('\n')}\n${space.repeat(level + 1)}}`;
  }

  if (type === 'added') {
    return `${space.repeat(level)}${added}${name}: ${objToString(valueAfter, level + 1)}`;
  }

  if (type === 'removed') {
    return `${space.repeat(level)}${removed}${name}: ${objToString(valueBefore, level + 1)}`;
  }

  if (type === 'modified') {
    return `${space.repeat(level)}${added}${name}: ${objToString(valueAfter, level + 1)}\n${space.repeat(level)}${removed}${name}: ${objToString(valueBefore, level + 1)}`;
  }

  return `${space.repeat(level + 1)}${name}: ${objToString(valueAfter, level + 1)}`;
};

const buildAST = (beforeObj, afterObj) => {
  const allKeys = lodash.union(Object.keys(beforeObj), Object.keys(afterObj));
  return allKeys.map(key => generateAST(key, beforeObj[key], afterObj[key]));
};

const parseAST = (ast, level = 0) => ast.map(obj => buildLine(obj, level + 1)).join('\n');

export default (pathToBeforeFile, pathToAfterFile) => {
  const beforeFile = fs.readFileSync(pathToBeforeFile, 'utf-8');
  const afterFile = fs.readFileSync(pathToAfterFile, 'utf-8');
  const beforeFileExt = path.extname(pathToBeforeFile);
  const afterFileExt = path.extname(pathToAfterFile);
  const beforeObj = generateObj(beforeFileExt, beforeFile);
  const afterObj = generateObj(afterFileExt, afterFile);
  const ast = buildAST(beforeObj, afterObj);
  return `{\n${parseAST(ast)}\n}\n`;
};
