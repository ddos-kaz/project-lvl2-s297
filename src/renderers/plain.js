import _ from 'lodash';

const isComplex = value => (_.isObject(value) ? 'complex value' : value);

const isModifiedComplex = value => (_.isObject(value) ? 'complex value' : `'${value}'`);

const buildLine = (obj, level) => {
  const {
    name,
    type,
    valueBefore,
    valueAfter,
    children,
  } = obj;
  const property = _.trim(`${level}.${name}`, '.');
  const outputLineType = {
    object: () => children.filter(item => item.type !== 'similar').map(item => buildLine(item, `${property}`)).join('\n'),
    added: () => `Property '${property}' was added with value: ${isComplex(valueAfter)}`,
    removed: () => `Property '${property}' was removed`,
    modified: () => `Property '${property}' was updated. From ${isModifiedComplex(valueBefore)} to ${isModifiedComplex(valueAfter)}`,
  };
  return outputLineType[type]();
};

export default ast => `${ast.filter(item => item.type !== 'similar').map(item => buildLine(item, '')).join('\n')}`;
