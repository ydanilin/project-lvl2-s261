import fs from 'fs';
import genDiff from '../src';

const plainTextPath = '__tests__/__fixtures__/plain_text_output.txt';
const plainTextOutput = fs.readFileSync(plainTextPath, 'utf-8').trim();
const nestedTextPath = '__tests__/__fixtures__/nested_text_output.txt';
const nestedTextOutput = fs.readFileSync(nestedTextPath, 'utf-8').trim();

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

test('difference of two nested JSON files', () => {
  const beforeJsonPath = '__tests__/__fixtures__/before_nested.json';
  const afterJsonPath = '__tests__/__fixtures__/after_nested.json';
  expect(genDiff(beforeJsonPath, afterJsonPath)).toBe(nestedTextOutput);
});
