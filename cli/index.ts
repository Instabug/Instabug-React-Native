#!/usr/bin/env node
import { Command } from 'commander';
import figlet from 'figlet';

import { uploadSourcemapsCommand } from './UploadSourcemaps';

const program = new Command();

console.log(figlet.textSync('Instabug CLI'));

program
  .name('instaubg')
  .version('1.0.0-beta1')
  .description('A CLI for uploading source maps to Instabug dashboard.')
  .usage('[command]')
  .addCommand(uploadSourcemapsCommand);

program.parse(process.argv);
