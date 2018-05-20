import _ from 'lodash';

const doIndent = level => `${' '.repeat((level + 1) * 2)}`;

const toString = (value, level) => {
  if (!_.isObject(value)) {
    return value;
  }
  const indent = doIndent(level);
  const arrFromJson = JSON.stringify(value, null, 4).replace(/"([^(")"]+)"/g, '$1').split('\n');
  const indentedArr = arrFromJson.map(text => (text === '{' ? text : `${indent}  ${text}`));
  return indentedArr.join('\n');
};

const typeHandlers = {
  merged: ({ name, children }, level, renderFunc) =>
    `${doIndent(level)}  ${name}: {\n${renderFunc(children, level + 2)}\n  ${doIndent(level)}}`,
  unchanged: ({ name, newValue }, level) =>
    `${doIndent(level)}  ${name}: ${toString(newValue, level)}`,
  updated: ({ name, newValue, oldValue }, level) => [
    `${doIndent(level)}+ ${name}: ${toString(newValue, level)}`,
    `${doIndent(level)}- ${name}: ${toString(oldValue, level)}`,
  ],
  added: ({ name, newValue }, level) =>
    `${doIndent(level)}+ ${name}: ${toString(newValue, level)}`,
  removed: ({ name, newValue }, level) =>
    `${doIndent(level)}- ${name}: ${toString(newValue, level)}`,
};

const renderAst = (ast, level = 0) =>
  _.flatten(ast.map(node => typeHandlers[node.type](node, level, renderAst))).join('\n');

export default ast => `{\n${renderAst(ast)}\n}`;
