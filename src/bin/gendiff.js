#!/usr/bin/env node

import program from 'commander';
import process from 'process';
import genDiff from '..';

const optIndent = 23;

program
  .version('1.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', `Output format, type:
  ${' '.repeat(optIndent)}git (default) - gitDiff style
  ${' '.repeat(optIndent)}log - messages like in logfiles
  ${' '.repeat(optIndent)}json - stringified json`)
  .action((firstConfig, secondConfig, options) => {
    console.log(genDiff(firstConfig, secondConfig, options.format));
  })
  .parse(process.argv);

if (!program.args.length) {
  program.help();
}
