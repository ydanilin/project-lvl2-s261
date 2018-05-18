import _ from 'lodash';

const prefixes = {
  added: '+',
  removed: '-',
  unchanged: ' ',
};

const stringifyObj = (obj, indent = '') => {
  const arrFromJson = JSON.stringify(obj, null, 4).replace(/"([^(")"]+)"/g, '$1').split('\n');
  const indentedArr = arrFromJson.map(x => (x === '{' ? x : `${indent}  ${x}`));
  return indentedArr.join('\n');
};

const renderAst = (ast, level = 0) => {
  const toString = (key, value, prefix) => {
    const indent = `${' '.repeat((level + 1) * 2)}`;
    if (_.isArray(value)) {
      return `\n${indent}${prefix} ${key}: {${renderAst(value, level + 2)}\n${indent}  }`;
    }
    if (_.isObject(value)) {
      return `\n${indent}${prefix} ${key}: ${stringifyObj(value, indent)}`;
    }
    return `\n${indent}${prefix} ${key}: ${value}`;
  };

  const iterAst = (node) => {
    const {
      key, type, newValue, oldValue,
    } = node;
    if (type === 'updated') {
      return [
        toString(key, newValue, prefixes.added),
        toString(key, oldValue, prefixes.removed),
      ];
    }
    return toString(key, newValue, prefixes[type]);
  };

  const output = ast.map(iterAst);
  return `${_.flatten(output).join('')}`;
};

export default ast => `{${renderAst(ast)}\n}`;
