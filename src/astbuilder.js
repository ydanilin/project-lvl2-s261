import _ from 'lodash';

const buildAst = (beforeObject, afterObject) => {
/*
the following cases are possible:
old           new            type
-----------------------------------
<no>        any type         added
any type    <no>             deleted
object      object           unchanged
simple ===  simple           unchanged
----- all the rest of the cases are "modified" and placed below quard expressions:
simple      object           modified
object      simple           modified
simple !==  simple           modified
*/
  const compareObjects = (key) => {
    const hasKeyBefore = _.has(beforeObject, key);
    const hasKeyAfter = _.has(afterObject, key);
    const beforeVal = beforeObject[key];
    const afterVal = afterObject[key];
    const bothAreObjects = _.isObject(beforeVal) && _.isObject(afterVal);
    const bothAreSimple = !_.isObject(beforeVal) && !_.isObject(afterVal);

    if (!hasKeyBefore && hasKeyAfter) {
      return { key, type: 'added', newValue: afterVal };
    }
    if (hasKeyBefore && !hasKeyAfter) {
      return { key, type: 'removed', newValue: beforeVal };
    }
    if (bothAreObjects) { // here we go for children without condition
      return { key, type: 'unchanged', newValue: buildAst(beforeVal, afterVal) };
    }
    if (bothAreSimple && beforeVal === afterVal) {
      return { key, type: 'unchanged', newValue: beforeVal };
    }
    // here no children
    return {
      key, type: 'updated', oldValue: beforeVal, newValue: afterVal,
    };
  };

  const combinedKeys = _.union(_.keys(beforeObject), _.keys(afterObject));
  return combinedKeys.map(compareObjects);
};

export default buildAst;
