import fs from 'fs';
import genDiff from '../src';

const beforeJsonPath = '__tests__/__fixtures__/before.json';
const afterJsonPath = '__tests__/__fixtures__/after.json';
const beforeYamlPath = '__tests__/__fixtures__/before.yaml';
const afterYamlPath = '__tests__/__fixtures__/after.yaml';

const plainTextPath = '__tests__/__fixtures__/plainTextOutput.txt';

test('difference of two plain JSON files', () => {
  const plainTextOutput = fs.readFileSync(plainTextPath, 'utf-8').trim();
  expect(genDiff(beforeJsonPath, afterJsonPath)).toBe(plainTextOutput);
});

test('difference of two plain YAML files', () => {
  const plainTextOutput = fs.readFileSync(plainTextPath, 'utf-8').trim();
  expect(genDiff(beforeYamlPath, afterYamlPath)).toBe(plainTextOutput);
});
