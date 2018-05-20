import fs from 'fs';
import genDiff from '../src';

const getBeforePath = (format, nested) =>
  `__tests__/__fixtures__/before${nested ? '_nested' : ''}.${format}`;

const getAfterPath = (format, nested) =>
  `__tests__/__fixtures__/after${nested ? '_nested' : ''}.${format}`;

describe('Git-style difference of files without nesting', () => {
  const resultPath = '__tests__/__fixtures__/plain_gitstyle_output.txt';
  const nested = false;
  let result;
  beforeAll(() => {
    result = fs.readFileSync(resultPath, 'utf-8').trim();
  });

  ['json', 'yaml', 'ini'].forEach((format) => {
    test(`difference of two plain ${format.toUpperCase()} files`, () => {
      expect(genDiff(getBeforePath(format, nested), getAfterPath(format, nested))).toBe(result);
    });
  });
});

describe('Git-style difference of nested structure files', () => {
  const resultPath = '__tests__/__fixtures__/nested_gitstyle_output.txt';
  const nested = true;
  let result;
  beforeAll(() => {
    result = fs.readFileSync(resultPath, 'utf-8').trim();
  });

  ['json', 'yaml', 'ini'].forEach((format) => {
    test(`difference of two nested ${format.toUpperCase()} files`, () => {
      expect(genDiff(getBeforePath(format, nested), getAfterPath(format, nested))).toBe(result);
    });
  });
});

describe('Log-style difference of nested structure files', () => {
  const resultPath = '__tests__/__fixtures__/nested_logstyle_output.txt';
  const nested = true;
  const style = 'log';
  let result;
  beforeAll(() => {
    result = fs.readFileSync(resultPath, 'utf-8').trim();
  });

  ['json', 'yaml', 'ini'].forEach((format) => {
    test(`difference of two nested ${format.toUpperCase()} files`, () => {
      // eslint-disable-next-line
      expect(genDiff(getBeforePath(format, nested), getAfterPath(format, nested), style)).toBe(result);
    });
  });
});

describe('Log-style difference of plain structure files', () => {
  const resultPath = '__tests__/__fixtures__/plain_logstyle_output.txt';
  const nested = false;
  const style = 'log';
  let result;
  beforeAll(() => {
    result = fs.readFileSync(resultPath, 'utf-8').trim();
  });

  ['json', 'yaml'].forEach((format) => {
    test(`difference of two plain ${format.toUpperCase()} files`, () => {
      // eslint-disable-next-line
      expect(genDiff(getBeforePath(format, nested), getAfterPath(format, nested), style)).toBe(result);
    });
  });
});

describe('JSON-style difference of nested structure files', () => {
  const resultPath = '__tests__/__fixtures__/nested_json_output.txt';
  const nested = true;
  const style = 'json';
  let result;
  beforeAll(() => {
    result = fs.readFileSync(resultPath, 'utf-8').trim();
  });

  ['json', 'yaml', 'ini'].forEach((format) => {
    test(`difference of two nested ${format.toUpperCase()} files`, () => {
      // eslint-disable-next-line
      expect(genDiff(getBeforePath(format, nested), getAfterPath(format, nested), style)).toBe(result);
    });
  });
});
