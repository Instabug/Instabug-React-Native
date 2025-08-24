#!/usr/bin/env node
import { Command } from 'commander';

import { uploadSourcemapsCommand } from './commands/UploadSourcemaps';
import { UploadSoFilesCommand } from './commands/UploadSoFiles';
import { initCommand } from './commands/Init';

const program = new Command();

program
  .name('instabug')
  .version('1.0.0-beta1')
  .description('A CLI for uploading source maps to Instabug dashboard.')
  .usage('[command]')
  .addCommand(uploadSourcemapsCommand)
  .addCommand(UploadSoFilesCommand)
  .addCommand(initCommand);

program.parse(process.argv);
