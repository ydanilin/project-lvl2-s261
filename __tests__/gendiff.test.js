import fs from 'fs';
import genDiff from '../src';

const beforePath = '__tests__/__fixtures__/before.json';
const afterPath = '__tests__/__fixtures__/after.json';
const plainJsonPath = '__tests__/__fixtures__/plainJsonOutput.txt';

test('difference of two plain JSON files', () => {
    const plainJsonOutput = fs.readFileSync(plainJsonPath, 'utf-8').trim();
    expect(genDiff(beforePath, afterPath)).toBe(plainJsonOutput);
  });
