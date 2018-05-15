import fs from 'fs';
import _ from 'lodash';

const prefixes = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const toString = (key, value, prefix) =>
  `\n  ${prefix} ${key}: ${value}`;

const buildDiffString = (ast) => {
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

export default (beforePath, afterPath) => {
  const beforeFile = fs.readFileSync(beforePath, 'utf-8');
  const afterFile = fs.readFileSync(afterPath, 'utf-8');
  const beforeObject = JSON.parse(beforeFile);
  const afterObject = JSON.parse(afterFile);

  const compareObjects = (key) => {
    if (!_.has(beforeObject, key) && _.has(afterObject, key)) {
      return { key, status: 'added', value: afterObject[key] };
    }
    if (_.has(beforeObject, key) && !_.has(afterObject, key)) {
      return { key, status: 'deleted', value: beforeObject[key] };
    }
    if (beforeObject[key] === afterObject[key]) {
      return { key, status: 'unchanged', value: beforeObject[key] };
    }
    return {
      key, status: 'modified', prevValue: beforeObject[key], value: afterObject[key],
    };
  };

  const combinedKeys = _.union(_.keys(beforeObject), _.keys(afterObject));
  const ast = combinedKeys.map(compareObjects);
  return buildDiffString(ast);
};
