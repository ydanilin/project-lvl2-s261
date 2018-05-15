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
      key, status, value, prevValue,
    } = node;
    if (status === 'modified') {
      return [
        toString(key, value, prefixes.added),
        toString(key, prevValue, prefixes.deleted),
      ];
    }
    return toString(key, value, prefixes[status]);
  };

  const output = ast.map(iterAst);
  return `{${_.flatten(output).join('')}\n}`;
};
