#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'Output format', 'default')
  .arguments('<firstConfig> <secondConfig>')
  .action((fileBefore, fileAfter) => console.log(genDiff(fileBefore, fileAfter, program.format)));

program.parse(process.argv);
