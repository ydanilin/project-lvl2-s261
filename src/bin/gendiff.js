#!/usr/bin/env node

import program from 'commander';
import process from 'process';

program
  .version('1.0.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig, options) => {
    console.log('will call lib function here for:', firstConfig, secondConfig, options.format);
  })
  .parse(process.argv);

if (!program.args.length) {
  program.help();
}
