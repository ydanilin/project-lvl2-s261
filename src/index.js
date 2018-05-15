import fs from 'fs';
import path from 'path';
import yamlParser from 'js-yaml';
import iniParser from 'ini';
import _ from 'lodash';
import buildDiffString from './reporting';

const parsers = {
  json: JSON.parse,
  yaml: yamlParser.safeLoad,
  ini: iniParser.parse,
};

export default (beforePath, afterPath) => {
  const fileType = path.extname(afterPath).split('.').join('');
  const beforeFile = fs.readFileSync(beforePath, 'utf-8');
  const afterFile = fs.readFileSync(afterPath, 'utf-8');
  const doParsing = parsers[fileType];
  const beforeObject = doParsing(beforeFile);
  const afterObject = doParsing(afterFile);

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
