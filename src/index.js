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

const buildAst = (beforeObject, afterObject) => {
  const compareObjects = (key) => {
    const hasKeyBefore = _.has(beforeObject, key);
    const hasKeyAfter = _.has(afterObject, key);
    const beforeVal = beforeObject[key];
    const beforeType = _.isObject(beforeVal) ? 'compound' : 'simple';
    const afterVal = afterObject[key];
    const afterType = _.isObject(afterVal) ? 'compound' : 'simple';

    if (!hasKeyBefore && hasKeyAfter) {
      return { key, type: 'added', newValue: { type: afterType, value: afterVal } };
    }
    if (hasKeyBefore && !hasKeyAfter) {
      return { key, type: 'deleted', newValue: { type: beforeType, value: beforeVal } };
    }
    if (_.isEqual([beforeType, afterType], ['compound', 'compound'])) {  // here we go for children for sure
      return { key, type: 'unchanged', newValue: { type: beforeType, value: buildAst(beforeVal, afterVal) } };
    }
    if (_.isEqual([beforeType, afterType], ['simple', 'simple']) && beforeVal === afterVal) {
      return { key, type: 'unchanged', newValue: { type: beforeType, value: beforeVal } };
    }
    return {  // here we go for children conditionally
      key,
      type: 'modified',
      oldValue: { type: beforeType, value: beforeType === 'simple' ? beforeVal : buildAst(beforeVal, afterVal) },
      newValue: { type: afterType, value: afterType === 'simple' ? afterVal : buildAst(beforeVal, afterVal) },
    };
  };

  const combinedKeys = _.union(_.keys(beforeObject), _.keys(afterObject));
  return combinedKeys.map(compareObjects);
};

export default (beforePath, afterPath) => {
  const fileType = path.extname(afterPath).split('.').join('');
  const beforeFile = fs.readFileSync(beforePath, 'utf-8');
  const afterFile = fs.readFileSync(afterPath, 'utf-8');
  const parse = parsers[fileType];
  const beforeObject = parse(beforeFile);
  const afterObject = parse(afterFile);

  const ast = buildAst(beforeObject, afterObject);
  console.log(ast);
  return buildDiffString(ast);
};
