import fs from 'fs';
import path from 'path';
import yamlParser from 'js-yaml';
import iniParser from 'ini';
import buildAst from './astbuilder';
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
  const parse = parsers[fileType];
  const beforeObject = parse(beforeFile);
  const afterObject = parse(afterFile);

  const ast = buildAst(beforeObject, afterObject);
  return buildDiffString(ast);
};
