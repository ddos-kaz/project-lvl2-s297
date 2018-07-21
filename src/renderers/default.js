import lodash from 'lodash';

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

  switch (type) {
    case 'object':
      return `${space.repeat(level + 1)}${name}: {\n${children.map(child => buildLine(child, level + 2)).join('\n')}\n${space.repeat(level + 1)}}`;
    case 'added':
      return `${space.repeat(level)}${added}${name}: ${objToString(valueAfter, level + 1)}`;
    case 'removed':
      return `${space.repeat(level)}${removed}${name}: ${objToString(valueBefore, level + 1)}`;
    case 'modified':
      return `${space.repeat(level)}${added}${name}: ${objToString(valueAfter, level + 1)}\n${space.repeat(level)}${removed}${name}: ${objToString(valueBefore, level + 1)}`;
    default:
      return `${space.repeat(level + 1)}${name}: ${objToString(valueAfter, level + 1)}`;
  }
};

const parseAST = (ast, level = 0) => ast.map(obj => buildLine(obj, level + 1)).join('\n');

export default ast => `{\n${parseAST(ast)}\n}\n`;
