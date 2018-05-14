import fs from 'fs';
import _ from 'lodash';

const buildDiffString = (diffObj) => {
  const iterDiffObj = (acc, key) => {
    const diffEntry = diffObj[key];
    if (diffEntry.status === 'added') {
      return `${acc}\n  + ${key}: ${diffEntry.newValue}`;
    }
    if (diffEntry.status === 'deleted') {
      return `${acc}\n  - ${key}: ${diffEntry.oldValue}`;
    }
    if (diffEntry.status === 'unchanged') {
      return `${acc}\n    ${key}: ${diffEntry.oldValue}`;
    }
    return `${acc}\n  + ${key}: ${diffEntry.newValue}\n  - ${key}: ${diffEntry.oldValue}`;
  };

  const output = Object.keys(diffObj).reduce(iterDiffObj, '');
  return `{${output}\n}`;
};

export default (beforePath, afterPath) => {
  const beforeFile = fs.readFileSync(beforePath, 'utf-8');
  const afterFile = fs.readFileSync(afterPath, 'utf-8');
  const beforeObject = JSON.parse(beforeFile);
  const afterObject = JSON.parse(afterFile);

  const compareObjects = (acc, key) => {
    if (!_.has(beforeObject, key) && _.has(afterObject, key)) {
      return { ...acc, [key]: { status: 'added', newValue: afterObject[key] } };
    }
    if (_.has(beforeObject, key) && !_.has(afterObject, key)) {
      return { ...acc, [key]: { status: 'deleted', oldValue: beforeObject[key] } };
    }
    if (beforeObject[key] === afterObject[key]) {
      return { ...acc, [key]: { status: 'unchanged', oldValue: beforeObject[key] } };
    }
    return { ...acc, [key]: { status: 'modified', oldValue: beforeObject[key], newValue: afterObject[key] } };
  };

  const combinedKeys = [...new Set([...Object.keys(beforeObject), ...Object.keys(afterObject)])];
  const diffObj = combinedKeys.reduce(compareObjects, {});
  return buildDiffString(diffObj);
};
