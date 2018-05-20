import _ from 'lodash';

const diffCases = [
  {
    type: 'merged',
    check: (first, second, key) => (first[key] instanceof Object && second[key] instanceof Object),
    buildNode: (first, second, key, goDeepFunc) => ({
      name: key,
      type: 'merged',
      children: goDeepFunc(first[key], second[key]),
    }),
  },
  {
    type: 'unchanged',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    buildNode: (first, second, key) => ({
      name: key,
      type: 'unchanged',
      newValue: second[key],
    }),
  },
  {
    type: 'updated',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
    && (first[key] !== second[key])),
    buildNode: (first, second, key) => ({
      name: key,
      type: 'updated',
      oldValue: first[key],
      newValue: second[key],
    }),
  },
  {
    type: 'added',
    check: (first, second, key) => !_.has(first, key),
    buildNode: (first, second, key) => ({
      name: key,
      type: 'added',
      newValue: second[key],
    }),
  },
  {
    type: 'removed',
    check: (first, second, key) => !_.has(second, key),
    buildNode: (first, second, key) => ({
      name: key,
      type: 'removed',
      newValue: first[key],
    }),
  },
];

const buildAst = (beforeObject, afterObject) => {
  const combinedKeys = _.union(_.keys(beforeObject), _.keys(afterObject));
  return combinedKeys.map((key) => {
    const { buildNode } = _.find(diffCases, ({ check }) => check(beforeObject, afterObject, key));
    return buildNode(beforeObject, afterObject, key, buildAst);
  });
};

export default buildAst;
