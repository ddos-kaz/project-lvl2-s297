import _ from 'lodash';

const objToString = (obj, level) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const space = '  ';
  const objKeys = Object.keys(obj);
  const valuesCollection = objKeys.map(key => `${space.repeat(level + 2)}${key}: ${obj[key]}`).join('\n');
  return `{\n${valuesCollection}\n${space.repeat(level)}}`;
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
  const outputLineType = {
    object: () => `${space.repeat(level + 1)}${name}: {\n${_.flatten(children.map(child => buildLine(child, level + 2))).join('\n')}\n${space.repeat(level + 1)}}`,
    added: () => `${space.repeat(level)}${added}${name}: ${objToString(valueAfter, level + 1)}`,
    removed: () => `${space.repeat(level)}${removed}${name}: ${objToString(valueBefore, level + 1)}`,
    modified: () => [`${space.repeat(level)}${added}${name}: ${objToString(valueAfter, level + 1)}`, `${space.repeat(level)}${removed}${name}: ${objToString(valueBefore, level + 1)}`],
    similar: () => `${space.repeat(level + 1)}${name}: ${objToString(valueAfter, level + 1)}`,
  };
  return outputLineType[type]();
};

const parseAST = (ast, level = 0) => _.flatten(ast.map(obj => buildLine(obj, level + 1))).join('\n');

export default ast => `{\n${parseAST(ast)}\n}`;
