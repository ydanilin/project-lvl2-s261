import _ from 'lodash';

const prefixes = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const toString = (key, value, prefix) =>
  `\n  ${prefix} ${key}: ${value}`;

export default (ast) => {
  const iterAst = (node) => {
    const {
      key, type, newValue, oldValue,
    } = node;
    if (type === 'modified') {
      return [
        toString(key, newValue.value, prefixes.added),
        toString(key, oldValue.value, prefixes.deleted),
      ];
    }
    return toString(key, newValue.type === 'simple' ? newValue.value : iterAst(newValue.value), prefixes[type]);
  };

  const output = ast.map(iterAst);
  return `{${_.flatten(output).join('')}\n}`;
};
