import fs from 'fs';
import path from 'path';
import yamlParser from 'js-yaml';
import iniParser from 'ini';
import buildAst from './astbuilder';
import reportFormats from './reporting';

const parsers = {
  json: JSON.parse,
  yaml: yamlParser.safeLoad,
  ini: iniParser.parse,
};

export default (beforePath, afterPath, format = 'gitstyle') => {
  const fileType = path.extname(afterPath).split('.').join('');
  const beforeFile = fs.readFileSync(beforePath, 'utf-8');
  const afterFile = fs.readFileSync(afterPath, 'utf-8');
  const parse = parsers[fileType];
  const beforeObject = parse(beforeFile);
  const afterObject = parse(afterFile);

  const ast = buildAst(beforeObject, afterObject, format);
  return reportFormats[format](ast);
};
