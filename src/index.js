import fs from 'fs';
import _ from 'lodash';

const buildDiffString = (ast) => {
  const iterAst = (acc, node) => {
    const { key } = node;
    if (node.status === 'added') {
      return `${acc}\n  + ${key}: ${node.newValue}`;
    }
    if (node.status === 'deleted') {
      return `${acc}\n  - ${key}: ${node.oldValue}`;
    }
    if (node.status === 'unchanged') {
      return `${acc}\n    ${key}: ${node.oldValue}`;
    }
    return `${acc}\n  + ${key}: ${node.newValue}\n  - ${key}: ${node.oldValue}`;
  };

  const output = ast.reduce(iterAst, '');
  return `{${output}\n}`;
};

export default (beforePath, afterPath) => {
  const beforeFile = fs.readFileSync(beforePath, 'utf-8');
  const afterFile = fs.readFileSync(afterPath, 'utf-8');
  const beforeObject = JSON.parse(beforeFile);
  const afterObject = JSON.parse(afterFile);

  const compareObjects = (key) => {
    if (!_.has(beforeObject, key) && _.has(afterObject, key)) {
      return { key, status: 'added', newValue: afterObject[key] };
    }
    if (_.has(beforeObject, key) && !_.has(afterObject, key)) {
      return { key, status: 'deleted', oldValue: beforeObject[key] };
    }
    if (beforeObject[key] === afterObject[key]) {
      return { key, status: 'unchanged', oldValue: beforeObject[key] };
    }
    return {
      key, status: 'modified', oldValue: beforeObject[key], newValue: afterObject[key],
    };
  };

  const combinedKeys = _.union(_.keys(beforeObject), _.keys(afterObject));
  const ast = combinedKeys.map(compareObjects);
  return buildDiffString(ast);
};
