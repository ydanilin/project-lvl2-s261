import _ from 'lodash';

const display = value =>
  ({
    number: `${value}`,
    string: `'${value}'`,
    boolean: `${value}`,
    object: '<complex value>',
  }[typeof value]);

const toString = (node, path) => {
  const {
    key, type, newValue, oldValue,
  } = node;
  const message = {
    updated: `. From ${display(oldValue)} to ${display(newValue)}`,
    added: ` with value: ${display(newValue)}`,
  }[type];
  const selector = path ? `${path}.${key}` : key;

  return `Property '${selector}' was ${type}${message || ''}`;
};

const renderAst = (ast) => {
  const iterAst = path => (node) => {
    const {
      key, type, newValue,
    } = node;
    const hasChildren = _.isArray(newValue);
    if (!hasChildren && type === 'unchanged') {
      return undefined;
    }
    if (hasChildren && type === 'unchanged') {
      return _.flatten(newValue.map(iterAst(path ? `${path}.${key}` : key)));
    }
    return toString(node, path);
  };

  const output = ast.map(iterAst(''));
  return _.compact(_.flatten(output)).join('\n');
};

export default renderAst;
