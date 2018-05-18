import fs from 'fs';
import genDiff from '../src';

describe('difference of files without nesting', () => {
  const plainTextPath = '__tests__/__fixtures__/plain_gitstyle_output.txt';
  let plainTextOutput;
  beforeAll(() => {
    plainTextOutput = fs.readFileSync(plainTextPath, 'utf-8').trim();
  });

  test('difference of two plain JSON files', () => {
    const beforeJsonPath = '__tests__/__fixtures__/before.json';
    const afterJsonPath = '__tests__/__fixtures__/after.json';
    expect(genDiff(beforeJsonPath, afterJsonPath)).toBe(plainTextOutput);
  });

  test('difference of two plain YAML files', () => {
    const beforeYamlPath = '__tests__/__fixtures__/before.yaml';
    const afterYamlPath = '__tests__/__fixtures__/after.yaml';
    expect(genDiff(beforeYamlPath, afterYamlPath)).toBe(plainTextOutput);
  });

  test('difference of two plain INI files', () => {
    const beforeIniPath = '__tests__/__fixtures__/before.ini';
    const afterIniPath = '__tests__/__fixtures__/after.ini';
    expect(genDiff(beforeIniPath, afterIniPath)).toBe(plainTextOutput);
  });
});

describe('difference of nested structure files', () => {
  const nestedTextPath = '__tests__/__fixtures__/nested_gitstyle_output.txt';
  let nestedTextOutput;
  beforeAll(() => {
    nestedTextOutput = fs.readFileSync(nestedTextPath, 'utf-8').trim();
  });

  test('difference of two nested JSON files', () => {
    const beforeJsonPath = '__tests__/__fixtures__/before_nested.json';
    const afterJsonPath = '__tests__/__fixtures__/after_nested.json';
    expect(genDiff(beforeJsonPath, afterJsonPath)).toBe(nestedTextOutput);
  });

  test('difference of two nested YAML files', () => {
    const beforeYamlPath = '__tests__/__fixtures__/before_nested.yaml';
    const afterYamlPath = '__tests__/__fixtures__/after_nested.yaml';
    expect(genDiff(beforeYamlPath, afterYamlPath)).toBe(nestedTextOutput);
  });

  test('difference of two nested INI files', () => {
    const beforeIniPath = '__tests__/__fixtures__/before_nested.ini';
    const afterIniPath = '__tests__/__fixtures__/after_nested.ini';
    expect(genDiff(beforeIniPath, afterIniPath)).toBe(nestedTextOutput);
  });
});

describe('log style output difference of nested structure files', () => {
  const nestedLogPath = '__tests__/__fixtures__/nested_logstyle_output.txt';
  let nestedLogOutput;
  beforeAll(() => {
    nestedLogOutput = fs.readFileSync(nestedLogPath, 'utf-8').trim();
  });

  test('difference of two nested JSON files', () => {
    const beforeJsonPath = '__tests__/__fixtures__/before_nested.json';
    const afterJsonPath = '__tests__/__fixtures__/after_nested.json';
    expect(genDiff(beforeJsonPath, afterJsonPath, 'logstyle')).toBe(nestedLogOutput);
  });

  test('difference of two nested YAML files', () => {
    const beforeYamlPath = '__tests__/__fixtures__/before_nested.yaml';
    const afterYamlPath = '__tests__/__fixtures__/after_nested.yaml';
    expect(genDiff(beforeYamlPath, afterYamlPath, 'logstyle')).toBe(nestedLogOutput);
  });

  test('difference of two nested INI files', () => {
    const beforeIniPath = '__tests__/__fixtures__/before_nested.ini';
    const afterIniPath = '__tests__/__fixtures__/after_nested.ini';
    expect(genDiff(beforeIniPath, afterIniPath, 'logstyle')).toBe(nestedLogOutput);
  });
});

describe('log style output difference of plain structure files', () => {
  const plainLogPath = '__tests__/__fixtures__/plain_logstyle_output.txt';
  let plainLogOutput;
  beforeAll(() => {
    plainLogOutput = fs.readFileSync(plainLogPath, 'utf-8').trim();
  });

  test('difference of two plain JSON files', () => {
    const beforeJsonPath = '__tests__/__fixtures__/before.json';
    const afterJsonPath = '__tests__/__fixtures__/after.json';
    expect(genDiff(beforeJsonPath, afterJsonPath, 'logstyle')).toBe(plainLogOutput);
  });

  test('difference of two plain YAML files', () => {
    const beforeYamlPath = '__tests__/__fixtures__/before.yaml';
    const afterYamlPath = '__tests__/__fixtures__/after.yaml';
    expect(genDiff(beforeYamlPath, afterYamlPath, 'logstyle')).toBe(plainLogOutput);
  });
});
