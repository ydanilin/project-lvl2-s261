import _ from 'lodash';

const display = value =>
  ({
    number: `${value}`,
    string: `'${value}'`,
    boolean: `${value}`,
    object: '<complex value>',
  }[typeof value]);

const formPathSelector = (path, key) => (path ? `${path}.${key}` : key);

const toString = (key, type, newValue, oldValue, path) => {
  const optionalMessage = {
    updated: `. From ${display(oldValue)} to ${display(newValue)}`,
    added: ` with value: ${display(newValue)}`,
  }[type];

  return `Property '${formPathSelector(path, key)}' was ${type}${optionalMessage || ''}`;
};

const renderAst = (ast) => {
  const iterAst = path => (node) => {
    const {
      key, type, newValue, oldValue,
    } = node;
    const hasChildren = _.isArray(newValue);
    if (!hasChildren && type === 'unchanged') {
      return undefined;
    }
    if (hasChildren && type === 'unchanged') {
      return _.flatten(newValue.map(iterAst(formPathSelector(path, key))));
    }
    return toString(key, type, newValue, oldValue, path);
  };

  const output = ast.map(iterAst(''));
  return _.compact(_.flatten(output)).join('\n');
};

export default renderAst;
