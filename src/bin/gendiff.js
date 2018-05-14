#!/usr/bin/env node

import program from 'commander';
import process from 'process';
import genDiff from '..';

program
  .version('1.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig));
  })
  .parse(process.argv);

if (!program.args.length) {
  program.help();
}
