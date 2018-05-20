
const display = value =>
  ({
    number: `${value}`,
    string: `'${value}'`,
    boolean: `${value}`,
    object: '<complex value>',
  }[typeof value]);

const formPathSelector = (path, key) => (path ? `${path}.${key}` : key);

const typeHandlers = {
  merged: ({ name, children }, path, renderFunc) =>
    renderFunc(children, formPathSelector(path, name)),
  updated: ({ name, newValue, oldValue }, path) =>
    `Property '${formPathSelector(path, name)}' was updated. From ${display(oldValue)} to ${display(newValue)}`,
  added: ({ name, newValue }, path) =>
    `Property '${formPathSelector(path, name)}' was added with value: ${display(newValue)}`,
  removed: ({ name }, path) =>
    `Property '${formPathSelector(path, name)}' was removed`,
};

const renderAst = (ast, path = '') =>
  ast.filter(obj => obj.type !== 'unchanged')
    .map(node => typeHandlers[node.type](node, path, renderAst)).join('\n');

export default renderAst;
