import lodash from 'lodash';

const isObject = value => (lodash.isObject(value) ? 'complex value' : value);

const isModifiedObject = value => (lodash.isObject(value) ? 'complex value' : `'${value}'`);

const buildLine = (obj, level) => {
  const {
    name,
    type,
    valueBefore,
    valueAfter,
    children,
  } = obj;
  const property = level === '' ? name : `${level}.${name}`;
  switch (type) {
    case 'object':
      return children.filter(item => item.type !== 'similar').map(item => buildLine(item, `${property}`)).join('\n');
    case 'added':
      return `Property '${property}' was added with value: ${isObject(valueAfter)}`;
    case 'removed':
      return `Property '${property}' was removed`;
    default:
      return `Property '${property}' was updated. From ${isModifiedObject(valueBefore)} to ${isModifiedObject(valueAfter)}`;
  }
};

export default ast => `${ast.filter(item => item.type !== 'similar').map(item => buildLine(item, '')).join('\n')}\n`;
